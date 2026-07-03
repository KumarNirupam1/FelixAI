"use client";

import type React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NAV = [
  { name: "Features", href: "#features-section" },
  { name: "How it Works", href: "#how-it-works-section" },
  { name: "FAQs", href: "#faq-section" },
];

function scrollTo(e: React.MouseEvent, href: string) {
  e.preventDefault();
  const id = href.slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/25">
          F
        </div>
        <span className="text-lg font-semibold tracking-tight">FelixAI</span>
      </div>

      <nav className="hidden md:flex items-center gap-1">
        {NAV.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={(e) => scrollTo(e, item.href)}
            className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div className="hidden md:block">
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]"
          onClick={(e) => scrollTo(e, "#get-started")}
        >
          Get Started
        </Button>
      </div>

      <button
        type="button"
        className="md:hidden rounded-lg p-2 text-muted-foreground"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute top-16 left-4 right-4 z-50 rounded-2xl border border-border bg-card p-4 md:hidden">
          {NAV.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={(e) => {
                scrollTo(e, item.href);
                setOpen(false);
              }}
              className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-accent"
            >
              {item.name}
            </button>
          ))}
          <Button
            className="mt-3 w-full bg-primary text-primary-foreground"
            onClick={(e) => {
              scrollTo(e, "#get-started");
              setOpen(false);
            }}
          >
            Get Started
          </Button>
        </div>
      )}
    </header>
  );
}
