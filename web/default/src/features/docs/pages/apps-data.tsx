export type AppStep = {
  title: string
  description?: string
  code?: string
  note?: string
  subs?: { title: string; description?: string; code?: string }[]
}

export type AppLocale = {
  subtitle: string
  description: string
  links: { label: string; href: string }[]
  config: {
    apiType: string
    apiKey: string
    baseUrl: string
  }
  steps: AppStep[]
  tips?: string[]
}

export type AppDoc = {
  slug: string
  name: string
  en: AppLocale
  zh: AppLocale
}

export type AppLang = 'en' | 'zh'

export const apps: AppDoc[] = [
  {
    slug: 'cherry-studio',
    name: 'Cherry Studio',
    en: {
      subtitle: 'Desktop AI client with 30+ professional assistants',
      description: 'Cherry Studio is a powerful desktop AI client designed for professional users, integrating 30+ industry-specific intelligent assistants to meet various work scenarios and significantly boost productivity.',
      links: [
        { label: 'Website', href: 'https://cherry-ai.com' },
        { label: 'Download', href: 'https://cherry-ai.com/download' },
        { label: 'Docs', href: 'https://docs.cherry-ai.com' },
      ],
      config: {
        apiType: 'OpenAI Compatible',
        apiKey: 'API Key generated in the console',
        baseUrl: 'Your site address (e.g. https://your-domain.com)',
      },
      steps: [
        { title: 'Copy your API Key', description: 'Log in, go to API Keys, and copy an available key.' },
        { title: 'Add a provider', description: 'Open Cherry Studio settings → Model Service → Add Provider → choose OpenAI Compatible.' },
        { title: 'Fill in configuration', subs: [
          { title: 'API Address', description: 'Enter your site address' },
          { title: 'API Key', description: 'Paste the key you copied from the console' },
        ] },
        { title: 'Add models and start', description: 'Add the models you need, return to the chat page, and select the configured model to start chatting.' },
      ],
    },
    zh: {
      subtitle: '桌面 AI 客户端，内置 30+ 专业智能助手',
      description: 'Cherry Studio 是一款功能强大的桌面 AI 客户端，专为专业用户设计，集成了 30+ 行业智能助手，能够满足各种工作场景的需求，显著提升工作效率。',
      links: [
        { label: '官网', href: 'https://cherry-ai.com' },
        { label: '下载', href: 'https://cherry-ai.com/download' },
        { label: '文档', href: 'https://docs.cherry-ai.com' },
      ],
      config: {
        apiType: 'OpenAI 兼容',
        apiKey: '在控制台生成的 API Key',
        baseUrl: '你的站点地址（例如 https://your-domain.com）',
      },
      steps: [
        { title: '在控制台复制 API Key', description: '登录你的账户，进入 API Keys 页面，复制一个可用的 Key。' },
        { title: '添加提供商', description: '打开 Cherry Studio 设置，进入"模型服务"页面，点击"添加提供商"，选择 OpenAI 兼容类型。' },
        { title: '填写配置', subs: [
          { title: 'API 地址', description: '填入你的站点地址' },
          { title: 'API 密钥', description: '粘贴从控制台复制的 API Key' },
        ] },
        { title: '添加模型并开始使用', description: '在模型列表中添加需要的模型，返回聊天页面，选择已配置的模型即可开始对话。' },
      ],
    },
  },
  {
    slug: 'cc-switch',
    name: 'CC Switch',
    en: {
      subtitle: 'Cross-platform AI CLI management tool',
      description: 'CC Switch is an open-source, cross-platform AI CLI management tool supporting one-click Provider switching for Claude Code, Codex, and Gemini CLI, unified MCP server management, system prompt management, and Skills extensions.',
      links: [
        { label: 'GitHub', href: 'https://github.com/farion1231/cc-switch' },
        { label: 'Download', href: 'https://github.com/farion1231/cc-switch/releases' },
      ],
      config: { apiType: 'CC Switch one-click import', apiKey: 'Select CC Switch from the token menu', baseUrl: 'Auto-filled' },
      steps: [
        { title: 'Click the token dropdown menu', description: 'Choose CC Switch from the menu; the app will auto-launch and show a config dialog.' },
        { title: 'Complete configuration', subs: [
          { title: 'App', description: 'Toggle between Claude / Codex / Gemini at the top' },
          { title: 'Primary Model (Required)', description: 'Select your default model' },
          { title: 'Haiku / Sonnet / Opus', description: 'Optional light/balanced/max models' },
        ] },
        { title: 'Finish', description: 'Click "Open CC Switch" to import the config and start using.' },
      ],
    },
    zh: {
      subtitle: '跨平台 AI CLI 统一管理工具',
      description: 'CC Switch 是一款开源、跨平台的 AI CLI 统一管理工具，支持 Claude Code、Codex 和 Gemini CLI 的 Provider 配置一键切换、MCP 服务器统一管理、系统提示词管理以及 Skills 扩展管理。',
      links: [
        { label: 'GitHub', href: 'https://github.com/farion1231/cc-switch' },
        { label: '下载', href: 'https://github.com/farion1231/cc-switch/releases' },
      ],
      config: { apiType: 'CC Switch 一键填入', apiKey: '在令牌管理页下拉菜单中选择 CC Switch', baseUrl: '自动填充' },
      steps: [
        { title: '在令牌管理页点击对应令牌的下拉菜单', description: '在菜单中选择 CC Switch 选项，系统会自动唤起 CC Switch 应用并弹出配置弹窗。' },
        { title: '在弹窗中完成配置', subs: [
          { title: '应用', description: '顶部切换 Claude / Codex / Gemini 目标应用' },
          { title: '主模型（必填）', description: '选择默认使用的主力模型' },
          { title: 'Haiku / Sonnet / Opus 模型', description: '选填轻量 / 均衡 / 最强模型' },
        ] },
        { title: '完成配置', description: '点击"打开 CC Switch"将配置导入并开始使用。' },
      ],
    },
  },
  {
    slug: 'aionui',
    name: 'AionUi',
    en: {
      subtitle: 'Free open-source desktop cowork tool',
      description: 'AionUi is a free, local, open-source cowork tool supporting Gemini CLI, Claude Code, Codex, OpenCode, Qwen Code, Goose CLI, Auggie, and more, with full GUI and WebUI remote access.',
      links: [
        { label: 'Website', href: 'https://www.aionui.com' },
        { label: 'GitHub', href: 'https://github.com/iOfficeAI/AionUi' },
        { label: 'Download', href: 'https://github.com/iOfficeAI/AionUi/releases' },
      ],
      config: { apiType: 'OpenAI Compatible', apiKey: 'API Key generated in the console', baseUrl: 'Your site address (format: https://your-domain.com/v1)' },
      steps: [
        { title: 'Copy your API Key', description: 'Log in and copy an available key from the API Keys page.' },
        { title: 'Open AionUi Settings', description: 'Go to Settings → Model Config tab → Add Model → choose EasyRouter.' },
        { title: 'Configure API info', subs: [
          { title: 'API Address', description: 'Enter your site address (e.g. https://your-domain.com/v1)' },
          { title: 'API Key', description: 'Paste the key copied from the console' },
        ] },
        { title: 'Add models and start', description: 'Select models to add, choose the proper request protocol, and return to the chat page.' },
      ],
    },
    zh: {
      subtitle: '免费开源桌面办公 Cowork',
      description: 'AionUi 是一款免费、本地、开源的 Cowork，支持 Gemini CLI、Claude Code、Codex、OpenCode、Qwen Code、Goose CLI、Auggie 等多种 AI 代理，提供完整的 GUI 界面和 WebUI 远程访问功能。',
      links: [
        { label: '官网', href: 'https://www.aionui.com' },
        { label: 'GitHub', href: 'https://github.com/iOfficeAI/AionUi' },
        { label: '下载', href: 'https://github.com/iOfficeAI/AionUi/releases' },
      ],
      config: { apiType: 'OpenAI 兼容', apiKey: '在控制台生成的 API Key', baseUrl: '你的站点地址（格式：https://your-domain.com/v1）' },
      steps: [
        { title: '在控制台复制 API Key', description: '登录你的账户，在 API Keys 页面复制一个可用的 Key。' },
        { title: '打开 AionUi 设置', description: '在 AionUi 中进入设置页面 → 模型配置 Tab → 点击"添加模型" → 选择 EasyRouter。' },
        { title: '配置 API 信息', subs: [
          { title: 'API 地址', description: '填写站点地址（如 https://your-domain.com/v1）' },
          { title: 'API 密钥', description: '粘贴从控制台复制的 API Key' },
        ] },
        { title: '添加模型并开始使用', description: '下拉选择需要添加的模型，选择合适的请求协议，返回聊天页面开始对话。' },
      ],
    },
  },
  {
    slug: 'openclaw',
    name: 'OpenClaw',
    en: {
      subtitle: 'Self-hosted AI assistant platform',
      description: 'OpenClaw is an open-source, self-hosted personal AI assistant platform supporting Telegram, Discord, WhatsApp, Feishu, and more, with unified channel management via Gateway.',
      links: [
        { label: 'Website', href: 'https://openclaw.ai' },
        { label: 'Docs', href: 'https://docs.openclaw.ai' },
        { label: 'GitHub', href: 'https://github.com/openclaw/openclaw' },
      ],
      config: { apiType: 'openai-completions', apiKey: 'Via env ${EASY_ROUTER_API_API_KEY}', baseUrl: 'Your site + /v1 (e.g. https://your-domain.com/v1)' },
      steps: [
        { title: 'Install OpenClaw', code: 'curl -fsSL https://openclaw.ai/install.sh | bash' },
        { title: 'Run onboarding wizard', code: 'openclaw onboard --install-daemon' },
        { title: 'Set environment variable', code: 'export EASY_ROUTER_API_API_KEY="sk-your-key"' },
        { title: 'Edit config file', description: 'Edit ~/.openclaw/openclaw.json and add the easyrouter provider:', code: `{
  "models": {
    "mode": "merge",
    "providers": {
      "easyrouter": {
        "baseUrl": "https://your-domain.com/v1",
        "apiKey": "\${EASY_ROUTER_API_API_KEY}",
        "api": "openai-completions",
        "models": [
          { "id": "gpt-4o", "name": "GPT-4o" }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": { "primary": "easyrouter/gpt-4o" }
    }
  }
}` },
        { title: 'Verify', description: 'Launch the Control UI (openclaw dashboard) and confirm easyrouter/ models appear in the list.' },
      ],
      tips: ['baseUrl must end with /v1', 'Model IDs must exactly match those in EasyRouter', 'Ensure the Gateway process can read EASY_ROUTER_API_API_KEY'],
    },
    zh: {
      subtitle: '自托管 AI 助手平台',
      description: 'OpenClaw 是一个开源、自托管的个人 AI 助手平台，支持 Telegram、Discord、WhatsApp、飞书等多渠道集成，通过 Gateway 统一管理所有消息渠道。',
      links: [
        { label: '官网', href: 'https://openclaw.ai' },
        { label: '文档', href: 'https://docs.openclaw.ai' },
        { label: 'GitHub', href: 'https://github.com/openclaw/openclaw' },
      ],
      config: { apiType: 'openai-completions', apiKey: '通过环境变量 ${EASY_ROUTER_API_API_KEY} 注入', baseUrl: '你的站点地址 + /v1（如 https://your-domain.com/v1）' },
      steps: [
        { title: '安装 OpenClaw', code: 'curl -fsSL https://openclaw.ai/install.sh | bash' },
        { title: '运行引导向导', code: 'openclaw onboard --install-daemon' },
        { title: '设置环境变量', code: 'export EASY_ROUTER_API_API_KEY="sk-your-key"' },
        { title: '修改配置文件', description: '编辑 ~/.openclaw/openclaw.json，添加 easyrouter provider：', code: `{
  "models": {
    "mode": "merge",
    "providers": {
      "easyrouter": {
        "baseUrl": "https://your-domain.com/v1",
        "apiKey": "\${EASY_ROUTER_API_API_KEY}",
        "api": "openai-completions",
        "models": [
          { "id": "gpt-4o", "name": "GPT-4o" }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": { "primary": "easyrouter/gpt-4o" }
    }
  }
}` },
        { title: '验证接入', description: '启动 Control UI（openclaw dashboard），确认 easyrouter/ 前缀的模型出现在列表中。' },
      ],
      tips: ['baseUrl 必须以 /v1 结尾', '模型 ID 必须与 EasyRouter 中的模型名称完全一致', '确保 Gateway 进程能读取 EASY_ROUTER_API_API_KEY 环境变量'],
    },
  },
  {
    slug: 'hermes-agent',
    name: 'Hermes Agent',
    en: {
      subtitle: 'Open-source terminal AI agent by Nous Research',
      description: 'Hermes Agent is an open-source terminal AI agent by Nous Research, providing powerful tool calling, file I/O, and code execution. It supports code-free integration with any OpenAI-compatible API via its built-in Custom Endpoint.',
      links: [
        { label: 'Website', href: 'https://hermes-agent.nousresearch.com' },
        { label: 'Docs', href: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart' },
        { label: 'GitHub', href: 'https://github.com/NousResearch/hermes-agent' },
      ],
      config: { apiType: 'Custom Endpoint (OpenAI Compatible)', apiKey: 'Generated in the console', baseUrl: 'https://your-domain.com/v1 (must end with /v1)' },
      steps: [
        { title: 'Install Hermes Agent', code: 'curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash\nsource ~/.zshrc  # or source ~/.bashrc' },
        { title: 'Run interactive config', description: 'Run hermes model, navigate to Custom Endpoint in the menu:', subs: [
          { title: 'Base URL', description: 'Enter https://your-domain.com/v1' },
          { title: 'API Key', description: 'Paste the key from the console' },
          { title: 'Model', description: 'Enter model name (e.g. claude-sonnet-4-6)' },
        ], note: 'Model name must exactly match the model ID in EasyRouter. Use models with 64K+ context.' },
        { title: 'Launch and verify', description: 'Run hermes or hermes --tui to start a conversation and confirm responses are working.' },
      ],
    },
    zh: {
      subtitle: 'Nous Research 开源终端 AI Agent',
      description: 'Hermes Agent 是由 Nous Research 出品的开源终端 AI Agent，提供强大的工具调用、文件读写和代码执行能力。通过内置 Custom Endpoint 可无代码接入任何 OpenAI 兼容 API。',
      links: [
        { label: '官网', href: 'https://hermes-agent.nousresearch.com' },
        { label: '文档', href: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart' },
        { label: 'GitHub', href: 'https://github.com/NousResearch/hermes-agent' },
      ],
      config: { apiType: 'Custom Endpoint（OpenAI 兼容）', apiKey: '在控制台生成', baseUrl: 'https://your-domain.com/v1（必须以 /v1 结尾）' },
      steps: [
        { title: '安装 Hermes Agent', code: 'curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash\nsource ~/.zshrc  # 或 source ~/.bashrc' },
        { title: '运行交互式配置菜单', description: '在终端输入 hermes model，进入交互式菜单，用方向键选择 Custom Endpoint：', subs: [
          { title: 'Base URL', description: '填入 https://your-domain.com/v1' },
          { title: 'API Key', description: '粘贴从控制台复制的 API Key' },
          { title: 'Model', description: '输入模型名（如 claude-sonnet-4-6）' },
        ], note: '模型名称必须与 EasyRouter 控制台中的模型 ID 完全一致，推荐使用 64K+ 上下文模型。' },
        { title: '启动并验证', description: '运行 hermes 或 hermes --tui 开始对话，输入测试消息确认回复正常。' },
      ],
    },
  },
  {
    slug: 'claude-code',
    name: 'Claude Code',
    en: {
      subtitle: 'Anthropic terminal coding assistant',
      description: 'Claude Code is Anthropic\'s terminal coding assistant, supporting deep codebase analysis, multi-file editing, and seamless integration with VS Code and JetBrains IDEs.',
      links: [{ label: 'Website', href: 'https://www.anthropic.com/claude-code' }],
      config: { apiType: 'Anthropic-compatible', apiKey: 'Set via ANTHROPIC_API_KEY env var', baseUrl: 'Set via ANTHROPIC_BASE_URL env var' },
      steps: [
        { title: 'Install Claude Code', description: 'macOS/Linux:', code: 'curl -fsSL https://claude.ai/install.sh | bash', subs: [
          { title: 'Windows', description: 'Install Node.js first, then:', code: 'npm install -g @anthropic-ai/claude-code' },
        ] },
        { title: 'One-click env setup', description: 'Connect to your site:', code: '# macOS/Linux\ncurl -fsSL https://docs.easyrouter.io/helper/claude-cli-setup.sh | bash\n# Windows PowerShell\niex (irm \'https://docs.easyrouter.io/helper/claude-cli-setup.ps1\')' },
        { title: 'Launch', description: 'Run claude in your project directory, use /model to switch models.' },
      ],
    },
    zh: {
      subtitle: 'Anthropic 终端编程助手',
      description: 'Claude Code 是 Anthropic 推出的终端编程助手，支持深度代码库分析、多文件协同编辑，与 VS Code 和 JetBrains IDE 无缝集成。',
      links: [{ label: '官网', href: 'https://www.anthropic.com/claude-code' }],
      config: { apiType: 'Anthropic 兼容 API', apiKey: '通过环境变量 ANTHROPIC_API_KEY 设置', baseUrl: '通过环境变量 ANTHROPIC_BASE_URL 设置' },
      steps: [
        { title: '安装 Claude Code', description: 'macOS/Linux:', code: 'curl -fsSL https://claude.ai/install.sh | bash', subs: [
          { title: 'Windows', description: '需先安装 Node.js，然后运行:', code: 'npm install -g @anthropic-ai/claude-code' },
        ] },
        { title: '一键设置环境变量', description: '连接到你的站点：', code: '# macOS/Linux\ncurl -fsSL https://docs.easyrouter.io/helper/claude-cli-setup.sh | bash\n# Windows PowerShell\niex (irm \'https://docs.easyrouter.io/helper/claude-cli-setup.ps1\')' },
        { title: '启动 Claude Code', description: '在项目目录中运行 claude 进入交互模式，使用 /model 命令切换模型。' },
      ],
    },
  },
  {
    slug: 'codex-cli',
    name: 'Codex CLI',
    en: {
      subtitle: 'OpenAI terminal coding assistant',
      description: 'Codex CLI is OpenAI\'s open-source terminal coding agent with atomic patch editing, sandbox policies, plan tracking, and parallel tool execution, running locally on your machine.',
      links: [
        { label: 'Website', href: 'https://chatgpt.com/codex' },
        { label: 'GitHub', href: 'https://github.com/openai/codex' },
      ],
      config: { apiType: 'OpenAI Compatible', apiKey: 'Set via OPENAI_API_KEY env var', baseUrl: 'Set via OPENAI_BASE_URL env var' },
      steps: [
        { title: 'Install Codex CLI', description: 'macOS/Linux:', code: 'npm install -g @openai/codex', subs: [
          { title: 'Windows', description: 'Install WSL2 and Node.js first, then run the same command in WSL.' },
        ] },
        { title: 'One-click config setup', description: 'Connect to your site:', code: '# macOS/Linux\ncurl -fsSL https://docs.easyrouter.io/helper/codex-cli-setup.sh | bash\n# Windows PowerShell\niex (irm \'https://docs.easyrouter.io/helper/codex-cli-setup.ps1\')' },
        { title: 'Launch', description: 'Run codex in your terminal, use /model to select a model and start coding.' },
      ],
    },
    zh: {
      subtitle: 'OpenAI 终端 AI 编程助手',
      description: 'Codex CLI 是 OpenAI 开源的终端编码代理，支持原子补丁编辑、沙箱策略、计划追踪和并行工具执行，可在本地计算机上运行。',
      links: [
        { label: '官网', href: 'https://chatgpt.com/codex' },
        { label: 'GitHub', href: 'https://github.com/openai/codex' },
      ],
      config: { apiType: 'OpenAI 兼容 API', apiKey: '通过环境变量 OPENAI_API_KEY 设置', baseUrl: '通过环境变量 OPENAI_BASE_URL 设置' },
      steps: [
        { title: '安装 Codex CLI', description: 'macOS/Linux:', code: 'npm install -g @openai/codex', subs: [
          { title: 'Windows', description: '先安装 WSL2 和 Node.js，再在 WSL 中运行相同命令。' },
        ] },
        { title: '一键设置配置文件', description: '连接到你的站点：', code: '# macOS/Linux\ncurl -fsSL https://docs.easyrouter.io/helper/codex-cli-setup.sh | bash\n# Windows PowerShell\niex (irm \'https://docs.easyrouter.io/helper/codex-cli-setup.ps1\')' },
        { title: '启动 Codex CLI', description: '在终端运行 codex，使用 /model 选择模型后即可开始编程。' },
      ],
    },
  },
  {
    slug: 'factory-droid-cli',
    name: 'Factory Droid CLI',
    en: {
      subtitle: 'AI-powered full-stack development tool',
      description: 'Factory Droid CLI is an AI software engineering agent by Factory AI, supporting end-to-end automation from planning to testing, integrating with Jira, Notion, Slack, and more.',
      links: [
        { label: 'Website', href: 'https://factory.ai/product/cli' },
        { label: 'Docs', href: 'https://docs.factory.ai/cli/getting-started/quickstart' },
      ],
      config: { apiType: 'OpenAI Compatible', apiKey: 'API Key generated in the console', baseUrl: 'Your site address' },
      steps: [
        { title: 'Install Factory Droid CLI', subs: [
          { title: 'macOS/Linux', code: 'curl -fsSL https://app.factory.ai/cli | sh' },
          { title: 'Windows', code: 'irm https://app.factory.ai/cli/windows | iex' },
        ] },
        { title: 'One-click config setup', description: 'Connect to your site:', code: '# macOS/Linux\ncurl -fsSL https://docs.easyrouter.io/en/helper/factory-droid-cli-setup.sh | bash\n# Windows PowerShell\niex (irm \'https://docs.easyrouter.io/en/helper/factory-droid-cli-setup.ps1\')' },
        { title: 'Launch', description: 'Run droid in your project directory. Droid CLI requires a (free) official account login.' },
      ],
    },
    zh: {
      subtitle: 'AI 全流程自动化开发工具',
      description: 'Factory Droid CLI 是由 Factory AI 开发的命令行 AI 软件工程代理，支持从规划到实现到测试的全流程自动化，集成 Jira、Notion、Slack 等工程工具。',
      links: [
        { label: '官网', href: 'https://factory.ai/product/cli' },
        { label: '文档', href: 'https://docs.factory.ai/cli/getting-started/quickstart' },
      ],
      config: { apiType: 'OpenAI 兼容 API', apiKey: '在控制台生成的 API Key', baseUrl: '你的站点地址' },
      steps: [
        { title: '安装 Factory Droid CLI', subs: [
          { title: 'macOS/Linux', code: 'curl -fsSL https://app.factory.ai/cli | sh' },
          { title: 'Windows', code: 'irm https://app.factory.ai/cli/windows | iex' },
        ] },
        { title: '一键修改配置文件', description: '连接到你的站点：', code: '# macOS/Linux\ncurl -fsSL https://docs.easyrouter.io/en/helper/factory-droid-cli-setup.sh | bash\n# Windows PowerShell\niex (irm \'https://docs.easyrouter.io/en/helper/factory-droid-cli-setup.ps1\')' },
        { title: '启动使用', description: '在项目目录中运行 droid 进入交互模式。Droid CLI 需要登录官方账号（免费）。' },
      ],
    },
  },
]

export function getAppBySlug(slug: string): AppDoc | undefined {
  return apps.find((a) => a.slug === slug)
}

export function getAppLocale(app: AppDoc, lang: AppLang): AppLocale {
  return app[lang] || app.en
}
