# PlugPoint 免費官方信箱設定

目標：將 `admin@plugpoint.cc` 與 `support@plugpoint.cc` 的來信免費轉寄至 Gmail，並嘗試從 Gmail 介面以 `admin@plugpoint.cc` 寄件。

> Cloudflare Email Routing 負責「收信轉寄」，不是完整郵箱，也不提供傳統 SMTP 信箱。消費型 Gmail 的自訂寄件身分屬輕量方案，寄件驗證與送達率不等同 Google Workspace 或專業郵件服務。BscScan 審核前務必實測收、寄、回覆與垃圾郵件分類。

## 一、啟用 Cloudflare Email Routing

Cloudflare 現行介面位於 **Compute → Email Service → Email Routing**；部分帳號仍可能從網域頁面的 **Email → Email Routing** 進入。

1. 登入 Cloudflare Dashboard，確認 `plugpoint.cc` 已使用 Cloudflare nameservers。
2. 開啟 **Compute → Email Service → Email Routing → Destination Addresses**。
3. 新增要接收轉寄的個人 Gmail 地址。
4. 到 Gmail 開啟 Cloudflare 驗證信，點擊 **Verify email address**。目的地址未驗證前，路由規則不會生效。
5. 回到 **Email Routing → Domains**，選擇並啟用 `plugpoint.cc`。
6. 讓 Cloudflare 自動新增所需的 MX、SPF，以及介面要求的其他 DNS 記錄。若根網域已有其他郵件供應商 MX，必須先評估並排除衝突。
7. 進入 **Routing Rules → Create routing rule**：
   - Email pattern：`admin`
   - Action：`Send to an email`
   - Destination：剛才驗證的 Gmail
8. 再建立 `support` 規則，轉寄至同一或另一個已驗證 Gmail。
9. 從另一個信箱寄測試信至兩個地址，確認 Gmail 收到且 Reply-To／寄件者資訊正確。

官方參考：

- [Cloudflare Email Routing addresses and rules](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/)
- [Cloudflare Email Service domain configuration](https://developers.cloudflare.com/email-service/configuration/domains/)

## 二、準備 Gmail 應用程式密碼

1. 登入用來代收信件的 Google 帳戶。
2. 至 **Google Account → Security & sign-in → 2-Step Verification** 開啟兩步驟驗證。
3. 開啟 [Google App Passwords](https://myaccount.google.com/apppasswords)。
4. 建立一組專供 `PlugPoint SMTP` 使用的 16 位應用程式密碼，立即保存於密碼管理器。
5. 不要把應用程式密碼寫進本專案、Git、Cloudflare Pages 或任何前端程式。

若帳戶使用 Advanced Protection、只允許安全金鑰，或由公司／學校管理，App Password 選項可能不存在。Google 也會在主密碼變更後撤銷既有 App Password。

官方參考：[Google — Sign in with app passwords](https://support.google.com/accounts/answer/185833)

## 三、在 Gmail 加入 `admin@plugpoint.cc` 寄件身分

1. 在桌面版 Gmail 開啟 **Settings → See all settings → Accounts and Import**。
2. 找到 **Send mail as**，點 **Add another email address**。
3. Name 填 `PlugPoint Protocol`，Email 填 `admin@plugpoint.cc`。
4. 是否勾選 **Treat as an alias** 取決於回覆需求；單一團隊信箱通常可勾選。
5. SMTP 設定：
   - SMTP Server：`smtp.gmail.com`
   - Port：`587`
   - Secured connection：`TLS`
   - Username：完整 Gmail 地址（不是 `admin@plugpoint.cc`）
   - Password：上一節建立的 16 位 App Password
6. Gmail 會寄確認信到 `admin@plugpoint.cc`；它應經 Cloudflare Email Routing 回到 Gmail。開啟連結完成確認。
7. 撰寫新信，展開 From 欄位並選擇 `admin@plugpoint.cc`。
8. 寄到外部測試信箱，檢查實際 From、Reply-To、退信、垃圾郵件分類及「via gmail.com／代寄」標記。

官方參考：[Gmail — Send emails from a different address or alias](https://support.google.com/mail/answer/22370)

## 四、重要限制與替代方案

- Cloudflare Email Routing 的自動 SPF 是為轉寄流程服務，不代表消費型 Gmail 能替 `plugpoint.cc` 產生網域對齊的 DKIM。
- 若 Gmail 不接受該 SMTP 組合、顯示代寄標記，或 DMARC 對齊／送達率不符合 BscScan 審核需求，請改用有正式 SMTP 與 DKIM 的郵件供應商或 Google Workspace。
- 不要任意把多個供應商的 SPF TXT 分成多筆；一個網域只能有一份有效 SPF policy，需合併供應商機制。
- 建議新增 DMARC 監控記錄並先使用寬鬆政策觀察報告，確認所有合法寄件來源後再提高政策。
- 應用程式密碼若外洩，立即從 Google Account 撤銷並重新建立。
