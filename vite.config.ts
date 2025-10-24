// ⚙️ vite.config.ts — Lumen HD Interface Config
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // 🌌 FRONTEND ROOT
  root: "client", // тут лежат index.html, main.tsx и всё UI

  server: {
    host: true,       // позволяет открывать по 192.168.x.x
    port: 5173,       // стандартный порт Vite
    strictPort: true, // не переключается на другой порт
  },

  build: {
    outDir: "../dist",    // билд складывается в dist/
    emptyOutDir: true,    // очищает dist при новой сборке
    assetsDir: "assets",  // куда складывать статику (css/js/fonts)
  },

  // 🧠 RESOLVE PATHS (на всякий случай, если используешь абсолютные импорты)
  resolve: {
    alias: {
      "@": "/client",
      "@components": "/client/components",
      "@styles": "/client/styles",
    },
  },
});