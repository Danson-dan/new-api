package controller

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math/rand"
	"net"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting/ratio_setting"

	"github.com/gin-gonic/gin"
)

// 上游地址
const (
	upstreamModelsURL  = "https://basellm.github.io/llm-metadata/api/newapi/models.json"
	upstreamVendorsURL = "https://basellm.github.io/llm-metadata/api/newapi/vendors.json"
)

func normalizeLocale(locale string) (string, bool) {
	l := strings.ToLower(strings.TrimSpace(locale))
	switch l {
	case "en", "zh-CN", "zh-TW", "ja":
		return l, true
	default:
		return "", false
	}
}

func getUpstreamBase() string {
	return common.GetEnvOrDefaultString("SYNC_UPSTREAM_BASE", "https://basellm.github.io/llm-metadata")
}

func getUpstreamURLs(locale string) (modelsURL, vendorsURL string) {
	base := strings.TrimRight(getUpstreamBase(), "/")
	if l, ok := normalizeLocale(locale); ok && l != "" {
		return fmt.Sprintf("%s/api/i18n/%s/newapi/models.json", base, l),
			fmt.Sprintf("%s/api/i18n/%s/newapi/vendors.json", base, l)
	}
	return fmt.Sprintf("%s/api/newapi/models.json", base), fmt.Sprintf("%s/api/newapi/vendors.json", base)
}

// getEasyRouterChannels 查询所有启用状态的 EasyRouter 渠道
func getEasyRouterChannels() ([]*model.Channel, error) {
	channels, err := model.GetAllChannels(0, 0, true, false)
	if err != nil {
		return nil, err
	}
	var result []*model.Channel
	for _, ch := range channels {
		if ch.Type == constant.ChannelTypeEasyRouter && ch.Status == common.ChannelStatusEnabled {
			result = append(result, ch)
		}
	}
	return result, nil
}

// fetchModelsFromChannel 用渠道密钥调用 /v1/models，返回模型名列表
func fetchModelsFromChannel(ctx context.Context, client *http.Client, ch *model.Channel) (modelNames []string, err error) {
	baseURL := ch.GetBaseURL()
	if baseURL == "" {
		baseURL = constant.ChannelBaseURLs[ch.Type]
	}
	baseURL = strings.TrimRight(baseURL, "/")
	modelsURL := baseURL + "/v1/models"

	key, _, apiErr := ch.GetNextEnabledKey()
	if apiErr != nil {
		return nil, fmt.Errorf("获取密钥失败: %w", apiErr)
	}
	key = strings.TrimSpace(key)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, modelsURL, nil)
	if err != nil {
		return nil, fmt.Errorf("构建请求失败: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+key)

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("请求失败: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errBody struct {
			Error struct {
				Message string `json:"message"`
			} `json:"error"`
		}
		limited := io.LimitReader(resp.Body, 4096)
		body, _ := io.ReadAll(limited)
		json.Unmarshal(body, &errBody)
		if errBody.Error.Message != "" {
			return nil, fmt.Errorf(errBody.Error.Message)
		}
		return nil, fmt.Errorf("HTTP %s", resp.Status)
	}

	var modelsResp OpenAIModelsResponse
	limited := io.LimitReader(resp.Body, 5<<20)
	body, err := io.ReadAll(limited)
	if err != nil {
		return nil, fmt.Errorf("读取响应失败: %w", err)
	}
	if err := common.Unmarshal(body, &modelsResp); err != nil {
		return nil, fmt.Errorf("解析模型列表失败: %w", err)
	}

	seen := make(map[string]struct{})
	for _, m := range modelsResp.Data {
		name := strings.TrimSpace(m.ID)
		if name == "" {
			continue
		}
		if _, ok := seen[name]; ok {
			continue
		}
		seen[name] = struct{}{}
		modelNames = append(modelNames, name)
	}
	return modelNames, nil
}

type upstreamEnvelope[T any] struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Data    []T    `json:"data"`
}

