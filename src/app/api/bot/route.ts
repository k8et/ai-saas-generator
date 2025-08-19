import { bot } from '@/shared/lib/tg/bot'
import { NextRequest } from 'next/server'
import type { IncomingMessage, ServerResponse } from 'http'

const handler = bot.webhookCallback('next-js')

export async function POST(req: NextRequest) {
    console.log('📩 Webhook получен')
    const res = new Response()
    await handler(req as unknown as IncomingMessage, res as unknown as ServerResponse)
    return res
}
