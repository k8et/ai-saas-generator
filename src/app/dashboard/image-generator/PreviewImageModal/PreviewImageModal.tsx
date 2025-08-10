'use client'

import { ModalWrapper } from '@shared/components/ui/ModalWrapper'
import { Button } from '@shared/components/ui'
import { ImageGeneratorSuccess } from '@/app/dashboard/image-generator/types'
import Image from 'next/image'

export const PreviewImageModal = ({
  isOpen,
  item,
  onToggleAction,
}: {
  isOpen: boolean
  item: ImageGeneratorSuccess | null
  onToggleAction: () => void
}) => {
  if (!item) return null

  const { imageUrl, description, type, model, size } = item

  return (
    <ModalWrapper
      isOpen={isOpen}
      onOpenChangeAction={onToggleAction}
      from='top'
      header={'Сгенерированное изображение'}
      body={
        <div className='space-y-3'>
          <div className='border-default-200 bg-content1 rounded-md border p-2'>
            <div className='relative h-[320px] w-full'>
              <Image
                unoptimized
                src={imageUrl}
                alt={description || 'Сгенерированное изображение'}
                fill
                sizes='(max-width: 768px) 100vw, 800px'
                className='rounded-md object-contain'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3 text-sm max-sm:grid-cols-1'>
            <div>
              <div>Тип</div>
              <div className='text-muted-foreground font-medium'>{type}</div>
            </div>
            <div>
              <div>Модель</div>
              <div className='text-muted-foreground font-medium'>{model}</div>
            </div>
            <div>
              <div>Размер</div>
              <div className='text-muted-foreground font-medium'>{size}</div>
            </div>
            <div>
              <div>Описание</div>
              <div className='text-muted-foreground line-clamp-3'>{description}</div>
            </div>
          </div>
        </div>
      }
      footer={
        <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
          <Button className='sm:w-[30%]' type='button' variant='secondary' onClick={onToggleAction}>
            Закрыть
          </Button>
          <a className='sm:w-[70%]' href={imageUrl} target='_blank' rel='noopener noreferrer'>
            <Button className='w-full' type='button'>
              Открыть/скачать
            </Button>
          </a>
        </div>
      }
    />
  )
}
