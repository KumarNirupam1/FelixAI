"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function VisionIllustration() {
  return (
    <div className="relative flex h-full items-center justify-center p-4">
      <div className="w-full max-w-[180px] rounded-lg border border-white/10 bg-black/40 p-2.5">
        <div className="relative h-16 overflow-hidden rounded-md border border-white/5 bg-white/[0.04]">
          <motion.div
            className="absolute inset-x-0 h-px bg-primary/70 shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-2 flex items-center gap-1 text-[9px] text-primary">
          <Sparkles className="h-3 w-3" />
          Reading screen…
        </div>
      </div>
    </div>
  );
}
