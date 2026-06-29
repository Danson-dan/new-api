/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter渠道常量定义
 */
package easyrouter

// ChannelName 渠道名称
const ChannelName = "easyrouter"

// ModelList EasyRouter支持的模型列表（用于 /v1/models 端点）
//
// 注意：此列表为手动维护的静态列表，在 init() 时用于构建 openAIModels。
// 通过上游同步 (SyncUpstreamModels) 创建的 DB 模型记录可直接用于 relay，
// 但不会自动出现在 /v1/models 端点返回中。
// 新增模型时需要同步更新此列表。
//
// 如需动态加载：可在 model_sync.go 同步完成后触发重建 openAIModels，
// 或修改 controller/model.go 的 ListModels 在运行时合并 DB 记录。
var ModelList = []string{
	"gpt-4o",
	"gpt-4o-mini",
	"gpt-4.1",
	"gpt-5.4-nano",
	"claude-3-5-sonnet",
	"claude-3-opus",
	"gemini-1.5-pro",
	"gemini-1.5-flash",
	"deepseek-chat",
	"moonshot-v1-8k",
	"moonshot-v1-32k",
	"qwen-max",
	"qwen-plus",
	"glm-4",
	"glm-4v",
	"doubao-3.5",
	"yi-34b-chat",
}