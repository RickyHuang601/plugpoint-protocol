"use strict";

const fs = require("fs");
const path = require("path");
const {
  Contract,
  JsonRpcProvider,
  formatUnits,
  getAddress,
  parseUnits,
} = require("ethers");

// 只登記「初始基準以外」的特殊調整；初始 Vendor 5,000 萬 PLUG、
// 金庫基準 949,999,970 PLUG 已內建。創世建池的 3 USDT 來自首筆直售營收，
// 已反映在 Pair 實際儲備，不是額外私人墊資，故 USDT 額外基準固定為 0。
const MANUAL_ADJUSTMENTS = Object.freeze({
  vendorPlugAdded: "0",
  vendorPlugWithdrawn: "0",
  additionalTreasuryPlugToLp: "0",
});

const RPC_URLS = Object.freeze([
  "https://bsc-dataseed.binance.org/",
  "https://bsc-dataseed1.defibit.io/",
]);

const PUBLIC_CONFIG_PATH = path.join(__dirname, "..", "plugpoint-web", "contracts.json");
const PUBLIC_CONFIG = JSON.parse(fs.readFileSync(PUBLIC_CONFIG_PATH, "utf8"));

const CONFIG = Object.freeze({
  chainId: 56n,
  plug: getAddress(PUBLIC_CONFIG.contracts.plugPointToken),
  usdt: getAddress(PUBLIC_CONFIG.contracts.usdt),
  vendor: getAddress(PUBLIC_CONFIG.contracts.plugPointVendor),
  gateway: getAddress(PUBLIC_CONFIG.contracts.plugPointGateway),
  pair: getAddress(PUBLIC_CONFIG.liquidity.pairAddress),
  lpHolder: getAddress("0x00351820935e1cF354ADd816866D8A5eB35788E0"),
  decimals: 18,
  initialSupply: parseUnits("1000000000", 18),
  initialVendorInventory: parseUnits("50000000", 18),
  treasuryPlugBaselineAfterInitialLp: parseUnits("949999970", 18),
  initialLpPlug: parseUnits("30", 18),
  initialLpUsdt: parseUnits("0", 18),
  vendorRateBaseline: 10n,
  creatorReserveBps: 8000n,
  profitBps: 2000n,
  platformBps: 1500n,
  burnBps: 500n,
  bpsDenominator: 10000n,
});

