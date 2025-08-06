'use client'

import { Button, Input } from '@shared/components/ui'
import React, { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from '@shared/components/ui/Dialog'
import { useForm } from 'react-hook-form'
import {
  telegramChannelSchema,
  TelegramChannelSchema,
} from '@/app/dashboard/telegram/components/AddTelegramChannelModal/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { addTelegramChannel } from '@/app/dashboard/telegram/components/AddTelegramChannelModal/actions'
import {mutate} from "swr";
import {TELEGRAM_CHANNELS_KEY} from "@/app/dashboard/telegram/hooks";

export const AddTelegramChannelModal = () => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
      reset,
    formState: { errors, isSubmitting },
  } = useForm<TelegramChannelSchema>({
    resolver: zodResolver(telegramChannelSchema),
  })

  const onSubmit = async (data: TelegramChannelSchema) => {
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
    setOpen(false)
  }

  return (
    <>
      <button
        className={'hover:text-foreground/50 text-sm font-semibold transition active:scale-[0.97]'}
        type={'button'}
        onClick={() => setOpen(true)}
      >
        + Добавить телеграм канал
      </button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogBackdrop />

        <DialogPanel from='top'>
          <DialogHeader>
            <DialogTitle>Добавить Telegram канал</DialogTitle>
          </DialogHeader>
          <form id='telegram-channel-form' onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
            <Input
              label='Название канала'
              placeholder='@example_channel'
              {...register('channel')}
              error={errors.channel?.message}
            />
          </form>

          <DialogFooter>
            <Button
              className='sm:w-[40%]'
              type='button'
              variant='secondary'
              onClick={() => setOpen(false)}
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
          </DialogFooter>
        </DialogPanel>
      </Dialog>
    </>
  )
}
