import { askTextFallback } from "@felixai/api-client";

/** Combine screen description + user question for Cognee GRAPH_COMPLETION. */
export function buildRecallQuery(question: string, screenContext?: string): string {
  const q = question.trim();
  const screen = screenContext?.trim();

  if (!q) return screen ?? "";
  if (!screen) return q;

  return (
    "The user is looking at their screen and asking a question. Answer completely — " +
    "address every part of what they're asking, not just the most obvious part.\n\n" +
    `Screen description:\n${screen}\n\n` +
    `User question: ${q}\n\n` +
    "If the question has multiple parts, answer all parts."
  );
}

/** Shown when Cognee recall fails or returns nothing useful. */
export async function buildFallbackAnswer(
  screenContext: string,
  question: string,
  cogneeUp: boolean,
  openRouterKey: string,
): Promise<string> {
  if (!cogneeUp) {
    return (
      "Memory is offline — start Cognee's Docker container to enable full answers."
    );
  }

  const key = openRouterKey.trim();
  if (!key) {
    const screen = screenContext.trim();
    if (screen) {
      return (
        "I couldn't reach memory for a full answer right now. " +
        "Here's what I see on your screen:\n\n" +
        screen
      );
    }
    return "I couldn't generate an answer. Add OPENROUTER_API_KEY to enable fallback answers.";
  }

  try {
    return await askTextFallback(key, question, screenContext);
  } catch {
    const screen = screenContext.trim();
    if (screen) {
      return (
        "I couldn't reach memory for a full answer right now. " +
        "Here's what I see on your screen:\n\n" +
        screen
      );
    }
    return "I couldn't generate an answer from memory. Make sure Cognee is running and try again.";
  }
}
