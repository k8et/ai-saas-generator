import { z } from 'zod'

export const tikTokSchema = z.object({
  description: z.string().trim().min(1, { message: 'Описание обязательно' }),
  style: z.string().min(1, { message: 'Выберите стиль' }),
})

export type TikTokSchema = z.infer<typeof tikTokSchema>
