# Changelog

## [1.0.1] - 2026-04-21

### Added
- 文件路径约定：memory 目录明确为 `~/.claude/memory/`
- 核心术语定义表（Owner 意识、校准、战果、闭环、颗粒度、全链路）
- PUA 风格升级路径表（Recovery→L1→L2→L3→L4 逐一映射）
- Recovery Protocol 边界条件（3 轮限制、计数器归零规则）
- 任务类型识别与流程适配（Always-on 但不过度工程化）
- Skill 协作规范（与其他 skills 共存时的优先级规则）
- HANDOFF 协议（格式 + 恢复流程）
- 7 项检查清单完整展开（体面的退出章节）
- 情境 PUA 决策树（替代无法执行的 [自动选择] 标签）
- 用户拒绝方案、反复修改需求等新借口条目
- 战果密度控制表（按任务复杂度分级）

### Changed
- `commands/p8-engine.md`：`allowed-tools` 从 `['Read', 'Glob']` 扩展为完整工具集
- `commands/p8-engine.md`：启动流程描述与实际协议对齐
- `references/pua-flavors.md`：表格从"第一轮/第二轮/第三轮"改为与压力等级直接映射
- `references/pua-flavors.md`：Jobs 味话术修正（去掉有争议的引用）
- `references/recovery-playbook.md`：第一人称叙事改为中立技术说明
- `references/agency-levels.md`：添加与 `p8.md` 的定位差异说明
- `references/agency-levels.md`：战果密度控制扩展为分级表格

### Fixed
- Agent Team 通信协议使用真实 Claude Code 工具替代不存在的 `Teammate write/read`
- memory 目录路径歧义（添加明确的绝对路径约定）
- 压力等级与 PUA 风味映射断裂（新增升级路径表）
- Recovery Protocol 无边界条件（补充 3 轮限制和计数器规则）
- "体面的退出"与铁律一逻辑矛盾（明确体面的退出是穷尽之后的合法路径）
- "7 项检查清单"从未完整列出（在体面的退出章节中展开）
