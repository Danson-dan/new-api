import { createFileRoute } from '@tanstack/react-router'
import { AppsIndex } from '@/features/docs/pages/apps'

export const Route = createFileRoute('/docs/apps')({
  component: AppsIndex,
})
