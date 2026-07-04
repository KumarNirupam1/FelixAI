"use client";

import { motion } from "framer-motion";

export default function AnswerIllustration() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
      <motion.div
        className="w-full max-w-[160px] rounded-lg rounded-br-sm border border-white/10 bg-white/[0.07] px-2.5 py-2 text-[9px] text-white/75"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        What was my API spend?
      </motion.div>
      <motion.div
        className="w-full max-w-[170px] rounded-lg rounded-bl-sm border border-white/[0.08] bg-white/[0.04] px-2.5 py-2 text-[9px] text-white/55"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
      >
        From Cognee: $2.14 last week.
      </motion.div>
    </div>
  );
}
