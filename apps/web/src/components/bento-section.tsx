import type { LucideIcon } from "lucide-react";
import {
  Bug,
  Brain,
  Eye,
  GitGraph,
  Lock,
  Mail,
  Mic,
  NotebookPen,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";

function BentoVisual({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="relative">
        <div className="absolute inset-0 scale-150 rounded-full bg-primary/15 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10">
          <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function BentoCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-primary/15">
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "hsl(var(--primary) / 0.04)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 to-transparent" />
      <div className="relative z-10 flex flex-col gap-1.5 p-6">
        <p className="text-lg leading-7 text-foreground">
          {title}
          <br />
          <span className="text-muted-foreground">{description}</span>
        </p>
      </div>
      <div className="relative z-10 h-48">
        <BentoVisual Icon={Icon} />
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "Understand your work",
    description: "Sees what you're working on and provides relevant help instantly.",
    Icon: Eye,
  },
  {
    title: "Find bugs instantly",
    description: "Get solutions for code errors without leaving your IDE.",
    Icon: Bug,
  },
  {
    title: "Write better emails",
    description: "Draft perfect responses with context-aware suggestions.",
    Icon: Mail,
  },
  {
    title: "Catch every typo",
    description: "Fix grammar and spelling mistakes across any app.",
    Icon: Type,
  },
  {
    title: "Explain complex text",
    description: "Highlight any text to get a simple, clear explanation.",
    Icon: Wand2,
  },
  {
    title: "Automated notes",
    description: "Get summaries and action items from your meetings.",
    Icon: NotebookPen,
  },
  {
    title: "Persistent memory",
    description: "Every Q&A stored in Cognee — recall context from weeks ago.",
    Icon: Brain,
  },
  {
    title: "Voice mode",
    description: "Speak instead of type. Deepgram nova-2 transcription built in.",
    Icon: Mic,
  },
  {
    title: "Memory graph",
    description: "Browse datasets and open Cognee's interactive graph in your browser.",
    Icon: GitGraph,
  },
  {
    title: "Private mode",
    description: "Separate dataset for sensitive chats. Forget private in one command.",
    Icon: Lock,
  },
  {
    title: "Smart onboarding",
    description: "First summon seeds your graph with who you are and how you work.",
    Icon: Sparkles,
  },
];

export function BentoSection() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-visible px-5">
      <div className="relative flex w-full max-w-6xl flex-col gap-6 py-8 md:py-16">
        <div className="pointer-events-none absolute left-20 top-[400px] h-[500px] w-[400px] rotate-[-33deg] rounded-full bg-primary/10 blur-[130px]" />

        <div className="relative z-10 flex flex-col items-center gap-4 py-8 md:py-14">
          <h2 className="max-w-[655px] text-center text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Everything FlickAI does — plus memory
          </h2>
          <p className="max-w-[620px] text-center text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            Screen-aware help, voice input, and smart actions — with a
            self-hosted knowledge graph that grows every session.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
