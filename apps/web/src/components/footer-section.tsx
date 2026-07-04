const LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Feedback", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="mx-auto w-full max-w-6xl border-t border-white/[0.06] px-6 py-14 md:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-3xl font-medium tracking-tight text-white/45 md:text-4xl">
            FelixAI
          </p>
          <p className="mt-2 text-sm text-white/30">
            copyright © {new Date().getFullYear()} FelixAI
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/40 transition-colors hover:text-white/65"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
