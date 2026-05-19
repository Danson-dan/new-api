/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的钱包统计卡片
 */
import { Activity, BarChart3, WalletCards } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatQuota } from '@/lib/format'
import { Skeleton } from '@/components/ui/skeleton'
import type { UserWalletData } from '../types'

interface WalletStatsCardProps {
  user: UserWalletData | null
  loading?: boolean
}

export function WalletStatsCard(props: WalletStatsCardProps) {
  const { t } = useTranslation()

  if (props.loading) {
    return (
      <div className='overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm'>
        <div className='grid grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='px-4 py-4 sm:px-6 sm:py-5'>
              <Skeleton className='h-3.5 w-20' />
              <Skeleton className='mt-2 h-8 w-32' />
              <Skeleton className='mt-1.5 h-3.5 w-24' />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: t('Current Balance'),
      value: formatQuota(props.user?.quota ?? 0),
      description: t('Remaining quota'),
      icon: WalletCards,
      gradient: 'from-primary/80 via-primary/40 to-primary/10',
      iconBg: 'bg-gradient-primary',
    },
    {
      label: t('Total Usage'),
      value: formatQuota(props.user?.used_quota ?? 0),
      description: t('Total consumed quota'),
      icon: BarChart3,
      gradient: 'from-success/80 via-success/40 to-success/10',
      iconBg: 'bg-gradient-success',
    },
    {
      label: t('API Requests'),
      value: (props.user?.request_count ?? 0).toLocaleString(),
      description: t('Total requests made'),
      icon: Activity,
      gradient: 'from-info/80 via-info/40 to-info/10',
      iconBg: 'bg-gradient-info',
    },
  ]

  return (
    <div className='overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm'>
      <div className='grid grid-cols-1 divide-y divide-border/50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x'>
        {stats.map((item, index) => (
          <div
            key={item.label}
            className='group relative px-4 py-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent sm:px-6 sm:py-5'
          >
            <div className='flex items-center gap-2'>
              <div className={`rounded-lg p-1.5 ${item.iconBg}`}>
                <item.icon className='size-3.5 text-white' />
              </div>
              <div className='text-muted-foreground truncate text-xs font-semibold tracking-wider uppercase'>
                {item.label}
              </div>
            </div>

            <div className={`bg-gradient-to-r ${item.gradient} bg-clip-text font-mono text-xl font-bold tracking-tight text-transparent mt-2 sm:mt-3 sm:text-3xl`}>
              {item.value}
            </div>
            <div className='text-muted-foreground/60 mt-1 text-xs md:block'>
              {item.description}
            </div>

            {index < stats.length - 1 && (
              <div className='absolute right-0 top-1/2 hidden -translate-y-1/2 sm:block'>
                <div className='h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}