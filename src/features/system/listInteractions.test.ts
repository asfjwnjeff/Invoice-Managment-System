import { describe, expect, test } from "vitest";
import {
  buildColumnConfig,
  getVisibleColumns,
  getSelectionState,
  moveColumn,
  moveColumnToIndex,
  moveColumnToTop,
  sortRowsByColumn,
  toggleAllSelection,
  toggleColumnSort,
  toggleColumnVisibility,
  toggleRowSelection
} from "./listInteractions";

describe("list interactions", () => {
  test("cycles column sorting through ascending descending and cleared states", () => {
    expect(toggleColumnSort(null, "amount")).toEqual({ column: "amount", direction: "asc" });
    expect(toggleColumnSort({ column: "amount", direction: "asc" }, "amount")).toEqual({
      column: "amount",
      direction: "desc"
    });
    expect(toggleColumnSort({ column: "amount", direction: "desc" }, "amount")).toBeNull();
    expect(toggleColumnSort({ column: "amount", direction: "desc" }, "customer")).toEqual({
      column: "customer",
      direction: "asc"
    });
  });

  test("sorts rows by numeric currency values while keeping equal rows stable", () => {
    const rows = [
      { id: "A", amount: "1,200.00" },
      { id: "B", amount: "86.50" },
      { id: "C", amount: "1,200.00" }
    ];

    expect(sortRowsByColumn(rows, { column: "amount", direction: "asc" }).map((row) => row.id)).toEqual([
      "B",
      "A",
      "C"
    ]);
    expect(sortRowsByColumn(rows, { column: "amount", direction: "desc" }).map((row) => row.id)).toEqual([
      "A",
      "C",
      "B"
    ]);
  });

  test("toggles row selection and bulk selection state", () => {
    const rowKeys = ["row-a", "row-b", "row-c"];
    const selected = toggleRowSelection(new Set<string>(), "row-a");

    expect(getSelectionState(rowKeys, selected)).toEqual({
      selectedCount: 1,
      allSelected: false,
      partiallySelected: true,
      hasSelection: true
    });

    const allSelected = toggleAllSelection(rowKeys, selected);
    expect(Array.from(allSelected)).toEqual(rowKeys);
    expect(getSelectionState(rowKeys, allSelected).allSelected).toBe(true);

    const cleared = toggleAllSelection(rowKeys, allSelected);
    expect(cleared.size).toBe(0);
  });

  test("builds visible columns from custom display order", () => {
    const config = buildColumnConfig(["invoiceNo", "customer", "amount"]);

    expect(getVisibleColumns(config)).toEqual(["invoiceNo", "customer", "amount"]);
    expect(getVisibleColumns(moveColumn(config, "amount", "up"))).toEqual(["invoiceNo", "amount", "customer"]);
    expect(getVisibleColumns(moveColumn(config, "invoiceNo", "up"))).toEqual(["invoiceNo", "customer", "amount"]);
  });

  test("keeps hidden columns in configuration while removing them from visible output", () => {
    const config = buildColumnConfig(["invoiceNo", "customer", "amount"]);
    const hiddenCustomer = toggleColumnVisibility(config, "customer");

    expect(getVisibleColumns(hiddenCustomer)).toEqual(["invoiceNo", "amount"]);
    expect(getVisibleColumns(toggleColumnVisibility(hiddenCustomer, "customer"))).toEqual([
      "invoiceNo",
      "customer",
      "amount"
    ]);
  });

  test("moves a column to the top without changing visibility", () => {
    const config = toggleColumnVisibility(buildColumnConfig(["invoiceNo", "customer", "amount"]), "customer");

    expect(getVisibleColumns(moveColumnToTop(config, "amount"))).toEqual(["amount", "invoiceNo"]);
    expect(moveColumnToTop(config, "missing")).toEqual(config);
  });

  test("reorders columns by drag source and drop target indexes", () => {
    const config = buildColumnConfig(["invoiceNo", "customer", "amount", "status"]);

    expect(getVisibleColumns(moveColumnToIndex(config, 0, 2))).toEqual([
      "customer",
      "amount",
      "invoiceNo",
      "status"
    ]);
    expect(getVisibleColumns(moveColumnToIndex(config, 3, 1))).toEqual([
      "invoiceNo",
      "status",
      "customer",
      "amount"
    ]);
    expect(moveColumnToIndex(config, 1, 1)).toEqual(config);
  });
});
