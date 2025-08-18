import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

type TelegramAuthData = {
    id: number
    first_name?: string
    last_name?: string
    username?: string
    photo_url?: string
    auth_date: number
    hash: string
}

function checkTelegramAuth(user: TelegramAuthData): boolean {
    const { hash, ...dataCheck } = user

    const secret = crypto
        .createHash('sha256')
        .update(process.env.TELEGRAM_BOT_TOKEN!)
        .digest()

    const sorted = (Object.keys(dataCheck) as (keyof typeof dataCheck)[])
        .sort()
        .map(key => `${key}=${dataCheck[key]}`)
        .join('\n')

    const hmac = crypto
        .createHmac('sha256', secret)
        .update(sorted)
        .digest('hex')

    return hmac === hash
}

export async function POST(req: Request) {
    const body: TelegramAuthData = await req.json()

    if (!checkTelegramAuth(body)) {
        return NextResponse.json({ error: 'Invalid Telegram login' }, { status: 401 })
    }

    const telegramId = String(body.id)
    const email = `telegram:${telegramId}`

    let [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
        const result = await db.insert(users).values({ email }).returning()
        user = result[0]
    }

    const token = jwt.sign({ sub: user.id, email }, process.env.JWT_SECRET!, { expiresIn: '7d' })

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
    })

    return NextResponse.json({ success: true })
}
