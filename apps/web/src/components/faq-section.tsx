"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What is FelixAI and how does it work?",
    answer:
      "FelixAI is a desktop assistant in your system tray. Press Ctrl+Shift+Space to capture your screen, ask a question, and get an answer from Cognee's knowledge graph — combined with live screen context from OpenRouter vision.",
  },
  {
    question: "How is FelixAI different from FlickAI?",
    answer:
      "Both see your screen on a hotkey. FelixAI adds self-hosted Cognee memory: every Q&A is stored in a knowledge graph, recall works across sessions, and you can browse datasets and open the memory graph in your browser.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Screenshots are taken only on hotkey and are not stored on disk. Memory lives in Cognee running in Docker on your machine. Private mode keeps sensitive chats in a separate dataset you can wipe anytime.",
  },
  {
    question: "What do I need to run it?",
    answer:
      "Node 18+, pnpm, Docker with Cognee running, plus OPENROUTER_API_KEY and DEEPGRAM_API_KEY in apps/desktop/.env. Cognee's Docker needs LLM_API_KEY for graph completion.",
  },
  {
    question: "Does it support voice?",
    answer:
      "Yes. Deepgram nova-2 is built into the chat input — tap the mic, speak, and your words appear in the question field.",
  },
  {
    question: "Is there a free version?",
    answer:
      "FelixAI is open source for the hackathon. You bring your own API keys (OpenRouter, Deepgram) and self-host Cognee — no subscription, no Cognee Cloud required.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-primary/[0.04] shadow-sm transition-all"
      onClick={onToggle}
      onKeyDown={(e) => e.key === "Enter" && onToggle()}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-[18px]">
        <p className="flex-1 text-base font-medium leading-6 text-foreground">
          {question}
        </p>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-[18px] text-sm leading-6 text-muted-foreground">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="relative flex w-full flex-col items-center px-5 pb-20 pt-16 md:pb-32">
      <div className="pointer-events-none absolute left-1/2 top-32 h-[400px] w-[300px] -translate-x-1/2 rotate-[-33deg] rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative z-10 mb-10 flex flex-col items-center gap-3 text-center">
        <h2 className="max-w-md text-4xl font-semibold leading-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="max-w-lg text-sm font-medium text-muted-foreground">
          Everything you need to know about FelixAI
        </p>
      </div>

      <div className="relative z-10 flex w-full max-w-[600px] flex-col gap-3">
        {FAQ_DATA.map((faq, i) => (
          <FAQItem
            key={faq.question}
            {...faq}
            isOpen={open.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
