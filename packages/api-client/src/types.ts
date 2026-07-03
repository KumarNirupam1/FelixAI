export interface VisionRequest {
  apiKey: string;
  question: string;
  screenshotDataUrl: string;
  memoryContext?: string;
  model?: string;
}

export interface ScreenAnalysisRequest {
  apiKey: string;
  screenshotDataUrl: string;
  model?: string;
}

export interface TextAskRequest {
  apiKey: string;
  question: string;
  screenContext: string;
  memoryContext?: string;
  model?: string;
}
