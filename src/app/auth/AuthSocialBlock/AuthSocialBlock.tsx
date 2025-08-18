'use client'

import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { GoogleIcon, TelegramIcon } from '@shared/icons'
import { Button } from '@shared/components/ui'
import {appRoutes} from "@shared/constants/appRoutes";

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
    const [showTelegram, setShowTelegram] = useState(false)

    useEffect(() => {
        if (!showTelegram) return

        const script = document.createElement('script')
        script.src = 'https://telegram.org/js/telegram-widget.js?7'
        script.setAttribute('data-telegram-login', 'creon_ai_bot')
        script.setAttribute('data-size', 'large')
        script.setAttribute('data-userpic', 'false')
        script.setAttribute('data-request-access', 'write')
        script.setAttribute('data-onauth', 'TelegramLoginWidgetCallback(user)')
        script.async = true

        document.getElementById('telegram-container')?.appendChild(script)
    }, [showTelegram])

    useEffect(() => {
        window.TelegramLoginWidgetCallback = async (user: TelegramAuthData) => {
            const res = await fetch('/api/auth/telegram', {
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
        <div className="flex gap-3 w-full flex-col items-center">
            <div className="flex gap-3 w-full">
                <Button
                    variant="outline"
                    className="h-[55px] flex-1"
                    onClick={() => signIn('google')}
                >
                    <GoogleIcon className="min-w-[24px] min-h-[24px]" />
                </Button>
                <Button
                    variant="outline"
                    className="h-[55px] flex-1"
                    onClick={() => setShowTelegram(true)}
                >
                    <TelegramIcon className="min-w-[24px] min-h-[24px]" />
                </Button>
            </div>

            {showTelegram && <div id="telegram-container" className="mt-4" />}
        </div>
    )
}
