# Release Notes

## 2026-06-29 — 上游定价同步、全量转发兜底与定价体系重构

### 新功能

- **EasyRouter 上游定价同步**: `SyncUpstreamModelPricing` 优先从 EasyRouter `/v1/pricing` 拉取上游实际定价（含 input/output 价格），失败时回退到本地倍率计算。
- **全量转发兜底 (`RouteAllToEasyRouter`)**: 新增全局开关，开启后当 auto groups 无可用渠道时，自动将请求兜底到 EasyRouter 类型渠道。
- **按渠道类型选路**: 新增 `GetRandomSatisfiedChannelByType`，支持不限制 group、仅按渠道类型查找可用渠道。

### 定价体系重构

- **统一 `StandardPriceDivisor` 常量** (值 `2.0`): 替换所有硬编码 `2.0`，统一后端 (`ratio_setting.StandardPriceDivisor`) 和前端 (`STANDARD_PRICE_DIVISOR`) 的 model_ratio ↔ $/1M tokens 转换。
- **新增 `UpstreamPrice` / `ActualMarkup` 字段**: 与 `DisplayDiscount` 解耦。前端展示用 DisplayDiscount，后端扣费用 ActualMarkup，两者独立。
- **价格计算公式**: `modelRatio = upstreamPrice × actualMarkup / StandardPriceDivisor`
- **定价缓存自动失效**: 修改 ModelRatio、CompletionRatio、ModelPrice 等定价相关选项时自动调用 `InvalidatePricingCache()`。

### 性能指标 (`pkg/perf_metrics`)

- Redis 活跃桶聚合支持按模型跨全部分组扫描 (`mergeRedisActiveBuckets` / `mergeRedisActiveBucketsAll`)。
- 新增 `parseRedisBucketKey` 解析 Redis key 中的 model/group/timestamp。

### 前端

- 定价卡片：支持 `upstream_price` 判断折扣展示，`display_discount` 默认 85 折。
- Token 价格计算：优先使用 `upstreamPrice × displayDiscount` 公式，否则回退 `modelRatio × STANDARD_PRICE_DIVISOR`。
- 倍率设置卡片：新增 UpstreamPrice 和 ActualMarkup 展示与编辑。
- i18n：新增上游正价、实际加价等翻译键 (en/zh)。

### 渠道

- EasyRouter 注册为 stream-supported channel。
- ModelList 补充文档注释说明静态列表与动态模型的协作方式。

### 文档

- CLAUDE.md：新增行为准则章节（Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution）。

### 变更文件

| 文件 | 变更 |
|------|------|
| `controller/model_sync.go` | 新增 `fetchUpstreamPricing`，重构定价同步 |
| `controller/ratio_sync.go` | 硬编码 2.0 → StandardPriceDivisor |
| `model/channel_cache.go` | 新增 `GetRandomSatisfiedChannelByType` + `containsModel` |
| `model/option.go` | RouteAllToEasyRouter 配置 + 定价缓存失效 |
| `model/pricing.go` | 新增 UpstreamPrice/ActualMarkup 字段 |
| `pkg/perf_metrics/metrics.go` | Redis 跨 group 扫描 + key 解析 |
| `relay/channel/easyrouter/constants.go` | 文档注释完善 |
| `relay/common/relay_info.go` | EasyRouter stream 支持 |
| `relay/helper/price.go` | 重构价格计算公式 |
| `service/channel_select.go` | EasyRouter 兜底逻辑 |
| `setting/auto_group.go` | 新增 RouteAllToEasyRouter 变量 |
| `setting/ratio_setting/model_ratio.go` | 新增 StandardPriceDivisor 常量 |
| `web/default/src/features/pricing/` | 定价卡片、常量、价格计算、类型定义更新 |
| `web/default/src/features/system-settings/` | 倍率设置卡片 + section registry 更新 |
| `web/default/src/i18n/locales/` | en/zh 新增翻译键 |
| `CLAUDE.md` | 新增行为准则章节 |
