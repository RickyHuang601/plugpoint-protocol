const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PlugPoint Protocol", function () {
  const BILLION_PLUG = ethers.parseEther("1000000000");
  const VENDOR_INVENTORY = ethers.parseEther("100000");
  const USDT_PAYMENT = ethers.parseEther("10");
  const PURCHASED_PLUG = ethers.parseEther("100");

  let deployer;
  let platformTreasury;
  let player;
  let creator;
  let outsider;
  let token;
  let mockUsdt;
  let vendor;
  let gateway;

  beforeEach(async function () {
    [deployer, platformTreasury, player, creator, outsider] =
      await ethers.getSigners();

    token = await ethers.deployContract("PlugPointToken", [deployer.address]);
    mockUsdt = await ethers.deployContract("MockUSDT");
    vendor = await ethers.deployContract("PlugPointVendor", [
      await token.getAddress(),
      await mockUsdt.getAddress(),
      platformTreasury.address,
      10,
    ]);
    gateway = await ethers.deployContract("PlugPointGateway", [
      await token.getAddress(),
      platformTreasury.address,
    ]);

    await Promise.all([
      token.waitForDeployment(),
      mockUsdt.waitForDeployment(),
      vendor.waitForDeployment(),
      gateway.waitForDeployment(),
    ]);
  });

  async function stockAndBuy() {
    await token.transfer(await vendor.getAddress(), VENDOR_INVENTORY);
    await mockUsdt.mint(player.address, USDT_PAYMENT);
    await mockUsdt.connect(player).approve(await vendor.getAddress(), USDT_PAYMENT);
    return vendor.connect(player).buyPoints(USDT_PAYMENT);
  }

  describe("Stage 1: fixed-supply token", function () {
    it("mints exactly one billion PLUG and has zero transfer tax", async function () {
      expect(await token.name()).to.equal("PlugPoint");
      expect(await token.symbol()).to.equal("PLUG");
      expect(await token.decimals()).to.equal(18);
      expect(await token.totalSupply()).to.equal(BILLION_PLUG);
      expect(await token.balanceOf(deployer.address)).to.equal(BILLION_PLUG);

      const amount = ethers.parseEther("123.456");
      await expect(token.transfer(player.address, amount))
        .to.emit(token, "Transfer")
        .withArgs(deployer.address, player.address, amount);
      expect(await token.balanceOf(player.address)).to.equal(amount);
      expect(await token.totalSupply()).to.equal(BILLION_PLUG);
    });

    it("rejects a zero initial treasury", async function () {
      const Token = await ethers.getContractFactory("PlugPointToken");
      await expect(Token.deploy(ethers.ZeroAddress)).to.be.revertedWithCustomError(
        Token,
        "ZeroInitialTreasury"
      );
    });
  });

  describe("Stage 2: vendor inventory and purchase", function () {
    it("sends USDT directly to treasury and delivers PLUG at rate 10", async function () {
      await token.transfer(await vendor.getAddress(), VENDOR_INVENTORY);
      await mockUsdt.mint(player.address, USDT_PAYMENT);
      await mockUsdt.connect(player).approve(await vendor.getAddress(), USDT_PAYMENT);

      await expect(vendor.connect(player).buyPoints(USDT_PAYMENT))
        .to.emit(vendor, "PointsPurchased")
        .withArgs(player.address, USDT_PAYMENT, PURCHASED_PLUG, 10);

      expect(await token.balanceOf(player.address)).to.equal(PURCHASED_PLUG);
      expect(await mockUsdt.balanceOf(platformTreasury.address)).to.equal(
        USDT_PAYMENT
      );
      expect(await mockUsdt.balanceOf(await vendor.getAddress())).to.equal(0);
      expect(await token.balanceOf(await vendor.getAddress())).to.equal(
        VENDOR_INVENTORY - PURCHASED_PLUG
      );
    });

    it("rejects purchases when inventory is insufficient", async function () {
      await mockUsdt.mint(player.address, USDT_PAYMENT);
      await mockUsdt.connect(player).approve(await vendor.getAddress(), USDT_PAYMENT);
      await expect(
        vendor.connect(player).buyPoints(USDT_PAYMENT)
      ).to.be.revertedWith("Insufficient PLUG inventory");
    });

    it("supports owner rate, treasury and pause controls", async function () {
      await expect(vendor.connect(outsider).setRate(20)).to.be.revertedWithCustomError(
        vendor,
        "OwnableUnauthorizedAccount"
      );
      await expect(vendor.setRate(20))
        .to.emit(vendor, "RateUpdated")
        .withArgs(10, 20);
      await expect(vendor.setPlatformTreasury(outsider.address))
        .to.emit(vendor, "PlatformTreasuryUpdated")
        .withArgs(platformTreasury.address, outsider.address);
      await vendor.pause();
      await expect(vendor.connect(player).buyPoints(1)).to.be.revertedWithCustomError(
        vendor,
        "EnforcedPause"
      );
      await vendor.unpause();
    });
  });

  describe("Stage 3: game registration and settlement", function () {
    it("runs the full buy, register and 80/15/5 spend lifecycle", async function () {
      await stockAndBuy();

      await expect(
        gateway
          .connect(creator)
          .registerGame(creator.address, "ipfs://plugpoint-game")
      )
        .to.emit(gateway, "GameRegistered")
        .withArgs(1, creator.address, creator.address, "ipfs://plugpoint-game");
      expect(await gateway.nextAppId()).to.equal(2);

      await token.connect(player).approve(await gateway.getAddress(), PURCHASED_PLUG);
      const creatorShare = ethers.parseEther("80");
      const platformShare = ethers.parseEther("15");
      const burnAmount = ethers.parseEther("5");

      await expect(
        gateway.connect(player).spendPoints(1, PURCHASED_PLUG, "ORDER_001")
      )
        .to.emit(gateway, "PointsSpent")
        .withArgs(
          1,
          player.address,
          PURCHASED_PLUG,
          creatorShare,
          platformShare,
          burnAmount,
          "ORDER_001"
        );

      expect(await token.balanceOf(player.address)).to.equal(0);
      expect(await token.balanceOf(creator.address)).to.equal(creatorShare);
      expect(await token.balanceOf(platformTreasury.address)).to.equal(platformShare);
      expect(await token.totalSupply()).to.equal(ethers.parseEther("999999995"));

      const game = await gateway.games(1);
      expect(game.owner).to.equal(creator.address);
      expect(game.active).to.equal(true);
      expect(game.totalVolume).to.equal(PURCHASED_PLUG);
    });

    it("assigns sequential app IDs permissionlessly", async function () {
      await gateway.connect(creator).registerGame(creator.address, "ipfs://one");
      await expect(
        gateway.connect(outsider).registerGame(outsider.address, "ipfs://two")
      )
        .to.emit(gateway, "GameRegistered")
        .withArgs(2, outsider.address, outsider.address, "ipfs://two");
    });

    it("uses creatorShare as the exact rounding remainder", async function () {
      await gateway.connect(creator).registerGame(creator.address, "ipfs://rounding");
      await token.transfer(player.address, 1n);
      await token.connect(player).approve(await gateway.getAddress(), 1n);
      await gateway.connect(player).spendPoints(1, 1n, "ONE_WEI");
      expect(await token.balanceOf(creator.address)).to.equal(1n);
    });
  });

  describe("Stage 4: authorization and emergency controls", function () {
    beforeEach(async function () {
      await gateway
        .connect(creator)
        .registerGame(creator.address, "ipfs://secure-game");
    });

    it("prevents outsiders from changing a game's payout wallet", async function () {
      await expect(
        gateway
          .connect(outsider)
          .updateGameConfig(1, outsider.address, "ipfs://hijacked", true)
      )
        .to.be.revertedWithCustomError(gateway, "NotGameOwner")
        .withArgs(1, outsider.address);
    });

    it("lets the game owner update config and disable spending", async function () {
      await expect(
        gateway
          .connect(creator)
          .updateGameConfig(1, outsider.address, "ipfs://v2", false)
      )
        .to.emit(gateway, "GameUpdated")
        .withArgs(1, outsider.address, false);
      await expect(
        gateway.connect(player).spendPoints(1, 1, "DISABLED")
      ).to.be.revertedWithCustomError(gateway, "GameNotActive");
    });

    it("enforces hard fee caps and owner-only administration", async function () {
      await expect(gateway.setFees(2501, 500))
        .to.be.revertedWithCustomError(gateway, "PlatformFeeTooHigh")
        .withArgs(2501, 2500);
      await expect(gateway.setFees(1500, 1001))
        .to.be.revertedWithCustomError(gateway, "BurnRateTooHigh")
        .withArgs(1001, 1000);
      await expect(
        gateway.connect(outsider).setFees(1000, 100)
      ).to.be.revertedWithCustomError(gateway, "OwnableUnauthorizedAccount");
      await expect(gateway.setFees(2500, 1000))
        .to.emit(gateway, "FeesUpdated")
        .withArgs(2500, 1000);
    });

    it("allows only the vendor owner to withdraw unsold inventory", async function () {
      await token.transfer(await vendor.getAddress(), VENDOR_INVENTORY);
      await expect(
        vendor.connect(outsider).withdrawUnsoldPlug(VENDOR_INVENTORY)
      ).to.be.revertedWithCustomError(vendor, "OwnableUnauthorizedAccount");

      const before = await token.balanceOf(deployer.address);
      await expect(vendor.withdrawUnsoldPlug(VENDOR_INVENTORY))
        .to.emit(vendor, "UnsoldPlugWithdrawn")
        .withArgs(deployer.address, VENDOR_INVENTORY);
      expect(await token.balanceOf(deployer.address)).to.equal(
        before + VENDOR_INVENTORY
      );
      expect(await token.balanceOf(await vendor.getAddress())).to.equal(0);
    });

    it("pauses and resumes gateway spending", async function () {
      await gateway.pause();
      await expect(
        gateway.connect(player).spendPoints(1, 1, "PAUSED")
      ).to.be.revertedWithCustomError(gateway, "EnforcedPause");
      await gateway.unpause();
    });
  });
});
