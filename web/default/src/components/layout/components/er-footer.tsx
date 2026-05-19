/**
 * @Author: Danson zheng
 * @Date: 2026-05-15
 * @Description: EasyRouter 风格页脚组件，与 easyrouter.io 官网页脚保持一致
 */
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useSystemConfig } from '@/hooks/use-system-config'
import { useStatus } from '@/hooks/use-status'

interface ERFooterProps {
  className?: string
}

export function ERFooter(props: ERFooterProps) {
  const { t } = useTranslation()
  const { systemName, logo: systemLogo } = useSystemConfig()
  const { status } = useStatus()

  const displayLogo = systemLogo || '/logo.png'
  const displayName = systemName || 'EasyRouter'
  const currentYear = new Date().getFullYear()

  const hasUserAgreement = Boolean(status?.data?.user_agreement_enabled)
  const hasPrivacyPolicy = Boolean(status?.data?.privacy_policy_enabled)

  const navLinks = useMemo(
    () => [
      { text: t('footer.er.nav.about'), to: '/about' },
      { text: t('footer.er.nav.models'), to: '/pricing' },
      { text: t('footer.er.nav.rankings'), to: '/rankings' },
      { text: t('footer.er.nav.docs'), to: '/docs' },
    ],
    [t],
  )

  return (
    <footer
      className={cn('border-border/40 relative z-10 border-t', props.className)}
    >
      <div className='mx-auto max-w-6xl px-6 py-12 md:py-16'>
        <div className='flex flex-col justify-between gap-10 md:flex-row'>
          <div className='shrink-0 md:max-w-[280px]'>
            <Link to='/' className='group flex items-center gap-2.5'>
              <img
                src={displayLogo}
                alt={displayName}
                className='size-8 rounded-lg object-contain'
              />
              <span className='text-base font-semibold tracking-tight'>
                {displayName}
              </span>
            </Link>
            <p className='text-muted-foreground/60 mt-3 text-sm leading-relaxed'>
              {t('footer.er.description')}
            </p>
          </div>

          <div className='grid grid-cols-2 gap-8 md:gap-16'>
            <div>
              <p className='text-muted-foreground/50 mb-4 text-xs font-medium tracking-wider uppercase'>
                {t('footer.er.nav.title')}
              </p>
              <ul className='space-y-3'>
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className='text-muted-foreground/50 mb-4 text-xs font-medium tracking-wider uppercase'>
                {t('footer.er.support.title')}
              </p>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='mailto:service@easyrouter.io'
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
                  >
                    {t('footer.er.support.business')}
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:service@easyrouter.io'
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
                  >
                    {t('footer.er.support.technical')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='border-border/30 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row'>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs'>
            <span className='text-muted-foreground/50'>
              &copy; {currentYear} {displayName}.{' '}
              {t('footer.defaultCopyright')}
            </span>
            <a
              href='mailto:service@easyrouter.io'
              className='text-muted-foreground/50 hover:text-foreground transition-colors'
            >
              {t('footer.er.legal.license')}
            </a>
            {hasUserAgreement && (
              <>
                <span className='text-border/50'>·</span>
                <a
                  href='/user-agreement'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground/50 hover:text-foreground transition-colors'
                >
                  {t('footer.er.legal.agreement')}
                </a>
              </>
            )}
            {hasPrivacyPolicy && (
              <>
                <span className='text-border/50'>·</span>
                <a
                  href='/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground/50 hover:text-foreground transition-colors'
                >
                  {t('footer.er.legal.privacy')}
                </a>
              </>
            )}
            <span className='text-border/50'>·</span>
            <a
              href='mailto:service@easyrouter.io'
              className='text-muted-foreground/50 hover:text-foreground transition-colors'
            >
              service@easyrouter.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
