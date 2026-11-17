"use strict";

const CONFIG = Object.freeze({
  chainId: 56n,
  chainIdHex: "0x38",
  chainName: "BNB Smart Chain Mainnet",
  rpcUrl: "https://bsc-dataseed.binance.org/",
  explorerUrl: "https://bscscan.com",
  token: "0x39801De9D63234D3Cb1344b9df46727001085F4F",
  vendor: "0xa5B85f726eFFc7513CA67f8984F8b3cd9C88CE70",
  gateway: "0x0ADD4F526A4e512EAfF46208B45FF298A78a8c09",
  usdt: "0x55d398326f99059fF775485246999027B3197955",
  logoUrl: "https://plugpoint.cc/logo.png",
  demoAppId: 1n,
});

const TRANSLATIONS = {
  en: {
    "meta.description": "PlugPoint Protocol — zero-tax game points, direct sales, and automatic revenue sharing on BNB Smart Chain.",
    "nav.aria": "Primary navigation", "nav.buy": "Buy points", "nav.gacha": "Cyber Gacha", "nav.developers": "Developers", "nav.whitepaper": "Whitepaper",
    "wallet.connect": "Connect wallet", "wallet.connected": "Wallet connected: {address}", "wallet.missing": "MetaMask was not found. Install a compatible wallet extension first.",
    "network.readOnly": "BSC · READ ONLY", "network.connected": "BSC · CONNECTED",
    "hero.live": "Live on BNB Smart Chain", "hero.title1": "Power every game.", "hero.title2": "Split value on-chain.",
    "hero.body": "PLUG is a fixed-supply game point built for AI games and independent developers. Players buy points directly with USDT, while the Gateway automatically splits every spend among the creator, platform, and token burn.",
    "hero.getPlug": "Get PLUG", "hero.addWallet": "＋ Add to MetaMask", "hero.aiSpec": "AI specification", "hero.supply": "Fixed supply: 1,000,000,000 PLUG · 0% transfer tax · 18 decimals",
    "telemetry.eyebrow": "Asset telemetry", "telemetry.title": "Live asset dashboard", "telemetry.myUsdt": "My USDT", "telemetry.myPlug": "My PLUG", "telemetry.inventory": "Vendor inventory", "telemetry.rate": "Live on-chain rate",
    "telemetry.disclaimer": "The displayed rate is not a fiat peg or redemption promise. Always verify the on-chain rate() before transacting.", "telemetry.swapTitle": "Creator cash-out", "telemetry.swapStatus": "PancakeSwap V2 liquidity pool is live (1 PLUG = 0.1 USDT initial ratio).", "telemetry.swapButton": "Swap / cash out PLUG ↗",
    "common.refresh": "Refresh", "common.loading": "Loading…", "common.search": "Search", "common.clear": "Clear", "common.invalidFormat": "Invalid format", "common.listSeparator": " · ",
    "buy.eyebrow": "01 · Point terminal", "buy.title1": "Buy PLUG points", "buy.title2": "directly with USDT", "buy.body": "No DEX and no slippage. USDT goes directly to the platform treasury, while PLUG is delivered from the pre-funded Vendor inventory to your wallet.",
    "buy.amount": "Choose an amount", "buy.quickAria": "USDT quick amounts", "buy.receive": "You receive", "buy.button": "Buy PLUG now", "buy.note": "MetaMask will ask you to sign. If your allowance is already sufficient, the purchase proceeds immediately.", "buy.processing": "Processing…", "buy.stepApprove": "Approve", "buy.stepPurchase": "Purchase", "buy.stepConfirm": "Confirm",
    "gacha.eyebrow": "02 · Demo game · App ID 1", "gacha.capsule": "Quantum capsule", "gacha.cost": "ON-CHAIN COST", "gacha.body": "Real PLUG spending with an on-chain 80/15/5 split. Prizes and random results are local demo collectibles with no redemption value and are not verifiable on-chain randomness.",
    "gacha.syncing": "Syncing App ID 1…", "gacha.single": "Single draw", "gacha.five": "Five draws", "gacha.split": "This on-chain split", "gacha.creator": "Creator", "gacha.platform": "Platform", "gacha.burn": "Burn",
    "gacha.notRegistered": "App ID 1 is not registered. Register it in the developer section first.", "gacha.paused": "The game is registered but is not accepting PLUG right now.", "gacha.ready": "Energy core ready. Start a draw.", "gacha.connect": "Connect your wallet to start a draw.", "gacha.decoding": "Decoding the energy core…", "gacha.complete": "Draw complete: {summary}",
    "gacha.singleAction": "Single draw", "gacha.fiveAction": "Five draws",
    "loot.eyebrow": "Local vault", "loot.title": "Player inventory", "loot.items": "ITEMS", "loot.emptyGuest": "Connect your wallet and complete a draw. Your loot will be saved in this browser.", "loot.empty": "Your inventory is empty.",
    "prize.ssr": "Legendary Mech", "prize.sr": "Energy Core", "prize.r": "Titanium Shield", "prize.n": "Basic Component",
    "registry.eyebrow": "Gateway registry", "registry.title": "Global game registry", "registry.count": "Games registered network-wide", "registry.gamesUnit": "games", "registry.next": "Next available number", "registry.lookup": "Look up any game App ID",
    "registry.liveTitle": "App ID #{appId} live data", "registry.owner": "Registrant", "registry.payout": "Payout address", "registry.active": "Status", "registry.volume": "Total volume", "registry.notRegistered": "Not registered", "registry.enabled": "Active", "registry.paused": "Paused",
    "register.title": "Register a new game (get a new App ID)", "register.body": "This desk is always open. Any developer can claim the next on-chain number. Verify the payout address and Metadata URI; only the registrant can update the game later.",
    "register.payout": "Creator payout address", "register.payoutPlaceholder": "Connect a wallet to fill this automatically, or enter 0x…", "register.metadata": "Game Metadata URI", "register.button": "Register now and claim App ID #{appId}", "register.processing": "Registering App ID #{appId}…", "register.confirmationLabel": "Registration confirmed", "register.confirmed": "Your game received", "register.viewTx": "View transaction on BscScan ↗", "register.summary": "Payout {payout} · Metadata {metadata}",
    "ai.eyebrow": "AI integration port", "ai.title": "Hand the protocol to your AI", "ai.body": "Give the public specification endpoint to any AI coding assistant to obtain mainnet addresses, minimal ABIs, the approval flow, and backend event-deduplication rules.",
    "ai.prompt": "Read https://plugpoint.cc/llms.txt and integrate PLUG purchases and Gateway spending into my game. Verify PointsSpent events according to the specification.", "ai.copy": "Copy AI integration prompt", "ai.copied": "Copied. Paste it directly into your AI assistant.",
    "log.title": "Live transaction log", "log.connecting": "[SYSTEM] Connecting to the BSC Mainnet read-only endpoint…", "language.label": "Language", "footer.copyright": "© 2026 PlugPoint Protocol. All rights reserved. Integration SDK & smart contract interfaces are provided under the MIT License.",
    "error.unknown": "Unknown error", "error.rejected": "The wallet signature was cancelled.", "error.gas": "Your wallet does not have enough BNB for gas.", "error.inventory": "The Vendor does not have enough PLUG inventory.", "error.noWallet": "MetaMask or a compatible EVM wallet was not found.", "error.wrongNetwork": "The wallet is not connected to BSC Mainnet.", "error.connectFirst": "Connect your wallet first.", "error.networkSwitched": "The network was switched. Please try the action again.", "error.amount": "The purchase amount must be greater than 0.",
    "error.purchaseEvent": "The transaction was confirmed, but the PointsPurchased event was not found.", "error.appId": "App ID must be a positive integer.", "error.zeroPayout": "The creator payout address cannot be the zero address.", "error.metadataEmpty": "Metadata URI is required.", "error.metadataUrl": "Metadata URI must be a valid HTTP, HTTPS, or IPFS URL.", "error.metadataProtocol": "Metadata URI must use HTTP, HTTPS, or IPFS.", "error.registrationEvent": "The transaction was confirmed, but the GameRegistered event was not found.", "error.registrationMismatch": "The GameRegistered event does not match this registration.",
    "error.gameInactive": "App ID 1 is not active, so PLUG cannot be spent.", "error.balance": "Insufficient PLUG balance. You need {amount} PLUG.", "error.spendEvent": "The transaction was confirmed, but the PointsSpent event was not found.", "error.spendMismatch": "The PointsSpent event does not match this order. Reward delivery was stopped.",
    "log.allowanceNeeded": "Approval for {label} is required. Confirm it in your wallet.", "log.allowanceSent": "{label} approval submitted. Waiting for confirmation.", "log.allowanceConfirmed": "{label} approval confirmed.", "log.purchaseSent": "Purchase submitted. Expected receipt: {amount} PLUG.", "log.purchaseComplete": "Purchase complete: {amount} PLUG received.", "log.appLoaded": "App ID #{appId} on-chain data loaded.", "log.registrationSent": "App ID #{appId} registration submitted.", "log.registrationComplete": "Registration complete: you received App ID #{appId}.", "log.spendSent": "{action} PLUG spend submitted. Order {orderId}.", "log.spendComplete": "On-chain spending and revenue split confirmed: {amount} PLUG.", "log.tokenAdded": "PLUG was added to your wallet assets.", "log.tokenNotAdded": "PLUG was not added to your wallet.", "log.refreshed": "On-chain data refreshed.", "log.syncComplete": "BSC Mainnet read-only data synchronized.", "log.syncFailed": "Read-only synchronization failed: {error}"
  },
  "zh-Hant": {
    "meta.description": "PlugPoint Protocol — BNB Smart Chain 上的零交易稅遊戲點數、直售機與自動分潤閘道。", "nav.aria": "主要導覽", "nav.buy": "購買點數", "nav.gacha": "賽博扭蛋", "nav.developers": "開發者", "nav.whitepaper": "白皮書",
    "wallet.connect": "連接錢包", "wallet.connected": "錢包已連接：{address}", "wallet.missing": "找不到 MetaMask。請先安裝相容的錢包擴充功能。", "network.readOnly": "BSC · 唯讀", "network.connected": "BSC · 已連接",
    "hero.live": "已上線 BNB Smart Chain", "hero.title1": "驅動每一款遊戲", "hero.title2": "價值鏈上自動分配", "hero.body": "PLUG 是專為 AI 遊戲與獨立開發者打造的固定供應遊戲點數。玩家用 USDT 直接取得點數，消費時由 Gateway 自動完成創作者、平台與銷毀分配。", "hero.getPlug": "取得 PLUG", "hero.addWallet": "＋ 加入 MetaMask", "hero.aiSpec": "AI 規格", "hero.supply": "固定供應 1,000,000,000 PLUG · 0% 轉帳稅 · 18 位小數",
    "telemetry.eyebrow": "資產遙測", "telemetry.title": "即時資產儀表板", "telemetry.myUsdt": "我的 USDT", "telemetry.myPlug": "我的 PLUG", "telemetry.inventory": "Vendor 可售庫存", "telemetry.rate": "鏈上即時匯率", "telemetry.disclaimer": "參考匯率不是法幣錨定或贖回承諾；交易前一律以鏈上 rate() 為準。", "telemetry.swapTitle": "創作者變現", "telemetry.swapStatus": "PancakeSwap V2 流動性池已上線（初始比例 1 PLUG = 0.1 USDT）。", "telemetry.swapButton": "在 PancakeSwap 兌換／變現 PLUG ↗",
    "common.refresh": "刷新", "common.loading": "讀取中…", "common.search": "查詢", "common.clear": "清除", "common.invalidFormat": "格式錯誤", "common.listSeparator": "、",
    "buy.eyebrow": "01 · 點數終端", "buy.title1": "USDT 直購", "buy.title2": "PLUG 點數", "buy.body": "不經 DEX、不設定滑價。USDT 直接進入平台金庫，PLUG 從已備妥的 Vendor 庫存送到你的錢包。", "buy.amount": "選擇購買金額", "buy.quickAria": "USDT 快捷金額", "buy.receive": "預計獲得", "buy.button": "立即購買 PLUG", "buy.note": "交易將要求 MetaMask 簽署；若既有授權額度足夠，會直接進入購買步驟。", "buy.processing": "處理中…", "buy.stepApprove": "授權", "buy.stepPurchase": "購買", "buy.stepConfirm": "確認",
    "gacha.eyebrow": "02 · 示範遊戲 · App ID 1", "gacha.capsule": "量子膠囊", "gacha.cost": "鏈上費用", "gacha.body": "真實 PLUG 扣點與鏈上 80/15/5 拆帳；獎品與隨機結果僅為本機示範收藏，不具兌換價值，也不是可驗證鏈上隨機。", "gacha.syncing": "正在同步 App ID 1…", "gacha.single": "單抽", "gacha.five": "五連抽", "gacha.split": "本次鏈上分潤", "gacha.creator": "創作者", "gacha.platform": "平台", "gacha.burn": "銷毀", "gacha.notRegistered": "App ID 1 尚未註冊；請先在開發者區完成註冊。", "gacha.paused": "遊戲已註冊，但目前停止接收 PLUG。", "gacha.ready": "能源核心已就緒，可以啟動抽取。", "gacha.connect": "連接錢包後即可啟動抽取。", "gacha.decoding": "能源核心解碼中…", "gacha.complete": "開獎完成：{summary}", "gacha.singleAction": "單抽", "gacha.fiveAction": "五連抽",
    "loot.eyebrow": "本機保管庫", "loot.title": "玩家背包", "loot.items": "件", "loot.emptyGuest": "連接錢包並完成抽取後，戰利品會保存在此瀏覽器。", "loot.empty": "背包目前是空的。", "prize.ssr": "傳說機甲", "prize.sr": "能量核心", "prize.r": "鈦合金護盾", "prize.n": "基礎零件",
    "registry.eyebrow": "Gateway 註冊表", "registry.title": "全網遊戲註冊中心", "registry.count": "目前全網已註冊遊戲數", "registry.gamesUnit": "款", "registry.next": "下一個可領取編號", "registry.lookup": "查詢任意遊戲 App ID", "registry.liveTitle": "App ID #{appId} 即時資料", "registry.owner": "註冊者", "registry.payout": "收款地址", "registry.active": "啟用狀態", "registry.volume": "累計消費", "registry.notRegistered": "尚未註冊", "registry.enabled": "啟用中", "registry.paused": "已暫停",
    "register.title": "註冊新遊戲（取得新 App ID）", "register.body": "櫃檯永久開放，任何開發者皆可自助領取鏈上下一個編號。請確認收款地址與 Metadata URI；註冊後只有註冊者能更新遊戲設定。", "register.payout": "創作者收款地址", "register.payoutPlaceholder": "連接錢包後自動帶入，亦可手動輸入 0x…", "register.metadata": "遊戲 Metadata URI", "register.button": "立即註冊並領取 App ID #{appId}", "register.processing": "註冊 App ID #{appId} 中…", "register.confirmationLabel": "註冊已確認", "register.confirmed": "你的遊戲已取得", "register.viewTx": "在 BscScan 查看交易 ↗", "register.summary": "收款地址 {payout} · Metadata {metadata}",
    "ai.eyebrow": "AI 串接入口", "ai.title": "把協議交給你的 AI", "ai.body": "將公開規格端點貼給任何 AI 程式碼助手，即可取得主網地址、最小 ABI、approve 流程與後端事件防重規範。", "ai.prompt": "請閱讀 https://plugpoint.cc/llms.txt，為我的遊戲整合 PLUG 購買與 Gateway 扣點，並依規格驗證 PointsSpent 事件。", "ai.copy": "複製 AI 串接指令", "ai.copied": "已複製，可直接貼給 AI 助手。", "log.title": "即時交易日誌", "log.connecting": "[SYSTEM] 正在連接 BSC Mainnet 唯讀節點…", "language.label": "語言", "footer.copyright": "© 2026 PlugPoint Protocol. 版權所有。開發者接入 SDK 與智能合約介面採用 MIT 開源授權。",
    "error.unknown": "未知錯誤", "error.rejected": "使用者取消了錢包簽署。", "error.gas": "錢包 BNB 不足以支付 Gas。", "error.inventory": "Vendor 的 PLUG 庫存不足。", "error.noWallet": "找不到 MetaMask 或相容的 EVM 錢包。", "error.wrongNetwork": "錢包未切換至 BSC Mainnet。", "error.connectFirst": "請先連接錢包。", "error.networkSwitched": "網路已切換，請重新執行操作。", "error.amount": "購買金額必須大於 0。", "error.purchaseEvent": "交易已確認，但找不到 PointsPurchased 事件。", "error.appId": "App ID 必須是大於 0 的整數。", "error.zeroPayout": "創作者收款地址不可為零地址。", "error.metadataEmpty": "Metadata URI 不可為空。", "error.metadataUrl": "Metadata URI 必須是有效的 HTTP、HTTPS 或 IPFS 網址。", "error.metadataProtocol": "Metadata URI 必須使用 HTTP、HTTPS 或 IPFS。", "error.registrationEvent": "交易已確認，但找不到 GameRegistered 事件。", "error.registrationMismatch": "GameRegistered 事件與本次註冊資料不一致。", "error.gameInactive": "App ID 1 尚未啟用，無法執行扣點。", "error.balance": "PLUG 餘額不足，需要 {amount} PLUG。", "error.spendEvent": "交易已確認，但找不到 PointsSpent 事件。", "error.spendMismatch": "PointsSpent 事件與本次訂單不一致，已停止發放。",
    "log.allowanceNeeded": "需要授權 {label}，請在錢包確認。", "log.allowanceSent": "{label} 授權已送出，等待確認。", "log.allowanceConfirmed": "{label} 授權已確認。", "log.purchaseSent": "購買交易已送出，預計取得 {amount} PLUG。", "log.purchaseComplete": "購買完成：{amount} PLUG 已入帳。", "log.appLoaded": "App ID #{appId} 鏈上資料已載入。", "log.registrationSent": "App ID #{appId} 註冊交易已送出。", "log.registrationComplete": "註冊成功：你已取得 App ID #{appId}。", "log.spendSent": "{action}扣點已送出，訂單 {orderId}。", "log.spendComplete": "鏈上扣點與分潤確認完成：{amount} PLUG。", "log.tokenAdded": "PLUG 已加入錢包資產清單。", "log.tokenNotAdded": "錢包未加入 PLUG。", "log.refreshed": "鏈上資料已刷新。", "log.syncComplete": "BSC Mainnet 唯讀資料同步完成。", "log.syncFailed": "唯讀資料同步失敗：{error}"
  }
};

