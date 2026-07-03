import { useEffect, useState } from "react";

export function MemoryView() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  function refresh(): void {
    setLoading(true);
    window.api
      .listMemory()
      .then((d) => setItems(d))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function forgetPrivate(): Promise<void> {
    await window.api.forgetPrivate();
    refresh();
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/50">what FelixAI remembers</span>
        <button
          onClick={() => void forgetPrivate()}
          className="rounded-md bg-red-500/20 px-2 py-1 text-[11px] text-red-300 transition hover:bg-red-500/30"
        >
          Forget private
        </button>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        {loading && <p className="text-xs text-white/40">loading…</p>}
        {!loading && items.length === 0 && (
          <p className="text-xs text-white/40">No datasets yet.</p>
        )}
        {items.map((it, i) => (
          <div key={i} className="rounded-lg bg-white/5 px-3 py-2 text-xs">
            <pre className="whitespace-pre-wrap break-words text-white/70">
              {JSON.stringify(it, null, 0)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
