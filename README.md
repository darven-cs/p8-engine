# P8 Engine

**工程方法论 + AI 记忆系统 —— 一个 plugin，两个 skills，全面提升 AI 编码质量。**

> Engineering methodology + AI memory system — one plugin, two skills,全面提升 AI coding quality.

[中文](#中文) | [English](#english)

---

## 中文

### 这是什么

P8 Engine 是一个 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) Plugin，包含两个 skills：

| Skill | 用途 | 触发方式 |
|-------|------|----------|
| **p8-engine** | 工程方法论 — 核心铁律、质量自检、应急流程、风格对齐 | `/p8-engine` |
| **inject-memory** | 给任意项目注入轻量 AI 记忆系统 | `/inject-memory` |

### 安装

```bash
# 添加 marketplace
claude plugin marketplace add darven-cs/p8-engine

# 安装 plugin（一次安装，两个 skills 都可用）
claude plugin install p8-engine@p8-engine

# 激活（启动新会话后）
/p8-engine          # 激活工程方法论
/inject-memory      # 注入记忆系统到目标项目
```

### p8-engine 使用

不是 prompt wrapper。它是 5 大模块组成的行为协议：会话启动协议、核心铁律、质量自检、应急流程、模块开发。

| LLM 编码常见问题 | P8 Engine 怎么治 |
|-----------------|-----------------|
| 空口说"已完成"，不跑验证 | 铁律：证据交付，build/test/curl 输出贴出来 |
| 修完 bug 就停，不检查同类 | 铁律三：同 root cause 范围内延伸排查 |
| 信息不足就问用户 | 铁律二：先用工具自查，只问真正需要确认的 |
| 只修当前报错，不看全链路 | 铁律四：自底向上画依赖图，不打地鼠 |
| 乱猜假设直接跑 | 铁律：有歧义先澄清，不代入假设 |
| 把 100 行写成 1000 行 | 质量自检：简洁性检查，不加未被要求的抽象 |
| 顺手改了无关代码 | 铁律五：精准修改，不做附带"改进" |
| 代码风格和项目格格不入 | 风格检测：开工前强制读现有代码 |
| 卡壳反复微调同一方案 | 应急流程：诊断 → 最小行动 → 渐进恢复 |
| 交付质量参差不齐 | 质量自检：正确性 / 完整性 / 精准度 / 简洁性 / 诚实度 |

```
会话启动协议  风格检测 → 任务校准 → 确认激活，skill 加载后立即执行
核心铁律      穷尽方案 · 先查后问 · 主动延伸 · 全链路排查 · 精准修改 · 检查点意识
质量自检      5 项通用自检 + 5 项代码自检，交付前必过
应急流程      诊断卡壳 → 拉高视角 → 最小行动恢复 → 穷尽后结构化退出
模块开发      Phase 0-4：读 → 设计契约 → 自检 → 实现 → 验证
```

### inject-memory 使用

给任意项目一键注入 AI 记忆系统：

```bash
cd /path/to/your-project
/inject-memory
```

注入后项目新增：
- `memory/` 目录（索引 + 模板 + 教程）
- `.claude/hooks/sync-memory-index.mjs`（PostToolUse 自动同步脚本）
- `CLAUDE.md` 追加记忆使用规范

之后每次新 Claude 会话都会加载 `memory/_index.md`，自动感知项目上下文。

### 使用教程

[使用教程](docs/tutorial.md)

1.通过`/p8-engine`注入skills,然后在执行任务
![案例1](docs/images/example1.png)

加入风格记忆缓存，减少扫描的次数
![首次记忆加载](docs/images/example5.png)

2.如果遇到Bug修复问题，能出色的使用全链路排查，避免AI无头绪的乱跑，减少发散
![案例2](docs/images/example2.png)
![案例2](docs/images/example4.png)

3.处理复杂问题，需要调研，优先扫描项目，然后再去调研
![案例3](docs/images/example3.png)

### 项目结构

```
p8-engine/
├── .claude-plugin/
│   └── marketplace.json              # marketplace 注册
├── plugins/
│   └── p8-engine-plugin/             # 唯一的 plugin
│       ├── .claude-plugin/
│       │   └── plugin.json           # plugin 清单
│       ├── skills/
│       │   ├── p8-engine/            # 工程方法论 skill
│       │   │   ├── SKILL.md
│       │   │   └── references/
│       │   └── inject-memory/        # 记忆系统注入 skill
│       │       ├── SKILL.md
│       │       ├── hooks/
│       │       └── templates/
│       └── commands/
│           ├── p8-engine.md
│           └── inject-memory.md
├── docs/
├── README.md
└── LICENSE
```

---

## English

### What is this

P8 Engine is a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) Plugin with two skills:

| Skill | Purpose | Trigger |
|-------|---------|---------|
| **p8-engine** | Engineering methodology — core rules, quality self-check, emergency protocol, style alignment | `/p8-engine` |
| **inject-memory** | Inject lightweight AI memory system into any project | `/inject-memory` |

### Installation

```bash
# Add marketplace
claude plugin marketplace add darven-cs/p8-engine

# Install plugin (one install, both skills available)
claude plugin install p8-engine@p8-engine

# Activate (after starting new session)
/p8-engine          # Activate engineering methodology
/inject-memory      # Inject memory system into target project
```

### p8-engine Usage

Not a prompt wrapper. It's a behavioral protocol in 5 modules: Session Startup, Core Rules, Quality Self-Check, Emergency Protocol, Module Development.

| LLM coding problem | How P8 Engine fixes it |
|---------------------|----------------------|
| Claims "done" without running verification | Iron Rule: evidence-based delivery |
| Fixes a bug and stops | Iron Rule 3: proactive sweep within same root cause |
| Asks user when info is insufficient | Iron Rule 2: investigate with tools first |
| Only fixes the immediate error | Iron Rule 4: bottom-up dependency chain verification |
| Makes wrong assumptions | Iron Rule: surface ambiguity before coding |
| Inflates 100-line solutions to 1000 lines | Quality check: simplicity, no unrequested abstractions |
| Makes collateral changes to unrelated code | Iron Rule 5: surgical changes only |
| Code style clashes with project | Style detection: mandatory code reading before writing |
| Stuck tweaking same approach | Emergency protocol: diagnose → minimal action → recover |
| Inconsistent delivery quality | Quality check: correctness / completeness / precision / simplicity / honesty |

### inject-memory Usage

Inject AI memory system into any project:

```bash
cd /path/to/your-project
/inject-memory
```

After injection, the project gets:
- `memory/` directory (index + templates + tutorial)
- `.claude/hooks/sync-memory-index.mjs` (PostToolUse auto-sync script)
- `CLAUDE.md` appended with memory usage rules

Every new Claude session will load `memory/_index.md` and automatically perceive project context.

### License

MIT
