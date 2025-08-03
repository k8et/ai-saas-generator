'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@shared/components/ui'
import { registerSchema, RegisterSchema } from '@/app/auth/register/schema'
import { registerUser } from '@/app/auth/register/actions'

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex flex-col'>
      <Input
        label='Почта'
        placeholder='example@email.com'
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label='Пароль'
        placeholder={'Введите пароль'}
        {...register('password')}
        error={errors.password?.message}
      />

      <Button className={'mt-2'} type='submit' disabled={isSubmitting}>
        Зарегистрироваться
      </Button>
    </form>
  )
}
