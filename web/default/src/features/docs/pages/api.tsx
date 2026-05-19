import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'

const API_SECTIONS = [
  { key: 'chat', titleKey: 'docs.chatCompletions', method: 'POST', path: '/v1/chat/completions', descKey: 'docs.chatCompletionsDesc' },
  { key: 'models', titleKey: 'docs.listModels', method: 'GET', path: '/v1/models', descKey: 'docs.listModelsDesc' },
  { key: 'images', titleKey: 'docs.imageGen', method: 'POST', path: '/v1/images/generations', descKey: 'docs.imageGenDesc' },
  { key: 'embeddings', titleKey: 'docs.embeddings', method: 'POST', path: '/v1/embeddings', descKey: 'docs.embeddingsDesc' },
  { key: 'audio', titleKey: 'docs.audioSpeech', method: 'POST', path: '/v1/audio/speech', descKey: 'docs.audioSpeechDesc' },
  { key: 'transcriptions', titleKey: 'docs.audioTranscriptions', method: 'POST', path: '/v1/audio/transcriptions', descKey: 'docs.audioTranscriptionsDesc' },
]

function EndpointCard({ title, method, path, description }: { title: string; method: string; path: string; description: string }) {
  return (
    <div className='border-border hover:border-primary/30 flex flex-col gap-2 rounded-lg border p-4 transition-colors'>
      <div className='flex items-center gap-2'>
        <span className='bg-primary/10 text-primary rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold'>{method}</span>
        <code className='text-foreground text-xs font-mono'>{path}</code>
      </div>
      <h3 className='text-foreground text-sm font-semibold'>{title}</h3>
      <p className='text-muted-foreground text-sm leading-relaxed'>{description}</p>
    </div>
  )
}

export function ApiIndex() {
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <div className='mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12'>
        <div className='mb-8 space-y-2 sm:mb-10'>
          <a href='/docs' className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
            ← {t('docs.title')}
          </a>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>{t('docs.api')}</h1>
          <p className='text-muted-foreground text-base'>{t('docs.apiSubtitle')}</p>
        </div>

        <div className='mb-8 rounded-lg border p-5'>
          <h2 className='text-foreground mb-2 text-base font-semibold'>{t('docs.authTitle')}</h2>
          <p className='text-muted-foreground mb-3 text-sm'>{t('docs.authDesc')}</p>
          <pre className='bg-muted/50 overflow-x-auto rounded-md p-3 text-sm'>
            <code>Authorization: Bearer sk-YOUR_API_KEY</code>
          </pre>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          {API_SECTIONS.map((section) => (
            <EndpointCard key={section.key} title={t(section.titleKey)} method={section.method} path={section.path} description={t(section.descKey)} />
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
