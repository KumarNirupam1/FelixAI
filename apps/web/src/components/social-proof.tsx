const TECH = ["Cognee", "Electron", "OpenRouter", "Deepgram", "Docker", "TypeScript"];

export function SocialProof() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-5 px-5 py-12 md:gap-6 md:py-16">
      <p className="text-center text-3xl font-medium leading-tight text-gray-300">
        Built with
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 px-4 md:gap-12">
        {TECH.map((tech) => (
          <span
            key={tech}
            className="cursor-default text-xl font-bold text-gray-400 opacity-70 transition-opacity hover:opacity-100 md:text-2xl"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
