'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@shared/components/ui'
import { loginSchema, LoginSchema } from '@/app/auth/login/schema'
import { loginUser } from '@/app/auth/login/actions'
import { useRouter } from "next/navigation";

export const LoginForm = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginSchema) => {
        const result = await loginUser(data)
        if (result.success && result.redirectTo) {
            router.push(result.redirectTo)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-1 flex flex-col'>
            <Input
                autoComplete='username'
                label='Почта'
                placeholder='example@email.com'
                {...register('email')}
                error={errors.email?.message}
            />

            <Input
                autoComplete='current-password'
                label='Пароль'
                placeholder='Введите пароль'
                type='password'
                {...register('password')}
                error={errors.password?.message}
            />

            <Button className='mt-2' type='submit' isLoading={isSubmitting}>
                Войти
            </Button>

        </form>
    )
}
