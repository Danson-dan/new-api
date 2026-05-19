import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type SystemBrandProps = {
  defaultName?: string
  defaultVersion?: string
  /**
   * Visual layout:
   * - 'sidebar': stacked card style (used inside the sidebar header).
   * - 'inline': compact horizontal pill (used inside the top app bar).
   */
  variant?: 'sidebar' | 'inline'
}

/**
 * System brand component
 * Displays current system logo + name.
 * - inline: compact pill in the top app bar; clicking navigates to home (/)
 * - sidebar: stacked card in the sidebar header (display only)
 */
export function SystemBrand(props: SystemBrandProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const { logo } = useSystemConfig()

  const variant = props.variant ?? 'sidebar'
  const name = status?.system_name || props.defaultName || 'New API'
  const version =
    status?.version || props.defaultVersion || t('Unknown version')

  if (variant === 'inline') {
    return (
      <Link
        to='/'
        aria-label={t('Go to home')}
        className={cn(
          'inline-flex h-9 items-center gap-2 rounded-xl px-2 text-sm font-semibold transition-all duration-300',
          'bg-gradient-to-r from-primary/10 via-primary/5 to-transparent',
          'hover:from-primary/20 hover:via-primary/10',
          'focus-visible:ring-2 focus-visible:ring-primary/50',
          'border border-primary/10 hover:border-primary/20'
        )}
      >
        <div className='flex size-6 items-center justify-center overflow-hidden rounded-lg'>
          <img
            src={logo}
            alt={t('Logo')}
            className='size-full rounded-lg object-cover'
          />
        </div>
        <span className='max-w-[12rem] truncate bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
          {name}
        </span>
      </Link>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='hover:text-sidebar-foreground active:text-sidebar-foreground cursor-default hover:bg-transparent active:bg-transparent'
          render={<div />}
        >
          <div className='flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg'>
            <img
              src={logo}
              alt={t('Logo')}
              className='size-full rounded-lg object-cover'
            />
          </div>
          <div className='grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden'>
            <span className='truncate font-semibold'>{name}</span>
            <span className='truncate text-xs'>{version}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
