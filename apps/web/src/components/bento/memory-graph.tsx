"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const nodes = [
  { x: 50, y: 30 },
  { x: 20, y: 60 },
  { x: 80, y: 55 },
  { x: 35, y: 85 },
  { x: 65, y: 80 },
];

export default function MemoryGraphIllustration() {
  return (
    <div className="relative flex h-full items-center justify-center p-6">
      <div className="relative h-40 w-40">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          {nodes.map((a, i) =>
            nodes.slice(i + 1).map((b, j) => (
              <line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="hsl(var(--primary))"
                strokeOpacity={0.2}
                strokeWidth={0.5}
              />
            )),
          )}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={4}
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full border border-primary/30 bg-primary/10 p-3">
            <Brain className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
