'use client'

import { useForm, Controller } from 'react-hook-form'
import { Button, Textarea, Select } from '@shared/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDisclose } from '@shared/hooks'
import { useState } from 'react'
import { TikTokSchema, tikTokSchema } from '@/app/dashboard/tik-tok/schema'
import { styleOptions } from '@shared/constants/styleOptions'
import { PreviewTikTokModal } from '@/app/dashboard/tik-tok/PreviewTikTokModal/PreviewTikTokModal'
import { generateTikTokScenario } from '@/app/dashboard/tik-tok/actions'
import { TikTokGeneratedPostSuccess } from '@/app/dashboard/tik-tok/types'



export const TikTokForm = () => {
  const { isOpen, toggle } = useDisclose()
  const [post, setPost] = useState<TikTokGeneratedPostSuccess | null>(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TikTokSchema>({
    resolver: zodResolver(tikTokSchema),
    defaultValues: {
      description: '',
      style: '',
    },
  })

  const onSubmit = async (data: TikTokSchema) => {
    const result = await generateTikTokScenario(data)

    if ('error' in result) {
      console.error(result.error)
      return
    }

    setPost(result)
    toggle()
  }


  return (
    <div className={'space-y-1'}>
      <form className={'flex flex-col gap-1'} onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          label='Описание или тема видео'
          placeholder='Введите описание, тему генерацию сценария...'
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
        <Button isLoading={isSubmitting} className={'w-full'} type='submit'>
          Сгенерировать
        </Button>
      </form>
      <PreviewTikTokModal isOpen={isOpen} post={post} onToggleAction={toggle} />
    </div>
  )
}
