export type InvoiceCategory = "收入" | "成本" | "代垫";
export type InvoiceType = "数电专票" | "数电普票" | "纸质专票" | "纸质普票";
export type InvoiceStatus =
  | "草稿"
  | "待审批"
  | "已审批"
  | "开票中"
  | "已开票"
  | "已交付"
  | "部分红冲"
  | "全额红冲"
  | "已红冲"
  | "作废中"
  | "已作废"
  | "开票失败";

export type ReceivableStatus =
  | "未收款"
  | "部分收款"
  | "已核销"
  | "逾期"
  | "坏账计提"
  | "已坏账核销";

export interface InvoiceLine {
  id: string;
  name: string;
  taxCode: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
  taxAmount: number;
}

export interface Invoice {
  id: string;
  applicationId: string;
  customerId: string;
  customerName: string;
  projectName: string;
  category: InvoiceCategory;
  type: InvoiceType;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  channelSerialNo: string;
  originalInvoiceId?: string;
  lines: InvoiceLine[];
}

export interface Receivable {
  id: string;
  customerId: string;
  customerName: string;
  projectName: string;
  sourceInvoiceId: string;
  originalAmount: number;
  openAmount: number;
  paidAmount: number;
  dueDate: string;
  status: ReceivableStatus;
}

export interface BadDebtWriteOff {
  id: string;
  sourceReceivableId: string;
  amount: number;
  reason: string;
  writeOffDate: string;
}
