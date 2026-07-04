import type { ComponentType } from "react";
import ScreenContextIllustration from "./bento/screen-context";
import MemoryGraphIllustration from "./bento/memory-graph";
import CrossSessionIllustration from "./bento/cross-session";
import VoiceModeIllustration from "./bento/voice-mode";
import PrivateVaultIllustration from "./bento/private-vault";
import SelfHostedIllustration from "./bento/self-hosted";

function BentoCard({
  title,
  description,
  Component,
}: {
  title: string;
  description: string;
  Component: ComponentType;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/20">
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "hsl(var(--primary) / 0.06)",
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
      <div className="relative z-10 h-72">
        <Component />
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "Screen-aware help",
    description:
      "OpenRouter vision describes what's on screen before Cognee answers.",
    Component: ScreenContextIllustration,
  },
  {
    title: "Cognee memory graph",
    description:
      "Every Q&A is stored and connected — recall uses GRAPH_COMPLETION.",
    Component: MemoryGraphIllustration,
  },
  {
    title: "Cross-session recall",
    description:
      "Ask about last week. FelixAI pulls context from your local graph.",
    Component: CrossSessionIllustration,
  },
  {
    title: "Voice input",
    description: "Speak your question — Deepgram nova-2 built into the popup.",
    Component: VoiceModeIllustration,
  },
  {
    title: "Private dataset",
    description:
      "Sensitive chats stay separate. Forget private with one command.",
    Component: PrivateVaultIllustration,
  },
  {
    title: "Fully self-hosted",
    description:
      "Cognee runs in Docker on your machine. No cloud memory lock-in.",
    Component: SelfHostedIllustration,
  },
];

export function BentoSection() {
  return (
    <section className="flex w-full flex-col items-center justify-center overflow-visible bg-transparent px-5">
      <div className="relative flex w-full max-w-6xl flex-col justify-start gap-6 py-8 md:py-16">
        <div className="pointer-events-none absolute left-20 top-[500px] h-[500px] w-[400px] rotate-[-33deg] rounded-full bg-primary/10 blur-[130px]" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-8 md:py-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Features
          </p>
          <h2 className="max-w-[655px] text-center text-4xl font-semibold leading-tight text-foreground md:text-6xl md:leading-[66px]">
            Your screen. Cognee&apos;s brain.
          </h2>
          <p className="max-w-[600px] text-center text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            FelixAI combines live screen context with a persistent knowledge
            graph — open source, local, and built for the Cognee hackathon.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
