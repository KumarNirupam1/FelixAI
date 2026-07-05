"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const GITHUB_REPO = "https://github.com/KumarNirupam1/FelixAI";
const SETUP_GUIDE = "https://github.com/KumarNirupam1/FelixAI#getting-started";

export function CTASection() {
  return (
    <section
      id="get-started"
      className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-16 md:pb-20 md:pt-24"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className="h-full w-full"
          viewBox="0 0 1388 825"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <mask
            id="felix-cta-mask"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="269"
            y="27"
            width="850"
            height="493"
          >
            <rect x="269.215" y="27.4062" width="849.57" height="492.311" fill="url(#felix-cta-fade)" />
          </mask>
          <g mask="url(#felix-cta-mask)">
            <g filter="url(#felix-cta-blur)">
              <ellipse
                cx="694"
                cy="-93.0414"
                rx="670.109"
                ry="354.908"
                fill="url(#felix-cta-radial)"
                fillOpacity="0.8"
              />
            </g>
            <ellipse cx="694" cy="-91.5385" rx="670.109" ry="354.908" fill="url(#felix-cta-white)" />
            <ellipse cx="694" cy="-93.0414" rx="670.109" ry="354.908" fill="url(#felix-cta-bg)" />
          </g>
          <defs>
            <filter
              id="felix-cta-blur"
              x="-234.109"
              y="-705.949"
              width="1856.22"
              height="1225.82"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="129" result="effect1_foregroundBlur" />
            </filter>
            <linearGradient id="felix-cta-fade" x1="1118.79" y1="273.562" x2="269.215" y2="273.562" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(var(--background))" stopOpacity="0" />
              <stop offset="0.2" stopColor="hsl(var(--background))" stopOpacity="0.8" />
              <stop offset="0.8" stopColor="hsl(var(--background))" stopOpacity="0.8" />
              <stop offset="1" stopColor="hsl(var(--background))" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="felix-cta-radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(683.482 245.884) rotate(-3.78676) scale(469.009 248.4)"
            >
              <stop offset="0.1294" stopColor="hsl(var(--primary-dark))" />
              <stop offset="0.2347" stopColor="hsl(var(--primary))" />
              <stop offset="0.3" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="felix-cta-white" x1="694" y1="-446.446" x2="694" y2="263.369" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="felix-cta-bg" x1="694" y1="-447.949" x2="694" y2="261.866" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(var(--background))" />
              <stop offset="1" stopColor="hsl(var(--background))" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center justify-start gap-8">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="max-w-[435px] break-words text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-[68px] lg:leading-[76px]">
            Get FelixAI!
          </h2>
          <p className="max-w-2xl break-words text-sm font-medium leading-[18.2px] text-muted-foreground md:text-base md:leading-relaxed">
            Experience a screen-aware assistant that remembers. Self-hosted Cognee
            memory, one hotkey, and answers grounded in what you&apos;ve already seen.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            <Button
              className="rounded-[99px] bg-secondary px-[30px] py-2 text-base font-medium leading-6 text-secondary-foreground shadow-[0px_0px_0px_4px_rgba(255,255,255,0.13)] transition-all duration-200 hover:bg-secondary/90"
              size="lg"
            >
              View on GitHub
            </Button>
          </Link>
          <Link href={SETUP_GUIDE} target="_blank" rel="noopener noreferrer">
            <Button
              className="rounded-[99px] bg-primary px-[30px] py-2 text-base font-medium leading-6 text-primary-foreground shadow-[0px_0px_0px_4px_rgba(255,255,255,0.13)] transition-all duration-200 hover:bg-primary/90"
              size="lg"
            >
              Setup guide
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
