'use client'

import { useForm, Controller } from 'react-hook-form'
import { Checkbox } from '@/shared/components/ui/Checkbox/Checkbox'
import { Button, Textarea, Select } from '@shared/components/ui'
import { TelegramSchema, telegramSchema } from '@/app/dashboard/telegram/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddTelegramChannelModal } from '@/app/dashboard/telegram/components/AddTelegramChannelModal/AddTelegramChannelModal'
import { generateAndSendPost } from '@/app/dashboard/telegram/actions'

export const TelegramForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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
    const res = await generateAndSendPost(data)
    console.log(res, 'res')
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
              options={[{ label: 'Формальный', value: 'formal' }]}
              error={errors.style?.message}
            />
          )}
        />

        <Controller
          name='tg_chanel'
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              label='Телеграм канал'
              placeholder='Выбирете телеграм канал...'
              options={[{ label: '@tg_chanel', value: 'tg_chanel' }]}
              error={errors.tg_chanel?.message}
            />
          )}
        />

        <Controller
          name='emoji'
          control={control}
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

        <Button className={'w-full'} type='submit'>
          Сгенерировать
        </Button>
      </form>
      <AddTelegramChannelModal />
    </div>
  )
}
