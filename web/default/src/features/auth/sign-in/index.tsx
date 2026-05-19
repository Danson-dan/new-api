/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的登录页面组件
 */
import { Link, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { AuthLayout } from '../auth-layout'
import { TermsFooter } from '../components/terms-footer'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { t } = useTranslation()
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const { status } = useStatus()

  return (
    <AuthLayout>
      <div className='w-full space-y-6'>
        <div className='space-y-2 text-center sm:text-left'>
          <h2 className='bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-3xl font-bold text-transparent tracking-tight sm:text-4xl'>
            {t('Welcome back')}
          </h2>
          <p className='text-muted-foreground text-base sm:text-lg'>
            {t('Sign in to your account')}
          </p>
        </div>

        {/* Login Card */}
        <div className='glass-easyrouter overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl'>
          <div className='p-6 sm:p-8'>
            <UserAuthForm redirectTo={redirect} />
          </div>
        </div>

        {/* Sign up link */}
        {!status?.self_use_mode_enabled && (
          <p className='text-center text-muted-foreground text-sm'>
            {t("Don't have an account?")}{' '}
            <Link
              to='/sign-up'
              className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-semibold text-transparent underline underline-offset-4 transition-opacity hover:opacity-80'
            >
              {t('Sign up')}
            </Link>
            .
          </p>
        )}

        <TermsFooter
          variant='sign-in'
          status={status}
          className='text-center'
        />
      </div>
    </AuthLayout>
  )
}