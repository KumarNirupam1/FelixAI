import { useEffect, useState } from "react";
import { ChatView } from "./components/ChatView";
import { MemoryView } from "./components/MemoryView";
import { useScreenshot } from "./hooks/useScreenshot";

type Tab = "chat" | "memory";

export function App() {
  const [tab, setTab] = useState<Tab>("chat");
  const [dataset, setDataset] = useState<"main" | "private">("main");
  const [cogneeUp, setCogneeUp] = useState(false);
  const screenshot = useScreenshot();

  useEffect(() => {
    window.api
      .getStatus()
      .then((s) => setCogneeUp(s.cogneeUp))
      .catch(() => setCogneeUp(false));
  }, [tab]);

  return (
    <div className="flex h-full flex-col bg-white/5 backdrop-blur-xl">
      <header className="drag flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="text-sm font-semibold tracking-tight">Jarvis</span>
        </div>
        <div className="no-drag flex items-center gap-3 text-xs">
          <span
            className={`flex items-center gap-1 ${
              cogneeUp ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                cogneeUp ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            {cogneeUp ? "memory online" : "memory offline"}
          </span>
          <button
            className="opacity-60 transition hover:opacity-100"
            onClick={() => void window.api.hide()}
          >
            ✕
          </button>
        </div>
      </header>

      <nav className="no-drag flex gap-1 px-3">
        {(["chat", "memory"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1 text-xs capitalize transition ${
              tab === t
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="no-drag flex-1 overflow-hidden p-3">
        {tab === "chat" ? (
          <ChatView
            dataset={dataset}
            setDataset={setDataset}
            screenshot={screenshot}
          />
        ) : (
          <MemoryView />
        )}
      </main>
    </div>
  );
}
