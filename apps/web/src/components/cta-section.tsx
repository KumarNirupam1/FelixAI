"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="get-started"
      className="relative flex w-full flex-col items-center px-5 pb-20 pt-16 md:pb-28 md:pt-24"
    >
      <div className="glass-panel-strong relative max-w-2xl rounded-3xl px-8 py-12 text-center md:px-14 md:py-16">
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Run FelixAI locally
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Clone the repo, start Cognee in Docker, add your keys — your
            screen-aware assistant with persistent memory is ready in minutes.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.1] px-8 py-3 text-base font-medium text-foreground transition hover:bg-white/[0.14]"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Link>
            <button
              type="button"
              onClick={() =>
                document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-3 text-base font-medium text-foreground transition hover:bg-white/[0.08]"
            >
              Setup guide
            </button>
          </div>

          <pre className="mt-2 w-full overflow-x-auto rounded-xl border border-white/[0.06] bg-black/40 p-4 text-left font-mono text-[11px] leading-relaxed text-muted-foreground">
            {`docker compose up -d    # Cognee\npnpm install && pnpm dev\nCtrl+Shift+Space      # summon`}
          </pre>
        </div>
      </div>
    </section>
  );
}
