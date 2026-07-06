import {
  Banknote,
  BarChart3,
  BookOpenCheck,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Database,
  FileArchive,
  FileCheck2,
  FileClock,
  FileCog,
  FileMinus2,
  FileText,
  GitBranch,
  Landmark,
  LucideIcon,
  MailCheck,
  PlugZap,
  ReceiptText,
  ScanSearch,
  ShieldAlert,
  SlidersHorizontal,
  Workflow
} from "lucide-react";

export type PageId =
  | "dashboard"
  | "workbench.invoice"
  | "workbench.todos"
  | "workbench.exceptions"
  | "workbench.chainpiaoMonitor"
  | "invoices.workbench"
  | "invoices.billingRequests"
  | "invoices.billingReview"
  | "invoices.all"
  | "invoices.outputPool"
  | "invoices.inputPool"
  | "invoices.collection"
  | "invoices.verification"
  | "invoices.deduction"
  | "invoices.accounting"
  | "invoices.redOffset"
  | "invoices.void"
  | "invoices.delivery"
  | "invoices.archive"
  | "invoices.risk"
  | "invoices.chainpiao"
  | "income.workbench"
  | "income.billingRequests"
  | "income.invoiceQuery"
  | "income.settlements"
  | "income.uninvoiced"
  | "income.invoiced"
  | "income.invoiceMatching"
  | "income.reconciliation"
  | "income.adjustments"
  | "income.rules"
  | "cost.workbench"
  | "cost.confirmation"
  | "cost.costInvoices"
  | "cost.supplierReconciliation"
  | "cost.payableMatching"
  | "cost.prepayment"
  | "cost.prepaymentInvoices"
  | "cost.accruals"
  | "cost.allocations"
  | "cost.adjustments"
  | "cost.supplierCollaboration"
  | "advance.workbench"
  | "advance.requests"
  | "advance.register"
  | "advance.query"
  | "advance.customerConfirmation"
  | "advance.billingRequests"
  | "advance.invoiceQuery"
  | "advance.receivableGeneration"
  | "advance.receiptWriteOff"
  | "advance.overdue"
  | "advance.overdueRegion"
  | "advance.overdueCustomer"
  | "advance.badDebt"
  | "receivables.workbench"
  | "receivables.arLedger"
  | "receivables.receiptClaim"
  | "receivables.bankFlows"
  | "receivables.autoWriteOffRules"
  | "receivables.writeOff"
  | "receivables.overdue"
  | "receivables.collectionPlan"
  | "receivables.badDebt"
  | "receivables.badDebtWriteOff"
  | "receivables.creditLimit"
  | "tax.workbench"
  | "tax.outputTax"
  | "tax.inputTax"
  | "tax.deductionReport"
  | "tax.taxBurden"
  | "tax.commodityCheck"
  | "tax.taxDevices"
  | "tax.digitalQuota"
  | "tax.filing"
  | "reports.grossProfit"
  | "reports.invoiceAnalysis"
  | "reports.taxAnalysis"
  | "reports.advanceAnalysis"
  | "reports.billingProgress"
  | "reports.collectionProgress"
  | "reports.deductionAnalysis"
  | "reports.invoiceException"
  | "reports.customerCollection"
  | "reports.supplierCost"
  | "reports.arAging"
  | "reports.apAging"
  | "reports.accrualBalance"
  | "settings.entities"
  | "settings.customers"
  | "settings.suppliers"
  | "settings.commodityCodes"
  | "settings.taxRules"
  | "settings.taxDevices"
  | "settings.billingRules"
  | "settings.approvalFlows"
  | "settings.documentNumbers"
  | "settings.matchingRules"
  | "settings.writeOffRules"
  | "settings.riskRules"
  | "settings.businessFields"
  | "settings.invoicePools"
  | "settings.exportTemplates"
  | "settings.notificationTemplates"
  | "settings.chainpiaoIntegration"
  | "settings.logs"
  | "settings.interfaceLogs";

export type RowRecord = Record<string, string | number>;

