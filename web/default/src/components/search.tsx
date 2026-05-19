/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的搜索组件
 */
import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-provider'
import { Button } from './ui/button'

type SearchProps = {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({ className = '', placeholder }: SearchProps) {
  const { t } = useTranslation()
  const { setOpen } = useSearch()
  const resolvedPlaceholder = placeholder ?? t('Search')
  return (
    <Button
      variant='outline'
      className={cn(
        'group text-muted-foreground relative h-9 w-full flex-1 justify-start rounded-xl text-sm font-normal shadow-sm transition-all duration-300 sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64',
        'border border-border/50 bg-gradient-to-r from-muted/30 to-muted/20',
        'hover:border-primary/30 hover:from-primary/5 hover:to-primary/10 hover:shadow-md hover:shadow-primary/5',
        className
      )}
      onClick={() => setOpen(true)}
      aria-label={resolvedPlaceholder}
    >
      <SearchIcon
        aria-hidden='true'
        className='absolute start-2.5 top-1/2 -translate-y-1/2 text-primary transition-transform group-hover:scale-110'
        size={16}
      />
      <span className='ms-6'>{resolvedPlaceholder}</span>
      <kbd className='bg-muted/50 group-hover:bg-primary/10 pointer-events-none absolute end-1.5 top-1/2 -translate-y-1/2 hidden h-6 items-center gap-1 rounded-lg border border-border/50 px-2 font-mono text-[10px] font-medium opacity-100 select-none sm:flex'>
        <span className='text-xs'>⌘</span>
        <span className='text-primary'>{t('K')}</span>
      </kbd>
    </Button>
  )
}