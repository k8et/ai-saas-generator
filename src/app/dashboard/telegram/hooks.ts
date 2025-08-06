'use client'

import useSWR from 'swr'
import { getTelegramChannels } from '@/app/dashboard/telegram/actions'

export const TELEGRAM_CHANNELS_KEY = 'telegram-channels'

const fetcher = () => getTelegramChannels()

export const useTelegramChannels = () => {
    return useSWR(TELEGRAM_CHANNELS_KEY, fetcher)
}
