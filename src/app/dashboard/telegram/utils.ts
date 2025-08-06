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


export async function sendToTelegram({
  caption,
  imageUrl,
  chatId,
  token,
}: {
  caption: string
  imageUrl: string
  chatId: string
  token: string
}) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: imageUrl,
        caption,
        parse_mode: 'HTML',
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[Telegram Send Error]', text)
    }
  } catch (err) {
    console.error('[Telegram Exception]', err)
    throw err
  }
}

type ApiResponse<T> = { data: T } | { error: string };

export async function generateTelegramPostContent(prompt: string): Promise<ApiResponse<string>> {

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const raw = await response.text();

    if (!response.ok) {
      console.error(`[Perplexity] API error: ${response.status}`);
      return { error: 'ERROR_GENERATE_CONTENT_API_FAILED' };
    }

    let json;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      console.error('[Perplexity] Invalid JSON:', e);
      return { error: 'ERROR_GENERATE_CONTENT_INVALID_JSON' };
    }

    const content = json.choices?.[0]?.message?.content?.trim();

    if (!content) {
      console.error('[Perplexity] No content in response:', json);
      return { error: 'ERROR_GENERATE_CONTENT_NO_CONTENT' };
    }

    return { data: content };
  } catch (error) {
    console.error('[Perplexity] Request failed:', error);
    return { error: 'ERROR_GENERATE_CONTENT_REQUEST_FAILED' };
  }
}


export async function generateTelegramPostImage(description: string): Promise<ApiResponse<string>> {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `Создай изображение для Telegram-поста: ${description}`,
        size: '1024x1024',
        quality: 'standard',
        n: 1,
      }),
    });

    if (!response.ok) {
      console.error(`[OpenAI] API error: ${response.status}`);
      return { error: 'ERROR_GENERATE_IMAGE_API_FAILED' };
    }

    const json = await response.json();
    const url = json.data?.[0]?.url;
    if (!url) {
      console.error('[OpenAI] No image URL in response:', json);
      return { error: 'ERROR_GENERATE_IMAGE_NO_URL' };
    }
    return { data: url };
  } catch (error) {
    console.error('[OpenAI] Request failed:', error);
    return { error: 'ERROR_GENERATE_IMAGE_REQUEST_FAILED' };
  }
}

