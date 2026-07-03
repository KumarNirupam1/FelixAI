import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section
      id="get-started"
      className="relative flex w-full flex-col items-center overflow-visible px-5 pb-16 pt-20 md:pb-24 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-[280px] w-[700px] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-8 text-center">
        <h2 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Get FelixAI
        </h2>
        <p className="max-w-xl text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
          Clone the repo, start Cognee in Docker, add your keys, and press
          Ctrl+Shift+Space. Your assistant that remembers starts in minutes.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            className="bg-secondary text-secondary-foreground shadow-[0_0_0_4px_hsl(var(--foreground)/0.08)] hover:bg-secondary/90"
            size="lg"
          >
            View on GitHub
          </Button>
          <Button
            className="bg-primary text-primary-foreground shadow-[0_0_0_4px_hsl(var(--primary)/0.2)] hover:bg-primary/90"
            size="lg"
          >
            Read setup guide
          </Button>
        </div>
        <pre className="mt-4 w-full max-w-md overflow-x-auto rounded-xl border border-border bg-black/40 p-4 text-left font-mono text-xs leading-relaxed text-muted-foreground">
          {`pnpm install\npnpm dev          # desktop\npnpm dev:web      # this page`}
        </pre>
      </div>
    </section>
  );
}
