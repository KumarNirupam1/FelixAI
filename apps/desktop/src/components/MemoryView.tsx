import { useEffect, useState } from "react";

interface Props {
  active: boolean;
}

type GraphDataset = "main" | "private";

function labelForItem(item: Record<string, unknown>): string {
  if (typeof item.name === "string" && item.name) return item.name;
  if (typeof item.id === "string" && item.id) return item.id.slice(0, 8) + "…";
  return "dataset";
}

export function MemoryView({ active }: Props) {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [graphDataset, setGraphDataset] = useState<GraphDataset>("main");
  const [openingGraph, setOpeningGraph] = useState(false);
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

  async function openGraph(): Promise<void> {
    setOpeningGraph(true);
    setGraphError(null);
    try {
      const res = await window.api.openMemoryGraph(graphDataset);
      if (!res.ok) setGraphError(res.error ?? "Could not open graph");
    } catch {
      setGraphError("Could not open graph");
    } finally {
      setOpeningGraph(false);
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

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {loading && (
          <p className="text-xs font-light text-white/40">Loading…</p>
        )}
        {!loading && items.length === 0 && (
          <p className="text-xs font-light text-white/40">
            No datasets yet. Chat and onboarding will populate memory.
          </p>
        )}
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/8 bg-white/5 px-3 py-2.5"
          >
            <p className="text-xs font-medium text-white/75">
              {labelForItem(it)}
            </p>
            {typeof it.id === "string" && (
              <p className="mt-0.5 font-mono text-[9px] text-white/25">
                {it.id}
              </p>
            )}
            {typeof it.description === "string" && it.description && (
              <p className="mt-1 text-[10px] text-white/40">
                {it.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="shrink-0 space-y-2 border-t border-white/8 pt-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {(
              [
                ["main", "Main"],
                ["private", "Private"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setGraphDataset(id)}
                className={`rounded-lg px-2.5 py-1 text-xs transition ${
                  graphDataset === id
                    ? "bg-white/10 text-white"
                    : "text-white/45 hover:text-white/75"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={openingGraph}
            onClick={() => void openGraph()}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10 disabled:opacity-50"
          >
            {openingGraph ? "Opening…" : "Open graph ↗"}
          </button>
        </div>
        {graphError && (
          <p className="text-[10px] text-red-300/80">{graphError}</p>
        )}
        <p className="text-[9px] text-white/25">
          Opens Cognee&apos;s graph in your browser — full screen, zoom, and pan.
        </p>
      </div>
    </div>
  );
}
