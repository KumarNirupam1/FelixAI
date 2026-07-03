import { useEffect, useRef, useState } from "react";
import { Toggle } from "@jarvis/ui";
import { useAsk } from "../hooks/useAsk";
import { useVoiceInput } from "../hooks/useVoiceInput";
import { MessageBubble } from "./MessageBubble";

interface Props {
  dataset: "main" | "private";
  setDataset: (d: "main" | "private") => void;
  screenshot: string | null;
}

export function ChatView({ dataset, setDataset, screenshot }: Props) {
  const { messages, loading, ask } = useAsk(dataset);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { isRecording, error: voiceError, toggleRecording } = useVoiceInput({
    onTranscript: (text, isFinal) => {
      if (isFinal) setInput((prev) => prev + text + " ");
    },
  });

  useEffect(() => window.api.onShown(() => inputRef.current?.focus()), []);

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
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-white/45">
          {screenshot ? (
            <img
              src={screenshot}
              alt="screen"
              className="h-7 w-12 rounded border border-white/10 object-cover"
            />
          ) : null}
          <span>{screenshot ? "screen attached" : "no screen captured"}</span>
        </div>
        <Toggle
          checked={dataset === "private"}
          onChange={(v) => setDataset(v ? "private" : "main")}
          label="private"
        />
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center pb-16 text-center">
            <p className="text-lg font-light text-white/85">Ask anything</p>
            <p className="mt-1 text-xs text-white/40">
              FelixAI sees your screen and remembers past sessions
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="h-2 w-2 animate-bounce rounded-full bg-white/50"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {voiceError && (
        <p className="mb-2 text-[10px] text-amber-400/80">{voiceError}</p>
      )}

      <div className="no-drag mt-2">
        <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-[#1A1A1A]/80 px-3 py-2.5 backdrop-blur-xl transition focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10">
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
              onClick={toggleRecording}
              title="Voice input"
              className={`rounded-md p-1.5 transition ${
                isRecording
                  ? "bg-red-500/30 text-white animate-pulse"
                  : "text-white/35 hover:bg-white/5 hover:text-white/70"
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
              className="ml-0.5 rounded-md bg-white/10 p-1.5 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {loading ? (
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
        <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wider text-white/20">
          Enter to send · Esc to hide
        </p>
      </div>
    </div>
  );
}
