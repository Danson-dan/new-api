/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter渠道适配实现，复用OpenAI适配逻辑
 */
package easyrouter

import (
	"io"
	"net/http"

	"github.com/QuantumNous/new-api/dto"
	"github.com/QuantumNous/new-api/relay/channel"
	"github.com/QuantumNous/new-api/relay/channel/openai"
	relaycommon "github.com/QuantumNous/new-api/relay/common"

	"github.com/gin-gonic/gin"
)

// Adaptor 实现 channel.Adaptor 接口，复用 OpenAI 的实现
type Adaptor struct {
	*openai.Adaptor
}

// Init 初始化 adaptor
func (a *Adaptor) Init(info *relaycommon.RelayInfo) {
	a.Adaptor = &openai.Adaptor{}
	a.Adaptor.Init(info)
}

// GetChannelName 返回渠道名称
func (a *Adaptor) GetChannelName() string {
	return ChannelName
}

// GetModelList 返回支持的模型列表
func (a *Adaptor) GetModelList() []string {
	return ModelList
}

// 以下方法直接委托给 OpenAI adaptor

func (a *Adaptor) GetRequestURL(info *relaycommon.RelayInfo) (string, error) {
	return a.Adaptor.GetRequestURL(info)
}

func (a *Adaptor) SetupRequestHeader(c *gin.Context, req *http.Header, info *relaycommon.RelayInfo) error {
	return a.Adaptor.SetupRequestHeader(c, req, info)
}

func (a *Adaptor) ConvertOpenAIRequest(c *gin.Context, info *relaycommon.RelayInfo, request *dto.GeneralOpenAIRequest) (any, error) {
	return a.Adaptor.ConvertOpenAIRequest(c, info, request)
}

func (a *Adaptor) ConvertRerankRequest(c *gin.Context, relayMode int, request dto.RerankRequest) (any, error) {
	return a.Adaptor.ConvertRerankRequest(c, relayMode, request)
}

func (a *Adaptor) ConvertEmbeddingRequest(c *gin.Context, info *relaycommon.RelayInfo, request dto.EmbeddingRequest) (any, error) {
	return a.Adaptor.ConvertEmbeddingRequest(c, info, request)
}

func (a *Adaptor) ConvertAudioRequest(c *gin.Context, info *relaycommon.RelayInfo, request dto.AudioRequest) (io.Reader, error) {
	return a.Adaptor.ConvertAudioRequest(c, info, request)
}

func (a *Adaptor) ConvertImageRequest(c *gin.Context, info *relaycommon.RelayInfo, request dto.ImageRequest) (any, error) {
	return a.Adaptor.ConvertImageRequest(c, info, request)
}

func (a *Adaptor) ConvertOpenAIResponsesRequest(c *gin.Context, info *relaycommon.RelayInfo, request dto.OpenAIResponsesRequest) (any, error) {
	return a.Adaptor.ConvertOpenAIResponsesRequest(c, info, request)
}

func (a *Adaptor) DoRequest(c *gin.Context, info *relaycommon.RelayInfo, requestBody io.Reader) (any, error) {
	return a.Adaptor.DoRequest(c, info, requestBody)
}

func (a *Adaptor) ConvertClaudeRequest(c *gin.Context, info *relaycommon.RelayInfo, request *dto.ClaudeRequest) (any, error) {
	return a.Adaptor.ConvertClaudeRequest(c, info, request)
}

func (a *Adaptor) ConvertGeminiRequest(c *gin.Context, info *relaycommon.RelayInfo, request *dto.GeminiChatRequest) (any, error) {
	return a.Adaptor.ConvertGeminiRequest(c, info, request)
}

// 确保 Adaptor 实现了 channel.Adaptor 接口
var _ channel.Adaptor = (*Adaptor)(nil)