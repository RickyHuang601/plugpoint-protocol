const hre = require("hardhat");

function normalizePrivateConfigAddress(value, fallback, name) {
  const address = value || fallback;
  if (!hre.ethers.isAddress(address) || address === hre.ethers.ZeroAddress) {
    throw new Error(`${name} must be a non-zero EVM address`);
  }
  return address;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;
  const initialHolder = normalizePrivateConfigAddress(
    process.env.INITIAL_TOKEN_HOLDER,
    deployer.address,
    "INITIAL_TOKEN_HOLDER"
  );
  const platformTreasury = normalizePrivateConfigAddress(
    process.env.PLATFORM_TREASURY,
    deployer.address,
    "PLATFORM_TREASURY"
  );

  const rate = BigInt(process.env.INITIAL_EXCHANGE_RATE || "10");
  if (rate <= 0n) throw new Error("INITIAL_EXCHANGE_RATE must be greater than zero");

  console.log(`Network: ${networkName}`);
  console.log(`Deployer: ${deployer.address}`);

  const Token = await hre.ethers.getContractFactory("PlugPointToken");
  const token = await Token.deploy(initialHolder);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  let paymentTokenAddress = process.env.PAYMENT_TOKEN_ADDRESS;
  let mockUsdt;
  if (paymentTokenAddress) {
    paymentTokenAddress = normalizePrivateConfigAddress(
      paymentTokenAddress,
      undefined,
      "PAYMENT_TOKEN_ADDRESS"
    );
  } else {
    if (networkName === "bscMainnet") {
      throw new Error(
        "PAYMENT_TOKEN_ADDRESS is required on BSC mainnet; refusing to deploy MockUSDT"
      );
    }
    const MockUSDT = await hre.ethers.getContractFactory("MockUSDT");
    mockUsdt = await MockUSDT.deploy();
    await mockUsdt.waitForDeployment();
    paymentTokenAddress = await mockUsdt.getAddress();
  }

  const Vendor = await hre.ethers.getContractFactory("PlugPointVendor");
  const vendor = await Vendor.deploy(
    tokenAddress,
    paymentTokenAddress,
    platformTreasury,
    rate
  );
  await vendor.waitForDeployment();
  const vendorAddress = await vendor.getAddress();

  const Gateway = await hre.ethers.getContractFactory("PlugPointGateway");
  const gateway = await Gateway.deploy(tokenAddress, platformTreasury);
  await gateway.waitForDeployment();
  const gatewayAddress = await gateway.getAddress();

  console.log("\nDeployment complete");
  console.log(`PlugPointToken:   ${tokenAddress}`);
  console.log(`Payment token:    ${paymentTokenAddress}${mockUsdt ? " (MockUSDT)" : ""}`);
  console.log(`PlugPointVendor:  ${vendorAddress}`);
  console.log(`PlugPointGateway: ${gatewayAddress}`);

  console.log("\nVerification commands");
  console.log(
    `npx hardhat verify --network ${networkName} ${tokenAddress} ${initialHolder}`
  );
  if (mockUsdt) {
    console.log(`npx hardhat verify --network ${networkName} ${paymentTokenAddress}`);
  }
  console.log(
    `npx hardhat verify --network ${networkName} ${vendorAddress} ${tokenAddress} ${paymentTokenAddress} ${platformTreasury} ${rate}`
  );
  console.log(
    `npx hardhat verify --network ${networkName} ${gatewayAddress} ${tokenAddress} ${platformTreasury}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
