import type { RowRecord } from "./systemData";

export type SortDirection = "asc" | "desc";

export interface SortState {
  column: string;
  direction: SortDirection;
}

export interface ColumnConfigItem {
  key: string;
  visible: boolean;
}

export type ColumnConfig = ColumnConfigItem[];

export function buildColumnConfig(columns: string[]): ColumnConfig {
  return columns.map((column) => ({ key: column, visible: true }));
}

export function getVisibleColumns(config: ColumnConfig) {
  return config.filter((column) => column.visible).map((column) => column.key);
}

export function moveColumn(config: ColumnConfig, columnKey: string, direction: "up" | "down"): ColumnConfig {
  const index = config.findIndex((column) => column.key === columnKey);
  if (index < 0) return config;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= config.length) return config;

  const next = [...config];
  [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
  return next;
}

export function moveColumnToTop(config: ColumnConfig, columnKey: string): ColumnConfig {
  const index = config.findIndex((column) => column.key === columnKey);
  if (index <= 0) return config;
  return moveColumnToIndex(config, index, 0);
}

export function moveColumnToIndex(config: ColumnConfig, sourceIndex: number, targetIndex: number): ColumnConfig {
  if (
    sourceIndex === targetIndex ||
    sourceIndex < 0 ||
    targetIndex < 0 ||
    sourceIndex >= config.length ||
    targetIndex >= config.length
  ) {
    return config;
  }

  const next = [...config];
  const [movingColumn] = next.splice(sourceIndex, 1);
  next.splice(targetIndex, 0, movingColumn);
  return next;
}

export function toggleColumnVisibility(config: ColumnConfig, columnKey: string): ColumnConfig {
  return config.map((column) =>
    column.key === columnKey ? { ...column, visible: !column.visible } : column
  );
}

export function toggleColumnSort(current: SortState | null, column: string): SortState | null {
  if (!current || current.column !== column) return { column, direction: "asc" };
  if (current.direction === "asc") return { column, direction: "desc" };
  return null;
}

export function sortRowsByColumn(rows: RowRecord[], sort: SortState | null) {
  if (!sort) return rows;

  return rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const result = compareCellValue(left.row[sort.column], right.row[sort.column]);
      if (result !== 0) return sort.direction === "asc" ? result : -result;
      return left.index - right.index;
    })
    .map(({ row }) => row);
}

export function toggleRowSelection(selectedKeys: Set<string>, rowKey: string) {
  const next = new Set(selectedKeys);
  if (next.has(rowKey)) {
    next.delete(rowKey);
  } else {
    next.add(rowKey);
  }
  return next;
}

export function toggleAllSelection(rowKeys: string[], selectedKeys: Set<string>) {
  const allSelected = rowKeys.length > 0 && rowKeys.every((key) => selectedKeys.has(key));
  return allSelected ? new Set<string>() : new Set(rowKeys);
}

export function getSelectionState(rowKeys: string[], selectedKeys: Set<string>) {
  const selectedCount = rowKeys.filter((key) => selectedKeys.has(key)).length;
  return {
    selectedCount,
    allSelected: rowKeys.length > 0 && selectedCount === rowKeys.length,
    partiallySelected: selectedCount > 0 && selectedCount < rowKeys.length,
    hasSelection: selectedCount > 0
  };
}

function compareCellValue(left: RowRecord[string], right: RowRecord[string]) {
  const normalizedLeft = normalizeCellValue(left);
  const normalizedRight = normalizeCellValue(right);

  if (normalizedLeft.kind === "number" && normalizedRight.kind === "number") {
    return normalizedLeft.value - normalizedRight.value;
  }

  return normalizedLeft.text.localeCompare(normalizedRight.text, "zh-CN", {
    numeric: true,
    sensitivity: "base"
  });
}

function normalizeCellValue(value: RowRecord[string]) {
  const text = String(value ?? "").trim();
  if (typeof value === "number") return { kind: "number" as const, value, text };

  const dateValue = Date.parse(text.replace(/\./g, "-"));
  if (/^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/.test(text) && Number.isFinite(dateValue)) {
    return { kind: "number" as const, value: dateValue, text };
  }

  const numeric = text.replace(/[,\s￥¥]/g, "");
  if (/^-?\d+(\.\d+)?$/.test(numeric)) {
    return { kind: "number" as const, value: Number(numeric), text };
  }

  return { kind: "text" as const, value: Number.NaN, text };
}
