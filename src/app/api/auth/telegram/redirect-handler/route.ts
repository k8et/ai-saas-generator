import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import {cookies} from "next/headers";

type TelegramAuthData = {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

function getTelegramDataCheckString(data: Omit<TelegramAuthData, 'hash'>): string {
  return Object.entries(data)
      .filter(([, value]) => typeof value !== 'undefined') // только переданные поля
      .map(([key, value]) => `${key}=${value}`)
      .sort()
      .join('\n')
}

function isValidTelegramAuth(data: TelegramAuthData): boolean {
  const { hash, ...fields } = data

  const dataCheckString = getTelegramDataCheckString(fields)

  const secret = crypto
      .createHash('sha256')
      .update(process.env.TELEGRAM_BOT_TOKEN!)
      .digest()

  const hmac = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex')

  return hmac === hash
}

export async function POST(req: Request) {
  const body = (await req.json()) as TelegramAuthData

  if (!isValidTelegramAuth(body)) {
    console.error('Неверная подпись Telegram:', body)
    return NextResponse.json({ error: 'Invalid Telegram data' }, { status: 403 })
  }

  const telegramId = String(body.id)
  const email = `telegram:${telegramId}`

  let [user] = await db.select().from(users).where(eq(users.email, email))

  if (!user) {
    const result = await db.insert(users).values({ email }).returning()
    user = result[0]
  }

  const token = jwt.sign(
      { sub: user.id, email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
  )

  const response = NextResponse.json({ success: true, token })

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  return response
}
