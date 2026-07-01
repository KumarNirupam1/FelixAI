import { contextBridge, ipcRenderer } from "electron";
import type { AskPayload, AskResult, DatasetName } from "./types";

const api = {
  onScreenshot: (cb: (dataUrl: string | null) => void): (() => void) => {
    const listener = (_e: unknown, data: string | null) => cb(data);
    ipcRenderer.on("screenshot:captured", listener);
    return () => ipcRenderer.removeListener("screenshot:captured", listener);
  },
  onRememberDone: (cb: (payload: { qaId?: string }) => void): (() => void) => {
    const listener = (_e: unknown, data: { qaId?: string }) => cb(data);
    ipcRenderer.on("remember:done", listener);
    return () => ipcRenderer.removeListener("remember:done", listener);
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
  forgetPrivate: (): Promise<{ ok: boolean; error?: string }> =>
    ipcRenderer.invoke("forgetPrivate"),
  getStatus: (): Promise<{ cogneeUp: boolean; sessionId: string }> =>
    ipcRenderer.invoke("getStatus"),
  hide: (): Promise<void> => ipcRenderer.invoke("hidePopup"),
};

contextBridge.exposeInMainWorld("api", api);

export type JarvisApi = typeof api;
