import { ImageGeneratorSchema } from '@/app/dashboard/image-generator/schema'

export type ModelOptionsValueType = ImageGeneratorSchema['model']
export type SizeOptionsMapValueType  = ImageGeneratorSchema['size']

export const typeOptions = [
  { label: 'Логотип', value: 'logo' },
  { label: 'Обложка', value: 'cover' },
  { label: 'Аватар', value: 'avatar' },
  { label: 'Баннер', value: 'banner' },
  { label: 'Иконка', value: 'icon' },
]

export const modelOptions: { label: string; value: ModelOptionsValueType }[] = [
  { label: 'DALL·E 2', value: 'dall-e-2' },
  { label: 'DALL·E 3', value: 'dall-e-3' },
]

export const sizeOptionsMap: Record<ModelOptionsValueType, { label: string; value: SizeOptionsMapValueType }[]> = {
  'dall-e-2': [
    { label: '256x256', value: '256x256' },
    { label: '512x512', value: '512x512' },
    { label: '1024x1024', value: '1024x1024' },
  ],
  'dall-e-3': [
    { label: '1024x1024', value: '1024x1024' },
    { label: '1792x1024', value: '1792x1024' },
    { label: '1024x1792', value: '1024x1792' },
  ],
}
