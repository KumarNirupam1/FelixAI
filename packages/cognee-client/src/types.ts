export type DatasetName = "main" | "private";

export type RecallScope = "session" | "auto" | "graph";

export interface RecallOptions {
  dataset: string;
  sessionId: string;
  topK?: number;
  /** "session" = same-sitting cache; "auto" = session then graph. */
  scope?: RecallScope;
}

export interface RememberOptions {
  dataset: string;
  sessionId: string;
}

export interface RememberResult {
  id?: string;
}

export interface QAInput {
  question: string;
  answer: string;
  context?: string;
}

export interface MemoryItem {
  id?: string;
  name?: string;
  [key: string]: unknown;
}