TRANSLATIONS["zh-Hans"] = Object.freeze({
  ...TRANSLATIONS["zh-Hant"],
  "meta.description": "PlugPoint Protocol — BNB Smart Chain 上的零交易税游戏点数、直售机与自动分润网关。", "nav.aria": "主要导航", "nav.buy": "购买点数", "nav.gacha": "赛博扭蛋", "nav.developers": "开发者", "nav.whitepaper": "白皮书",
  "wallet.connect": "连接钱包", "wallet.connected": "钱包已连接：{address}", "wallet.missing": "未找到 MetaMask。请先安装兼容的钱包扩展程序。", "network.readOnly": "BSC · 只读", "network.connected": "BSC · 已连接",
  "hero.live": "已上线 BNB Smart Chain", "hero.title1": "驱动每一款游戏", "hero.title2": "价值链上自动分配", "hero.body": "PLUG 是专为 AI 游戏与独立开发者打造的固定供应游戏点数。玩家用 USDT 直接取得点数，消费时由 Gateway 自动完成创作者、平台与销毁分配。", "hero.getPlug": "取得 PLUG", "hero.addWallet": "＋ 加入 MetaMask", "hero.aiSpec": "AI 规格", "hero.supply": "固定供应 1,000,000,000 PLUG · 0% 转账税 · 18 位小数",
  "telemetry.eyebrow": "资产遥测", "telemetry.title": "实时资产仪表板", "telemetry.myUsdt": "我的 USDT", "telemetry.myPlug": "我的 PLUG", "telemetry.inventory": "Vendor 可售库存", "telemetry.rate": "链上实时汇率", "telemetry.disclaimer": "参考汇率不是法币锚定或赎回承诺；交易前一律以链上 rate() 为准。", "telemetry.swapTitle": "创作者变现", "telemetry.swapStatus": "PancakeSwap V2 流动性池已上线（初始比例 1 PLUG = 0.1 USDT）。", "telemetry.swapButton": "在 PancakeSwap 兑换／变现 PLUG ↗",
  "common.refresh": "刷新", "common.loading": "读取中…", "common.search": "查询", "common.clear": "清除", "common.invalidFormat": "格式错误", "buy.eyebrow": "01 · 点数终端", "buy.title1": "USDT 直购", "buy.title2": "PLUG 点数", "buy.body": "不经过 DEX、不设置滑价。USDT 直接进入平台金库，PLUG 从已备妥的 Vendor 库存发送到你的钱包。", "buy.amount": "选择购买金额", "buy.quickAria": "USDT 快捷金额", "buy.receive": "预计获得", "buy.button": "立即购买 PLUG", "buy.note": "交易将要求 MetaMask 签名；若现有授权额度足够，会直接进入购买步骤。", "buy.processing": "处理中…",
  "gacha.body": "真实 PLUG 扣点与链上 80/15/5 分账；奖品与随机结果仅为本机演示收藏，不具兑换价值，也不是可验证链上随机。", "gacha.syncing": "正在同步 App ID 1…", "gacha.single": "单抽", "gacha.five": "五连抽", "gacha.split": "本次链上分润", "gacha.creator": "创作者", "gacha.platform": "平台", "gacha.burn": "销毁", "gacha.notRegistered": "App ID 1 尚未注册；请先在开发者区完成注册。", "gacha.paused": "游戏已注册，但目前停止接收 PLUG。", "gacha.ready": "能源核心已就绪，可以启动抽取。", "gacha.connect": "连接钱包后即可启动抽取。", "gacha.decoding": "能源核心解码中…", "gacha.complete": "开奖完成：{summary}", "gacha.singleAction": "单抽", "gacha.fiveAction": "五连抽",
  "loot.title": "玩家背包", "loot.emptyGuest": "连接钱包并完成抽取后，战利品会保存在此浏览器。", "loot.empty": "背包目前是空的。", "prize.ssr": "传说机甲", "prize.sr": "能量核心", "prize.r": "钛合金护盾", "prize.n": "基础零件",
  "registry.title": "全网游戏注册中心", "registry.count": "目前全网已注册游戏数", "registry.gamesUnit": "款", "registry.next": "下一个可领取编号", "registry.lookup": "查询任意游戏 App ID", "registry.liveTitle": "App ID #{appId} 实时数据", "registry.owner": "注册者", "registry.payout": "收款地址", "registry.active": "启用状态", "registry.volume": "累计消费", "registry.notRegistered": "尚未注册", "registry.enabled": "启用中", "registry.paused": "已暂停",
  "register.title": "注册新游戏（取得新 App ID）", "register.body": "柜台永久开放，任何开发者都可自助领取链上下一个编号。请确认收款地址与 Metadata URI；注册后只有注册者能更新游戏设置。", "register.payout": "创作者收款地址", "register.payoutPlaceholder": "连接钱包后自动带入，也可手动输入 0x…", "register.metadata": "游戏 Metadata URI", "register.button": "立即注册并领取 App ID #{appId}", "register.processing": "正在注册 App ID #{appId}…", "register.confirmed": "你的游戏已取得", "register.viewTx": "在 BscScan 查看交易 ↗", "register.summary": "收款地址 {payout} · Metadata {metadata}",
  "buy.stepApprove": "授权", "buy.stepPurchase": "购买", "buy.stepConfirm": "确认", "gacha.eyebrow": "02 · 演示游戏 · App ID 1", "gacha.capsule": "量子胶囊", "gacha.cost": "链上费用", "loot.eyebrow": "本地保管库", "loot.items": "件", "registry.eyebrow": "Gateway 注册表", "register.confirmationLabel": "注册已确认", "ai.eyebrow": "AI 集成入口",
  "ai.title": "把协议交给你的 AI", "ai.body": "将公开规格端点提供给任何 AI 编程助手，即可取得主网地址、最小 ABI、approve 流程与后端事件防重规范。", "ai.prompt": "请阅读 https://plugpoint.cc/llms.txt，为我的游戏集成 PLUG 购买与 Gateway 扣点，并按规格验证 PointsSpent 事件。", "ai.copy": "复制 AI 集成指令", "ai.copied": "已复制，可直接粘贴给 AI 助手。", "log.title": "实时交易日志", "log.connecting": "[SYSTEM] 正在连接 BSC Mainnet 只读节点…", "language.label": "语言", "footer.copyright": "© 2026 PlugPoint Protocol. 版权所有。开发者接入 SDK 与智能合约接口采用 MIT 开源授权。",
  "error.unknown": "未知错误", "error.rejected": "用户取消了钱包签名。", "error.gas": "钱包 BNB 不足以支付 Gas。", "error.inventory": "Vendor 的 PLUG 库存不足。", "error.noWallet": "未找到 MetaMask 或兼容的 EVM 钱包。", "error.wrongNetwork": "钱包未切换至 BSC Mainnet。", "error.connectFirst": "请先连接钱包。", "error.networkSwitched": "网络已切换，请重新执行操作。", "error.amount": "购买金额必须大于 0。", "error.purchaseEvent": "交易已确认，但未找到 PointsPurchased 事件。", "error.appId": "App ID 必须是大于 0 的整数。", "error.zeroPayout": "创作者收款地址不能是零地址。", "error.metadataEmpty": "Metadata URI 不能为空。", "error.metadataUrl": "Metadata URI 必须是有效的 HTTP、HTTPS 或 IPFS 地址。", "error.metadataProtocol": "Metadata URI 必须使用 HTTP、HTTPS 或 IPFS。", "error.registrationEvent": "交易已确认，但未找到 GameRegistered 事件。", "error.registrationMismatch": "GameRegistered 事件与本次注册资料不一致。", "error.gameInactive": "App ID 1 尚未启用，无法执行扣点。", "error.balance": "PLUG 余额不足，需要 {amount} PLUG。", "error.spendEvent": "交易已确认，但未找到 PointsSpent 事件。", "error.spendMismatch": "PointsSpent 事件与本次订单不一致，已停止发放。",
  "log.allowanceNeeded": "需要授权 {label}，请在钱包确认。", "log.allowanceSent": "{label} 授权已提交，等待确认。", "log.allowanceConfirmed": "{label} 授权已确认。", "log.purchaseSent": "购买交易已提交，预计取得 {amount} PLUG。", "log.purchaseComplete": "购买完成：{amount} PLUG 已到账。", "log.appLoaded": "App ID #{appId} 链上数据已加载。", "log.registrationSent": "App ID #{appId} 注册交易已提交。", "log.registrationComplete": "注册成功：你已取得 App ID #{appId}。", "log.spendSent": "{action}扣点已提交，订单 {orderId}。", "log.spendComplete": "链上扣点与分润确认完成：{amount} PLUG。", "log.tokenAdded": "PLUG 已加入钱包资产列表。", "log.tokenNotAdded": "钱包未加入 PLUG。", "log.refreshed": "链上数据已刷新。", "log.syncComplete": "BSC Mainnet 只读数据同步完成。", "log.syncFailed": "只读数据同步失败：{error}"
});
Object.freeze(TRANSLATIONS);

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

