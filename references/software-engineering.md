# 软件工程原则速查 — P8 必须内化的设计决策框架

这不是教科书摘抄。这是你在设计模块时必须过一遍的清单。每个原则后面都跟着"什么时候用"和"什么时候别用"——因为盲目套用设计模式和不用一样蠢。

---

## SOLID 原则速查

### S — 单一职责 (Single Responsibility)

**一个模块只有一个改变的理由。**

- 信号：如果你描述一个函数/类时要说"它做 A，还做 B"——违反了
- 测试：能用一句话（不含"还有"）描述这个模块是什么吗？
- 常见违反：Controller 同时处理 HTTP + 业务逻辑 + 数据库操作

**怎么拆？** 按变化轴线拆，不是按行数拆。如果 HTTP 解析逻辑和业务逻辑会因为不同的原因变化，就应该分开。

### O — 开闭原则 (Open/Closed)

**对扩展开放，对修改封闭。**

- 信号：每次加一种新类型/新行为，都要修改已有代码 → 缺少抽象层
- 常见实现：Strategy 模式、多态、插件机制、Hook 系统
- 过度信号：为了"以后可能"的扩展设计了 5 层抽象，但目前只有 1 种实现

**黄金问题：** 如果需求变了，我能通过"新增"而不是"修改"来响应吗？

### L — 里氏替换 (Liskov Substitution)

**子类必须能替换父类而不破坏程序。**

- 信号：子类重写父类方法时抛出"不支持"异常，或行为语义完全变了
- 常见违反：重写方法后缩小了前置条件，或扩大了后置条件

**实践中更多表现为：** 接口实现者必须完整实现接口语义，而不是"大部分实现"。

### I — 接口隔离 (Interface Segregation)

**客户端不应该依赖它不使用的接口。**

- 信号：实现一个接口时，有几个方法永远返回 `null` 或 `throw UnsupportedOperation`
- 解法：拆成小接口。宁愿 3 个小接口，不要 1 个大接口

### D — 依赖倒置 (Dependency Inversion)

**高层模块不依赖低层模块，两者都依赖抽象。**

- 信号：业务逻辑层直接 `new Database()` 或 `new EmailService()`
- 解法：依赖注入（DI）。通过构造器/参数接收接口，而不是自己创建实例
- 收益：可测试（可以注入 mock）、可替换（换实现不改调用方）

---

## 常用设计模式速查（选型指南）

### 什么时候用什么模式

| 场景 | 推荐模式 | 避免 |
|------|---------|------|
| 同一操作有多种实现，运行时切换 | Strategy | if/else 链 |
| 需要通知多个观察者 | Observer/EventEmitter | 直接调用 |
| 创建复杂对象，隐藏构建细节 | Builder/Factory | 暴露所有构造参数 |
| 需要扩展第三方类行为 | Decorator | 继承 |
| 统一多个不兼容接口 | Adapter | 到处写转换代码 |
| 某类只需一个实例 | Singleton（谨慎用） | 全局变量 |
| 一步步执行算法，步骤可替换 | Template Method | 重复代码 |
| 处理对象树/层级结构 | Composite | 递归 if/else |
| 把操作封装成对象（可撤销/重做）| Command | 直接调用函数 |

### 什么时候不要用设计模式

- 当前只有一种实现 → 不需要 Strategy
- 对象只被创建一次 → 不需要 Factory
- 只有 2-3 个 if → 不需要 Strategy
- 为了"以后可能用" → 不需要任何模式，等真的需要时再重构

**反面教材：** 写了 5 层抽象但只有一个实现 = 你用复杂性自嗨 = over-engineer = 3.25

---

## 架构分层原则

### 经典三层

```
接口层 (Controllers/Routes/Handlers)
    ↓ 只调用业务层
业务层 (Services/Use Cases/Domain)
    ↓ 只调用数据层
数据层 (Repositories/DAOs/Adapters)
```

**依赖方向只能向下，绝不向上。**

- 业务层不知道有没有 HTTP
- 数据层不知道有没有业务逻辑
- 接口层不直接查数据库

