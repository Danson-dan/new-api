import { useTranslation } from 'react-i18next'

type FaqItemData = {
  q: Record<'zh' | 'en', string>
  a: Record<'zh' | 'en', string>
}

const FAQ_ITEMS: FaqItemData[] = [
  {
    q: { zh: '你们是所谓"中转站"吗？', en: 'Are you a so-called "proxy" service?' },
    a: {
      zh: '不是。我们不是传统意义上的中转站，我们是企业级大模型 API 网关。上游供应商为官方 AWS、GCP、Azure 等顶级云厂商。对于开源模型，上游同样源自模型原厂接入或全球知名推理服务商，确保链路合法、透明、可审计。',
      en: 'No. We are an enterprise-grade AI API gateway, not a traditional proxy. Our upstream providers are official AWS, GCP, Azure, and other top-tier cloud vendors. For open-source models, upstreams are from official providers or globally recognized inference services, ensuring a legal, transparent, auditable chain.',
    },
  },
  {
    q: { zh: '你们是正规平台吗？API 来源是什么？', en: 'Are you a legitimate platform? Where do APIs come from?' },
    a: {
      zh: '是的，我们是合规的企业级 AI 接入平台。依托顶级云厂商与AI平台直采，提供合规、稳定、可追溯认证的AI算力分发服务。',
      en: 'Yes, we are a compliant enterprise AI access platform. We source directly from top cloud and AI providers, delivering compliant, stable, auditable AI compute distribution services.',
    },
  },
  {
    q: { zh: '我的数据会被用于商业目的吗？', en: 'Will my data be used for commercial purposes?' },
    a: {
      zh: '绝对不会。EasyRouter 仅作为数据分发的安全网关，严格执行"零存储"隐私协议。我们不读取、不存储您的任何对话内容，更不会用于模型训练或商业用途。但作为接入方，您使用特定模型时仍受该模型原厂使用协议约束。',
      en: 'Absolutely not. EasyRouter only acts as a secure data distribution gateway, strictly adhering to a "zero storage" privacy protocol. We do not read or store your conversation content, nor use it for training or commercial purposes. However, when using a specific model, you are still subject to that provider\'s usage agreement.',
    },
  },
  {
    q: { zh: '为什么价格与官方价格基本一致？', en: 'Why are your prices similar to official prices?' },
    a: {
      zh: '因为我们提供正版、足额、无掺水的官方原生算力。低价往往意味着模型量化阉割、对话缓存训练或随时封号风险。我们坚持"按需计费，透明定价"，将官方合作采购优势转化为更高并发配额和更低延迟。',
      en: 'We provide genuine, full-capacity, unadulterated official native compute. Low prices often mean quantized models, cached training, or risk of account termination. We adhere to "pay-per-use, transparent pricing", converting procurement advantages into higher concurrency and lower latency.',
    },
  },
  {
    q: { zh: '积分和美元的关系是什么？', en: 'What is the relationship between credits and USD?' },
    a: {
      zh: '1 美元 = 200 积分。您在平台充值获得积分，计费时按模型官方价格扣除相应价值的积分。具体单价请参考"模型广场"页面，所有价格均以美元标注，透明对标官方。',
      en: '1 USD = 200 credits. Top-ups give you credits, and billing deducts credits at the model\'s official USD price. Check the "Model Square" page for specific unit prices, all denominated in USD for full transparency.',
    },
  },
  {
    q: { zh: '支持什么格式的输出？', en: 'What output formats are supported?' },
    a: {
      zh: 'EasyRouter 拥有强大的格式转换引擎。原生支持 OpenAI Chat Completions、Anthropic Messages 及 Google Gemini 等主流 API 格式。无论底层模型是谁，都可通过标准格式统一调用，实现无缝切换。',
      en: 'EasyRouter has a powerful format conversion engine, natively supporting OpenAI Chat Completions, Anthropic Messages, Google Gemini, and other mainstream API formats. Regardless of the underlying model, you can call it through these standard formats for seamless switching.',
    },
  },
  {
    q: { zh: '支持哪些 Coding Agent 工具接入？', en: 'Which Coding Agent tools are supported?' },
    a: {
      zh: '市面上绝大多数支持自定义 API 的工具均可完美接入，包括但不限于：AionUI、Cherry Studio、Claude Code、OpenClaw、OpenAI Codex CLI 等。',
      en: 'Most tools supporting custom APIs can be integrated seamlessly, including but not limited to: AionUI, Cherry Studio, Claude Code, OpenClaw, OpenAI Codex CLI, and more.',
    },
  },
  {
    q: { zh: '谁适合使用 EasyRouter？', en: 'Who is EasyRouter suitable for?' },
    a: {
      zh: '希望一个账号享受顶级云厂商原生 AI 服务的用户；追求极致稳定性和响应速度的开发者或企业；需要统一管理多家模型 API 的团队；希望在各种网络环境下安全合规使用顶尖算力的用户。',
      en: 'Users wanting native AI from top cloud vendors through one account; developers/enterprises pursuing ultimate stability; teams needing unified multi-vendor API management; those requiring safe, compliant access to top AI compute under any network conditions.',
    },
  },
  {
    q: { zh: '谁不适合使用我们？', en: 'Who is NOT suitable?' },
    a: {
      zh: '贪图低价、希望一个套餐无限量调用的用户；对数据安全性不敏感、愿忍受模型阉割或不稳定服务的用户。注意：我们不提供"编程无限套餐"，所有计费严格遵循模型厂商标准消耗逻辑。',
      en: 'Users seeking extremely low prices with unlimited access from one package; users insensitive to data security willing to tolerate degraded or unstable service. Note: no "unlimited coding plans" — all billing strictly follows model provider consumption logic.',
    },
  },
  {
    q: { zh: '企业级采购可否有更优惠的折扣？', en: 'Are there greater discounts for enterprise procurement?' },
    a: {
      zh: '针对企业级大额采购，当调用量满足特定规模（通常月均 60 亿 Token 以上）并签署用量承诺时，可基于采购规模商谈优惠政策。详情请咨询商务团队：service@easyrouter.io。',
      en: 'For enterprise-scale procurement, when usage reaches a certain scale (typically 6 billion tokens/month) with a usage commitment, we can negotiate preferential policies. Contact our business team: service@easyrouter.io.',
    },
  },
  {
    q: { zh: '能否开发票？', en: 'Can you issue invoices?' },
    a: {
      zh: 'EasyRouter 的在线充值主体为非中国大陆实体，根据相关法律法规，无法开具中国增值税发票。但我们支持提供国际通用的 Invoice（形式发票），可作为正规交易凭证用于国际商务报销。',
      en: 'Since EasyRouter\'s recharge entity is a non-mainland China entity, we cannot issue Chinese VAT invoices. However, we support international Invoices (proforma invoices), accepted by most company financial processes for international business reimbursement.',
    },
  },
]

