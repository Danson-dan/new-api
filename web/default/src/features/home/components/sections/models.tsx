import { useTranslation } from 'react-i18next'

const MODELS = [
  { key: 'openai', name: 'OpenAI' },
  { key: 'claude', name: 'Claude' },
  { key: 'gemini', name: 'Gemini' },
  { key: 'deepseek', name: 'DeepSeek' },
  { key: 'qwen', name: 'Qwen' },
  { key: 'grok', name: 'Grok' },
  { key: 'zhipu', name: 'Zhipu' },
  { key: 'moonshot', name: 'Moonshot' },
  { key: 'cohere', name: 'Cohere' },
  { key: 'minimax', name: 'MiniMax' },
  { key: 'wenxin', name: 'Wenxin' },
  { key: 'hunyuan', name: 'Hunyuan' },
  { key: 'azureai', name: 'Azure AI' },
  { key: 'volcengine', name: 'Volcengine' },
  { key: 'suno', name: 'Suno' },
  { key: 'midjourney', name: 'Midjourney' },
]

const MORE = [
  { key: 'mistral', name: 'Mistral' },
  { key: 'perplexity', name: 'Perplexity' },
  { key: 'replicate', name: 'Replicate' },
  { key: 'together', name: 'Together' },
  { key: 'stability', name: 'Stability' },
  { key: 'meta', name: 'Meta' },
]

function ModelPill({ name, logo }: { name: string; logo: string }) {
  return (
    <span className='border-border bg-background hover:border-primary/20 hover:bg-muted/10 hover:shadow-sm inline-flex items-center gap-2.5 rounded-xl border px-5 py-3 transition-all duration-300'>
      <img src={logo} alt={name} className='size-5 shrink-0 object-contain' loading='lazy' />
      <span className='text-foreground/80 text-sm font-semibold tracking-tight'>
        {name}
      </span>
    </span>
  )
}

export function Models() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 overflow-hidden border-y px-6 py-16 md:py-20'>
      <div className='mx-auto max-w-6xl text-center'>
        <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
          {t('home.models.title')} <span className='text-primary'>40+</span>
        </h2>
      </div>

      <div className='relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
        <div className='flex gap-5 animate-scroll-left whitespace-nowrap py-2'>
          {[...MODELS, ...MORE, ...MODELS, ...MORE].map((m, i) => (
            <ModelPill key={`${m.key}-${i}`} name={m.name} logo={`/logos/${m.key}.svg`} />
          ))}
        </div>
        <div aria-hidden className='flex gap-5 animate-scroll-left-reverse whitespace-nowrap py-2'>
          {[...MODELS.reverse(), ...MORE.reverse(), ...MODELS.reverse(), ...MORE.reverse()].map((m, i) => (
            <ModelPill key={`r-${m.key}-${i}`} name={m.name} logo={`/logos/${m.key}.svg`} />
          ))}
        </div>
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-left-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 50s linear infinite;
            width: max-content;
          }
          .animate-scroll-left-reverse {
            animation: scroll-left-reverse 50s linear infinite;
            width: max-content;
          }
        `}</style>
      </div>
    </section>
  )
}
