# PlugPoint Protocol AI 串接指南

本文件可直接提供給 Codex、Cursor、ChatGPT 或其他程式碼助手，作為新遊戲的 PLUG 買點與扣點規格。範例使用 `ethers.js v6`，所有地址必須替換為目標鏈的實際部署地址。

## 1. 架構與定價

- `PlugPointToken`：18 位小數的固定供應量實用點數，符號 `PLUG`，一般轉帳無交易稅。
- `PlugPointVendor`：接受 18 位小數的 BSC USDT，將款項直接送至平台金庫，再從庫存發出 PLUG。
- `PlugPointGateway`：註冊遊戲並將每筆消費預設拆成創作者 80%、平台 15%、銷毀 5%。

參考匯率為 `1 USDT = 10 PLUG`，亦即 `1 PLUG ≈ 0.1 USDT`。PLUG 支援 18 位小數，因此道具可定價為 `0.5 PLUG`、`10 PLUG` 等任意精度。匯率可由 Vendor 管理員調整，前端顯示報價前必須讀取鏈上 `rate()`，不可把 `10` 當成永遠不變的常數。

> 此協議不承諾 PLUG 與法幣或 USDT 的固定價格。Vendor 是庫存直售機，不是贖回或價格錨定機制。

## 2. 必要 ABI

### PLUG／USDT（ERC-20）

```json
[
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)"
]
```

### PlugPointVendor

```json
[
  "function rate() view returns (uint256)",
  "function buyPoints(uint256 usdtAmount)",
  "event PointsPurchased(address indexed buyer, uint256 usdtPaid, uint256 plugReceived, uint256 currentRate)"
]
```

- `usdtAmount`：以 18 位小數表示的 USDT 數量，例如 `10 USDT = parseUnits("10", 18)`。
- 購買前玩家必須將至少 `usdtAmount` 的 USDT allowance 授權給 Vendor。

### PlugPointGateway

```json
[
  "function registerGame(address payoutWallet, string metadataUri) returns (uint256 appId)",
  "function games(uint256 appId) view returns (address owner, address payoutWallet, string metadataUri, bool active, uint256 totalVolume)",
  "function spendPoints(uint256 appId, uint256 amount, string orderId)",
  "event GameRegistered(uint256 indexed appId, address indexed owner, address payoutWallet, string metadataUri)",
  "event PointsSpent(uint256 indexed appId, address indexed player, uint256 totalAmount, uint256 creatorShare, uint256 platformShare, uint256 burnedAmount, string orderId)"
]
```

- `payoutWallet`：接收創作者分潤的非零地址。
- `metadataUri`：遊戲 JSON 或 IPFS URI。
- `appId`：註冊交易確認後，從 `GameRegistered` 事件取得；不要猜測下一個編號。
- `amount`：以 18 位小數表示的 PLUG 消費量。
- `orderId`：由遊戲後端產生的唯一訂單 ID。合約只記錄、不保證唯一，後端必須自行防止重複發貨。

## 3. 網頁遊戲完整串接範例

安裝依賴：

```bash
npm install ethers
```

前端模組 `plugpoint.js`：

```js
import { BrowserProvider, Contract, parseUnits } from "ethers";

const CHAIN_IDS = new Set([56n, 97n]);
const USDT_ADDRESS = import.meta.env.VITE_USDT_ADDRESS;
const PLUG_ADDRESS = import.meta.env.VITE_PLUG_ADDRESS;
const VENDOR_ADDRESS = import.meta.env.VITE_VENDOR_ADDRESS;
const GATEWAY_ADDRESS = import.meta.env.VITE_GATEWAY_ADDRESS;

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
];
const VENDOR_ABI = [
  "function rate() view returns (uint256)",
  "function buyPoints(uint256 usdtAmount)",
];
const GATEWAY_ABI = [
  "function spendPoints(uint256 appId, uint256 amount, string orderId)",
];

async function connectContracts() {
  if (!window.ethereum) throw new Error("找不到 MetaMask");
  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const network = await provider.getNetwork();
  if (!CHAIN_IDS.has(network.chainId)) {
    throw new Error("請切換至 BSC Mainnet 或 BSC Testnet");
  }

  const signer = await provider.getSigner();
  const account = await signer.getAddress();
  return {
    account,
    usdt: new Contract(USDT_ADDRESS, ERC20_ABI, signer),
    plug: new Contract(PLUG_ADDRESS, ERC20_ABI, signer),
    vendor: new Contract(VENDOR_ADDRESS, VENDOR_ABI, signer),
    gateway: new Contract(GATEWAY_ADDRESS, GATEWAY_ABI, signer),
  };
}

async function ensureAllowance(token, owner, spender, requiredAmount) {
  const allowance = await token.allowance(owner, spender);
  if (allowance >= requiredAmount) return;
  // 授權本次精確金額，降低無限授權風險。
  const approval = await token.approve(spender, requiredAmount);
  await approval.wait();
}

export async function buyPlug(usdtText) {
  const { account, usdt, vendor } = await connectContracts();
  const usdtAmount = parseUnits(usdtText, 18);
  if (usdtAmount <= 0n) throw new Error("購買金額必須大於 0");

  await ensureAllowance(usdt, account, VENDOR_ADDRESS, usdtAmount);
  const quotedPlug = usdtAmount * (await vendor.rate());
  const tx = await vendor.buyPoints(usdtAmount);
  const receipt = await tx.wait();
  return { txHash: receipt.hash, quotedPlug };
}

export async function spendPlug(appId, plugText, orderId) {
  const { account, plug, gateway } = await connectContracts();
  const amount = parseUnits(plugText, 18);
  if (amount <= 0n) throw new Error("消費金額必須大於 0");
  if (!orderId) throw new Error("orderId 不可為空");

  await ensureAllowance(plug, account, GATEWAY_ADDRESS, amount);
  const tx = await gateway.spendPoints(appId, amount, orderId);
  const receipt = await tx.wait();
  return { txHash: receipt.hash };
}

// 使用方式：
// await buyPlug("10"); // 依鏈上 rate，預設取得 100 PLUG
// await spendPlug(1n, "0.5", crypto.randomUUID());
```

