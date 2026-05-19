import { createFileRoute } from '@tanstack/react-router'
import { DocsIndex } from '@/features/docs'

export const Route = createFileRoute('/docs/')({
  component: DocsIndex,
})
