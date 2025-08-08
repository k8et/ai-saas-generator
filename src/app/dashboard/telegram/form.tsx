'use client'

import { useForm, Controller } from 'react-hook-form'
import { Checkbox } from '@/shared/components/ui/Checkbox/Checkbox'
import { Button, Textarea, Select } from '@shared/components/ui'
import { TelegramSchema, telegramSchema } from '@/app/dashboard/telegram/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddTelegramChannelModal } from '@/app/dashboard/telegram/components/AddTelegramChannelModal/AddTelegramChannelModal'
import { generateTelegramPost } from '@/app/dashboard/telegram/actions'
import { useTelegramChannels } from '@/app/dashboard/telegram/hooks'
import { PreviewTelegramPostModal } from '@/app/dashboard/telegram/components/PreviewTelegramPostModal'
import { useDisclose } from '@shared/hooks'
import { useState } from 'react'
import { TelegramGeneratedPostSuccess } from '@/app/dashboard/telegram/types'
import { styleOptions } from '@shared/constants/styleOptions'


export const TelegramForm = () => {
  const { isOpen, toggle } = useDisclose()
  const [post, setPost] = useState<TelegramGeneratedPostSuccess | null>(null)
  const { data: channels = [], isLoading } = useTelegramChannels()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TelegramSchema>({
    resolver: zodResolver(telegramSchema),
    defaultValues: {
      style: '',
      tg_chanel: '',
      emoji: false,
      hashtag: false,
      description: '',
    },
  })

  const onSubmit = async (data: TelegramSchema) => {
    const post = await generateTelegramPost(data)

    if ('error' in post) return

    setPost(post)

    toggle()
  }

  return (
    <div className={'space-y-1'}>
      <form className={'flex flex-col gap-1'} onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          label='Описание или тема'
          placeholder='Введите тему генерации поста...'
          {...register('description')}
          error={errors.description?.message}
        />

        <Controller
          name='style'
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              label='Стиль'
              placeholder='Выберите стиль...'
              options={styleOptions}
              error={errors.style?.message}
            />
          )}
        />

        <Controller
          name='tg_chanel'
          control={control}
          render={({ field }) => (
            <Select
              isLoading={isLoading}
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              label='Телеграм канал'
              placeholder='Выбирете телеграм канал...'
              options={channels}
              error={errors.tg_chanel?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='emoji'
          render={({ field }) => (
            <Checkbox
              label={'Сгенерировать с эмодзи'}
              error={errors.emoji?.message}
              checked={field.value}
              onCheckedChange={(val) => field.onChange(!!val)}
            />
          )}
        />

        <Controller
          name='hashtag'
          control={control}
          render={({ field }) => (
            <Checkbox
              label='Добавить хештеги'
              error={errors.hashtag?.message}
              checked={field.value}
              onCheckedChange={(val) => field.onChange(!!val)}
            />
          )}
        />

        <Button isLoading={isSubmitting} className={'w-full'} type='submit'>
          Сгенерировать
        </Button>
      </form>
      <AddTelegramChannelModal />
      <PreviewTelegramPostModal isOpen={isOpen} post={post} onToggleAction={toggle} />
    </div>
  )
}
