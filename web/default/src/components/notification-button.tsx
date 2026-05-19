/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的通知按钮组件
 */
import { Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface NotificationButtonProps {
  unreadCount: number
  onClick: () => void
  className?: string
}

export function NotificationButton({
  unreadCount,
  onClick,
  className,
}: NotificationButtonProps) {
  const { t } = useTranslation()
  return (
    <div className='relative'>
      <Button
        variant='ghost'
        size='icon'
        onClick={onClick}
        className={cn(
          'h-9 w-9 rounded-xl transition-all duration-300 hover:bg-primary/10 hover:shadow-md hover:shadow-primary/5',
          className
        )}
        aria-label={t('Notifications')}
      >
        <Bell className='size-[1.2rem] text-primary' />
      </Button>

      {unreadCount > 0 && (
        <Badge
          variant='destructive'
          className='absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/70 px-1.5 text-[10px] font-semibold tabular-nums shadow-md'
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </div>
  )
}