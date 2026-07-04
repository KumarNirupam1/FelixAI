"use client";

import { motion } from "framer-motion";
import { Monitor, Sparkles } from "lucide-react";

export default function ScreenContextIllustration() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-6">
      <div className="relative w-full max-w-[220px] rounded-xl border border-white/10 bg-black/50 p-3 shadow-2xl">
        <div className="mb-2 flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-500/40" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
          <div className="h-2 w-2 rounded-full bg-green-500/40" />
        </div>
        <div className="relative h-24 overflow-hidden rounded-lg border border-white/5 bg-white/5">
          <Monitor className="absolute inset-0 m-auto h-10 w-10 text-white/10" />
          <motion.div
            className="absolute inset-x-0 h-0.5 bg-primary/60 shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[9px] text-primary">
          <Sparkles className="h-3 w-3" />
          Reading your screen…
        </div>
      </div>
    </div>
  );
}
