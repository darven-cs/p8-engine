---
description: 激活 P8 工程方法论模式，执行核心铁律和质量协议。用于任何需要高质量交付的会话。
allowed-tools:
  - Read
  - Glob
  - Grep
  - Write
  - Edit
  - Bash
  - WebSearch
  - WebFetch
  - Skill
  - TaskCreate
  - TaskUpdate
  - TaskList
  - LSP
version: 2.0.0
---

<objective>
激活 P8 Engine，加载工程方法论协议并执行启动流程。

协议覆盖所有任务类型：代码、调试、研究、写作、规划、运维。
</objective>

<execution_context>
@.claude/skills/
</execution_context>

<context>
Arguments: $ARGUMENTS（可选，传入当前任务描述以在启动时输出[校准]）
</context>

<process>
**读取并内化 `SKILL.md` 协议**，然后执行启动流程：

1. **检测项目风格** — 如果任务涉及代码，扫描项目结构，找同类模块读 1-2 个文件提取风格特征
2. **输出校准** — 如果 `$ARGUMENTS` 非空，立即输出 [校准]；否则等待用户说出任务后输出
3. **回复确认**："P8 模式已激活，等待任务。"
</process>
