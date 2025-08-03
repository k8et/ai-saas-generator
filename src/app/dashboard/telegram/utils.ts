import {TelegramSchema} from "@/app/dashboard/telegram/schema";

export function formatTelegramPrompt({ description, style, emoji, hashtag }: TelegramSchema) {
    const parts = [
        `Напиши Telegram-пост на тему: "${description}"`,
        `в стиле "${style}"`,
        emoji ? 'добавь эмодзи' : '',
        hashtag ? 'в конце добавь релевантные хэштеги' : '',
    ];

    return parts.filter(Boolean).join(', ') + '.';
}

export async function sendToTelegram(text: string, token: string, chatId: string) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });

    if (!res.ok) throw new Error('Ошибка отправки в Telegram');
}
