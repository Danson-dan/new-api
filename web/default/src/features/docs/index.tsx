import { useTranslation } from 'react-i18next'
import { BookOpen, Play, Puzzle, Code2, ArrowRight } from 'lucide-react'
import { PublicLayout } from '@/components/layout'

const DOC_SECTIONS = [
  { key: 'quick-start', icon: Play, titleKey: 'docs.quickStart', descriptionKey: 'docs.quickStartDesc', href: '/docs/quick-start' },
  { key: 'apps', icon: Puzzle, titleKey: 'docs.tools', descriptionKey: 'docs.toolsDesc', href: '/docs/apps' },
  { key: 'api', icon: Code2, titleKey: 'docs.api', descriptionKey: 'docs.apiDesc', href: '/docs/api' },
]

function DocCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
}) {
  const { t } = useTranslation()
  return (
    <a
      href={href}
      className='border-border hover:border-primary/50 hover:bg-muted/20 group flex flex-col gap-3 rounded-xl border p-5 transition-colors sm:p-6'
    >
      <div className='bg-primary/10 flex size-10 items-center justify-center rounded-lg'>
        <Icon className='text-primary size-5' />
      </div>
      <div className='space-y-1.5'>
        <h3 className='text-foreground text-base font-semibold'>{title}</h3>
        <p className='text-muted-foreground text-sm leading-relaxed'>{description}</p>
      </div>
      <div className='text-muted-foreground group-hover:text-primary mt-auto flex items-center gap-1.5 text-xs font-medium transition-colors'>
        <span>{t('Learn more')}</span>
        <ArrowRight className='size-3' />
      </div>
    </a>
  )
}

export function DocsIndex() {
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <div className='mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16'>
        <div className='mb-8 space-y-2 text-center sm:mb-12'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            {t('docs.title')}
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg'>
            {t('docs.subtitle')}
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
          {DOC_SECTIONS.map((section) => (
            <DocCard
              key={section.key}
              icon={section.icon}
              title={t(section.titleKey)}
              description={t(section.descriptionKey)}
              href={section.href}
            />
          ))}
        </div>
        <div className='border-border bg-muted/30 mt-12 rounded-xl border p-5 sm:p-6'>
          <div className='flex items-start gap-3'>
            <BookOpen className='text-primary mt-0.5 size-5 shrink-0' />
            <div className='space-y-1'>
              <h3 className='text-foreground text-sm font-semibold'>
                {t('docs.openaiCompatible')}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {t('docs.openaiCompatibleDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
