// ============================================================================
// Channel Types (from constant/channel.go)
// All label/name values are i18n keys; use t(value) when displaying.
// ============================================================================

export const CHANNEL_TYPES = {
  0: 'Unknown',
  1: 'OpenAI',
  2: 'Midjourney',
  3: 'Azure',
  4: 'Ollama',
  5: 'MidjourneyPlus',
  6: 'OpenAIMax',
  7: 'OhMyGPT',
  8: 'Custom',
  9: 'AILS',
  10: 'AI Proxy',
  11: 'PaLM',
  12: 'API2GPT',
  13: 'AIGC2D',
  14: 'Anthropic',
  15: 'Baidu',
  16: 'Zhipu',
  17: 'Ali',
  18: 'Xunfei',
  19: '360',
  20: 'OpenRouter',
  21: 'AI Proxy Library',
  22: 'FastGPT',
  23: 'Tencent',
  24: 'Gemini',
  25: 'Moonshot',
  26: 'Zhipu V4',
  27: 'Perplexity',
  31: 'LingYiWanWu',
  33: 'AWS',
  34: 'Cohere',
  35: 'MiniMax',
  36: 'SunoAPI',
  37: 'Dify',
  38: 'Jina',
  39: 'Cloudflare',
  40: 'SiliconFlow',
  41: 'Vertex AI',
  42: 'Mistral',
  43: 'DeepSeek',
  44: 'MokaAI',
  45: 'VolcEngine',
  46: 'Baidu V2',
  47: 'Xinference',
  48: 'xAI',
  49: 'Coze',
  50: 'Kling',
  51: 'Jimeng',
  52: 'Vidu',
  53: 'Submodel',
  54: 'DoubaoVideo',
  55: 'Sora',
  56: 'Replicate',
  57: 'Codex',
  58: 'EasyRouter',
} as const

const CHANNEL_TYPE_DISPLAY_ORDER: number[] = [
  1, 14, 33, 24, 43, 3, 41, 48, 42, 34, 20, 4, 40, 27, 25, 17, 26, 15, 46, 23,
  18, 45, 31, 35, 49, 19, 47, 37, 38, 39, 11, 8, 57, 22, 21, 44, 2, 5, 36, 50,
  51, 52, 53, 54, 55, 56,
]

export const CHANNEL_TYPE_OPTIONS: { value: number; label: string }[] = (() => {
  const ordered: { value: number; label: string }[] = []
  const seen = new Set<number>()
  for (const id of CHANNEL_TYPE_DISPLAY_ORDER) {
    const label = CHANNEL_TYPES[id as keyof typeof CHANNEL_TYPES]
    if (label) {
      ordered.push({ value: id, label })
      seen.add(id)
    }
  }
  for (const [key, label] of Object.entries(CHANNEL_TYPES)) {
    const id = Number(key)
    if (id !== 0 && !seen.has(id)) {
      ordered.push({ value: id, label })
    }
  }
  return ordered
})()

// ============================================================================
// Channel Status (label values are i18n keys; use t(config.label) in components)
// ============================================================================

export const CHANNEL_STATUS = {
  UNKNOWN: 0,
  ENABLED: 1,
  MANUAL_DISABLED: 2,
  AUTO_DISABLED: 3,
} as const

export const CHANNEL_STATUS_LABELS = {
  [CHANNEL_STATUS.UNKNOWN]: 'Unknown',
  [CHANNEL_STATUS.ENABLED]: 'Enabled',
  [CHANNEL_STATUS.MANUAL_DISABLED]: 'Disabled',
  [CHANNEL_STATUS.AUTO_DISABLED]: 'Auto Disabled',
} as const

export const CHANNEL_STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'enabled', label: 'Enabled' },
  { value: 'disabled', label: 'Disabled' },
] as const

