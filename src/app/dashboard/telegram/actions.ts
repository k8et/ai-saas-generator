'use server'

import { db } from '@/db'
import { telegramChannels, telegramPosts } from '@/db/schema'
import { TelegramSchema, telegramSchema } from '@/app/dashboard/telegram/schema'
import {
  formatTelegramPrompt,
  generateTelegramPostContent,
  generateTelegramPostImage,
} from '@/app/dashboard/telegram/utils'
import { getUserFromCookie } from '@shared/lib/getUserFromCookie'
import {eq} from 'drizzle-orm'
import {TelegramGeneratedPostType} from "@/app/dashboard/telegram/types";


export async function generateTelegramPost(data: TelegramSchema): Promise<TelegramGeneratedPostType> {
  const parsed = telegramSchema.safeParse(data)
  if (!parsed.success) {
    return { error: 'ERROR_GENERATE_INVALID_DATA' }
  }

  const { description, style, emoji, hashtag, tg_chanel } = parsed.data
  const prompt = formatTelegramPrompt({ description, style, emoji, hashtag, tg_chanel })

  const postResult = await generateTelegramPostContent(prompt)
  if ('error' in postResult) return { error: postResult.error }

  const content = postResult.data

  const imageResult = await generateTelegramPostImage(description)
  if ('error' in imageResult) return { error: imageResult.error }

  const image_url = imageResult.data
  const user = await getUserFromCookie()

  if (!user) {
    return {
      error: 'ERROR_UNAUTHORIZED',
      message: 'MESSAGE_NEED_AUTHORIZATION',
    }
  }

  try {
    const [createdPost] = await db
      .insert(telegramPosts)
      .values({
        description,
        style,
        emoji,
        hashtag,
        tg_chanel,
        content,
        image_url,
        userId: user.id,
      })
      .returning()

    return createdPost
  } catch (err) {
    console.error('[DB] Insert failed:', err)
    return { error: 'ERROR_GENERATE_DB_INSERT_FAILED' }
  }
}

export async function getTelegramChannels() {
  const user = await getUserFromCookie()

  if (!user) {
    throw new Error('ERROR_USER_GET')
  }

  const rows = await db.select().from(telegramChannels).where(eq(telegramChannels.userId, user.id))

  return rows.map((r) => ({
    value: r.channel,
    label: r.channel,
  }))
}
