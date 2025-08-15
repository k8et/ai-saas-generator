'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { appRoutes } from '@shared/constants/appRoutes'

export async function loginUser(data: { email: string; password: string }) {
    console.log('[LOGIN_USER] Start loginUser server action')

    try {
        console.log('[LOGIN_USER] Payload received:', data)

        const [user] = await db.select().from(users).where(eq(users.email, data.email))
        console.log('[LOGIN_USER] DB user result:', user)

        if (!user || user.password !== data.password) {
            console.warn('[LOGIN_USER] Invalid credentials:', { email: data.email })
            return { success: false, code: 'INVALID_CREDENTIALS' }
        }

        if (!process.env.JWT_SECRET) {
            console.error('[LOGIN_USER] JWT_SECRET is missing in env!')
            return { success: false, code: 'CONFIG_ERROR' }
        }

        const token = jwt.sign(
          {
              sub: user.id,
              email: user.email,
          },
          process.env.JWT_SECRET,
          {
              expiresIn: '7d',
          }
        )

        console.log('[LOGIN_USER] JWT created:', token)

        const cookieStore = await cookies()
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
        })

        const redirectTo = `${process.env.BASE_URL}${appRoutes.DASHBOARD_ROUTE}`
        console.log('[LOGIN_USER] Login successful, redirecting to:', redirectTo)

        return {
            success: true,
            redirectTo,
        }
    } catch (e) {
        console.error('[LOGIN_USER_ERROR]', e)
        return { success: false, code: 'SERVER_ERROR' }
    }
}
