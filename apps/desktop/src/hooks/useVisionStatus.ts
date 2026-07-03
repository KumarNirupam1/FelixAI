import { useEffect, useState } from "react";

export type VisionStatus = "idle" | "analyzing" | "ready" | "failed";

export function useVisionStatus(): VisionStatus {
  const [status, setStatus] = useState<VisionStatus>("idle");
  useEffect(() => window.api.onVisionStatus(setStatus), []);
  return status;
}
