/** Combine screen description + user question for Cognee GRAPH_COMPLETION. */
export function buildRecallQuery(question: string, screenContext?: string): string {
  const q = question.trim();
  const screen = screenContext?.trim();

  if (!q) return screen ?? "";

  if (!screen) {
    return q;
  }

  return (
    "The user is asking about what is on their screen.\n\n" +
    `Screen description:\n${screen}\n\n` +
    `User question: ${q}`
  );
}

/** Shown when Cognee recall fails or returns nothing useful. */
export function buildFallbackAnswer(
  screenContext: string,
  cogneeUp: boolean,
): string {
  if (!cogneeUp) {
    return (
      "Cognee memory is offline. Start your self-hosted Cognee Docker instance " +
      "and try again."
    );
  }

  const screen = screenContext.trim();
  if (screen) {
    return (
      "I couldn't reach memory for a full answer right now. " +
      "Here's what I see on your screen:\n\n" +
      screen
    );
  }

  return (
    "I couldn't generate an answer from memory. " +
    "Make sure Cognee is running and try again."
  );
}
