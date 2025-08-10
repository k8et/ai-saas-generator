import { z } from 'zod'

export const imageGeneratorSchema = z.object({
  description: z.string().trim().min(1, { message: 'Описание обязательно' }),

  type: z.enum(['logo', 'cover', 'avatar', 'banner', 'icon'], {
    error: 'Неверный тип изображения',
  }),

  model: z.enum(['dall-e-2', 'dall-e-3'], {
    error: 'Неверная модель изображения',
  }),

  size: z.enum(
    [
      'auto',
      '256x256',
      '512x512',
      '1024x1024',
      '1792x1024',
      '1024x1792',
      '1024x1536',
      '1536x1024',
    ],
    { error: 'Неверный размер изображения' },
  ),
})
  .superRefine((val, ctx) => {
    const validSizes: Record<string, string[]> = {
      'dall-e-2': ['256x256', '512x512', '1024x1024'],
      'dall-e-3': ['1024x1024', '1792x1024', '1024x1792'],
    }

    if (val.size === 'auto') return

    const allowed = validSizes[val.model]
    if (allowed && !allowed.includes(val.size)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Неверный размер для выбранной модели',
        path: ['size'],
      })
    }
  })

export type ImageGeneratorSchema = z.infer<typeof imageGeneratorSchema>
