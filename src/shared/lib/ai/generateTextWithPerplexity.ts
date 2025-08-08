type ApiResponse<T> = { data: T } | { error: string };

export async function generateTextWithPerplexity(prompt: string): Promise<ApiResponse<string>> {

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