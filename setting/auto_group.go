package setting

import (
	"github.com/QuantumNous/new-api/common"
)

var autoGroups = []string{
	"default",
}

var DefaultUseAutoGroup = false

// RouteAllToEasyRouter 全量转发到 EasyRouter 模式
// 开启后，所有请求在 auto groups 无可用渠道时，自动兜底到 EasyRouter 类型渠道
var RouteAllToEasyRouter = false

func ContainsAutoGroup(group string) bool {
	for _, autoGroup := range autoGroups {
		if autoGroup == group {
			return true
		}
	}
	return false
}

func UpdateAutoGroupsByJsonString(jsonString string) error {
	autoGroups = make([]string, 0)
	return common.Unmarshal([]byte(jsonString), &autoGroups)
}

func AutoGroups2JsonString() string {
	jsonBytes, err := common.Marshal(autoGroups)
	if err != nil {
		return "[]"
	}
	return string(jsonBytes)
}

func GetAutoGroups() []string {
	return autoGroups
}
