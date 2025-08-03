'use server';

import { openai } from '@/shared/lib/openai';
import { db } from '@/db';
import { telegramPosts } from '@/db/schema';
import {TelegramSchema, telegramSchema} from "@/app/dashboard/telegram/schema";
import {formatTelegramPrompt, sendToTelegram} from "@/app/dashboard/telegram/utils";

export async function generateAndSendPost(data: TelegramSchema) {
    const parsed = telegramSchema.safeParse(data);
    if (!parsed.success) return { error: 'Неверные данные' };

    const { description, style, emoji, hashtag, tg_chanel } = parsed.data;
    const prompt = formatTelegramPrompt({ description, style, emoji, hashtag, tg_chanel });

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices[0]?.message.content?.trim();

    if (!content) return { error: 'Не удалось сгенерировать пост' };

    console.log('[GPT Generated Post]:', content);

    try {
        await sendToTelegram(content, process.env.TELEGRAM_BOT_TOKEN!, tg_chanel);
    } catch {
        return { error: 'Пост сгенерирован, но не отправлен в Telegram' };
    }

    await db.insert(telegramPosts).values({
        description,
        style,
        emoji,
        hashtag,
        tg_chanel,
        content,
    });

    return { content };
}