type upstreamModel struct {
	Description          string          `json:"description"`
	Endpoints            json.RawMessage `json:"endpoints"`
	Icon                 string          `json:"icon"`
	ModelName            string          `json:"model_name"`
	NameRule             int             `json:"name_rule"`
	PricePerMInput       *float64        `json:"price_per_m_input"`
	PricePerMOutput      *float64        `json:"price_per_m_output"`
	PricePerMCacheRead   *float64        `json:"price_per_m_cache_read"`
	PricePerMCacheWrite  *float64        `json:"price_per_m_cache_write"`
	RatioCache           *float64        `json:"ratio_cache"`
	RatioCompletion      *float64        `json:"ratio_completion"`
	RatioModel           *float64        `json:"ratio_model"`
	Status               int             `json:"status"`
	Tags                 string          `json:"tags"`
	VendorName           string          `json:"vendor_name"`
}

type upstreamVendor struct {
	Description string `json:"description"`
	Icon        string `json:"icon"`
	Name        string `json:"name"`
	Status      int    `json:"status"`
}

var (
	etagCache  = make(map[string]string)
	bodyCache  = make(map[string][]byte)
	cacheMutex sync.RWMutex
)

func newHTTPClient() *http.Client {
	timeoutSec := common.GetEnvOrDefault("SYNC_HTTP_TIMEOUT_SECONDS", 10)
	dialer := &net.Dialer{Timeout: time.Duration(timeoutSec) * time.Second}
	transport := &http.Transport{
		MaxIdleConns:          100,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   time.Duration(timeoutSec) * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
		ResponseHeaderTimeout: time.Duration(timeoutSec) * time.Second,
		TLSClientConfig: &tls.Config{
			MinVersion: tls.VersionTLS12,
		},
	}
	if common.TLSInsecureSkipVerify {
		transport.TLSClientConfig = common.InsecureTLSConfig
	}
	transport.DialContext = func(ctx context.Context, network, addr string) (net.Conn, error) {
		host, _, err := net.SplitHostPort(addr)
		if err != nil {
			host = addr
		}
		if strings.HasSuffix(host, "github.io") {
			if conn, err := dialer.DialContext(ctx, "tcp4", addr); err == nil {
				return conn, nil
			}
			return dialer.DialContext(ctx, "tcp6", addr)
		}
		return dialer.DialContext(ctx, network, addr)
	}
	return &http.Client{Transport: transport}
}

var (
	httpClientOnce sync.Once
	httpClient     *http.Client
)

func getHTTPClient() *http.Client {
	httpClientOnce.Do(func() {
		httpClient = newHTTPClient()
	})
	return httpClient
}

func fetchJSON[T any](ctx context.Context, url string, out *upstreamEnvelope[T]) error {
	var lastErr error
	attempts := common.GetEnvOrDefault("SYNC_HTTP_RETRY", 3)
	if attempts < 1 {
		attempts = 1
	}
	baseDelay := 200 * time.Millisecond
	maxMB := common.GetEnvOrDefault("SYNC_HTTP_MAX_MB", 10)
	maxBytes := int64(maxMB) << 20
	for attempt := 0; attempt < attempts; attempt++ {
		req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
		if err != nil {
			return err
		}
		// ETag conditional request
		cacheMutex.RLock()
		if et := etagCache[url]; et != "" {
			req.Header.Set("If-None-Match", et)
		}
		cacheMutex.RUnlock()

		resp, err := getHTTPClient().Do(req)
		if err != nil {
			lastErr = err
			// backoff with jitter
			sleep := baseDelay * time.Duration(1<<attempt)
			jitter := time.Duration(rand.Intn(150)) * time.Millisecond
			time.Sleep(sleep + jitter)
			continue
		}
		func() {
			defer resp.Body.Close()
			switch resp.StatusCode {
			case http.StatusOK:
				// read body into buffer for caching and flexible decode
				limited := io.LimitReader(resp.Body, maxBytes)
				buf, err := io.ReadAll(limited)
				if err != nil {
					lastErr = err
					return
				}
				// cache body and ETag
				cacheMutex.Lock()
				if et := resp.Header.Get("ETag"); et != "" {
					etagCache[url] = et
				}
				bodyCache[url] = buf
				cacheMutex.Unlock()

				// Try decode as envelope first
				if err := json.Unmarshal(buf, out); err != nil {
					// Try decode as pure array
					var arr []T
					if err2 := json.Unmarshal(buf, &arr); err2 != nil {
						lastErr = err
						return
					}
					out.Success = true
					out.Data = arr
					out.Message = ""
				} else {
					if !out.Success && len(out.Data) == 0 && out.Message == "" {
						out.Success = true
					}
				}
				lastErr = nil
			case http.StatusNotModified:
				// use cache
				cacheMutex.RLock()
				buf := bodyCache[url]
				cacheMutex.RUnlock()
				if len(buf) == 0 {
					lastErr = errors.New("cache miss for 304 response")
					return
				}
				if err := json.Unmarshal(buf, out); err != nil {
					var arr []T
					if err2 := json.Unmarshal(buf, &arr); err2 != nil {
						lastErr = err
						return
					}
					out.Success = true
					out.Data = arr
					out.Message = ""
				} else {
					if !out.Success && len(out.Data) == 0 && out.Message == "" {
						out.Success = true
					}
				}
				lastErr = nil
			default:
				lastErr = errors.New(resp.Status)
			}
		}()
		if lastErr == nil {
			return nil
		}
		sleep := baseDelay * time.Duration(1<<attempt)
		jitter := time.Duration(rand.Intn(150)) * time.Millisecond
		time.Sleep(sleep + jitter)
	}
	return lastErr
}

