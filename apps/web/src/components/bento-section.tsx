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
    <div className="glass-panel group relative flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-white/[0.15]">
      <div className="relative z-10 flex flex-col gap-2 p-6">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="relative z-10 h-56 border-t border-white/[0.04]">
        <Component />
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "Screen-aware answers",
    description: "Vision describes your screen before Cognee answers.",
    Component: ScreenContextIllustration,
  },
  {
    title: "Knowledge graph memory",
    description: "Every exchange stored and connected in Cognee.",
    Component: MemoryGraphIllustration,
  },
  {
    title: "Cross-session recall",
    description: "Ask about last week — Felix pulls from your local graph.",
    Component: CrossSessionIllustration,
  },
  {
    title: "Voice input",
    description: "Speak your question with Deepgram built in.",
    Component: VoiceModeIllustration,
  },
  {
    title: "Private dataset",
    description: "Sensitive chats isolated. Forget private in one command.",
    Component: PrivateVaultIllustration,
  },
  {
    title: "Fully self-hosted",
    description: "Cognee in Docker on your machine. No cloud lock-in.",
    Component: SelfHostedIllustration,
  },
];

export function BentoSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5">
      <div className="mb-12 text-center md:mb-16">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
          Features
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Your screen. Cognee&apos;s brain.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
          Open source desktop companion for the Cognee hackathon — memory that
          actually persists.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <BentoCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
