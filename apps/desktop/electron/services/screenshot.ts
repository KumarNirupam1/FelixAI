import { desktopCapturer, screen } from "electron";

// Cap capture width to keep the hotkey→popup path feeling instant (N3) and to
// keep the base64 payload small. gpt-4o-mini downscales images internally
// anyway, so 1920px wide loses no meaningful vision quality.
const MAX_WIDTH = 1920;

/**
 * F2 — capture a real screenshot of the primary display on demand.
 * Returns a base64 PNG data URL, or null if capture failed / was blank.
 * The image is kept in memory only and never written to disk (N6).
 */
export async function captureScreenshot(): Promise<string | null> {
  try {
    const primary = screen.getPrimaryDisplay();
    const scale = primary.scaleFactor || 1;
    const fullWidth = Math.round(primary.size.width * scale);
    const fullHeight = Math.round(primary.size.height * scale);

    const ratio = fullWidth > MAX_WIDTH ? MAX_WIDTH / fullWidth : 1;
    const width = Math.round(fullWidth * ratio);
    const height = Math.round(fullHeight * ratio);

    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: { width, height },
    });
    if (sources.length === 0) return null;

    const match =
      sources.find((s) => s.display_id === String(primary.id)) ?? sources[0];
    if (match.thumbnail.isEmpty()) return null;

    return match.thumbnail.toDataURL();
  } catch (err) {
    console.error("captureScreenshot failed", err);
    return null;
  }
}