// SyncUpstreamModels 从 EasyRouter 上游同步模型元数据
// 流程：
//  1. 获取所有启用的 EasyRouter 渠道
//  2. 调 /v1/models 拉取模型名列表
//  3. 对 models 表中不存在的模型名，自动创建元数据记录
//  4. 自动创建 "EasyRouter" 供应商（如不存在）
func SyncUpstreamModels(c *gin.Context) {
	timeoutSec := common.GetEnvOrDefault("SYNC_HTTP_TIMEOUT_SECONDS", 30)
	ctx, cancel := context.WithTimeout(c.Request.Context(), time.Duration(timeoutSec)*time.Second)
	defer cancel()

	easyRouterChannels, err := getEasyRouterChannels()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "查询渠道失败: " + err.Error()})
		return
	}
	if len(easyRouterChannels) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "没有可用的 EasyRouter 渠道，请先配置并启用一个 easyrouter 类型渠道",
		})
		return
	}

	client := getHTTPClient()

	// 确保 "EasyRouter" 供应商存在
	vendorName := "EasyRouter"
	var vendor model.Vendor
	if err := model.DB.Where("name = ?", vendorName).First(&vendor).Error; err != nil {
		vendor = model.Vendor{
			Name:        vendorName,
			Description: "EasyRouter 中转平台",
		}
		if err := vendor.Insert(); err != nil {
			common.SysError("创建 EasyRouter 供应商失败: " + err.Error())
		}
	}

	// 获取 models 表中已有的模型名
	var existingNames []string
	model.DB.Model(&model.Model{}).Pluck("model_name", &existingNames)
	existingSet := make(map[string]struct{}, len(existingNames))
	for _, n := range existingNames {
		existingSet[n] = struct{}{}
	}

	createdModels := 0
	createdList := make([]string, 0, 100)
	skipped := make([]string, 0)

	type channelResult struct {
		ChannelName   string   `json:"channel_name"`
		ChannelID     int      `json:"channel_id"`
		Error         string   `json:"error,omitempty"`
		ModelsFetched int      `json:"models_fetched"`
		ModelsCreated int      `json:"models_created"`
	}
	var channelResults []channelResult

	for _, ch := range easyRouterChannels {
		cr := channelResult{
			ChannelName: ch.Name,
			ChannelID:   ch.Id,
		}

		modelNames, fetchErr := fetchModelsFromChannel(ctx, client, ch)
		if fetchErr != nil {
			cr.Error = fetchErr.Error()
			channelResults = append(channelResults, cr)
			continue
		}
		cr.ModelsFetched = len(modelNames)
		createdFromChannel := 0

		for _, modelName := range modelNames {
			if _, exists := existingSet[modelName]; exists {
				continue
			}
			existingSet[modelName] = struct{}{}

			mi := &model.Model{
				ModelName: modelName,
				VendorID:  vendor.Id,
				Status:    1,
			}
			if err := mi.Insert(); err == nil {
				createdFromChannel++
				createdModels++
				createdList = append(createdList, modelName)
			} else {
				skipped = append(skipped, modelName)
			}
		}
		cr.ModelsCreated = createdFromChannel
		channelResults = append(channelResults, cr)
	}

	ginResults := make([]gin.H, len(channelResults))
	for i, cr := range channelResults {
		item := gin.H{
			"channel_name":   cr.ChannelName,
			"channel_id":     cr.ChannelID,
			"models_fetched": cr.ModelsFetched,
			"models_created": cr.ModelsCreated,
		}
		if cr.Error != "" {
			item["error"] = cr.Error
		}
		ginResults[i] = item
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"created_models":  createdModels,
			"skipped_models":  skipped,
			"created_list":    createdList,
			"channel_results": ginResults,
		},
	})
}

