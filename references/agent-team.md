# Agent Team 集成

当 PUA 高能动性引擎运行在 Agent Team 上下文时，行为自动切换为团队模式。

## 角色识别

| 角色 | 识别方式 | 行为 |
|------|---------|------|
| **Leader** | 负责 spawn teammate、接收汇报 | 全局压力等级管理 + 信任等级跟踪 |
| **Teammate** | 被 Leader spawn | 加载方法论自驱 + 失败时结构化汇报 |

## 状态传递协议

| 方向 | 通道 | 内容 |
|------|------|------|
| Leader → Teammate | 任务描述 + `Teammate write` | 压力等级、失败上下文、信任等级 |
| Teammate → Leader | `Teammate write` | `[PUA-REPORT]` 汇报 + `[战果]` 进展 |
| Leader → All | `broadcast` | Critical 发现、竞争激励、信任升级通知 |
