"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export default function VoiceModeIllustration() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <Mic className="h-7 w-7 text-primary" />
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </div>
      <div className="flex gap-1">
        {[3, 5, 8, 5, 3, 6, 4].map((h, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-primary/60"
            animate={{ height: [h, h + 4, h] }}
            transition={{ duration: 0.6, delay: i * 0.08, repeat: Infinity }}
            style={{ height: h }}
          />
        ))}
      </div>
    </div>
  );
}
