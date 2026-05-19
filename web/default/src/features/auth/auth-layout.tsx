/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的认证页面布局组件
 */
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='relative grid min-h-screen max-w-none'>
      {/* Background gradient orbs */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl' />
        <div className='absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-info/20 via-info/10 to-transparent blur-3xl' />
        <div className='absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-success/10 via-success/5 to-transparent blur-3xl' />
      </div>

      {/* Logo */}
      <Link
        to='/'
        className='absolute z-10 flex items-center gap-2 px-4 py-4 transition-all duration-300 hover:opacity-80 sm:px-8 sm:py-6'
      >
        <div className='relative h-9 w-9'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-full' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='h-9 w-9 rounded-full object-cover shadow-md'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-6 w-24' />
        ) : (
          <h1 className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-xl font-bold text-transparent'>
            {systemName}
          </h1>
        )}
      </Link>

      {/* Main content */}
      <div className='container flex items-center pt-8 sm:pt-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 px-4 py-8 sm:w-[480px] sm:p-8'>
          {children}
        </div>
      </div>
    </div>
  )
}