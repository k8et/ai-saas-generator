import { z } from 'zod'

export const telegramPostSchema = z.object({
    image_url: z.string().url({ message: 'Некорректная ссылка на изображение' }),
    caption: z.string().min(1, 'Контент обязателен'),
})

export type TelegramPostSchema = z.infer<typeof telegramPostSchema>