import Image from "next/image";
import appPreview from "@/app/app.png";

export function DashboardPreview() {
  return (
    <div className="w-[calc(100vw-32px)] md:w-[960px]">
      <div className="relative rounded-2xl bg-primary-light/50 p-2 shadow-2xl shadow-primary/25">
        <div
          className="pointer-events-none absolute -inset-6 rounded-[28px] opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, hsl(var(--primary-light) / 0.55), hsl(var(--primary) / 0.15) 55%, transparent 75%)",
          }}
          aria-hidden
        />
        <Image
          src={appPreview}
          alt="FelixAI desktop app over a scenic lake background"
          className="relative w-full rounded-xl shadow-lg ring-1 ring-white/10"
          priority
        />
      </div>
    </div>
  );
}
