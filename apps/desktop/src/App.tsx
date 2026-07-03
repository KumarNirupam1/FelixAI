import { useEffect, useState } from "react";
import { ChatView } from "./components/ChatView";
import { MemoryView } from "./components/MemoryView";

type Tab = "chat" | "memory";

export function App() {
  const [tab, setTab] = useState<Tab>("chat");
  const [dataset, setDataset] = useState<"main" | "private">("main");
  const [cogneeUp, setCogneeUp] = useState(false);

  useEffect(() => {
    window.api
      .getStatus()
      .then((s) => setCogneeUp(s.cogneeUp))
      .catch(() => setCogneeUp(false));
  }, [tab]);

  useEffect(() => window.api.onShown(() => setTab("chat")), []);

  return (
    <div className="flex h-full w-full animate-fade-in bg-transparent p-1">
      <div className="glass flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        <header className="drag-region flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white/40" />
            <span className="text-sm font-medium tracking-wide text-white/80">
              FelixAI
            </span>
          </div>
          <div className="no-drag flex items-center gap-3 text-xs">
            <span
              className={`flex items-center gap-1.5 ${
                cogneeUp ? "text-emerald-400/90" : "text-amber-400/90"
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
              type="button"
              className="rounded-md px-2 py-1 text-white/40 transition hover:bg-white/5 hover:text-white/80"
              onClick={() => void window.api.hide()}
            >
              ESC
            </button>
          </div>
        </header>

        <nav className="no-drag flex gap-1 px-6 pb-2">
          {(["chat", "memory"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1 text-xs capitalize transition ${
                tab === t
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white/75"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <main className="no-drag min-h-0 flex-1 overflow-hidden px-6 pb-6">
          <div className={tab === "chat" ? "flex h-full flex-col" : "hidden"}>
            <ChatView dataset={dataset} setDataset={setDataset} />
          </div>
          <div className={tab === "memory" ? "flex h-full flex-col" : "hidden"}>
            <MemoryView />
          </div>
        </main>
      </div>
    </div>
  );
}
