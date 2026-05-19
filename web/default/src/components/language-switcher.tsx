/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的语言切换组件
 */
import { useCallback } from 'react'
import { Languages, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
]

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const user = useAuthStore((s) => s.auth.user)

  const handleChangeLanguage = useCallback(
    async (code: string) => {
      await i18n.changeLanguage(code)
      if (user) {
        try {
          await api.put('/api/user/self', { language: code })
        } catch {
          // Best-effort persistence
        }
      }
    },
    [i18n, user]
  )

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='h-9 w-9 rounded-xl transition-all duration-300 hover:bg-primary/10 hover:shadow-md hover:shadow-primary/5'
          />
        }
      >
        <Languages className='size-[1.2rem] text-primary' />
        <span className='sr-only'>{t('Change language')}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-36 rounded-xl border border-border/50 p-1'>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChangeLanguage(lang.code)}
            className={cn(
              'mx-1 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10',
              i18n.language === lang.code && 'bg-primary/10 text-primary font-medium'
            )}
          >
            {lang.label}
            <Check
              size={14}
              className={cn('ms-auto text-primary', i18n.language !== lang.code && 'hidden')}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}