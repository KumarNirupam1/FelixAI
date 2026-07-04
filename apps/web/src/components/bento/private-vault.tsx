"use client";

import { Lock, Shield } from "lucide-react";

export default function PrivateVaultIllustration() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <div className="relative rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/15 to-transparent p-5">
        <Shield className="h-12 w-12 text-primary/80" />
        <Lock className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border border-primary/30 bg-background p-0.5 text-primary" />
      </div>
      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary">
        private dataset
      </span>
    </div>
  );
}
