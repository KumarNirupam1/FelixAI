"use client";

import { motion } from "framer-motion";
import { Calendar, MessageSquare } from "lucide-react";

export default function CrossSessionIllustration() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        Last week
      </div>
      <motion.div
        className="w-full max-w-[200px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/60"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        &ldquo;Your API spend was $2.14…&rdquo;
      </motion.div>
      <div className="flex items-center gap-2 text-[10px] text-primary">
        <MessageSquare className="h-3.5 w-3.5" />
        Recalled from graph
      </div>
    </div>
  );
}
