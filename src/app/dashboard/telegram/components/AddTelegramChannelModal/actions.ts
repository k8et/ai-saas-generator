'use server'

import { db } from '@/db'
import { telegramChannels } from '@/db/schema'
import { eq } from 'drizzle-orm'
import {
  telegramChannelSchema,
  TelegramChannelSchema,
} from '@/app/dashboard/telegram/components/AddTelegramChannelModal/schema'
import {getUserFromCookie} from "@shared/lib/getUserFromCookie";

export async function addTelegramChannel(data: TelegramChannelSchema) {
  const parsed = telegramChannelSchema.safeParse(data)
  if (!parsed.success) {
    return {
      error: 'ERROR_INVALID_DATA',
      message: 'MESSAGE_INVALID_CHANNEL_FORMAT',
    }
  }

  try {
    const exists = await db
      .select()
      .from(telegramChannels)
      .where(eq(telegramChannels.channel, data.channel))

    if (exists.length > 0) {
      return {
        error: 'ERROR_CHANNEL_ALREADY_EXISTS',
        message: 'MESSAGE_CHANNEL_ALREADY_EXISTS',
      }
    }

    const user = await getUserFromCookie()

    if (!user) {
      return {
        error: 'ERROR_UNAUTHORIZED',
        message: 'MESSAGE_NEED_AUTHORIZATION',
      }
    }

    await db.insert(telegramChannels).values({
      channel: parsed.data.channel,
      userId: user.id,
    })

    return {
      success: true,
      message: 'MESSAGE_CHANNEL_ADDED',
    }
  } catch (err) {
    console.error('[DB ERROR]', err)
    return {
      error: 'ERROR_DB_INSERT_FAILED',
      message: 'MESSAGE_CHANNEL_INSERT_FAILED',
    }
  }
}
