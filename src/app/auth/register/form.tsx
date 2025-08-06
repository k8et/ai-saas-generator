'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {AlertDialog, Button, Input} from '@shared/components/ui'
import { registerSchema, RegisterSchema } from '@/app/auth/register/schema'
import { registerUser } from '@/app/auth/register/actions'
import {useState} from "react";

export const RegisterForm = () => {
    const [dialog, setDialog] = useState<{
        open: boolean
        title: string
        description: string
    }>({
        open: false,
        title: '',
        description: '',
    })

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

    const onSubmit = async (data: RegisterSchema) => {
        const res = await registerUser(data)

        if (res?.code === 'REGISTERED') {
            setDialog({
                open: true,
                title: 'Регистрация',
                description: 'Ссылка с подтверждением была отправлена на вашу почту.',
            })
        } else if (res?.code === 'USER_ALREADY_EXISTS') {
            setDialog({
                open: true,
                title: 'Ошибка',
                description: 'Пользователь с такой почтой уже зарегистрирован.',
            })
        } else {
            setDialog({
                open: true,
                title: 'Ошибка',
                description: 'Не удалось зарегистрироваться. Повторите попытку позже.',
            })
        }
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
        <AlertDialog
            open={dialog.open}
            title={dialog.title}
            description={dialog.description}
            confirmText="Ок"
            cancelText="Закрыть"
            onConfirm={() => setDialog((prev) => ({ ...prev, open: false }))}
            onCancel={() => setDialog((prev) => ({ ...prev, open: false }))}
        />
    </form>
  )
}
