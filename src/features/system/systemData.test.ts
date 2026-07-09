import { describe, expect, test } from "vitest";
import {
  applyBusinessAction,
  getActiveGroup,
  getDetailActions,
  getRowDetailSections,
  getSearchActions,
  getToolbarActions,
  navGroups,
  pageConfigs
} from "./systemData";

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

  test("does not keep HMG reference wording in visible system data", () => {
    const visibleText = [
      ...Object.values(pageConfigs).flatMap((config) => [
        config.module,
        config.title,
        config.description,
        ...config.filters,
        ...config.columns,
        ...config.secondaryActions,
        ...config.workflow,
        ...config.rows.flatMap((row) => Object.values(row).map(String)),
        ...config.detailSections.flatMap((section) => [
          section.title,
          ...section.fields.flatMap(([key, value]) => [key, value])
        ])
      ]),
      ...navGroups.flatMap((group) => [group.label, ...group.items.map((item) => item.label)])
    ].join(" ");

    expect(visibleText).not.toContain("HMG");
  });

  test("models chainpiao interface lifecycle fields for mature integration monitoring", () => {
    const chainpiaoText = pageConfigs["invoices.chainpiao"].rows
      .map((row) => Object.entries(row).map(([key, value]) => `${key} ${value}`).join(" "))
      .join(" ");

    expect(chainpiaoText).toContain("链票请求ID");
    expect(chainpiaoText).toContain("幂等键");
    expect(chainpiaoText).toContain("回调状态");
    expect(chainpiaoText).toContain("请求摘要");
    expect(chainpiaoText).toContain("版式文件");
    expect(chainpiaoText).toContain("重试策略");
    expect(chainpiaoText).toContain("下次重试时间");
  });

  test("shows chainpiao request callback and retry details in failed interface rows", () => {
    const config = pageConfigs["invoices.chainpiao"];
    const failedTask = config.rows.find((row) => row["流水号"] === "LP202607060019");

    expect(failedTask).toBeDefined();

    const detailText = getRowDetailSections(config, failedTask!)
      .flatMap((section) => [section.title, ...section.fields.map(([key, value]) => `${key} ${value}`)])
      .join(" ");

    expect(detailText).toContain("链票接口追踪");
    expect(detailText).toContain("链票请求ID LP-REQ-202607060019");
    expect(detailText).toContain("幂等键 IDEMP-SCM-TRK-202607-028-LAYOUT");
    expect(detailText).toContain("接口地址 /openapi/v1/invoices/layout-files");
    expect(detailText).toContain("请求摘要 下载 INV-SCM-202607-002 的 OFD/PDF/XML 版式文件");
    expect(detailText).toContain("回调状态 未回调");
    expect(detailText).toContain("重试策略 指数退避，最多5次");
  });

  test("shows billing precheck controls before chainpiao submission", () => {
    const config = pageConfigs["invoices.billingRequests"];
    const billingRequest = config.rows.find((row) => row["开票申请号"] === "KP-SCM-202607-001");

    expect(billingRequest).toBeDefined();

    const detailText = getRowDetailSections(config, billingRequest!)
      .flatMap((section) => [section.title, ...section.fields.map(([key, value]) => `${key} ${value}`)])
      .join(" ");

    expect(detailText).toContain("开票前置校验");
    expect(detailText).toContain("抬头税号校验 通过");
    expect(detailText).toContain("商品编码/税率 通过");
    expect(detailText).toContain("数电票额度 充足");
    expect(detailText).toContain("重复开票检查 未重复");
    expect(detailText).toContain("客户信用/账期 关注");
    expect(detailText).toContain("代垫确认 待客户确认");
    expect(detailText).toContain("建议动作 提交财务复核前确认代垫");
  });

  test("shows semiconductor traceability fields in detail sections", () => {
    const detailText = Object.values(pageConfigs)
      .flatMap((config) => config.detailSections)
      .flatMap((section) => section.fields)
      .map(([key, value]) => `${key} ${value}`)
      .join(" ");

    expect(detailText).toContain("客户PO");
    expect(detailText).toContain("报关单号");
    expect(detailText).toContain("HS编码");
    expect(detailText).toContain("运单号");
    expect(detailText).toContain("温控要求");
    expect(detailText).toContain("仓单号");
    expect(detailText).toContain("批次号");
  });

  test("builds row-specific detail sections from the selected invoice row", () => {
    const transportInvoice = pageConfigs["invoices.outputPool"].rows.find(
      (row) => row["业务编号"] === "SCM-TRK-202607-028"
    );

    expect(transportInvoice).toBeDefined();

    const detailText = getRowDetailSections(pageConfigs["invoices.outputPool"], transportInvoice!)
      .flatMap((section) => [section.title, ...section.fields.map(([key, value]) => `${key} ${value}`)])
      .join(" ");

    expect(detailText).toContain("当前单据");
    expect(detailText).toContain("INV-SCM-202607-002");
    expect(detailText).toContain("SCM-TRK-202607-028");
    expect(detailText).toContain("PO-YF-202607-2206");
    expect(detailText).toContain("运单号");
    expect(detailText).toContain("TRK-SH-202607-028");
    expect(detailText).not.toContain("2231202614789");
  });

  test("builds row-specific detail sections from customs advance rows", () => {
    const customsAdvance = pageConfigs["advance.query"].rows.find(
      (row) => row["代垫单号"] === "DD-CUS-202607-011"
    );

    expect(customsAdvance).toBeDefined();

    const detailText = getRowDetailSections(pageConfigs["advance.query"], customsAdvance!)
      .flatMap((section) => [section.title, ...section.fields.map(([key, value]) => `${key} ${value}`)])
      .join(" ");

    expect(detailText).toContain("代垫单号 DD-CUS-202607-011");
    expect(detailText).toContain("报关单号 2231202614789");
    expect(detailText).toContain("税单号 TAX-CUS-202607-0081");
    expect(detailText).toContain("HS编码 8486909900");
    expect(detailText).toContain("进口增值税");
  });

  test("links the same import case across income invoice cost advance receivable and chainpiao pages", () => {
    const caseId = "SCM-IMP-202607-001";
    const textByPage = (id: keyof typeof pageConfigs) =>
      pageConfigs[id].rows.map((row) => Object.values(row).join(" ")).join(" ");

    expect(textByPage("income.settlements")).toContain(caseId);
    expect(textByPage("invoices.billingRequests")).toContain(caseId);
    expect(textByPage("invoices.outputPool")).toContain(caseId);
    expect(textByPage("cost.confirmation")).toContain(caseId);
    expect(textByPage("advance.query")).toContain(caseId);
    expect(textByPage("receivables.arLedger")).toContain(caseId);
    expect(textByPage("invoices.chainpiao")).toContain(caseId);
  });

  test("uses dashboard business cases for end-to-end demo storytelling", () => {
    const dashboardText = pageConfigs.dashboard.rows
      .map((row) => Object.entries(row).map(([key, value]) => `${key} ${value}`).join(" "))
      .join(" ");

    expect(dashboardText).toContain("进口设备关务代垫闭环");
    expect(dashboardText).toContain("SCM-IMP-202607-001");
    expect(dashboardText).toContain("收入");
    expect(dashboardText).toContain("成本");
    expect(dashboardText).toContain("代垫");
    expect(dashboardText).toContain("应收");
  });

  test("matches the target top-level business modules", () => {
    expect(navGroups.map((group) => group.label)).toEqual([
      "经营工作台",
      "发票中心",
      "客户结算",
      "供应商结算",
      "代垫款管理",
      "应收与回款",
      "税务合规",
      "报表中心",
      "基础配置"
    ]);
  });

  test("does not expose alphabet codes in top-level navigation data", () => {
    expect(navGroups.every((group) => !("short" in group))).toBe(true);
  });

  test("covers the mature module gaps from the research baseline", () => {
    const labelsByGroup = Object.fromEntries(
      navGroups.map((group) => [group.id, group.items.map((item) => item.label)])
    );

    expect(labelsByGroup.invoices).toEqual(
      expect.arrayContaining(["开票申请", "开票审核", "销项发票", "进项采集", "进项发票", "查验查重", "认证抵扣", "发票归档"])
    );
    expect(labelsByGroup.cost).toEqual(
      expect.arrayContaining(["成本单", "供应商对账", "成本发票匹配", "应付匹配", "预付款核销", "暂估冲回", "成本调整"])
    );
    expect(labelsByGroup.receivables).toEqual(
      expect.arrayContaining(["银行流水", "收款认领", "自动核销", "催收计划", "坏账核销/转回", "客户信用"])
    );
    expect(labelsByGroup.tax).toEqual(
      expect.arrayContaining(["税务工作台", "销项税额", "进项税额", "抵扣统计", "税负分析", "数电票额度", "票源/清卡", "申报状态"])
    );
    expect(labelsByGroup.settings).toEqual(
      expect.arrayContaining(["商品/服务编码", "开票规则", "审批流程", "单据编号", "匹配规则", "核销规则", "风险规则", "链票接口配置", "接口日志"])
    );
  });

  test("uses the approved B-side mature navigation order", () => {
    const labelsByGroup = Object.fromEntries(
      navGroups.map((group) => [group.id, group.items.map((item) => item.label)])
    );

    expect(labelsByGroup.dashboard).toEqual(["经营概览", "票财待办", "异常中心", "链票监控"]);
    expect(labelsByGroup.invoices).toEqual([
      "开票申请",
      "开票审核",
      "销项发票",
      "进项采集",
      "进项发票",
      "查验查重",
      "认证抵扣",
      "红冲管理",
      "作废管理",
      "发票交付",
      "发票归档",
      "链票流水"
    ]);
    expect(labelsByGroup.income).toEqual(["结算单", "客户对账", "未开票收入", "已开票收入", "收入发票匹配", "收入调整"]);
    expect(labelsByGroup.cost).toEqual([
      "成本单",
      "供应商对账",
      "成本发票匹配",
      "应付匹配",
      "预付款核销",
      "暂估冲回",
      "成本分摊",
      "成本调整",
      "供应商协同"
    ]);
    expect(labelsByGroup.advance).toEqual([
      "代垫登记",
      "客户确认",
      "代垫开票",
      "代垫应收",
      "代垫回款核销",
      "代垫超期",
      "代垫减免/坏账"
    ]);
  });

  test("uses mature page module names in page headers", () => {
    expect(pageConfigs["invoices.billingRequests"].module).toBe("发票中心");
    expect(pageConfigs["income.settlements"].module).toBe("客户结算");
    expect(pageConfigs["cost.confirmation"].module).toBe("供应商结算");
    expect(pageConfigs["advance.register"].module).toBe("代垫款管理");
    expect(pageConfigs["receivables.arLedger"].module).toBe("应收与回款");
    expect(pageConfigs["tax.outputTax"].module).toBe("税务合规");
    expect(pageConfigs["reports.grossProfit"].module).toBe("报表中心");
    expect(pageConfigs["settings.entities"].module).toBe("基础配置");
  });

  test("uses approved B-side page titles for renamed menu pages", () => {
    expect(pageConfigs["invoices.outputPool"].title).toBe("销项发票");
    expect(pageConfigs["invoices.collection"].title).toBe("进项采集");
    expect(pageConfigs["invoices.inputPool"].title).toBe("进项发票");
    expect(pageConfigs["invoices.verification"].title).toBe("查验查重");
    expect(pageConfigs["cost.confirmation"].title).toBe("成本单");
    expect(pageConfigs["cost.costInvoices"].title).toBe("成本发票匹配");
    expect(pageConfigs["receivables.autoWriteOffRules"].title).toBe("自动核销");
    expect(pageConfigs["tax.taxDevices"].title).toBe("票源/清卡");
  });

  test("keeps visible menu labels aligned with page titles", () => {
    for (const item of navGroups.flatMap((group) => group.items)) {
      expect(pageConfigs[item.id].title).toBe(item.label);
    }
  });

  test("keeps internal routes grouped by their business area when hidden from navigation", () => {
    expect(getActiveGroup("invoices.workbench").id).toBe("invoices");
    expect(getActiveGroup("income.rules").id).toBe("income");
    expect(getActiveGroup("settings.invoicePools").id).toBe("settings");
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

    expect(invoiceLabels).toEqual(expect.arrayContaining(["发票归档", "链票流水"]));
    expect(settingLabels).toEqual(expect.arrayContaining(["链票接口配置"]));
  });

  test("identifies pages that actually have advanced search filters", () => {
    expect(pageConfigs["invoices.outputPool"].filters.length).toBeGreaterThan(4);
    expect(pageConfigs["reports.invoiceAnalysis"].filters.length).toBe(4);
  });

  test("applies delivery actions to the selected invoice row", () => {
    const config = pageConfigs["invoices.outputPool"];
    const transportInvoice = config.rows.find((row) => row["业务编号"] === "SCM-TRK-202607-028");

    expect(transportInvoice).toBeDefined();

    const result = applyBusinessAction(config, transportInvoice!, "提交交付任务");

    expect(result.row).not.toBe(transportInvoice);
    expect(result.row["发票号码"]).toBe("INV-SCM-202607-002");
    expect(result.row["业务编号"]).toBe("SCM-TRK-202607-028");
    expect(result.row["交付状态"]).toBe("交付中");
    expect(result.row["回执状态"]).toBe("待回执");
    expect(result.event).toContain("INV-SCM-202607-002");
    expect(result.event).toContain("SCM-TRK-202607-028");
    expect(transportInvoice!["交付状态"]).toBeUndefined();
  });

  test("shows business action results in row detail sections", () => {
    const config = pageConfigs["invoices.outputPool"];
    const transportInvoice = config.rows.find((row) => row["业务编号"] === "SCM-TRK-202607-028");

    expect(transportInvoice).toBeDefined();

    const result = applyBusinessAction(config, transportInvoice!, "提交交付任务");
    const detailText = getRowDetailSections(config, result.row)
      .flatMap((section) => [section.title, ...section.fields.map(([key, value]) => `${key} ${value}`)])
      .join(" ");

    expect(detailText).toContain("交付状态 交付中");
    expect(detailText).toContain("回执状态 待回执");
    expect(detailText).toContain("最近交付时间 2026-07-06 17:30");
  });

  test("applies chainpiao sync actions with row-specific audit context", () => {
    const config = pageConfigs["invoices.outputPool"];
    const importInvoice = config.rows.find((row) => row["业务编号"] === "SCM-IMP-202607-001");

    expect(importInvoice).toBeDefined();

    const result = applyBusinessAction(config, importInvoice!, "同步链票状态");

    expect(result.row["链票状态"]).toBe("已同步");
    expect(result.row["处理状态"]).toBe("成功");
    expect(result.event).toContain("INV-SCM-202607-001");
    expect(result.event).toContain("SCM-IMP-202607-001");
    expect(result.followUpEvents).toContain("链票回调：INV-SCM-202607-001 已返回数电票版式文件与开票成功状态");
  });

  test("applies write-off actions to receivable rows", () => {
    const config = pageConfigs["receivables.arLedger"];
    const receivable = config.rows.find((row) => row["应收单号"] === "AR-INV-202607-002");

    expect(receivable).toBeDefined();

    const result = applyBusinessAction(config, receivable!, "手工销账");

    expect(result.row["销账状态"]).toBe("已销账");
    expect(result.row["未收金额"]).toBe("0.00");
    expect(result.row["认领状态"]).toBe("已匹配");
    expect(result.event).toContain("AR-INV-202607-002");
    expect(result.event).toContain("SCM-TRK-202607-028");
  });

  test("submits billing requests into finance review with precheck status", () => {
    const config = pageConfigs["invoices.billingRequests"];
    const billingRequest = config.rows.find((row) => row["开票申请号"] === "KP-SCM-202607-001");

    expect(billingRequest).toBeDefined();

    const result = applyBusinessAction(config, billingRequest!, "提交审核");

    expect(result.row["前置校验状态"]).toBe("需复核");
    expect(result.row["审核状态"]).toBe("待财务复核");
    expect(result.row["开票状态"]).toBe("待链票开具");
    expect(result.event).toContain("KP-SCM-202607-001");
    expect(result.event).toContain("SCM-IMP-202607-001");
    expect(result.followUpEvents).toContain("前置校验：客户信用/代垫确认需复核，已转财务复核队列");
  });

  test("blocks risky billing requests before chainpiao submission", () => {
    const config = pageConfigs["invoices.billingReview"];
    const riskyRequest = config.rows.find((row) => row["开票申请号"] === "KP-SCM-202607-003");

    expect(riskyRequest).toBeDefined();

    const result = applyBusinessAction(config, riskyRequest!, "风险复核");

    expect(result.row["前置校验状态"]).toBe("未通过");
    expect(result.row["审核状态"]).toBe("待商品编码修正");
    expect(result.row["开票状态"]).toBe("链票前置拦截");
    expect(result.row["风险标签"]).toBe("商品编码与税率不一致");
    expect(result.event).toContain("KP-SCM-202607-003");
    expect(result.event).toContain("WMS-BD-202607-006");
    expect(result.followUpEvents).toContain("链票前置拦截：商品/服务编码需修正后才能提交开具");
  });

  test("retries failed chainpiao interface tasks with idempotency context", () => {
    const config = pageConfigs["invoices.chainpiao"];
    const failedTask = config.rows.find((row) => row["流水号"] === "LP202607060019");

    expect(failedTask).toBeDefined();

    const result = applyBusinessAction(config, failedTask!, "重试失败任务");

    expect(result.row["处理状态"]).toBe("重试中");
    expect(result.row["重试次数"]).toBe(3);
    expect(result.row["下次重试时间"]).toBe("2026-07-06 17:35");
    expect(result.row["回调状态"]).toBe("等待回调");
    expect(result.event).toContain("LP202607060019");
    expect(result.event).toContain("SCM-TRK-202607-028");
    expect(result.event).toContain("第 3 次重试");
    expect(result.followUpEvents).toContain("链票重试：使用幂等键 IDEMP-SCM-TRK-202607-028-LAYOUT，避免重复生成版式文件");
  });

  test("keeps search actions informational instead of changing business status", () => {
    const config = pageConfigs["invoices.outputPool"];
    const invoice = config.rows[0];

    const result = applyBusinessAction(config, invoice, "查询");

    expect(result.row).toEqual(invoice);
    expect(result.row).not.toBe(invoice);
    expect(result.event).toBe("销项发票：已按当前筛选条件执行查询");
    expect(result.event).not.toContain("INV-SCM-202607-001");
    expect(result.followUpEvents).toEqual([]);
  });
});
