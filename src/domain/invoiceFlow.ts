import type { BadDebtWriteOff, Invoice, Receivable } from "./types";

export interface InvoiceActionPolicy {
  canVoid: boolean;
  canRedOffset: boolean;
  recommendedAction: "作废" | "红冲" | "无需处理";
  reason: string;
}

export interface RedOffsetInput {
  mode: "全额红冲" | "部分红冲";
  amount: number;
  reason: string;
}

export interface ReceivableRisk {
  overdueDays: number;
  bucket: "未逾期" | "1-30天" | "31-60天" | "61-90天" | "90天以上";
  level: "正常" | "关注" | "预警" | "高危" | "冻结";
}

export function createReceivableFromInvoice(_invoice: Invoice): Receivable {
  return {
    id: `AR-${_invoice.id}`,
    customerId: _invoice.customerId,
    customerName: _invoice.customerName,
    projectName: _invoice.projectName,
    sourceInvoiceId: _invoice.id,
    originalAmount: roundMoney(_invoice.totalAmount),
    openAmount: roundMoney(_invoice.totalAmount - _invoice.paidAmount),
    paidAmount: roundMoney(_invoice.paidAmount),
    dueDate: _invoice.dueDate,
    status: _invoice.paidAmount > 0 ? "部分收款" : "未收款"
  };
}

export function getInvoiceActionPolicy(_invoice: Invoice): InvoiceActionPolicy {
  const isIssued = ["已开票", "已交付", "部分红冲"].includes(_invoice.status);
  const isDigital = _invoice.type.startsWith("数电");

  if (!isIssued) {
    return {
      canVoid: true,
      canRedOffset: false,
      recommendedAction: "作废",
      reason: "未进入稳定开票状态，可按票种规则申请作废。"
    };
  }

  if (isDigital) {
    return {
      canVoid: false,
      canRedOffset: true,
      recommendedAction: "红冲",
      reason: "数电票开具后优先走红字更正，作废能力按税局和通道规则受限。"
    };
  }

  return {
    canVoid: true,
    canRedOffset: true,
    recommendedAction: "红冲",
    reason: "已开具发票建议优先红冲，纸票作废需满足当期、未交付等条件。"
  };
}

export function offsetInvoice(
  _invoice: Invoice,
  _input: RedOffsetInput
): { original: Invoice; redInvoice: Invoice } {
  if (_input.amount <= 0) {
    throw new Error("红冲金额必须大于 0");
  }
  if (_input.amount > _invoice.amount) {
    throw new Error("红冲金额不能超过原发票未税金额");
  }

  const ratio = _input.amount / _invoice.amount;
  const redTaxAmount = roundMoney(_invoice.taxAmount * ratio);
  const redTotalAmount = roundMoney(_input.amount + redTaxAmount);
  const isFull = _input.mode === "全额红冲" || _input.amount === _invoice.amount;

  const redInvoice: Invoice = {
    ..._invoice,
    id: `RED-${_invoice.id}-${Date.now().toString().slice(-5)}`,
    status: "已红冲",
    amount: -roundMoney(_input.amount),
    taxAmount: -redTaxAmount,
    totalAmount: -redTotalAmount,
    paidAmount: 0,
    originalInvoiceId: _invoice.id,
    channelSerialNo: `${_invoice.channelSerialNo}-RED`,
    lines: _invoice.lines.map((line) => ({
      ...line,
      amount: -roundMoney(line.amount * ratio),
      taxAmount: -roundMoney(line.taxAmount * ratio)
    }))
  };

  return {
    original: {
      ..._invoice,
      status: isFull ? "全额红冲" : "部分红冲"
    },
    redInvoice
  };
}

export function getReceivableRisk(
  _receivable: Receivable,
  _asOfDate: string
): ReceivableRisk {
  if (_receivable.openAmount <= 0) {
    return { overdueDays: 0, bucket: "未逾期", level: "正常" };
  }

  const overdueDays = Math.max(
    0,
    daysBetween(parseDate(_receivable.dueDate), parseDate(_asOfDate))
  );

  if (overdueDays === 0) return { overdueDays, bucket: "未逾期", level: "正常" };
  if (overdueDays <= 30) return { overdueDays, bucket: "1-30天", level: "关注" };
  if (overdueDays <= 60) return { overdueDays, bucket: "31-60天", level: "高危" };
  if (overdueDays <= 90) return { overdueDays, bucket: "61-90天", level: "高危" };
  return { overdueDays, bucket: "90天以上", level: "冻结" };
}

export function settleReceivable(
  _receivable: Receivable,
  _amount: number,
  _paymentDate: string
): Receivable {
  if (_amount <= 0) {
    throw new Error("核销金额必须大于 0");
  }
  const paidAmount = roundMoney(_receivable.paidAmount + _amount);
  const openAmount = roundMoney(Math.max(0, _receivable.openAmount - _amount));

  return {
    ..._receivable,
    paidAmount,
    openAmount,
    status: openAmount === 0 ? "已核销" : "部分收款"
  };
}

export function writeOffBadDebt(
  _receivable: Receivable,
  _amount: number,
  _reason: string,
  _writeOffDate: string
): { receivable: Receivable; writeOff: BadDebtWriteOff } {
  if (_amount <= 0) {
    throw new Error("坏账核销金额必须大于 0");
  }
  if (_amount > _receivable.openAmount) {
    throw new Error("坏账核销金额不能超过未收余额");
  }

  const openAmount = roundMoney(_receivable.openAmount - _amount);
  const writeOff: BadDebtWriteOff = {
    id: `BD-${_receivable.id}`,
    sourceReceivableId: _receivable.id,
    amount: roundMoney(_amount),
    reason: _reason,
    writeOffDate: _writeOffDate
  };

  return {
    receivable: {
      ..._receivable,
      openAmount,
      status: openAmount === 0 ? "已坏账核销" : "坏账计提"
    },
    writeOff
  };
}

function parseDate(value: string): Date {
  return new Date(`${value}T00:00:00+08:00`);
}

function daysBetween(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((end.getTime() - start.getTime()) / msPerDay);
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
