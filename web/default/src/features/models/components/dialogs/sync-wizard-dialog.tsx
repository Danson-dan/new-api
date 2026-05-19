import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { syncUpstream } from '../../api'
import { modelsQueryKeys, vendorsQueryKeys } from '../../lib'

type SyncWizardDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SyncWizardDialog({
  open,
  onOpenChange,
}: SyncWizardDialogProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const response = await syncUpstream()

      if (response.success) {
        const d = response.data || {}
        const created = d.created_models || 0
        const channels = (d.channel_results || []) as Array<{
          channel_name: string
          models_fetched: number
          models_created: number
          error?: string
        }>
        const failed = channels.filter((c) => c.error).length
        const msg =
          failed > 0
            ? `Sync completed! Created ${created} model metadata entries. ${failed} channel(s) failed.`
            : `Sync completed! Created ${created} model metadata entries.`
        toast.success(msg)
        queryClient.invalidateQueries({ queryKey: modelsQueryKeys.lists() })
        queryClient.invalidateQueries({ queryKey: vendorsQueryKeys.lists() })
        onOpenChange(false)
      } else {
        toast.error(response.message || 'Sync failed')
      }
    } catch (error: unknown) {
      toast.error((error as Error)?.message || 'Sync failed')
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex max-h-[90vh] w-full flex-col gap-4 p-4 sm:max-w-md sm:p-6'>
        <DialogHeader className='flex-shrink-0 text-start'>
          <DialogTitle>{t('Sync Upstream Models')}</DialogTitle>
          <DialogDescription>
            {t(
              'Pull model metadata from your EasyRouter upstream channels. New models will be automatically created.'
            )}
          </DialogDescription>
        </DialogHeader>

        <div className='bg-muted/50 rounded-lg border p-4'>
          <p className='text-muted-foreground text-sm'>
            {t(
              'This will query all enabled EasyRouter channels, fetch their model lists, and create metadata records for any models not yet in your system.'
            )}
          </p>
        </div>

        <DialogFooter className='flex-shrink-0 gap-2 sm:justify-end'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isSyncing}
          >
            {t('Cancel')}
          </Button>
          <Button onClick={handleSync} disabled={isSyncing}>
            {isSyncing && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            <RefreshCw className='mr-2 h-4 w-4' />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
