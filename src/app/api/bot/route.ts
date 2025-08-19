import { bot } from '@/shared/lib/tg/bot'
import type { NextRequest } from 'next/server'
import type { IncomingMessage, ServerResponse } from 'http'

const handler = bot.webhookCallback('/api/auth/bot')

export async function POST(req: NextRequest) {
    console.log('📩 Входящий запрос от Telegram')

    const res = new Response()

    await handler(req as unknown as IncomingMessage, res as unknown as ServerResponse)

    return res
}
