# PlugPoint Protocol

Open game points and atomic creator settlement on BNB Smart Chain. PlugPoint lets any game register an on-chain App ID, accept the fixed-supply `PLUG` utility point, and settle every confirmed spend directly as **80% creator / 15% protocol / 5% permanent burn**.

[Website](https://plugpoint.cc) · [Whitepaper](https://plugpoint.cc/whitepaper.html) · [AI integration specification](https://plugpoint.cc/llms.txt)

## Mainnet deployment

Network: **BNB Smart Chain Mainnet — Chain ID 56**

| Component | Address | Verification |
| --- | --- | --- |
| PlugPointToken (PLUG) | `0x39801De9D63234D3Cb1344b9df46727001085F4F` | [BscScan](https://bscscan.com/address/0x39801De9D63234D3Cb1344b9df46727001085F4F#code) |
| PlugPointGateway | `0x0ADD4F526A4e512EAfF46208B45FF298A78a8c09` | [BscScan](https://bscscan.com/address/0x0ADD4F526A4e512EAfF46208B45FF298A78a8c09#code) |
| PlugPointVendor | `0xa5B85f726eFFc7513CA67f8984F8b3cd9C88CE70` | [BscScan](https://bscscan.com/address/0xa5B85f726eFFc7513CA67f8984F8b3cd9C88CE70#code) |
| PancakeSwap V2 PLUG/USDT Pair | `0x5099f26E4E83C3C315c7aAA30b40a52a50BbB8b0` | [BscScan](https://bscscan.com/address/0x5099f26E4E83C3C315c7aAA30b40a52a50BbB8b0) |

PLUG has 18 decimals, a fixed initial supply of 1,000,000,000, no mint function, and no transfer tax. Integrations must read live contract state instead of treating the Vendor rate or AMM price as a fiat peg or redemption promise.

## Three-minute integration

### 1. Minimal Solidity interface

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPlugPointGateway {
    event GameRegistered(
        uint256 indexed appId,
        address indexed owner,
        address payoutWallet,
        string metadataUri
    );

    event PointsSpent(
        uint256 indexed appId,
        address indexed player,
        uint256 totalAmount,
        uint256 creatorShare,
        uint256 platformShare,
        uint256 burnedAmount,
        string orderId
    );

    function registerGame(address payoutWallet, string calldata metadataUri)
        external returns (uint256 appId);

    function spendPoints(uint256 appId, uint256 amount, string calldata orderId)
        external;
}
```

### 2. Register a game and spend PLUG with ethers.js v6

```javascript
import { BrowserProvider, Contract, parseUnits } from "ethers";

const CHAIN_ID = 56n;
const PLUG = "0x39801De9D63234D3Cb1344b9df46727001085F4F";
const GATEWAY = "0x0ADD4F526A4e512EAfF46208B45FF298A78a8c09";

const erc20Abi = [
  "function allowance(address,address) view returns (uint256)",
  "function approve(address,uint256) returns (bool)"
];
const gatewayAbi = [
  "function registerGame(address,string) returns (uint256)",
  "function games(uint256) view returns (address,address,string,bool,uint256)",
  "function spendPoints(uint256,uint256,string)",
  "event GameRegistered(uint256 indexed appId,address indexed owner,address payoutWallet,string metadataUri)",
  "event PointsSpent(uint256 indexed appId,address indexed player,uint256 totalAmount,uint256 creatorShare,uint256 platformShare,uint256 burnedAmount,string orderId)"
];

export async function connectPlugPoint() {
  if (!window.ethereum) throw new Error("EVM wallet not found");
  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  if ((await provider.getNetwork()).chainId !== CHAIN_ID) {
    throw new Error("Switch to BNB Smart Chain Mainnet");
  }
  const signer = await provider.getSigner();
  return {
    signer,
    plug: new Contract(PLUG, erc20Abi, signer),
    gateway: new Contract(GATEWAY, gatewayAbi, signer)
  };
}

export async function registerGame(payoutWallet, metadataUri) {
  const { gateway } = await connectPlugPoint();
  const receipt = await (await gateway.registerGame(payoutWallet, metadataUri)).wait();
  const event = receipt.logs
    .map((log) => { try { return gateway.interface.parseLog(log); } catch { return null; } })
    .find((log) => log?.name === "GameRegistered");
  if (!event) throw new Error("Confirmed GameRegistered event not found");
  return event.args.appId;
}

export async function spendPlug(appId, amountPlug, orderId) {
  const { signer, plug, gateway } = await connectPlugPoint();
  const player = await signer.getAddress();
  const amount = parseUnits(amountPlug, 18);
  const game = await gateway.games(appId);
  if (!game[3]) throw new Error("Game is inactive");
  if ((await plug.allowance(player, GATEWAY)) < amount) {
    await (await plug.approve(GATEWAY, amount)).wait();
  }
  return (await gateway.spendPoints(appId, amount, orderId)).wait();
}
```

Production backends must verify confirmed `GameRegistered` and `PointsSpent` events from the canonical Gateway, validate every expected field, enforce uniqueness on `orderId` and `chainId:transactionHash:logIndex`, and handle chain reorganizations before delivering valuable items. See [PLUG_SDK_GUIDE.md](./PLUG_SDK_GUIDE.md) for the complete flow.

## Development

```bash
npm ci
npm test
```

Copy `.env.example` to `.env` only for local deployment. Never commit private keys or API tokens.

## License and brand

Solidity files marked `SPDX-License-Identifier: MIT`, developer interfaces, SDK code, and integration examples are available under the [MIT License](./LICENSE).

The **PlugPoint** name, trademarks, logos, website visual identity, and Whitepaper presentation are © 2026 PlugPoint Protocol. All rights reserved. The MIT license does not grant permission to impersonate PlugPoint, create phishing sites, or imply endorsement.

---

# PlugPoint Protocol（繁體中文）

PlugPoint 是部署於 BNB Smart Chain 的開放式遊戲點數與原子化分潤協議。任何遊戲皆可無需許可取得鏈上 App ID、接收固定供應量的 `PLUG` 實用型點數，並在每次確認消費中自動完成 **80% 創作者實得／15% 協議分潤／5% 永久銷毀**。

[官方網站](https://plugpoint.cc) · [線上白皮書](https://plugpoint.cc/whitepaper.html) · [AI 串接規格](https://plugpoint.cc/llms.txt)

## 主網合約

網路：**BNB Smart Chain Mainnet — Chain ID 56**

| 元件 | 正式地址 |
| --- | --- |
| PlugPointToken (PLUG) | `0x39801De9D63234D3Cb1344b9df46727001085F4F` |
| PlugPointGateway | `0x0ADD4F526A4e512EAfF46208B45FF298A78a8c09` |
| PlugPointVendor | `0xa5B85f726eFFc7513CA67f8984F8b3cd9C88CE70` |
| PancakeSwap V2 PLUG/USDT Pair | `0x5099f26E4E83C3C315c7aAA30b40a52a50BbB8b0` |

PLUG 為 18 位小數、初始固定供應 10 億枚、無增發函式、零轉帳稅。Vendor 匯率與 AMM 報價都不是法幣錨定或保證贖回承諾，正式整合必須讀取即時鏈上狀態。

## 三分鐘接入重點

1. 使用 `registerGame(payoutWallet, metadataUri)` 註冊遊戲，並從已確認的 `GameRegistered` 事件取得 App ID，切勿自行預測編號。
2. 玩家先對正式 Gateway 執行 PLUG `approve`，再呼叫 `spendPoints(appId, amount, orderId)`。
3. 後端只信任 Chain ID 56、正式 Gateway 地址及已確認的 `PointsSpent` 事件；必須驗證所有欄位並防止訂單重放。
4. 完整 Solidity 與 ethers.js v6 範例請參閱上方英文 Quickstart 與 [PLUG_SDK_GUIDE.md](./PLUG_SDK_GUIDE.md)。

## 開發與測試

```bash
npm ci
npm test
```

需要本機部署時，請將 `.env.example` 複製為 `.env` 並只在本機填入參數；嚴禁提交私鑰或 API Token。

## 授權與品牌

標示 `SPDX-License-Identifier: MIT` 的 Solidity 程式、開發者介面、SDK 與整合範例採用 [MIT License](./LICENSE)。

`PlugPoint` 名稱、商標、Logo、網站視覺識別與白皮書版面 © 2026 PlugPoint Protocol，保留所有權利。MIT 授權不包含仿冒品牌、建立釣魚網站或暗示官方背書之權利。
