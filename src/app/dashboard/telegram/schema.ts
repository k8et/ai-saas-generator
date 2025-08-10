import { z } from 'zod'

export const telegramSchema = z.object({
  description: z.string().trim().min(1, { message: 'Описание обязательно' }),

  style: z.string().min(1, { message: 'Выберите стиль' }),

  emoji: z.boolean(),

  hashtag: z.boolean(),

  tg_chanel: z.string().min(1, { message: 'Выберите телеграм канал' }),

  generateImage: z.boolean().default(false),
})

export type TelegramSchema = z.infer<typeof telegramSchema>
