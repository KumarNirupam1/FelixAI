import { desktopCapturer, screen } from "electron";

/**
 * F2 — capture a real screenshot of the primary display on demand.
 * Returns a base64 PNG data URL, or null if capture failed / was blank.
 * The image is kept in memory only and never written to disk (N6).
 */
export async function captureScreenshot(): Promise<string | null> {
  try {
    const primary = screen.getPrimaryDisplay();
    const { width, height } = primary.size;
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