export const CHANNEL_STATUS_CONFIG = {
  [CHANNEL_STATUS.UNKNOWN]: {
    variant: 'neutral' as const,
    label: 'Unknown',
    showDot: true,
  },
  [CHANNEL_STATUS.ENABLED]: {
    variant: 'success' as const,
    label: 'Enabled',
    showDot: true,
  },
  [CHANNEL_STATUS.MANUAL_DISABLED]: {
    variant: 'neutral' as const,
    label: 'Disabled',
    showDot: true,
  },
  [CHANNEL_STATUS.AUTO_DISABLED]: {
    variant: 'danger' as const,
    label: 'Auto Disabled',
    showDot: true,
  },
}

// ============================================================================
// Multi-Key Status
// ============================================================================

export const MULTI_KEY_STATUS = {
  ENABLED: 1,
  MANUAL_DISABLED: 2,
  AUTO_DISABLED: 3,
} as const

export const MULTI_KEY_STATUS_LABELS = {
  [MULTI_KEY_STATUS.ENABLED]: 'Enabled',
  [MULTI_KEY_STATUS.MANUAL_DISABLED]: 'Manual Disabled',
  [MULTI_KEY_STATUS.AUTO_DISABLED]: 'Auto Disabled',
} as const

export const MULTI_KEY_STATUS_CONFIG = {
  [MULTI_KEY_STATUS.ENABLED]: {
    variant: 'success' as const,
    label: 'Enabled',
  },
  [MULTI_KEY_STATUS.MANUAL_DISABLED]: {
    variant: 'neutral' as const,
    label: 'Manual Disabled',
  },
  [MULTI_KEY_STATUS.AUTO_DISABLED]: {
    variant: 'danger' as const,
    label: 'Auto Disabled',
  },
}

// ============================================================================
// Multi-Key Modes
// ============================================================================

export const MULTI_KEY_MODES = [
  { value: 'random', label: 'Random' },
  { value: 'polling', label: 'Polling' },
] as const

export const ADD_MODE_OPTIONS = [
  { value: 'single', label: 'Single Key' },
  { value: 'batch', label: 'Batch Add (one key per line)' },
  {
    value: 'multi_to_single',
    label: 'Multi-Key Mode (multiple keys, one channel)',
  },
] as const

// ============================================================================
// Multi-Key Management
// ============================================================================

export const MULTI_KEY_FILTER_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: '1', label: 'Enabled' },
  { value: '2', label: 'Manual Disabled' },
  { value: '3', label: 'Auto Disabled' },
] as const

export const MULTI_KEY_CONFIRM_MESSAGES = {
  DELETE:
    'Are you sure you want to delete this key? This action cannot be undone.',
  ENABLE: 'Enable this key?',
  DISABLE: 'Disable this key?',
  ENABLE_ALL: 'Are you sure you want to enable all keys?',
  DISABLE_ALL: 'Are you sure you want to disable all enabled keys?',
  DELETE_DISABLED:
    'Are you sure you want to delete all auto-disabled keys? This action cannot be undone.',
} as const

// ============================================================================
// Auto Ban Options
// ============================================================================

export const AUTO_BAN_OPTIONS = [
  { value: 1, label: 'Enabled' },
  { value: 0, label: 'Disabled' },
] as const

// ============================================================================
// Error / Success Messages (i18n keys: use t(ERROR_MESSAGES.xxx) when displaying)
// ============================================================================

export const ERROR_MESSAGES = {
  REQUIRED_NAME: 'Channel name is required',
  REQUIRED_TYPE: 'Channel type is required',
  REQUIRED_KEY: 'API key is required',
  REQUIRED_MODELS: 'Models are required',
  REQUIRED_GROUP: 'Group is required',
  INVALID_JSON: 'Invalid JSON format',
  INVALID_MODEL_MAPPING: 'Invalid model mapping format',
  CREATE_FAILED: 'Failed to create channel',
  UPDATE_FAILED: 'Failed to update channel',
  DELETE_FAILED: 'Failed to delete channel',
  TEST_FAILED: 'Failed to test channel',
  BALANCE_QUERY_FAILED: 'Failed to query balance',
  FETCH_MODELS_FAILED: 'Failed to fetch models',
} as const

