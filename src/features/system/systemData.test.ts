import { describe, expect, test } from "vitest";
import { getDetailActions, getSearchActions, getToolbarActions, navGroups, pageConfigs } from "./systemData";

describe("system page configuration", () => {
  test("uses semiconductor supply-chain service data across core modules", () => {
    const serializedRows = Object.values(pageConfigs)
      .flatMap((config) => config.rows)
      .map((row) => Object.values(row).join(" "))
      .join(" ");

    expect(serializedRows).toContain("华芯微电子");
    expect(serializedRows).toContain("长三角晶圆制造");
    expect(serializedRows).toContain("浦东机场货站");
    expect(serializedRows).toContain("外高桥保税仓");
    expect(serializedRows).toContain("进口增值税");
    expect(serializedRows).toContain("关税");
    expect(serializedRows).toContain("SCM-IMP-202607-001");
    expect(serializedRows).toContain("报关单");
    expect(serializedRows).toContain("晶圆");
    expect(serializedRows).toContain("洁净仓储");
  });

  test("matches the target top-level business modules", () => {
    expect(navGroups.map((group) => group.label)).toEqual([
      "工作台",
      "发票管理",
      "收入管理",
      "成本管理",
      "代垫管理",
      "应收回款",
      "税务管理",
      "报表分析",
      "基础设置"
    ]);
  });

  test("covers the mature module gaps from the research baseline", () => {
    const labelsByGroup = Object.fromEntries(
      navGroups.map((group) => [group.id, group.items.map((item) => item.label)])
    );

    expect(labelsByGroup.invoices).toEqual(
      expect.arrayContaining(["开票申请", "开票审核", "发票采集中心", "发票查验查重", "认证抵扣", "发票入账"])
    );
    expect(labelsByGroup.cost).toEqual(
      expect.arrayContaining(["成本工作台", "成本确认/成本单", "供应商对账", "预付款管理/预付核销", "暂估应付/冲暂估", "成本调整"])
    );
    expect(labelsByGroup.receivables).toEqual(
      expect.arrayContaining(["收款认领", "催收计划", "坏账核销/转回"])
    );
    expect(labelsByGroup.tax).toEqual(
      expect.arrayContaining(["税务工作台", "销项税额统计", "进项税额统计", "抵扣统计表", "税负分析", "数电票额度监控"])
    );
    expect(labelsByGroup.settings).toEqual(
      expect.arrayContaining(["商品/服务编码", "开票规则", "审批流程配置", "匹配规则", "核销规则", "风险规则", "链票接口配置", "接口日志"])
    );
  });

  test("has page configs for the added full-system prototype pages", () => {
    expect(Object.keys(pageConfigs)).toEqual(
      expect.arrayContaining([
        "invoices.billingRequests",
        "invoices.billingReview",
        "invoices.collection",
        "invoices.verification",
        "invoices.deduction",
        "invoices.accounting",
        "income.workbench",
        "income.settlements",
        "income.reconciliation",
        "cost.workbench",
        "cost.confirmation",
        "cost.supplierReconciliation",
        "cost.prepayment",
        "cost.accruals",
        "cost.adjustments",
        "advance.workbench",
        "advance.customerConfirmation",
        "advance.receiptWriteOff",
        "receivables.receiptClaim",
        "receivables.collectionPlan",
        "receivables.badDebtWriteOff",
        "tax.workbench",
        "tax.outputTax",
        "tax.inputTax",
        "tax.deductionReport",
        "tax.taxBurden",
        "tax.digitalQuota",
        "settings.commodityCodes",
        "settings.billingRules",
        "settings.approvalFlows",
        "settings.matchingRules",
        "settings.writeOffRules",
        "settings.riskRules",
        "settings.chainpiaoIntegration",
        "settings.interfaceLogs"
      ])
    );
  });

  test("keeps search actions separate from business toolbar actions", () => {
    const config = pageConfigs["invoices.outputPool"];

    expect(getSearchActions(config)).toEqual(["查询", "重置"]);
    expect(getToolbarActions(config)).toContain("提交交付任务");
    expect(getToolbarActions(config)).toContain("同步链票状态");
  });

  test("uses contextual detail actions instead of fixed invoice actions", () => {
    const billingRuleActions = getDetailActions(pageConfigs["settings.billingRules"]);

    expect(billingRuleActions).toEqual(["新增规则", "模拟开票"]);
    expect(billingRuleActions).not.toContain("提交链票开具");
    expect(billingRuleActions).not.toContain("发起红冲申请");
    expect(billingRuleActions).not.toContain("作废条件校验");
  });

  test("keeps detail actions available when toolbar actions are report-only", () => {
    expect(getDetailActions(pageConfigs["reports.invoiceAnalysis"])).toEqual(["查看明细"]);
  });

  test("does not expose delivery channels as primary business buttons", () => {
    const visibleActions = [
      ...getToolbarActions(pageConfigs["invoices.outputPool"]),
      ...getToolbarActions(pageConfigs["invoices.delivery"])
    ];

    expect(visibleActions).not.toContain("平台内交付");
    expect(visibleActions).not.toContain("邮件交付");
    expect(visibleActions).not.toContain("推送第三方");
  });

  test("covers mature invoice capabilities in navigation", () => {
    const invoiceLabels = navGroups
      .find((group) => group.id === "invoices")
      ?.items.map((item) => item.label);
    const settingLabels = navGroups
      .find((group) => group.id === "settings")
      ?.items.map((item) => item.label);

    expect(invoiceLabels).toEqual(expect.arrayContaining(["发票归档", "风险巡检"]));
    expect(settingLabels).toEqual(expect.arrayContaining(["税控票源"]));
  });

  test("identifies pages that actually have advanced search filters", () => {
    expect(pageConfigs["invoices.outputPool"].filters.length).toBeGreaterThan(4);
    expect(pageConfigs["reports.invoiceAnalysis"].filters.length).toBe(4);
  });
});
