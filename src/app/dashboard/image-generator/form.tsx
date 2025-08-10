'use client'

import { useForm, Controller, useWatch } from 'react-hook-form'
import { Button, Textarea, Select } from '@shared/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { imageGeneratorSchema, ImageGeneratorSchema } from '@/app/dashboard/image-generator/schema'
import { generateImage } from '@/app/dashboard/image-generator/actions'
import { ImageGeneratorSuccess } from '@/app/dashboard/image-generator/types'
import { PreviewImageModal } from '@/app/dashboard/image-generator/PreviewImageModal/PreviewImageModal'
import { useDisclose } from '@shared/hooks'
import {
  modelOptions,
  ModelOptionsValueType,
  sizeOptionsMap,
  SizeOptionsMapValueType,
  typeOptions,
} from '@/app/dashboard/image-generator/constants'

export const ImageGeneratorForm = () => {
  const { isOpen, toggle } = useDisclose()
  const [response, setResponse] = useState<ImageGeneratorSuccess | null>(null)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ImageGeneratorSchema>({
    resolver: zodResolver(imageGeneratorSchema),
    defaultValues: {
      description: '',
      type: 'logo',
      model: 'dall-e-2',
      size: '1024x1024',
    },
  })

  const selectedModel = useWatch({ control, name: 'model' })

  const onSubmit = async (data: ImageGeneratorSchema) => {
    const result = await generateImage(data)
    if ('error' in result) {
      console.error(result.error)
      return
    }
    setResponse(result)
    toggle()
  }

  return (
    <div className='space-y-3'>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          label='Описание'
          placeholder='Опишите, что именно нужно сгенерировать...'
          {...register('description')}
          error={errors.description?.message}
        />

        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <Select
              label='Тип изображения'
              placeholder='Выберите тип...'
              options={typeOptions}
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              error={errors.type?.message}
            />
          )}
        />

        <Controller
          name='model'
          control={control}
          render={({ field }) => (
            <Select
              label='Модель'
              placeholder='Выберите модель...'
              options={modelOptions}
              value={field.value}
              onChange={(val: string) => {
                const v = val as ModelOptionsValueType
                field.onChange(v)
                const defaultSize = sizeOptionsMap[v]?.[0]?.value
                if (defaultSize) {
                  setValue('size', defaultSize as SizeOptionsMapValueType, { shouldValidate: true })
                }
              }}
              name={field.name}
              error={errors.model?.message}
            />
          )}
        />

        <Controller
          name='size'
          control={control}
          render={({ field }) => (
            <Select
              label='Размер'
              placeholder='Выберите размер...'
              options={sizeOptionsMap[selectedModel] || []}
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              error={errors.size?.message}
            />
          )}
        />

        <Button isLoading={isSubmitting} className='w-full' type='submit'>
          Сгенерировать
        </Button>
      </form>

      <PreviewImageModal item={response} isOpen={isOpen} onToggleAction={toggle} />
    </div>
  )
}
