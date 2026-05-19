/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的注册页面组件
 */
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { AuthLayout } from '../auth-layout'
import { TermsFooter } from '../components/terms-footer'
import { SignUpForm } from './components/sign-up-form'

export function SignUp() {
  const { t } = useTranslation()
  const { status } = useStatus()

  return (
    <AuthLayout>
      <div className='w-full space-y-6'>
        <div className='space-y-2 text-center sm:text-left'>
          <h2 className='bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-3xl font-bold text-transparent tracking-tight sm:text-4xl'>
            {t('Create an account')}
          </h2>
          <p className='text-muted-foreground text-base sm:text-lg'>
            {t('Join us and start building')}
          </p>
        </div>

        {/* Signup Card */}
        <div className='glass-easyrouter overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl'>
          <div className='p-6 sm:p-8'>
            <SignUpForm />
          </div>
        </div>

        {/* Sign in link */}
        <p className='text-center text-muted-foreground text-sm'>
          {t('Already have an account?')}{' '}
          <Link
            to='/sign-in'
            className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-semibold text-transparent underline underline-offset-4 transition-opacity hover:opacity-80'
          >
            {t('Sign in')}
          </Link>
          .
        </p>

        <TermsFooter
          variant='sign-up'
          status={status}
          className='text-center'
        />
      </div>
    </AuthLayout>
  )
}