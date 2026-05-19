import { createFileRoute } from '@tanstack/react-router'
import { ApiIndex } from '@/features/docs/pages/api'

export const Route = createFileRoute('/docs/api')({
  component: ApiIndex,
})
