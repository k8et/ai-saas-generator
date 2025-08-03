import { z } from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: 'Email обязателен' })
        .email({ message: 'Неверный формат email' }),

    password: z
        .string()
        .trim()
        .min(1, { message: 'Пароль обязателен' }),
})

export type LoginSchema = z.infer<typeof loginSchema>
