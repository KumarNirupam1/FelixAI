"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Camera,
  Database,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const FLOW = [
  { icon: Camera, title: "Summon", desc: "Ctrl+Shift+Space captures your screen." },
  { icon: Sparkles, title: "Vision", desc: "OpenRouter reads what's on screen." },
  { icon: Brain, title: "Recall", desc: "Cognee answers from graph + context." },
  { icon: MessageSquare, title: "Answer", desc: "Reply shown in the tray popup." },
  { icon: Database, title: "Remember", desc: "Exchange saved. Graph improves." },
];

function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof FLOW)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="glass-panel flex w-full flex-col items-center rounded-2xl p-4 text-center md:flex-1 md:p-5"
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
        <Icon className="h-5 w-5 text-primary-light" strokeWidth={1.5} />
      </div>
      <span className="mb-1 text-[10px] font-medium text-white/35">{index + 1}</span>
      <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{step.desc}</p>
    </motion.div>
  );
}

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`flex shrink-0 items-center justify-center ${vertical ? "py-2" : "px-1 md:px-2"}`}>
      <ArrowRight
        className={`h-4 w-4 text-white/25 ${vertical ? "rotate-90" : ""}`}
        strokeWidth={1.5}
      />
    </div>
  );
}

export function ArchitectureFlowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="architecture-section" className="mx-auto w-full max-w-6xl px-5 py-16 md:py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary/70">
          How it works
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          One loop, five steps
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          FelixAI handles vision and UI. Cognee holds the brain.
        </p>
      </div>

      <div ref={ref} className="hidden items-center md:flex">
        {FLOW.map((step, i) => (
          <div key={step.title} className="flex flex-1 items-center">
            <StepCard step={step} index={i} inView={inView} />
            {i < FLOW.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:hidden">
        {FLOW.map((step, i) => (
          <div key={step.title}>
            <StepCard step={step} index={i} inView={inView} />
            {i < FLOW.length - 1 && <FlowArrow vertical />}
          </div>
        ))}
      </div>
    </section>
  );
}
