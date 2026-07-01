import { useState } from "react";
import { Toggle } from "@jarvis/ui";
import { useAsk } from "../hooks/useAsk";
import { MessageBubble } from "./MessageBubble";

interface Props {
  dataset: "main" | "private";
  setDataset: (d: "main" | "private") => void;
  screenshot: string | null;
}

export function ChatView({ dataset, setDataset, screenshot }: Props) {
  const { messages, loading, ask } = useAsk(dataset);
  const [input, setInput] = useState("");

  async function submit(): Promise<void> {
    const q = input;
    setInput("");
    await ask(q);
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          {screenshot ? (
            <img
              src={screenshot}
              alt="screen"
              className="h-8 w-14 rounded border border-white/10 object-cover"
            />
          ) : (
            <span className="italic">no screen captured</span>
          )}
          <span>screen attached</span>
        </div>
        <Toggle
          checked={dataset === "private"}
          onChange={(v) => setDataset(v ? "private" : "main")}
          label="private"
        />
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <p className="mt-10 text-center text-xs text-white/40">
            Ask anything about what&apos;s on your screen.
          </p>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} dataset={dataset} />
        ))}
        {loading && <p className="text-xs text-white/40">thinking…</p>}
      </div>

      <div className="no-drag flex items-center gap-2 rounded-xl bg-black/30 px-3 py-2">
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) void submit();
          }}
          placeholder="Ask about your screen…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
        />
        <button
          onClick={() => void submit()}
          disabled={loading}
          className="rounded-lg bg-accent px-3 py-1 text-xs font-medium text-white disabled:opacity-40"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
