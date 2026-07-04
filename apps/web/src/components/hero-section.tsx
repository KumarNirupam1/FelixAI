"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { HeroBackground } from "./hero-background";
import { Brain } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex h-[640px] w-full flex-col items-center overflow-hidden px-4 text-center md:h-[820px] md:px-5 lg:h-[900px]">
      <HeroBackground />

      <div className="absolute inset-x-0 top-0 z-20">
        <Header />
      </div>

      <div className="relative z-10 mt-20 flex max-w-3xl flex-col items-center gap-4 px-2 md:mt-28 md:gap-5 lg:mt-36">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-primary/75 md:text-xs">
          WeMakeDevs × Cognee
        </p>

        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          <span className="bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-transparent">
            FelixAI
          </span>
        </h1>

        <p className="max-w-xl text-lg font-medium leading-snug tracking-tight text-primary-light md:text-2xl">
          An AI companion that doesn&apos;t forget
        </p>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          One hotkey pulls up what&apos;s on your screen. A self-hosted Cognee
          knowledge graph remembers it today, last week, whenever you ask again.
        </p>

        <div className="mt-1 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="#get-started"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Button className="rounded-full bg-secondary px-8 py-3 text-base font-medium text-secondary-foreground shadow-lg ring-1 ring-white/10 hover:bg-secondary/90">
              Get started free
            </Button>
          </Link>
          <button
            type="button"
            onClick={() =>
              document.getElementById("architecture-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-8 py-3 text-base font-medium text-muted-foreground transition hover:border-white/20 hover:text-foreground"
          >
            See the loop
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-muted-foreground md:text-xs">
          <span className="flex items-center gap-1.5">
            <Brain className="h-3.5 w-3.5 text-primary/70" />
            Cognee graph memory
          </span>
          <span className="hidden h-3 w-px bg-white/12 sm:block" />
          <span>Docker · localhost:8000</span>
          <span className="hidden h-3 w-px bg-white/12 sm:block" />
          <span>Ctrl+Shift+Space</span>
        </div>
      </div>
    </section>
  );
}
