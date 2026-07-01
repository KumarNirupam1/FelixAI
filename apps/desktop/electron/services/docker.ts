import { exec } from "node:child_process";

const COGNEE_URL = () => process.env.COGNEE_URL ?? "http://localhost:8000";

/**
 * F9 (best-effort) — if Cognee isn't answering /health and a repo path is
 * configured, run `docker compose up -d` and poll until it's ready.
 */
export async function ensureCogneeRunning(repoPath?: string): Promise<boolean> {
  if (await isUp()) return true;
  if (!repoPath) return false;

  await new Promise<void>((resolve) => {
    exec("docker compose up -d", { cwd: repoPath }, (err) => {
      if (err) console.error("docker compose up failed", err);
      resolve();
    });
  });

  for (let i = 0; i < 30; i++) {
    if (await isUp()) return true;
    await sleep(1000);
  }
  return false;
}

async function isUp(): Promise<boolean> {
  try {
    const res = await fetch(`${COGNEE_URL()}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
