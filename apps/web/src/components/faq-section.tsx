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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <div
      className="w-full cursor-pointer overflow-hidden rounded-[10px] bg-primary/[0.06] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] outline outline-1 outline-border"
      onClick={handleClick}
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
    <section className="relative flex w-full flex-col items-center px-5 pb-20 pt-16 md:pb-40">
      <div className="pointer-events-none absolute left-1/2 top-[150px] h-[500px] w-[300px] -translate-x-1/2 rotate-[-33deg] rounded-full bg-primary/10 blur-[100px]" />
      <div className="relative z-10 mb-10 flex flex-col items-center gap-3 text-center">
        <h2 className="max-w-md text-4xl font-semibold leading-10 text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="max-w-lg text-sm font-medium text-muted-foreground">
          Everything you need to know about FelixAI and Cognee
        </p>
      </div>
      <div className="relative z-10 flex w-full max-w-[600px] flex-col gap-4">
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
