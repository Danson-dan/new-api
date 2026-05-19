import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { PublicLayout } from '@/components/layout'
import { apps, getAppLocale } from './apps-data'
import type { AppLang } from './apps-data'

function AppCard({ name, description, href }: { name: string; description: string; href: string }) {
  return (
    <a
      href={href}
      className='border-border hover:border-primary/30 hover:bg-muted/10 group flex flex-col gap-2 rounded-lg border p-4 transition-colors'
    >
      <h3 className='text-foreground text-sm font-semibold'>{name}</h3>
      <p className='text-muted-foreground flex-1 text-sm leading-relaxed'>{description}</p>
      <span className='text-primary group-hover:underline inline-flex items-center gap-1 text-xs font-medium'>
        Setup Guide
        <ArrowRight className='size-3' />
      </span>
    </a>
  )
}

export function AppsIndex() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.startsWith('zh') ? 'zh' : 'en') as AppLang

  return (
    <PublicLayout>
      <div className='mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12'>
        <div className='mb-8 space-y-2 sm:mb-10'>
          <a href='/docs' className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
            ← {t('docs.title')}
          </a>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>{t('docs.tools')}</h1>
          <p className='text-muted-foreground text-base'>{t('docs.toolsSubtitle')}</p>
        </div>

        <div className='mb-8 rounded-lg border p-5'>
          <h2 className='text-foreground mb-3 text-base font-semibold'>{t('docs.quickSetupGuide')}</h2>
          <ol className='text-muted-foreground list-decimal space-y-1.5 pl-5 text-sm'>
            <li>{t('docs.setupStep1')}</li>
            <li>{t('docs.setupStep2')}</li>
            <li>{t('docs.setupStep3')}</li>
            <li>{t('docs.setupStep4')}</li>
          </ol>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          {apps.map((app) => (
            <AppCard
              key={app.slug}
              name={app.name}
              description={getAppLocale(app, lang).subtitle}
              href={`/docs/apps/${app.slug}`}
            />
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
