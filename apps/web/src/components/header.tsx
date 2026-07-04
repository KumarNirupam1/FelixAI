"use client";

import type React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NAV = [
  { name: "Features", href: "#features-section" },
  { name: "How it works", href: "#architecture-section" },
  { name: "FAQ", href: "#faq-section" },
];

function scrollTo(e: React.MouseEvent, href: string) {
  e.preventDefault();
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-5 py-4">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-xl font-semibold text-foreground">FelixAI</span>
          <nav className="hidden items-center gap-2 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="rounded-full px-4 py-2 font-medium text-[#888888] transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="hidden rounded-full bg-secondary px-6 py-2 font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90 md:inline-flex"
            onClick={(e) => scrollTo(e, "#get-started")}
          >
            Get started
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
        <nav className="mx-auto mt-4 flex w-full max-w-6xl flex-col gap-2 border-t border-white/10 pt-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => {
                scrollTo(e, item.href);
                setOpen(false);
              }}
              className="py-2 text-lg text-[#888888] transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
          <Button
            className="mt-2 w-full rounded-full bg-secondary font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90"
            onClick={(e) => {
              scrollTo(e, "#get-started");
              setOpen(false);
            }}
          >
            Get started
          </Button>
        </nav>
      )}
    </header>
  );
}