func chooseStatus(primary, fallback int) int {
	if primary == 0 && fallback != 0 {
		return fallback
	}
	if primary != 0 {
		return primary
	}
	return 1
}

// SyncUpstreamPreview 预览上游与本地的差异（仅用于弹窗选择）
func SyncUpstreamPreview(c *gin.Context) {
	// 1) 拉取上游数据
	timeoutSec := common.GetEnvOrDefault("SYNC_HTTP_TIMEOUT_SECONDS", 15)
	ctx, cancel := context.WithTimeout(c.Request.Context(), time.Duration(timeoutSec)*time.Second)
	defer cancel()

	locale := c.Query("locale")
	modelsURL, vendorsURL := getUpstreamURLs(locale)

	var vendorsEnv upstreamEnvelope[upstreamVendor]
	var modelsEnv upstreamEnvelope[upstreamModel]
	var fetchErr error
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		_ = fetchJSON(ctx, vendorsURL, &vendorsEnv)
	}()
	go func() {
		defer wg.Done()
		if err := fetchJSON(ctx, modelsURL, &modelsEnv); err != nil {
			fetchErr = err
		}
	}()
	wg.Wait()
	if fetchErr != nil {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "获取上游模型失败: " + fetchErr.Error(), "locale": locale, "source_urls": gin.H{"models_url": modelsURL, "vendors_url": vendorsURL}})
		return
	}

	vendorByName := make(map[string]upstreamVendor)
	for _, v := range vendorsEnv.Data {
		if v.Name != "" {
			vendorByName[v.Name] = v
		}
	}
	modelByName := make(map[string]upstreamModel)
	upstreamNames := make([]string, 0, len(modelsEnv.Data))
	for _, m := range modelsEnv.Data {
		if m.ModelName != "" {
			modelByName[m.ModelName] = m
			upstreamNames = append(upstreamNames, m.ModelName)
		}
	}

	// 2) 本地已有模型
	var locals []model.Model
	if len(upstreamNames) > 0 {
		_ = model.DB.Where("model_name IN ? AND sync_official <> 0", upstreamNames).Find(&locals).Error
	}

	// 本地 vendor 名称映射
	vendorIdSet := make(map[int]struct{})
	for _, m := range locals {
		if m.VendorID != 0 {
			vendorIdSet[m.VendorID] = struct{}{}
		}
	}
	vendorIDs := make([]int, 0, len(vendorIdSet))
	for id := range vendorIdSet {
		vendorIDs = append(vendorIDs, id)
	}
	idToVendorName := make(map[int]string)
	if len(vendorIDs) > 0 {
		var dbVendors []model.Vendor
		_ = model.DB.Where("id IN ?", vendorIDs).Find(&dbVendors).Error
		for _, v := range dbVendors {
			idToVendorName[v.Id] = v.Name
		}
	}

	// 3) 缺失且上游存在的模型
	missingList, _ := model.GetMissingModels()
	var missing []string
	for _, name := range missingList {
		if _, ok := modelByName[name]; ok {
			missing = append(missing, name)
		}
	}

	// 4) 计算冲突字段
	type conflictField struct {
		Field    string      `json:"field"`
		Local    interface{} `json:"local"`
		Upstream interface{} `json:"upstream"`
	}
	type conflictItem struct {
		ModelName string          `json:"model_name"`
		Fields    []conflictField `json:"fields"`
	}

	var conflicts []conflictItem
	for _, local := range locals {
		up, ok := modelByName[local.ModelName]
		if !ok {
			continue
		}
		fields := make([]conflictField, 0, 6)
		if strings.TrimSpace(local.Description) != strings.TrimSpace(up.Description) {
			fields = append(fields, conflictField{Field: "description", Local: local.Description, Upstream: up.Description})
		}
		if strings.TrimSpace(local.Icon) != strings.TrimSpace(up.Icon) {
			fields = append(fields, conflictField{Field: "icon", Local: local.Icon, Upstream: up.Icon})
		}
		if strings.TrimSpace(local.Tags) != strings.TrimSpace(up.Tags) {
			fields = append(fields, conflictField{Field: "tags", Local: local.Tags, Upstream: up.Tags})
		}
		// vendor 对比使用名称
		localVendor := idToVendorName[local.VendorID]
		if strings.TrimSpace(localVendor) != strings.TrimSpace(up.VendorName) {
			fields = append(fields, conflictField{Field: "vendor", Local: localVendor, Upstream: up.VendorName})
		}
		if local.NameRule != up.NameRule {
			fields = append(fields, conflictField{Field: "name_rule", Local: local.NameRule, Upstream: up.NameRule})
		}
		if local.Status != chooseStatus(up.Status, local.Status) {
			fields = append(fields, conflictField{Field: "status", Local: local.Status, Upstream: up.Status})
		}
		if len(fields) > 0 {
			conflicts = append(conflicts, conflictItem{ModelName: local.ModelName, Fields: fields})
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"missing":   missing,
			"conflicts": conflicts,
			"source": gin.H{
				"locale":      locale,
				"models_url":  modelsURL,
				"vendors_url": vendorsURL,
			},
		},
	})
}

