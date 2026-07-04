export type DatasetName = "main" | "private";

export type RecallScope = "session" | "auto" | "graph";

export type RecallSearchType =
  | "GRAPH_COMPLETION"
  | "RAG_COMPLETION"
  | "CHUNKS"
  | "SUMMARIES"
  | null;

export interface RecallOptions {
  dataset: string;
  sessionId: string;
  topK?: number;
  /** "session" = same-sitting cache; "auto" = session then graph. */
  scope?: RecallScope;
  /** Default GRAPH_COMPLETION — Cognee's LLM answers from graph + query. */
  searchType?: RecallSearchType;
  /** Optional system prompt for completion searches. */
  systemPrompt?: string;
}

export interface RecallAnswer {
  text: string;
  usedMemory: boolean;
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
  usedMemory?: boolean;
}

export interface MemoryItem {
  id?: string;
  name?: string;
  [key: string]: unknown;
}

export interface VisualizeResult {
  html: string;
}
