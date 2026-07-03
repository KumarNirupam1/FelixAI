export function LargeTestimonial() {
  return (
    <section className="flex w-full justify-center overflow-hidden px-5">
      <div className="w-full max-w-5xl px-4 py-12 md:px-12 md:py-20 lg:py-28">
        <blockquote className="text-center text-lg font-medium leading-relaxed text-foreground md:text-3xl lg:text-4xl lg:leading-[1.35]">
          &ldquo;FlickAI helped in the moment — but forgot by morning. FelixAI
          remembers what I was working on last week and answers from that
          graph.&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-sm font-bold text-primary">
            FX
          </div>
          <div className="text-left">
            <p className="text-base font-medium text-foreground">FelixAI</p>
            <p className="text-sm text-muted-foreground">
              Best Use of Open Source · Cognee Hackathon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
