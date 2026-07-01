/**
 * Ensures electron.exe exists after pnpm install.
 * pnpm 10 may run postinstall but @electron/get sometimes leaves a partial
 * dist/ on Windows — this script re-runs install.js or reports clearly.
 */
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function findElectronPkg() {
  const roots = [
    path.join(__dirname, "../apps/desktop/node_modules/electron"),
    path.join(__dirname, "../node_modules/electron"),
  ];
  for (const root of roots) {
    if (fs.existsSync(path.join(root, "install.js"))) return root;
  }
  // pnpm store layout
  const pnpm = path.join(__dirname, "../node_modules/.pnpm");
  if (!fs.existsSync(pnpm)) return null;
  for (const dir of fs.readdirSync(pnpm)) {
    if (!dir.startsWith("electron@")) continue;
    const candidate = path.join(pnpm, dir, "node_modules/electron");
    if (fs.existsSync(path.join(candidate, "install.js"))) return candidate;
  }
  return null;
}

const electronDir = findElectronPkg();
if (!electronDir) {
  console.warn("[postinstall-electron] electron package not found, skipping");
  process.exit(0);
}

const exe = path.join(electronDir, "dist", "electron.exe");
if (fs.existsSync(exe)) {
  console.log("[postinstall-electron] electron.exe OK");
  process.exit(0);
}

console.log("[postinstall-electron] electron.exe missing, running install.js…");
try {
  execSync("node install.js", {
    cwd: electronDir,
    stdio: "inherit",
    env: { ...process.env, force_no_cache: "true" },
  });
} catch (err) {
  console.error(
    "[postinstall-electron] install.js failed. Manual fix:\n" +
      "  curl -L -o %TEMP%\\electron.zip https://github.com/electron/electron/releases/download/v33.4.11/electron-v33.4.11-win32-x64.zip\n" +
      "  tar -xf %TEMP%\\electron.zip -C " +
      path.join(electronDir, "dist"),
  );
  process.exit(1);
}

if (!fs.existsSync(exe)) {
  console.error(
    "[postinstall-electron] Still no electron.exe after install.js. See README setup.",
  );
  process.exit(1);
}

console.log("[postinstall-electron] electron.exe installed");
