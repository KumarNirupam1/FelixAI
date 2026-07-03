export type DatasetName = "main" | "private";

export interface AskPayload {
  question: string;
  dataset: DatasetName;
}

export interface AskResult {
  answer: string;
  usedMemory: boolean;
}

export type VisionStatus = "idle" | "analyzing" | "ready" | "failed";
