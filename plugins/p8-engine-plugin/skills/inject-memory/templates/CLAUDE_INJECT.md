<!--
  此文件内容由 inject-memory skill 追加到目标项目的 CLAUDE.md。
  首次注入时整段追加；若 CLAUDE.md 中已存在标记行 `<!-- MEMORY-SYSTEM:BEGIN -->` 则跳过。
-->
<!-- MEMORY-SYSTEM:BEGIN -->
## 记忆系统使用规范

### 记忆文件位置
- 总索引：`memory/_index.md`（始终加载）
- 详细记忆存放目录：`/memory/`
- 系统教程：`memory/_tutorial.md`（扩展用法/套用到新项目）

### 你必须遵守的记忆规则
1. **开始任务前**，先快速扫描 `memory/_index.md`，确认涉及模块的当前状态和已知约束。
2. **任何对模块的变更**（新增功能、修改接口、改变依赖），在任务完成后，你必须：
   - 在对应模块的记忆文件中追加一条变更历史（日期 + 简要说明）
   - 如果模块公开接口变化，更新公开接口表格
   - 如果模块状态、最后更新日期改变，**同步更新 `memory/_index.md` 中的对应条目**
3. **当用户说"记一下"**，意味着当前变更点很重要，立即执行上述更新。
4. **会话结束时**，可选追加 `memory/progress/session-YYYY-MM-DD.md`，并更新 `progress/current-status.md`。
5. **新增模块**时，自动创建模块记忆文件，并在 `memory/_index.md` 中添加一行索引。
6. **新发现通用踩坑**，按"跨模块 + 代码看不出原因"标准判断是否进 `memory/bugs/`。

### 记忆系统的自动化
- 项目 `.claude/settings.json` 配置了 PostToolUse hook：每次 Claude 写入 `memory/modules/**` 或 `memory/bugs/**` 时，会自动把 `memory/_index.md` 对应条目的"最后更新"列同步为今天日期。
- 如果 hook 没生效，检查 `.claude/hooks/sync-memory-index.mjs` 是否存在并可执行。
<!-- MEMORY-SYSTEM:END -->
