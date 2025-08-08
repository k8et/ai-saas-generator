'use server'

import { db } from '@/db'
import { tikTok } from '@/db/schema'
import { getUserFromCookie } from '@shared/lib/getUserFromCookie'
import { tikTokSchema, TikTokSchema } from '@/app/dashboard/tik-tok/schema'
import { generateTextWithPerplexity } from '@shared/lib/ai'

export async function generateTikTokScenario(data: TikTokSchema) {
  const parsed = tikTokSchema.safeParse(data)
  if (!parsed.success) {
    return { error: 'ERROR_GENERATE_INVALID_DATA' }
  }

  const { description, style } = parsed.data
  const prompt = `Сгенерируй сценарий TikTok в стиле "${style}" на тему: ${description}. Структура: интро, основная часть, концовка. Без хештегов. Не указывать никаких ссылок.`

  const postResult = await generateTextWithPerplexity(prompt)
  if ('error' in postResult) return { error: postResult.error }

  const content = postResult.data
  const user = await getUserFromCookie()

  if (!user) {
    return {
      error: 'ERROR_UNAUTHORIZED',
      message: 'MESSAGE_NEED_AUTHORIZATION',
    }
  }

  try {
    const [createdPost] = await db
      .insert(tikTok)
      .values({
        description,
        style,
        content,
        userId: user.id,
      })
      .returning()

    return {
      ...createdPost,
      content,
    }
  } catch (err) {
    console.error('[DB] Insert failed:', err)
    return { error: 'ERROR_GENERATE_DB_INSERT_FAILED' }
  }
}
