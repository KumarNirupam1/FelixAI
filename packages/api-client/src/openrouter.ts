import type { ScreenAnalysisRequest } from "./types";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
/** Free on OpenRouter — strong on screenshots with text, charts, and UI (FelixAI's main case). */
const DEFAULT_VISION_MODEL = "nvidia/nemotron-nano-12b-v2-vl:free";

const ANALYSIS_PROMPT = `Analyze this screenshot in detail. Describe:
1. What application or interface is shown
2. Any visible text, code, or errors
3. UI elements, buttons, and layout
4. Anything notable or problematic

Be specific and thorough.`;

async function callOpenRouter(
  apiKey: string,
  model: string,
  screenshotDataUrl: string,
  signal: AbortSignal,
): Promise<Response> {
  return fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://felixai.app",
      "X-Title": "FelixAI",
    },
    signal,
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: ANALYSIS_PROMPT },
            { type: "image_url", image_url: { url: screenshotDataUrl } },
          ],
        },
      ],
      max_tokens: 900,
      temperature: 0.3,
    }),
  });
}

const FALLBACK_TEXT_MODEL = "google/gemma-4-26b-a4b-it:free";

/** Text-only fallback when Cognee recall returns nothing — answers from screen context. */
export async function askTextFallback(
  apiKey: string,
  question: string,
  screenContext: string,
): Promise<string> {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://felixai.app",
      "X-Title": "FelixAI",
    },
    body: JSON.stringify({
      model: FALLBACK_TEXT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are FelixAI. Answer the user's question fully and directly using the " +
            "screen description below. No memory is available yet for this query — just " +
            "answer from what's on screen. Keep it concise but never omit relevant content.",
        },
        {
          role: "user",
          content: `Screen description:\n${screenContext}\n\nQuestion: ${question}`,
        },
      ],
      max_tokens: 500,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenRouter fallback error ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return (
    data.choices?.[0]?.message?.content?.trim() ??
    "I couldn't generate an answer right now."
  );
}

/** OpenRouter vision — turns a screenshot into text context for Cognee recall. */
export async function analyzeScreen(
  req: ScreenAnalysisRequest,
): Promise<string> {
  const model = req.model ?? DEFAULT_VISION_MODEL;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await callOpenRouter(
      req.apiKey,
      model,
      req.screenshotDataUrl,
      controller.signal,
    );

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
