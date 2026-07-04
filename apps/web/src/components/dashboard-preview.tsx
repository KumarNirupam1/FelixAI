export function DashboardPreview() {
  return (
    <div className="w-full">
      <div className="glass-panel-strong rounded-2xl p-1.5 shadow-2xl shadow-black/40">
        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#040d18]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-light shadow-[0_0_6px_hsl(var(--primary-light)/0.5)]" />
              <span className="text-xs font-medium text-white/80">FelixAI</span>
              <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] text-emerald-400/90">
                memory online
              </span>
            </div>
            <div className="flex gap-1.5 text-[9px]">
              <span className="rounded-md bg-white/8 px-2 py-0.5 text-white/50">Chat</span>
              <span className="rounded-md px-2 py-0.5 text-white/25">Memory</span>
            </div>
          </div>

          <div className="space-y-3 px-5 py-5">
            <div className="flex justify-end">
              <div className="max-w-[72%] rounded-2xl rounded-br-sm border border-white/10 bg-white/[0.07] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/85">
                What was my total API spend last week?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[78%] rounded-2xl rounded-bl-sm border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/65">
                From Cognee: OpenRouter usage was $2.14 last week. Screen shows
                the usage dashboard now.
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="h-9 flex-1 rounded-xl border border-white/10 bg-black/30 px-3 text-[10px] leading-9 text-white/30">
                Ask about your screen…
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sm text-primary-light">
                ↑
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
