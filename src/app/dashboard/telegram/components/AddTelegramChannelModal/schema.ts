import { z } from 'zod'

export const telegramChannelSchema = z.object({
    channel: z
        .string()
        .trim()
        .min(1, { message: 'Название канала обязательно' })
        .regex(/^@\w+$/, { message: 'Формат должен начинаться с @ и содержать только буквы/цифры/подчёркивания' }),
})

export type TelegramChannelSchema = z.infer<typeof telegramChannelSchema>
