"use strict";

const META = Object.freeze({
  en: {
    title: "PlugPoint Protocol — Whitepaper v1.0",
    description: "PlugPoint Protocol Whitepaper v1.0 — architecture, token economics, verified BSC contracts, and the three-minute game developer quickstart.",
  },
  "zh-Hant": {
    title: "PlugPoint 協議 — 白皮書 v1.0",
    description: "PlugPoint 協議白皮書 v1.0：架構、代幣經濟、BSC 主網合約證據與遊戲開發者三分鐘接入指南。",
  },
  "zh-Hans": {
    title: "PlugPoint 协议 — 白皮书 v1.0",
    description: "PlugPoint 协议白皮书 v1.0：架构、代币经济、BSC 主网合约证据与游戏开发者三分钟接入指南。",
  },
});

const TRANSLATIONS = {
  "zh-Hant": {
    "nav.aria": "白皮書導覽",
    "nav.home": "首頁",
    "language.label": "語言",
    "hero.verified": "已於 BNB Smart Chain 主網驗證",
    "hero.title1": "PlugPoint 協議",
    "hero.title2": "白皮書 v1.0",
    "hero.body": "專為 AI 生成遊戲、獨立工作室與社群伺服器打造的開放式遊戲點數與原子化分潤閘道。",
    "hero.quickstart": "三分鐘接入指南",
    "hero.verify": "在 BscScan 驗證 PLUG ↗",
    "hero.snapshot": "主網規格 · Chain ID 56 · 初始固定供應 1,000,000,000 PLUG · 發布於 2026 年 11 月 18 日",
    "toc.label": "章節目錄",
    "toc.aria": "白皮書章節目錄",
    "toc.vision": "1. 願景與痛點",
    "toc.architecture": "2. 雙通道資金閉環",
    "toc.economics": "3. 代幣經濟學",
    "toc.contracts": "4. 合約與安全設計",
    "toc.quickstart": "5. 三分鐘接入指南",
    "toc.risks": "6. 風險與免責聲明",
    "toc.machine": "機器可讀資料",
    "chapter.1": "第 1 章",
    "chapter.2": "第 2 章",
    "chapter.3": "第 3 章",
    "chapter.4": "第 4 章",
    "chapter.5": "第 5 章",
    "chapter.6": "第 6 章",
    "vision.title": "願景與 PlugPoint 解決的痛點",
    "vision.p1": "獨立遊戲、AI 生成體驗與社群伺服器常面臨相同瓶頸：金流接入昂貴、平台規則分散，結算可能耗時數週。傳統通路若合併支付、發行與推廣費用，整體抽成可能達 30%～50%。",
    "vision.p2": "PlugPoint 讓遊戲經濟不再依附單一商店。開發者可無需許可註冊遊戲、取得鏈上 App ID、接受共通實用型點數，且每筆消費直接結算到指定創作者錢包。平台不保管內部帳戶餘額，也沒有人工撥款排程。",
    "vision.card1Title": "無需許可",
    "vision.card1Body": "任何錢包都能註冊遊戲，不需審核委員會。",
    "vision.card2Title": "原子化",
    "vision.card2Body": "創作者、金庫與銷毀在同一筆確認交易中完成。",
    "vision.card3Title": "可稽核",
    "vision.card3Body": "供應量、遊戲流水、事件、儲備與合約程式碼皆公開於 BSC。",
    "architecture.title": "雙通道資金閉環架構",
    "architecture.p1": "PlugPoint 由兩個互補通道構成：官方 Vendor 讓玩家依鏈上現行匯率，以庫存支持的方式取得 PLUG；公開 PancakeSwap V2 Pair 則讓創作者與持有人自由兌換 BSC USDT。",
    "architecture.vendorTitle": "官方 Vendor 直售機",
    "architecture.vendorBody": "USDT 直接轉入協議金庫，預先備妥的 PLUG 庫存則發送給玩家。目前匯率為 1 USDT = 10 PLUG。",
    "architecture.dexTitle": "PancakeSwap V2",
    "architecture.dexBody": "創作者可透過公開 PLUG/USDT 池兌換所得 PLUG。報價由市場決定，並受儲備深度、價格衝擊與滑點影響。",
    "architecture.note": "Vendor 匯率是可由合約擁有者調整的參數，不是法幣錨定或保證贖回承諾；AMM 價格可能偏離 Vendor 參考匯率。",
    "economics.title": "代幣經濟學與 80 / 15 / 5 鏈上分潤",
    "economics.p1": "PLUG 初始固定供應 1,000,000,000 枚、18 位小數、零轉帳稅，且沒有增發函式。每次 Gateway 消費都會原子化拆分完整金額。",
    "economics.creator": "創作者",
    "economics.creatorTitle": "創作者實得",
    "economics.creatorBody": "直接轉入遊戲收款錢包，沒有平台保管或結算帳期。",
    "economics.platformTitle": "協議分潤",
    "economics.platformBody": "轉入平台金庫，用於生態營運與流動性維護。",
    "economics.burnTitle": "永久銷毀",
    "economics.burnBody": "透過 burnFrom 永久銷毀，使 totalSupply 持續下降。",
    "economics.formulaSpend": "玩家消費額",
    "economics.math1": "創作者份額採精確捨入餘數，因此創作者、平台與銷毀之和永遠等於輸入金額。",
    "economics.math2": "若銷毀率始終維持 5%，累計消費可估算為（1,000,000,000 − totalSupply）÷ 0.05。",
    "economics.reserve": "銷毀會降低流通供應與名目未來義務，但本身不會產生 USDT。實際變現能力來自 PancakeSwap 儲備與金庫政策，必須分開衡量。",
    "contracts.title": "主網合約地址與安全設計",
    "contracts.p1": "以下為 BNB Smart Chain 主網的正式地址。整合端必須鎖定 Chain ID 56，並且只信任來自這些正式合約的事件。",
    "contracts.tableRole": "角色",
    "contracts.tableAddress": "地址",
    "contracts.tableEvidence": "鏈上證據",
    "contracts.creation": "Pair 創世建池交易",
    "contracts.block": "確認區塊",
    "contracts.initialPool": "初始資金池",
    "security.title": "安全特性與管理權限",
    "security.item1": "Token 供應量在部署時固定；合約沒有 mint 函式，也不收取轉帳稅。",
    "security.item2": "Gateway 採用 ReentrancyGuard、Pausable、SafeERC20，平台費率硬上限 25%，銷毀率硬上限 10%。",
    "security.item3": "Vendor 將 USDT 直接轉入金庫，且只能出售合約已持有的 PLUG 庫存。",
    "security.item4": "營運角色採地址分離：金庫與 LP Deployer 為不同地址。鏈下冷錢包保存方式無法單靠合約證明。",
    "security.admin": "管理權限揭露：Vendor 擁有者可調整匯率與金庫、暫停銷售並提領未售庫存；Gateway 擁有者可在硬上限內調整費率、更換金庫並暫停消費。使用者應持續監控鏈上設定。",
    "quickstart.title": "遊戲開發者三分鐘接入指南",
    "quickstart.p1": "正式主網 ABI 使用 registerGame 與 spendPoints；正式 Gateway 並不存在 registerApp 或 spend 函式。請解析已確認事件，不要預測 App ID，也不要信任待確認交易。",
    "quickstart.step1": "步驟 1 — Solidity 介面",
    "quickstart.step2": "步驟 2 — 使用 ethers.js v6 註冊與扣點",
    "quickstart.step3": "步驟 3 — 使用 web3.js 後端驗證結算",
    "quickstart.productionTitle": "正式環境檢查清單",
    "quickstart.productionBody": "強制 Chain ID 56；依道具價值等待適當確認數；驗證正式 Gateway 地址及所有事件欄位；對 orderId 與 transactionHash:logIndex 建立唯一限制；處理鏈重組後才發放高價值道具。",
    "common.copy": "複製",
    "common.copied": "程式碼已複製",
    "risks.title": "免責聲明與風險提示",
    "risks.item1": "PLUG 定位為實用型遊戲點數。本文件僅提供技術資訊，不構成投資、法律、稅務或財務建議，也不承諾獲利或贖回。",
    "risks.item2": "PancakeSwap 初始池由 30 PLUG 與 3 USDT 建立，流動性深度很淺；即使不大的交易也可能造成明顯價格衝擊。務必查看即時報價與滑點，大額兌換應分批進行。",
    "risks.item3": "智能合約、RPC、錢包、前端、管理員金鑰、穩定幣與 AMM 均存在技術或營運風險；程式碼已驗證不代表完全沒有漏洞。",
    "risks.item4": "開發者必須自行遵守所在地的消費者、遊戲、稅務、制裁、隱私與虛擬資產規範。高價值隨機獎勵應採經審計的 commit-reveal 或 VRF；官網示範並非可驗證隨機。",
    "legal.eyebrow": "授權與版權",
    "legal.title": "版權歸屬與平台免責聲明",
    "legal.brandTitle": "品牌與網站版權",
    "legal.brandBody": "PlugPoint 名稱、視覺識別、官網介面設計及白皮書文件之著作權均歸 PlugPoint Protocol 所有。未經授權不得重製，亦不得用於仿冒、釣魚或其他具誤導性的網站。",
    "legal.sdkTitle": "開發者接入授權",
    "legal.sdkBody": "外部遊戲開發者可依 MIT License 自由使用、修改並整合 PlugPointGateway 與 PlugPointVendor 合約介面及官方範例程式碼至任何商業或非商業遊戲專案中。",
    "legal.thirdPartyTitle": "第三方內容與 IP 獨立責任",
    "legal.thirdPartyBody": "PlugPoint 僅作為中立之鏈上點數結算協議。所有接入協議之第三方遊戲、伺服器與數位內容，其智慧財產權均歸各自創作者所有；任何第三方遊戲之內容合規性與版權爭議均由該創作者獨立承擔，PlugPoint Protocol 不負連帶或衍生責任。",
    "footer.copyright": "© 2026 PlugPoint Protocol. 版權所有。開發者接入 SDK 與智能合約介面採用 MIT 開源授權。",
    "risks.home": "開啟協議儀表板",
    "risks.swap": "查看 PancakeSwap 即時報價 ↗",
  },
  "zh-Hans": {
    "nav.aria": "白皮书导航",
    "nav.home": "首页",
    "language.label": "语言",
    "hero.verified": "已在 BNB Smart Chain 主网验证",
    "hero.title1": "PlugPoint 协议",
    "hero.title2": "白皮书 v1.0",
    "hero.body": "专为 AI 生成游戏、独立工作室与社区服务器打造的开放式游戏点数与原子化分润网关。",
    "hero.quickstart": "三分钟接入指南",
    "hero.verify": "在 BscScan 验证 PLUG ↗",
    "hero.snapshot": "主网规格 · Chain ID 56 · 初始固定供应 1,000,000,000 PLUG · 发布于 2026 年 11 月 18 日",
    "toc.label": "章节目录",
    "toc.aria": "白皮书章节目录",
    "toc.vision": "1. 愿景与痛点",
    "toc.architecture": "2. 双通道资金闭环",
    "toc.economics": "3. 代币经济学",
    "toc.contracts": "4. 合约与安全设计",
    "toc.quickstart": "5. 三分钟接入指南",
    "toc.risks": "6. 风险与免责声明",
    "toc.machine": "机器可读资料",
    "chapter.1": "第 1 章",
    "chapter.2": "第 2 章",
    "chapter.3": "第 3 章",
    "chapter.4": "第 4 章",
    "chapter.5": "第 5 章",
    "chapter.6": "第 6 章",
    "vision.title": "愿景与 PlugPoint 解决的痛点",
    "vision.p1": "独立游戏、AI 生成体验与社区服务器常面临相同瓶颈：支付接入昂贵、平台规则分散，结算可能耗时数周。传统渠道若合并支付、发行与推广费用，整体抽成可能达到 30%～50%。",
    "vision.p2": "PlugPoint 让游戏经济不再依附单一商店。开发者可无需许可注册游戏、取得链上 App ID、接受通用实用型点数，并将每笔消费直接结算到指定创作者钱包。平台不保管内部账户余额，也没有人工拨款队列。",
    "vision.card1Title": "无需许可",
    "vision.card1Body": "任何钱包都能注册游戏，不需要审核委员会。",
    "vision.card2Title": "原子化",
    "vision.card2Body": "创作者、金库与销毁在同一笔确认交易中完成。",
    "vision.card3Title": "可审计",
    "vision.card3Body": "供应量、游戏流水、事件、储备与合约代码均公开于 BSC。",
    "architecture.title": "双通道资金闭环架构",
    "architecture.p1": "PlugPoint 由两个互补通道构成：官方 Vendor 让玩家按链上当前汇率，以库存支持的方式取得 PLUG；公开 PancakeSwap V2 Pair 则让创作者与持有人自由兑换 BSC USDT。",
    "architecture.vendorTitle": "官方 Vendor 直售机",
    "architecture.vendorBody": "USDT 直接转入协议金库，预先备妥的 PLUG 库存则发送给玩家。当前汇率为 1 USDT = 10 PLUG。",
    "architecture.dexTitle": "PancakeSwap V2",
    "architecture.dexBody": "创作者可通过公开 PLUG/USDT 池兑换所得 PLUG。报价由市场决定，并受储备深度、价格冲击与滑点影响。",
    "architecture.note": "Vendor 汇率是可由合约所有者调整的参数，不是法币锚定或保证赎回承诺；AMM 价格可能偏离 Vendor 参考汇率。",
    "economics.title": "代币经济学与 80 / 15 / 5 链上分润",
    "economics.p1": "PLUG 初始固定供应 1,000,000,000 枚、18 位小数、零转账税，且没有增发函数。每次 Gateway 消费都会原子化拆分完整金额。",
    "economics.creator": "创作者",
    "economics.creatorTitle": "创作者实得",
    "economics.creatorBody": "直接转入游戏收款钱包，没有平台托管或结算账期。",
    "economics.platformTitle": "协议分润",
    "economics.platformBody": "转入平台金库，用于生态运营与流动性维护。",
    "economics.burnTitle": "永久销毁",
    "economics.burnBody": "通过 burnFrom 永久销毁，使 totalSupply 持续下降。",
    "economics.formulaSpend": "玩家消费额",
    "economics.math1": "创作者份额采用精确舍入余数，因此创作者、平台与销毁之和始终等于输入金额。",
    "economics.math2": "若销毁率始终维持 5%，累计消费可估算为（1,000,000,000 − totalSupply）÷ 0.05。",
    "economics.reserve": "销毁会降低流通供应与名义未来义务，但本身不会产生 USDT。实际变现能力来自 PancakeSwap 储备与金库政策，必须分别衡量。",
    "contracts.title": "主网合约地址与安全设计",
    "contracts.p1": "以下为 BNB Smart Chain 主网正式地址。集成端必须锁定 Chain ID 56，并且只信任来自这些正式合约的事件。",
    "contracts.tableRole": "角色",
    "contracts.tableAddress": "地址",
    "contracts.tableEvidence": "链上证据",
    "contracts.creation": "Pair 创世建池交易",
    "contracts.block": "确认区块",
    "contracts.initialPool": "初始资金池",
    "security.title": "安全特性与管理权限",
    "security.item1": "Token 供应量在部署时固定；合约没有 mint 函数，也不收取转账税。",
    "security.item2": "Gateway 使用 ReentrancyGuard、Pausable、SafeERC20，平台费率硬上限 25%，销毁率硬上限 10%。",
    "security.item3": "Vendor 将 USDT 直接转入金库，且只能出售合约已经持有的 PLUG 库存。",
    "security.item4": "运营角色采用地址分离：金库与 LP Deployer 为不同地址。链下冷钱包保存方式无法仅凭合约证明。",
    "security.admin": "管理权限披露：Vendor 所有者可调整汇率与金库、暂停销售并提取未售库存；Gateway 所有者可在硬上限内调整费率、更换金库并暂停消费。用户应持续监控链上设置。",
    "quickstart.title": "游戏开发者三分钟接入指南",
    "quickstart.p1": "正式主网 ABI 使用 registerGame 与 spendPoints；正式 Gateway 不存在 registerApp 或 spend 函数。请解析已确认事件，不要预测 App ID，也不要信任待确认交易。",
    "quickstart.step1": "步骤 1 — Solidity 接口",
    "quickstart.step2": "步骤 2 — 使用 ethers.js v6 注册与扣点",
    "quickstart.step3": "步骤 3 — 使用 web3.js 后端验证结算",
    "quickstart.productionTitle": "正式环境检查清单",
    "quickstart.productionBody": "强制 Chain ID 56；根据道具价值等待适当确认数；验证正式 Gateway 地址及所有事件字段；对 orderId 与 transactionHash:logIndex 建立唯一限制；处理链重组后才发放高价值道具。",
    "common.copy": "复制",
    "common.copied": "代码已复制",
    "risks.title": "免责声明与风险提示",
    "risks.item1": "PLUG 定位为实用型游戏点数。本文档仅提供技术信息，不构成投资、法律、税务或财务建议，也不承诺获利或赎回。",
    "risks.item2": "PancakeSwap 初始池由 30 PLUG 与 3 USDT 建立，流动性深度很浅；即使不大的交易也可能造成明显价格冲击。务必查看实时报价与滑点，大额兑换应分批进行。",
    "risks.item3": "智能合约、RPC、钱包、前端、管理员密钥、稳定币与 AMM 均存在技术或运营风险；代码已验证并不代表完全没有漏洞。",
    "risks.item4": "开发者必须自行遵守所在地的消费者、游戏、税务、制裁、隐私与虚拟资产规范。高价值随机奖励应采用经审计的 commit-reveal 或 VRF；官网演示并非可验证随机。",
    "legal.eyebrow": "授权与版权",
    "legal.title": "版权归属与平台免责声明",
    "legal.brandTitle": "品牌与网站版权",
    "legal.brandBody": "PlugPoint 名称、视觉识别、官网界面设计及白皮书文件之著作权均归 PlugPoint Protocol 所有。未经授权不得复制，也不得用于仿冒、钓鱼或其他具有误导性的网站。",
    "legal.sdkTitle": "开发者接入授权",
    "legal.sdkBody": "外部游戏开发者可依据 MIT License 自由使用、修改并集成 PlugPointGateway 与 PlugPointVendor 合约接口及官方示例代码至任何商业或非商业游戏项目中。",
    "legal.thirdPartyTitle": "第三方内容与 IP 独立责任",
    "legal.thirdPartyBody": "PlugPoint 仅作为中立的链上点数结算协议。所有接入协议的第三方游戏、服务器与数字内容，其知识产权均归各自创作者所有；任何第三方游戏的内容合规性与版权争议均由该创作者独立承担，PlugPoint Protocol 不承担连带或衍生责任。",
    "footer.copyright": "© 2026 PlugPoint Protocol. 版权所有。开发者接入 SDK 与智能合约接口采用 MIT 开源授权。",
    "risks.home": "打开协议仪表板",
    "risks.swap": "查看 PancakeSwap 实时报价 ↗",
  },
};

