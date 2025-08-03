'use server'

import { db } from '@/db'
import { users, emailVerification } from '@/db/schema'
import { randomBytes } from 'crypto'
import { resend } from '@shared/lib/resend'
import { mailHtml } from '@shared/lib/mailhtml'
import {eq} from "drizzle-orm";

export async function registerUser(data: { email: string; password: string }) {
  try {
    const existing = await db.select().from(users).where(eq(users.email, data.email))

    if (existing.length > 0) {
      return { success: false, code: 'USER_ALREADY_EXISTS' }
    }

    await db.insert(users).values({
      email: data.email,
      password: data.password,
    })

    const code = randomBytes(32).toString('hex')

    await db.insert(users).values({
      email: data.email,
      password: data.password,
    })

    await db.insert(emailVerification).values({
      email: data.email,
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    })

    const confirmUrl = `${process.env.BASE_URL}/api/verify?code=${code}`
    const finalHtml = mailHtml.replace('{{CONFIRM_URL}}', confirmUrl)

    await resend.emails.send({
      to: data.email,
      from: process.env.EMAIL_FROM!,
      subject: 'Подтвердите регистрацию на Creon.ai',
      html: finalHtml,
    })

    return { success: true, code: 'REGISTERED' }
  } catch (e) {
    console.error('[REGISTER_USER_ERROR]', e)
    return { success: false, code: 'SERVER_ERROR' }
  }
}
