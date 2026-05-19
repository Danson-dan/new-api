import { createFileRoute } from '@tanstack/react-router'
import { QuickStart } from '@/features/docs/pages/quick-start'

export const Route = createFileRoute('/docs/quick-start')({
  component: QuickStart,
})