const VENDOR_ABI = [
  "function rate() view returns (uint256)",
  "function buyPoints(uint256 usdtAmount) external",
  "event PointsPurchased(address indexed buyer, uint256 usdtPaid, uint256 plugReceived, uint256 currentRate)",
];

const GATEWAY_ABI = [
  "function nextAppId() view returns (uint256)",
  "function games(uint256 appId) view returns (address owner, address payoutWallet, string metadataUri, bool active, uint256 totalVolume)",
  "function registerGame(address payoutWallet, string calldata metadataUri) external returns (uint256 appId)",
  "function spendPoints(uint256 appId, uint256 amount, string calldata orderId) external",
  "event GameRegistered(uint256 indexed appId, address indexed owner, address payoutWallet, string metadataUri)",
  "event PointsSpent(uint256 indexed appId, address indexed player, uint256 totalAmount, uint256 creatorShare, uint256 platformShare, uint256 burnedAmount, string orderId)",
];

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const readProvider = new ethers.JsonRpcProvider(CONFIG.rpcUrl, Number(CONFIG.chainId), {
  staticNetwork: true,
});
const readToken = new ethers.Contract(CONFIG.token, ERC20_ABI, readProvider);
const readUsdt = new ethers.Contract(CONFIG.usdt, ERC20_ABI, readProvider);
const readVendor = new ethers.Contract(CONFIG.vendor, VENDOR_ABI, readProvider);
const readGateway = new ethers.Contract(CONFIG.gateway, GATEWAY_ABI, readProvider);

