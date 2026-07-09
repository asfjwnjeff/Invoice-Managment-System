"use client";

import Link from "next/link";
import type { DragEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  FileMinus2,
  FileText,
  GripVertical,
  Menu,
  PlugZap,
  RefreshCw,
  Search,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
  X
} from "lucide-react";
import {
  buildColumnConfig,
  getVisibleColumns,
  getSelectionState,
  moveColumnToIndex,
  moveColumnToTop,
  sortRowsByColumn,
  toggleAllSelection,
  toggleColumnVisibility,
  toggleColumnSort,
  toggleRowSelection,
  type ColumnConfig,
  type SortState
} from "./listInteractions";
import {
  applyBusinessAction,
  dashboardMetrics,
  dashboardTasks,
  getActiveGroup,
  getDetailActions,
  getRowDetailSections,
  getRowIdentity,
  getSearchActions,
  getToolbarActions,
  navGroups,
  pageConfigs,
  type PageConfig,
  type PageId,
  type RowRecord
} from "./systemData";

export function ModulePage({ pageId }: { pageId: PageId }) {
  const config = pageConfigs[pageId];
  const activeGroup = getActiveGroup(pageId);
  const [rows, setRows] = useState<RowRecord[]>(config.rows);
  const [selectedRow, setSelectedRow] = useState<RowRecord | null>(config.rows[0] ?? null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState("准备就绪");
  const [eventLog, setEventLog] = useState<string[]>([
    "链票状态回调：INV-202607-001 开票成功",
    "银行流水自动匹配：BK20260706002 关联 AR-INV-202607-002",
    "代垫超期预警：广州海贸物流有限公司 48,900.00"
  ]);

  function openDetail(row: RowRecord) {
    setSelectedRow(row);
    setDrawerOpen(true);
  }

  useEffect(() => {
    setRows(config.rows);
    setSelectedRow(config.rows[0] ?? null);
    setDrawerOpen(false);
    setActionFeedback(`${config.title} 已加载`);
  }, [config]);

  function runAction(action: string, targetRow?: RowRecord | null) {
    const target = targetRow ?? selectedRow ?? rows[0];
    if (!target) return;

    const result = applyBusinessAction(config, target, action);
    const targetIdentity = getRowIdentity(target);

    setRows((current) =>
      current.map((row) => (getRowIdentity(row) === targetIdentity ? result.row : row))
    );
    setSelectedRow((current) =>
      current && getRowIdentity(current) === targetIdentity ? result.row : current
    );
    setEventLog((current) => [result.event, ...result.followUpEvents, ...current].slice(0, 8));
    setActionFeedback(result.event);
  }

  function runBulkAction(action: string, targetRows: RowRecord[]) {
    if (!targetRows.length) return;

    const results = targetRows.map((row) => {
      const result = applyBusinessAction(config, row, action);
      return [getRowIdentity(row), result] as const;
    });
    const resultById = new Map(results);

    setRows((current) =>
      current.map((row) => resultById.get(getRowIdentity(row))?.row ?? row)
    );
    setSelectedRow((current) =>
      current ? resultById.get(getRowIdentity(current))?.row ?? current : current
    );
    setEventLog((current) =>
      results
        .flatMap(([, result]) => [result.event, ...result.followUpEvents])
        .concat(current)
        .slice(0, 8)
    );
    setActionFeedback(`${config.title}：${action} 已处理 ${targetRows.length} 条记录`);
  }

  return (
    <div className="system-shell">
      <TopNav activeGroupId={activeGroup.id} />
      <div className="workspace">
        <SideNav pageId={pageId} />
        <main className="content">
          <PageHeader config={config} onAction={runAction} />
          <div className="action-feedback" role="status">{actionFeedback}</div>
          {pageId === "dashboard" ? (
            <Dashboard eventLog={eventLog} cases={config.rows} />
          ) : (
            <ListWorkspace
              config={config}
              rows={rows}
              onOpenDetail={openDetail}
              onFeedback={setActionFeedback}
              onRunAction={runAction}
              onRunBulkAction={runBulkAction}
            />
          )}
        </main>
      </div>
      <DetailDrawer
        open={drawerOpen}
        config={config}
        row={selectedRow}
        eventLog={eventLog}
        onClose={() => setDrawerOpen(false)}
        onRunAction={runAction}
      />
    </div>
  );
}

function TopNav({ activeGroupId }: { activeGroupId: string }) {
  return (
    <header className="top-nav">
      <Link className="brand" href="/dashboard">
        <span className="brand-logo">HM</span>
        <span>
          <strong>发票业财中台</strong>
          <small>CBMS Invoice</small>
        </span>
      </Link>
      <nav aria-label="一级模块">
        {navGroups.map((group) => {
          const Icon = group.icon;
          const firstHref = group.items[0]?.href ?? "/dashboard";
          return (
            <Link
              className={group.id === activeGroupId ? "top-link active" : "top-link"}
              href={firstHref}
              key={group.id}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{group.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="top-actions">
        <span>当前主体：上海泓明供应链有限公司</span>
        <button type="button" title="菜单">
          <Menu size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function SideNav({ pageId }: { pageId: PageId }) {
  const activeGroup = getActiveGroup(pageId);
  const GroupIcon = activeGroup.icon;
  return (
    <aside className="side-nav">
      <div className="user-panel">
        <div className="avatar">YF</div>
        <div>
          <strong>yuan_fang</strong>
          <span>财务业务用户</span>
        </div>
      </div>
      <div className="side-section-title">
        <GroupIcon size={16} aria-hidden="true" />
        <span>{activeGroup.label}</span>
      </div>
      <nav aria-label="二级菜单">
        {activeGroup.items.map((item) => {
          const Icon = item.icon;
          return (
            <Link className={item.id === pageId ? "side-link active" : "side-link"} href={item.href} key={item.id}>
              {Icon ? <Icon size={16} aria-hidden="true" /> : null}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function PageHeader({ config, onAction }: { config: PageConfig; onAction: (action: string) => void }) {
  return (
    <section className="page-header">
      <div>
        <div className="breadcrumb">
          <span>{config.module}</span>
          <ChevronRight size={14} aria-hidden="true" />
          <strong>{config.title}</strong>
        </div>
        <h1>{config.title}</h1>
        <p>{config.description}</p>
      </div>
      <div className="header-tools">
        <button type="button" title="刷新" onClick={() => onAction("刷新")}>
          <RefreshCw size={16} aria-hidden="true" />
        </button>
        <button type="button" title="导出" onClick={() => onAction("导出")}>
          <Download size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function Dashboard({ eventLog, cases }: { eventLog: string[]; cases: RowRecord[] }) {
  return (
    <div className="dashboard-grid">
      <section className="metric-grid">
        {dashboardMetrics.map((metric) => (
          <article className={`metric ${metric.tone}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.trend}</small>
          </article>
        ))}
      </section>
      <section className="panel large-panel">
        <PanelTitle title="端到端业务闭环" subtitle="收入、成本、代垫、应收、链票、档案" />
        <div className="process-line">
          {["账单/业务单", "开票申请", "链票开具", "发票台账", "应收与回款", "归档报表"].map((step, index) => (
            <div className="process-node" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="panel large-panel">
        <PanelTitle title="真实业务案例" subtitle="半导体供应链全链路样例" />
        <div className="case-list">
          {cases.map((item) => (
            <article className="case-item" key={String(item["业务编号"] ?? item["案例"])}>
              <header>
                <div>
                  <strong>{String(item["案例"] ?? "-")}</strong>
                  <span>{String(item["业务编号"] ?? "-")}</span>
                </div>
                <StatusBadge value={String(item["状态"] ?? "-")} />
              </header>
              <div className="case-meta">
                {["客户", "服务类型", "关键单据"].map((field) => (
                  <div key={field}>
                    <span>{field}</span>
                    <strong>{String(item[field] ?? "-")}</strong>
                  </div>
                ))}
              </div>
              <div className="case-money">
                {["收入", "成本", "代垫", "应收"].map((field) => (
                  <div key={field}>
                    <span>{field}</span>
                    <strong>{String(item[field] ?? "-")}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="panel">
        <PanelTitle title="待办任务" subtitle="按风险和财务影响排序" />
        <ul className="task-list">
          {dashboardTasks.map((task) => (
            <li key={task}>
              <AlertTriangle size={15} aria-hidden="true" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="panel">
        <PanelTitle title="接口/审计流水" subtitle="链票、销账、坏账动作留痕" />
        <EventLog items={eventLog} />
      </section>
    </div>
  );
}

function ListWorkspace({
  config,
  rows,
  onOpenDetail,
  onFeedback,
  onRunAction,
  onRunBulkAction
}: {
  config: PageConfig;
  rows: RowRecord[];
  onOpenDetail: (row: RowRecord) => void;
  onFeedback: (message: string) => void;
  onRunAction: (action: string, row?: RowRecord | null) => void;
  onRunBulkAction: (action: string, rows: RowRecord[]) => void;
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [sortState, setSortState] = useState<SortState | null>(null);
  const [columnPanelOpen, setColumnPanelOpen] = useState(false);
  const [columnConfig, setColumnConfig] = useState<ColumnConfig>(() => buildColumnConfig(config.columns));
  const [draftColumnConfig, setDraftColumnConfig] = useState<ColumnConfig>(() => buildColumnConfig(config.columns));
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(null);
  const baseFilters = config.filters.slice(0, 4);
  const advancedFilters = config.filters.slice(4);
  const searchActions = getSearchActions(config);
  const toolbarActions = getToolbarActions(config).filter((action) => action !== "列设置");
  const visibleColumns = useMemo(() => getVisibleColumns(columnConfig), [columnConfig]);
  const sortedRows = useMemo(() => sortRowsByColumn(rows, sortState), [rows, sortState]);
  const rowKeys = useMemo(() => sortedRows.map(getRowIdentity), [sortedRows]);
  const selectionState = getSelectionState(rowKeys, selectedKeys);
  const selectedRows = sortedRows.filter((row) => selectedKeys.has(getRowIdentity(row)));

  useEffect(() => {
    const nextColumnConfig = buildColumnConfig(config.columns);
    setColumnConfig(nextColumnConfig);
    setDraftColumnConfig(nextColumnConfig);
    setColumnPanelOpen(false);
    setDraggedColumnIndex(null);
    setSelectedKeys(new Set());
    setSortState(null);
  }, [config.id]);

  function runBatchAction(action: string) {
    onRunBulkAction(action, selectedRows);
    setSelectedKeys(new Set());
  }

  function openColumnPanel() {
    setDraftColumnConfig(columnConfig);
    setColumnPanelOpen(true);
  }

  function applyColumnConfig() {
    setColumnConfig(draftColumnConfig);
    setColumnPanelOpen(false);
    setSortState((current) =>
      current && getVisibleColumns(draftColumnConfig).includes(current.column) ? current : null
    );
    onFeedback(`${config.title}：列设置已应用`);
  }

  function resetColumnConfig() {
    setDraftColumnConfig(buildColumnConfig(config.columns));
    setDraggedColumnIndex(null);
  }

  function moveDraftColumnToTop(columnKey: string) {
    setDraftColumnConfig((current) => moveColumnToTop(current, columnKey));
  }

  function handleColumnDragStart(index: number, event: DragEvent<HTMLDivElement>) {
    setDraggedColumnIndex(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  }

  function handleColumnDragOver(index: number, event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDraggedColumnIndex((currentIndex) => {
      if (currentIndex === null || currentIndex === index) return currentIndex;
      setDraftColumnConfig((current) => moveColumnToIndex(current, currentIndex, index));
      return index;
    });
  }

  function handleColumnDragEnd() {
    setDraggedColumnIndex(null);
  }

  return (
    <div className="list-workspace">
      <section className="search-panel">
        <div className="filter-grid">
          {baseFilters.map((filter) => (
            <label key={filter}>
              <span>{filter}</span>
              <input placeholder={getPlaceholder(filter)} />
            </label>
          ))}
        </div>
        {advancedOpen && advancedFilters.length ? (
          <div className="advanced-search">
            <div className="advanced-title">
              <strong>更多搜索条件</strong>
              <span>{advancedFilters.length} 项可选条件</span>
            </div>
            <div className="filter-grid compact">
              {advancedFilters.map((filter) => (
                <label key={filter}>
                  <span>{filter}</span>
                  <input placeholder={getPlaceholder(filter)} />
                </label>
              ))}
            </div>
          </div>
        ) : null}
        <div className="search-actions">
          {searchActions.map((action) => (
            <button
              className={action === "查询" ? "btn primary" : "btn"}
              key={action}
              type="button"
              onClick={() => onRunAction(action)}
            >
              {action === "查询" ? <Search size={15} aria-hidden="true" /> : null}
              {action}
            </button>
          ))}
          {advancedFilters.length ? (
            <button
              aria-expanded={advancedOpen}
              className="btn ghost"
              type="button"
              onClick={() => setAdvancedOpen((current) => !current)}
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              {advancedOpen ? "收起更多条件" : "更多搜索条件"}
              <ChevronDown className={advancedOpen ? "rotate-icon open" : "rotate-icon"} size={14} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </section>

      <section className="table-panel">
        <div className="table-toolbar">
          <div className="toolbar-left">
            {config.primaryAction ? <button className="btn primary" type="button" onClick={() => onRunAction(config.primaryAction!)}>{config.primaryAction}</button> : null}
            {toolbarActions.map((action) => (
              <button
                className="btn"
                disabled={!selectionState.hasSelection}
                key={action}
                type="button"
                onClick={() => runBatchAction(action)}
                title={selectionState.hasSelection ? `对已选 ${selectionState.selectedCount} 条执行` : "请先勾选列表记录"}
              >
                {action}
              </button>
            ))}
          </div>
          <div className="toolbar-right">
            <button className="btn" type="button" onClick={openColumnPanel}>
              <Settings2 size={15} aria-hidden="true" />
              列设置
            </button>
          <span>
            已选 {selectionState.selectedCount} 条 · 共 {rows.length} 条 · 50条/页
          </span>
          </div>
        </div>
        {columnPanelOpen ? (
          <div className="column-panel">
            <div className="column-panel-header">
              <div>
                <strong>自定义列表字段</strong>
                <span>调整显示字段和字段顺序，应用后立即生效</span>
              </div>
              <button className="btn ghost" type="button" onClick={() => setColumnPanelOpen(false)}>
                关闭
              </button>
            </div>
            <div className="column-config-list">
              {draftColumnConfig.map((column, index) => (
                <div
                  className={draggedColumnIndex === index ? "column-config-item dragging" : "column-config-item"}
                  draggable
                  key={column.key}
                  onDragEnd={handleColumnDragEnd}
                  onDragOver={(event) => handleColumnDragOver(index, event)}
                  onDragStart={(event) => handleColumnDragStart(index, event)}
                >
                  <span className="drag-handle" title="拖拽排序">
                    <GripVertical size={16} aria-hidden="true" />
                  </span>
                  <label>
                    <input
                      checked={column.visible}
                      type="checkbox"
                      onChange={() => setDraftColumnConfig((current) => toggleColumnVisibility(current, column.key))}
                    />
                    <span>{column.key}</span>
                  </label>
                  <div className="column-order-actions">
                    <button
                      aria-label={`${column.key} 置顶`}
                      disabled={index === 0}
                      title="置顶"
                      type="button"
                      onClick={() => moveDraftColumnToTop(column.key)}
                    >
                      <ArrowUp size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="column-panel-footer">
              <button className="btn" type="button" onClick={resetColumnConfig}>
                恢复默认
              </button>
              <button className="btn primary" type="button" onClick={applyColumnConfig}>
                应用
              </button>
            </div>
          </div>
        ) : null}
        {rows.length ? (
          <div className="data-table" style={{ ["--col-count" as string]: visibleColumns.length }}>
            <div className="data-row head">
              <span className="selection-cell">
                <input
                  aria-label="选择当前页全部记录"
                  checked={selectionState.allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = selectionState.partiallySelected;
                  }}
                  type="checkbox"
                  onChange={() => undefined}
                  onClick={() => setSelectedKeys((current) => toggleAllSelection(rowKeys, current))}
                />
              </span>
              {visibleColumns.map((column) => (
                <button
                  className={sortState?.column === column ? "column-sort active" : "column-sort"}
                  key={column}
                  type="button"
                  onClick={() => setSortState((current) => toggleColumnSort(current, column))}
                >
                  <span>{column}</span>
                  <small>{sortState?.column === column ? (sortState.direction === "asc" ? "升序" : "降序") : "排序"}</small>
                </button>
              ))}
            </div>
            {sortedRows.map((row, index) => {
              const rowKey = getRowIdentity(row);
              const selected = selectedKeys.has(rowKey);
              return (
              <div
                className={selected ? "data-row selected" : "data-row"}
                key={`${config.id}-${rowKey}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => onOpenDetail(row)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") onOpenDetail(row);
                }}
              >
                <span className="selection-cell">
                  <input
                    aria-label={`选择第 ${index + 1} 条记录`}
                    checked={selected}
                    type="checkbox"
                    onChange={() => undefined}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedKeys((current) => toggleRowSelection(current, rowKey));
                    }}
                  />
                </span>
                {visibleColumns.map((column) => (
                  <span key={column}>
                    {isStatusColumn(column) ? <StatusBadge value={String(row[column] ?? "-")} /> : String(row[column] ?? "-")}
                  </span>
                ))}
              </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <FileText size={42} aria-hidden="true" />
            <strong>{config.emptyState ?? "暂无数据"}</strong>
            <span>可调整筛选条件，或检查业务票池、主体权限与链票接口配置。</span>
          </div>
        )}
      </section>
    </div>
  );
}

function DetailDrawer({
  open,
  config,
  row,
  eventLog,
  onClose,
  onRunAction
}: {
  open: boolean;
  config: PageConfig;
  row: RowRecord | null;
  eventLog: string[];
  onClose: () => void;
  onRunAction: (action: string, row?: RowRecord | null) => void;
}) {
  if (!open || !row) return null;
  const rowEntries = Object.entries(row).slice(0, 10);
  const detailActions = getDetailActions(config);
  const detailSections = getRowDetailSections(config, row);
  return (
    <aside className="drawer" aria-label="详情抽屉">
      <div className="drawer-header">
        <div>
          <span>{config.module}</span>
          <h2>{config.title}详情</h2>
        </div>
        <button type="button" onClick={onClose} title="关闭">
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="drawer-actions">
        {detailActions.map((action, index) => (
          <button
            className={getDetailActionClass(action, index)}
            key={action}
            type="button"
            onClick={() => onRunAction(action, row)}
          >
            {getActionIcon(action)}
            {action}
          </button>
        ))}
      </div>
      <section className="drawer-section">
        <h3>基础信息</h3>
        <div className="detail-grid">
          {rowEntries.map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <strong>{String(value)}</strong>
            </div>
          ))}
        </div>
      </section>
      {detailSections.map((section) => (
        <section className="drawer-section" key={section.title}>
          <h3>{section.title}</h3>
          <div className="detail-grid">
            {section.fields.map(([key, value]) => (
              <div key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>
      ))}
      <section className="drawer-section">
        <h3>流程状态</h3>
        <div className="mini-process">
          {config.workflow.map((step, index) => (
            <div key={step}>
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>{index + 1}. {step}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="drawer-section">
        <h3>审计流水</h3>
        <EventLog items={eventLog} />
      </section>
    </aside>
  );
}

function PanelTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="panel-title">
      <h2>{title}</h2>
      <span>{subtitle}</span>
    </div>
  );
}

function EventLog({ items }: { items: string[] }) {
  return (
    <ul className="event-log">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>
          <span>{new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</span>
          <strong>{item}</strong>
        </li>
      ))}
    </ul>
  );
}

function StatusBadge({ value }: { value: string }) {
  const tone = value.includes("失败") || value.includes("异常") || value.includes("高危") || value.includes("超")
    ? "bad"
    : value.includes("待") || value.includes("部分") || value.includes("关注") || value.includes("处理中")
      ? "warn"
      : "good";
  return <span className={`status ${tone}`}>{value}</span>;
}

function isStatusColumn(column: string) {
  return column.includes("状态") || column.includes("等级") || column.includes("流程");
}

function getDetailActionClass(action: string, index: number) {
  if (action.includes("作废") || action.includes("坏账") || action.includes("冻结")) return "btn danger";
  return index === 0 ? "btn primary" : "btn";
}

function getActionIcon(action: string) {
  if (action.includes("链票") || action.includes("接口") || action.includes("同步")) return <PlugZap size={15} aria-hidden="true" />;
  if (action.includes("红冲") || action.includes("冲回") || action.includes("坏账") || action.includes("减免")) return <FileMinus2 size={15} aria-hidden="true" />;
  if (action.includes("风险") || action.includes("作废") || action.includes("校验") || action.includes("异常") || action.includes("冻结")) return <ShieldAlert size={15} aria-hidden="true" />;
  return <FileText size={15} aria-hidden="true" />;
}

function getPlaceholder(label: string) {
  if (label.includes("日期") || label.includes("时间")) return "请选择日期范围";
  if (label.includes("金额")) return "请输入金额";
  if (label.includes("状态") || label.includes("票种") || label.includes("区域")) return "请选择";
  return "请输入关键字";
}
