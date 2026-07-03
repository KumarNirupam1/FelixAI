"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Command, Monitor, Sparkles } from "lucide-react";

function Step({
  step,
  index,
}: {
  step: {
    label: string;
    title: string;
    description: string;
    features: string[];
    visual: React.ReactNode;
  };
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className={`flex w-full max-w-6xl flex-col items-center gap-8 md:gap-16 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="flex flex-1 flex-col gap-5 text-center md:text-left">
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
            <span className="font-mono text-sm font-bold text-primary">
              0{index + 1}
            </span>
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {step.label}
          </span>
        </div>
        <h3 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {step.title}
        </h3>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          {step.description}
        </p>
        <ul className="flex flex-col gap-2.5">
          {step.features.map((f) => (
            <li
              key={f}
              className="flex items-center justify-center gap-2.5 text-sm font-medium text-foreground/80 md:justify-start"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative w-full flex-1">
        <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl" />
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md">
          {step.visual}
        </div>
      </div>
    </motion.div>
  );
}

const STEPS = [
  {
    label: "The Foundation",
    title: "Native + self-hosted memory",
    description:
      "FelixAI sits in your system tray with Cognee running in Docker on your machine. Your graph, your data — no cloud lock-in.",
    features: [
      "Electron desktop app",
      "Cognee OSS in Docker",
      "Low memory footprint",
    ],
    visual: (
      <div className="flex flex-col items-center gap-3 text-center">
        <Brain className="h-16 w-16 text-primary/70" />
        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary">
          localhost:8000
        </span>
      </div>
    ),
  },
  {
    label: "The Trigger",
    title: "Instant access",
    description:
      "Press Ctrl+Shift+Space from anywhere. Screenshot captured before the popup — no alt-tab, no copy-paste.",
    features: [
      "Global hotkey",
      "Silent screenshot",
      "Escape to dismiss",
    ],
    visual: (
      <div className="flex items-center gap-3">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <Command className="h-8 w-8" />
        </div>
        <span className="text-lg font-bold text-primary">+</span>
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-bold">
          Shift Space
        </div>
      </div>
    ),
  },
  {
    label: "The Context",
    title: "Screen intelligence",
    description:
      "OpenRouter vision describes what's on screen. Cognee recall weaves screen context with your memory graph for the answer.",
    features: [
      "Vision before recall",
      "GRAPH_COMPLETION answers",
      "Screenshots never stored",
    ],
    visual: (
      <div className="relative w-full max-w-xs">
        <Monitor className="mx-auto h-14 w-14 text-muted-foreground/30" />
        <div className="absolute right-0 top-0 flex items-center gap-1 rounded border border-primary/25 bg-black/60 px-2 py-1 text-[10px] text-primary">
          <Sparkles className="h-3 w-3" />
          Analyzing
        </div>
      </div>
    ),
  },
  {
    label: "The Memory",
    title: "Never forgets",
    description:
      "Every exchange is remembered in the background. improve() refines the graph. Ask again next week — Felix still knows.",
    features: [
      "rememberQA in background",
      "Cross-session recall",
      "Feedback + graph view",
    ],
    visual: (
      <div className="w-full max-w-sm space-y-2 rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[10px] text-muted-foreground">
        <p>
          <span className="text-primary">recall</span>
          (scope: auto, GRAPH_COMPLETION)
        </p>
        <p className="text-primary/80">→ &ldquo;Your API spend was $2.14…&rdquo;</p>
        <p className="text-white/25">rememberQA() · improve() · done</p>
      </div>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto flex flex-col items-center gap-20 px-4 md:gap-28">
        <div className="max-w-3xl space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            How FelixAI works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            From hotkey to answer to permanent memory — designed for people who
            hate context-switching.
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center gap-20 md:gap-28">
          {STEPS.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
