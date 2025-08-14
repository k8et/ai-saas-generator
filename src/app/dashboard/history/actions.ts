"use server"
import { eq, sql } from 'drizzle-orm'
import { image, telegramPosts, tikTok } from '@/db/schema'
import { getUserFromCookie } from '@shared/lib/getUserFromCookie'
import { db } from '@/db'

export async function getHistoryGeneration() {
  const user = await getUserFromCookie()

  if (!user) {
    throw new Error('ERROR_USER_GET')
  }

  const [telegramHistory, imageHistory, tikTokHistory] = await Promise.all([
    db
      .select({
        id: telegramPosts.id,
        type: sql`'telegram'`.as('type'),
        description: telegramPosts.description,
        content: telegramPosts.content,
        createdAt: telegramPosts.createdAt,
        extra: sql`json_build_object(
          'image_url', ${telegramPosts.image_url},
          'style', ${telegramPosts.style},
          'emoji', ${telegramPosts.emoji},
          'hashtag', ${telegramPosts.hashtag},
          'tg_chanel', ${telegramPosts.tg_chanel}
        )`.as('extra'),
      })
      .from(telegramPosts)
      .where(eq(telegramPosts.userId, user.id)),

    db
      .select({
        id: image.id,
        type: sql`'image'`.as('type'),
        description: image.description,
        content: image.prompt,
        createdAt: image.createdAt,
        extra: sql`json_build_object(
          'imageUrl', ${image.imageUrl},
          'model', ${image.model},
          'size', ${image.size},
          'type', ${image.type}
        )`.as('extra'),
      })
      .from(image)
      .where(eq(image.userId, user.id)),

    db
      .select({
        id: tikTok.id,
        type: sql`'tiktok'`.as('type'),
        description: tikTok.description,
        content: tikTok.content,
        createdAt: tikTok.createdAt,
        extra: sql`json_build_object(
          'style', ${tikTok.style}
        )`.as('extra'),
      })
      .from(tikTok)
      .where(eq(tikTok.userId, user.id)),
  ])

  return [...telegramHistory, ...imageHistory, ...tikTokHistory].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}
