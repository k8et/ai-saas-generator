import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

type TelegramAuthData = {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export async function POST(req: Request) {
  const body = (await req.json()) as TelegramAuthData


  const telegramId = String(body.id)
  const email = `telegram:${telegramId}`

  let [user] = await db.select().from(users).where(eq(users.email, email))

  if (!user) {
    const result = await db.insert(users).values({ email }).returning()
    user = result[0]
  }

  const token = jwt.sign({ sub: user.id, email }, process.env.JWT_SECRET!, { expiresIn: '7d' })

  const response = NextResponse.json({ success: true, token })

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  return response
}
