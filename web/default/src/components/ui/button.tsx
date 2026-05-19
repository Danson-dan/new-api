/**
 * @Author: Danson zheng
 * @Date: 2026-05-07
 * @Description: EasyRouter 风格的按钮组件
 */
import { isValidElement } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/25',
        outline:
          'border-border/50 bg-background hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white hover:shadow-lg hover:shadow-primary/30 hover:from-primary hover:via-primary/95 hover:to-primary/85',
        'gradient-success': 'bg-gradient-to-r from-success via-success/90 to-success/80 text-white hover:shadow-lg hover:shadow-success/30 hover:from-success hover:via-success/95 hover:to-success/85',
        'gradient-info': 'bg-gradient-to-r from-info via-info/90 to-info/80 text-white hover:shadow-lg hover:shadow-info/30 hover:from-info hover:via-info/95 hover:to-info/85',
        'gradient-warning': 'bg-gradient-to-r from-warning via-warning/90 to-warning/80 text-white hover:shadow-lg hover:shadow-warning/30 hover:from-warning hover:via-warning/95 hover:to-warning/85',
        'gradient-danger': 'bg-gradient-to-r from-danger via-danger/90 to-danger/80 text-white hover:shadow-lg hover:shadow-danger/30 hover:from-danger hover:via-danger/95 hover:to-danger/85',
      },
      size: {
        default:
          'h-9 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xs: "h-7 gap-1.5 rounded-lg px-2.5 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-10 gap-2 px-5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xl: 'h-11 gap-2.5 px-6 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
        icon: 'size-9 rounded-xl',
        'icon-xs':
          "size-7 rounded-lg in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-8 rounded-lg in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function isNativeButtonRender(render: ButtonPrimitive.Props['render']) {
  if (!render || !isValidElement(render)) {
    return true
  }

  return render.type === 'button'
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  nativeButton,
  render,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      nativeButton={nativeButton ?? isNativeButtonRender(render)}
      render={render}
      {...props}
    />
  )
}

export { Button, buttonVariants }