'use client'

import { Button } from '@shared/components/ui'
import { ModalWrapper } from '@shared/components/ui/ModalWrapper'
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
    <ModalWrapper
      isOpen={isOpen}
      onOpenChangeAction={onToggleAction}
      from='top'
      header={'Сценарий TikTok видео'}
      body={
        <div className='text-default-700 max-h-[500px] space-y-3 overflow-y-auto text-sm'>
          <div className='bg-muted mt-1 rounded-md p-3 text-sm leading-relaxed whitespace-pre-wrap'>
            {content}
          </div>
        </div>
      }
      footer={
        <Button className='w-full' type='button' variant='secondary' onClick={onToggleAction}>
          Закрыть
        </Button>
      }
    />
  )
}
