"use client";

import type React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NAV = [
  { name: "Features", href: "#features-section" },
  { name: "Architecture", href: "#architecture-section" },
  { name: "How it Works", href: "#how-it-works-section" },
  { name: "FAQs", href: "#faq-section" },
];

function scrollTo(e: React.MouseEvent, href: string) {
  e.preventDefault();
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
              F
            </div>
            <span className="text-xl font-semibold text-foreground">FelixAI</span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={(e) => scrollTo(e, item.href)}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#888888] transition-colors hover:text-foreground"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="hidden rounded-full bg-secondary px-6 py-2 text-secondary-foreground shadow-sm hover:bg-secondary/90 md:inline-flex"
            onClick={(e) => scrollTo(e, "#get-started")}
          >
            Get Started
          </Button>
          <button
            type="button"
            className="rounded-lg p-2 text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-4 mt-4 flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 md:hidden">
          {NAV.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={(e) => {
                scrollTo(e, item.href);
                setOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-left text-lg text-[#888888] hover:text-foreground"
            >
              {item.name}
            </button>
          ))}
          <Button
            className="mt-2 w-full rounded-full bg-secondary text-secondary-foreground"
            onClick={(e) => {
              scrollTo(e, "#get-started");
              setOpen(false);
            }}
          >
            Get Started
          </Button>
        </nav>
      )}
    </header>
  );
}
