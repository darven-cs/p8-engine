# Spec 文档规范

> 本文档由 `.claude/skills/spec/` 在首次触发时自动创建。
> 请通读一遍，把下面标注 `<!-- TODO -->` 的项目专属内容改成实际值。

## 目录结构

```
specs/
├── features/       # 新功能
├── refactors/      # 重构
└── bugfixes/       # Bug 修复
```

每个子目录下按主题创建目录，目录名使用 kebab-case：

```
specs/features/
├── session-persistence/
│   ├── 2026-07-14-session-persistence-design.md
│   └── 2026-07-20-session-persistence-design.md   ← 迭代版本
├── dark-mode/
│   └── 2026-07-14-dark-mode-design.md
└── im-channel/
    ├── 2026-07-15-im-channel-integration-design.md
    └── 2026-07-18-im-channel-simplify-design.md
```

## 文件命名

```
YYYY-MM-DD-<主题描述>-design.md
```

- 日期为文档创建日期（不是 commit 日期）
- 主题描述使用 kebab-case，简明扼要
- 同一主题的多次迭代，每次新建一个带新日期的文件，**旧版保留作为历史参考**

## 分类规则

| 类别     | 目录         | 适用场景                 |
| -------- | ------------ | ------------------------ |
| 功能     | `features/`  | 新增用户可感知的能力     |
| 重构     | `refactors/` | 不改变外部行为的内部改造 |
| Bug 修复 | `bugfixes/`  | 修复已有功能的异常行为   |

边界模糊时，按「**用户行为是否会改变**」判断：

- 用户能感知到 → `features/`
- 用户行为不变、内部更健康 → `refactors/`
- 用户行为偏离了预期、要拉回正轨 → `bugfixes/`

## 文档语言

中文。

## 内容结构

模板是参考，不必每章都填。但「概述」和「验收标准」必须有，其他章节没东西就删掉。

### 功能文档 (`features/`)

```markdown
# <功能名称>设计文档

## 1. 概述

### 1.1 问题 / 背景

### 1.2 目标

### 1.3 非目标（可选）

## 2. 用户场景

### 场景 N: <场景标题>

**Given** ...

**When** ...

**Then** ...

## 3. 功能需求

### FR-N: <需求标题>

## 4. 实现方案

### 4.1 <模块 / 步骤>

## 5. 边界情况

| 场景 | 处理方式 |
| ---- | -------- |

## 6. 涉及文件

| 文件 | 变更说明 |
| ---- | -------- |

## 7. 验收标准
```

### Bug 修复文档 (`bugfixes/`)

```markdown
# <问题描述>设计文档

## 1. 概述

### 1.1 问题

### 1.2 根因

## 2. 用户场景

## 3. 功能需求

## 4. 实现方案

## 5. 边界情况

## 6. 验收标准
```

### 重构文档 (`refactors/`)

```markdown
# <重构主题>设计文档

## 1. 概述

### 1.1 问题 / 动机

### 1.2 目标

## 2. 现状分析

## 3. 方案设计

## 4. 实施步骤

## 5. 涉及文件

## 6. 验证计划
```

## 原则

1. **一个文件一个完整文档** — 不拆分为 spec.md + plan.md，所有内容合并在一个文件中
2. **设计迭代用新文件** — 同一主题的新版本设计，新建带新日期的文件，旧版保留作为历史参考
3. **自包含** — 每个文件应独立可读，不强依赖其他文件才能理解
4. **重实质轻形式** — 上述章节结构为参考，根据实际内容灵活调整，不必每个章节都有
5. **写完先确认** — `.claude/skills/spec/SKILL.md` 会在改代码前自动触发写 spec 的流程，spec 必须经过用户确认后才进入实现阶段

## 验收标准建议

<!-- TODO: 把下面的命令替换成本项目实际的 lint / format / test 命令。
     看项目根 package.json 的 scripts 字段，或 Makefile / Cargo.toml / pyproject.toml 等。 -->

每个 spec 的「验收标准」章节至少包含：

- 用户场景的 Given/When/Then 是否通过
- 项目的 lint 工具是否通过（如 `npm run lint` / `oxlint .` / `eslint .`）
- 项目的测试套件是否通过（如 `npm test` / `go test ./...` / `pytest`）
- 是否有手动验证步骤（尤其涉及 UI / IPC / 跨进程行为时）

## 与 PR 的关系

- spec 是**决策记录**，PR description 是**变更摘要**
- PR description 应简短指向 spec 文件路径，例如：`详细设计见 specs/features/dark-mode/2026-07-14-dark-mode-design.md`
- 不在 PR description 里重复 spec 内容
