import { useTranslation } from 'react-i18next'
import { ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { PublicLayout } from '@/components/layout'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { getAppBySlug, getAppLocale } from './apps-data'
import type { AppStep, AppLang } from './apps-data'

function CodeSnippet({ code }: { code: string }) {
  const { copyToClipboard } = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  return (
    <div className='bg-muted/50 border-border relative rounded-lg border'>
      <pre className='overflow-x-auto p-4 text-xs whitespace-pre-wrap'>
        <code>{code}</code>
      </pre>
      <button
        type='button'
        className='hover:bg-muted absolute top-2 right-2 rounded-md p-1.5 transition-colors'
        onClick={() => { copyToClipboard(code); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      >
        {copied ? <Check className='size-3.5' /> : <Copy className='size-3.5' />}
      </button>
    </div>
  )
}

function StepBlock({ step, index }: { step: AppStep; index: number }) {
  return (
    <div className='flex gap-4'>
      <div className='bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold'>
        {index + 1}
      </div>
      <div className='space-y-3 pt-1 min-w-0'>
        <h3 className='text-foreground text-base font-semibold'>{step.title}</h3>
        {step.description && (
          <p className='text-muted-foreground text-sm leading-relaxed'>{step.description}</p>
        )}
        {step.code && <CodeSnippet code={step.code} />}
        {step.subs && (
          <div className='space-y-3'>
            {step.subs.map((sub, i) => (
              <div key={i} className='border-border bg-background rounded-lg border p-3'>
                <h4 className='text-foreground text-xs font-semibold uppercase tracking-wide'>
                  {sub.title}
                </h4>
                {sub.description && (
                  <p className='text-muted-foreground mt-1 text-sm'>{sub.description}</p>
                )}
                {sub.code && (
                  <div className='mt-2'>
                    <CodeSnippet code={sub.code} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {step.note && (
          <p className='bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 rounded-md border px-3 py-2 text-amber-800 dark:text-amber-200 text-xs'>
            ⚠️ {step.note}
          </p>
        )}
      </div>
    </div>
  )
}

export function AppsDetail() {
  const { t, i18n } = useTranslation()
  const slug = window.location.pathname.split('/').pop() || ''
  const app = getAppBySlug(slug)
  const lang = (i18n.language?.startsWith('zh') ? 'zh' : 'en') as AppLang

  if (!app) {
    return (
      <PublicLayout>
        <div className='mx-auto max-w-4xl px-4 py-16 text-center'>
          <h1 className='text-2xl font-bold'>{t('App not found')}</h1>
          <a href='/docs/apps' className='text-primary mt-4 inline-block hover:underline'>
            ← {t('docs.tools')}
          </a>
        </div>
      </PublicLayout>
    )
  }

  const locale = getAppLocale(app, lang)

  return (
    <PublicLayout>
      <div className='mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12'>
        <div className='mb-8 space-y-3 sm:mb-10'>
          <a href='/docs/apps' className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
            ← {t('docs.tools')}
          </a>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>{app.name}</h1>
          <p className='text-primary/80 text-base font-medium'>{locale.subtitle}</p>
          <p className='text-muted-foreground text-sm leading-relaxed'>{locale.description}</p>
          {locale.links.length > 0 && (
            <div className='flex flex-wrap gap-3 pt-1'>
              {locale.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:bg-primary/10 inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors'
                >
                  {link.label}
                  <ExternalLink className='size-3' />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className='mb-8 rounded-lg border p-5'>
          <h2 className='text-foreground mb-3 text-base font-semibold'>{t('Connection Settings')}</h2>
          <div className='grid gap-3 text-sm sm:grid-cols-3'>
            <div>
              <span className='text-muted-foreground'>{t('Provider Type')}:</span>
              <span className='text-foreground ml-1 font-medium'>{locale.config.apiType}</span>
            </div>
            <div>
              <span className='text-muted-foreground'>{t('API Key')}:</span>
              <span className='text-foreground ml-1 font-medium'>{locale.config.apiKey}</span>
            </div>
            <div>
              <span className='text-muted-foreground'>{t('Base URL')}:</span>
              <span className='text-foreground ml-1 font-medium'>{locale.config.baseUrl}</span>
            </div>
          </div>
        </div>

        <div className='space-y-8'>
          {locale.steps.map((step, i) => (
            <StepBlock key={i} step={step} index={i} />
          ))}
        </div>

        {locale.tips && locale.tips.length > 0 && (
          <div className='mt-8 rounded-lg border p-5'>
            <h3 className='text-foreground mb-2 text-sm font-semibold'>{t('Important Notes')}</h3>
            <ul className='text-muted-foreground list-disc space-y-1 pl-5 text-sm'>
              {locale.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
