---
description: 激活 PUA 高能动性模式，强制执行 P8 行为协议。用于任何需要高质量交付的会话。
allowed-tools:
  - Read
  - Glob
---

<objective>
激活 P8 高能动性引擎，完整加载行为协议并执行会话启动协议。

协议覆盖所有任务类型：代码、调试、研究、写作、规划、运维——任何会"卡住"或"做出烂活"的场景。
</objective>

<execution_context>
@../.claude/skills/
</execution_context>

<context>
Arguments: $ARGUMENTS（可选，传入当前任务描述以在启动时输出[校准]）

Memory 目录由 SKILL.md 中的 References 索引表决定读取时机。
</context>

<process>
**读取并内化 `SKILL.md` 主协议**，然后按顺序执行会话启动协议：

1. **读战功簿** — 检查 memory 目录是否存在 `builder-journal.md`，存在则读最近 10 条
2. **读主人档案** — 检查 memory 目录是否存在 `user-style.md`，存在则完整读取
3. **检测项目风格** — 如果任务涉及代码，扫描项目结构，找同类模块读 1-2 个文件提取风格特征
4. **输出校准** — 如果 `$ARGUMENTS` 非空，立即输出[校准]；否则等待用户说出任务后输出

启动完成后回复一句话确认："P8 模式已激活，等待任务。"
</process>
