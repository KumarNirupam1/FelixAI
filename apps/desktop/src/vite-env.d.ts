/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEEPGRAM_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type VisionStatus = "idle" | "analyzing" | "ready" | "failed";

interface FelixApi {
  onRememberDone: (cb: (payload: { qaId?: string }) => void) => () => void;
  onShown: (cb: () => void) => () => void;
  onVisionStatus: (cb: (status: VisionStatus) => void) => () => void;
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
  openMemoryGraph: (
    datasetId: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  forgetPrivate: () => Promise<{ ok: boolean; error?: string }>;
  getStatus: () => Promise<{
    cogneeUp: boolean;
    sessionId: string;
    onboardingComplete: boolean;
  }>;
  getOnboardingState: () => Promise<{
    complete: boolean;
    questions: string[];
  }>;
  completeOnboarding: (
    answers: string[],
  ) => Promise<{ ok: boolean; error?: string }>;
  hide: () => Promise<void>;
  expandWindow: () => Promise<void>;
  recaptureScreen: () => Promise<void>;
}

interface Window {
  api: FelixApi;
}
