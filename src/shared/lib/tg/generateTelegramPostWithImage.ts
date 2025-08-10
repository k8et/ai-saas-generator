type ApiResponse<T> = { data: T } | { error: string };

export async function generateTelegramPostWithImage(description: string): Promise<ApiResponse<string>> {
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
      console.error('[OpenAI] No image-generator URL in response:', json);
      return { error: 'ERROR_GENERATE_IMAGE_NO_URL' };
    }
    return { data: url };
  } catch (error) {
    console.error('[OpenAI] Request failed:', error);
    return { error: 'ERROR_GENERATE_IMAGE_REQUEST_FAILED' };
  }
}

