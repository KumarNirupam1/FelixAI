import { contextBridge, ipcRenderer } from "electron";
import type { AskPayload, AskResult, DatasetName, VisionStatus } from "./types";

const api = {
  onRememberDone: (cb: (payload: { qaId?: string }) => void): (() => void) => {
    const listener = (_e: unknown, data: { qaId?: string }) => cb(data);
    ipcRenderer.on("remember:done", listener);
    return () => ipcRenderer.removeListener("remember:done", listener);
  },
  onShown: (cb: () => void): (() => void) => {
    const listener = () => cb();
    ipcRenderer.on("popup:shown", listener);
    return () => ipcRenderer.removeListener("popup:shown", listener);
  },
  onVisionStatus: (cb: (status: VisionStatus) => void): (() => void) => {
    const listener = (_e: unknown, status: VisionStatus) => cb(status);
    ipcRenderer.on("vision:status", listener);
    return () => ipcRenderer.removeListener("vision:status", listener);
  },
  ask: (payload: AskPayload): Promise<AskResult> =>
    ipcRenderer.invoke("ask", payload),
  submitFeedback: (
    qaId: string,
    score: number,
    dataset: DatasetName,
  ): Promise<{ ok: boolean; error?: string }> =>
    ipcRenderer.invoke("feedback", qaId, score, dataset),
  listMemory: (): Promise<Array<Record<string, unknown>>> =>
    ipcRenderer.invoke("listMemory"),
  openMemoryGraph: (
    datasetId: string,
  ): Promise<{ ok: boolean; error?: string }> =>
    ipcRenderer.invoke("openMemoryGraph", datasetId),
  forgetPrivate: (): Promise<{ ok: boolean; error?: string }> =>
    ipcRenderer.invoke("forgetPrivate"),
  getStatus: (): Promise<{
    cogneeUp: boolean;
    sessionId: string;
    onboardingComplete: boolean;
  }> => ipcRenderer.invoke("getStatus"),
  getDeepgramKey: (): Promise<string> => ipcRenderer.invoke("getDeepgramKey"),
  getOnboardingState: (): Promise<{
    complete: boolean;
    questions: string[];
  }> => ipcRenderer.invoke("getOnboardingState"),
  completeOnboarding: (
    answers: string[],
  ): Promise<{ ok: boolean; error?: string }> =>
    ipcRenderer.invoke("completeOnboarding", answers),
  hide: (): Promise<void> => ipcRenderer.invoke("hidePopup"),
  expandWindow: (): Promise<void> => ipcRenderer.invoke("expandWindow"),
  recaptureScreen: (): Promise<void> => ipcRenderer.invoke("recaptureScreen"),
};

contextBridge.exposeInMainWorld("api", api);

export type FelixApi = typeof api;