const state = {
  browserProvider: null,
  signer: null,
  account: null,
  usdt: null,
  token: null,
  vendor: null,
  gateway: null,
  rate: 10n,
  game: null,
  registry: null,
  queriedAppId: 1n,
  queriedGame: null,
  busy: false,
  locale: ["en", "zh-Hant", "zh-Hans"].includes(localStorage.getItem("plugpoint-locale"))
    ? localStorage.getItem("plugpoint-locale")
    : "en",
};

const $ = (id) => document.getElementById(id);
const ui = {
  walletButton: $("walletButton"),
  walletLabel: $("walletLabel"),
  networkPill: $("networkPill"),
  addTokenButton: $("addTokenButton"),
  refreshButton: $("refreshButton"),
  usdtBalance: $("usdtBalance"),
  plugBalance: $("plugBalance"),
  vendorInventory: $("vendorInventory"),
  exchangeRate: $("exchangeRate"),
  buyForm: $("buyForm"),
  usdtInput: $("usdtInput"),
  plugQuote: $("plugQuote"),
  buyButton: $("buyButton"),
  singleDrawButton: $("singleDrawButton"),
  fiveDrawButton: $("fiveDrawButton"),
  gachaStatus: $("gachaStatus"),
  gachaOrb: $("gachaOrb"),
  distributionPanel: $("distributionPanel"),
  creatorShare: $("creatorShare"),
  platformShare: $("platformShare"),
  burnedShare: $("burnedShare"),
  lootGrid: $("lootGrid"),
  lootCount: $("lootCount"),
  gameStatusBadge: $("gameStatusBadge"),
  registryStatusBadge: $("registryStatusBadge"),
  registeredGameCount: $("registeredGameCount"),
  nextAppIdLabel: $("nextAppIdLabel"),
  appLookupForm: $("appLookupForm"),
  appIdQueryInput: $("appIdQueryInput"),
  appIdQueryButton: $("appIdQueryButton"),
  queriedGameTitle: $("queriedGameTitle"),
  gameOwner: $("gameOwner"),
  gamePayout: $("gamePayout"),
  gameMetadata: $("gameMetadata"),
  gameActive: $("gameActive"),
  gameVolume: $("gameVolume"),
  registrationPanel: $("registrationPanel"),
  registerForm: $("registerForm"),
  payoutInput: $("payoutInput"),
  metadataInput: $("metadataInput"),
  registerButton: $("registerButton"),
  registrationResult: $("registrationResult"),
  registeredAppId: $("registeredAppId"),
  registrationSummary: $("registrationSummary"),
  registrationTxLink: $("registrationTxLink"),
  copyPromptButton: $("copyPromptButton"),
  aiPromptText: $("aiPromptText"),
  copyStatus: $("copyStatus"),
  clearLogButton: $("clearLogButton"),
  txLog: $("txLog"),
  languageSelect: $("languageSelect"),
};

