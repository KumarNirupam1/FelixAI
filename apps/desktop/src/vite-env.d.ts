/// <reference types="vite/client" />

interface JarvisApi {
  onScreenshot: (cb: (dataUrl: string | null) => void) => () => void;
  onRememberDone: (cb: (payload: { qaId?: string }) => void) => () => void;
  ask: (payload: {
    question: string;
    dataset: "main" | "private";
  }) => Promise<{ answer: string; usedMemory: boolean }>;
  submitFeedback: (
    qaId: string,
    score: number,
    dataset: "main" | "private",
  ) => Promise<{ ok: boolean; error?: string }>;
  listMemory: () => Promise<Array<Record<string, unknown>>>;
  forgetPrivate: () => Promise<{ ok: boolean; error?: string }>;
  getStatus: () => Promise<{ cogneeUp: boolean; sessionId: string }>;
  hide: () => Promise<void>;
}

interface Window {
  api: JarvisApi;
}
