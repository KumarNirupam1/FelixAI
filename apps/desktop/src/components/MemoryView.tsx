import { useEffect, useState } from "react";

interface Props {
  active: boolean;
}

function labelForItem(item: Record<string, unknown>): string {
  if (typeof item.name === "string" && item.name) return item.name;
  if (typeof item.id === "string" && item.id) return item.id.slice(0, 8) + "…";
  return "dataset";
}

function idForItem(item: Record<string, unknown>): string | null {
  const id = item.id ?? item.dataset_id;
  return typeof id === "string" && id ? id : null;
}

export function MemoryView({ active }: Props) {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [graphError, setGraphError] = useState<string | null>(null);

  function refresh(): void {
    setLoading(true);
    window.api
      .listMemory()
      .then((d) => setItems(d))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (active) refresh();
  }, [active]);

  async function forgetPrivate(): Promise<void> {
    await window.api.forgetPrivate();
    refresh();
  }

  async function openGraph(datasetId: string): Promise<void> {
    if (typeof window.api.openMemoryGraph !== "function") {
      setGraphError(
        "App needs a restart — stop pnpm dev (Ctrl+C) and run it again.",
      );
      return;
    }

    setOpeningId(datasetId);
    setGraphError(null);
    try {
      const res = await window.api.openMemoryGraph(datasetId);
      if (!res.ok) setGraphError(res.error ?? "Could not open graph");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not open graph";
      setGraphError(msg);
    } finally {
      setOpeningId(null);
    }
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium uppercase tracking-wide text-white/35">
          Datasets
        </p>
        <button
          type="button"
          onClick={() => void forgetPrivate()}
          className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-1 text-[10px] text-red-300/90 transition hover:bg-red-500/20"
        >
          Forget private
        </button>
      </div>

      <p className="text-[10px] leading-relaxed text-white/30">
        Say <span className="text-white/45">remember this: …</span> or{" "}
        <span className="text-white/45">forget private</span> in chat.
      </p>

      {graphError && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-2 text-[10px] leading-relaxed text-red-200/90">
          {graphError}
        </p>
      )}

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {loading && (
          <p className="text-xs font-light text-white/40">Loading…</p>
        )}
        {!loading && items.length === 0 && (
          <p className="text-xs font-light text-white/40">
            No datasets yet. Chat and onboarding will populate memory.
          </p>
        )}
        {items.map((it, i) => {
          const datasetId = idForItem(it);
          const isOpening = datasetId !== null && openingId === datasetId;

          return (
            <div
              key={datasetId ?? i}
              className="rounded-xl border border-white/8 bg-white/5 px-3 py-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white/75">
                    {labelForItem(it)}
                  </p>
                  {datasetId && (
                    <p className="mt-0.5 font-mono text-[9px] text-white/25">
                      {datasetId}
                    </p>
                  )}
                  {typeof it.description === "string" && it.description && (
                    <p className="mt-1 text-[10px] text-white/40">
                      {it.description}
                    </p>
                  )}
                </div>
                {datasetId && (
                  <button
                    type="button"
                    disabled={isOpening}
                    onClick={() => void openGraph(datasetId)}
                    className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/75 transition hover:bg-white/10 disabled:opacity-50"
                  >
                    {isOpening ? "Opening…" : "Graph ↗"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="shrink-0 text-[9px] text-white/25">
        Graph opens in your browser — full screen, zoom, and pan. Cognee must
        be running.
      </p>
    </div>
  );
}
