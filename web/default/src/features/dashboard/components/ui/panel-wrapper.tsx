/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的 Panel 包装组件
 */
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface PanelWrapperProps {
  title: ReactNode
  description?: ReactNode
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  height?: string
  className?: string
  contentClassName?: string
  headerActions?: ReactNode
  children?: ReactNode
}

function PanelHeader(props: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}) {
  const heading = (
    <div className='flex flex-col gap-1'>
      <div className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-sm font-semibold text-transparent'>
        {props.title}
      </div>
      {props.description != null && (
        <div className='text-muted-foreground text-xs'>{props.description}</div>
      )}
    </div>
  )

  return (
    <div className='border-b border-border/50 px-4 py-3 sm:px-5'>
      {props.actions != null ? (
        <div className='flex items-start justify-between gap-2'>
          {heading}
          {props.actions}
        </div>
      ) : (
        heading
      )}
    </div>
  )
}

export function PanelWrapper(props: PanelWrapperProps) {
  const { t } = useTranslation()
  const resolvedEmptyMessage = props.emptyMessage ?? t('No data available')
  const height = props.height ?? 'h-64'
  const frameClassName = cn(
    'overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-md',
    props.className
  )

  if (props.loading) {
    return (
      <div className={frameClassName}>
        <PanelHeader title={props.title} description={props.description} />
        <div className={cn('p-4 sm:p-5', props.contentClassName)}>
          <Skeleton className={`w-full ${height}`} />
        </div>
      </div>
    )
  }

  if (props.empty) {
    return (
      <div className={frameClassName}>
        <PanelHeader title={props.title} description={props.description} />
        <div
          className={cn(
            'text-muted-foreground flex items-center justify-center px-4 text-sm',
            height,
            props.contentClassName
          )}
        >
          {resolvedEmptyMessage}
        </div>
      </div>
    )
  }

  return (
    <div className={frameClassName}>
      <PanelHeader
        title={props.title}
        description={props.description}
        actions={props.headerActions}
      />
      <div className={cn('p-4 sm:p-5', props.contentClassName)}>
        {props.children}
      </div>
    </div>
  )
}