/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的用户下拉菜单组件
 */
import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { User, Wallet, LogOut, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { getUserAvatarFallback, getUserAvatarStyle } from '@/lib/avatar'
import { ROLE } from '@/lib/roles'
import useDialogState from '@/hooks/use-dialog'
import { useUserDisplay } from '@/hooks/use-user-display'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutDialog } from '@/components/sign-out-dialog'

const avatarFallbackClassName = 'font-semibold text-white'

export function ProfileDropdown() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useDialogState()
  const user = useAuthStore((state) => state.auth.user)
  const { displayName, roleLabel } = useUserDisplay(user)
  const isSuperAdmin = user?.role === ROLE.SUPER_ADMIN
  const avatarName = user?.username || displayName
  const avatarFallback = getUserAvatarFallback(avatarName)
  const avatarFallbackStyle = useMemo(
    () => getUserAvatarStyle(avatarName),
    [avatarName]
  )

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          render={
            <Button
              variant='ghost'
              className='relative size-9 rounded-xl p-0 transition-all duration-300 hover:bg-primary/10'
            />
          }
        >
          <div className='avatar-gradient p-[2px]'>
            <Avatar className='size-6'>
              <AvatarFallback
                className={`${avatarFallbackClassName} text-[11px]`}
                style={avatarFallbackStyle}
              >
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' sideOffset={8} className='w-60 overflow-hidden rounded-xl border border-border/50 p-1'>
          <div className='flex items-center gap-3 px-3 py-3'>
            <div className='avatar-gradient p-[2px]'>
              <Avatar className='size-10'>
                <AvatarFallback
                  className={`${avatarFallbackClassName} text-sm`}
                  style={avatarFallbackStyle}
                >
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className='flex flex-1 flex-col gap-0.5 overflow-hidden'>
              <p className='bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text truncate text-sm font-semibold text-transparent'>
                {displayName}
              </p>
              <div className='flex items-center gap-1.5'>
                <span className='badge-gradient text-[10px]'>{roleLabel}</span>
                {user?.group && (
                  <>
                    <span className='text-muted-foreground text-xs'>·</span>
                    <span className='text-muted-foreground truncate text-xs'>
                      {String(user.group)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className='my-1 bg-gradient-to-r from-transparent via-border to-transparent' />

          <DropdownMenuItem
            onClick={() => navigate({ to: '/profile' })}
            className='mx-1 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10'
          >
            <User className='size-4 text-primary' />
            <span className='ml-2'>{t('Profile')}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate({ to: '/wallet' })}
            className='mx-1 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10'
          >
            <Wallet className='size-4 text-primary' />
            <span className='ml-2'>{t('Wallet')}</span>
          </DropdownMenuItem>

          {isSuperAdmin && (
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: '/system-settings/site/$section',
                  params: { section: 'system-info' },
                })
              }
              className='mx-1 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10'
            >
              <Settings className='size-4 text-primary' />
              <span className='ml-2'>{t('System Settings')}</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator className='my-1 bg-gradient-to-r from-transparent via-border to-transparent' />

          <DropdownMenuItem
            variant='destructive'
            onClick={() => setOpen(true)}
            className='mx-1 rounded-lg px-3 py-2 transition-colors hover:bg-destructive/10'
          >
            <LogOut className='size-4' />
            <span className='ml-2'>{t('Sign out')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}