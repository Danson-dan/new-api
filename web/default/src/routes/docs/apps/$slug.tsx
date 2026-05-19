import { createFileRoute } from '@tanstack/react-router'
import { AppsDetail } from '@/features/docs/pages/apps-detail'

export const Route = createFileRoute('/docs/apps/$slug')({
  component: AppsDetail,
})
