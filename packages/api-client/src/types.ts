export interface VisionRequest {
  apiKey: string;
  question: string;
  screenshotDataUrl: string;
  memoryContext?: string;
  /** Defaults to gpt-4o-mini (vision-capable). */
  model?: string;
}
