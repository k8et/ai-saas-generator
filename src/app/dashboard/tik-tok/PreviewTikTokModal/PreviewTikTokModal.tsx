'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from '@shared/components/ui/Dialog'
import { Button } from '@shared/components/ui'
import { TikTokGeneratedPostSuccess } from '@/app/dashboard/tik-tok/types'

export const PreviewTikTokModal = ({
  isOpen,
  post,
  onToggleAction,
}: {
  isOpen: boolean
  post: TikTokGeneratedPostSuccess | null
  onToggleAction: () => void
}) => {
  if (!post) return null

  const { content } = post

  return (
    <Dialog open={isOpen} onClose={onToggleAction}>
      <DialogBackdrop />
      <DialogPanel from='top'>
        <DialogHeader>
          <DialogTitle>Сценарий TikTok видео</DialogTitle>
        </DialogHeader>

        <div className='text-default-700 max-h-[500px] space-y-3 overflow-y-auto text-sm'>
          <div className='bg-muted mt-1 rounded-md p-3 text-sm leading-relaxed whitespace-pre-wrap'>
            {content}
          </div>
        </div>

        <DialogFooter>
          <Button className='w-full' type='button' variant='secondary' onClick={onToggleAction}>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogPanel>
    </Dialog>
  )
}
