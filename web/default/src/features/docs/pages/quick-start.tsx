import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { PublicLayout } from '@/components/layout'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

function CodeBlock({ code }: { code: string }) {
  const { copyToClipboard } = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  return (
    <div className='bg-muted/50 border-border relative rounded-lg border'>
      <pre className='overflow-x-auto p-4 text-sm'>
        <code>{code}</code>
      </pre>
      <button
        type='button'
        className='hover:bg-muted absolute top-2 right-2 rounded-md p-1.5 transition-colors'
        onClick={() => {
          copyToClipboard(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
      >
        {copied ? <Check className='size-3.5' /> : <Copy className='size-3.5' />}
      </button>
    </div>
  )
}

function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className='flex gap-4'>
      <div className='bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold'>
        {number}
      </div>
      <div className='space-y-2 pt-1'>
        <h3 className='text-foreground text-base font-semibold'>{title}</h3>
        <div className='text-muted-foreground space-y-2 text-sm leading-relaxed'>
          {children}
        </div>
      </div>
    </div>
  )
}

export function QuickStart() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthed = !!auth?.user

  return (
    <PublicLayout>
      <div className='mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12'>
        <div className='mb-8 space-y-2 sm:mb-10'>
          <a
            href='/docs'
            className='text-muted-foreground hover:text-foreground text-sm transition-colors'
          >
            ← {t('docs.title')}
          </a>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            {t('docs.quickStart')}
          </h1>
          <p className='text-muted-foreground text-base'>
            {t('docs.quickStartSteps')}
          </p>
        </div>

        <div className='space-y-8'>
          <Step number={1} title={t('docs.getApiKey')}>
            <p>{t('docs.loginPrompt')}</p>
            {isAuthed ? (
              <a
                href='/keys'
                className='border-input hover:bg-muted inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors'
              >
                {t('docs.goToKeys')}
              </a>
            ) : (
              <a
                href='/sign-in'
                className='border-input hover:bg-muted inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors'
              >
                {t('docs.loginFirst')}
              </a>
            )}
          </Step>

          <Step number={2} title={t('docs.setEndpoint')}>
            <p>{t('docs.endpointDesc')}</p>
            <CodeBlock code={`https://your-domain.com/v1`} />
          </Step>

          <Step number={3} title={t('docs.firstRequest')}>
            <p>{t('docs.firstRequestDesc')}</p>
            <CodeBlock
              code={`curl https://your-domain.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`}
            />
          </Step>

          <Step number={4} title={t('docs.useSdk')}>
            <p>{t('docs.useSdkDesc')}</p>
            <CodeBlock
              code={`from openai import OpenAI

client = OpenAI(
    base_url="https://your-domain.com/v1",
    api_key="sk-YOUR_API_KEY",
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)`}
            />
          </Step>
        </div>

        <div className='mt-10 rounded-lg border p-5'>
          <p className='text-muted-foreground text-sm'>
            {t('docs.needHelp')}{' '}
            <a
              href='/docs/api'
              className='text-primary hover:underline'
            >
              {t('docs.api')}
            </a>
            {' '}{t('docs.fullEndpoints')}
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}
