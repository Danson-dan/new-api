/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的标题卡片组件
 */
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'

type TitledCardProps = {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  action?: ReactNode
  children?: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  variant?: 'default' | 'gradient'
}

export function TitledCard({
  title,
  description,
  icon,
  action,
  children,
  className,
  headerClassName,
  contentClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  variant = 'default',
}: TitledCardProps) {
  return (
    <Card className={cn('gap-0 overflow-hidden rounded-xl border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md', className)}>
      <CardHeader
        className={cn('border-border/50 bg-gradient-to-r from-card to-card/50 p-4 !pb-4 sm:p-5 sm:!pb-5', headerClassName)}
      >
        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex min-w-0 items-center gap-3'>
            {icon != null && (
              <div
                className={cn(
                  'bg-gradient-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-md shadow-primary/20',
                  iconClassName
                )}
              >
                {icon}
              </div>
            )}
            <div className='min-w-0'>
              <CardTitle
                className={cn(
                  'text-lg font-bold tracking-tight sm:text-xl',
                  titleClassName
                )}
              >
                {title}
              </CardTitle>
              {description != null && (
                <CardDescription
                  className={cn('text-xs text-muted-foreground/70 sm:text-sm', descriptionClassName)}
                >
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          {action != null && (
            <div className='w-full shrink-0 sm:w-auto'>{action}</div>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn('p-4 sm:p-5', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}