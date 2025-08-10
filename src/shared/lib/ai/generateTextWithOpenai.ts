import { openai } from '@shared/lib/ai/openai'

type ApiResponse<T> = { data: T } | { error: string };


export async function generateTextWithOpenai(prompt: string): Promise<ApiResponse<string>> {
  try {
    const response = await openai.responses.create({
      model: "gpt-5",
      tools: [
        { type: "web_search_preview" },
      ],
      input: prompt,
    });

    const content = response.output_text?.trim();

    if (!content) {
      console.error("[OpenAI] No content in response:", response);
      return { error: "ERROR_GENERATE_CONTENT_NO_CONTENT" };
    }

    return { data: content };
  } catch (error) {
    console.error("[OpenAI] Request failed:", error);
    return { error: "ERROR_GENERATE_CONTENT_REQUEST_FAILED" };
  }
}