export interface NavItem {
  id: PageId;
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface NavGroup {
  id: string;
  label: string;
  short: string;
  icon: LucideIcon;
  items: NavItem[];
}

export interface PageConfig {
  id: PageId;
  module: string;
  title: string;
  description: string;
  primaryAction?: string;
  secondaryActions: string[];
  filters: string[];
  columns: string[];
  rows: RowRecord[];
  detailSections: Array<{ title: string; fields: Array<[string, string]> }>;
  workflow: string[];
  emptyState?: string;
}

export interface BusinessActionResult {
  row: RowRecord;
  event: string;
  followUpEvents: string[];
}

type DetailSection = PageConfig["detailSections"][number];

export const navGroups: NavGroup[] = [
  {
    id: "dashboard",
    label: "经营工作台",
    short: "W",
    icon: Workflow,
    items: [
      { id: "dashboard", label: "经营概览", href: "/dashboard", icon: Workflow },
      { id: "workbench.todos", label: "票财待办", href: "/dashboard/todos", icon: FileClock },
      { id: "workbench.exceptions", label: "异常中心", href: "/dashboard/exceptions", icon: ShieldAlert },
      { id: "workbench.chainpiaoMonitor", label: "链票监控", href: "/dashboard/chainpiao-monitor", icon: PlugZap }
    ]
  },
  {
    id: "invoices",
    label: "发票中心",
    short: "I",
    icon: FileCog,
    items: [
      { id: "invoices.billingRequests", label: "开票申请", href: "/invoices/billing-requests", icon: FileClock },
      { id: "invoices.billingReview", label: "开票审核", href: "/invoices/billing-review", icon: FileCheck2 },
      { id: "invoices.outputPool", label: "销项发票", href: "/invoices/output-pool", icon: ReceiptText },
      { id: "invoices.collection", label: "进项采集", href: "/invoices/collection", icon: ScanSearch },
      { id: "invoices.inputPool", label: "进项发票", href: "/invoices/input-pool", icon: FileCheck2 },
      { id: "invoices.verification", label: "查验查重", href: "/invoices/verification", icon: ShieldAlert },
      { id: "invoices.deduction", label: "认证抵扣", href: "/invoices/deduction", icon: FileCog },
      { id: "invoices.redOffset", label: "红冲管理", href: "/invoices/red-offset", icon: FileMinus2 },
      { id: "invoices.void", label: "作废管理", href: "/invoices/void", icon: ShieldAlert },
      { id: "invoices.delivery", label: "发票交付", href: "/invoices/delivery", icon: MailCheck },
      { id: "invoices.archive", label: "发票归档", href: "/invoices/archive", icon: FileArchive },
      { id: "invoices.chainpiao", label: "链票流水", href: "/invoices/chainpiao", icon: PlugZap }
    ]
  },
  {
    id: "income",
    label: "客户结算",
    short: "F",
    icon: ReceiptText,
    items: [
      { id: "income.settlements", label: "结算单", href: "/income/settlements", icon: ClipboardList },
      { id: "income.reconciliation", label: "客户对账", href: "/income/reconciliation", icon: Landmark },
      { id: "income.uninvoiced", label: "未开票收入", href: "/income/uninvoiced", icon: FileText },
      { id: "income.invoiced", label: "已开票收入", href: "/income/invoiced", icon: FileCheck2 },
      { id: "income.invoiceMatching", label: "收入发票匹配", href: "/income/invoice-matching", icon: GitBranch },
      { id: "income.adjustments", label: "收入调整", href: "/income/adjustments", icon: SlidersHorizontal }
    ]
  },
  {
    id: "cost",
    label: "供应商结算",
    short: "C",
    icon: BookOpenCheck,
    items: [
      { id: "cost.confirmation", label: "成本单", href: "/cost/confirmation", icon: ClipboardList },
      { id: "cost.supplierReconciliation", label: "供应商对账", href: "/cost/supplier-reconciliation", icon: Landmark },
      { id: "cost.costInvoices", label: "成本发票匹配", href: "/cost/cost-invoices", icon: FileCheck2 },
      { id: "cost.payableMatching", label: "应付匹配", href: "/cost/payable-matching", icon: GitBranch },
      { id: "cost.prepayment", label: "预付款核销", href: "/cost/prepayment", icon: Banknote },
      { id: "cost.accruals", label: "暂估冲回", href: "/cost/accruals", icon: FileClock },
      { id: "cost.allocations", label: "成本分摊", href: "/cost/allocations", icon: BarChart3 },
      { id: "cost.adjustments", label: "成本调整", href: "/cost/adjustments", icon: SlidersHorizontal },
      { id: "cost.supplierCollaboration", label: "供应商协同", href: "/cost/supplier-collaboration", icon: PlugZap }
    ]
  },
  {
    id: "advance",
    label: "代垫款管理",
    short: "D",
    icon: CircleDollarSign,
    items: [
      { id: "advance.register", label: "代垫登记", href: "/advance/register", icon: CircleDollarSign },
      { id: "advance.customerConfirmation", label: "客户确认", href: "/advance/customer-confirmation", icon: FileCheck2 },
      { id: "advance.billingRequests", label: "代垫开票", href: "/advance/billing-requests", icon: ReceiptText },
      { id: "advance.receivableGeneration", label: "代垫应收", href: "/advance/receivable-generation", icon: Landmark },
      { id: "advance.receiptWriteOff", label: "代垫回款核销", href: "/advance/receipt-write-off", icon: GitBranch },
      { id: "advance.overdue", label: "代垫超期", href: "/advance/overdue", icon: ShieldAlert },
      { id: "advance.badDebt", label: "代垫减免/坏账", href: "/advance/bad-debt", icon: FileMinus2 }
    ]
  },
  {
    id: "receivables",
    label: "应收与回款",
    short: "R",
    icon: Landmark,
    items: [
      { id: "receivables.arLedger", label: "应收台账", href: "/receivables/ar-ledger", icon: Landmark },
      { id: "receivables.bankFlows", label: "银行流水", href: "/receivables/bank-flows", icon: Banknote },
      { id: "receivables.receiptClaim", label: "收款认领", href: "/receivables/receipt-claim", icon: Banknote },
      { id: "receivables.autoWriteOffRules", label: "自动核销", href: "/receivables/auto-write-off-rules", icon: FileCog },
      { id: "receivables.writeOff", label: "手工核销", href: "/receivables/write-off", icon: GitBranch },
      { id: "receivables.overdue", label: "逾期管理", href: "/receivables/overdue", icon: ShieldAlert },
      { id: "receivables.collectionPlan", label: "催收计划", href: "/receivables/collection-plan", icon: FileClock },
      { id: "receivables.badDebt", label: "坏账计提", href: "/receivables/bad-debt", icon: FileMinus2 },
      { id: "receivables.badDebtWriteOff", label: "坏账核销/转回", href: "/receivables/bad-debt-write-off", icon: FileMinus2 },
      { id: "receivables.creditLimit", label: "客户信用", href: "/receivables/credit-limit", icon: ShieldAlert }
    ]
  },
  {
    id: "tax",
    label: "税务合规",
    short: "T",
    icon: FileCog,
    items: [
      { id: "tax.workbench", label: "税务工作台", href: "/tax/workbench", icon: Workflow },
      { id: "tax.outputTax", label: "销项税额", href: "/tax/output-tax", icon: ReceiptText },
      { id: "tax.inputTax", label: "进项税额", href: "/tax/input-tax", icon: FileCheck2 },
      { id: "tax.deductionReport", label: "抵扣统计", href: "/tax/deduction-report", icon: ClipboardList },
      { id: "tax.taxBurden", label: "税负分析", href: "/tax/tax-burden", icon: BarChart3 },
      { id: "tax.commodityCheck", label: "商品编码/税率校验", href: "/tax/commodity-check", icon: ScanSearch },
      { id: "tax.digitalQuota", label: "数电票额度", href: "/tax/digital-quota", icon: ShieldAlert },
      { id: "tax.taxDevices", label: "票源/清卡", href: "/tax/tax-devices", icon: PlugZap },
      { id: "tax.filing", label: "申报状态", href: "/tax/filing", icon: FileArchive }
    ]
  },
  {
    id: "reports",
    label: "报表中心",
    short: "A",
    icon: BarChart3,
    items: [
      { id: "reports.grossProfit", label: "项目毛利", href: "/reports/gross-profit", icon: BarChart3 },
      { id: "reports.invoiceAnalysis", label: "发票分析", href: "/reports/invoice-analysis", icon: ReceiptText },
      { id: "reports.billingProgress", label: "开票进度分析", href: "/reports/billing-progress", icon: FileClock },
      { id: "reports.collectionProgress", label: "收票进度分析", href: "/reports/collection-progress", icon: ScanSearch },
      { id: "reports.deductionAnalysis", label: "进项抵扣分析", href: "/reports/deduction-analysis", icon: FileCheck2 },
      { id: "reports.invoiceException", label: "发票异常分析", href: "/reports/invoice-exception", icon: ShieldAlert },
      { id: "reports.customerCollection", label: "客户开票/回款分析", href: "/reports/customer-collection", icon: Landmark },
      { id: "reports.supplierCost", label: "供应商成本分析", href: "/reports/supplier-cost", icon: BookOpenCheck },
      { id: "reports.arAging", label: "应收账龄分析", href: "/reports/ar-aging", icon: FileClock },
      { id: "reports.apAging", label: "应付账龄分析", href: "/reports/ap-aging", icon: FileClock },
      { id: "reports.accrualBalance", label: "暂估余额分析", href: "/reports/accrual-balance", icon: BarChart3 },
      { id: "reports.advanceAnalysis", label: "代垫分析", href: "/reports/advance-analysis", icon: CircleDollarSign },
      { id: "reports.taxAnalysis", label: "税务分析", href: "/reports/tax-analysis", icon: FileCog }
    ]
  },
  {
    id: "settings",
    label: "基础配置",
    short: "S",
    icon: SlidersHorizontal,
    items: [
      { id: "settings.entities", label: "企业主体/开票抬头", href: "/settings/entities", icon: Building2 },
      { id: "settings.customers", label: "客户档案", href: "/settings/customers", icon: Database },
      { id: "settings.suppliers", label: "供应商档案", href: "/settings/suppliers", icon: Database },
      { id: "settings.commodityCodes", label: "商品/服务编码", href: "/settings/commodity-codes", icon: ClipboardList },
      { id: "settings.taxRules", label: "税率规则", href: "/settings/tax-rules", icon: FileCog },
      { id: "settings.billingRules", label: "开票规则", href: "/settings/billing-rules", icon: ReceiptText },
      { id: "settings.approvalFlows", label: "审批流程", href: "/settings/approval-flows", icon: Workflow },
      { id: "settings.documentNumbers", label: "单据编号", href: "/settings/document-numbers", icon: FileText },
      { id: "settings.matchingRules", label: "匹配规则", href: "/settings/matching-rules", icon: GitBranch },
      { id: "settings.writeOffRules", label: "核销规则", href: "/settings/write-off-rules", icon: Landmark },
      { id: "settings.riskRules", label: "风险规则", href: "/settings/risk-rules", icon: ShieldAlert },
      { id: "settings.businessFields", label: "业务字段", href: "/settings/business-fields", icon: SlidersHorizontal },
      { id: "settings.exportTemplates", label: "导出模板", href: "/settings/export-templates", icon: FileText },
      { id: "settings.notificationTemplates", label: "消息模板", href: "/settings/notification-templates", icon: MailCheck },
      { id: "settings.chainpiaoIntegration", label: "链票接口配置", href: "/settings/chainpiao-integration", icon: PlugZap },
      { id: "settings.logs", label: "操作日志", href: "/settings/logs", icon: ClipboardList },
      { id: "settings.interfaceLogs", label: "接口日志", href: "/settings/interface-logs", icon: PlugZap }
    ]
  }
];

export const dashboardMetrics = [
  { label: "待开票金额", value: "¥426.8万", trend: "12笔申请待处理", tone: "blue" },
  { label: "未收应收", value: "¥218.4万", trend: "3户高危逾期", tone: "amber" },
  { label: "待匹配成本", value: "¥94.2万", trend: "含暂估 31.6万", tone: "green" },
  { label: "坏账风险", value: "¥28.0万", trend: "2笔建议计提", tone: "red" }
];

export const dashboardTasks = [
  "开票审核：华芯微电子洁净运输服务费待财务复核",
  "关务代垫：SCM-IMP-202607-001 进口增值税和关税待客户确认",
  "成本暂估：外高桥保税仓洁净仓储费发票未到需冲暂估",
  "收款认领：长三角晶圆制造 50.0万回款可自动匹配",
  "链票回调：矽源封测红字发票待同步版式文件"
];

const businessCaseRows: RowRecord[] = [
  {
    "案例": "进口设备关务代垫闭环",
    "业务编号": "SCM-IMP-202607-001",
    "客户": "华芯微电子有限公司",
    "服务类型": "进口关务+恒温运输+保税仓储",
    "关键单据": "报关单2231202614789 / 运单TRK-SH-202607-028",
    "收入": "286,400.00",
    "成本": "185,040.00",
    "代垫": "418,260.00",
    "应收": "554,660.00",
    "状态": "待客户确认代垫并提交链票开具"
  },
  {
    "案例": "晶圆恒温干线运输结算",
    "业务编号": "SCM-TRK-202607-028",
    "客户": "长三角晶圆制造有限公司",
    "服务类型": "恒温防震运输",
    "关键单据": "运单TRK-SH-202607-028 / 签收单POD-202607-028",
    "收入": "512,760.00",
    "成本": "126,880.00",
    "代垫": "0.00",
    "应收": "12,760.00",
    "状态": "已开票，回款部分销账"
  },
  {
    "案例": "保税仓洁净仓储暂估",
    "业务编号": "WMS-BD-202607-006",
    "客户": "矽源封测科技有限公司",
    "服务类型": "保税仓储+查验保证金",
    "关键单据": "仓单WH-BD-202607-006 / 批次LOT-WF-202607-A18",
    "收入": "168,900.00",
    "成本": "92,800.00",
    "代垫": "48,900.00",
    "应收": "217,800.00",
    "状态": "商品编码复核，暂估待冲回"
  }
];

const sharedDetail: PageConfig["detailSections"] = [
  {
    title: "业务关联",
    fields: [
      ["业务编号", "SCM-IMP-202607-001"],
      ["客户PO", "PO-HX-202607-8891"],
      ["合同编号", "HT-SCM-2026-018"],
      ["客户项目", "12英寸晶圆厂备件进口保障"],
      ["服务类型", "进口关务+恒温运输+保税仓储"],
      ["所属区域", "华东关务组"],
      ["项目经理", "陈明"]
    ]
  },
  {
    title: "关务单据",
    fields: [
      ["报关单号", "2231202614789"],
      ["税单号", "TAX-CUS-202607-0081"],
      ["进口口岸", "上海浦东机场"],
      ["贸易方式", "一般贸易"],
      ["HS编码", "8486909900"],
      ["完税价格", "USD 640,000.00"],
      ["关税/进口增值税", "99,800.00 / 318,460.00"],
      ["查验状态", "机检查验已放行"]
    ]
  },
  {
    title: "运输仓储",
    fields: [
      ["运单号", "TRK-SH-202607-028"],
      ["承运商", "沪苏半导体干线运输有限公司"],
      ["温控要求", "18-22℃"],
      ["防震等级", "A级气垫车"],
      ["仓单号", "WH-BD-202607-006"],
      ["仓库", "上海外高桥保税仓 A3"],
      ["温湿度要求", "22℃±2 / RH 45%-55%"],
      ["批次号", "LOT-WF-202607-A18"]
    ]
  },
  {
    title: "财务链路",
    fields: [
      ["结算单号", "JS-SCM-202607-001"],
      ["开票申请号", "KP-SCM-202607-001"],
      ["销项发票", "INV-SCM-202607-001"],
      ["成本单号", "CB-CUS-202607-005 / CB-TRK-202607-016"],
      ["代垫单号", "DD-CUS-202607-011 / DD-CUS-202607-019"],
      ["应收单号", "AR-INV-202607-001 / AR-DD-202607-011"],
      ["回款流水", "BK20260706001"],
      ["链票流水", "LP202607060001"]
    ]
  },
  {
    title: "审计信息",
    fields: [
      ["创建人", "yuan_fang"],
      ["最近操作", "2026-07-06 10:38"],
      ["凭证状态", "待生成"],
      ["归档状态", "资料完整"]
    ]
  }
];

const workbenchRows: RowRecord[] = [
  { "事项编号": "TODO-INV-001", "事项类型": "开票审核", "业务对象": "KP-SCM-202607-001 华芯微电子洁净运输", "责任人": "财务复核岗", "金额": "286,400.00", "风险等级": "关注", "状态": "待处理" },
  { "事项编号": "TODO-CUS-003", "事项类型": "关务代垫确认", "业务对象": "SCM-IMP-202607-001 报关单 2231202614789", "责任人": "关务会计", "金额": "418,260.00", "风险等级": "高危", "状态": "待客户确认" },
  { "事项编号": "TODO-COST-006", "事项类型": "暂估冲回", "业务对象": "ZG-WMS-202607-006 外高桥保税仓洁净仓储", "责任人": "成本会计", "金额": "92,800.00", "风险等级": "正常", "状态": "处理中" },
  { "事项编号": "TODO-AR-011", "事项类型": "收款认领", "业务对象": "BK20260706002 长三角晶圆制造回款", "责任人": "应收会计", "金额": "500,000.00", "风险等级": "正常", "状态": "待处理" }
];

const invoiceRows: RowRecord[] = [
  {
    "发票号码": "INV-SCM-202607-001",
    "业务编号": "SCM-IMP-202607-001",
    "开票申请号": "KP-SCM-202607-001",
    "票种": "数电专票",
    "开票日期": "2026-07-03",
    "票面金额": "286,400.00",
    "销售方": "上海泓明供应链有限公司",
    "购买方": "华芯微电子有限公司",
    "客户PO": "PO-HX-202607-8891",
    "服务类型": "进口关务及温控运输服务",
    "报关单号": "2231202614789",
    "查验状态": "验证成功",
    "发票状态": "已开票",
    "链票状态": "成功"
  },
  {
    "发票号码": "INV-SCM-202607-002",
    "业务编号": "SCM-TRK-202607-028",
    "开票申请号": "KP-SCM-202607-002",
    "票种": "数电专票",
    "开票日期": "2026-07-12",
    "票面金额": "512,760.00",
    "销售方": "上海泓明供应链有限公司",
    "购买方": "长三角晶圆制造有限公司",
    "客户PO": "PO-YF-202607-2206",
    "服务类型": "晶圆恒温防震运输",
    "运单号": "TRK-SH-202607-028",
    "查验状态": "验证成功",
    "发票状态": "已交付",
    "链票状态": "成功"
  },
  {
    "发票号码": "RED-SCM-202607-001",
    "业务编号": "WMS-BD-202607-006",
    "开票申请号": "KP-SCM-202607-003",
    "票种": "红字数电票",
    "开票日期": "2026-07-18",
    "票面金额": "-24,600.00",
    "销售方": "上海泓明供应链有限公司",
    "购买方": "矽源封测科技有限公司",
    "客户PO": "PO-XY-202607-6108",
    "服务类型": "保税仓洁净仓储",
    "仓单号": "WH-BD-202607-006",
    "查验状态": "待同步",
    "发票状态": "部分红冲",
    "链票状态": "处理中"
  }
];

const billingRows: RowRecord[] = [
  { "开票申请号": "KP-SCM-202607-001", "业务编号": "SCM-IMP-202607-001", "申请日期": "2026-07-02", "来源单据": "JS-SCM-202607-001", "客户名称": "华芯微电子有限公司", "开票主体": "上海泓明供应链有限公司", "客户PO": "PO-HX-202607-8891", "商品/服务编码": "3040403030000000000", "税率": "6%", "含税金额": "286,400.00", "审核状态": "待审批", "开票状态": "待链票开具" },
  { "开票申请号": "KP-SCM-202607-002", "业务编号": "SCM-TRK-202607-028", "申请日期": "2026-07-11", "来源单据": "JS-SCM-202607-012", "客户名称": "长三角晶圆制造有限公司", "开票主体": "上海泓明供应链有限公司", "客户PO": "PO-YF-202607-2206", "商品/服务编码": "3040403030000000000", "税率": "9%", "含税金额": "512,760.00", "审核状态": "已通过", "开票状态": "已开票" },
  { "开票申请号": "KP-SCM-202607-003", "业务编号": "WMS-BD-202607-006", "申请日期": "2026-07-18", "来源单据": "JS-WMS-202607-006", "客户名称": "矽源封测科技有限公司", "开票主体": "上海泓明供应链有限公司", "客户PO": "PO-XY-202607-6108", "商品/服务编码": "3040407040000000000", "税率": "6%", "含税金额": "168,900.00", "审核状态": "异常挂起", "开票状态": "商品编码待复核" }
];

const incomeRows: RowRecord[] = [
  { "结算单号": "JS-SCM-202607-001", "接单日期": "2026-07-01", "收入状态": "已确认", "客户名称": "华芯微电子有限公司", "业务编号": "SCM-IMP-202607-001", "客户PO": "PO-HX-202607-8891", "服务类型": "进口关务+恒温运输", "所属区域": "华东关务组", "收入金额": "286,400.00", "开票状态": "待开票" },
  { "结算单号": "JS-SCM-202607-012", "接单日期": "2026-07-10", "收入状态": "已开票", "客户名称": "长三角晶圆制造有限公司", "业务编号": "SCM-TRK-202607-028", "客户PO": "PO-YF-202607-2206", "服务类型": "晶圆恒温防震运输", "所属区域": "华东运输组", "收入金额": "512,760.00", "开票状态": "已开票" },
  { "结算单号": "JS-WMS-202607-006", "接单日期": "2026-07-17", "收入状态": "待对账", "客户名称": "矽源封测科技有限公司", "业务编号": "WMS-BD-202607-006", "客户PO": "PO-XY-202607-6108", "服务类型": "保税仓洁净仓储", "所属区域": "保税仓储组", "收入金额": "168,900.00", "开票状态": "待客户确认" }
];

const costRows: RowRecord[] = [
  { "成本单号": "CB-CUS-202607-005", "业务编号": "SCM-IMP-202607-001", "发票号": "IN-CUS-202607-106", "创建日期": "2026-07-05", "发票日期": "2026-07-04", "供应商": "浦东机场货站报关服务部", "服务单据": "报关单2231202614789", "成本类型": "报关单查验及换单费", "发票状态": "已查验", "匹配状态": "四单匹配", "票面金额": "58,160.00" },
  { "成本单号": "CB-TRK-202607-016", "业务编号": "SCM-IMP-202607-001", "发票号": "IN-TRK-202607-122", "创建日期": "2026-07-16", "发票日期": "2026-07-15", "供应商": "沪苏半导体干线运输有限公司", "服务单据": "运单TRK-SH-202607-028", "成本类型": "恒温防震运输费", "发票状态": "待认证", "匹配状态": "三单匹配", "票面金额": "126,880.00" },
  { "成本单号": "ZG-WMS-202607-006", "业务编号": "WMS-BD-202607-006", "发票号": "-", "创建日期": "2026-07-20", "发票日期": "-", "供应商": "上海外高桥保税仓储有限公司", "服务单据": "仓单WH-BD-202607-006", "成本类型": "洁净仓储暂估", "发票状态": "发票未到", "匹配状态": "暂估应付", "票面金额": "92,800.00" }
];

const advanceRows: RowRecord[] = [
  { "代垫单号": "DD-CUS-202607-011", "业务编号": "SCM-IMP-202607-001", "报关单号": "2231202614789", "税单号": "TAX-CUS-202607-0081", "HS编码": "8486909900", "付款日期": "2026-07-05", "代垫状态": "待确认", "所属区域": "华东关务组", "客户名称": "华芯微电子有限公司", "费用类型": "进口增值税", "垫付金额": "318,460.00", "回款状态": "未回款" },
  { "代垫单号": "DD-CUS-202607-019", "业务编号": "SCM-IMP-202607-001", "报关单号": "2231202614789", "税单号": "TAX-CUS-202607-0082", "HS编码": "8486909900", "付款日期": "2026-07-06", "代垫状态": "部分回款", "所属区域": "华东关务组", "客户名称": "华芯微电子有限公司", "费用类型": "关税", "垫付金额": "99,800.00", "回款状态": "部分核销" },
  { "代垫单号": "DD-WMS-202606-025", "业务编号": "WMS-BD-202607-006", "报关单号": "2231202615842", "税单号": "-", "HS编码": "8542319000", "付款日期": "2026-06-21", "代垫状态": "超期", "所属区域": "保税仓储组", "客户名称": "矽源封测科技有限公司", "费用类型": "查验保证金", "垫付金额": "48,900.00", "回款状态": "催收中" }
];

const receivableRows: RowRecord[] = [
  { "应收单号": "AR-INV-202607-001", "业务编号": "SCM-IMP-202607-001", "客户名称": "华芯微电子有限公司", "来源发票": "INV-SCM-202607-001", "到期日": "2026-08-02", "账龄": "1-30天", "未收金额": "286,400.00", "风险等级": "关注", "销账状态": "未销账" },
  { "应收单号": "AR-INV-202607-002", "业务编号": "SCM-TRK-202607-028", "客户名称": "长三角晶圆制造有限公司", "来源发票": "INV-SCM-202607-002", "到期日": "2026-08-25", "账龄": "未到期", "未收金额": "12,760.00", "风险等级": "正常", "销账状态": "部分销账" },
  { "应收单号": "AR-DD-202607-011", "业务编号": "SCM-IMP-202607-001", "客户名称": "华芯微电子有限公司", "来源发票": "代垫应收-进口增值税/关税", "到期日": "2026-07-20", "账龄": "31-60天", "未收金额": "268,260.00", "风险等级": "高危", "销账状态": "部分销账" }
];

const bankRows: RowRecord[] = [
  { "流水号": "BK20260706001", "业务编号": "SCM-IMP-202607-001", "交易时间": "2026-07-06", "认领状态": "待认领", "公司简称": "泓明供应链", "银行账号": "6222 **** 0918", "付款单位": "华芯微电子有限公司", "交易币种": "CNY", "交易金额": "150,000.00" },
  { "流水号": "BK20260706002", "业务编号": "SCM-TRK-202607-028", "交易时间": "2026-07-13", "认领状态": "已匹配", "公司简称": "泓明供应链", "银行账号": "6222 **** 0918", "付款单位": "长三角晶圆制造有限公司", "交易币种": "CNY", "交易金额": "500,000.00" },
  { "流水号": "BK20260706003", "业务编号": "WMS-BD-202607-006", "交易时间": "2026-07-21", "认领状态": "待认领", "公司简称": "泓明供应链", "银行账号": "6222 **** 0918", "付款单位": "矽源封测科技有限公司", "交易币种": "CNY", "交易金额": "80,000.00" }
];

const taxRows: RowRecord[] = [
  { "期间": "2026-07", "主体": "上海泓明供应链有限公司", "票种": "数电专票", "销项税额": "47,358.11", "进项税额": "21,684.52", "可抵扣税额": "20,960.00", "税负率": "3.6%", "状态": "待复核" },
  { "期间": "2026-07", "主体": "苏州泓明供应链有限公司", "票种": "数电专票", "销项税额": "28,914.34", "进项税额": "18,420.00", "可抵扣税额": "18,420.00", "税负率": "2.9%", "状态": "正常" }
];

const reportRows: RowRecord[] = [
  { "维度": "关务代理-进口设备", "业务编号": "SCM-IMP-202607-001", "收入": "1,286,000.00", "成本": "742,000.00", "代垫余额": "418,260.00", "毛利率": "42.3%", "异常数": 3 },
  { "维度": "恒温运输-晶圆/芯片", "业务编号": "SCM-TRK-202607-028", "收入": "1,684,000.00", "成本": "1,092,000.00", "代垫余额": "62,000.00", "毛利率": "35.2%", "异常数": 1 },
  { "维度": "外高桥保税仓-洁净仓储", "业务编号": "WMS-BD-202607-006", "收入": "936,000.00", "成本": "604,000.00", "代垫余额": "138,000.00", "毛利率": "35.5%", "异常数": 2 }
];

const settingsRows: RowRecord[] = [
  { "名称": "上海泓明供应链有限公司", "类型": "销售方主体", "编码": "91310000733363087X", "状态": "启用", "最近更新": "2026-07-01" },
  { "名称": "华芯微电子有限公司", "类型": "半导体客户档案", "编码": "CUST-SEMI-001", "状态": "启用", "最近更新": "2026-07-03" },
  { "名称": "晶圆恒温运输服务", "类型": "商品/服务编码", "编码": "3040403030000000000", "状态": "启用", "最近更新": "2026-07-05" },
  { "名称": "关务代理及报关单服务规则", "类型": "开票规则", "编码": "RULE-CUS-001", "状态": "启用", "最近更新": "2026-07-02" },
  { "名称": "进口设备关务字段集", "类型": "业务字段模板", "编码": "FIELD-SCM-IMP", "状态": "启用", "最近更新": "2026-07-06" }
];

const interfaceRows: RowRecord[] = [
  {
    "流水号": "LP202607060001",
    "业务编号": "SCM-IMP-202607-001",
    "链票请求ID": "LP-REQ-202607060001",
    "幂等键": "IDEMP-SCM-IMP-202607-001-BLUE",
    "接口类型": "蓝字开票",
    "接口地址": "/openapi/v1/invoices/blue",
    "业务单号": "KP-SCM-202607-001",
    "请求摘要": "按 KP-SCM-202607-001 开具数电专票并回写发票号码",
    "处理状态": "成功",
    "回调状态": "已回调",
    "版式文件": "OFD/PDF/XML 已归集",
    "错误码": "-",
    "重试次数": 0,
    "重试策略": "失败后指数退避，最多5次",
    "下次重试时间": "-",
    "调用时间": "2026-07-06 10:22",
    "回调时间": "2026-07-06 10:24"
  },
  {
    "流水号": "LP202607060014",
    "业务编号": "WMS-BD-202607-006",
    "链票请求ID": "LP-REQ-202607060014",
    "幂等键": "IDEMP-WMS-BD-202607-006-RED",
    "接口类型": "红冲申请",
    "接口地址": "/openapi/v1/invoices/red-offset",
    "业务单号": "RED-SCM-202607-001",
    "请求摘要": "提交 RED-SCM-202607-001 红字发票申请并等待链票审核结果",
    "处理状态": "处理中",
    "回调状态": "等待回调",
    "版式文件": "待链票生成",
    "错误码": "-",
    "重试次数": 1,
    "重试策略": "指数退避，最多5次",
    "下次重试时间": "2026-07-06 17:20",
    "调用时间": "2026-07-06 11:16",
    "回调时间": "-"
  },
  {
    "流水号": "LP202607060019",
    "业务编号": "SCM-TRK-202607-028",
    "链票请求ID": "LP-REQ-202607060019",
    "幂等键": "IDEMP-SCM-TRK-202607-028-LAYOUT",
    "接口类型": "版式下载",
    "接口地址": "/openapi/v1/invoices/layout-files",
    "业务单号": "INV-SCM-202607-002",
    "请求摘要": "下载 INV-SCM-202607-002 的 OFD/PDF/XML 版式文件",
    "处理状态": "失败",
    "回调状态": "未回调",
    "版式文件": "OFD/PDF/XML 待补偿",
    "错误码": "LP-504",
    "重试次数": 2,
    "重试策略": "指数退避，最多5次",
    "下次重试时间": "2026-07-06 17:10",
    "调用时间": "2026-07-06 13:08",
    "回调时间": "-"
  }
];

const billingPrecheckByRequestId: Record<string, DetailSection[]> = {
  "KP-SCM-202607-001": [
    {
      title: "开票前置校验",
      fields: [
        ["抬头税号校验", "通过"],
        ["商品编码/税率", "通过"],
        ["数电票额度", "充足"],
        ["重复开票检查", "未重复"],
        ["客户信用/账期", "关注"],
        ["代垫确认", "待客户确认"],
        ["建议动作", "提交财务复核前确认代垫"]
      ]
    }
  ],
  "KP-SCM-202607-002": [
    {
      title: "开票前置校验",
      fields: [
        ["抬头税号校验", "通过"],
        ["商品编码/税率", "通过"],
        ["数电票额度", "充足"],
        ["重复开票检查", "未重复"],
        ["客户信用/账期", "通过"],
        ["代垫确认", "无代垫"],
        ["建议动作", "可提交链票开具"]
      ]
    }
  ],
  "KP-SCM-202607-003": [
    {
      title: "开票前置校验",
      fields: [
        ["抬头税号校验", "通过"],
        ["商品编码/税率", "不一致"],
        ["数电票额度", "充足"],
        ["重复开票检查", "未重复"],
        ["客户信用/账期", "通过"],
        ["代垫确认", "查验保证金超期"],
        ["建议动作", "修正商品编码后重新提交"]
      ]
    }
  ]
};

const traceabilityByBusinessId: Record<string, DetailSection[]> = {
  "SCM-IMP-202607-001": [
    {
      title: "业务追溯",
      fields: [
        ["客户PO", "PO-HX-202607-8891"],
        ["客户项目", "12英寸晶圆厂备件进口保障"],
        ["服务类型", "进口关务+恒温运输+保税仓储"],
        ["结算单号", "JS-SCM-202607-001"],
        ["开票申请号", "KP-SCM-202607-001"],
        ["销项发票", "INV-SCM-202607-001"],
        ["应收单号", "AR-INV-202607-001 / AR-DD-202607-011"],
        ["链票流水", "LP202607060001"]
      ]
    },
    {
      title: "关务运输仓储",
      fields: [
        ["报关单号", "2231202614789"],
        ["税单号", "TAX-CUS-202607-0081"],
        ["HS编码", "8486909900"],
        ["完税价格", "USD 640,000.00"],
        ["运单号", "TRK-SH-202607-028"],
        ["温控要求", "18-22℃"],
        ["仓单号", "WH-BD-202607-006"],
        ["批次号", "LOT-WF-202607-A18"]
      ]
    }
  ],
  "SCM-TRK-202607-028": [
    {
      title: "业务追溯",
      fields: [
        ["客户PO", "PO-YF-202607-2206"],
        ["客户项目", "晶圆月度干线运输"],
        ["服务类型", "晶圆恒温防震运输"],
        ["结算单号", "JS-SCM-202607-012"],
        ["开票申请号", "KP-SCM-202607-002"],
        ["销项发票", "INV-SCM-202607-002"],
        ["应收单号", "AR-INV-202607-002"],
        ["回款流水", "BK20260706002"]
      ]
    },
    {
      title: "运输执行",
      fields: [
        ["运单号", "TRK-SH-202607-028"],
        ["签收单号", "POD-202607-028"],
        ["承运商", "沪苏半导体干线运输有限公司"],
        ["温控要求", "18-22℃"],
        ["防震等级", "A级气垫车"],
        ["提货时间", "2026-07-10 09:30"],
        ["签收时间", "2026-07-11 16:20"],
        ["运输异常", "无"]
      ]
    }
  ],
  "WMS-BD-202607-006": [
    {
      title: "业务追溯",
      fields: [
        ["客户PO", "PO-XY-202607-6108"],
        ["客户项目", "封测物料保税仓储"],
        ["服务类型", "保税仓洁净仓储"],
        ["结算单号", "JS-WMS-202607-006"],
        ["开票申请号", "KP-SCM-202607-003"],
        ["销项发票", "RED-SCM-202607-001"],
        ["代垫单号", "DD-WMS-202606-025"],
        ["应收金额", "217,800.00"]
      ]
    },
    {
      title: "仓储执行",
      fields: [
        ["仓单号", "WH-BD-202607-006"],
        ["仓库", "上海外高桥保税仓 A3"],
        ["保税/非保税", "保税"],
        ["温湿度要求", "22℃±2 / RH 45%-55%"],
        ["批次号", "LOT-WF-202607-A18"],
        ["入库时间", "2026-07-17 11:40"],
        ["库龄", "18天"],
        ["暂估单号", "ZG-WMS-202607-006"]
      ]
    }
  ]
};

function config(
  id: PageId,
  module: string,
  title: string,
  description: string,
  filters: string[],
  columns: string[],
  rows: RowRecord[],
  secondaryActions: string[] = ["查询", "重置", "刷新"],
  primaryAction?: string,
  workflow: string[] = ["业务单据", "规则校验", "审批/匹配", "链票/财务处理", "归档与报表"]
): PageConfig {
  return {
    id,
    module,
    title,
    description,
    filters,
    columns,
    rows,
    secondaryActions,
    primaryAction,
    detailSections: sharedDetail,
    workflow
  };
}

const searchActionNames = new Set(["查询", "重置", "刷新", "流水号查询", "发票号查询", "业务编号查询", "单号查", "单号查询"]);

export function getSearchActions(config: PageConfig) {
  return unique(config.secondaryActions.filter((action) => searchActionNames.has(action)));
}

export function getToolbarActions(config: PageConfig) {
  return unique(config.secondaryActions.filter((action) => !searchActionNames.has(action) && action !== "展开更多搜索条件"));
}

const detailActionExclusions = new Set(["导出", "刷新", "列设置", "下钻", "下钻明细"]);

export function getDetailActions(config: PageConfig) {
  const actions = unique([
    ...(config.primaryAction ? [config.primaryAction] : []),
    ...getToolbarActions(config)
  ]).filter((action) => !detailActionExclusions.has(action)).slice(0, 3);
  return actions.length ? actions : ["查看明细"];
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function getRowDetailSections(config: PageConfig, row: RowRecord): DetailSection[] {
  const businessId = readText(row, "业务编号");
  const currentDocumentSection = {
    title: "当前单据",
    fields: buildCurrentDocumentFields(row)
  };
  const chainpiaoSections = buildChainpiaoInterfaceSections(row);
  const billingPrecheckSections = buildBillingPrecheckSections(row);
  if (!businessId) return chainpiaoSections.length ? [currentDocumentSection, ...chainpiaoSections] : config.detailSections;

  return [
    currentDocumentSection,
    ...billingPrecheckSections,
    ...chainpiaoSections,
    ...(traceabilityByBusinessId[businessId] ?? []),
    {
      title: "审计信息",
      fields: [
        ["来源页面", `${config.module} / ${config.title}`],
        ["创建人", "yuan_fang"],
        ["最近操作", "2026-07-06 10:38"],
        ["凭证状态", row["凭证状态"] ? String(row["凭证状态"]) : "待生成"],
        ["归档状态", row["归档状态"] ? String(row["归档状态"]) : "资料完整"]
      ]
    }
  ];
}

function buildCurrentDocumentFields(row: RowRecord): Array<[string, string]> {
  const priorityFields = [
    "业务编号",
    "客户PO",
    "开票申请号",
    "发票号码",
    "结算单号",
    "成本单号",
    "代垫单号",
    "应收单号",
    "流水号",
    "链票请求ID",
    "幂等键",
    "接口类型",
    "接口地址",
    "来源单据",
    "来源发票",
    "服务单据",
    "服务类型",
    "客户名称",
    "购买方",
    "供应商",
    "费用类型",
    "成本类型",
    "报关单号",
    "税单号",
    "HS编码",
    "运单号",
    "仓单号",
    "票面金额",
    "含税金额",
    "收入金额",
    "垫付金额",
    "未收金额",
    "状态",
    "审核状态",
    "前置校验状态",
    "风险标签",
    "发票状态",
    "开票状态",
    "交付状态",
    "回执状态",
    "最近交付时间",
    "链票状态",
    "处理状态",
    "最近同步时间",
    "回调状态",
    "版式文件",
    "重试次数",
    "重试策略",
    "下次重试时间",
    "红冲状态",
    "作废校验",
    "处理建议",
    "代垫状态",
    "回款状态",
    "销账状态",
    "认领状态",
    "核销时间",
    "匹配状态",
    "查验状态",
    "认证状态",
    "抵扣状态",
    "归档状态"
  ];
  return priorityFields
    .flatMap((field) => {
      const value = readText(row, field);
      return value ? ([[field, value]] as Array<[string, string]>) : [];
    })
    .slice(0, 12);
}

function buildChainpiaoInterfaceSections(row: RowRecord): DetailSection[] {
  const serialNo = readText(row, "流水号");
  const requestId = readText(row, "链票请求ID");
  if (!serialNo || !requestId) return [];

  return [
    {
      title: "链票接口追踪",
      fields: compactFields([
        ["链票流水号", serialNo],
        ["链票请求ID", requestId],
        ["幂等键", readText(row, "幂等键")],
        ["接口类型", readText(row, "接口类型")],
        ["接口地址", readText(row, "接口地址")],
        ["业务单号", readText(row, "业务单号")],
        ["请求摘要", readText(row, "请求摘要")],
        ["处理状态", readText(row, "处理状态")]
      ])
    },
    {
      title: "回调与补偿",
      fields: compactFields([
        ["回调状态", readText(row, "回调状态")],
        ["回调时间", readText(row, "回调时间")],
        ["版式文件", readText(row, "版式文件")],
        ["错误码", readText(row, "错误码")],
        ["重试次数", readText(row, "重试次数")],
        ["重试策略", readText(row, "重试策略")],
        ["下次重试时间", readText(row, "下次重试时间")],
        ["调用时间", readText(row, "调用时间")]
      ])
    }
  ];
}

function buildBillingPrecheckSections(row: RowRecord): DetailSection[] {
  const requestId = readText(row, "开票申请号");
  return requestId ? (billingPrecheckByRequestId[requestId] ?? []) : [];
}

function compactFields(fields: Array<[string, string]>): Array<[string, string]> {
  return fields.filter(([, value]) => value !== "");
}

function readText(row: RowRecord, field: string) {
  const value = row[field];
  if (value === undefined || value === null || value === "") return "";
  return String(value);
}

const rowIdentityFields = [
  "发票号码",
  "开票申请号",
  "成本单号",
  "代垫单号",
  "应收单号",
  "流水号",
  "结算单号",
  "事项编号",
  "名称",
  "业务编号"
];

export function getRowIdentity(row: RowRecord) {
  for (const field of rowIdentityFields) {
    const value = readText(row, field);
    if (value) return `${field}:${value}`;
  }
  return Object.entries(row)
    .slice(0, 3)
    .map(([key, value]) => `${key}:${String(value)}`)
    .join("|");
}

export function applyBusinessAction(config: PageConfig, row: RowRecord, action: string): BusinessActionResult {
  const nextRow: RowRecord = { ...row };
  if (searchActionNames.has(action)) {
    const verb = action === "重置" ? "重置筛选条件" : "按当前筛选条件执行查询";
    return {
      row: nextRow,
      event: `${config.title}：已${verb}`,
      followUpEvents: []
    };
  }

  const target = getActionTarget(row);
  const followUpEvents: string[] = [];
  let event = `${config.title}：${action} 已处理，${target}`;

  if (action.includes("风险复核")) {
    nextRow["前置校验状态"] = "未通过";
    nextRow["审核状态"] = "待商品编码修正";
    nextRow["开票状态"] = "链票前置拦截";
    nextRow["风险标签"] = "商品编码与税率不一致";
    event = `${config.title}：${target} 风险复核未通过，已拦截链票提交`;
    followUpEvents.push("链票前置拦截：商品/服务编码需修正后才能提交开具");
  } else if (action.includes("提交审核")) {
    nextRow["前置校验状态"] = "需复核";
    nextRow["审核状态"] = "待财务复核";
    nextRow["开票状态"] = "待链票开具";
    event = `${config.title}：${target} 已完成开票前置校验并提交财务复核`;
    followUpEvents.push("前置校验：客户信用/代垫确认需复核，已转财务复核队列");
  } else if (action.includes("重试")) {
    const retryCount = Number(row["重试次数"] ?? 0) + 1;
    nextRow["处理状态"] = "重试中";
    nextRow["回调状态"] = "等待回调";
    nextRow["重试次数"] = retryCount;
    nextRow["下次重试时间"] = "2026-07-06 17:35";
    event = `${config.title}：${target} 已进入第 ${retryCount} 次重试队列`;
    const idempotencyKey = readText(row, "幂等键");
    if (idempotencyKey) {
      followUpEvents.push(`链票重试：使用幂等键 ${idempotencyKey}，避免重复生成版式文件`);
    }
  } else if (action.includes("交付")) {
    nextRow["交付状态"] = "交付中";
    nextRow["回执状态"] = "待回执";
    nextRow["最近交付时间"] = "2026-07-06 17:30";
    event = `${config.title}：${target} 已生成交付任务，等待客户签收回执`;
    followUpEvents.push(`交付任务：${readText(row, "发票号码") || target} 已进入客户回执跟踪`);
  } else if (action.includes("链票") || action.includes("同步")) {
    nextRow["链票状态"] = "已同步";
    nextRow["处理状态"] = "成功";
    nextRow["最近同步时间"] = "2026-07-06 17:30";
    event = `${config.title}：${target} 已同步链票状态`;
    const invoiceNo = readText(row, "发票号码") || target;
    followUpEvents.push(`链票回调：${invoiceNo} 已返回数电票版式文件与开票成功状态`);
  } else if (action.includes("红冲")) {
    nextRow["发票状态"] = "红冲申请中";
    nextRow["红冲状态"] = "待审核";
    nextRow["链票状态"] = "处理中";
    event = `${config.title}：${target} 已生成红冲申请并保留原票关系`;
  } else if (action.includes("作废")) {
    nextRow["作废校验"] = "不满足作废条件";
    nextRow["处理建议"] = "转红冲流程";
    event = `${config.title}：${target} 已执行作废条件校验`;
    followUpEvents.push("作废校验：数电票已开具，系统建议转红冲流程");
  } else if (action.includes("销账") || action.includes("核销")) {
    nextRow["销账状态"] = "已销账";
    nextRow["认领状态"] = "已匹配";
    nextRow["未收金额"] = "0.00";
    nextRow["回款状态"] = "已核销";
    nextRow["核销时间"] = "2026-07-06 17:30";
    event = `${config.title}：${target} 已完成收款匹配并销账`;
  } else if (action.includes("查验")) {
    nextRow["查验状态"] = "已查验";
    nextRow["查验时间"] = "2026-07-06 17:30";
    event = `${config.title}：${target} 已提交并完成发票查验`;
  } else if (action.includes("认证") || action.includes("抵扣")) {
    nextRow["认证状态"] = "已勾选";
    nextRow["抵扣状态"] = "待申报";
    event = `${config.title}：${target} 已进入进项认证勾选流程`;
  } else if (action.includes("归档")) {
    nextRow["归档状态"] = "已归档";
    nextRow["归档时间"] = "2026-07-06 17:30";
    event = `${config.title}：${target} 已校验版式文件并完成归档`;
  } else if (action.includes("坏账")) {
    nextRow["坏账状态"] = "审批中";
    nextRow["风险等级"] = "高危";
    event = `${config.title}：${target} 已生成坏账审批记录`;
  } else if (action.includes("巡检")) {
    nextRow["风险巡检状态"] = "已生成";
    event = `${config.title}：${target} 已生成风险巡检批次`;
  } else if (action.includes("票源") || action.includes("清卡") || action.includes("额度")) {
    nextRow["同步状态"] = "已同步";
    nextRow["状态"] = "正常";
    event = `${config.title}：${target} 已同步税控票源与额度状态`;
  }

  return { row: nextRow, event, followUpEvents };
}

function getActionTarget(row: RowRecord) {
  const primary =
    readText(row, "发票号码") ||
    readText(row, "开票申请号") ||
    readText(row, "成本单号") ||
    readText(row, "代垫单号") ||
    readText(row, "应收单号") ||
    readText(row, "流水号") ||
    readText(row, "结算单号") ||
    readText(row, "事项编号") ||
    readText(row, "名称");
  const businessId = readText(row, "业务编号");
  if (primary && businessId && primary !== businessId) return `${primary} / ${businessId}`;
  return primary || businessId || "当前单据";
}

const workbenchFilters = ["事项类型", "责任人", "风险等级", "状态", "业务对象", "所属模块", "创建时间"];
const invoiceColumns = ["发票号码", "票种", "开票日期", "票面金额", "销售方", "购买方", "查验状态", "发票状态", "链票状态"];
const billingColumns = ["开票申请号", "申请日期", "来源单据", "客户名称", "开票主体", "含税金额", "审核状态", "开票状态"];
const incomeColumns = ["结算单号", "接单日期", "收入状态", "客户名称", "业务编号", "所属区域", "收入金额", "开票状态"];
const costColumns = ["成本单号", "发票号", "创建日期", "供应商", "成本类型", "发票状态", "匹配状态", "票面金额"];
const advanceColumns = ["代垫单号", "业务编号", "付款日期", "代垫状态", "所属区域", "客户名称", "费用类型", "垫付金额", "回款状态"];
const receivableColumns = ["应收单号", "客户名称", "来源发票", "到期日", "账龄", "未收金额", "风险等级", "销账状态"];
const bankColumns = ["流水号", "交易时间", "认领状态", "公司简称", "银行账号", "付款单位", "交易币种", "交易金额"];
const taxColumns = ["期间", "主体", "票种", "销项税额", "进项税额", "可抵扣税额", "税负率", "状态"];
const reportColumns = ["维度", "收入", "成本", "代垫余额", "毛利率", "异常数"];
const settingColumns = ["名称", "类型", "编码", "状态", "最近更新"];
const interfaceColumns = ["流水号", "接口类型", "业务编号", "业务单号", "处理状态", "回调状态", "错误码", "重试次数", "下次重试时间"];

export const pageConfigs: Record<PageId, PageConfig> = {
  dashboard: config("dashboard", "经营工作台", "经营概览", "汇总收入、成本、代垫、应收、税务和链票接口待办。", [], [], businessCaseRows),
  "workbench.invoice": config("workbench.invoice", "经营工作台", "发票工作台", "按发票全生命周期聚合待开票、待收票、待红冲、待交付和接口异常。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "处理事项", "同步链票状态", "导出"]),
  "workbench.todos": config("workbench.todos", "经营工作台", "票财待办", "按岗位汇总开票审核、查验、匹配、核销、归档等处理任务。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "批量分派", "标记已处理", "导出"]),
  "workbench.exceptions": config("workbench.exceptions", "经营工作台", "异常中心", "集中跟踪链票失败、发票重复、税率异常、超期应收和暂估未冲。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "生成处理单", "加入白名单", "导出"]),
  "workbench.chainpiaoMonitor": config("workbench.chainpiaoMonitor", "经营工作台", "链票监控", "监控链票开票、红冲、查询、下载、回调和重试任务。", ["接口类型", "业务单号", "处理状态", "错误码", "调用时间", "重试次数"], interfaceColumns, interfaceRows, ["查询", "重置", "同步链票状态", "重试失败任务", "查看接口报文"]),

  "invoices.workbench": config("invoices.workbench", "发票中心", "发票工作台", "汇总待开票、待收票、待查验、待抵扣、待红冲、待归档和风险票。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "处理事项", "执行巡检", "导出"]),
  "invoices.billingRequests": config("invoices.billingRequests", "发票中心", "开票申请", "从结算单、应收单和代垫单生成开票申请，进入链票开具前置流程。", ["申请日期", "审核状态", "客户名称", "开票主体", "来源单据", "业务编号", "开票申请号", "含税金额"], billingColumns, billingRows, ["查询", "重置", "单号查询", "提交审核", "批量提交链票", "导出"], "新增开票申请"),
  "invoices.billingReview": config("invoices.billingReview", "发票中心", "开票审核", "审核客户抬头、税号、商品编码、税率、合同余额和信用额度。", ["申请日期", "审核状态", "客户名称", "开票主体", "异常类型", "税率", "商品编码"], billingColumns, billingRows, ["查询", "重置", "审核通过", "退回修改", "风险复核", "导出"]),
  "invoices.all": config("invoices.all", "发票中心", "发票汇总", "统一展示进项、销项、红字、作废、交付、归档和接口状态。", ["发票号码", "票种", "查验状态", "录入方式", "抬头校验状态", "所属票池", "发票类别", "使用状态", "交付方式", "交付状态", "链票状态", "认证状态", "归档状态", "风险标签", "开票日期", "录入时间"], invoiceColumns, invoiceRows, ["查询", "重置", "批量维护", "批量查验", "抬头校验", "导出", "列设置"], "添加发票"),
  "invoices.outputPool": config("invoices.outputPool", "发票中心", "销项发票", "蓝字开具、红冲作废、交付任务和应收关联的销项票池。", ["发票号码", "票种", "发票状态", "交付方式", "交付状态", "链票状态", "购买方名称", "客户税号", "开票申请号", "业务编号", "开票日期", "应收状态"], invoiceColumns, invoiceRows, ["查询", "重置", "提交交付任务", "重发交付", "同步链票状态", "导出"]),
  "invoices.inputPool": config("invoices.inputPool", "发票中心", "进项发票", "进项票采集、查验、认证、匹配和成本归集。", ["发票号码", "票种", "查验状态", "认证状态", "匹配状态", "录入方式", "销售方名称", "购买方名称", "所属票池", "发票日期", "入账期间"], costColumns, costRows, ["查询", "重置", "批量查验", "认证勾选", "成本匹配", "导出"]),
  "invoices.collection": config("invoices.collection", "发票中心", "进项采集", "统一接收上传、邮箱、OCR、扫码、税局下载和链票同步的发票。", ["采集来源", "采集状态", "发票号码", "票种", "销售方", "购买方", "采集时间", "归属票池"], invoiceColumns, invoiceRows, ["查询", "重置", "上传发票", "批量采集", "分配票池", "导出"], "上传发票"),
  "invoices.verification": config("invoices.verification", "发票中心", "查验查重", "进行真伪查验、重复报销、重复入账、抬头税号和金额一致性校验。", ["发票号码", "查验状态", "查重状态", "抬头校验状态", "销售方", "购买方", "风险等级", "查验时间"], invoiceColumns, invoiceRows, ["查询", "重置", "批量查验", "重复检测", "生成风险单", "导出"]),
  "invoices.deduction": config("invoices.deduction", "发票中心", "认证抵扣", "管理进项认证、用途确认、抵扣统计、撤销勾选和入账期间。", ["认证状态", "用途确认", "抵扣期间", "发票号码", "销售方", "税率", "税额"], invoiceColumns, invoiceRows, ["查询", "重置", "认证勾选", "撤销勾选", "生成抵扣统计", "导出"]),
  "invoices.accounting": config("invoices.accounting", "发票中心", "发票入账", "把发票与收入、成本、应收、应付、费用和凭证生成状态打通。", ["入账状态", "凭证状态", "会计期间", "发票号码", "业务单号", "成本单号", "应收单号"], invoiceColumns, invoiceRows, ["查询", "重置", "生成凭证", "入账复核", "退回业务", "导出"]),
  "invoices.redOffset": config("invoices.redOffset", "发票中心", "红冲管理", "集中处理全额红冲、部分红冲、红字确认和红冲后重开。", ["原发票号", "红冲状态", "申请日期", "客户名称", "红冲原因", "链票状态"], invoiceColumns, invoiceRows, ["查询", "重置", "发起红冲", "红冲后重开", "同步链票状态", "导出"]),
  "invoices.void": config("invoices.void", "发票中心", "作废管理", "对不同票种和状态进行作废校验；数电票默认引导红冲。", ["发票号码", "票种", "开票日期", "作废状态", "客户名称"], invoiceColumns, invoiceRows, ["查询", "重置", "作废校验", "转红冲", "导出"]),
  "invoices.delivery": config("invoices.delivery", "发票中心", "发票交付", "按交付任务统一管理客户接收信息、交付记录和回执状态。", ["任务编号", "发票号码", "客户名称", "交付方式", "交付状态", "回执状态", "收件人", "开票日期", "最近交付时间"], invoiceColumns, invoiceRows, ["查询", "重置", "新建交付任务", "重发交付", "查看交付记录", "导出"]),
  "invoices.archive": config("invoices.archive", "发票中心", "发票归档", "管理 OFD、PDF、XML、影像附件、验签结果和会计档案归档状态。", ["发票号码", "票种", "归档状态", "验签状态", "版式文件", "XML文件", "会计期间", "归档时间"], invoiceColumns, invoiceRows, ["查询", "重置", "归档校验", "下载版式文件", "生成档案包", "导出"]),
  "invoices.risk": config("invoices.risk", "发票中心", "风险巡检", "巡检重复开票、抬头税号异常、红冲作废变更、查验失败和高风险客户。", ["风险类型", "风险等级", "发票号码", "客户名称", "查验状态", "红冲作废状态", "巡检时间"], invoiceColumns, invoiceRows, ["查询", "重置", "执行巡检", "生成处理单", "加入白名单", "导出"]),
  "invoices.chainpiao": config("invoices.chainpiao", "发票中心", "链票流水", "封装链票蓝字开票、红冲、查询、下载、交付和回调。", ["接口类型", "业务单号", "链票流水号", "处理状态", "调用时间", "错误码", "重试次数"], interfaceColumns, interfaceRows, ["查询", "重置", "同步链票状态", "重试失败任务", "查看接口报文", "异常补偿"]),

  "income.workbench": config("income.workbench", "客户结算", "收入工作台", "汇总待确认收入、未开票收入、客户对账差异和收入调整事项。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "生成结算单", "创建对账", "导出"]),
  "income.billingRequests": config("income.billingRequests", "客户结算", "开票申请", "保留原收入侧入口，用于从收入结算生成开票申请。", ["接单日期", "账单状态", "客户名称", "业务编号", "所属区域", "开票申请号", "提交批号", "勾选金额"], billingColumns, billingRows, ["查询", "重置", "流水号查询", "生成开票申请", "刷新"], "新增开票申请"),
  "income.invoiceQuery": config("income.invoiceQuery", "客户结算", "收入发票查询", "从收入视角追溯开票日期、发票状态、税号、抬头和发票号。", ["开票日期", "发票状态", "出票单位", "发票税号", "发票抬头", "开票申请号", "发票号码", "凭证状态"], invoiceColumns, invoiceRows, ["查询", "重置", "发票号查询", "业务编号查询", "导出"]),
  "income.settlements": config("income.settlements", "客户结算", "结算单", "承接业务单、合同、项目和客户对账，形成可开票收入池。", ["接单日期", "收入状态", "客户名称", "业务编号", "所属区域", "结算单号", "会计期间"], incomeColumns, incomeRows, ["查询", "重置", "新增结算单", "提交确认", "生成开票申请", "导出"], "新增结算单"),
  "income.uninvoiced": config("income.uninvoiced", "客户结算", "未开票收入", "沉淀已确认收入但尚未开票的账单池。", ["接单日期", "客户名称", "区域名称", "业务编号"], incomeColumns, incomeRows.filter((row) => row["开票状态"] !== "已开票"), ["查询", "重置", "流水号查询", "生成开票申请"]),
  "income.invoiced": config("income.invoiced", "客户结算", "已开票收入", "按业务单追踪已开票收入、凭证与归档状态。", ["接单日期", "客户名称", "区域名称", "业务编号"], invoiceColumns, invoiceRows.filter((row) => row["发票状态"] !== "部分红冲"), ["查询", "重置", "流水号查询", "归档检查"]),
  "income.invoiceMatching": config("income.invoiceMatching", "客户结算", "收入发票匹配", "把收入结算单、开票申请、销项发票和应收单建立对应关系。", ["客户名称", "结算单号", "开票申请号", "发票号码", "匹配状态", "差异状态"], incomeColumns, incomeRows, ["查询", "重置", "自动匹配", "手工匹配", "差异处理"]),
  "income.reconciliation": config("income.reconciliation", "客户结算", "客户对账", "与客户确认账单、开票金额、未开票收入、已收款和差异处理。", ["客户名称", "对账期间", "对账状态", "差异状态", "业务编号", "结算单号"], incomeColumns, incomeRows, ["查询", "重置", "发起对账", "确认对账", "生成开票申请"]),
  "income.adjustments": config("income.adjustments", "客户结算", "收入调整", "处理折让、跨期调整、金额差异和红冲后收入重算。", ["调整类型", "调整状态", "客户名称", "业务编号", "会计期间"], incomeColumns, incomeRows, ["查询", "重置", "新增调整", "提交审核", "导出"]),
  "income.rules": config("income.rules", "客户结算", "收入规则", "配置收入确认口径、开票触发条件、账期和客户对账策略。", ["规则名称", "客户类型", "业务类型", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增规则", "模拟校验"]),

  "cost.workbench": config("cost.workbench", "供应商结算", "成本工作台", "汇总待确认成本、待匹配进项票、供应商对账差异、暂估和预付款余额。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "确认成本", "处理暂估", "导出"]),
  "cost.confirmation": config("cost.confirmation", "供应商结算", "成本单", "承接采购、服务、物流和项目成本，形成成本单并等待发票或暂估处理。", ["创建日期", "成本状态", "供应商", "成本类型", "业务编号", "项目", "会计期间"], costColumns, costRows, ["查询", "重置", "新增成本单", "提交确认", "生成暂估"], "新增成本单"),
  "cost.costInvoices": config("cost.costInvoices", "供应商结算", "成本发票匹配", "管理采购方/销售方、发票状态、成本流程和进项入账。", ["创建日期", "发票日期", "发票状态", "发票流程", "发票号", "采购方名称", "销售方名称"], costColumns, costRows, ["查询", "重置", "流水号查询", "关联成本", "认证勾选", "导出"]),
  "cost.supplierReconciliation": config("cost.supplierReconciliation", "供应商结算", "供应商对账", "与供应商确认成本、发票、预付款、付款和差异金额。", ["供应商", "对账期间", "对账状态", "差异状态", "发票状态", "付款状态"], costColumns, costRows, ["查询", "重置", "发起对账", "确认对账", "差异处理"]),
  "cost.payableMatching": config("cost.payableMatching", "供应商结算", "应付匹配", "合同、订单、验收、成本单、发票和付款的三单/四单匹配。", ["供应商", "合同编号", "发票状态", "付款状态", "差异状态"], costColumns, costRows, ["查询", "重置", "三单匹配", "四单匹配", "差异处理"]),
  "cost.prepayment": config("cost.prepayment", "供应商结算", "预付款核销", "管理供应商预付款申请、占用、到票核销、余额和异常提醒。", ["供应商", "预付款单号", "核销状态", "发票金额", "预付款余额", "付款日期"], costColumns, costRows, ["查询", "重置", "自动核销", "手工核销", "余额预警"]),
  "cost.prepaymentInvoices": config("cost.prepaymentInvoices", "供应商结算", "预付款关联发票", "保留原入口，展示供应商预付款与到票的关联核销。", ["供应商", "预付款金额", "发票金额"], costColumns, costRows, ["查询", "重置", "自动匹配", "手工关联", "刷新"]),
  "cost.accruals": config("cost.accruals", "供应商结算", "暂估冲回", "业务已发生但发票未到时进行暂估，发票到后自动冲回或差异调整。", ["供应商", "暂估单号", "暂估状态", "会计期间", "发票状态", "冲回状态"], costColumns, costRows, ["查询", "重置", "生成暂估", "冲回暂估", "差异调整"]),
  "cost.allocations": config("cost.allocations", "供应商结算", "成本分摊", "将成本按项目、客户、订单、部门和业务线进行分摊归集。", ["分摊期间", "成本类型", "项目", "客户", "部门", "分摊状态"], costColumns, costRows, ["查询", "重置", "生成分摊", "重算分摊", "导出"]),
  "cost.adjustments": config("cost.adjustments", "供应商结算", "成本调整", "处理税率差异、金额差异、红冲、退票、重复入账和供应商变更。", ["调整类型", "调整状态", "供应商", "成本单号", "发票号", "会计期间"], costColumns, costRows, ["查询", "重置", "新增调整", "提交审核", "导出"]),
  "cost.supplierCollaboration": config("cost.supplierCollaboration", "供应商结算", "供应商协同", "展示供应商上传、确认、补票、退回和开票资料维护的协同入口。", ["供应商", "协同状态", "发票状态", "上传时间", "退回原因"], costColumns, costRows, ["查询", "重置", "邀请供应商", "退回补正", "导出"]),

  "advance.workbench": config("advance.workbench", "代垫款管理", "代垫工作台", "汇总代垫申请、客户确认、开票、应收生成、回款核销和超期风险。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "提交确认", "生成应收", "导出"]),
  "advance.requests": config("advance.requests", "代垫款管理", "代垫申请/垫付单", "登记垫付原因、费用类型、客户承担规则和后续开票策略。", ["创建日期", "客户名称", "费用类型", "业务编号", "申请状态", "付款状态"], advanceColumns, advanceRows, ["查询", "重置", "新增申请", "提交审批", "导出"], "新增代垫申请"),
  "advance.register": config("advance.register", "代垫款管理", "代垫登记", "登记员工、供应商或项目代垫，并设置客户确认与开票策略。", ["创建日期", "客户名称", "费用类型", "业务编号", "报关单号"], advanceColumns, advanceRows, ["查询", "重置", "新增代垫", "提交确认"], "新增代垫"),
  "advance.query": config("advance.query", "代垫款管理", "代垫查询", "查询创建/付款日期、状态、区域、客户、供应商和费用类型。", ["创建日期", "付款日期", "代垫状态", "所属区域", "公司简称", "客户名称", "结算单位", "供应商", "费用类型", "业务编号", "报关单号", "凭证状态", "垫付金额"], advanceColumns, advanceRows, ["查询", "重置", "单号查", "生成应收", "刷新"]),
  "advance.customerConfirmation": config("advance.customerConfirmation", "代垫款管理", "客户确认", "跟踪客户确认、驳回、补充资料和确认后开票或应收生成。", ["客户名称", "确认状态", "费用类型", "业务编号", "付款日期", "确认日期"], advanceColumns, advanceRows, ["查询", "重置", "发送确认", "确认通过", "退回补正"]),
  "advance.billingRequests": config("advance.billingRequests", "代垫款管理", "代垫开票", "把客户确认后的代垫生成开票申请并追踪发票状态。", ["客户名称", "开票状态", "费用类型", "业务编号", "发票号码", "开票日期"], advanceColumns, advanceRows, ["查询", "重置", "生成开票申请", "同步链票状态", "导出"]),
  "advance.invoiceQuery": config("advance.invoiceQuery", "代垫款管理", "代垫发票查询", "按开票日期、收款日期、对账编号和发票号查询代垫发票。", ["开票日期", "收款日期", "对账编号", "发票号码", "公司简称", "结算单位"], invoiceColumns, invoiceRows, ["查询", "重置", "刷新", "导出"]),
  "advance.receivableGeneration": config("advance.receivableGeneration", "代垫款管理", "代垫应收", "将代垫单按客户确认和开票策略生成应收，进入回款管理。", ["客户名称", "生成状态", "费用类型", "业务编号", "应收单号", "到期日"], advanceColumns, advanceRows, ["查询", "重置", "生成应收", "重算账期", "导出"]),
  "advance.receiptWriteOff": config("advance.receiptWriteOff", "代垫款管理", "代垫回款核销", "将银行流水与代垫应收进行自动或手工核销。", ["客户名称", "回款状态", "流水号", "应收单号", "费用类型", "业务编号"], advanceColumns, advanceRows, ["查询", "重置", "自动核销", "手工核销", "导出"]),
  "advance.overdue": config("advance.overdue", "代垫款管理", "代垫超期", "按客户、区域、费用类型和账龄管理代垫超期与催收动作。", ["客户名称", "所属区域", "费用类型", "账龄", "风险等级", "催收状态"], advanceColumns, advanceRows, ["查询", "重置", "创建催收", "减免申请", "导出"]),
  "advance.overdueRegion": config("advance.overdueRegion", "代垫款管理", "超期-区域汇总", "按区域汇总代垫超期，拆分关税、增值税、消费税、滞纳金和保证金。", ["付款日期"], reportColumns, reportRows, ["查询", "重置", "刷新", "下钻明细"]),
  "advance.overdueCustomer": config("advance.overdueCustomer", "代垫款管理", "超期-客户汇总", "按客户汇总代垫超期金额，并下钻到业务编号。", ["付款日期", "客户名称"], reportColumns, reportRows, ["查询", "重置", "刷新", "下钻明细"]),
  "advance.badDebt": config("advance.badDebt", "代垫款管理", "代垫减免/坏账", "处理代垫减免、坏账计提、核销和追回登记。", ["客户名称", "坏账状态", "费用类型", "风险等级", "核销日期"], advanceColumns, advanceRows, ["查询", "重置", "减免申请", "坏账计提", "追回登记"]),

  "receivables.workbench": config("receivables.workbench", "应收与回款", "应收工作台", "汇总应收余额、待认领流水、逾期、催收、坏账和信用风险。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "收款认领", "创建催收", "导出"]),
  "receivables.arLedger": config("receivables.arLedger", "应收与回款", "应收台账", "发票、代垫和未开票收入自动形成应收。", ["客户名称", "来源发票", "到期日", "账龄", "风险等级"], receivableColumns, receivableRows, ["查询", "重置", "创建催收", "坏账计提", "导出"]),
  "receivables.receiptClaim": config("receivables.receiptClaim", "应收与回款", "收款认领", "将银行流水按客户、金额、备注和业务编号自动推荐认领对象。", ["交易时间", "认领状态", "付款单位", "客户名称", "交易金额", "推荐置信度"], bankColumns, bankRows, ["查询", "重置", "自动认领", "手工认领", "退回待认领"]),
  "receivables.bankFlows": config("receivables.bankFlows", "应收与回款", "银行流水", "维护交易时间、认领状态、银行账号、付款单位和金额。", ["交易时间", "认领状态", "公司简称", "银行账号", "付款单位", "交易金额"], bankColumns, bankRows, ["查询", "重置", "导入流水", "自动认领", "刷新"]),
  "receivables.autoWriteOffRules": config("receivables.autoWriteOffRules", "应收与回款", "自动核销", "配置客户、金额、尾差、账期、发票和代垫的自动核销规则。", ["规则名称", "客户类型", "匹配维度", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增规则", "模拟匹配"]),
  "receivables.writeOff": config("receivables.writeOff", "应收与回款", "手工核销", "支持流水与发票/应收自动或手动核销。", ["交易时间", "认领状态", "公司简称", "银行账号", "付款单位", "交易币种", "交易金额"], bankColumns, bankRows, ["查询", "重置", "自动销账", "手工核销", "刷新"]),
  "receivables.overdue": config("receivables.overdue", "应收与回款", "逾期管理", "按账龄、客户、项目和风险等级管理催收任务。", ["客户名称", "账龄", "风险等级", "承诺付款日", "催收状态"], receivableColumns, receivableRows, ["查询", "重置", "创建催收", "法务移交", "导出"]),
  "receivables.collectionPlan": config("receivables.collectionPlan", "应收与回款", "催收计划", "配置催收责任人、频率、承诺付款日、跟进记录和升级策略。", ["客户名称", "催收状态", "责任人", "承诺付款日", "风险等级"], receivableColumns, receivableRows, ["查询", "重置", "新增催收", "记录跟进", "升级处理"]),
  "receivables.badDebt": config("receivables.badDebt", "应收与回款", "坏账计提", "坏账准备、坏账审批、计提比例和账龄策略。", ["客户名称", "坏账状态", "风险等级", "核销日期"], receivableColumns, receivableRows, ["查询", "重置", "坏账计提", "提交审批", "导出"]),
  "receivables.badDebtWriteOff": config("receivables.badDebtWriteOff", "应收与回款", "坏账核销/转回", "处理坏账核销、追回、转回、反核销和追溯链。", ["客户名称", "核销状态", "风险等级", "核销日期", "追回状态"], receivableColumns, receivableRows, ["查询", "重置", "坏账核销", "坏账转回", "追回登记"]),
  "receivables.creditLimit": config("receivables.creditLimit", "应收与回款", "客户信用", "维护客户额度、账期、冻结状态和开票/发货风险控制。", ["客户名称", "信用状态", "额度状态", "账期", "风险等级"], settingColumns, settingsRows, ["查询", "重置", "调整额度", "冻结客户", "导出"]),

  "tax.workbench": config("tax.workbench", "税务合规", "税务工作台", "汇总销项、进项、抵扣、税负、票源额度和清卡风险。", workbenchFilters, ["事项编号", "事项类型", "业务对象", "责任人", "金额", "风险等级", "状态"], workbenchRows, ["查询", "重置", "同步票源", "生成税务报表", "导出"]),
  "tax.outputTax": config("tax.outputTax", "税务合规", "销项税额", "按主体、期间、票种、税率统计销项金额和税额。", ["期间", "主体", "票种", "税率", "客户名称", "开票状态"], taxColumns, taxRows, ["查询", "重置", "导出", "下钻明细"]),
  "tax.inputTax": config("tax.inputTax", "税务合规", "进项税额", "按主体、期间、票种、税率、供应商统计进项税额。", ["期间", "主体", "票种", "税率", "供应商", "认证状态"], taxColumns, taxRows, ["查询", "重置", "导出", "下钻明细"]),
  "tax.deductionReport": config("tax.deductionReport", "税务合规", "抵扣统计", "汇总可抵扣、已抵扣、待抵扣、转出和撤销勾选数据。", ["期间", "主体", "抵扣状态", "用途确认", "票种", "税率"], taxColumns, taxRows, ["查询", "重置", "生成抵扣统计", "导出"]),
  "tax.taxBurden": config("tax.taxBurden", "税务合规", "税负分析", "按主体、业务线、区域和期间分析税负率及异常波动。", ["期间", "主体", "业务线", "区域"], taxColumns, taxRows, ["查询", "重置", "导出", "下钻"]),
  "tax.commodityCheck": config("tax.commodityCheck", "税务合规", "商品编码/税率校验", "校验商品服务编码、税率、免税标识和开票规则一致性。", ["商品编码", "商品名称", "税率", "规则状态", "异常类型"], settingColumns, settingsRows, ["查询", "重置", "批量校验", "修正规则", "导出"]),
  "tax.taxDevices": config("tax.taxDevices", "税务合规", "票源/清卡", "维护链票通道、开票限额、票源余额、离线时长和抄报清卡状态。", ["主体名称", "开票通道", "票种", "票源状态", "清卡状态", "离线状态"], settingColumns, settingsRows, ["查询", "重置", "同步票源", "额度校验", "清卡检查", "导出"]),
  "tax.digitalQuota": config("tax.digitalQuota", "税务合规", "数电票额度", "监控数电票授信额度、剩余额度、临额申请和额度异常。", ["主体名称", "票种", "额度状态", "剩余额度", "预警等级", "同步时间"], taxColumns, taxRows, ["查询", "重置", "同步额度", "额度预警", "导出"]),
  "tax.filing": config("tax.filing", "税务合规", "申报状态", "展示税控抄报、清卡、申报期状态和异常处理建议。", ["主体名称", "期间", "抄报状态", "清卡状态", "异常类型"], taxColumns, taxRows, ["查询", "重置", "清卡检查", "异常处理", "导出"]),

  "reports.grossProfit": config("reports.grossProfit", "报表中心", "项目毛利", "汇总收入、成本、代垫、应收和项目毛利。", ["区域", "客户", "项目", "期间"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.invoiceAnalysis": config("reports.invoiceAnalysis", "报表中心", "发票分析", "按票种、状态、查验、交付、红冲和作废统计。", ["票种", "发票状态", "客户", "期间"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.taxAnalysis": config("reports.taxAnalysis", "报表中心", "税务分析", "按税率、税额、进项抵扣和销项税额统计。", ["税率", "主体", "期间", "票种"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.advanceAnalysis": config("reports.advanceAnalysis", "报表中心", "代垫分析", "按区域、客户、费用类型和超期账龄汇总代垫。", ["区域", "客户", "费用类型", "付款日期"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.billingProgress": config("reports.billingProgress", "报表中心", "开票进度分析", "按客户、主体、区域和业务线分析开票申请到链票成功的进度。", ["期间", "主体", "客户", "区域", "开票状态"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.collectionProgress": config("reports.collectionProgress", "报表中心", "收票进度分析", "按供应商、票种、认证状态和成本匹配状态分析收票进度。", ["期间", "供应商", "票种", "认证状态", "匹配状态"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.deductionAnalysis": config("reports.deductionAnalysis", "报表中心", "进项抵扣分析", "分析进项认证、抵扣、转出和未抵扣原因。", ["期间", "主体", "认证状态", "用途确认"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.invoiceException": config("reports.invoiceException", "报表中心", "发票异常分析", "统计重复、查验失败、税率异常、红冲作废和接口失败。", ["期间", "异常类型", "风险等级", "主体"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.customerCollection": config("reports.customerCollection", "报表中心", "客户开票/回款分析", "按客户联查开票、应收、收款、逾期和坏账风险。", ["期间", "客户", "区域", "风险等级"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.supplierCost": config("reports.supplierCost", "报表中心", "供应商成本分析", "按供应商分析成本、进项票、预付款、暂估和应付余额。", ["期间", "供应商", "成本类型", "匹配状态"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.arAging": config("reports.arAging", "报表中心", "应收账龄分析", "按客户、区域和账龄统计应收余额、逾期金额和坏账风险。", ["期间", "客户", "账龄", "风险等级"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.apAging": config("reports.apAging", "报表中心", "应付账龄分析", "按供应商、账龄和发票状态统计应付余额。", ["期间", "供应商", "账龄", "付款状态"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.accrualBalance": config("reports.accrualBalance", "报表中心", "暂估余额分析", "按供应商、期间和项目统计暂估余额、冲回和差异。", ["期间", "供应商", "项目", "冲回状态"], reportColumns, reportRows, ["查询", "重置", "导出", "下钻"]),

  "settings.entities": config("settings.entities", "基础配置", "企业主体/开票抬头", "维护法人主体、税号、银行账号和开票抬头。", ["主体名称", "税号", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增主体", "抬头校验"], "新增主体"),
  "settings.customers": config("settings.customers", "基础配置", "客户档案", "维护客户税号、开票资料、信用额度和账期。", ["客户名称", "税号", "信用状态"], settingColumns, settingsRows, ["查询", "重置", "新增客户", "信用额度"]),
  "settings.suppliers": config("settings.suppliers", "基础配置", "供应商档案", "维护供应商开票信息和付款规则。", ["供应商名称", "税号", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增供应商", "导入"]),
  "settings.commodityCodes": config("settings.commodityCodes", "基础配置", "商品/服务编码", "维护商品服务编码、税率、规格型号和开票简称。", ["商品编码", "商品名称", "税率", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增编码", "批量导入", "校验税率"]),
  "settings.taxRules": config("settings.taxRules", "基础配置", "税率规则", "维护票种、税率、税收分类编码、红冲作废、限额和风险规则。", ["规则名称", "票种", "税率", "税收分类编码", "规则类型", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增规则", "模拟校验"]),
  "settings.taxDevices": config("settings.taxDevices", "基础配置", "税控票源", "配置链票税控通道、票源同步和额度校验参数。", ["主体名称", "开票通道", "票种", "票源状态", "清卡状态", "离线状态"], settingColumns, settingsRows, ["查询", "重置", "同步票源", "额度校验", "清卡检查", "导出"]),
  "settings.billingRules": config("settings.billingRules", "基础配置", "开票规则", "配置开票触发、税率取值、抬头校验、商品编码和红冲规则。", ["规则名称", "业务类型", "票种", "主体", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增规则", "模拟开票"]),
  "settings.approvalFlows": config("settings.approvalFlows", "基础配置", "审批流程", "配置开票、红冲、作废、坏账、调整和额度审批流程。", ["流程名称", "业务模块", "审批状态", "适用主体"], settingColumns, settingsRows, ["查询", "重置", "新增流程", "发布流程"]),
  "settings.documentNumbers": config("settings.documentNumbers", "基础配置", "单据编号", "配置开票申请、成本单、代垫单、对账单和核销单编号。", ["规则名称", "业务模块", "前缀", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增规则", "预览编号"]),
  "settings.matchingRules": config("settings.matchingRules", "基础配置", "匹配规则", "配置发票、成本、应付、收款、应收和代垫的自动匹配策略。", ["规则名称", "匹配对象", "匹配维度", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增规则", "模拟匹配"]),
  "settings.writeOffRules": config("settings.writeOffRules", "基础配置", "核销规则", "配置尾差、优先级、核销顺序、账龄和反核销规则。", ["规则名称", "核销对象", "客户类型", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增规则", "模拟核销"]),
  "settings.riskRules": config("settings.riskRules", "基础配置", "风险规则", "配置重复、黑名单、税率异常、额度、逾期和接口失败预警。", ["规则名称", "风险类型", "风险等级", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增规则", "执行巡检"]),
  "settings.businessFields": config("settings.businessFields", "基础配置", "业务字段", "参考链票扩展业务字段，配置客户邮箱、申请号、项目字段等。", ["字段名称", "业务模块", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增字段", "提取规则"]),
  "settings.invoicePools": config("settings.invoicePools", "基础配置", "业务票池", "维护部门、区域、项目和人员可访问的票池。", ["票池名称", "所属区域", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增票池", "授权"]),
  "settings.exportTemplates": config("settings.exportTemplates", "基础配置", "导出模板", "维护财务、税务和经营报表导出模板。", ["模板名称", "适用模块", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增模板", "预览"]),
  "settings.notificationTemplates": config("settings.notificationTemplates", "基础配置", "消息模板", "维护开票、交付、催收、异常和审批通知模板。", ["模板名称", "业务模块", "通知方式", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增模板", "发送测试"]),
  "settings.chainpiaoIntegration": config("settings.chainpiaoIntegration", "基础配置", "链票接口配置", "维护链票应用、接口地址、回调地址、密钥别名和重试策略。", ["接口名称", "接口类型", "主体", "状态"], settingColumns, settingsRows, ["查询", "重置", "新增接口", "连接测试", "同步配置"]),
  "settings.logs": config("settings.logs", "基础配置", "操作日志", "记录开票、红冲、作废、核销、坏账和配置变更审计。", ["操作人", "操作模块", "操作时间", "关键字"], settingColumns, settingsRows, ["查询", "重置", "导出日志", "查看详情"]),
  "settings.interfaceLogs": config("settings.interfaceLogs", "基础配置", "接口日志", "记录链票、银行、财务系统和档案接口调用日志。", ["接口类型", "业务单号", "处理状态", "错误码", "调用时间", "重试次数"], interfaceColumns, interfaceRows, ["查询", "重置", "重试失败任务", "查看接口报文", "导出"])
};

export function getActiveGroup(pageId: PageId) {
  const visibleGroup = navGroups.find((group) => group.items.some((item) => item.id === pageId));
  if (visibleGroup) return visibleGroup;

  const [namespace] = pageId.split(".");
  return navGroups.find((group) => group.id === namespace) ?? navGroups[0];
}