// SyncUpstreamModelPricing 从 EasyRouter 渠道同步模型定价
// 流程：
//  1. 查 DB 中所有启用的 EasyRouter 渠道
//  2. 调 /v1/models 拉取模型名列表
//  3. 用内置 defaultModelRatio 计算 UpstreamPrice（正价）和 ModelRatio
//  4. 同时创建 models 表元数据（若模型不存在）
//  5. 通过 model.UpdateOption 持久化到 options 表 + 更新内存
func SyncUpstreamModelPricing(c *gin.Context) {
	timeoutSec := common.GetEnvOrDefault("SYNC_HTTP_TIMEOUT_SECONDS", 30)
	ctx, cancel := context.WithTimeout(c.Request.Context(), time.Duration(timeoutSec)*time.Second)
	defer cancel()

	easyRouterChannels, err := getEasyRouterChannels()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "查询渠道失败: " + err.Error(),
		})
		return
	}
	if len(easyRouterChannels) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "没有可用的 EasyRouter 渠道，请先配置并启用一个 easyrouter 类型渠道",
		})
		return
	}

	client := getHTTPClient()
	defaultRatios := ratio_setting.GetDefaultModelRatioMap()

	// 确保 "EasyRouter" 供应商和已存在的模型名（用于创建元数据）
	vendorName := "EasyRouter"
	var vendor model.Vendor
	if err := model.DB.Where("name = ?", vendorName).First(&vendor).Error; err != nil {
		vendor = model.Vendor{
			Name:        vendorName,
			Description: "EasyRouter 中转平台",
		}
		if err := vendor.Insert(); err != nil {
			common.SysError("创建 EasyRouter 供应商失败: " + err.Error())
		}
	}

	var existingModelNames []string
	model.DB.Model(&model.Model{}).Pluck("model_name", &existingModelNames)
	existingModelSet := make(map[string]struct{}, len(existingModelNames))
	for _, n := range existingModelNames {
		existingModelSet[n] = struct{}{}
	}
	newModelsCreated := 0

	existingUpstreamPrice := ratio_setting.GetUpstreamPriceMap()
	existingModelRatio := ratio_setting.GetModelRatioCopy()
	existingCompletionRatio := ratio_setting.GetCompletionRatioCopy()

	upstreamPrices := make(map[string]float64, len(existingUpstreamPrice)+100)
	modelRatios := make(map[string]float64, len(existingModelRatio)+100)
	completionRatios := make(map[string]float64, len(existingCompletionRatio)+100)

	for k, v := range existingUpstreamPrice {
		upstreamPrices[k] = v
	}
	for k, v := range existingModelRatio {
		modelRatios[k] = v
	}
	for k, v := range existingCompletionRatio {
		completionRatios[k] = v
	}

	type channelResult struct {
		ChannelName    string `json:"channel_name"`
		ChannelID      int    `json:"channel_id"`
		Error          string `json:"error,omitempty"`
		ModelsFetched  int    `json:"models_fetched"`
		ModelsSynced   int    `json:"models_synced"`
	}
	var channelResults []channelResult
	totalSynced := 0
	syncedList := make([]string, 0, 100)
	seenModels := make(map[string]struct{})

	for _, ch := range easyRouterChannels {
		cr := channelResult{
			ChannelName: ch.Name,
			ChannelID:   ch.Id,
		}

		modelNames, fetchErr := fetchModelsFromChannel(ctx, client, ch)
		if fetchErr != nil {
			cr.Error = fetchErr.Error()
			channelResults = append(channelResults, cr)
			continue
		}
		cr.ModelsFetched = len(modelNames)
		syncedThisChannel := 0

		for _, modelName := range modelNames {
			if _, seen := seenModels[modelName]; seen {
				continue
			}
			seenModels[modelName] = struct{}{}

			// 创建 models 表元数据（如果还不存在）
			if _, exists := existingModelSet[modelName]; !exists {
				mi := &model.Model{
					ModelName: modelName,
					VendorID:  vendor.Id,
					Status:    1,
				}
				if err := mi.Insert(); err == nil {
					existingModelSet[modelName] = struct{}{}
					newModelsCreated++
				}
			}

			normalizedName := ratio_setting.FormatMatchingModelName(modelName)
			var ratio float64
			var found bool
			if r, ok := defaultRatios[normalizedName]; ok {
				ratio = r
				found = true
			} else if r, ok := defaultRatios[modelName]; ok {
				ratio = r
				found = true
			}
			if !found || ratio <= 0 {
				continue
			}

			upstreamPrices[modelName] = ratio * 2.0
			modelRatios[modelName] = ratio
			if compRatio := ratio_setting.GetCompletionRatio(modelName); compRatio > 0 {
				completionRatios[modelName] = compRatio
			}

			syncedThisChannel++
			totalSynced++
			syncedList = append(syncedList, modelName)
		}
		cr.ModelsSynced = syncedThisChannel
		channelResults = append(channelResults, cr)
	}

	if totalSynced == 0 && len(channelResults) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "未能从任何渠道获取到模型列表",
		})
		return
	}

	upstreamPriceJSON, _ := json.Marshal(upstreamPrices)
	modelRatioJSON, _ := json.Marshal(modelRatios)
	completionRatioJSON, _ := json.Marshal(completionRatios)

	if err := model.UpdateOption("UpstreamPrice", string(upstreamPriceJSON)); err != nil {
		common.SysError("持久化 UpstreamPrice 失败: " + err.Error())
	}
	if err := model.UpdateOption("ModelRatio", string(modelRatioJSON)); err != nil {
		common.SysError("持久化 ModelRatio 失败: " + err.Error())
	}
	if err := model.UpdateOption("CompletionRatio", string(completionRatioJSON)); err != nil {
		common.SysError("持久化 CompletionRatio 失败: " + err.Error())
	}

	ratio_setting.InvalidateExposedDataCache()

	ginResults := make([]gin.H, len(channelResults))
	for i, cr := range channelResults {
		ginResults[i] = gin.H{
			"channel_name":   cr.ChannelName,
			"channel_id":     cr.ChannelID,
			"models_fetched": cr.ModelsFetched,
			"models_synced":  cr.ModelsSynced,
		}
		if cr.Error != "" {
			ginResults[i]["error"] = cr.Error
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"synced_models":     totalSynced,
			"synced_list":       syncedList,
			"new_models_created": newModelsCreated,
			"channel_results":   ginResults,
		},
	})
}