### 常见违反

- Controller 直接写 SQL → 接口层越界到数据层
- Service 依赖 `req` 对象 → 业务层泄露接口层细节
- Repository 处理业务规则 → 数据层越界到业务层

### 如何判断自己在哪层

问：如果我把这个函数的调用者从 HTTP 换成 CLI，这段代码还能用吗？
- 能 → 你在业务层或以下，正确
- 不能 → 你的业务逻辑和接口层耦合了

---

## 扩展性设计速查

### 扩展点识别

问自己："这个模块的哪个部分**最可能**在未来变化？"

常见变化点：
- 支持新的第三方服务（支付、通知、存储）→ 用接口 + 依赖注入预留
- 支持新的数据格式（JSON/XML/Protobuf）→ 用 Codec/Serializer 抽象
- 支持新的计算规则（定价、权限、工作流）→ 用 Strategy 预留
- 支持新的存储后端（MySQL/Redis/文件）→ 用 Repository 接口隔离

### 扩展 vs 复杂度的平衡

只为**有证据**会变化的地方预留扩展点：
- 产品已经说了"以后要支持 X" → 预留
- 技术上已知会有多个实现 → 预留
- 感觉以后可能会变 → 不预留，等需要时重构

> 过早的扩展性 = 当前的复杂性。为不存在的需求建抽象是技术债，不是技术积累。

---

## 代码质量快速判断

### 坏味道速查

| 味道 | 症状 | 应对 |
|------|------|------|
| Long Function | 函数超过 40 行 | 按职责拆成小函数 |
| Long Parameter List | 参数超过 4 个 | 用对象封装，或检查职责是否合理 |
| Duplicate Code | 三处以上类似代码 | 提取公共函数/基类 |
| Feature Envy | 函数频繁访问另一个类的数据 | 考虑把函数移到那个类 |
| God Class | 一个类做了所有事情 | 按职责拆分 |
| Magic Number | 代码里散落的数字字面量 | 提取为命名常量 |
| Deep Nesting | 超过 3 层 if/for 嵌套 | 提前返回（Guard Clause）或提取函数 |
| Boolean Parameter | `doSomething(true)` 含义不明 | 用枚举/策略模式替代 |

### 判断抽象层级是否合适

好的函数名在同一抽象层级描述步骤：

```python
# 好：抽象层级一致
def process_order(order):
    validate_order(order)
    calculate_price(order)
    save_order(order)
    notify_customer(order)

# 坏：混了高低层级
def process_order(order):
    if order.items is None or len(order.items) == 0:  # 低层细节
        raise ValueError("empty")
    calculate_price(order)                             # 高层步骤
    db.execute("INSERT INTO orders ...")               # 低层细节
```

---

## 安全检查清单（代码开发时）

每写一段处理用户输入或外部数据的代码，过一遍：

- [ ] **输入验证**：所有来自用户/外部 API 的输入是否在边界处验证过？
- [ ] **SQL 注入**：有没有直接拼接 SQL 字符串？应该使用参数化查询
- [ ] **敏感数据**：密码/Token/Key 有没有出现在日志/响应/错误信息中？
- [ ] **权限检查**：操作执行前是否验证了调用方有权限做这件事？
- [ ] **错误暴露**：错误信息是否向外部暴露了内部实现细节？
- [ ] **依赖安全**：引入的第三方库是否有已知漏洞？

---

## 命名原则速查

**变量/参数**：名词，描述它是什么
- 好：`userCount`, `orderItems`, `maxRetry`
- 坏：`data`, `tmp`, `x`, `flag`

**函数/方法**：动词开头，描述它做什么
- 好：`calculateTax()`, `fetchUserById()`, `validateEmail()`
- 坏：`tax()`, `user()`, `check()`

**布尔变量/函数**：用 is/has/can/should 前缀
- 好：`isActive`, `hasPermission`, `canRetry`
- 坏：`active`, `permission`, `retry`

**事件处理**：用 on/handle 前缀
- 好：`onUserCreated`, `handlePaymentFailed`
- 坏：`userCreated`, `paymentFailed`
