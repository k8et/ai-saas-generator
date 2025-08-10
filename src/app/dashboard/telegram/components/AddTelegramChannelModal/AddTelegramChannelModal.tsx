'use client'

import { Button, Input } from '@shared/components/ui'
import { useForm } from 'react-hook-form'
import {
  telegramChannelSchema,
  TelegramChannelSchema,
} from '@/app/dashboard/telegram/components/AddTelegramChannelModal/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { addTelegramChannel } from '@/app/dashboard/telegram/components/AddTelegramChannelModal/actions'
import { mutate } from 'swr'
import { TELEGRAM_CHANNELS_KEY } from '@/app/dashboard/telegram/hooks'
import { useDisclose } from '@shared/hooks'
import { ModalWrapper } from '@shared/components/ui/ModalWrapper'

export const AddTelegramChannelModal = () => {
  const { isOpen, toggle } = useDisclose()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TelegramChannelSchema>({
    resolver: zodResolver(telegramChannelSchema),
  })

  const onSubmitAction = async (data: TelegramChannelSchema) => {
    const res = await addTelegramChannel(data)
    if ('error' in res) {
      setError('channel', {
        type: 'server',
        message: res.message || 'Не удалось добавить канал',
      })
      return
    }
    await mutate(TELEGRAM_CHANNELS_KEY)
    reset()
    toggle()
  }

  return (
    <>
      <button
        className='hover:text-foreground/50 text-sm font-semibold transition active:scale-[0.97]'
        type='button'
        onClick={toggle}
      >
        + Добавить телеграм канал
      </button>

      <ModalWrapper
        isOpen={isOpen}
        onOpenChangeAction={toggle}
        from='top'
        header={'Добавить Telegram канал'}
        body={
          <form id='telegram-channel-form' onSubmit={handleSubmit(onSubmitAction)} className='space-y-2'>
            <Input
              label='Название канала'
              placeholder='@example_channel'
              {...register('channel')}
              error={errors.channel?.message}
            />
          </form>
        }
        footer={
          <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <Button
              className='sm:w-[40%]'
              type='button'
              variant='secondary'
              onClick={toggle}
            >
              Отмена
            </Button>
            <Button
              form='telegram-channel-form'
              isLoading={isSubmitting}
              className='sm:w-[60%]'
              type='submit'
            >
              Добавить
            </Button>
          </div>
        }
      />
    </>
  )
}
