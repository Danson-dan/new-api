import { Activity, BarChart3, WalletCards } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { formatCompactNumber, formatQuota } from '@/lib/format'
import { getRoleLabel } from '@/lib/roles'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { StatusBadge } from '@/components/status-badge'
import { getUserInitials, getDisplayName } from '../lib'
import type { UserProfile } from '../types'

// ============================================================================
// Profile Header Component
// ============================================================================

interface ProfileHeaderProps {
  profile: UserProfile | null
  loading: boolean
}

export function ProfileHeader({ profile, loading }: ProfileHeaderProps) {
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className='bg-card overflow-hidden rounded-lg border'>
        <div className='p-4 sm:p-5'>
          <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left'>
            <Skeleton className='h-16 w-16 rounded-2xl' />
            <div className='space-y-3'>
              <div className='flex flex-col items-center gap-2 sm:flex-row sm:justify-start'>
                <Skeleton className='h-8 w-48' />
                <Skeleton className='h-5 w-16' />
              </div>
              <div className='flex flex-col items-center gap-1 sm:flex-row sm:justify-start sm:gap-4'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-40' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
          </div>
        </div>
        <div className='border-t'>
          <div className='divide-border/60 grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='px-4 py-3.5 sm:px-5 sm:py-4'>
                <Skeleton className='h-3.5 w-20' />
                <Skeleton className='mt-2 h-7 w-28' />
                <Skeleton className='mt-1.5 h-3.5 w-24' />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const displayName = getDisplayName(profile)
  const initials = getUserInitials(profile)
  const roleLabel = getRoleLabel(profile.role)
  const stats = [
    {
      label: t('Current Balance'),
      value: formatQuota(profile.quota),
      description: t('Remaining quota'),
      icon: WalletCards,
    },
    {
      label: t('Total Usage'),
      value: formatQuota(profile.used_quota),
      description: t('Total consumed quota'),
      icon: BarChart3,
    },
    {
      label: t('API Requests'),
      value: formatCompactNumber(profile.request_count),
      description: t('Total requests made'),
      icon: Activity,
    },
  ]

  return (
    <div className='overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card via-card to-card/50 shadow-sm'>
      <div className='p-3 sm:p-5'>
        <div className='flex items-center gap-3 text-left sm:gap-4'>
          <Avatar className='ring-background h-12 w-12 rounded-xl text-sm ring-2 shadow-md shadow-primary/20 sm:h-16 sm:w-16 sm:rounded-2xl sm:text-lg sm:ring-4'>
            <AvatarFallback className='bg-gradient-primary rounded-xl sm:rounded-2xl text-white'>
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className='min-w-0 flex-1 space-y-1.5 sm:space-y-3'>
            <div className='flex min-w-0 items-center gap-2'>
              <h1 className='truncate bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl'>
                {displayName}
              </h1>
              <StatusBadge
                label={roleLabel}
                variant='neutral'
                copyable={false}
              />
            </div>

            <div className='text-muted-foreground/70 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:gap-x-4 sm:text-sm'>
              <span className='truncate'>@{profile.username}</span>
              {profile.email && (
                <>
                  <span>•</span>
                  <span className='truncate'>{profile.email}</span>
                </>
              )}
              {profile.group && (
                <>
                  <span>•</span>
                  <span className='truncate'>{profile.group}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='border-t border-border/50'>
        <div className='grid grid-cols-3'>
          {stats.map((item, index) => (
            <div key={item.label} className={cn(
              'min-w-0 px-3 py-3 sm:px-5 sm:py-4',
              index < stats.length - 1 && 'border-r border-border/30'
            )}>
              <div className='flex items-center gap-2'>
                <div className='bg-gradient-primary/10 flex size-6 items-center justify-center rounded-md'>
                  <item.icon className='text-primary size-3.5' />
                </div>
                <div className='text-muted-foreground/70 truncate text-xs font-medium tracking-wider uppercase'>
                  {item.label}
                </div>
              </div>

              <div className='text-foreground mt-1.5 truncate font-mono text-lg font-bold tracking-tight tabular-nums sm:mt-2 sm:text-2xl'>
                {item.value}
              </div>
              <div className='text-muted-foreground/50 mt-1 hidden text-xs md:block'>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
