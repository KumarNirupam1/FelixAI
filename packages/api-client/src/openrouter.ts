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

function isRetryableNetworkError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  const cause = err.cause as { code?: string } | undefined;
  return (
    msg.includes("fetch failed") ||
    msg.includes("abort") ||
    cause?.code === "UND_ERR_CONNECT_TIMEOUT"
  );
}

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
      max_tokens: 600,
      temperature: 0.3,
    }),
  });
}

/** OpenRouter vision — turns a screenshot into text context for Cognee recall. */
export async function analyzeScreen(
  req: ScreenAnalysisRequest,
): Promise<string> {
  const model = req.model ?? DEFAULT_VISION_MODEL;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    let res: Response;
    try {
      res = await callOpenRouter(
        req.apiKey,
        model,
        req.screenshotDataUrl,
        controller.signal,
      );
    } catch (err) {
      if (!isRetryableNetworkError(err)) throw err;
      res = await callOpenRouter(
        req.apiKey,
        model,
        req.screenshotDataUrl,
        controller.signal,
      );
    }

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
