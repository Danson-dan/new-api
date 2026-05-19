/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的顶部导航组件
 */
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type TopNavLink } from '../types'

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  links: TopNavLink[]
}

export function TopNav({ className, links, ...props }: TopNavProps) {
  const normalizedLinks = useMemo(
    () =>
      links.map((link) => ({
        isActive: false,
        disabled: false,
        external: false,
        ...link,
      })),
    [links]
  )

  return (
    <>
      <div className='lg:hidden'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            render={<Button size='icon' variant='ghost' className='size-8 hover:bg-primary/10' />}
          >
            <Menu className='text-primary' />
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start' className='min-w-40'>
            {normalizedLinks.map(
              ({ title, href, isActive, disabled, external }) => (
                <DropdownMenuItem
                  key={`${title}-${href}`}
                  render={
                    external ? (
                      <a
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={cn(
                          'flex items-center gap-2',
                          isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                        )}
                      >
                        {title}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className={cn(
                          'flex items-center gap-2',
                          isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                        )}
                        disabled={disabled}
                      >
                        {title}
                      </Link>
                    )
                  }
                ></DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          'hidden items-center gap-1 lg:flex xl:gap-2',
          className
        )}
        {...props}
      >
        {normalizedLinks.map(({ title, href, isActive, disabled, external }) =>
          external ? (
            <a
              key={`${title}-${href}`}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-primary bg-gradient-to-r from-primary/10 to-transparent'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              )}
            >
              {isActive && (
                <span className='absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-8 rounded-full bg-gradient-to-r from-primary to-primary/50' />
              )}
              {title}
            </a>
          ) : (
            <Link
              key={`${title}-${href}`}
              to={href}
              disabled={disabled}
              className={cn(
                'group relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-primary bg-gradient-to-r from-primary/10 to-transparent'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              )}
            >
              {isActive && (
                <span className='absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-8 rounded-full bg-gradient-to-r from-primary to-primary/50' />
              )}
              {title}
            </Link>
          )
        )}
      </nav>
    </>
  )
}