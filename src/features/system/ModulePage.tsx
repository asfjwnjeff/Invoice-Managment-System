"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  FileMinus2,
  FileText,
  Menu,
  PlugZap,
  RefreshCw,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  X
} from "lucide-react";
import {
  dashboardMetrics,
  dashboardTasks,
  getActiveGroup,
  getDetailActions,
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
  const [eventLog, setEventLog] = useState<string[]>([
    "链票状态回调：INV-202607-001 开票成功",
    "银行流水自动匹配：BK20260706002 关联 AR-INV-202607-002",
    "代垫超期预警：广州海贸物流有限公司 48,900.00"
  ]);

  function openDetail(row: RowRecord) {
    setSelectedRow(row);
    setDrawerOpen(true);
  }

  function runAction(action: string) {
    const message = buildActionMessage(action, config);
    setEventLog((current) => [message, ...current].slice(0, 8));
    if (action.includes("红冲")) {
      setRows((current) =>
        current.map((row, index) => (index === 0 ? { ...row, "发票状态": "部分红冲", "链票状态": "处理中" } : row))
      );
    }
    if (action.includes("销账") || action.includes("核销")) {
      setRows((current) =>
        current.map((row, index) => (index === 0 ? { ...row, "销账状态": "部分销账", "认领状态": "已匹配" } : row))
      );
    }
    if (action.includes("作废")) {
      setEventLog((current) => ["作废校验：数电票已开具，系统建议转红冲流程", ...current].slice(0, 8));
    }
  }

  return (
    <div className="system-shell">
      <TopNav activeGroupId={activeGroup.id} />
      <div className="workspace">
        <SideNav pageId={pageId} />
        <main className="content">
          <PageHeader config={config} />
          {pageId === "dashboard" ? (
            <Dashboard eventLog={eventLog} />
          ) : (
            <ListWorkspace
              config={config}
              rows={rows}
              onOpenDetail={openDetail}
              onRunAction={runAction}
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
              <span>{group.short}.{group.label}</span>
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
  return (
    <aside className="side-nav">
      <div className="user-panel">
        <div className="avatar">YF</div>
        <div>
          <strong>yuan_fang</strong>
          <span>财务业务用户</span>
        </div>
      </div>
      <div className="side-section-title">{activeGroup.short}00.{activeGroup.label}</div>
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

function PageHeader({ config }: { config: PageConfig }) {
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
        <button type="button" title="刷新">
          <RefreshCw size={16} aria-hidden="true" />
        </button>
        <button type="button" title="导出">
          <Download size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function Dashboard({ eventLog }: { eventLog: string[] }) {
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
          {["账单/业务单", "开票申请", "链票开具", "发票台账", "应收回款", "归档报表"].map((step, index) => (
            <div className="process-node" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
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
  onRunAction
}: {
  config: PageConfig;
  rows: RowRecord[];
  onOpenDetail: (row: RowRecord) => void;
  onRunAction: (action: string) => void;
}) {
  const visibleColumns = useMemo(() => config.columns.slice(0, 9), [config.columns]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const baseFilters = config.filters.slice(0, 4);
  const advancedFilters = config.filters.slice(4);
  const searchActions = getSearchActions(config);
  const toolbarActions = getToolbarActions(config);
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
              <button className="btn" key={action} type="button" onClick={() => onRunAction(action)}>
                {action}
              </button>
            ))}
          </div>
          <span>共 {rows.length} 条 · 50条/页</span>
        </div>
        {rows.length ? (
          <div className="data-table" style={{ ["--col-count" as string]: visibleColumns.length }}>
            <div className="data-row head">
              {visibleColumns.map((column) => (
                <span key={column}>{column}</span>
              ))}
            </div>
            {rows.map((row, index) => (
              <button className="data-row" key={`${config.id}-${index}`} type="button" onClick={() => onOpenDetail(row)}>
                {visibleColumns.map((column) => (
                  <span key={column}>
                    {isStatusColumn(column) ? <StatusBadge value={String(row[column] ?? "-")} /> : String(row[column] ?? "-")}
                  </span>
                ))}
              </button>
            ))}
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
  onRunAction: (action: string) => void;
}) {
  if (!open || !row) return null;
  const rowEntries = Object.entries(row).slice(0, 10);
  const detailActions = getDetailActions(config);
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
            onClick={() => onRunAction(action)}
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
      {config.detailSections.map((section) => (
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

function buildActionMessage(action: string, config: PageConfig) {
  if (action.includes("链票")) return `${config.title}：已向链票适配层提交任务，等待回调`;
  if (action.includes("红冲")) return `${config.title}：已生成红冲申请并保留原票关系`;
  if (action.includes("作废")) return `${config.title}：已执行作废条件校验`;
  if (action.includes("交付")) return `${config.title}：已生成交付任务并等待渠道回执`;
  if (action.includes("查验")) return `${config.title}：已提交发票查验任务`;
  if (action.includes("认证")) return `${config.title}：已进入进项认证勾选流程`;
  if (action.includes("归档")) return `${config.title}：已校验版式文件并更新归档状态`;
  if (action.includes("巡检")) return `${config.title}：已生成风险巡检批次`;
  if (action.includes("票源") || action.includes("清卡") || action.includes("额度")) return `${config.title}：已同步税控票源与额度状态`;
  if (action.includes("销账")) return `${config.title}：银行流水已进入应收核销队列`;
  if (action.includes("坏账")) return `${config.title}：已生成坏账审批记录`;
  return `${config.title}：执行 ${action}`;
}
