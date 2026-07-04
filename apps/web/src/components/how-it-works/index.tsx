"use client";

import { memo, type ComponentType } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Brain,
  Camera,
  Database,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SummonIllustration from "./illustrations/summon";
import VisionIllustration from "./illustrations/vision";
import RecallIllustration from "./illustrations/recall";
import AnswerIllustration from "./illustrations/answer";
import RememberIllustration from "./illustrations/remember";

type Step = {
  num: number;
  title: string;
  description: string;
  icon: LucideIcon;
  Illustration: ComponentType;
};

const steps: Step[] = [
  {
    num: 1,
    title: "Summon",
    description: "Ctrl+Shift+Space captures your screen.",
    icon: Camera,
    Illustration: SummonIllustration,
  },
  {
    num: 2,
    title: "Vision",
    description: "OpenRouter reads what's on screen.",
    icon: Sparkles,
    Illustration: VisionIllustration,
  },
  {
    num: 3,
    title: "Recall",
    description: "Cognee answers from graph + context.",
    icon: Brain,
    Illustration: RecallIllustration,
  },
  {
    num: 4,
    title: "Answer",
    description: "Reply shown in the tray popup.",
    icon: MessageSquare,
    Illustration: AnswerIllustration,
  },
  {
    num: 5,
    title: "Remember",
    description: "Exchange saved. Graph improves.",
    icon: Database,
    Illustration: RememberIllustration,
  },
];

const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

const stepVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const lineVariants: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 0.45, delay: 0.15, ease: "easeOut" },
  },
};

function StepCard({ step }: { step: Step }) {
  const Icon = step.icon;
  const Illustration = step.Illustration;

  return (
    <motion.div
      className="glass-panel group relative z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl transition-colors hover:border-white/[0.15]"
      variants={stepVariants}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-5 pt-6 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10 transition-colors group-hover:bg-white/[0.09]">
          <Icon className="h-5 w-5 text-primary-light" strokeWidth={1.5} />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">
            Step {step.num}
          </p>
          <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>
      <div className="relative z-10 mt-auto h-44 border-t border-white/[0.04] md:h-48">
        <Illustration />
      </div>
    </motion.div>
  );
}

export const HowItWorksSection = memo(function HowItWorksSection() {
  return (
    <section id="architecture-section" className="mx-auto w-full max-w-6xl px-5">
      <div className="mb-12 text-center md:mb-14">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary/70">
          How it works
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          One loop, five steps
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
          FelixAI handles vision and UI. Cognee holds the brain.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          className="relative mb-8 grid grid-cols-1 gap-5 md:mb-10 md:grid-cols-3"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="pointer-events-none absolute top-[3.25rem] left-0 z-0 hidden h-px w-full md:block">
            <div className="flex h-full items-center px-10">
              <motion.div
                className="h-px flex-1 border-t border-dashed border-white/20"
                variants={lineVariants}
                style={{ originX: 0 }}
              />
              <div className="w-10" />
              <motion.div
                className="h-px flex-1 border-t border-dashed border-white/20"
                variants={lineVariants}
                style={{ originX: 0 }}
              />
            </div>
          </div>

          {steps.slice(0, 3).map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </motion.div>

        <motion.div
          className="relative mx-auto grid max-w-2xl grid-cols-1 gap-5 md:grid-cols-2"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="pointer-events-none absolute top-[3.25rem] left-0 z-0 hidden h-px w-full md:block">
            <div className="flex h-full items-center justify-center px-12">
              <motion.div
                className="h-px w-full max-w-[160px] border-t border-dashed border-white/20"
                variants={lineVariants}
                style={{ originX: 0 }}
              />
            </div>
          </div>

          {steps.slice(3, 5).map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </motion.div>
      </div>
    </section>
  );
});
