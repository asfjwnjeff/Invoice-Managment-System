# Invoice Module Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the prototype into a more complete B2B invoice-finance system information architecture based on the saved research baseline.

**Architecture:** Keep the existing config-driven Next.js prototype. Extend `systemData.ts` as the single source of truth for menus, page metadata, filters, columns, mock rows, and actions; add App Router pages that pass the matching `PageId` into `ModulePage`.

**Tech Stack:** Next.js App Router, TypeScript, Vitest, lucide-react.

---

### Task 1: Lock the Target Information Architecture in Tests

**Files:**
- Modify: `src/features/system/systemData.test.ts`

- [ ] **Step 1: Write failing coverage tests**

Add tests that assert:
- 一级菜单为：工作台、发票管理、收入管理、成本管理、代垫管理、应收回款、税务管理、报表分析、基础设置。
- 成本管理包含成本工作台、成本确认/成本单、供应商对账、预付款管理/预付核销、暂估应付/冲暂估、成本调整。
- 发票管理包含开票申请、开票审核、发票采集中心、发票查验查重、认证抵扣、发票入账。
- 应收回款包含收款认领、催收计划、坏账核销/转回。
- 税务管理和基础设置包含调研基线里的关键配置页。

- [ ] **Step 2: Run test to verify RED**

Run: `npm.cmd test`

Expected: FAIL because new page IDs and labels do not exist yet.

### Task 2: Extend Page IDs, Navigation, Data, and Configs

**Files:**
- Modify: `src/features/system/systemData.ts`

- [ ] **Step 1: Add PageId entries**

Add page IDs for the P0/P1 prototype modules from `docs/reference/invoice-system-research-and-scope.md`.

- [ ] **Step 2: Update `navGroups`**

Set the target top-level navigation order and labels:
`工作台`、`发票管理`、`收入管理`、`成本管理`、`代垫管理`、`应收回款`、`税务管理`、`报表分析`、`基础设置`.

- [ ] **Step 3: Add representative row sets**

Add mock rows for dashboard/workbench pages, settlements, reconciliation, cost documents, prepayments, accruals, tax statistics, settings rules, and interface logs. Reuse existing rows where that is clearer.

- [ ] **Step 4: Add page configs**

Every new nav item must have a `pageConfigs` entry with B2B search filters, table columns, workflow, and professional business actions.

- [ ] **Step 5: Run targeted tests**

Run: `npm.cmd test -- src/features/system/systemData.test.ts`

Expected: PASS.

### Task 3: Add App Router Pages

**Files:**
- Add page files under `app/dashboard`, `app/invoices`, `app/income`, `app/cost`, `app/advance`, `app/receivables`, `app/tax`, `app/reports`, and `app/settings`.

- [ ] **Step 1: Create route files**

Each new file should follow:

```tsx
import { ModulePage } from "@/src/features/system/ModulePage";

export default function SomePage() {
  return <ModulePage pageId="matching.pageId" />;
}
```

- [ ] **Step 2: Run build**

Run: `npm.cmd run build`

Expected: PASS and static pages generated for all new routes.

### Task 4: Verify B2B Action Language and Search Behavior

**Files:**
- Modify if needed: `src/features/system/systemData.ts`
- Modify if needed: `src/features/system/ModulePage.tsx`

- [ ] **Step 1: Ensure no odd channel-style buttons**

Keep delivery channel wording inside descriptions/details if useful, but toolbar actions should be business tasks such as `提交交付任务`、`重发交付`、`同步链票状态`、`查看交付记录`.

- [ ] **Step 2: Ensure advanced search remains meaningful**

Pages with more than four filters show “更多搜索条件”; pages with four or fewer filters hide it.

- [ ] **Step 3: Run full verification**

Run:
- `npm.cmd test`
- `npm.cmd run build`

Expected: both commands exit 0.

