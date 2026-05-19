/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的统计卡片组件
 */
import type { ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

type StatCardTone = 'primary' | 'success' | 'info' | 'warning'

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  sparkline?: number[]
  tone?: StatCardTone
  loading?: boolean
  error?: boolean
  action?: ReactNode
}

const TONE_GRADIENTS: Record<StatCardTone, string> = {
  primary: 'from-primary/80 via-primary/40 to-primary/10 dark:from-primary/70 dark:via-primary/30 dark:to-primary/5',
  success: 'from-success/80 via-success/40 to-success/10 dark:from-success/70 dark:via-success/30 dark:to-success/5',
  info: 'from-info/80 via-info/40 to-info/10 dark:from-info/70 dark:via-info/30 dark:to-info/5',
  warning: 'from-warning/80 via-warning/40 to-warning/10 dark:from-warning/70 dark:via-warning/30 dark:to-warning/5',
}

const TONE_ICONS: Record<StatCardTone, string> = {
  primary: 'bg-gradient-primary text-primary-foreground',
  success: 'bg-gradient-success text-success-foreground',
  info: 'bg-gradient-info text-info-foreground',
  warning: 'bg-gradient-warning text-warning-foreground',
}

function normalizeSparkline(values?: number[]): number[] {
  if (!values?.length) return []

  const sanitized = values.map((value) => Math.max(0, Number(value) || 0))
  const max = Math.max(...sanitized)
  if (max <= 0) return sanitized.map(() => 0)

  return sanitized.map((value) => Math.max(8, (value / max) * 100))
}

export function StatCard(props: StatCardProps) {
  const Icon = props.icon
  const tone = props.tone ?? 'primary'
  const sparkline = normalizeSparkline(props.sparkline)

  return (
    <div className='group flex min-h-32 flex-col justify-between gap-3 rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5'>
      <div className='flex items-start justify-between gap-1'>
        <div className='flex items-center gap-2 text-xs font-medium text-muted-foreground'>
          <div className={cn('rounded-lg p-1.5', TONE_ICONS[tone])}>
            <Icon className='size-3.5' aria-hidden='true' />
          </div>
          <span className='line-clamp-2 leading-snug'>{props.title}</span>
        </div>
        {props.action && <div className='shrink-0'>{props.action}</div>}
      </div>

      {props.loading ? (
        <div className='flex flex-col gap-1.5'>
          <Skeleton className='h-8 w-28' />
          <Skeleton className='h-3.5 w-36' />
        </div>
      ) : props.error ? (
        <div className='flex flex-col gap-1'>
          <div className='mt-0.5 bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-mono text-2xl font-bold tracking-tight text-transparent'>
            --
          </div>
          <p className='text-muted-foreground/60 text-xs'>
            {props.description}
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-1'>
          <div className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text font-mono text-2xl font-bold tracking-tight text-transparent'>
            {props.value}
          </div>
          <p className='text-muted-foreground/60 text-xs leading-relaxed'>
            {props.description}
          </p>
        </div>
      )}

      <div className='flex h-10 items-end gap-1' aria-hidden='true'>
        {sparkline.map((height, index) => (
          <span
            key={`${props.title}-spark-${index}`}
            className={cn(
              'flex-1 rounded-t-sm transition-all duration-300',
              height <= 0 && 'opacity-20',
              'bg-linear-to-t',
              TONE_GRADIENTS[tone]
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}