import type { VisionRequest } from "./types";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const SYSTEM_PROMPT =
  "You are Jarvis, a personal desktop assistant that can see the user's screen " +
  "and remembers past interactions across sessions. Use the provided screen image " +
  "and any relevant past memory to answer concisely and helpfully. If the memory " +
  "is relevant, briefly acknowledge what was remembered.";

/** The vision-answer half of the loop. Uses gpt-4o-mini by default. */
export async function askVision(req: VisionRequest): Promise<string> {
  const model = req.model ?? "gpt-4o-mini";
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}\n\nRelevant past memory:\n${
            req.memoryContext?.trim() || "(none yet)"
          }`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: req.question },
            { type: "image_url", image_url: { url: req.screenshotDataUrl } },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenAI error ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content ?? "(no answer)";
}
