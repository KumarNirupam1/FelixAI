"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Command, Download, Monitor, Sparkles } from "lucide-react"

const Step = ({ step, index }: { step: {
  label: string
  title: string
  description: string
  features: string[]
  visual: React.ReactNode
}; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-20 items-center justify-between w-full max-w-6xl`}
    >
      <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-xl font-bold text-primary font-mono">0{index + 1}</span>
          </div>
          <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">{step.label}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{step.title}</h3>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">{step.description}</p>
        <ul className="flex flex-col gap-3 mt-2">
          {step.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80 justify-center md:justify-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-700 opacity-50" />
        <div className="relative aspect-[4/3] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl flex items-center justify-center p-8">
          {step.visual}
        </div>
      </div>
    </motion.div>
  )
}

const VisualMockup1 = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-x-8 top-8 bottom-0 bg-background rounded-t-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
      <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <div className="flex-1 p-6 flex items-center justify-center flex-col gap-4">
        <Download className="w-16 h-16 text-primary/50 animate-bounce" />
        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-full bg-primary/50"
          />
        </div>
        <span className="text-xs text-muted-foreground font-mono">docker compose up -d</span>
      </div>
    </div>
  </div>
)

const VisualMockup2 = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="flex gap-4">
      <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/10 shadow-xl flex items-center justify-center">
        <Command className="w-10 h-10 text-foreground" />
      </div>
      <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/10 shadow-xl flex items-center justify-center">
        <span className="text-sm font-bold">Shift Space</span>
      </div>
    </div>
    <div className="text-sm text-primary font-mono bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
      Ctrl+Shift+Space
    </div>
  </div>
)

const VisualMockup3 = () => (
  <div className="relative w-full max-w-sm aspect-video bg-background/50 rounded-lg border border-white/10 shadow-2xl p-4 flex flex-col gap-3 overflow-hidden">
    <div className="w-2/3 h-4 bg-white/10 rounded" />
    <div className="w-full h-32 bg-white/5 rounded border border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Monitor className="w-12 h-12 text-muted-foreground/20" />
      </div>
      <motion.div
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute left-0 right-0 h-1 bg-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
      />
    </div>
    <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] text-primary border border-primary/20">
      <Sparkles className="w-3 h-3" />
      Vision → text
    </div>
  </div>
)

const VisualMockup4 = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6">
    <div className="relative w-full bg-background rounded-xl border border-white/10 shadow-2xl p-4 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="text-sm font-medium text-foreground">Cognee recall answer:</div>
          <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-xs text-muted-foreground leading-relaxed">
            From your graph: last week&apos;s API spend was $2.14 across 47 requests.
            Screen shows the usage dashboard now.
          </div>
          <div className="flex gap-2 text-[10px]">
            <span className="px-2 py-1 rounded bg-primary/15 text-primary border border-primary/20">used memory</span>
            <span className="px-2 py-1 rounded bg-white/5 text-white/40">rememberQA()</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export function HowItWorksSection() {
  const steps = [
    {
      label: "Setup",
      title: "Self-hosted Cognee brain",
      description:
        "FelixAI runs in your tray with Cognee in Docker on localhost:8000. Your knowledge graph, your machine — no cloud memory.",
      features: ["Electron desktop app", "Cognee OSS in Docker", "OpenRouter + Deepgram keys"],
      visual: <VisualMockup1 />,
    },
    {
      label: "Summon",
      title: "One hotkey, anywhere",
      description:
        "Press Ctrl+Shift+Space from any app. Screenshot is captured before the popup opens — no alt-tab required.",
      features: ["Global hotkey", "Silent capture", "Escape to dismiss"],
      visual: <VisualMockup2 />,
    },
    {
      label: "Context",
      title: "Screen → text → recall",
      description:
        "OpenRouter vision describes your screen. Cognee recall(GRAPH_COMPLETION) weaves that with your memory graph to answer.",
      features: ["Vision before recall", "scope: auto", "Screenshots not stored"],
      visual: <VisualMockup3 />,
    },
    {
      label: "Memory",
      title: "Never forgets",
      description:
        "Every exchange is remembered in the background. improve() refines the graph. Ask again next week — Felix still knows.",
      features: ["rememberQA fire-and-forget", "Cross-session recall", "Graph visualize in browser"],
      visual: <VisualMockup4 />,
    },
  ]

  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="container mx-auto px-4 flex flex-col items-center gap-24 md:gap-32">
        <div className="text-center max-w-3xl space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            How FelixAI works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From hotkey to answer to permanent memory — Cognee at the center of
            every interaction.
          </p>
        </div>
        <div className="flex flex-col w-full items-center gap-24 md:gap-32 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />
          {steps.map((step, index) => (
            <Step key={step.title} index={index} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
