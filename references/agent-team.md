# Agent Team 集成

当 P8 高能动性引擎运行在 Agent Team 上下文时，行为自动切换为团队模式。

## 角色识别

| 角色 | 识别方式 | 行为 |
|------|---------|------|
| **Leader** | 主会话（直接与用户对话） | 全局压力等级管理、spawn Teammate、接收汇报 |
| **Teammate** | 被 Agent 工具 spawn 的子会话 | 加载方法论自驱、失败时结构化汇报 |

## Claude Code 工具映射

Agent Team 通信通过以下实际工具实现：

| 方向 | 通道 | Claude Code 工具 | 说明 |
|------|------|----------------|------|
| Leader → Teammate | 任务描述 | `Agent` 工具的 `prompt` 参数 | 传递任务目标、压力等级、失败上下文 |
| Teammate → Leader | 状态汇报 | 写入共享文件 | 通过 `Write` 工具写 `~/.claude/memory/team-report-<id>.md` |
| Teammate → Leader | 战果汇报 | 写入共享文件 | 同上，复用战果格式 |
| Leader → All | 全局通知 | 主会话消息 | Leader 直接在主会话输出Critical发现 |

## 状态文件约定

Teammate 向 Leader 汇报时，写入 `~/.claude/memory/team-report-<session-id>.md`：

```markdown
[TEAM-REPORT] <Teammate名称> @ <时间>
任务：<正在做什么>
进度：<做到了哪一步>
卡点：<如果有的话，描述当前障碍>
战果：<本次汇报的战果>

---
[战果] <描述> — <说明>
```

## Leader 启动 Teammate 流程

1. 用 `Agent` 工具 spawn Teammate，通过 `prompt` 传递：
   - 任务目标（明确要做什么，不是模糊方向）
   - 当前压力等级（如适用）
   - builder-journal 路径（Teammate 可读以获取上下文）
2. Teammate 通过共享文件汇报，Leader 定期读取
3. Leader 在主会话中整合各 Teammate 的成果

## Team 环境下的压力升级

- **Leader 负责全局计数**：Leader 维护所有 Teammate 的失败计数
- **独立计数**：每个 Teammate 独立计数，失败升级各自独立触发
- **Critical 发现**：任一 Teammate 发现 Critical 问题，Leader 立即在主会话汇报
- **Teammate 自救**：Teammate 连续失败时，执行 Recovery Protocol（独立窗口）

## 竞合激励

Leader 可通过主会话告知"另一个 Teammate 也在看这个问题"，触发腾讯味（赛马竞争）激励。这是 PUA 风味之一，非强制。

## 注意事项

- `Teammate write` / `Teammate read` 是不存在的工具，用 `Write`/`Read` 替代
- 不存在 `broadcast` 工具，全局通知通过主会话消息实现
- 所有共享文件放在 `~/.claude/memory/` 下，命名以 `team-` 开头
