import { resolve } from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname), "");

  return {
    main: {
      plugins: [externalizeDepsPlugin()],
      build: {
        rollupOptions: {
          input: { index: resolve(__dirname, "electron/main.ts") },
        },
      },
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
      build: {
        rollupOptions: {
          input: { index: resolve(__dirname, "electron/preload.ts") },
        },
      },
    },
    renderer: {
      root: __dirname,
      define: {
        "import.meta.env.VITE_DEEPGRAM_API_KEY": JSON.stringify(
          env.DEEPGRAM_API_KEY || env.VITE_DEEPGRAM_API_KEY || "",
        ),
      },
      build: {
        rollupOptions: {
          input: { index: resolve(__dirname, "index.html") },
        },
      },
      plugins: [react()],
    },
  };
});
