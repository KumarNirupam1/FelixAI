export type ParsedCommand =
  | { kind: "remember"; note: string }
  | { kind: "forget"; dataset: "private" };

/** Natural-language shortcuts handled before Cognee recall. */
export function parseUserCommand(question: string): ParsedCommand | null {
  const raw = question.trim();
  const lower = raw.toLowerCase();

  const rememberMatch = raw.match(
    /^remember\s+(?:this|that)\s*[:\-]?\s*([\s\S]*)$/i,
  );
  if (rememberMatch) {
    const note = rememberMatch[1]?.trim();
    return {
      kind: "remember",
      note: note || "Something the user asked me to remember from this screen.",
    };
  }

  if (/^forget\s+private\b/i.test(lower)) {
    return { kind: "forget", dataset: "private" };
  }

  if (/^forget\s+(?:this|that)\b/i.test(lower)) {
    return { kind: "forget", dataset: "private" };
  }

  return null;
}
