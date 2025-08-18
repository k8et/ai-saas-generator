import { z } from 'zod'

export const imageGeneratorSchema = z
    .object({
        description: z.string().trim().min(1, { message: 'Описание обязательно' }),

        type: z.enum(['logo', 'cover', 'avatar', 'banner', 'icon'], {
            invalid_type_error: 'Неверный тип изображения',
            required_error: 'Тип изображения обязателен',
        }),

        model: z.enum(['dall-e-2', 'dall-e-3'], {
            invalid_type_error: 'Неверная модель изображения',
            required_error: 'Модель обязательна',
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
            {
                invalid_type_error: 'Неверный размер изображения',
                required_error: 'Размер изображения обязателен',
            }
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
