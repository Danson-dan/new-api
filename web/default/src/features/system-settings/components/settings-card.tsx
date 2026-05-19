/**
 * @Author: Danson zheng
 * @Date: 2026-05-08
 * @Description: EasyRouter 风格的设置卡片组件
 */
import { memo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

type SettingsCardProps = {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export const SettingsCard = memo(function SettingsCard({
  title,
  description,
  children,
  className,
}: SettingsCardProps) {
  return (
    <Card className={`overflow-hidden rounded-xl border-border/50 shadow-sm ${className}`}>
      <CardHeader className='bg-gradient-to-r from-card to-card/50'>
        <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
        {description && (
          <CardDescription className='text-muted-foreground/70'>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className='space-y-4'>{children}</CardContent>
    </Card>
  )
})