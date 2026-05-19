/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的输入框组件
 */
import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot='input'
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        'h-9 w-full min-w-0 rounded-xl border bg-transparent px-3 py-1.5 text-sm transition-all duration-300',
        'outline-none focus-visible:ring-3 focus-visible:shadow-md focus-visible:shadow-primary/10',
        'disabled:cursor-not-allowed disabled:opacity-50 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      {...props}
    />
  )
}

export { Input }