"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What is FelixAI?",
    answer:
      "FelixAI is a desktop companion in your system tray. Press Ctrl+Shift+Space to capture your screen, ask a question, and get an answer from Cognee's knowledge graph — informed by live screen context from OpenRouter vision.",
  },
  {
    question: "What role does Cognee play?",
    answer:
      "Cognee is FelixAI's brain. It stores every exchange in a knowledge graph, answers via recall(GRAPH_COMPLETION), and improves over time with remember() and improve() — all running in Docker on your machine.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Screenshots are taken only on hotkey and are not stored on disk. Memory lives in self-hosted Cognee. Private mode keeps sensitive chats in a separate dataset you can wipe anytime with forget private.",
  },
  {
    question: "What do I need to run it?",
    answer:
      "Node 18+, pnpm, Docker with Cognee running, OPENROUTER_API_KEY and DEEPGRAM_API_KEY in apps/desktop/.env. Cognee's Docker needs LLM_API_KEY for graph completion.",
  },
  {
    question: "Does it support voice?",
    answer:
      "Yes. Deepgram nova-2 is built into the chat input — tap the mic, speak, and your words appear in the question field.",
  },
  {
    question: "Is it free to use?",
    answer:
      "FelixAI is open source for the hackathon. You bring your own API keys and self-host Cognee — no subscription, no Cognee Cloud required.",
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
      className="glass-panel w-full cursor-pointer overflow-hidden rounded-xl transition-colors hover:border-white/[0.14]"
      onClick={onToggle}
    >
      <div className="flex w-full items-center justify-between gap-5 px-5 py-[18px] pr-4 text-left">
        <p className="flex-1 text-base font-medium leading-6 text-foreground">
          {question}
        </p>
        <ChevronDown
          className={`h-6 w-6 shrink-0 text-muted-foreground transition-all duration-500 ${
            isOpen ? "rotate-180 scale-110" : ""
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-[18px] pt-2 text-sm leading-6 text-foreground/80">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  function toggle(index: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section className="relative mx-auto w-full max-w-xl px-5 pb-16 pt-4 md:pb-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">FAQ</h2>
        <p className="mt-2 text-sm text-muted-foreground">FelixAI & Cognee</p>
      </div>
      <div className="flex flex-col gap-3">
        {FAQ_DATA.map((faq, index) => (
          <FAQItem
            key={faq.question}
            {...faq}
            isOpen={openItems.has(index)}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
