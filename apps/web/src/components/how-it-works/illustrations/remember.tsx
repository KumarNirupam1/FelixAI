"use client";

import { motion } from "framer-motion";
import { Database } from "lucide-react";

export default function RememberIllustration() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
      <motion.div
        className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[9px] text-emerald-400/90"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Database className="h-3.5 w-3.5" />
        rememberQA()
      </motion.div>
      <motion.div
        className="h-1 w-24 overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          className="h-full rounded-full bg-primary/60"
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        />
      </motion.div>
      <span className="text-[9px] text-muted-foreground">Graph improves</span>
    </div>
  );
}
