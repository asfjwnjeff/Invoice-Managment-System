import {
  Archive,
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
  | "income.billingRequests"
  | "income.invoiceQuery"
  | "income.uninvoiced"
  | "income.invoiced"
  | "invoices.all"
  | "invoices.inputPool"
  | "invoices.outputPool"
  | "invoices.redOffset"
  | "invoices.void"
  | "invoices.delivery"
  | "invoices.archive"
  | "invoices.risk"
  | "invoices.chainpiao"
  | "cost.costInvoices"
  | "cost.prepaymentInvoices"
  | "cost.payableMatching"
  | "advance.register"
  | "advance.query"
  | "advance.invoiceQuery"
  | "advance.overdueRegion"
  | "advance.overdueCustomer"
  | "receivables.arLedger"
  | "receivables.bankFlows"
  | "receivables.writeOff"
  | "receivables.overdue"
  | "receivables.badDebt"
  | "reports.grossProfit"
  | "reports.invoiceAnalysis"
  | "reports.taxAnalysis"
  | "reports.advanceAnalysis"
  | "settings.entities"
  | "settings.customers"
  | "settings.suppliers"
  | "settings.taxRules"
  | "settings.taxDevices"
  | "settings.businessFields"
  | "settings.invoicePools"
  | "settings.exportTemplates"
  | "settings.logs";

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

export const navGroups: NavGroup[] = [
  {
    id: "dashboard",
    label: "工作台",
    short: "W",
    icon: Workflow,
    items: [{ id: "dashboard", label: "经营工作台", href: "/dashboard", icon: Workflow }]
  },
  {
    id: "income",
    label: "收入管理",
    short: "F",
    icon: ReceiptText,
    items: [
      { id: "income.billingRequests", label: "开票申请", href: "/income/billing-requests", icon: FileClock },
      { id: "income.invoiceQuery", label: "收入发票查询", href: "/income/invoice-query", icon: ReceiptText },
      { id: "income.uninvoiced", label: "未开票收入", href: "/income/uninvoiced", icon: FileText },
      { id: "income.invoiced", label: "已开票收入", href: "/income/invoiced", icon: FileCheck2 }
    ]
  },
  {
    id: "invoices",
    label: "发票管理",
    short: "I",
    icon: FileCog,
    items: [
      { id: "invoices.all", label: "发票汇总", href: "/invoices/all", icon: ClipboardList },
      { id: "invoices.inputPool", label: "进项发票池", href: "/invoices/input-pool", icon: FileCheck2 },
      { id: "invoices.outputPool", label: "销项发票池", href: "/invoices/output-pool", icon: ReceiptText },
      { id: "invoices.redOffset", label: "红冲管理", href: "/invoices/red-offset", icon: FileMinus2 },
      { id: "invoices.void", label: "作废管理", href: "/invoices/void", icon: ShieldAlert },
      { id: "invoices.delivery", label: "发票交付", href: "/invoices/delivery", icon: MailCheck },
      { id: "invoices.archive", label: "发票归档", href: "/invoices/archive", icon: FileArchive },
      { id: "invoices.risk", label: "风险巡检", href: "/invoices/risk", icon: ScanSearch },
      { id: "invoices.chainpiao", label: "链票流水", href: "/invoices/chainpiao", icon: PlugZap }
    ]
  },
  {
    id: "cost",
    label: "成本管理",
    short: "C",
    icon: BookOpenCheck,
    items: [
      { id: "cost.costInvoices", label: "成本发票管理", href: "/cost/cost-invoices", icon: FileCheck2 },
      { id: "cost.prepaymentInvoices", label: "预付款关联发票", href: "/cost/prepayment-invoices", icon: GitBranch },
      { id: "cost.payableMatching", label: "应付匹配", href: "/cost/payable-matching", icon: ClipboardList }
    ]
  },
  {
    id: "advance",
    label: "代垫管理",
    short: "I",
    icon: CircleDollarSign,
    items: [
      { id: "advance.register", label: "代垫登记", href: "/advance/register", icon: CircleDollarSign },
      { id: "advance.query", label: "代垫查询", href: "/advance/query", icon: ClipboardList },
      { id: "advance.invoiceQuery", label: "代垫发票查询", href: "/advance/invoice-query", icon: ReceiptText },
      { id: "advance.overdueRegion", label: "超期-区域汇总", href: "/advance/overdue-region", icon: BarChart3 },
      { id: "advance.overdueCustomer", label: "超期-客户汇总", href: "/advance/overdue-customer", icon: BarChart3 }
    ]
  },
  {
    id: "receivables",
    label: "应收销账",
    short: "R",
    icon: Landmark,
    items: [
      { id: "receivables.arLedger", label: "应收台账", href: "/receivables/ar-ledger", icon: Landmark },
      { id: "receivables.bankFlows", label: "银行流水维护", href: "/receivables/bank-flows", icon: Banknote },
      { id: "receivables.writeOff", label: "银行流水销账", href: "/receivables/write-off", icon: GitBranch },
      { id: "receivables.overdue", label: "逾期管理", href: "/receivables/overdue", icon: ShieldAlert },
      { id: "receivables.badDebt", label: "坏账管理", href: "/receivables/bad-debt", icon: FileMinus2 }
    ]
  },
  {
    id: "reports",
    label: "报表分析",
    short: "A",
    icon: BarChart3,
    items: [
      { id: "reports.grossProfit", label: "项目毛利", href: "/reports/gross-profit", icon: BarChart3 },
      { id: "reports.invoiceAnalysis", label: "发票分析", href: "/reports/invoice-analysis", icon: ReceiptText },
      { id: "reports.taxAnalysis", label: "税务分析", href: "/reports/tax-analysis", icon: FileCog },
      { id: "reports.advanceAnalysis", label: "代垫分析", href: "/reports/advance-analysis", icon: CircleDollarSign }
    ]
  },
  {
    id: "settings",
    label: "系统设置",
    short: "S",
    icon: SlidersHorizontal,
    items: [
      { id: "settings.entities", label: "企业主体/抬头", href: "/settings/entities", icon: Building2 },
      { id: "settings.customers", label: "客户档案", href: "/settings/customers", icon: Database },
      { id: "settings.suppliers", label: "供应商档案", href: "/settings/suppliers", icon: Database },
      { id: "settings.taxRules", label: "税务规则", href: "/settings/tax-rules", icon: FileCog },
      { id: "settings.taxDevices", label: "税控票源", href: "/settings/tax-devices", icon: PlugZap },
      { id: "settings.businessFields", label: "业务字段配置", href: "/settings/business-fields", icon: SlidersHorizontal },
      { id: "settings.invoicePools", label: "企业业务票池", href: "/settings/invoice-pools", icon: Archive },
      { id: "settings.exportTemplates", label: "导出模板", href: "/settings/export-templates", icon: FileText },
      { id: "settings.logs", label: "系统日志", href: "/settings/logs", icon: ClipboardList }
    ]
  }
];

export const dashboardMetrics = [
  { label: "待开票金额", value: "¥426.8万", trend: "12笔申请待处理", tone: "blue" },
  { label: "未收应收", value: "¥218.4万", trend: "3户高危逾期", tone: "amber" },
  { label: "代垫余额", value: "¥73.6万", trend: "客户确认率 86%", tone: "green" },
  { label: "坏账风险", value: "¥28.0万", trend: "2笔建议计提", tone: "red" }
];

export const dashboardTasks = [
  "F05 开票申请：3笔超过合同余额需财务复核",
  "链票回调：1笔红字发票待同步版式文件",
  "R02 银行流水销账：5笔收款可自动匹配",
  "I25 超期代垫：华东区域保证金超期金额最高",
  "C14 预付款关联发票：2笔供应商票未到"
];

const sharedDetail: PageConfig["detailSections"] = [
  {
    title: "业务关联",
    fields: [
      ["业务编号", "YW20260718021"],
      ["合同编号", "HT-HMG-2026-018"],
      ["所属区域", "华东一区"],
      ["项目经理", "陈明"]
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

const invoiceRows: RowRecord[] = [
  {
    "发票号码": "INV-202607-001",
    "票种": "数电专票",
    "开票日期": "2026-07-01",
    "票面金额": "106,000.00",
    "销售方": "上海泓明供应链有限公司",
    "购买方": "上海示例科技有限公司",
    "查验状态": "验证成功",
    "发票状态": "已开票",
    "链票状态": "成功"
  },
  {
    "发票号码": "INV-202607-002",
    "票种": "数电普票",
    "开票日期": "2026-07-18",
    "票面金额": "72,080.00",
    "销售方": "上海泓明供应链有限公司",
    "购买方": "杭州云启供应链有限公司",
    "查验状态": "验证成功",
    "发票状态": "已交付",
    "链票状态": "成功"
  },
  {
    "发票号码": "RED-202607-001",
    "票种": "红字数电票",
    "开票日期": "2026-09-15",
    "票面金额": "-31,800.00",
    "销售方": "上海泓明供应链有限公司",
    "购买方": "上海示例科技有限公司",
    "查验状态": "待同步",
    "发票状态": "部分红冲",
    "链票状态": "处理中"
  }
];

const incomeRows: RowRecord[] = [
  {
    "开票申请号": "KP202607001",
    "接单日期": "2026-07-01",
    "账单状态": "待审批",
    "客户名称": "上海示例科技有限公司",
    "业务编号": "YW20260718021",
    "所属区域": "华东一区",
    "勾选金额": "106,000.00",
    "开票状态": "待链票开具"
  },
  {
    "开票申请号": "KP202607002",
    "接单日期": "2026-07-15",
    "账单状态": "已提交",
    "客户名称": "杭州云启供应链有限公司",
    "业务编号": "YW20260715008",
    "所属区域": "华东二区",
    "勾选金额": "72,080.00",
    "开票状态": "已开票"
  },
  {
    "开票申请号": "KP202607003",
    "接单日期": "2026-07-23",
    "账单状态": "异常挂起",
    "客户名称": "北京明川咨询有限公司",
    "业务编号": "YW20260723017",
    "所属区域": "华北区",
    "勾选金额": "47,700.00",
    "开票状态": "超信用额度"
  }
];

const costRows: RowRecord[] = [
  {
    "发票号": "IN-202607-106",
    "创建日期": "2026-07-05",
    "发票日期": "2026-07-04",
    "发票状态": "已查验",
    "发票流程": "四单匹配",
    "采购方名称": "上海泓明供应链有限公司",
    "销售方名称": "深圳智造云服务有限公司",
    "票面金额": "38,160.00"
  },
  {
    "发票号": "IN-202607-122",
    "创建日期": "2026-07-16",
    "发票日期": "2026-07-15",
    "发票状态": "待认证",
    "发票流程": "三单匹配",
    "采购方名称": "上海泓明供应链有限公司",
    "销售方名称": "上海数据标注服务中心",
    "票面金额": "13,568.00"
  }
];

const advanceRows: RowRecord[] = [
  {
    "业务编号": "DD202607011",
    "创建日期": "2026-07-04",
    "付款日期": "2026-07-05",
    "代垫状态": "部分回款",
    "所属区域": "华东一区",
    "客户名称": "上海示例科技有限公司",
    "结算单位": "上海泓明供应链",
    "费用类型": "保证金",
    "垫付金额": "18,500.00"
  },
  {
    "业务编号": "DD202607019",
    "创建日期": "2026-07-14",
    "付款日期": "2026-07-14",
    "代垫状态": "待确认",
    "所属区域": "华北区",
    "客户名称": "北京明川咨询有限公司",
    "结算单位": "北京明川咨询",
    "费用类型": "关税",
    "垫付金额": "6,200.00"
  },
  {
    "业务编号": "DD202606025",
    "创建日期": "2026-06-20",
    "付款日期": "2026-06-21",
    "代垫状态": "超期",
    "所属区域": "华南区",
    "客户名称": "广州海贸物流有限公司",
    "结算单位": "广州海贸物流",
    "费用类型": "增值税",
    "垫付金额": "48,900.00"
  }
];

const receivableRows: RowRecord[] = [
  {
    "应收单号": "AR-INV-202607-001",
    "客户名称": "上海示例科技有限公司",
    "来源发票": "INV-202607-001",
    "到期日": "2026-07-31",
    "账龄": "31-60天",
    "未收金额": "106,000.00",
    "风险等级": "高危",
    "销账状态": "未销账"
  },
  {
    "应收单号": "AR-INV-202607-002",
    "客户名称": "杭州云启供应链有限公司",
    "来源发票": "INV-202607-002",
    "到期日": "2026-08-17",
    "账龄": "1-30天",
    "未收金额": "42,080.00",
    "风险等级": "关注",
    "销账状态": "部分销账"
  }
];

const bankRows: RowRecord[] = [
  {
    "流水号": "BK20260706001",
    "交易时间": "2026-07-06",
    "认领状态": "待认领",
    "公司简称": "泓明供应链",
    "银行账号": "6222 **** 0918",
    "付款单位": "上海示例科技有限公司",
    "交易币种": "CNY",
    "交易金额": "50,000.00"
  },
  {
    "流水号": "BK20260706002",
    "交易时间": "2026-07-06",
    "认领状态": "已匹配",
    "公司简称": "泓明供应链",
    "银行账号": "6222 **** 0918",
    "付款单位": "杭州云启供应链有限公司",
    "交易币种": "CNY",
    "交易金额": "30,000.00"
  }
];

const reportRows: RowRecord[] = [
  { "维度": "华东一区", "收入": "1,286,000.00", "成本": "842,000.00", "代垫余额": "186,000.00", "毛利率": "34.5%" },
  { "维度": "华北区", "收入": "684,000.00", "成本": "492,000.00", "代垫余额": "82,000.00", "毛利率": "28.1%" },
  { "维度": "华南区", "收入": "936,000.00", "成本": "604,000.00", "代垫余额": "138,000.00", "毛利率": "35.5%" }
];

const settingsRows: RowRecord[] = [
  { "名称": "上海泓明供应链有限公司", "类型": "销售方主体", "税号": "91310000733363087X", "状态": "启用", "最近更新": "2026-07-01" },
  { "名称": "华东默认票池", "类型": "业务票池", "税号": "-", "状态": "启用", "最近更新": "2026-06-28" },
  { "名称": "链票标准字段模板", "类型": "导出模板", "税号": "-", "状态": "启用", "最近更新": "2026-06-25" }
];

function config(
  id: PageId,
  module: string,
  title: string,
  description: string,
  filters: string[],
  columns: string[],
  rows: RowRecord[],
  secondaryActions: string[] = ["查询", "重置", "刷新"],
  primaryAction?: string
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
    workflow: ["业务单据", "规则校验", "审批/匹配", "链票/财务处理", "归档与报表"]
  };
}

const searchActionNames = new Set(["查询", "重置", "刷新", "流水号查询", "发票号查询", "业务编号查询", "单号查"]);

export function getSearchActions(config: PageConfig) {
  return unique(config.secondaryActions.filter((action) => searchActionNames.has(action)));
}

export function getToolbarActions(config: PageConfig) {
  return unique(config.secondaryActions.filter((action) => !searchActionNames.has(action) && action !== "展开更多搜索条件"));
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

export const pageConfigs: Record<PageId, PageConfig> = {
  dashboard: config("dashboard", "工作台", "经营工作台", "汇总收入、成本、代垫、应收和链票接口待办。", [], [], []),
  "income.billingRequests": config("income.billingRequests", "收入管理", "开票申请", "参考 HMG F05，展示账单到开票申请的处理池。", ["接单日期", "账单状态", "客户名称", "业务编号", "所属区域", "开票申请号", "提交批号", "勾选金额"], ["开票申请号", "接单日期", "账单状态", "客户名称", "业务编号", "所属区域", "勾选金额", "开票状态"], incomeRows, ["查询", "重置", "流水号查询", "批量提交", "刷新"], "新增开票申请"),
  "income.invoiceQuery": config("income.invoiceQuery", "收入管理", "收入发票查询", "参考 HMG F12，按开票日期、发票状态、税号、抬头和发票号追溯。", ["开票日期", "发票状态", "出票单位", "发票税号", "发票抬头", "开票申请号", "发票号码", "凭证状态"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "发票号查询", "业务编号查询", "导出"]),
  "income.uninvoiced": config("income.uninvoiced", "收入管理", "未开票收入", "沉淀已确认收入但尚未开票的账单池。", ["接单日期", "客户名称", "区域名称", "业务编号"], ["开票申请号", "接单日期", "客户名称", "业务编号", "所属区域", "勾选金额", "开票状态"], incomeRows.filter((row) => row["开票状态"] !== "已开票"), ["查询", "重置", "流水号查询", "生成申请"]),
  "income.invoiced": config("income.invoiced", "收入管理", "已开票收入", "按业务单追踪已开票收入、凭证与归档状态。", ["接单日期", "客户名称", "区域名称", "业务编号"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows.filter((row) => row["发票状态"] !== "部分红冲"), ["查询", "重置", "流水号查询", "归档检查"]),
  "invoices.all": config("invoices.all", "发票管理", "发票汇总", "统一展示进项、销项、红字、作废、交付、归档和接口状态。", ["发票号码", "票种", "查验状态", "录入方式", "抬头校验状态", "所属票池", "发票类别", "使用状态", "交付方式", "交付状态", "链票状态", "认证状态", "归档状态", "风险标签", "开票日期", "录入时间"], ["发票号码", "票种", "开票日期", "票面金额", "销售方", "购买方", "查验状态", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "批量维护", "批量查验", "抬头校验", "导出", "列设置"], "添加发票"),
  "invoices.inputPool": config("invoices.inputPool", "发票管理", "进项发票池", "进项票采集、查验、认证、匹配和成本归集。", ["发票号码", "票种", "查验状态", "认证状态", "匹配状态", "录入方式", "销售方名称", "购买方名称", "所属票池", "发票日期", "入账期间"], ["发票号", "创建日期", "发票日期", "发票状态", "发票流程", "采购方名称", "销售方名称", "票面金额"], costRows, ["查询", "重置", "批量查验", "认证勾选", "成本匹配", "导出"]),
  "invoices.outputPool": config("invoices.outputPool", "发票管理", "销项发票池", "蓝字开具、红冲作废、交付任务和应收关联的销项票池。", ["发票号码", "票种", "发票状态", "交付方式", "交付状态", "链票状态", "购买方名称", "客户税号", "开票申请号", "业务编号", "开票日期", "应收状态"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "提交交付任务", "重发交付", "同步链票状态", "导出"]),
  "invoices.redOffset": config("invoices.redOffset", "发票管理", "红冲管理", "集中处理全额红冲、部分红冲和红冲后重开。", ["原发票号", "红冲状态", "申请日期", "客户名称", "红冲原因"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "发起红冲", "红冲后重开", "导出"]),
  "invoices.void": config("invoices.void", "发票管理", "作废管理", "对不同票种和状态进行作废校验；数电票默认引导红冲。", ["发票号码", "票种", "开票日期", "作废状态", "客户名称"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "作废校验", "转红冲", "导出"]),
  "invoices.delivery": config("invoices.delivery", "发票管理", "发票交付", "按交付任务统一管理客户邮箱、平台消息、第三方推送和回执记录。", ["任务编号", "发票号码", "客户名称", "交付方式", "交付状态", "回执状态", "收件人", "开票日期", "最近交付时间"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "新建交付任务", "重发交付", "查看交付记录", "导出"]),
  "invoices.archive": config("invoices.archive", "发票管理", "发票归档", "管理 OFD、PDF、XML、影像附件、验签结果和会计档案归档状态。", ["发票号码", "票种", "归档状态", "验签状态", "版式文件", "XML文件", "会计期间", "归档时间"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "归档校验", "下载版式文件", "生成档案包", "导出"]),
  "invoices.risk": config("invoices.risk", "发票管理", "风险巡检", "巡检重复开票、抬头税号异常、红冲作废变更、查验失败和高风险客户。", ["风险类型", "风险等级", "发票号码", "客户名称", "查验状态", "红冲作废状态", "巡检时间"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "查验状态", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "执行巡检", "生成处理单", "加入白名单", "导出"]),
  "invoices.chainpiao": config("invoices.chainpiao", "发票管理", "链票流水", "封装链票蓝字开票、红冲、作废、查询、下载和回调。", ["接口类型", "业务单号", "链票流水号", "处理状态", "调用时间", "错误码", "重试次数"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "同步链票状态", "重试失败任务", "查看接口报文", "异常补偿"]),
  "cost.costInvoices": config("cost.costInvoices", "成本管理", "成本发票管理", "参考 HMG C51，管理采购方/销售方、发票状态和成本流程。", ["创建日期", "发票日期", "发票状态", "发票流程", "发票号", "采购方名称", "销售方名称"], ["发票号", "创建日期", "发票日期", "发票状态", "发票流程", "采购方名称", "销售方名称", "票面金额"], costRows, ["查询", "重置", "流水号查询", "关联成本", "导出"]),
  "cost.prepaymentInvoices": config("cost.prepaymentInvoices", "成本管理", "预付款关联发票", "参考 HMG C14，将供应商预付款与到票进行关联核销。", ["供应商", "预付款金额", "发票金额"], ["发票号", "创建日期", "发票日期", "发票状态", "发票流程", "销售方名称", "票面金额"], costRows, ["查询", "重置", "自动匹配", "手工关联", "刷新"]),
  "cost.payableMatching": config("cost.payableMatching", "成本管理", "应付匹配", "合同、验收、发票、付款三单/四单匹配。", ["供应商", "合同编号", "发票状态", "付款状态", "差异状态"], ["发票号", "创建日期", "发票状态", "发票流程", "销售方名称", "票面金额"], costRows, ["查询", "重置", "三单匹配", "四单匹配", "差异处理"]),
  "advance.register": config("advance.register", "代垫管理", "代垫登记", "登记员工、供应商或项目代垫，并设置客户确认与开票策略。", ["创建日期", "客户名称", "费用类型", "业务编号", "报关单号"], ["业务编号", "创建日期", "付款日期", "代垫状态", "所属区域", "客户名称", "费用类型", "垫付金额"], advanceRows, ["查询", "重置", "新增代垫", "提交确认"], "新增代垫"),
  "advance.query": config("advance.query", "代垫管理", "代垫查询", "参考 HMG I11，查询创建/付款日期、状态、区域、客户、供应商和费用类型。", ["创建日期", "付款日期", "代垫状态", "所属区域", "公司简称", "客户名称", "结算单位", "供应商", "费用类型", "业务编号", "报关单号", "凭证状态", "垫付金额"], ["业务编号", "创建日期", "付款日期", "代垫状态", "所属区域", "客户名称", "结算单位", "费用类型", "垫付金额"], advanceRows, ["查询", "重置", "单号查", "生成应收", "刷新"]),
  "advance.invoiceQuery": config("advance.invoiceQuery", "代垫管理", "代垫发票查询", "参考 HMG I12，按开票日期、收款日期、对账编号和发票号查询。", ["开票日期", "收款日期", "对账编号", "发票号码", "公司简称", "结算单位"], ["发票号码", "票种", "开票日期", "票面金额", "购买方", "发票状态", "链票状态"], invoiceRows, ["查询", "重置", "刷新", "导出"]),
  "advance.overdueRegion": config("advance.overdueRegion", "代垫管理", "超期-区域汇总", "按区域汇总代垫超期，拆分关税、增值税、消费税、滞纳金和保证金。", ["付款日期"], ["维度", "收入", "成本", "代垫余额", "毛利率"], reportRows, ["查询", "重置", "刷新", "下钻明细"]),
  "advance.overdueCustomer": config("advance.overdueCustomer", "代垫管理", "超期-客户汇总", "按客户汇总代垫超期金额，并下钻到业务编号。", ["付款日期", "客户名称"], ["维度", "收入", "成本", "代垫余额", "毛利率"], reportRows, ["查询", "重置", "刷新", "下钻明细"]),
  "receivables.arLedger": config("receivables.arLedger", "应收销账", "应收台账", "发票、代垫和未开票收入自动形成应收。", ["客户名称", "来源发票", "到期日", "账龄", "风险等级"], ["应收单号", "客户名称", "来源发票", "到期日", "账龄", "未收金额", "风险等级", "销账状态"], receivableRows, ["查询", "重置", "创建催收", "坏账计提", "导出"]),
  "receivables.bankFlows": config("receivables.bankFlows", "应收销账", "银行流水维护", "参考 HMG R01，维护交易时间、认领状态、银行账号、付款单位和金额。", ["交易时间", "认领状态", "公司简称", "银行账号", "付款单位", "交易金额"], ["流水号", "交易时间", "认领状态", "公司简称", "银行账号", "付款单位", "交易币种", "交易金额"], bankRows, ["查询", "重置", "导入流水", "自动认领", "刷新"]),
  "receivables.writeOff": config("receivables.writeOff", "应收销账", "银行流水销账", "参考 HMG R02，支持流水与发票/应收自动或手动核销。", ["交易时间", "认领状态", "公司简称", "银行账号", "付款单位", "交易币种", "交易金额"], ["流水号", "交易时间", "认领状态", "公司简称", "付款单位", "交易金额"], bankRows, ["查询", "重置", "自动销账", "手工销账", "刷新"]),
  "receivables.overdue": config("receivables.overdue", "应收销账", "逾期管理", "按账龄、客户、项目和风险等级管理催收任务。", ["客户名称", "账龄", "风险等级", "承诺付款日", "催收状态"], ["应收单号", "客户名称", "来源发票", "到期日", "账龄", "未收金额", "风险等级", "销账状态"], receivableRows, ["查询", "重置", "创建催收", "法务移交", "导出"]),
  "receivables.badDebt": config("receivables.badDebt", "应收销账", "坏账管理", "坏账准备、坏账审批、核销、追回和反核销。", ["客户名称", "坏账状态", "风险等级", "核销日期"], ["应收单号", "客户名称", "来源发票", "到期日", "账龄", "未收金额", "风险等级", "销账状态"], receivableRows, ["查询", "重置", "坏账计提", "坏账核销", "追回登记"]),
  "reports.grossProfit": config("reports.grossProfit", "报表分析", "项目毛利", "汇总收入、成本、代垫、应收和项目毛利。", ["区域", "客户", "项目", "期间"], ["维度", "收入", "成本", "代垫余额", "毛利率"], reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.invoiceAnalysis": config("reports.invoiceAnalysis", "报表分析", "发票分析", "按票种、状态、查验、交付、红冲和作废统计。", ["票种", "发票状态", "客户", "期间"], ["维度", "收入", "成本", "代垫余额", "毛利率"], reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.taxAnalysis": config("reports.taxAnalysis", "报表分析", "税务分析", "按税率、税额、进项抵扣和销项税额统计。", ["税率", "主体", "期间", "票种"], ["维度", "收入", "成本", "代垫余额", "毛利率"], reportRows, ["查询", "重置", "导出", "下钻"]),
  "reports.advanceAnalysis": config("reports.advanceAnalysis", "报表分析", "代垫分析", "按区域、客户、费用类型和超期账龄汇总代垫。", ["区域", "客户", "费用类型", "付款日期"], ["维度", "收入", "成本", "代垫余额", "毛利率"], reportRows, ["查询", "重置", "导出", "下钻"]),
  "settings.entities": config("settings.entities", "系统设置", "企业主体/抬头", "维护法人主体、税号、银行账号和开票抬头。", ["主体名称", "税号", "状态"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "新增主体", "抬头校验"], "新增主体"),
  "settings.customers": config("settings.customers", "系统设置", "客户档案", "维护客户税号、开票资料、信用额度和账期。", ["客户名称", "税号", "信用状态"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "新增客户", "信用额度"]),
  "settings.suppliers": config("settings.suppliers", "系统设置", "供应商档案", "维护供应商开票信息和付款规则。", ["供应商名称", "税号", "状态"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "新增供应商", "导入"]),
  "settings.taxRules": config("settings.taxRules", "系统设置", "税务规则", "维护票种、税率、税收分类编码、红冲作废、限额和风险规则。", ["规则名称", "票种", "税率", "税收分类编码", "规则类型", "状态"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "新增规则", "模拟校验"]),
  "settings.taxDevices": config("settings.taxDevices", "系统设置", "税控票源", "维护链票通道、开票限额、票源余额、离线时长和抄报清卡状态。", ["主体名称", "开票通道", "票种", "票源状态", "清卡状态", "离线状态"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "同步票源", "额度校验", "清卡检查", "导出"]),
  "settings.businessFields": config("settings.businessFields", "系统设置", "业务字段配置", "参考链票扩展业务字段，配置客户邮箱、申请号、项目字段等。", ["字段名称", "业务模块", "状态"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "新增字段", "提取规则"]),
  "settings.invoicePools": config("settings.invoicePools", "系统设置", "企业业务票池", "维护部门、区域、项目和人员可访问的票池。", ["票池名称", "所属区域", "状态"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "新增票池", "授权"]),
  "settings.exportTemplates": config("settings.exportTemplates", "系统设置", "导出模板", "维护财务、税务和经营报表导出模板。", ["模板名称", "适用模块", "状态"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "新增模板", "预览"]),
  "settings.logs": config("settings.logs", "系统设置", "系统日志", "记录开票、红冲、作废、核销、坏账和接口调用审计。", ["操作人", "操作模块", "操作时间", "关键字"], ["名称", "类型", "税号", "状态", "最近更新"], settingsRows, ["查询", "重置", "导出日志", "查看详情"])
};

export function getActiveGroup(pageId: PageId) {
  return navGroups.find((group) => group.items.some((item) => item.id === pageId)) ?? navGroups[0];
}