function t(key, variables = {}) {
  const template = TRANSLATIONS[state.locale]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  return String(template).replace(/\{(\w+)\}/g, (_, name) => String(variables[name] ?? `{${name}}`));
}

function localeCode() {
  return { en: "en-US", "zh-Hant": "zh-TW", "zh-Hans": "zh-CN" }[state.locale] || "en-US";
}

function applyLocale() {
  document.documentElement.lang = state.locale;
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  ui.languageSelect.value = state.locale;
}

function shortAddress(address) {
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "—";
}

function formatToken(value, maximumFractionDigits = 2) {
  const numeric = Number(ethers.formatUnits(value, 18));
  return new Intl.NumberFormat(localeCode(), {
    minimumFractionDigits: Math.min(2, maximumFractionDigits),
    maximumFractionDigits,
  }).format(numeric);
}

function sanitizeText(value) {
  return String(value ?? "").replace(/[<>]/g, "");
}

function friendlyError(error) {
  const message =
    error?.shortMessage ||
    error?.reason ||
    error?.info?.error?.message ||
    error?.message ||
    t("error.unknown");
  if (/user rejected|ACTION_REJECTED|4001/i.test(message)) return t("error.rejected");
  if (/insufficient funds/i.test(message)) return t("error.gas");
  if (/Insufficient PLUG inventory/i.test(message)) return t("error.inventory");
  return sanitizeText(message).slice(0, 360);
}

