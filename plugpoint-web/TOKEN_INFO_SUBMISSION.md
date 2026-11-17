# BscScan Token Info 審核申請包

## 重要規格更新

BscScan 現行官方指引偏好 **32×32 SVG** 或 **64×64 PNG**。本網站同時提供：

- 向量 Logo：`https://plugpoint.cc/logo.svg`
- 現行建議 PNG：`https://plugpoint.cc/logo-64.png`
- 專案原定 32×32 PNG：`https://plugpoint.cc/logo-32.png`

若表單明確要求 32×32 PNG，可使用 `logo-32.png`；若接受現行官方規格，優先使用 `logo.svg` 或 `logo-64.png`。Logo URL 必須公開、不需登入、直接回傳圖檔。

官方指引：[BscScan Token Info Submission Guidelines](https://info.bscscan.com/how-to-update-token-info/)

## 可直接填寫的資料

**Token Contract Address**

```text
0x39801De9D63234D3Cb1344b9df46727001085F4F
```

**Project Name**

```text
PlugPoint Protocol
```

**Token Symbol**

```text
PLUG
```

**Official Site URL**

```text
https://plugpoint.cc
```

**Official Email Address**

```text
admin@plugpoint.cc
```

**Link to download logo（現行建議）**

```text
https://plugpoint.cc/logo-64.png
```

**Link to download a 32x32 PNG icon logo（若表單指定）**

```text
https://plugpoint.cc/logo-32.png
```

**Project Description**

```text
PlugPoint (PLUG) is a zero-tax, fixed-supply BEP-20 utility gaming point protocol on BNB Smart Chain, enabling AI-generated games and indie developers to integrate plug-and-play on-chain payments with automated 80/15/5 revenue sharing.
```

**Contract source code**

```text
https://bscscan.com/address/0x39801De9D63234D3Cb1344b9df46727001085F4F#code
```

**Official project links**

```text
AI integration specification: https://plugpoint.cc/llms.txt
Machine-readable contracts: https://plugpoint.cc/contracts.json
```

## 建議申請留言

```text
Hello BscScan Team,

Please review the official token information for PlugPoint (PLUG). The contract source code is verified, the project website and logo files are publicly accessible, and the contact email uses the official plugpoint.cc domain. PLUG is a fixed-supply, zero-transfer-tax utility gaming point used by the PlugPoint Vendor and Gateway contracts on BNB Smart Chain.

Thank you.
```

## 提交前檢查清單

- [ ] `plugpoint-web/` 已部署至 Cloudflare Pages，正式網域为 `https://plugpoint.cc`。
- [ ] `https://plugpoint.cc/logo.svg`、`logo-64.png` 與 `logo-32.png` 均可直接開啟，Content-Type 正確。
- [ ] `https://plugpoint.cc/contracts.json` 是有效 JSON。
- [ ] `admin@plugpoint.cc` 能收取外部信件與寄出回覆。
- [ ] Token 原始碼仍顯示為 BscScan Verified。
- [ ] Vendor 已有 PLUG 庫存，鏈上 `rate()` 與官網顯示一致。
- [ ] App ID 1 已由正確創作者地址註冊並啟用。
- [ ] 已用小額跑通至少 1～2 筆真實 USDT 購買與 PLUG `spendPoints` 交易。
- [ ] 官網沒有收益承諾、法幣錨定承諾、誇大比較或未經證實的合作方聲明。
- [ ] 申請由官方網域信箱送出，且所有網址皆為 HTTPS 公開連結。

## 審核注意事項

- 專案名稱、Symbol、Logo 與網站不得冒用其他品牌或公共機構。
- 描述採中立語氣，不使用「最佳、最快、最穩定」等比較或保證字眼。
- BscScan 可要求補件、加註標籤或拒絕更新；提交成功不代表保證通過。
- 若地址或網站內容日後變更，必須重新核對所有公開端點與申請資料。