export const SUCCESS_MESSAGES = {
  CREATED: 'Channel created successfully',
  UPDATED: 'Channel updated successfully',
  DELETED: 'Channel deleted successfully',
  ENABLED: 'Channel enabled successfully',
  DISABLED: 'Channel disabled successfully',
  TESTED: 'Channel test completed',
  BALANCE_QUERIED: 'Balance queried successfully',
  MODELS_FETCHED: 'Models fetched successfully',
  COPIED: 'Channel copied successfully',
  TAG_SET: 'Tag set successfully',
  BATCH_DELETED: 'Channels deleted successfully',
} as const

// ============================================================================
// Default Values
// ============================================================================

export const DEFAULT_PAGE_SIZE = 20

export const DEFAULT_CHANNEL_VALUES = {
  name: '',
  type: 0,
  base_url: '',
  key: '',
  models: '',
  group: 'default',
  status: CHANNEL_STATUS.ENABLED,
  priority: 0,
  weight: 0,
  auto_ban: 1,
  remark: '',
} as const

// ============================================================================
// Table Configuration
// ============================================================================

export const CHANNELS_TABLE_PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// ============================================================================
// Sort Options (label values are i18n keys)
// ============================================================================

export const SORT_OPTIONS = [
  { value: 'priority', label: 'Priority (Default)' },
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
  { value: 'balance', label: 'Balance' },
  { value: 'response_time', label: 'Response Time' },
] as const

// ============================================================================
// Balance Display
// ============================================================================

export const BALANCE_THRESHOLDS = {
  LOW: 1,
  MEDIUM: 10,
  HIGH: 100,
} as const

// ============================================================================
// Response Time Thresholds (in ms)
// ============================================================================

export const RESPONSE_TIME_THRESHOLDS = {
  EXCELLENT: 500,
  GOOD: 1000,
  FAIR: 2000,
  POOR: 5000,
} as const

export const RESPONSE_TIME_CONFIG = {
  EXCELLENT: { variant: 'success' as const, label: 'Excellent' },
  GOOD: { variant: 'info' as const, label: 'Good' },
  FAIR: { variant: 'warning' as const, label: 'Fair' },
  POOR: { variant: 'danger' as const, label: 'Poor' },
  UNKNOWN: { variant: 'neutral' as const, label: 'Not tested' },
} as const

// ============================================================================
// Field Hints and Placeholders (i18n keys; use t() when displaying)
// ============================================================================

export const FIELD_PLACEHOLDERS = {
  NAME: '例如：EasyRouter 生产环境',
  BASE_URL: '留空则使用系统内置默认地址',
  KEY: '上游 API Key，批量添加时一行一个',
  MODELS: '模型名称用英文逗号分隔，例如：gpt-4o,gpt-4o-mini,claude-3-5-sonnet',
  GROUP: '选择可以使用此渠道的用户分组',
  MODEL_MAPPING: '{"客户端请求的模型名": "上游实际的模型名"}',
  TEST_MODEL: '连通性测试时使用的模型',
  TAG: '可选，给渠道打标签方便批量筛选',
  REMARK: '管理员内部备注，用户不可见',
  PARAM_OVERRIDE: '{"temperature": 0.7}',
  HEADER_OVERRIDE: '{"X-Custom-Header": "value"}',
  STATUS_CODE_MAPPING: '{"400": "500"} 表示上游返回400时改为返回500',
} as const

