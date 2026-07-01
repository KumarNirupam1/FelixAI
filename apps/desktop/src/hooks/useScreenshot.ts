import { useEffect, useState } from "react";

/** Subscribes to the screenshot pushed by the main process on each summon. */
export function useScreenshot(): string | null {
  const [shot, setShot] = useState<string | null>(null);
  useEffect(() => window.api.onScreenshot(setShot), []);
  return shot;
}
