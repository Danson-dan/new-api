import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

function PlanCard({ name, price, desc, popular }: { name: string; price: string; desc: string; popular?: boolean }) {
  const { t } = useTranslation()
  return (
    <div className={`border-border bg-background relative flex flex-col rounded-xl border p-6 ${popular ? 'ring-primary/20 ring-2' : ''}`}>
      {popular && (
        <div className='bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold'>
          {t('home.pricing.mostPopular')}
        </div>
      )}
      <h3 className='text-foreground text-lg font-bold'>{name}</h3>
      <div className='mt-3 mb-1'>
        <span className='text-3xl font-bold'>${price}</span>
      </div>
      <p className='text-muted-foreground text-xs leading-relaxed'>{desc}</p>
      <ul className='mt-5 space-y-2'>
        {[
          t('home.pricing.creditCompute'),
          t('home.pricing.payAsYouGo'),
          t('home.pricing.allModels'),
          t('home.pricing.stdApi'),
        ].map((item) => (
          <li key={item} className='text-muted-foreground flex items-start gap-2 text-xs'>
            <Check className='text-green-500 mt-0.5 size-3.5 shrink-0' />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Pricing() {
  const { t } = useTranslation()

  const plans = [
    { name: 'Study', price: '20.00', desc: t('home.pricing.studyDesc'), popular: false },
    { name: 'Standard', price: '100.00', desc: t('home.pricing.standardDesc'), popular: true },
    { name: 'Pro', price: '500.00', desc: t('home.pricing.proDesc'), popular: false },
    { name: 'Max', price: '1,500.00', desc: t('home.pricing.maxDesc'), popular: false },
  ]

  return (
    <section className='relative z-10 px-6 py-20 md:py-28 border-t'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-12 text-center'>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('home.pricing.title')}
          </h2>
          <p className='text-muted-foreground mt-3 max-w-xl mx-auto text-sm leading-relaxed'>
            {t('home.pricing.subtitle')}
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-4'>
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>

        <div className='mt-8 text-center'>
          <Button className='rounded-lg' render={<Link to='/sign-up' />}>
            {t('Get Started Free')}
          </Button>
        </div>
      </div>
    </section>
  )
}
