# AGENT.md

## 项目核心定位

本项目是“发票业财中台”原型系统，面向半导体供应链服务企业。

系统覆盖发票中心、客户结算、供应商结算、代垫款管理、应收与回款、税务合规、报表中心和基础配置。

当前目标是构建完整可演示原型，暂不接入真实数据库、真实登录、真实链票接口和真实财务系统接口。

后续目标是迁移为真实业财一体系统中的发票、票财、税务和结算核心模块。

## 技术栈

- Framework: Next.js App Router
- Language: TypeScript
- UI: React
- Icons: lucide-react
- Test: Vitest
- Deploy: Render Static Site
- Package Manager: npm

## 运行命令

```bash
npm install
npm run dev
npm test
npm run build
```

Render 部署使用静态站点模式：

```bash
npm run build
```

发布目录：

```text
out
```

## 项目架构

当前项目是前端原型架构，页面由统一配置和 mock 数据驱动。

核心思路：

- `app/` 负责路由页面。
- `src/features/system/` 负责系统页面框架、菜单、页面配置、列表交互。
- `src/domain/` 负责业务规则和领域类型。
- `src/data/` 负责 mock 数据。
- `docs/` 负责产品、架构、调研和路线图文档。
- `scripts/` 负责部署和运行辅助脚本。

## 目录说明

```text
app/
  Next.js App Router 页面目录。
  每个业务页面通常只负责引入 ModulePage 并传入 pageId。

app/globals.css
  全局样式，控制整体 B 端商务系统视觉风格。

src/features/system/
  系统原型核心层。
  包含菜单、页面配置、通用页面组件、列表选择、排序、列设置和业务动作反馈。

src/domain/
  领域模型和业务规则。
  包含发票、应收、红冲、作废、核销、坏账等业务逻辑。

src/data/
  原型 mock 数据。

docs/product/
  PRD、语义层路线图等产品文档。

docs/reference/
  调研资料、范围基线和业务参考。

docs/architecture/
  系统架构图和架构说明。

scripts/
  Render 或本地静态运行辅助脚本。
```

## 设计原则

- 保持 B 端商务系统风格，强调稳定、清晰、可扫描。
- 不做营销式首页，不做装饰性页面。
- 页面操作必须具备明确业务语义。
- “更多搜索条件”必须真实可交互；没有更多条件时不展示。
- 列表应支持复选、批量操作、排序、列设置和字段顺序调整。
- 详情抽屉应展示当前单据、业务追溯、链票状态、财务链路和审计信息。
- 业务字段、状态、动作和指标应逐步沉淀到语义层，减少重复命名和后续返工。
