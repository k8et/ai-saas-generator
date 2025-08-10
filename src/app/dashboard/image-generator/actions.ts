'use server'

import { db } from '@/db'
import { image as imageTable } from '@/db/schema'
import { getUserFromCookie } from '@shared/lib/getUserFromCookie'
import { openai } from '@shared/lib/ai'
import { imageGeneratorSchema, ImageGeneratorSchema } from '@/app/dashboard/image-generator/schema'

export async function generateImage(data: ImageGeneratorSchema) {
  const parsed = imageGeneratorSchema.safeParse(data)
  if (!parsed.success) {
    return { error: 'ERROR_GENERATE_INVALID_DATA' }
  }

  const user = await getUserFromCookie()
  if (!user) {
    return { error: 'ERROR_UNAUTHORIZED', message: 'MESSAGE_NEED_AUTHORIZATION' }
  }

  const { description, type, model, size } = parsed.data

  const prompt =
    [
      `Создай изображение типа: ${type}.`,
      `Тема/описание: ${description}.`,
      `Стиль: современный, аккуратная композиция, фокус на читаемости.`,
      type === 'logo'
        ? 'Упор на простые формы, хорошую читаемость в малых размерах.'
        : null,
    ]
      .filter(Boolean)
      .join(' ')

  try {
    const resp = await openai.images.generate({
      model,
      prompt,
      size,
    })

    const image = resp.data?.[0]
    const imageUrl = image?.url

    if (!imageUrl) {
      return { error: 'ERROR_OPENAI_EMPTY_RESPONSE' }
    }

    const [created] = await db
      .insert(imageTable)
      .values({
        description,
        type,
        model,
        size,
        prompt,
        imageUrl,
        userId: user.id,
      })
      .returning()

    return created
  } catch (err) {
    console.error('[OPENAI] Image generation failed:', err)
    return { error: 'ERROR_OPENAI_IMAGE_GENERATION_FAILED' }
  }
}
