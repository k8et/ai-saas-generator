import { TelegramSchema } from '@/app/dashboard/telegram/schema'

export function formatTelegramPrompt({
                                       description,
                                       style,
                                       emoji,
                                       hashtag,
                                     }: TelegramSchema) {
  const parts = [
    `Напиши один короткий пост для Telegram (до 1000 символов) на тему: "${description}"`,
    `стиль: "${style}"`,
    emoji ? 'добавь уместные эмодзи без перебора' : '',
    hashtag ? 'в конце добавь 2–3 тематических хэштега без решёток' : '',
    'не вставляй ссылки, источники, даты или сноски',
    'не используй форматирование, Markdown и HTML',
    'не делай абзацы — текст должен быть в одном блоке',
    'ориентируйся на естественный стиль для соцсетей',
  ];

  return parts.filter(Boolean).join('. ') + '.';
}

