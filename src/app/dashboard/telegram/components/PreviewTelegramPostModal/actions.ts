'use server'

import * as process from "node:process";

export async function sendToTelegram({
  caption,
  imageUrl,
  chatId,
}: {
  caption: string
  imageUrl: string
  chatId: string
}) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: imageUrl,
        caption,
        parse_mode: 'HTML',
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[Telegram Send Error]', text)
    }
  } catch (err) {
    console.error('[Telegram Exception]', err)
    throw err
  }
}
