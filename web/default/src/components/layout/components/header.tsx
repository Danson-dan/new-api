import { cn } from '@/lib/utils'
import { SidebarTrigger } from '@/components/ui/sidebar'

type HeaderProps = React.HTMLAttributes<HTMLElement>

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 h-[var(--app-header-height,3.5rem)] w-full shrink-0',
        'bg-background/80 backdrop-blur-xl',
        'border-b border-border/50',
        className
      )}
      {...props}
    >
      <div className='flex h-full items-center gap-1.5 px-3 sm:gap-2 sm:px-4'>
        <SidebarTrigger variant='ghost' className='size-9 hover:bg-accent' />
        {children}
      </div>
    </header>
  )
}
