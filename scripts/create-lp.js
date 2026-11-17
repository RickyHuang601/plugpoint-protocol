"use strict";

const path = require("path");
const { config } = require("dotenv");
const {
  Contract,
  JsonRpcProvider,
  Wallet,
  ZeroAddress,
  formatEther,
  formatUnits,
  getAddress,
  parseEther,
  parseUnits,
} = require("ethers");

config({ path: path.join(__dirname, "..", ".env"), quiet: true });

const SETTINGS = Object.freeze({
  rpcUrl: "https://bsc-dataseed.binance.org/",
  chainId: 56n,
  explorerUrl: "https://bscscan.com",
  expectedWallet: getAddress("0x00351820935e1cF354ADd816866D8A5eB35788E0"),
  plug: getAddress("0x39801De9D63234D3Cb1344b9df46727001085F4F"),
  usdt: getAddress("0x55d398326f99059fF775485246999027B3197955"),
  router: getAddress("0x10ED43C718714eb63d5aA57B78B54704E256024E"),
  factory: getAddress("0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"),
  plugDesired: parseUnits("30", 18),
  usdtDesired: parseUnits("3", 18),
  plugMinimum: parseUnits("29.7", 18),
  usdtMinimum: parseUnits("2.97", 18),
  minimumBnb: parseEther("0.004"),
  deadlineSeconds: 20 * 60,
});

const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

const FACTORY_ABI = [
  "function getPair(address tokenA, address tokenB) view returns (address pair)",
];

const ROUTER_ABI = [
  "function factory() view returns (address)",
  "function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) returns (uint256 amountA, uint256 amountB, uint256 liquidity)",
];

const PAIR_ABI = [
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function balanceOf(address owner) view returns (uint256)",
];

function transactionUrl(hash) {
  return `${SETTINGS.explorerUrl}/tx/${hash}`;
}

function addressUrl(address) {
  return `${SETTINGS.explorerUrl}/address/${address}`;
}

function privateKeyFromEnvironment() {
  const configuredKey = process.env.PRIVATE_KEY?.trim();
  if (!configuredKey) {
    throw new Error("PRIVATE_KEY is missing from the project .env file.");
  }

  const normalizedKey = configuredKey.startsWith("0x")
    ? configuredKey
    : `0x${configuredKey}`;
  if (!/^0x[0-9a-fA-F]{64}$/.test(normalizedKey)) {
    throw new Error("PRIVATE_KEY in .env is not a valid 32-byte EVM private key.");
  }
  return normalizedKey;
}

async function requireContractCode(provider, label, address) {
  const code = await provider.getCode(address);
  if (code === "0x") {
    throw new Error(`${label} has no contract code at ${address}.`);
  }
}

async function printPairStatus(provider, pairAddress, walletAddress) {
  const pair = new Contract(pairAddress, PAIR_ABI, provider);
  const [token0, token1, reserves, lpBalance] = await Promise.all([
    pair.token0(),
    pair.token1(),
    pair.getReserves(),
    pair.balanceOf(walletAddress),
  ]);

  const normalizedToken0 = getAddress(token0);
  const normalizedToken1 = getAddress(token1);
  const supportedPair =
    (normalizedToken0 === SETTINGS.plug && normalizedToken1 === SETTINGS.usdt) ||
    (normalizedToken0 === SETTINGS.usdt && normalizedToken1 === SETTINGS.plug);
  if (!supportedPair) {
    throw new Error("Factory returned a pair whose token addresses do not match PLUG/USDT.");
  }

  const plugReserve = normalizedToken0 === SETTINGS.plug ? reserves[0] : reserves[1];
  const usdtReserve = normalizedToken0 === SETTINGS.usdt ? reserves[0] : reserves[1];

  console.log(`Pair address: ${pairAddress}`);
  console.log(`Pair explorer: ${addressUrl(pairAddress)}`);
  console.log(`PLUG reserve: ${formatUnits(plugReserve, 18)} PLUG`);
  console.log(`USDT reserve: ${formatUnits(usdtReserve, 18)} USDT`);
  console.log(`Wallet Cake-LP balance: ${formatUnits(lpBalance, 18)}`);

  return { plugReserve, usdtReserve, lpBalance };
}