const ERC20_ABI = [
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

const VENDOR_ABI = [
  "function treasury() view returns (address)",
  "function platformTreasury() view returns (address)",
  "function plugToken() view returns (address)",
  "function paymentToken() view returns (address)",
  "function rate() view returns (uint256)",
];

const GATEWAY_ABI = ["function platformTreasury() view returns (address)"];

const PAIR_ABI = [
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
];

function adjustment(name) {
  const value = MANUAL_ADJUSTMENTS[name];
  if (!/^(0|[1-9]\d*)(\.\d{1,18})?$/.test(value)) {
    throw new Error(`MANUAL_ADJUSTMENTS.${name} 必須是非負數字字串。`);
  }
  return parseUnits(value, CONFIG.decimals);
}

function max(value, floor = 0n) {
  return value > floor ? value : floor;
}

function min(a, b) {
  return a < b ? a : b;
}

function formatAmount(value, fractionDigits = 6) {
  const negative = value < 0n;
  const absolute = negative ? -value : value;
  const [whole, fraction = ""] = formatUnits(absolute, CONFIG.decimals).split(".");
  const visibleFraction = fraction.slice(0, fractionDigits).replace(/0+$/, "");
  const result = visibleFraction ? `${whole}.${visibleFraction}` : whole;
  return result === "0" ? "0" : `${negative ? "-" : ""}${result}`;
}

function formatPercent(numerator, denominator, fractionDigits = 8) {
  if (denominator === 0n) return "0";
  const scale = 10n ** BigInt(fractionDigits);
  const scaled = (numerator * 100n * scale) / denominator;
  const whole = scaled / scale;
  const fraction = (scaled % scale).toString().padStart(fractionDigits, "0").replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}` : whole.toString();
}

function printAmount(label, value, unit) {
  console.log(`  ${label.padEnd(35, "　")} ${formatAmount(value, 12)} ${unit}`);
}

function printAddress(label, address) {
  console.log(`  ${label.padEnd(22, "　")} ${address}`);
}

function taipeiTime(timestampSeconds) {
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(Number(timestampSeconds) * 1000));
}

async function withTimeout(promise, milliseconds, message) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), milliseconds);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function connectProvider() {
  const failures = [];
  for (const rpcUrl of RPC_URLS) {
    const provider = new JsonRpcProvider(
      rpcUrl,
      { chainId: Number(CONFIG.chainId), name: "bsc-mainnet" },
      { staticNetwork: true }
    );
    try {
      const network = await withTimeout(provider.getNetwork(), 8000, "RPC 連線逾時");
      await withTimeout(provider.getBlockNumber(), 8000, "RPC 區塊查詢逾時");
      if (network.chainId !== CONFIG.chainId) {
        throw new Error(`chainId ${network.chainId} 不是 56`);
      }
      return { provider, rpcUrl };
    } catch (error) {
      failures.push(`${rpcUrl}: ${error.shortMessage || error.message}`);
      provider.destroy?.();
    }
  }
  throw new Error(`所有 RPC 均無法使用：${failures.join(" | ")}`);
}

async function requireContractCode(provider, label, address) {
  if ((await provider.getCode(address)) === "0x") {
    throw new Error(`${label} 在 ${address} 沒有合約程式碼。`);
  }
}

async function readTreasury(vendor) {
  try {
    return { address: getAddress(await vendor.treasury()), source: "Vendor.treasury()" };
  } catch {
    return {
      address: getAddress(await vendor.platformTreasury()),
      source: "Vendor.platformTreasury()（實際部署介面）",
    };
  }
}

async function main() {
  const { provider, rpcUrl } = await connectProvider();
  await Promise.all([
    requireContractCode(provider, "PLUG", CONFIG.plug),
    requireContractCode(provider, "USDT", CONFIG.usdt),
    requireContractCode(provider, "Vendor", CONFIG.vendor),
    requireContractCode(provider, "Gateway", CONFIG.gateway),
    requireContractCode(provider, "Pair", CONFIG.pair),
  ]);

  const plug = new Contract(CONFIG.plug, ERC20_ABI, provider);
  const usdt = new Contract(CONFIG.usdt, ERC20_ABI, provider);
  const vendor = new Contract(CONFIG.vendor, VENDOR_ABI, provider);
  const gateway = new Contract(CONFIG.gateway, GATEWAY_ABI, provider);
  const pair = new Contract(CONFIG.pair, PAIR_ABI, provider);
  const treasuryInfo = await readTreasury(vendor);

  const [
    latestBlock,
    plugSymbol,
    plugDecimals,
    usdtDecimals,
    totalSupply,
    vendorPlugToken,
    vendorPaymentToken,
    vendorRate,
    gatewayTreasuryRaw,
    vendorInventory,
    treasuryUsdtBalance,
    treasuryPlugBalance,
    token0Raw,
    token1Raw,
    reserves,
    lpTotalSupply,
    lpHolderBalance,
  ] = await Promise.all([
    provider.getBlock("latest"),
    plug.symbol(),
    plug.decimals(),
    usdt.decimals(),
    plug.totalSupply(),
    vendor.plugToken(),
    vendor.paymentToken(),
    vendor.rate(),
    gateway.platformTreasury(),
    plug.balanceOf(CONFIG.vendor),
    usdt.balanceOf(treasuryInfo.address),
    plug.balanceOf(treasuryInfo.address),
    pair.token0(),
    pair.token1(),
    pair.getReserves(),
    pair.totalSupply(),
    pair.balanceOf(CONFIG.lpHolder),
  ]);

  if (!latestBlock) throw new Error("無法取得最新區塊。");
  if (plugSymbol !== "PLUG" || plugDecimals !== 18n || usdtDecimals !== 18n) {
    throw new Error("代幣 symbol 或 decimals 與模型不一致。");
  }
  if (getAddress(vendorPlugToken) !== CONFIG.plug || getAddress(vendorPaymentToken) !== CONFIG.usdt) {
    throw new Error("Vendor 的 PLUG / USDT 地址與 contracts.json 不一致。");
  }
  const gatewayTreasury = getAddress(gatewayTreasuryRaw);
  if (gatewayTreasury !== treasuryInfo.address) {
    throw new Error(`Vendor 金庫 ${treasuryInfo.address} 與 Gateway 金庫 ${gatewayTreasury} 不一致。`);
  }

  const token0 = getAddress(token0Raw);
  const token1 = getAddress(token1Raw);
  const validPair =
    (token0 === CONFIG.plug && token1 === CONFIG.usdt) ||
    (token0 === CONFIG.usdt && token1 === CONFIG.plug);
  if (!validPair) throw new Error("Pair 不是 contracts.json 指定的 PLUG/USDT 交易對。");
  const reservePlug = token0 === CONFIG.plug ? reserves[0] : reserves[1];
  const reserveUsdt = token0 === CONFIG.usdt ? reserves[0] : reserves[1];
  if (reserveUsdt === 0n) throw new Error("Pair USDT 儲備為 0，無法換算補池比例。");

  const adjustedVendorBaseline =
    CONFIG.initialVendorInventory +
    adjustment("vendorPlugAdded") -
    adjustment("vendorPlugWithdrawn");
  const cumulativePlugSold = max(adjustedVendorBaseline - vendorInventory);
  const cumulativeRevenueUsdt = cumulativePlugSold / CONFIG.vendorRateBaseline;
  const burnedPlug = CONFIG.initialSupply - totalSupply;
  const cumulativeGameSpend = (burnedPlug * CONFIG.bpsDenominator) / CONFIG.burnBps;

  const creatorReserveFromRevenue =
    (cumulativeRevenueUsdt * CONFIG.creatorReserveBps) / CONFIG.bpsDenominator;
  const targetPoolUsdt = creatorReserveFromRevenue;
  const immediateUsdtGap = max(targetPoolUsdt - reserveUsdt);
  const immediatePairedPlug = (immediateUsdtGap * reservePlug) / reserveUsdt;

  const accruedProfitUsdt =
    (cumulativeRevenueUsdt * CONFIG.profitBps) / CONFIG.bpsDenominator;
  const profitAfterReserveGap = max(accruedProfitUsdt - immediateUsdtGap);
  const safelyTransferableProfitUsdt = min(treasuryUsdtBalance, profitAfterReserveGap);
  const unavailableAccruedProfitUsdt = accruedProfitUsdt - safelyTransferableProfitUsdt;

  const additionalTreasuryPlugToLp = adjustment("additionalTreasuryPlugToLp");
  const adjustedTreasuryPlugBaseline =
    CONFIG.treasuryPlugBaselineAfterInitialLp - additionalTreasuryPlugToLp;
  const treasuryDerivedPlatformPlug = treasuryPlugBalance - adjustedTreasuryPlugBaseline;
  const spendDerivedPlatformPlug =
    (cumulativeGameSpend * CONFIG.platformBps) / CONFIG.bpsDenominator;
  const commissionReconciliationDifference = treasuryDerivedPlatformPlug - spendDerivedPlatformPlug;

  const lpOwnedPlug = lpTotalSupply > 0n ? (reservePlug * lpHolderBalance) / lpTotalSupply : 0n;
  const lpOwnedUsdt = lpTotalSupply > 0n ? (reserveUsdt * lpHolderBalance) / lpTotalSupply : 0n;

  console.log("\n╔══════════════════════════════════════════════════════════════════════╗");
  console.log("║     PlugPoint 即時準備金缺口與純利潤雙用計算機（唯讀）           ║");
  console.log("╚══════════════════════════════════════════════════════════════════════╝");
  console.log(`  資料區塊：${latestBlock.number}`);
  console.log(`  台北時間：${taipeiTime(latestBlock.timestamp)}`);
  console.log(`  使用 RPC：${rpcUrl}`);
  console.log("  安全狀態：未讀取 .env、未建立 Wallet、未簽署交易");
  printAddress("Vendor", CONFIG.vendor);
  printAddress("Treasury", treasuryInfo.address);
  console.log(`  金庫讀取介面：${treasuryInfo.source}`);

  console.log("\n【1. 全網銷量與總營收】");
  printAmount("Vendor 初始庫存", CONFIG.initialVendorInventory, "PLUG");
  printAmount("Vendor 目前庫存", vendorInventory, "PLUG");
  printAmount("累計售出", cumulativePlugSold, "PLUG");
  printAmount("直售機累計總營收", cumulativeRevenueUsdt, "USDT");
  printAmount("全網累計永久銷毀", burnedPlug, "PLUG");
  printAmount("Burn 反推遊戲累計消費", cumulativeGameSpend, "PLUG");
  console.log(`  Vendor 現行鏈上 rate：1 USDT = ${vendorRate} PLUG`);
  if (vendorRate !== CONFIG.vendorRateBaseline) {
    console.log("  ⚠ 現行 rate 已偏離 10；歷史營收估算需在 MANUAL_ADJUSTMENTS 補登分段匯率影響。");
  }

  console.log("\n【2. 動作一：現在該補多少準備金進 PancakeSwap？】");
  printAmount("創世建池額外私人墊資基準", CONFIG.initialLpUsdt, "USDT");
  printAmount("累計營收的 80% 責任額", creatorReserveFromRevenue, "USDT");
  printAmount("目標池子 USDT 基準", targetPoolUsdt, "USDT");
  printAmount("Pair 實際 USDT 儲備", reserveUsdt, "USDT");
  printAmount("Pair 實際 PLUG 儲備", reservePlug, "PLUG");
  printAmount("【立即應補 USDT 缺口】", immediateUsdtGap, "USDT");
  printAmount("【立即應補配對 PLUG】", immediatePairedPlug, "PLUG");
  if (immediateUsdtGap > 0n) {
    console.log("\n  ⚠ 準備金尚未足額");
    console.log(
      `  請從金庫轉出 ${formatAmount(immediateUsdtGap, 12)} USDT + ` +
      `${formatAmount(immediatePairedPlug, 12)} PLUG 至 ${CONFIG.lpHolder} 並執行補池。`
    );
  } else {
    console.log("\n  ✓ 準備金已 100% 足額在池。");
  }

  console.log("\n【3. 動作二：有多少純利潤完全屬於平台？】");
  printAmount("累計應得 20% USDT 純利潤", accruedProfitUsdt, "USDT");
  printAmount("金庫目前實際 BSC-USD", treasuryUsdtBalance, "USDT");
  printAmount("20% 應計利潤扣除補池缺口後上限", profitAfterReserveGap, "USDT");
  printAmount("【現在可安心轉入私人錢包】", safelyTransferableProfitUsdt, "USDT");
  printAmount("已應計但目前不可轉出", unavailableAccruedProfitUsdt, "USDT");
  printAmount("金庫目前 PLUG 餘額", treasuryPlugBalance, "PLUG");
  printAmount("調整後 PLUG 本金基準", adjustedTreasuryPlugBaseline, "PLUG");
  printAmount("【金庫餘額反推 15% 佣金】", treasuryDerivedPlatformPlug, "PLUG");
  printAmount("遊戲消費反推 15% 佣金", spendDerivedPlatformPlug, "PLUG");
  printAmount("PLUG 佣金交叉核對差額", commissionReconciliationDifference, "PLUG");

  console.log("\n【4. LP 現況與執行參考】");
  printAddress("Pair", CONFIG.pair);
  console.log(`  Deployer LP 佔比：${formatPercent(lpHolderBalance, lpTotalSupply, 12)}%`);
  printAmount("LP 持倉對應 PLUG", lpOwnedPlug, "PLUG");
  printAmount("LP 持倉對應 USDT", lpOwnedUsdt, "USDT");
  console.log(
    `  即時配對比例：1 USDT ≈ ${formatAmount((reservePlug * parseUnits("1", 18)) / reserveUsdt, 12)} PLUG`
  );

  console.log("\n  會計原則：先補足 80% 營收責任額，再從實際金庫現金中提取最多 20% 應計純利潤。");
  console.log("  風險提示：Pair 儲備會因交易改變；補池前仍應重新執行 npm run profit 取得最新成對數量。\n");
}

main().catch((error) => {
  const message = error?.shortMessage || error?.reason || error?.message || "未知錯誤";
  console.error(`profit 計算失敗：${message}`);
  process.exitCode = 1;
});
