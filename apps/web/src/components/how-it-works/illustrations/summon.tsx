"use client";

import { motion } from "framer-motion";

export default function SummonIllustration() {
  return (
    <div className="flex h-full items-center justify-center gap-2 p-4">
      {["Ctrl", "Shift", "Space"].map((key, i) => (
        <motion.div
          key={key}
          className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1.5 text-[10px] font-medium text-white/70"
          animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, delay: i * 0.15, repeat: Infinity }}
        >
          {key}
        </motion.div>
      ))}
    </div>
  );
}
