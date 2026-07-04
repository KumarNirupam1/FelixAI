"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { Brain } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative mx-auto flex min-h-[85vh] w-full max-w-[1600px] flex-col items-center overflow-hidden px-4 pb-32 text-center md:px-6">
      <div className="absolute left-0 right-0 top-0 z-20">
        <Header />
      </div>

      <div className="relative z-10 mt-24 flex max-w-3xl flex-col items-center gap-6 md:mt-32 lg:mt-40">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
          WeMakeDevs × Cognee · Open Source
        </p>

        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
            FelixAI
          </span>
        </h1>

        <p className="text-xl font-medium tracking-tight text-primary-light md:text-2xl">
          Your trusted AI companion
        </p>

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A tray app with a self-hosted Cognee brain — one hotkey, live screen
          context, and a knowledge graph that persists across sessions.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
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
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-transparent px-8 py-3 text-base font-medium text-muted-foreground transition hover:border-white/20 hover:text-foreground"
          >
            See the loop
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
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
