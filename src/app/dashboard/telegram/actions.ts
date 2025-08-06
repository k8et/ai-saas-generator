'use server';

import { db } from '@/db';
import {telegramChannels, telegramPosts} from '@/db/schema';
import { TelegramSchema, telegramSchema } from '@/app/dashboard/telegram/schema';
import {
    formatTelegramPrompt,
    generateTelegramPostContent,
    generateTelegramPostImage,
    sendToTelegram
} from '@/app/dashboard/telegram/utils';


export async function generateAndSendPost(data: TelegramSchema) {
    const parsed = telegramSchema.safeParse(data);
    if (!parsed.success) {
        return { error: 'ERROR_GENERATE_INVALID_DATA' };
    }

    const { description, style, emoji, hashtag, tg_chanel } = parsed.data;
    const prompt = formatTelegramPrompt({ description, style, emoji, hashtag, tg_chanel });

    const postResult = await generateTelegramPostContent(prompt);
    if ('error' in postResult) return { error: postResult.error };
    const content = postResult.data;

    const imageResult = await generateTelegramPostImage(description);
    if ('error' in imageResult) return { error: imageResult.error };
    const image_url = imageResult.data;

    try {
        await sendToTelegram({
            caption: content,
            imageUrl: image_url,
            chatId: tg_chanel,
            token: process.env.TELEGRAM_BOT_TOKEN!,
        });
    } catch (err) {
        console.error('[Telegram Send Error]', err);
        return { error: 'ERROR_GENERATE_TELEGRAM_FAILED' };
    }

    try {
        await db.insert(telegramPosts).values({
            description,
            style,
            emoji,
            hashtag,
            tg_chanel,
            content,
            image_url,
        });
    } catch (err) {
        console.error('[DB] Insert failed:', err);
        return { error: 'ERROR_GENERATE_DB_INSERT_FAILED' };
    }

    return { content, image_url };
}

export async function getTelegramChannels() {
    const rows = await db.select().from(telegramChannels)
    return rows.map((r) => ({
        value: r.channel,
        label: r.channel,
    }))
}