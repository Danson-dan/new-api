import { Link } from '@tanstack/react-router'
import { ArrowRight, Check, Copy, Terminal } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

interface HeroProps {
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const { copyToClipboard } = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  const codeText = `export BASE_URL="https://your-domain.com/v1"
export API_KEY="sk-your-key-***"

# Compatible with all standard SDKs
client = OpenAI(
  base_url=BASE_URL,
  api_key=API_KEY
)`

  return (
    <section className='relative z-10 flex flex-col items-center overflow-hidden px-6 pt-24 pb-12 md:pt-32 md:pb-20'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-25 dark:opacity-[0.12]'
        style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 20% 20%, oklch(0.72 0.18 250 / 80%) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 80% 15%, oklch(0.65 0.15 200 / 60%) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 35% at 40% 80%, oklch(0.70 0.12 280 / 40%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black_20%,transparent_100%)] bg-[size:4rem_4rem] opacity-[0.08]'
      />

      <div className='flex max-w-4xl flex-col items-center text-center'>
        {props.isAuthenticated ? (
          <div className='mb-6'>
            <span className='bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium'>
              <Check className='size-4' />
              {t('You are logged in')}
            </span>
          </div>
        ) : (
          <div className='mb-6 flex items-center gap-3 flex-wrap justify-center'>
            <span className='bg-green-500/10 text-green-500 border-green-500/20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium'>
              <span className='flex size-2 rounded-full bg-green-500' />
              {t('home.hero.badge1')}
            </span>
            <span className='bg-purple-500/10 text-purple-500 border-purple-500/20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium'>
              {t('home.hero.badge2')}
            </span>
          </div>
        )}

        <h1 className='text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.1] font-bold tracking-tight'>
          {t('home.hero.futureReady')}
          <br />
          <span className='bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent'>
            {t('home.hero.gateway')}
          </span>
        </h1>
        <p className='text-muted-foreground mt-5 max-w-xl text-sm leading-relaxed md:text-base'>
          {t('home.hero.subtitle')}
        </p>

        <div className='mt-8 flex items-center gap-3 flex-wrap justify-center'>
          {props.isAuthenticated ? (
            <Button className='group rounded-lg' render={<Link to='/dashboard' />}>
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button className='group rounded-lg' render={<Link to='/sign-up' />}>
                {t('Get Started Free')}
                <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <a href='/docs' className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'>
                {t('Technical Docs')} →
              </a>
            </>
          )}
        </div>

        <div className='mt-10 w-full max-w-2xl'>
          <div className='border-border bg-muted/20 relative overflow-hidden rounded-xl border'>
            <div className='border-border bg-muted/30 flex items-center gap-2 border-b px-4 py-2.5'>
              <Terminal className='text-muted-foreground size-3.5' />
              <span className='text-muted-foreground text-xs'>
                {t('home.hero.oneLine')}
              </span>
            </div>
            <div className='relative'>
              <pre className='overflow-x-auto p-4 text-xs leading-relaxed md:text-sm'>
                <code className='text-foreground'>
                  <span className='text-orange-400'>export</span>{' '}
                  <span className='text-green-400'>BASE_URL</span>=
                  <span className='text-blue-400'>"https://your-domain.com/v1"</span>{'\n'}
                  <span className='text-orange-400'>export</span>{' '}
                  <span className='text-green-400'>API_KEY</span>=
                  <span className='text-blue-400'>"sk-your-key-***"</span>{'\n\n'}
                  <span className='text-muted-foreground'># Compatible with all standard SDKs</span>{'\n'}
                  <span className='text-purple-400'>client</span> = OpenAI({'\n'}
                  {'  '}base_url=<span className='text-green-400'>BASE_URL</span>,{'\n'}
                  {'  '}api_key=<span className='text-green-400'>API_KEY</span>{'\n'}
                  )
                </code>
              </pre>
              <button
                type='button'
                className='bg-background/80 hover:bg-background border-border absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors'
                onClick={() => {
                  copyToClipboard(codeText)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 1500)
                }}
              >
                {copied ? <Check className='size-3' /> : <Copy className='size-3' />}
                <span>{copied ? t('Copied') : t('Copy')}</span>
              </button>
            </div>
          </div>

          <div className='mt-4 flex gap-3 flex-wrap justify-center'>
            {['US', 'HK', 'SG'].map((region) => (
              <span key={region} className='bg-muted/30 border-border text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs'>
                <span className='flex size-1.5 rounded-full bg-green-400' />
                {region}
              </span>
            ))}
            <span className='text-muted-foreground text-xs py-1'>{t('home.hero.multiRegion')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