function logStatus(message, type = "info", txHash = null) {
  const row = document.createElement("div");
  const colors = {
    info: "text-slate-400",
    pending: "text-amber-200",
    success: "text-emerald-300",
    error: "text-rose-300",
  };
  row.className = colors[type] || colors.info;
  const stamp = new Date().toLocaleTimeString(localeCode(), { hour12: false });
  row.append(document.createTextNode(`[${stamp}] ${message}`));
  if (txHash) {
    const link = document.createElement("a");
    link.href = `${CONFIG.explorerUrl}/tx/${txHash}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "ml-2 underline decoration-dotted hover:text-white";
    link.textContent = "BscScan ↗";
    row.append(link);
  }
  ui.txLog.append(row);
  ui.txLog.scrollTop = ui.txLog.scrollHeight;
}

function setBusy(busy) {
  state.busy = busy;
  const canPlay = Boolean(state.account && state.game?.registered && state.game?.active);
  ui.walletButton.disabled = busy;
  ui.addTokenButton.disabled = busy;
  ui.refreshButton.disabled = busy;
  ui.buyButton.disabled = busy;
  ui.registerButton.disabled = busy;
  ui.appIdQueryButton.disabled = busy;
  ui.singleDrawButton.disabled = busy || !canPlay;
  ui.fiveDrawButton.disabled = busy || !canPlay;
}

async function switchToBsc() {
  if (!window.ethereum) throw new Error(t("error.noWallet"));
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CONFIG.chainIdHex }],
    });
  } catch (error) {
    const code = error?.code ?? error?.data?.originalError?.code;
    if (code !== 4902) throw error;
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: CONFIG.chainIdHex,
          chainName: CONFIG.chainName,
          nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
          rpcUrls: [CONFIG.rpcUrl],
          blockExplorerUrls: [CONFIG.explorerUrl],
        },
      ],
    });
  }
}

async function connectWallet() {
  if (!window.ethereum) {
    logStatus(t("wallet.missing"), "error");
    return;
  }
  setBusy(true);
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    await switchToBsc();
    state.browserProvider = new ethers.BrowserProvider(window.ethereum, "any");
    const network = await state.browserProvider.getNetwork();
    if (network.chainId !== CONFIG.chainId) throw new Error(t("error.wrongNetwork"));
    const previousAccount = state.account;
    state.signer = await state.browserProvider.getSigner();
    state.account = await state.signer.getAddress();
    state.usdt = new ethers.Contract(CONFIG.usdt, ERC20_ABI, state.signer);
    state.token = new ethers.Contract(CONFIG.token, ERC20_ABI, state.signer);
    state.vendor = new ethers.Contract(CONFIG.vendor, VENDOR_ABI, state.signer);
    state.gateway = new ethers.Contract(CONFIG.gateway, GATEWAY_ABI, state.signer);

    ui.walletLabel.textContent = shortAddress(state.account);
    ui.networkPill.textContent = t("network.connected");
    ui.networkPill.className = "hidden rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 font-mono text-[10px] text-emerald-300 sm:inline-flex";
    const currentPayout = ui.payoutInput.value.trim();
    if (!currentPayout || (previousAccount && currentPayout.toLowerCase() === previousAccount.toLowerCase())) {
      ui.payoutInput.value = state.account;
    }
    logStatus(t("wallet.connected", { address: shortAddress(state.account) }), "success");
    await refreshAll();
    renderLoot();
  } catch (error) {
    logStatus(friendlyError(error), "error");
  } finally {
    setBusy(false);
  }
}

async function refreshAll() {
  const account = state.account;
  const queriedAppId = state.queriedAppId;
  const tasks = [
    readToken.balanceOf(CONFIG.vendor),
    readVendor.rate(),
    readGateway.games(CONFIG.demoAppId),
    readGateway.nextAppId(),
    readGateway.games(queriedAppId),
  ];
  if (account) tasks.push(readUsdt.balanceOf(account), readToken.balanceOf(account));

  const values = await Promise.all(tasks);
  const [inventory, rate, gameRaw, nextAppId, queriedGameRaw, usdtBalance, plugBalance] = values;
  state.rate = rate;
  state.game = {
    owner: gameRaw.owner,
    payoutWallet: gameRaw.payoutWallet,
    metadataUri: gameRaw.metadataUri,
    active: gameRaw.active,
    totalVolume: gameRaw.totalVolume,
    registered: gameRaw.owner !== ZERO_ADDRESS,
  };
  state.registry = {
    nextAppId,
    registeredCount: nextAppId > 0n ? nextAppId - 1n : 0n,
  };
  state.queriedGame = {
    appId: queriedAppId,
    owner: queriedGameRaw.owner,
    payoutWallet: queriedGameRaw.payoutWallet,
    metadataUri: queriedGameRaw.metadataUri,
    active: queriedGameRaw.active,
    totalVolume: queriedGameRaw.totalVolume,
    registered: queriedGameRaw.owner !== ZERO_ADDRESS,
  };

  ui.vendorInventory.textContent = formatToken(inventory, 0);
  ui.exchangeRate.textContent = `1 USDT = ${rate.toString()} PLUG`;
  ui.usdtBalance.textContent = account ? formatToken(usdtBalance) : t("wallet.connect");
  ui.plugBalance.textContent = account ? formatToken(plugBalance) : t("wallet.connect");
  updateQuote();
  renderDemoGameState();
  renderRegistryState();
  setBusy(state.busy);
}

function renderDemoGameState() {
  const game = state.game;
  if (!game) return;
  if (!game.registered) {
    ui.gachaStatus.textContent = t("gacha.notRegistered");
  } else if (!game.active) {
    ui.gachaStatus.textContent = t("gacha.paused");
  } else {
    ui.gachaStatus.textContent = state.account ? t("gacha.ready") : t("gacha.connect");
  }
}

function renderRegistryState() {
  const registry = state.registry;
  const game = state.queriedGame;
  if (!registry || !game) return;

  ui.registryStatusBadge.textContent = "LIVE";
  ui.registryStatusBadge.className = "rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3 py-1 font-mono text-[10px] text-emerald-300";
  ui.registeredGameCount.textContent = registry.registeredCount.toString();
  ui.nextAppIdLabel.textContent = `App ID #${registry.nextAppId.toString()}`;
  if (!ui.registerButton.dataset.processing) {
    ui.registerButton.textContent = t("register.button", { appId: registry.nextAppId.toString() });
  }

  ui.queriedGameTitle.textContent = t("registry.liveTitle", { appId: game.appId.toString() });
  ui.gameOwner.textContent = game.registered ? game.owner : t("registry.notRegistered");
  ui.gamePayout.textContent = game.registered ? game.payoutWallet : "—";
  ui.gameMetadata.textContent = game.metadataUri || "—";
  ui.gameActive.textContent = game.registered ? (game.active ? t("registry.enabled") : t("registry.paused")) : "—";
  ui.gameVolume.textContent = `${formatToken(game.totalVolume, 4)} PLUG`;

  if (game.registered && game.active) {
    ui.gameStatusBadge.textContent = "ACTIVE";
    ui.gameStatusBadge.className = "rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3 py-1 font-mono text-[10px] text-emerald-300";
  } else if (game.registered) {
    ui.gameStatusBadge.textContent = "PAUSED";
    ui.gameStatusBadge.className = "rounded-full border border-rose-400/25 bg-rose-400/5 px-3 py-1 font-mono text-[10px] text-rose-300";
  } else if (game.appId === registry.nextAppId) {
    ui.gameStatusBadge.textContent = "NEXT AVAILABLE";
    ui.gameStatusBadge.className = "rounded-full border border-gold/25 bg-gold/5 px-3 py-1 font-mono text-[10px] text-gold";
  } else {
    ui.gameStatusBadge.textContent = "NOT ISSUED";
    ui.gameStatusBadge.className = "rounded-full border border-white/10 bg-white/[.025] px-3 py-1 font-mono text-[10px] text-slate-400";
  }
}

function updateQuote() {
  const raw = ui.usdtInput.value.trim();
  if (!raw || Number(raw) <= 0 || !Number.isFinite(Number(raw))) {
    ui.plugQuote.textContent = "— PLUG";
    return;
  }
  try {
    const amount = ethers.parseUnits(raw, 18);
    ui.plugQuote.textContent = `${formatToken(amount * state.rate, 6)} PLUG`;
  } catch {
    ui.plugQuote.textContent = t("common.invalidFormat");
  }
}

async function ensureConnected() {
  if (!state.account) await connectWallet();
  if (!state.account) throw new Error(t("error.connectFirst"));
  const network = await state.browserProvider.getNetwork();
  if (network.chainId !== CONFIG.chainId) {
    await switchToBsc();
    throw new Error(t("error.networkSwitched"));
  }
}

async function ensureAllowance(token, spender, amount, label) {
  const allowance = await token.allowance(state.account, spender);
  if (allowance >= amount) return;
  logStatus(t("log.allowanceNeeded", { label }), "pending");
  const tx = await token.approve(spender, amount);
  logStatus(t("log.allowanceSent", { label }), "pending", tx.hash);
  await tx.wait();
  logStatus(t("log.allowanceConfirmed", { label }), "success", tx.hash);
}

async function buyPoints(event) {
  event.preventDefault();
  if (state.busy) return;
  setBusy(true);
  const originalLabel = ui.buyButton.textContent;
  try {
    ui.buyButton.textContent = t("buy.processing");
    await ensureConnected();
    const raw = ui.usdtInput.value.trim();
    const usdtAmount = ethers.parseUnits(raw, 18);
    if (usdtAmount <= 0n) throw new Error(t("error.amount"));
    const [rate, inventory] = await Promise.all([
      readVendor.rate(),
      readToken.balanceOf(CONFIG.vendor),
    ]);
    const plugAmount = usdtAmount * rate;
    if (inventory < plugAmount) throw new Error("Insufficient PLUG inventory");

    await ensureAllowance(state.usdt, CONFIG.vendor, usdtAmount, "USDT");
    const tx = await state.vendor.buyPoints(usdtAmount);
    logStatus(t("log.purchaseSent", { amount: formatToken(plugAmount, 6) }), "pending", tx.hash);
    const receipt = await tx.wait();
    const parsed = parseEvent(receipt, state.vendor.interface, "PointsPurchased");
    if (!parsed) throw new Error(t("error.purchaseEvent"));
    logStatus(t("log.purchaseComplete", { amount: formatToken(parsed.args.plugReceived, 6) }), "success", tx.hash);
    await refreshAll();
  } catch (error) {
    logStatus(friendlyError(error), "error");
  } finally {
    ui.buyButton.textContent = originalLabel;
    setBusy(false);
  }
}

function parseEvent(receipt, contractInterface, eventName) {
  for (const log of receipt.logs) {
    try {
      const parsed = contractInterface.parseLog(log);
      if (parsed?.name === eventName) return parsed;
    } catch {
      // Ignore logs emitted by other contracts in the same transaction.
    }
  }
  return null;
}

async function queryGame(event) {
  event.preventDefault();
  if (state.busy) return;
  const raw = ui.appIdQueryInput.value.trim();
  try {
    if (!/^\d+$/.test(raw)) throw new Error(t("error.appId"));
    const appId = BigInt(raw);
    if (appId <= 0n) throw new Error(t("error.appId"));
    state.queriedAppId = appId;
    ui.appIdQueryInput.value = appId.toString();
    setBusy(true);
    await refreshAll();
    logStatus(t("log.appLoaded", { appId: appId.toString() }), "success");
  } catch (error) {
    logStatus(friendlyError(error), "error");
  } finally {
    setBusy(false);
  }
}

async function registerGame(event) {
  event.preventDefault();
  if (state.busy) return;
  setBusy(true);
  ui.registerButton.dataset.processing = "true";
  try {
    await ensureConnected();
    const payout = ethers.getAddress(ui.payoutInput.value.trim());
    if (payout === ZERO_ADDRESS) throw new Error(t("error.zeroPayout"));
    const metadata = ui.metadataInput.value.trim();
    if (!metadata) throw new Error(t("error.metadataEmpty"));
    let metadataUrl;
    try {
      metadataUrl = new URL(metadata);
    } catch {
      throw new Error(t("error.metadataUrl"));
    }
    if (!/^(https?:|ipfs:)$/.test(metadataUrl.protocol)) {
      throw new Error(t("error.metadataProtocol"));
    }

    const expectedAppId = await readGateway.nextAppId();
    ui.registerButton.textContent = t("register.processing", { appId: expectedAppId.toString() });

    const tx = await state.gateway.registerGame(payout, metadata);
    logStatus(t("log.registrationSent", { appId: expectedAppId.toString() }), "pending", tx.hash);
    const receipt = await tx.wait();
    const parsed = parseEvent(receipt, state.gateway.interface, "GameRegistered");
    if (!parsed) {
      throw new Error(t("error.registrationEvent"));
    }
    const registeredAppId = parsed.args.appId;
    if (
      parsed.args.owner.toLowerCase() !== state.account.toLowerCase() ||
      parsed.args.payoutWallet.toLowerCase() !== payout.toLowerCase()
    ) {
      throw new Error(t("error.registrationMismatch"));
    }

    state.queriedAppId = registeredAppId;
    ui.appIdQueryInput.value = registeredAppId.toString();
    ui.registeredAppId.textContent = `App ID #${registeredAppId.toString()}`;
    ui.registrationSummary.textContent = t("register.summary", { payout, metadata });
    ui.registrationTxLink.href = `${CONFIG.explorerUrl}/tx/${tx.hash}`;
    ui.registrationResult.classList.remove("hidden");
    ui.metadataInput.value = "";
    logStatus(t("log.registrationComplete", { appId: registeredAppId.toString() }), "success", tx.hash);
    await refreshAll();
  } catch (error) {
    logStatus(friendlyError(error), "error");
  } finally {
    delete ui.registerButton.dataset.processing;
    renderRegistryState();
    setBusy(false);
  }
}

function createOrderId() {
  const randomPart = crypto.randomUUID
    ? crypto.randomUUID().replaceAll("-", "").slice(0, 12)
    : Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => b.toString(16).padStart(2, "0")).join("");
  return `GACHA_${Date.now()}_${randomPart}`;
}

