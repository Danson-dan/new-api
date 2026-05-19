import { Zap, Shield, Globe, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const REASONS = [
  { icon: Zap, titleKey: 'home.why.fastTitle', descKey: 'home.why.fastDesc' },
  { icon: Shield, titleKey: 'home.why.stableTitle', descKey: 'home.why.stableDesc' },
  { icon: Globe, titleKey: 'home.why.standardTitle', descKey: 'home.why.standardDesc' },
  { icon: Wrench, titleKey: 'home.why.fullModelTitle', descKey: 'home.why.fullModelDesc' },
]

export function WhyUs() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <h2 className='mb-12 text-center text-2xl font-bold tracking-tight md:text-3xl'>
          {t('home.why.title')}
        </h2>

        <div className='grid gap-8 md:grid-cols-4'>
          {REASONS.map((r) => (
            <div key={r.titleKey} className='flex flex-col items-center text-center'>
              <div className='bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-xl'>
                <r.icon className='size-6' />
              </div>
              <h3 className='text-foreground mb-2 text-sm font-semibold'>{t(r.titleKey)}</h3>
              <p className='text-muted-foreground text-xs leading-relaxed'>{t(r.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
