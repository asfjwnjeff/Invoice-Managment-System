import type { Invoice, Receivable } from "../domain/types";
import { createReceivableFromInvoice } from "../domain/invoiceFlow";

export interface InputInvoice {
  id: string;
  supplierName: string;
  projectName: string;
  source: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: "待查验" | "已查验" | "待匹配" | "已匹配" | "待认证" | "已入账";
  matchLevel: "未匹配" | "三单匹配" | "四单匹配" | "人工确认";
  risk: "正常" | "关注" | "异常";
}

export interface AdvanceItem {
  id: string;
  projectName: string;
  customerName: string;
  owner: string;
  amount: number;
  confirmedAmount: number;
  invoicingPolicy: "需要开票" | "无需开票" | "待确认";
  collectedAmount: number;
  status: "待确认" | "客户已确认" | "待回款" | "部分回款" | "已核销" | "争议中";
}

export interface ChannelLog {
  id: string;
  time: string;
  action: string;
  target: string;
  status: "成功" | "处理中" | "失败" | "拦截";
  message: string;
}

export const demoToday = "2026-09-15";

export const initialInvoices: Invoice[] = [
  {
    id: "INV-202607-001",
    applicationId: "APP-202607-001",
    customerId: "CUST-001",
    customerName: "上海示例科技有限公司",
    projectName: "业财一体化一期",
    category: "收入",
    type: "数电专票",
    status: "已开票",
    issueDate: "2026-07-01",
    dueDate: "2026-07-31",
    amount: 100000,
    taxAmount: 6000,
    totalAmount: 106000,
    paidAmount: 0,
    channelSerialNo: "LP-20260701-001",
    lines: [
      {
        id: "L-001",
        name: "软件开发服务",
        taxCode: "3040201",
        quantity: 1,
        unitPrice: 100000,
        taxRate: 0.06,
        amount: 100000,
        taxAmount: 6000
      }
    ]
  },
  {
    id: "INV-202607-002",
    applicationId: "APP-202607-002",
    customerId: "CUST-002",
    customerName: "杭州云启供应链有限公司",
    projectName: "供应链对账平台",
    category: "收入",
    type: "数电普票",
    status: "已交付",
    issueDate: "2026-07-18",
    dueDate: "2026-08-17",
    amount: 68000,
    taxAmount: 4080,
    totalAmount: 72080,
    paidAmount: 30000,
    channelSerialNo: "LP-20260718-014",
    lines: [
      {
        id: "L-002",
        name: "平台运维服务",
        taxCode: "3040203",
        quantity: 4,
        unitPrice: 17000,
        taxRate: 0.06,
        amount: 68000,
        taxAmount: 4080
      }
    ]
  },
  {
    id: "INV-202607-003",
    applicationId: "APP-202607-003",
    customerId: "CUST-003",
    customerName: "北京明川咨询有限公司",
    projectName: "税务数据治理",
    category: "收入",
    type: "数电专票",
    status: "待审批",
    issueDate: "2026-07-25",
    dueDate: "2026-09-10",
    amount: 45000,
    taxAmount: 2700,
    totalAmount: 47700,
    paidAmount: 0,
    channelSerialNo: "",
    lines: [
      {
        id: "L-003",
        name: "数据治理服务",
        taxCode: "3040201",
        quantity: 1,
        unitPrice: 45000,
        taxRate: 0.06,
        amount: 45000,
        taxAmount: 2700
      }
    ]
  }
];

export const initialReceivables: Receivable[] = initialInvoices
  .filter((invoice) => ["已开票", "已交付"].includes(invoice.status))
  .map(createReceivableFromInvoice);

export const inputInvoices: InputInvoice[] = [
  {
    id: "IN-202607-106",
    supplierName: "深圳智造云服务有限公司",
    projectName: "业财一体化一期",
    source: "供应商门户",
    amount: 36000,
    taxAmount: 2160,
    totalAmount: 38160,
    status: "已匹配",
    matchLevel: "四单匹配",
    risk: "正常"
  },
  {
    id: "IN-202607-122",
    supplierName: "上海数据标注服务中心",
    projectName: "税务数据治理",
    source: "邮箱采集",
    amount: 12800,
    taxAmount: 768,
    totalAmount: 13568,
    status: "待认证",
    matchLevel: "三单匹配",
    risk: "关注"
  },
  {
    id: "IN-202607-131",
    supplierName: "杭州云测技术有限公司",
    projectName: "供应链对账平台",
    source: "手工上传",
    amount: 9800,
    taxAmount: 588,
    totalAmount: 10388,
    status: "待匹配",
    matchLevel: "未匹配",
    risk: "异常"
  }
];

export const advances: AdvanceItem[] = [
  {
    id: "ADV-202607-011",
    projectName: "业财一体化一期",
    customerName: "上海示例科技有限公司",
    owner: "项目经理",
    amount: 18500,
    confirmedAmount: 18500,
    invoicingPolicy: "需要开票",
    collectedAmount: 10000,
    status: "部分回款"
  },
  {
    id: "ADV-202607-019",
    projectName: "税务数据治理",
    customerName: "北京明川咨询有限公司",
    owner: "实施顾问",
    amount: 6200,
    confirmedAmount: 0,
    invoicingPolicy: "待确认",
    collectedAmount: 0,
    status: "待确认"
  },
  {
    id: "ADV-202607-024",
    projectName: "供应链对账平台",
    customerName: "杭州云启供应链有限公司",
    owner: "交付负责人",
    amount: 4300,
    confirmedAmount: 4300,
    invoicingPolicy: "无需开票",
    collectedAmount: 4300,
    status: "已核销"
  }
];

export const initialChannelLogs: ChannelLog[] = [
  {
    id: "LOG-001",
    time: "10:02",
    action: "蓝字开票",
    target: "INV-202607-001",
    status: "成功",
    message: "链票返回发票号码与版式文件，已生成应收。"
  },
  {
    id: "LOG-002",
    time: "10:05",
    action: "状态回调",
    target: "INV-202607-002",
    status: "成功",
    message: "已交付客户邮箱，回写交付状态。"
  },
  {
    id: "LOG-003",
    time: "10:08",
    action: "作废校验",
    target: "INV-202607-001",
    status: "拦截",
    message: "数电票已开具，系统建议走红冲流程。"
  }
];

export const modules = [
  "经营工作台",
  "发票中心",
  "客户结算",
  "供应商结算",
  "代垫款管理",
  "应收与回款",
  "税务合规",
  "报表中心",
  "基础配置",
  "链票适配",
  "电子档案",
  "规则风控"
];
