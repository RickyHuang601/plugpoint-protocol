# PlugPoint 官方網站

`plugpoint-web/` 是無建置步驟、無後端、無私鑰的純靜態網站，可直接部署至 Cloudflare Pages。正式網站預定為 [https://plugpoint.cc](https://plugpoint.cc)。

## 功能

- BSC Mainnet MetaMask 連線與自動切鏈
- USDT 授權及 Vendor 直購 PLUG
- MetaMask `wallet_watchAsset` 一鍵加入 PLUG
- Cyber Gacha 示範遊戲與 `PointsSpent` 分潤事件解析
- App ID 1 狀態查詢及未註冊時的自助註冊
- 公開 `llms.txt` 與 `contracts.json` AI 串接端點
- 256、64、32 px PNG、SVG 與多尺寸 ICO 品牌資產

## 本機預覽

必須用 HTTP 伺服器預覽，不要直接雙擊 `index.html`，因為資產使用網站根路徑：

```bash
npx serve .
```

也可使用任何靜態伺服器。瀏覽器錢包功能需要 MetaMask；唯讀資料不需要連接錢包。

## Cloudflare Pages 部署

### Direct Upload

1. 登入 Cloudflare Dashboard。
2. 開啟 **Workers & Pages → Create application → Pages → Upload assets**。
3. 建立專案名稱，例如 `plugpoint-web`。
4. 將本資料夾內的檔案直接拖曳上傳；`index.html` 必須位於上傳根目錄。
5. 部署完成後，在 Pages 專案的 **Custom domains** 加入 `plugpoint.cc` 與選用的 `www.plugpoint.cc`。
6. 確認 HTTPS 啟用，並逐一開啟 `/logo.png`、`/logo-32.png`、`/llms.txt`、`/contracts.json`。

### Git 整合

若改用 Git 部署，Build command 留空，Build output directory 設為 `/`（或將本資料夾作為 repository root）。本專案不需要 Node.js 或環境變數。

## 上線前檢查

- `https://plugpoint.cc` 可在桌機與手機開啟。
- MetaMask 可切換到 Chain ID 56。
- Vendor 的 PLUG 庫存與 `rate()` 能正常顯示。
- App ID 1 若尚未註冊，先由預定創作者錢包完成註冊。
- 先用小額執行一次 USDT 購買及 PLUG 扣點。
- `admin@plugpoint.cc` 能收取與寄出驗證信。
- 完成後再提交 BscScan Token Info。

## 安全說明

- 前端只使用公開合約地址，不包含私鑰、API key 或 `.env`。
- UI 成功畫面不是後端付款證明。正式遊戲仍須依 `llms.txt` 以確認後的 `PointsSpent` 事件防重發貨。
- Cyber Gacha 獎品保存在瀏覽器 `localStorage`，僅為無兌換價值的介面示範。
