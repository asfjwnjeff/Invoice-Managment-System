import { describe, expect, it } from "vitest";
import {
  createReceivableFromInvoice,
  getInvoiceActionPolicy,
  getReceivableRisk,
  offsetInvoice,
  settleReceivable,
  writeOffBadDebt
} from "./invoiceFlow";
import type { Invoice, Receivable } from "./types";

const baseInvoice: Invoice = {
  id: "INV-001",
  applicationId: "APP-001",
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
      id: "LINE-001",
      name: "软件开发服务",
      taxCode: "3040201",
      quantity: 1,
      unitPrice: 100000,
      taxRate: 0.06,
      amount: 100000,
      taxAmount: 6000
    }
  ]
};

describe("invoice and receivable workflow", () => {
  it("creates a receivable from an issued output invoice", () => {
    const receivable = createReceivableFromInvoice(baseInvoice);

    expect(receivable.sourceInvoiceId).toBe("INV-001");
    expect(receivable.originalAmount).toBe(106000);
    expect(receivable.openAmount).toBe(106000);
    expect(receivable.status).toBe("未收款");
    expect(receivable.dueDate).toBe("2026-07-31");
  });

  it("blocks voiding issued digital invoices and recommends red offset instead", () => {
    const policy = getInvoiceActionPolicy(baseInvoice);

    expect(policy.canVoid).toBe(false);
    expect(policy.canRedOffset).toBe(true);
    expect(policy.recommendedAction).toBe("红冲");
  });

  it("supports partial red offset without losing the original invoice relationship", () => {
    const result = offsetInvoice(baseInvoice, {
      mode: "部分红冲",
      amount: 30000,
      reason: "客户阶段验收金额调整"
    });

    expect(result.original.status).toBe("部分红冲");
    expect(result.redInvoice.originalInvoiceId).toBe("INV-001");
    expect(result.redInvoice.totalAmount).toBe(-31800);
    expect(result.redInvoice.status).toBe("已红冲");
  });

  it("calculates overdue level from due date and open amount", () => {
    const receivable = createReceivableFromInvoice(baseInvoice);
    const risk = getReceivableRisk(receivable, "2026-09-15");

    expect(risk.overdueDays).toBe(46);
    expect(risk.bucket).toBe("31-60天");
    expect(risk.level).toBe("高危");
  });

  it("settles receivables incrementally and closes only when fully paid", () => {
    const receivable = createReceivableFromInvoice(baseInvoice);

    const firstPayment = settleReceivable(receivable, 56000, "2026-08-05");
    expect(firstPayment.openAmount).toBe(50000);
    expect(firstPayment.status).toBe("部分收款");

    const finalPayment = settleReceivable(firstPayment, 50000, "2026-08-20");
    expect(finalPayment.openAmount).toBe(0);
    expect(finalPayment.status).toBe("已核销");
  });

  it("writes off bad debt without deleting the receivable trail", () => {
    const receivable: Receivable = {
      ...createReceivableFromInvoice(baseInvoice),
      openAmount: 80000,
      status: "逾期"
    };

    const result = writeOffBadDebt(receivable, 80000, "客户破产清算", "2026-10-10");

    expect(result.receivable.status).toBe("已坏账核销");
    expect(result.receivable.openAmount).toBe(0);
    expect(result.writeOff.sourceReceivableId).toBe(receivable.id);
    expect(result.writeOff.reason).toBe("客户破产清算");
  });
});
