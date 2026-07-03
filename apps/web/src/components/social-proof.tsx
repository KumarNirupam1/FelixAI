const TECH = [
  "Cognee",
  "Electron",
  "OpenRouter",
  "Deepgram",
  "Next.js",
  "TypeScript",
  "Docker",
  "Graph Memory",
];

export function SocialProof() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 overflow-hidden py-16">
      <p className="text-center text-2xl font-medium text-muted-foreground md:text-3xl">
        Powered by open source
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 px-4 md:gap-10">
        {TECH.map((tech) => (
          <span
            key={tech}
            className="cursor-default text-lg font-bold text-muted-foreground opacity-60 transition hover:text-primary hover:opacity-100 md:text-xl"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