function FaqCard({ item }: { item: FaqItemData }) {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language?.startsWith('zh')
  const lang = isZh ? 'zh' : 'en'

  return (
    <div className='border-border bg-background hover:border-primary/20 hover:shadow-md group relative overflow-hidden rounded-xl border p-5 transition-all duration-300'>
      <div className='relative z-10'>
        <div className='mb-3 flex items-start gap-3'>
          <span className='bg-primary/10 text-primary border-primary/20 flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold'>
            Q
          </span>
          <div>
            <h3 className='text-foreground text-sm font-semibold leading-snug'>
              {item.q[lang]}
            </h3>
            <p className='text-muted-foreground/60 mt-0.5 text-[11px] italic'>
              {item.q[isZh ? 'en' : 'zh']}
            </p>
          </div>
        </div>
        <div className='flex items-start gap-3'>
          <span className='bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold'>
            A
          </span>
          <p className='text-muted-foreground text-[13px] leading-relaxed pt-0.5'>
            {item.a[lang]}
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className='group-hover:opacity-100 pointer-events-none absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-0 transition-opacity duration-500'
      >
        <div className='bg-primary/5 size-24 rounded-full blur-2xl' />
      </div>
    </div>
  )
}

export function FAQ() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-12 text-center'>
          <p className='text-primary mb-3 text-xs font-medium tracking-widest uppercase'>
            FAQ
          </p>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('Frequently Asked Questions')}
          </h2>
          <p className='text-muted-foreground mt-3 max-w-xl mx-auto text-sm'>
            {t('Quick answers to common questions about our platform and services.')}
          </p>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          {FAQ_ITEMS.map((item) => (
            <FaqCard key={item.q.en} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
