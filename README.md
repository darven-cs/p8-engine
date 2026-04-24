# P8 Engine

**工程方法论 skill —— 让 AI 编码遵循系统化的工程原则，减少返工、提高交付质量。**

> Engineering methodology skill for AI coding — systematic principles to reduce rework and improve delivery quality.

[中文](#中文) | [English](#english)

---

## 中文

### 这是什么

P8 Engine 是一个 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 的 Skill，为 AI 编码提供系统化的工程方法论。

不是 prompt wrapper。它是 4 大模块组成的行为协议：核心铁律、质量自检、应急流程、风格对齐。

### 它解决什么问题

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

### 四大模块

```
核心铁律    穷尽方案 · 先查后问 · 主动延伸 · 全链路排查 · 精准修改 · 检查点意识
质量自检    5 项通用自检 + 5 项代码自检，交付前必过
应急流程    诊断卡壳 → 拉高视角 → 最小行动恢复 → 穷尽后结构化退出
风格对齐    项目风格检测 + 任务校准 + 模块开发协议
```

### 安装（Plugin Marketplace）

```bash
# 添加 marketplace
claude plugin marketplace add darven-cs/p8-engine

# 安装插件
claude plugin install p8-engine@p8-engine

# 激活（启动新会话后）
/p8-engine
```

### 备用安装

```bash
git clone https://github.com/darven-cs/p8-engine.git ~/.claude/skills/p8-engine
```

### 使用

```
/p8-engine
```

### 项目结构

```
p8-engine/
├── .claude-plugin/
│   └── marketplace.json
├── plugins/
│   └── p8-engine-plugin/
│       ├── .claude-plugin/
│       │   └── plugin.json
│       └── skills/
│           └── p8-engine/
│               ├── SKILL.md              # 主协议（唯一核心文件）
│               ├── commands/
│               │   └── p8-engine.md      # Slash command 定义
│               └── references/           # 按需加载
│                   ├── module-dev-protocol.md
│                   └── software-engineering.md
```

---

## English

### What is this

P8 Engine is a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) Skill providing systematic engineering methodology for AI coding.

It's a behavioral protocol in 4 modules: Core Rules, Quality Self-Check, Emergency Protocol, Style Alignment.

### What problem does it solve

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

### Four Modules

```
Core Rules         Exhaust options · Investigate first · Proactive sweep ·
                   Full-chain review · Surgical changes · Checkpoint awareness
Quality Self-Check 5 universal + 5 code-specific checks before delivery
Emergency Protocol Diagnose stuckness → raise perspective → minimal recovery → structured exit
Style Alignment    Project style detection + task calibration + module dev protocol
```

### Installation (Plugin Marketplace)

```bash
claude plugin marketplace add darven-cs/p8-engine
claude plugin install p8-engine@p8-engine
/p8-engine
```

### Fallback Installation

```bash
git clone https://github.com/darven-cs/p8-engine.git ~/.claude/skills/p8-engine
```

### Usage

```
/p8-engine
```

### License

MIT