async function spendAndDraw(drawCount) {
  if (state.busy) return;
  setBusy(true);
  try {
    await ensureConnected();
    await refreshAll();
    if (!state.game?.registered || !state.game?.active) {
      throw new Error(t("error.gameInactive"));
    }
    const cost = ethers.parseUnits(String(drawCount), 18);
    const balance = await readToken.balanceOf(state.account);
    if (balance < cost) throw new Error(t("error.balance", { amount: drawCount }));

    await ensureAllowance(state.token, CONFIG.gateway, cost, "PLUG");
    const orderId = createOrderId();
    const tx = await state.gateway.spendPoints(CONFIG.demoAppId, cost, orderId);
    logStatus(t("log.spendSent", { action: t(drawCount === 1 ? "gacha.singleAction" : "gacha.fiveAction"), orderId }), "pending", tx.hash);
    const receipt = await tx.wait();
    const parsed = parseEvent(receipt, state.gateway.interface, "PointsSpent");
    if (!parsed) throw new Error(t("error.spendEvent"));
    if (
      parsed.args.appId !== CONFIG.demoAppId ||
      parsed.args.player.toLowerCase() !== state.account.toLowerCase() ||
      parsed.args.totalAmount !== cost ||
      parsed.args.orderId !== orderId
    ) {
      throw new Error(t("error.spendMismatch"));
    }

    ui.creatorShare.textContent = `${formatToken(parsed.args.creatorShare, 4)} PLUG`;
    ui.platformShare.textContent = `${formatToken(parsed.args.platformShare, 4)} PLUG`;
    ui.burnedShare.textContent = `${formatToken(parsed.args.burnedAmount, 4)} PLUG`;
    ui.distributionPanel.classList.remove("hidden");
    logStatus(t("log.spendComplete", { amount: formatToken(cost, 2) }), "success", tx.hash);
    await playReveal(drawCount, tx.hash, orderId);
    await refreshAll();
  } catch (error) {
    logStatus(friendlyError(error), "error");
  } finally {
    setBusy(false);
  }
}