export const FIELD_DESCRIPTIONS = {
  NAME: '给渠道起一个好记的名字，方便在列表中辨识',
  TYPE: '上游服务商的类型。EasyRouter 选"EasyRouter"，OpenAI 选"OpenAI"等',
  BASE_URL:
    '自定义 API 地址。EasyRouter 等官方渠道已内置默认地址，除非使用第三方代理或特殊端点，否则留空即可。注意：不要加 /v1 或尾部斜杠',
  KEY: '上游服务商提供的 API Key。EasyRouter 填你在 easyrouter.io 后台获取的 sk- 开头的密钥。批量模式下一行填一个 Key',
  MODELS:
    '此渠道支持的模型列表，用英文逗号分隔。只有在此列表中的模型才会被路由到此渠道。EasyRouter 支持 gpt-4o, gpt-4o-mini, claude-3-5-sonnet, deepseek-chat 等',
  GROUP:
    '选择可以使用此渠道的用户分组。默认分组"default"表示所有用户可用。可根据需要创建多个分组，给不同用户分配不同分组',
  MODEL_MAPPING:
    '模型名称映射（JSON 格式）。例如用户请求"gpt-4"时实际调用上游的"gpt-4o"，填{"gpt-4":"gpt-4o"}',
  PRIORITY:
    '渠道优先级。数字越大越优先被选中。当有多个同类型渠道且都支持同一模型时，优先生效高优先级的渠道',
  WEIGHT:
    '负载均衡权重。当多个渠道优先级相同时，权重越高的渠道分配到的请求越多。例如 A 权重 1、B 权重 2，则 B 拿到 2/3 的流量',
  TEST_MODEL:
    '连通性测试时使用的模型。点击"测试"按钮时用此模型发送测试请求',
  AUTO_BAN:
    '是否启用自动禁用。开启后，当渠道连续失败达到阈值时自动暂停该渠道，待恢复后再自动启用',
  STATUS_CODE_MAPPING:
    'HTTP 状态码映射（JSON 格式）。例如{"429":"503"}表示上游返回限流 429 时，给客户端返回 503 服务繁忙',
  TAG: '给渠道打标签，方便在列表中按标签筛选和批量操作',
  REMARK: '管理员内部备注，仅后台可见，不会暴露给用户',
  SETTING: '渠道高级设置（JSON 格式）。一般不直接修改',
  PARAM_OVERRIDE:
    '请求参数覆写（JSON 格式）。用于强制覆盖发给上游的某些参数，如固定 temperature',
  HEADER_OVERRIDE:
    '请求头覆写（JSON 格式）。用于添加或修改发给上游的 HTTP 头',
  MULTI_KEY_MODE: '多 Key 选择策略：随机（Random）或轮询（Polling）',
  BATCH_ADD: '批量创建模式：一行一个 Key 可一次性创建多个相同配置的渠道',
  OPENAI_ORG: 'OpenAI 组织 ID（可选）。仅 OpenAI 类型渠道需要填写',
} as const

// ============================================================================
// Channel Type Specific Configurations
// ============================================================================

export const MODEL_FETCHABLE_TYPES = new Set([
  1, 4, 14, 17, 20, 23, 24, 25, 26, 27, 31, 34, 35, 40, 42, 43, 47, 48, 58,
])

export const TYPE_TO_KEY_PROMPT: Record<number, string> = {
  15: '格式：APIKey|SecretKey',
  18: '格式：APPID|APISecret|APIKey',
  22: '格式：APIKey-AppId，例如 fastgpt-0sp2gtvfdgyi4k30jwlgwf1i-64f335d84283f05518e9e041',
  23: '格式：AppId|SecretId|SecretKey',
  33: '格式：Ak|Sk|Region',
  50: '格式：AccessKey|SecretKey（如果是 New API 上游则只填 ApiKey）',
  51: '格式：Access Key ID|Secret Access Key',
  57: '粘贴 Codex OAuth JSON 凭证（access_token / refresh_token / account_id）',
  58: '在 easyrouter.io 后台 → 个人设置 → API Keys 中生成的 sk- 开头的密钥',
}

export const CHANNEL_TYPE_WARNINGS: Record<number, string> = {
  3: '2025年5月10日后添加的 Azure 渠道无需再从模型名中去掉"."',
  8: '如果上游是 One API 或 New API 中转项目，请选择 OpenAI 类型而非 Custom 类型',
  37: 'Dify 渠道仅支持 chatflow 和 agent，agent 不支持图片',
  58: 'EasyRouter 是 API 聚合中转平台。创建此渠道后，你的用户即可通过你的 New-API 间接使用 EasyRouter 上所有支持的 AI 模型。Base URL 留空即可使用内置默认地址 https://easyrouter.io',
}
