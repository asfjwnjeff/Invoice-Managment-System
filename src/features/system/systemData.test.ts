import { describe, expect, test } from "vitest";
import { getSearchActions, getToolbarActions, navGroups, pageConfigs } from "./systemData";

describe("system page configuration", () => {
  test("keeps search actions separate from business toolbar actions", () => {
    const config = pageConfigs["invoices.outputPool"];

    expect(getSearchActions(config)).toEqual(["查询", "重置"]);
    expect(getToolbarActions(config)).toContain("提交交付任务");
    expect(getToolbarActions(config)).toContain("同步链票状态");
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
