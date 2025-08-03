import { z } from 'zod'

export const registerSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: 'Email обязателен' })
        .email({ message: 'Неверный формат email' }),

    password: z
        .string()
        .trim()
        .min(8, { message: 'Минимум 8 символов' })
        .regex(/[A-Za-z]/, { message: 'Должен содержать хотя бы одну букву' })
        .regex(/\d/, { message: 'Должен содержать хотя бы одну цифру' }),
})

export type RegisterSchema = z.infer<typeof registerSchema>
