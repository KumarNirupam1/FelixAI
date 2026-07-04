"use client";

import { motion } from "framer-motion";
import { Container, Server } from "lucide-react";

export default function SelfHostedIllustration() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <div className="flex items-center gap-3">
        <Container className="h-10 w-10 text-primary/70" />
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-primary"
        >
          →
        </motion.div>
        <Server className="h-10 w-10 text-primary/70" />
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">
        localhost:8000 · Docker
      </p>
      <span className="text-[9px] text-primary/80">Your machine. Your graph.</span>
    </div>
  );
}