不要只依賴前端成功畫面發放道具。前端回傳交易雜湊後，後端仍須獨立驗證已確認的 `PointsSpent` 事件。

## 4. 後端付款驗證（ethers.js v6）

以下範例使用 HTTP RPC 輪詢已達確認數的區塊。正式環境必須把游標與已處理事件寫入資料庫；唯一鍵使用 `chainId + transactionHash + logIndex`，並對 `orderId` 建立唯一約束，才能同時抵抗重啟、重組與重複發貨。

```js
import { Contract, JsonRpcProvider } from "ethers";

const RPC_URL = process.env.BSC_RPC_URL;
const GATEWAY_ADDRESS = process.env.GATEWAY_ADDRESS;
const EXPECTED_APP_ID = BigInt(process.env.APP_ID);
const CONFIRMATIONS = Number(process.env.CONFIRMATIONS || "12");
const START_BLOCK = Number(process.env.START_BLOCK);

if (!RPC_URL || !GATEWAY_ADDRESS || !process.env.APP_ID || !START_BLOCK) {
  throw new Error("缺少 BSC_RPC_URL、GATEWAY_ADDRESS、APP_ID 或 START_BLOCK");
}

const provider = new JsonRpcProvider(RPC_URL);
const gateway = new Contract(
  GATEWAY_ADDRESS,
  [
    "event PointsSpent(uint256 indexed appId, address indexed player, uint256 totalAmount, uint256 creatorShare, uint256 platformShare, uint256 burnedAmount, string orderId)",
  ],
  provider
);

let nextBlock = START_BLOCK; // 正式環境：由資料庫讀取

async function eventAlreadyProcessed(eventKey) {
  // 替換為資料庫 SELECT；範例刻意不把記憶體集合當成正式持久層。
  return false;
}

async function grantItemAndRecordPayment(payment) {
  // 在同一個資料庫交易中：
  // 1. 對 eventKey 與 orderId 寫入唯一紀錄
  // 2. 驗證訂單預期玩家、appId 與金額
  // 3. 發放道具
  console.log("已確認付款，請在此執行資料庫交易", payment);
}

async function scanFinalizedEvents() {
  const latest = await provider.getBlockNumber();
  const finalized = latest - CONFIRMATIONS + 1;
  if (finalized < nextBlock) return;

  const toBlock = Math.min(finalized, nextBlock + 1999);
  const filter = gateway.filters.PointsSpent(EXPECTED_APP_ID);
  const events = await gateway.queryFilter(filter, nextBlock, toBlock);

  for (const event of events) {
    const eventKey = `${event.transactionHash}:${event.index}`;
    if (await eventAlreadyProcessed(eventKey)) continue;

    const payment = {
      eventKey,
      transactionHash: event.transactionHash,
      logIndex: event.index,
      blockNumber: event.blockNumber,
      appId: event.args.appId,
      player: event.args.player,
      totalAmount: event.args.totalAmount,
      creatorShare: event.args.creatorShare,
      platformShare: event.args.platformShare,
      burnedAmount: event.args.burnedAmount,
      orderId: event.args.orderId,
    };
    await grantItemAndRecordPayment(payment);
  }

  nextBlock = toBlock + 1; // 正式環境：與事件處理結果一併持久化
}

setInterval(() => {
  scanFinalizedEvents().catch((error) => console.error("事件掃描失敗", error));
}, 5_000);

await scanFinalizedEvents();
```

後端在發貨前至少驗證：

1. 事件來自正確鏈與正式 `PlugPointGateway` 地址。
2. `appId`、`player`、`totalAmount`、`orderId` 與資料庫訂單完全一致。
3. 交易已達專案設定的確認數，且事件未被處理過。
4. 不以 `creatorShare` 反推售價；費率可調整，訂單原價應比對 `totalAmount`。

## 5. 部署與營運檢查

- BSC Mainnet USDT 地址：`0x55d398326f99059fF775485246999027B3197955`，其 decimals 為 18。主網部署腳本要求明確設定 `PAYMENT_TOKEN_ADDRESS`。
- 部署後先把預計出售的 PLUG 轉入 Vendor，再開放購買。
- 前端同時讀取 Vendor PLUG 庫存與 `rate()`；庫存不足時停止下單。
- 監控 `PointsPurchased`、`PointsSpent`、暫停狀態、Vendor 庫存與管理員異動事件。
- 正式上線前進行獨立安全稽核，並將合約 owner 移交多簽錢包。
