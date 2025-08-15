'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import {appRoutes} from "@shared/constants/appRoutes";

export async function loginUser(data: { email: string; password: string }) {
    try {
        const [user] = await db.select().from(users).where(eq(users.email, data.email))

        if (!user || user.password !== data.password) {
            return { success: false, code: 'INVALID_CREDENTIALS' }
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

        return {
            success: true,
            redirectTo: `${process.env.BASE_URL}${appRoutes.DASHBOARD_ROUTE}`,
        }
    } catch (e) {
        console.error('[LOGIN_USER_ERROR]', e)
        return { success: false, code: 'SERVER_ERROR' }
    }
}
