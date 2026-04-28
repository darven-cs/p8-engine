---
description: 给当前项目注入轻量 AI 记忆系统（memory/ 目录 + CLAUDE.md 规范 + PostToolUse 自动同步 hook）。触发词：注入记忆、init memory、设置 AI 记忆。
allowed-tools:
  - Read
  - Glob
  - Grep
  - Write
  - Edit
  - Bash
  - AskUserQuestion
version: 1.0.0
---

<objective>
在当前项目注入一套轻量 AI 记忆系统，执行 SKILL.md 中定义的完整注入流程。
</objective>

<process>
SKILL.md 已加载到上下文。按 SKILL.md 中的流程执行：预检查 → 建立 memory/ 骨架 → 复制模板 → 追加 CLAUDE.md 规范 → 配置 hook → 原子 commit → 汇报结果。
</process>