const languageSelect = document.getElementById("whitepaperLanguage");
const copyToast = document.getElementById("copyToast");
const textNodes = [...document.querySelectorAll("[data-wp-i18n]")];
const ariaNodes = [...document.querySelectorAll("[data-wp-i18n-aria]")];
const englishText = new Map(textNodes.map((node) => [node.dataset.wpI18n, node.textContent]));
englishText.set("common.copied", "Code copied");
const englishAria = new Map(ariaNodes.map((node) => [node.dataset.wpI18nAria, node.getAttribute("aria-label")]));
let toastTimer;

function supportedLocale(value) {
  return ["en", "zh-Hant", "zh-Hans"].includes(value) ? value : "en";
}

function translated(locale, key, englishMap) {
  if (locale === "en") return englishMap.get(key) || key;
  return TRANSLATIONS[locale]?.[key] || englishMap.get(key) || key;
}

function applyLocale(localeValue) {
  const locale = supportedLocale(localeValue);
  document.documentElement.lang = locale;
  document.title = META[locale].title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", META[locale].description);
  textNodes.forEach((node) => {
    node.textContent = translated(locale, node.dataset.wpI18n, englishText);
  });
  ariaNodes.forEach((node) => {
    node.setAttribute("aria-label", translated(locale, node.dataset.wpI18nAria, englishAria));
  });
  languageSelect.value = locale;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  copyToast.textContent = message;
  copyToast.classList.remove("translate-y-3", "opacity-0");
  toastTimer = window.setTimeout(() => {
    copyToast.classList.add("translate-y-3", "opacity-0");
  }, 1800);
}

languageSelect.addEventListener("change", () => {
  const locale = supportedLocale(languageSelect.value);
  localStorage.setItem("plugpoint-locale", locale);
  applyLocale(locale);
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    await navigator.clipboard.writeText(target.textContent);
    const locale = supportedLocale(languageSelect.value);
    showToast(translated(locale, "common.copied", englishText));
  });
});

applyLocale(supportedLocale(localStorage.getItem("plugpoint-locale") || "en"));
