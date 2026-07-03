import { useEffect, useRef, useState } from "react";
import { Toggle } from "@jarvis/ui";
import { useAsk } from "../hooks/useAsk";
import { useVisionStatus } from "../hooks/useVisionStatus";
import { useVoiceInput } from "../hooks/useVoiceInput";
import { timeGreeting } from "../lib/greeting";
import { MessageBubble } from "./MessageBubble";

interface Props {
  dataset: "main" | "private";
  setDataset: (d: "main" | "private") => void;
}

export function ChatView({ dataset, setDataset }: Props) {
  const { messages, loading, ask } = useAsk(dataset);
  const visionStatus = useVisionStatus();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { isRecording, error: voiceError, toggleRecording } = useVoiceInput({
    onTranscript: (text, isFinal) => {
      if (isFinal) setInput((prev) => prev + text + " ");
    },
  });

  useEffect(
    () =>
      window.api.onShown(() => {
        setInput("");
        inputRef.current?.focus();
      }),
    [],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function submit(): Promise<void> {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    await ask(q);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex justify-end">
        <Toggle
          checked={dataset === "private"}
          onChange={(v) => setDataset(v ? "private" : "main")}
          label="private"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-1">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center pb-24 text-center">
            <h1 className="text-2xl font-light tracking-tight text-white/90">
              {timeGreeting()}
            </h1>
            <p className="mt-2 text-sm font-light text-white/40">
              How can I help you?
            </p>
          </div>
        )}

        {messages.length > 0 && (
          <div className="space-y-4 py-2">
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm">
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="h-2 w-2 animate-bounce rounded-full bg-white/60"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {voiceError && (
        <p className="mb-2 text-[10px] text-amber-400/80">{voiceError}</p>
      )}

      <div className="no-drag mt-auto pt-2">
        {visionStatus === "analyzing" && (
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
            <div className="h-3 w-3 animate-spin rounded-full border border-white/60 border-t-transparent" />
            <span>Analyzing screenshot…</span>
          </div>
        )}

        {visionStatus === "ready" && (
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/10 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400/90">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Screen analyzed</span>
            </div>
            <button
              type="button"
              onClick={() => void window.api.recaptureScreen()}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Re-analyze
            </button>
          </div>
        )}

        <div className="relative flex items-end gap-2 rounded-xl border border-white/10 bg-[#1A1A1A]/80 px-4 py-3 shadow-lg backdrop-blur-xl transition hover:border-white/20 focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/10">
          <textarea
            ref={inputRef}
            autoFocus
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void submit();
              }
            }}
            placeholder={
              isRecording ? "Listening…" : "Ask about your screen…"
            }
            disabled={loading}
            className="max-h-24 min-h-[24px] flex-1 resize-none bg-transparent text-sm font-light tracking-wide text-white outline-none placeholder:text-white/30"
          />

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => void window.api.recaptureScreen()}
              title="Re-capture screen"
              className={`rounded-md p-1.5 transition ${
                visionStatus === "ready" || visionStatus === "analyzing"
                  ? "bg-white/20 text-white"
                  : "text-white/30 hover:bg-white/5 hover:text-white/60"
              }`}
            >
              {visionStatus === "analyzing" ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={toggleRecording}
              title="Voice input"
              className={`rounded-md p-1.5 transition ${
                isRecording
                  ? "animate-pulse bg-red-500/30 text-white"
                  : "text-white/30 hover:bg-white/5 hover:text-white/60"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => void submit()}
              disabled={loading || !input.trim()}
              title="Send"
              className="ml-1 rounded-md bg-white/10 p-1.5 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {loading ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-wider text-white/20">
          Enter to send · Esc to hide
        </p>
      </div>
    </div>
  );
}
