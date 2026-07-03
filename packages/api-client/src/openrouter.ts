import type { ScreenAnalysisRequest } from "./types";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const VISION_MODEL = "meta-llama/llama-3.2-11b-vision-instruct:free";

const ANALYSIS_PROMPT = `Analyze this screenshot in detail. Describe:
1. What application or interface is shown
2. Any visible text, code, or errors
3. UI elements, buttons, and layout
4. Anything notable or problematic

Be specific and thorough.`;

/** OpenRouter Llama 3.2 vision — turns a screenshot into text context for the answer model. */
export async function analyzeScreen(
  req: ScreenAnalysisRequest,
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.apiKey}`,
        "HTTP-Referer": "https://felixai.app",
        "X-Title": "FelixAI",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: req.model ?? VISION_MODEL,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: ANALYSIS_PROMPT },
              { type: "image_url", image_url: { url: req.screenshotDataUrl } },
            ],
          },
        ],
        max_tokens: 600,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`OpenRouter ${res.status}: ${body.slice(0, 200)}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("OpenRouter returned empty vision analysis");
    return text;
  } finally {
    clearTimeout(timeout);
  }
}
