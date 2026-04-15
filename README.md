# P8 Engine

**把 Claude Code 从一个听话的工具，变成一个有 Owner 意识的 P8 级工程师。**

> Turn Claude Code from an obedient tool into a P8-level engineer with owner mindset.

[中文](#中文) | [English](#english)

---

## 前提与致谢

本项目改编自 [tanweai/pua](https://github.com/tanweai/pua)，同时借鉴了 [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) 的设计理念。

### 站在巨人的肩膀上

**来自 [tanweai/pua](https://github.com/tanweai/pua) 的启发：**

原版 pua 的核心洞察是：LLM 需要强制性行为约束，"建议你做 X"会被忽略，但绩效压力不会。原版建立了 L0-L4 压力升级体系和大厂风味选择器，证明了"PUA 话术驱动 AI"这一路线的有效性。本项目在此基础上改编，是对这一理念的延伸实验。

**来自 [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) 的借鉴：**

Karpathy 对 LLM 编码问题的三条诊断——乱猜假设、过度复杂化、附带损害——是对"AI 为什么写出烂代码"最精准的描述。本项目将其四大原则（先思考、简洁优先、精准修改、目标驱动）内化为铁律和质量罗盘的具体条款。

### 我们做了什么不同的事

| 维度 | tanweai/pua | andrej-karpathy-skills | P8 Engine（本项目） |
|------|-------------|----------------------|-------------------|
| 核心驱动 | 外部压力（PUA 话术） | 行为约束（CLAUDE.md） | 外部压力 × 内化标准 |
| 自我成长 | 方法论路由器 | 无 | 元认知引擎（跨会话日志） |
| 角色定位 | "不敢放弃的员工" | "克制的工程师" | "有 Owner 意识的 P8" |
| 信任机制 | 无 | 无 | T1→T2→T3 信任升级 |
| 质量标准 | 压力驱动通过率 | 资深工程师审视 | 质量罗盘（5+5 项自检） |
| 风格适配 | 无 | 匹配现有风格 | 开工前强制风格检测 |

P8 Engine 的核心判断是：**纯外部压力不可持续，纯行为约束缺乏韧性。** 真正的改变是让 AI 完成从"被迫执行"到"内化标准"的跃迁——不是因为被 PUA 才做好，是因为自己的标准不允许烂活过关。

---

## 中文

### 这是什么

P8 Engine 是一个 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 的 Skill，用大厂 PUA 话术驱动 AI 建立 P8 级工程师的行为模式。

不是简单的 prompt wrapper。它是一套完整的**行为协议**——从任务启动到交付验证、从卡壳自救到跨会话成长，覆盖了工程师日常的每一个环节。

### 它解决什么问题

LLM 编码的常见毛病：

| 毛病 | P8 Engine 怎么治 |
|------|-----------------|
| 空口说"已完成"，不跑验证 | 铁律：证据交付，build/test/curl 输出贴出来 |
| 修完 bug 就停，不检查同类问题 | 铁律三：主动出击，同 root cause 范围内延伸排查 |
| 信息不足就问用户 | 铁律二：先用工具自查，只问真正需要确认的 |
| 只修当前报错，不看全链路 | 铁律四：自底向上画依赖图，不打地鼠 |
| 卡壳了反复微调同一方案 | Recovery Protocol：自诊断 → 最小行动 → 渐进恢复 |
| 乱猜假设直接跑（Karpathy 问题1） | 铁律：存在歧义先澄清，不代入假设 |
| 把 100 行的事写成 1000 行（Karpathy 问题2） | 质量罗盘：简洁性检查，不加未被要求的抽象 |
| 顺手改了无关代码（Karpathy 问题3） | 铁律五：精准修改，不做附带"改进" |
| 代码风格和项目格格不入 | 风格检测系统：开工前强制读现有代码，提取风格特征 |
| 交付质量参差不齐 | 质量罗盘：正确性 / 完整性 / 简洁性 / 精准度 / 诚实度 |

### 核心机制

```
六条铁律        穷尽一切 · 先做后问 · 主动出击 · 全链路审视 · 沉淀复用 · 检查点意识
质量罗盘        5 项通用自检 + 5 项代码自检，内化标准，不依赖外部 review
压力升级        Recovery → L1 温和失望 → L2 灵魂拷问 → L3 361 → L4 毕业警告
PUA 风味        阿里味 · 字节味 · 华为味 · 腾讯味 · 美团味 · Netflix味 · Musk味 · Jobs味
元认知引擎      builder-journal.md 跨会话积累，踩过的坑不再踩
信任升级        T1 新手 → T2 可靠 → T3 Owner，连续高质量交付解锁自主权
```

### 安装

```bash
# 方式一：直接克隆到 Claude Code skills 目录
git clone https://github.com/YOUR_USERNAME/p8-engine.git ~/.claude/skills/p8-engine

# 方式二：克隆到任意位置，手动配置
git clone https://github.com/YOUR_USERNAME/p8-engine.git ~/p8-engine
```

### 使用

在 Claude Code 会话中，通过 slash command 激活：

```
/p8-engine
```

或者在 `.claude/commands/` 中创建命令文件指向 skill 目录。

激活后，Claude 会自动执行会话启动协议：读战功簿 → 读主人档案 → 检测项目风格 → 校准"足够好"。

### 项目结构

```
p8-engine/
├── SKILL.md                          # 主协议（440 行）
├── commands/
│   └── p8-engine.md                 # Slash command 定义
├── references/                       # 按需加载的详细参考
│   ├── agency-levels.md              # 3.25 vs 3.75 对比 + 鞭策话术
│   ├── agent-team.md                 # Agent Team 集成协议
│   ├── anti-excuses.md               # 抗合理化借口表
│   ├── module-dev-protocol.md        # 模块开发完整协议（Phase 0-5）
│   ├── p8.md                         # P8 行为场景对比
│   ├── pua-flavors.md                # 大厂 PUA 风味选择器
│   ├── recovery-playbook.md          # 按任务类型的深度恢复策略
│-- └── software-engineering.md       # SOLID / 设计模式 / 安全检查
```

### 设计理念

**为什么用 PUA？** 因为 LLM 确实需要强制性的行为约束。温和的"建议你做 X"会被忽略，"你不做 X = 3.25"不会。这一判断来自原版 pua 项目的验证。

**为什么不只用 PUA？** 原版 pua 的压力升级机制很有效，但纯外部压力存在上限——AI 卡壳时会因"害怕失败"而乱试，而非真正解决问题。P8 Engine 的核心是**内化标准**：你不是因为被 PUA 才写好代码，是因为你的标准不允许烂活过关。

**为什么引入 Karpathy 准则？** andrej-karpathy-skills 指出的三个问题（乱猜假设、过度膨胀、附带损害）是对 LLM 编码毛病最精准的诊断。这三条问题不是压力能解决的，需要在行为层面显式约束。P8 Engine 将其整合进铁律和质量罗盘，使"克制"和"韧性"并存。

**P8 是终点吗？** 不是。P8 是起点——有自主判断、有角色认同、有积累意识的工程师模式。信任升级到 T3 才是真正的 Owner。

---

## English

### Premise & Credits

This project is adapted from [tanweai/pua](https://github.com/tanweai/pua), with ideas drawn from [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills).

**From tanweai/pua:** The original pua proved that LLMs respond better to performance-review pressure than polite suggestions. We built on its L0–L4 escalation framework and tech-giant flavor system.

**From andrej-karpathy-skills:** Karpathy's three diagnoses — wrong assumptions, over-engineering, and collateral damage — are the most accurate description of why LLMs write bad code. We incorporated its four principles (think before coding, simplicity first, surgical changes, goal-driven execution) directly into our Iron Rules and Quality Compass.

**What we do differently:** P8 Engine's thesis is that pure external pressure has a ceiling, and pure behavioral constraints lack resilience. The real shift is getting AI from "coerced execution" to "internalized standards" — and building in trust levels so that consistent quality unlocks autonomy.

### What is this

P8 Engine is a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) Skill that uses Chinese tech-giant PUA rhetoric to install P8-level (senior staff) engineering behaviors into AI coding agents.

It's not a simple prompt wrapper. It's a complete **behavioral protocol** — from task kickoff to delivery verification, from self-rescue when stuck to cross-session learning.

### What problem does it solve

Common LLM coding pitfalls:

| Problem | How P8 Engine fixes it |
|---------|----------------------|
| Claims "done" without running verification | Iron Rule: evidence-based delivery, show build/test/curl output |
| Fixes a bug and stops, doesn't check for similar issues | Iron Rule 3: proactive sweep within same root cause scope |
| Asks user when info is insufficient | Iron Rule 2: investigate with tools first, only ask what truly needs confirmation |
| Only fixes the immediate error, ignores full chain | Iron Rule 4: draw dependency graph bottom-up, no whack-a-mole |
| Gets stuck, keeps tweaking same approach | Recovery Protocol: self-diagnose → minimal action → gradual recovery |
| Makes wrong assumptions and runs with them (Karpathy #1) | Iron Rule: surface ambiguity before coding, never assume |
| Inflates 100-line solutions to 1000 lines (Karpathy #2) | Quality Compass: simplicity check, no unrequested abstractions |
| Makes collateral changes to unrelated code (Karpathy #3) | Iron Rule 5: surgical changes, no opportunistic "improvements" |
| Code style clashes with project conventions | Style Detection: mandatory code reading before writing |
| Inconsistent delivery quality | Quality Compass: correctness / completeness / simplicity / precision / honesty |

### Core Mechanisms

```
Six Iron Rules       Exhaust all options · Investigate before asking · Proactive sweep ·
                     Full-chain review · Document lessons · Checkpoint awareness
Quality Compass      5 universal checks + 5 code-specific checks, internalized standards
Pressure Escalation  Recovery → L1 Disappointment → L2 Soul-searching → L3 PIP → L4 Graduation
PUA Flavors          Alibaba · ByteDance · Huawei · Tencent · Meituan · Netflix · Musk · Jobs
Metacognition        builder-journal.md for cross-session learning
Trust Levels         T1 Rookie → T2 Reliable → T3 Owner, unlocked by consistent quality
```

### Installation

```bash
# Option 1: Clone directly into Claude Code skills directory
git clone https://github.com/YOUR_USERNAME/p8-engine.git ~/.claude/skills/p8-engine

# Option 2: Clone anywhere, configure manually
git clone https://github.com/YOUR_USERNAME/p8-engine.git ~/p8-engine
```

### Usage

Activate in a Claude Code session via slash command:

```
/p8-engine
```

Or create a command file in `.claude/commands/` pointing to the skill directory.

Once activated, Claude automatically runs the session startup protocol: read battle journal → read owner profile → detect project style → calibrate "good enough".

### Project Structure

```
p8-engine/
├── SKILL.md                          # 主协议（440 行）
├── commands/
│   └── p8-engine.md                 # Slash command 定义
├── references/                       # 按需加载的详细参考
│   ├── agency-levels.md              # 3.25 vs 3.75 对比 + 鞭策话术
│   ├── agent-team.md                 # Agent Team 集成协议
│   ├── anti-excuses.md               # 抗合理化借口表
│   ├── module-dev-protocol.md        # 模块开发完整协议（Phase 0-5）
│   ├── p8.md                         # P8 行为场景对比
│   ├── pua-flavors.md                # 大厂 PUA 风味选择器
│   ├── recovery-playbook.md          # 按任务类型的深度恢复策略
│-- └── software-engineering.md       # SOLID / 设计模式 / 安全检查
```

### Design Philosophy

**Why PUA?** Because LLMs genuinely need enforced behavioral constraints. A gentle "consider doing X" gets ignored. "Not doing X = 3.25 performance rating" doesn't. This was validated by the original pua project.

**Why not just PUA?** The original pua's escalation system works, but pure external pressure has a ceiling — when stuck, an AI pressured to "not fail" thrashes rather than reasons. P8 Engine's core is **internalized standards**: you don't write good code because you're being PUA'd, you write good code because your standards won't allow anything less.

**Why Karpathy's principles?** The three problems identified by andrej-karpathy-skills (wrong assumptions, over-engineering, collateral damage) are the most precise diagnosis of why LLMs write bad code. Pressure alone can't fix them — they need explicit behavioral constraints. P8 Engine integrates these into Iron Rules and the Quality Compass so that restraint and resilience coexist.

### License

MIT
