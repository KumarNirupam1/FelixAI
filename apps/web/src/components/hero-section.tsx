import { Header } from "./header";
import { Button } from "@/components/ui/button";

function HeroGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative mx-auto flex h-[640px] flex-col items-center overflow-hidden px-4 text-center md:h-[780px] lg:h-[860px] md:px-0">
      <HeroGrid />

      <div className="absolute left-0 right-0 top-0 z-20">
        <Header />
      </div>

      <div className="relative z-10 mt-24 max-w-[588px] space-y-5 px-4 md:mt-32 lg:mt-40">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          WeMakeDevs × Cognee Hackathon
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
          The assistant that sees your screen
          <span className="block text-primary">and never forgets.</span>
        </h1>
        <p className="mx-auto max-w-lg text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
          FelixAI lives in your tray. One hotkey, instant help — with every
          exchange stored in your self-hosted Cognee memory graph.
        </p>
      </div>

      <div className="relative z-10 mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Button
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg ring-1 ring-white/10"
          size="lg"
        >
          Ctrl+Shift+Space to summon
        </Button>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg ring-1 ring-primary/30"
          size="lg"
        >
          Built on Cognee OSS
        </Button>
      </div>
    </section>
  );
}
