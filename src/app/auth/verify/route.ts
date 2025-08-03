import { db } from '@/db'
import { emailVerification, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import {appRoutes} from "@shared/constants/appRoutes";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    if (!code) {
        return NextResponse.json({ success: false, code: 'NO_CODE_PROVIDED' }, { status: 400 })
    }

    const [record] = await db
        .select()
        .from(emailVerification)
        .where(eq(emailVerification.code, code))

    if (!record || record.expiresAt < new Date()) {
        return NextResponse.json({ success: false, code: 'CODE_INVALID_OR_EXPIRED' }, { status: 400 })
    }

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, record.email))

    if (!user) {
        return NextResponse.json({ success: false, code: 'USER_NOT_FOUND' }, { status: 404 })
    }

    const token = jwt.sign(
        {
            sub: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '7d',
        }
    )


    const cookieStore = await cookies()
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
    })

    return NextResponse.redirect(`${process.env.BASE_URL}${appRoutes.DASHBOARD_ROUTE}`)
}
