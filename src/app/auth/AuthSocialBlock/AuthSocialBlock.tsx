'use client'

import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { GoogleIcon, TelegramIcon } from '@shared/icons'
import { Button } from '@shared/components/ui'
import { appRoutes } from '@shared/constants/appRoutes'

type TelegramAuthData = {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

declare global {
  interface Window {
    TelegramLoginWidgetCallback: (user: TelegramAuthData) => void
  }
}

export const AuthSocialBlock = () => {
  useEffect(() => {
    if (document.getElementById('telegram-login-script')) return

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?7'
    script.setAttribute('data-telegram-login', 'creon_ai_bot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-request-access', 'write')
    script.setAttribute('data-onauth', 'TelegramLoginWidgetCallback(user)')
    script.async = true
    script.id = 'telegram-login-script'

    document.getElementById('telegram-container')?.appendChild(script)
  }, [])

  useEffect(() => {
    window.TelegramLoginWidgetCallback = async (user: TelegramAuthData) => {
      const res = await fetch('/api/auth/telegram/redirect-handler', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        window.location.href = appRoutes.DASHBOARD_ROUTE
      } else {
        alert('Ошибка авторизации через Telegram')
      }
    }
  }, [])

  return (
    <div className='flex w-full flex-col items-center gap-3'>
      <div className='flex w-full gap-3'>
        <Button
          variant='outline'
          className='h-[55px] flex-1 hover:!bg-transparent'
          onClick={() => signIn('google')}
        >
          <GoogleIcon className='min-h-[24px] min-w-[24px]' />
        </Button>

        <div className='group relative h-[55px] flex-1'>
          <div
            id='telegram-container'
            className='absolute inset-0 z-0 flex items-center justify-center'
          />

          <div className='pointer-events-none absolute inset-0 z-10'>
            <Button
              variant='outline'
              className={`pointer-events-none h-full w-full transition-colors duration-200`}
            >
              <TelegramIcon className='min-h-[24px] min-w-[24px]' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
