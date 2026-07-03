export function DashboardPreview() {
  return (
    <div className="w-[calc(100vw-32px)] md:w-[900px] lg:w-[1000px]">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-2 shadow-2xl shadow-primary/10">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0908]/90 backdrop-blur-xl">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium text-white/70">FelixAI</span>
              <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[9px] text-primary">
                memory online
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[9px] text-white/40">
                Chat
              </span>
              <span className="rounded-md px-2 py-0.5 text-[9px] text-white/25">
                Memory
              </span>
            </div>
          </div>

          {/* Chat mock */}
          <div className="space-y-3 px-5 py-4">
            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-2xl rounded-br-md bg-primary/20 px-3 py-2 text-[11px] text-white/85">
                What was my total API spend last week?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-white/8 bg-white/5 px-3 py-2 text-[11px] leading-relaxed text-white/70">
                From memory: your OpenRouter usage was $2.14 last week across 47
                requests. Screen shows the usage dashboard now.
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <div className="h-8 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] leading-8 text-white/30">
                Ask about your screen…
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 text-primary">
                ↑
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
