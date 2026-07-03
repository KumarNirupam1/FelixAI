export function FooterSection() {
  return (
    <footer className="flex w-full flex-col items-center gap-6 py-20">
      <div className="relative text-center">
        <p className="select-none text-[100px] font-bold leading-none tracking-tighter text-foreground opacity-[0.03] md:text-[160px]">
          FelixAI
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} FelixAI · WeMakeDevs Cognee Hackathon
      </p>
    </footer>
  );
}