async function ensureAllowance(token, label, owner, amount) {
  const currentAllowance = await token.allowance(owner, SETTINGS.router);
  if (currentAllowance >= amount) {
    console.log(`${label} allowance already sufficient: ${formatUnits(currentAllowance, 18)}`);
    return;
  }

  if (currentAllowance > 0n) {
    console.log(`Resetting existing ${label} allowance to zero...`);
    const resetTransaction = await token.approve(SETTINGS.router, 0n);
    console.log(`${label} reset transaction: ${transactionUrl(resetTransaction.hash)}`);
    const resetReceipt = await resetTransaction.wait(1);
    if (resetReceipt.status !== 1) throw new Error(`${label} allowance reset failed.`);
  }

  console.log(`Approving ${formatUnits(amount, 18)} ${label} for PancakeRouter V2...`);
  const approvalTransaction = await token.approve(SETTINGS.router, amount);
  console.log(`${label} approval transaction: ${transactionUrl(approvalTransaction.hash)}`);
  const approvalReceipt = await approvalTransaction.wait(1);
  if (approvalReceipt.status !== 1) throw new Error(`${label} approval failed.`);
  console.log(`${label} approval confirmed in block ${approvalReceipt.blockNumber}.`);
}

async function main() {
  const provider = new JsonRpcProvider(
    SETTINGS.rpcUrl,
    { chainId: Number(SETTINGS.chainId), name: "bsc-mainnet" },
    { staticNetwork: true }
  );
  const wallet = new Wallet(privateKeyFromEnvironment(), provider);

  const network = await provider.getNetwork();
  if (network.chainId !== SETTINGS.chainId) {
    throw new Error(`Wrong network: expected chainId 56, received ${network.chainId}.`);
  }
  if (wallet.address !== SETTINGS.expectedWallet) {
    throw new Error(
      `Safety stop: PRIVATE_KEY resolves to ${wallet.address}, expected ${SETTINGS.expectedWallet}.`
    );
  }

  console.log("=== PlugPoint PancakeSwap V2 liquidity setup ===");
  console.log(`Network: BNB Smart Chain Mainnet (chainId ${network.chainId})`);
  console.log(`Operator wallet: ${wallet.address}`);
  console.log(`Target ratio: 30 PLUG : 3 USDT (1 PLUG = 0.1 USDT)`);

  await Promise.all([
    requireContractCode(provider, "PLUG", SETTINGS.plug),
    requireContractCode(provider, "USDT", SETTINGS.usdt),
    requireContractCode(provider, "PancakeRouter V2", SETTINGS.router),
    requireContractCode(provider, "PancakeFactory V2", SETTINGS.factory),
  ]);

  const router = new Contract(SETTINGS.router, ROUTER_ABI, wallet);
  const factory = new Contract(SETTINGS.factory, FACTORY_ABI, provider);
  const plug = new Contract(SETTINGS.plug, ERC20_ABI, wallet);
  const usdt = new Contract(SETTINGS.usdt, ERC20_ABI, wallet);

  const [routerFactory, plugSymbol, plugDecimals, usdtSymbol, usdtDecimals] =
    await Promise.all([
      router.factory(),
      plug.symbol(),
      plug.decimals(),
      usdt.symbol(),
      usdt.decimals(),
    ]);
  if (getAddress(routerFactory) !== SETTINGS.factory) {
    throw new Error(
      `Safety stop: Router reports factory ${routerFactory}, expected ${SETTINGS.factory}.`
    );
  }
  if (plugSymbol !== "PLUG" || plugDecimals !== 18n) {
    throw new Error(`Unexpected PLUG metadata: symbol=${plugSymbol}, decimals=${plugDecimals}.`);
  }
  if (usdtDecimals !== 18n) {
    throw new Error(`Unexpected USDT decimals: ${usdtDecimals}; expected 18.`);
  }
  console.log(`Validated tokens: ${plugSymbol} (18 decimals), ${usdtSymbol} (18 decimals)`);
  console.log(`Validated Router factory: ${getAddress(routerFactory)}`);

  const existingPair = getAddress(await factory.getPair(SETTINGS.plug, SETTINGS.usdt));
  if (existingPair !== ZeroAddress) {
    console.log("\nPLUG/USDT V2 pair already exists. No approvals or liquidity transaction were sent.");
    await printPairStatus(provider, existingPair, wallet.address);
    return;
  }

  const [bnbBalance, plugBalance, usdtBalance] = await Promise.all([
    provider.getBalance(wallet.address),
    plug.balanceOf(wallet.address),
    usdt.balanceOf(wallet.address),
  ]);

  console.log("\n=== Funding check ===");
  console.log(`BNB balance: ${formatEther(bnbBalance)} BNB (minimum 0.004)`);
  console.log(`PLUG balance: ${formatUnits(plugBalance, 18)} PLUG (required 30)`);
  console.log(`USDT balance: ${formatUnits(usdtBalance, 18)} USDT (required 3)`);

  const missingBnb = bnbBalance < SETTINGS.minimumBnb;
  const missingPlug = plugBalance < SETTINGS.plugDesired;
  const missingUsdt = usdtBalance < SETTINGS.usdtDesired;
  if (missingBnb || missingPlug || missingUsdt) {
    console.log("\nFUNDS REQUIRED — no approval or liquidity transaction was sent.");
    console.log(`Receiving address: ${wallet.address}`);
    if (missingBnb) {
      console.log(
        `Transfer at least ${formatEther(SETTINGS.minimumBnb - bnbBalance)} more BNB for gas.`
      );
    }
    if (missingPlug) {
      console.log(`Transfer ${formatUnits(SETTINGS.plugDesired - plugBalance, 18)} more PLUG.`);
    }
    if (missingUsdt) {
      console.log(`Transfer ${formatUnits(SETTINGS.usdtDesired - usdtBalance, 18)} more USDT.`);
    }
    console.log("After funding, run: npm run lp:create");
    return;
  }

  console.log("\n=== Token approvals ===");
  await ensureAllowance(plug, "PLUG", wallet.address, SETTINGS.plugDesired);
  await ensureAllowance(usdt, "USDT", wallet.address, SETTINGS.usdtDesired);

  const pairBeforeLiquidity = getAddress(
    await factory.getPair(SETTINGS.plug, SETTINGS.usdt)
  );
  if (pairBeforeLiquidity !== ZeroAddress) {
    console.log("\nSafety stop: the pair was created while approvals were confirming.");
    console.log("No liquidity transaction was sent. Inspect the new pair before proceeding.");
    await printPairStatus(provider, pairBeforeLiquidity, wallet.address);
    return;
  }

  const latestBlock = await provider.getBlock("latest");
  if (!latestBlock) throw new Error("Could not read the latest BSC block.");
  const deadline = BigInt(latestBlock.timestamp + SETTINGS.deadlineSeconds);
  const liquidityArguments = [
    SETTINGS.plug,
    SETTINGS.usdt,
    SETTINGS.plugDesired,
    SETTINGS.usdtDesired,
    SETTINGS.plugMinimum,
    SETTINGS.usdtMinimum,
    wallet.address,
    deadline,
  ];

  console.log("\n=== Adding initial liquidity ===");
  console.log("Desired: 30 PLUG + 3 USDT");
  console.log("Minimums: 29.7 PLUG + 2.97 USDT (99%)");
  const estimatedGas = await router.addLiquidity.estimateGas(...liquidityArguments);
  console.log(`Estimated gas: ${estimatedGas}`);

  const liquidityTransaction = await router.addLiquidity(...liquidityArguments, {
    gasLimit: (estimatedGas * 120n) / 100n,
  });
  console.log(`Liquidity transaction: ${transactionUrl(liquidityTransaction.hash)}`);
  const liquidityReceipt = await liquidityTransaction.wait(1);
  if (liquidityReceipt.status !== 1) throw new Error("addLiquidity transaction failed.");

  const pairAddress = getAddress(await factory.getPair(SETTINGS.plug, SETTINGS.usdt));
  if (pairAddress === ZeroAddress) {
    throw new Error("Liquidity transaction confirmed, but Factory still returns the zero address.");
  }

  console.log("\n=== Liquidity pool created successfully ===");
  console.log(`Confirmed block: ${liquidityReceipt.blockNumber}`);
  console.log(`BscScan transaction: ${transactionUrl(liquidityTransaction.hash)}`);
  await printPairStatus(provider, pairAddress, wallet.address);
}

main().catch((error) => {
  const safeMessage = error?.shortMessage || error?.reason || error?.message || "Unknown error";
  console.error(`Liquidity setup failed: ${safeMessage}`);
  process.exitCode = 1;
});
