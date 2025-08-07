'use client'

import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogBackdrop,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from '@shared/components/ui/Dialog'
import { Input, Textarea, Button } from '@shared/components/ui'
import { useEffect } from 'react'
import Image from 'next/image'
import {
  TelegramPostSchema,
  telegramPostSchema,
} from '@/app/dashboard/telegram/components/PreviewTelegramPostModal/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendToTelegram } from '@/app/dashboard/telegram/components/PreviewTelegramPostModal/actions'
import { TelegramGeneratedPostSuccess } from '@/app/dashboard/telegram/types'

export const PreviewTelegramPostModal = ({
  isOpen,
  post,
  onToggleAction,
}: {
  isOpen: boolean
  post: TelegramGeneratedPostSuccess | null
  onToggleAction: () => void
}) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TelegramPostSchema>({
    resolver: zodResolver(telegramPostSchema),
    defaultValues: {
      image_url: '',
      caption: '',
    },
  })

  const image_url = watch('image_url')

  const onSubmit = async (data: TelegramPostSchema) => {
    await sendToTelegram({
      caption: data?.caption || '',
      chatId: post?.tg_chanel || '',
      imageUrl: data?.image_url || '',
    })
    onToggleAction()
  }

  useEffect(() => {
    if (post) {
      reset({
        image_url: post?.image_url || '',
        caption: post?.content || '',
      })
    }
  }, [post, reset])

  return (
    <Dialog open={isOpen} onClose={onToggleAction}>
      <DialogBackdrop />
      <DialogPanel from='top'>
        <DialogHeader>
          <DialogTitle>Предпросмотр Telegram поста</DialogTitle>
        </DialogHeader>

        <form id='telegram-post-form' onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          <Input
            isLoading={!post}
            label='Ссылка на изображение'
            {...register('image_url')}
            error={errors.image_url?.message}
          />

          <Textarea
            isLoading={!post}
            label='Контент поста'
            {...register('caption')}
            error={errors.caption?.message}
          />

          {!post ? (
            <div className={'bg-input h-64 w-full animate-pulse rounded-md'} />
          ) : (
            image_url && (
              <Image
                unoptimized
                width={400}
                height={400}
                src={image_url}
                alt='Превью'
                className='max-h-64 w-full rounded-md border object-contain'
              />
            )
          )}
        </form>

        <DialogFooter>
          <Button
            className={'sm:w-[27%]'}
            type='button'
            variant='secondary'
            onClick={onToggleAction}
          >
            Отмена
          </Button>
          <Button
            className={'sm:w-[70%]'}
            form='telegram-post-form'
            isLoading={isSubmitting}
            type='submit'
          >
            Опубликовать
          </Button>
        </DialogFooter>
      </DialogPanel>
    </Dialog>
  )
}
