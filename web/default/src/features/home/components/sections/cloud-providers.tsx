import { useTranslation } from 'react-i18next'
import { ShieldCheck } from 'lucide-react'

const PROVIDERS = [
  { name: 'AWS', tag: 'cloud' },
  { name: 'Google Cloud', tag: 'cloud' },
  { name: 'Azure', tag: 'cloud' },
  { name: 'Amazon Bedrock', tag: 'ai' },
  { name: 'Google Vertex AI', tag: 'ai' },
  { name: 'Azure AI Studio', tag: 'ai' },
  { name: 'Alibaba Cloud', tag: 'cloud' },
  { name: 'Volcengine', tag: 'cloud' },
  { name: 'Moonshot AI', tag: 'ai' },
]

export function CloudProviders() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-12 text-center'>
          <div className='inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/20 mb-6'>
            <ShieldCheck className='size-3.5' />
            {t('home.cloud.partner')}
          </div>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('home.cloud.title')}
          </h2>
          <p className='text-muted-foreground mt-3 max-w-xl mx-auto text-sm leading-relaxed'>
            {t('home.cloud.subtitle')}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3'>
          {PROVIDERS.map((p) => (
            <div
              key={p.name}
              className='border-border bg-muted/10 hover:border-primary/30 hover:bg-muted/20 flex flex-col items-center justify-center gap-2 rounded-xl border p-6 transition-colors'
            >
              <span className='text-foreground text-base font-bold'>{p.name}</span>
              <span className='bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase'>
                {p.tag}
              </span>
            </div>
          ))}
        </div>

        <div className='bg-muted/10 border-border mt-8 flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm'>
          <span className='flex size-2 rounded-full bg-green-500' />
          <span className='text-foreground font-medium'>{t('home.cloud.sourced')}</span>
        </div>
      </div>
    </section>
  )
}
