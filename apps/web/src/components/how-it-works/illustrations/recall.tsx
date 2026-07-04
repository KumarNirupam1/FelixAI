"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const nodes = [
  { x: 50, y: 25 },
  { x: 22, y: 55 },
  { x: 78, y: 50 },
  { x: 40, y: 78 },
  { x: 62, y: 72 },
];

export default function RecallIllustration() {
  return (
    <div className="relative flex h-full items-center justify-center p-4">
      <div className="relative h-28 w-28">
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
                strokeOpacity={0.25}
                strokeWidth={0.6}
              />
            )),
          )}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={3.5}
              fill="hsl(var(--primary))"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="h-7 w-7 text-primary" />
        </div>
      </div>
    </div>
  );
}