const PRIZES = [
  { max: 0.05, rarity: "SSR", nameKey: "prize.ssr", icon: "✦", className: "border-fuchsia-400/35 bg-fuchsia-400/[.06] text-fuchsia-200" },
  { max: 0.25, rarity: "SR", nameKey: "prize.sr", icon: "◆", className: "border-amber-300/35 bg-amber-300/[.06] text-amber-100" },
  { max: 0.60, rarity: "R", nameKey: "prize.r", icon: "⬡", className: "border-cyan/35 bg-cyan/[.06] text-cyan" },
  { max: 1, rarity: "N", nameKey: "prize.n", icon: "▣", className: "border-slate-500/35 bg-slate-500/[.06] text-slate-300" },
];

function randomUnit() {
  const value = crypto.getRandomValues(new Uint32Array(1))[0];
  return value / 4294967296;
}

function drawPrize() {
  const roll = randomUnit();
  return PRIZES.find((prize) => roll < prize.max);
}

async function playReveal(drawCount, txHash, orderId) {
  ui.gachaOrb.classList.remove("spinning");
  void ui.gachaOrb.offsetWidth;
  ui.gachaOrb.classList.add("spinning");
  ui.gachaStatus.textContent = t("gacha.decoding");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const prizes = Array.from({ length: drawCount }, () => ({
    ...drawPrize(),
    txHash,
    orderId,
    acquiredAt: new Date().toISOString(),
  }));
  const inventory = loadLoot();
  inventory.unshift(...prizes);
  localStorage.setItem(lootKey(), JSON.stringify(inventory.slice(0, 100)));
  renderLoot();
  const summary = prizes.map((p) => `${p.rarity} ${t(p.nameKey)}`).join(t("common.listSeparator"));
  ui.gachaStatus.textContent = t("gacha.complete", { summary });
}

function lootKey() {
  return `plugpoint_cyber_gacha_${(state.account || "guest").toLowerCase()}`;
}

function loadLoot() {
  try {
    const value = JSON.parse(localStorage.getItem(lootKey()) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function renderLoot() {
  const items = state.account ? loadLoot() : [];
  ui.lootCount.textContent = `${items.length} ${t("loot.items")}`;
  ui.lootGrid.replaceChildren();
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "col-span-2 rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500";
    empty.textContent = state.account ? t("loot.empty") : t("loot.emptyGuest");
    ui.lootGrid.append(empty);
    return;
  }
  for (const item of items) {
    const prize = PRIZES.find((entry) => entry.rarity === item.rarity) || PRIZES[3];
    const card = document.createElement("article");
    card.className = `rounded-xl border p-3 ${prize.className}`;
    const icon = document.createElement("div");
    icon.className = "text-2xl";
    icon.textContent = prize.icon;
    const rarity = document.createElement("p");
    rarity.className = "mt-3 font-mono text-[10px] font-bold";
    rarity.textContent = sanitizeText(item.rarity);
    const name = document.createElement("p");
    name.className = "mt-1 text-xs font-bold text-white";
    name.textContent = t(prize.nameKey);
    card.append(icon, rarity, name);
    ui.lootGrid.append(card);
  }
}

async function addTokenToWallet() {
  try {
    if (!window.ethereum) throw new Error(t("error.noWallet"));
    await switchToBsc();
    const added = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: CONFIG.token,
          symbol: "PLUG",
          decimals: 18,
          image: CONFIG.logoUrl,
        },
      },
    });
    logStatus(t(added ? "log.tokenAdded" : "log.tokenNotAdded"), added ? "success" : "info");
  } catch (error) {
    logStatus(friendlyError(error), "error");
  }
}

async function copyPrompt() {
  const prompt = t("ai.prompt");
  try {
    await navigator.clipboard.writeText(prompt);
    ui.copyStatus.textContent = t("ai.copied");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = prompt;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    ui.copyStatus.textContent = t("ai.copied");
  }
  setTimeout(() => (ui.copyStatus.textContent = ""), 3000);
}

function bindEvents() {
  ui.walletButton.addEventListener("click", connectWallet);
  ui.addTokenButton.addEventListener("click", addTokenToWallet);
  ui.refreshButton.addEventListener("click", () => {
    refreshAll()
      .then(() => logStatus(t("log.refreshed"), "success"))
      .catch((error) => logStatus(friendlyError(error), "error"));
  });
  ui.usdtInput.addEventListener("input", updateQuote);
  document.querySelectorAll("[data-usdt]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.usdtInput.value = button.dataset.usdt;
      updateQuote();
    });
  });
  ui.buyForm.addEventListener("submit", buyPoints);
  ui.appLookupForm.addEventListener("submit", queryGame);
  ui.registerForm.addEventListener("submit", registerGame);
  ui.singleDrawButton.addEventListener("click", () => spendAndDraw(1));
  ui.fiveDrawButton.addEventListener("click", () => spendAndDraw(5));
  ui.copyPromptButton.addEventListener("click", copyPrompt);
  ui.clearLogButton.addEventListener("click", () => ui.txLog.replaceChildren());
  ui.languageSelect.addEventListener("change", () => {
    localStorage.setItem("plugpoint-locale", ui.languageSelect.value);
    window.location.reload();
  });

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (!accounts.length) {
        const disconnectedAccount = state.account;
        state.account = null;
        state.signer = null;
        if (
          disconnectedAccount &&
          ui.payoutInput.value.trim().toLowerCase() === disconnectedAccount.toLowerCase()
        ) {
          ui.payoutInput.value = "";
        }
        ui.walletLabel.textContent = t("wallet.connect");
        ui.networkPill.textContent = t("network.readOnly");
        refreshAll().catch((error) => logStatus(friendlyError(error), "error"));
        renderLoot();
      } else {
        connectWallet();
      }
    });
    window.ethereum.on("chainChanged", () => window.location.reload());
  }
}

async function init() {
  applyLocale();
  bindEvents();
  renderLoot();
  try {
    await refreshAll();
    logStatus(t("log.syncComplete"), "success");
  } catch (error) {
    logStatus(t("log.syncFailed", { error: friendlyError(error) }), "error");
  }
}

window.addEventListener("DOMContentLoaded", init);
