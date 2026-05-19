type SettingsSectionProps = {
  title: string
  titleProps?: React.HTMLAttributes<HTMLHeadingElement>
  description?: string
  children: React.ReactNode
  className?: string
}

export function SettingsSection({
  title,
  titleProps,
  description,
  children,
  className,
}: SettingsSectionProps) {
  const baseClassName = 'space-y-5'
  const sectionClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName

  return (
    <section className={sectionClassName}>
      <div className='space-y-1.5'>
        <h3
          {...titleProps}
          className={
            titleProps?.className
              ? `text-base font-semibold ${titleProps.className}`
              : 'text-base font-semibold'
          }
        >
          {title}
        </h3>
        {description && (
          <p className='text-muted-foreground/70 text-sm'>{description}</p>
        )}
      </div>
      <div className='rounded-xl border border-border/50 bg-card/80 p-5 shadow-sm'>
        {children}
      </div>
    </section>
  )
}
