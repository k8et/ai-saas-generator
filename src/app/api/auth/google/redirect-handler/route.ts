import { getServerSession } from 'next-auth'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { appRoutes } from '@shared/constants/appRoutes'
import {authOptions} from "@shared/lib/auth-options";

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return NextResponse.redirect(`${process.env.BASE_URL}/auth?error=google_auth_failed`)
    }

    const email = session.user.email

    let [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
        const result = await db
            .insert(users)
            .values({
                email,
            })
            .returning()

        user = result[0]
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
