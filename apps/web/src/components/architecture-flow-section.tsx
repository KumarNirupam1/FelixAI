"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Camera,
  MessageSquare,
  Sparkles,
  Database,
} from "lucide-react";

const FLOW = [
  {
    icon: Camera,
    title: "You summon",
    desc: "Ctrl+Shift+Space captures your screen silently.",
  },
  {
    icon: Sparkles,
    title: "Vision reads",
    desc: "OpenRouter turns the screenshot into text context.",
  },
  {
    icon: Brain,
    title: "Cognee recalls",
    desc: "GRAPH_COMPLETION answers from your memory graph + screen.",
  },
  {
    icon: MessageSquare,
    title: "You get the answer",
    desc: "Shown in a small popup — no context switching.",
  },
  {
    icon: Database,
    title: "Memory grows",
    desc: "remember() + improve() persist every exchange locally.",
  },
];

function FlowStep({
  step,
  index,
  isLast,
}: {
  step: (typeof FLOW)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative flex flex-1 flex-col items-center text-center"
    >
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 shadow-lg shadow-primary/10">
        <Icon className="h-6 w-6 text-primary" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {index + 1}
        </span>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground md:text-base">
        {step.title}
      </h3>
      <p className="mt-1.5 max-w-[160px] text-xs leading-relaxed text-muted-foreground md:text-sm">
        {step.desc}
      </p>
      {!isLast && (
        <div className="absolute left-[calc(50%+2rem)] top-7 hidden w-[calc(100%-4rem)] items-center lg:flex">
          <motion.div
            className="h-px flex-1 bg-gradient-to-r from-primary/50 to-primary/10"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
            style={{ transformOrigin: "left" }}
          />
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary/40" />
        </div>
      )}
    </motion.div>
  );
}

export function ArchitectureFlowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="architecture-section"
      className="relative w-full overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Architecture
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Cognee is the brain
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            FelixAI sees your screen. Cognee remembers everything. One loop,
            fully self-hosted.
          </p>
        </div>

        <div ref={ref} className="flex flex-col gap-10 lg:flex-row lg:gap-4">
          {FLOW.map((step, i) => (
            <FlowStep
              key={step.title}
              step={step}
              index={i}
              isLast={i === FLOW.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 font-mono text-[11px] leading-relaxed text-muted-foreground backdrop-blur-sm md:text-xs"
        >
          <p className="text-primary">// FelixAI ask loop</p>
          <p>hotkey → screenshot → OpenRouter vision → buildRecallQuery()</p>
          <p>
            → cognee.recall(GRAPH_COMPLETION, scope: auto) → answer →
            rememberQA() → improve()
          </p>
        </motion.div>
      </div>
    </section>
  );
}
