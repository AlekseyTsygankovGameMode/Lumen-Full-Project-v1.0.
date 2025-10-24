// ⚙️ vite.config.ts — Lumen HD Interface Config
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // 🌌 FRONTEND ROOT
  root: "client", // тут лежат index.html, main.tsx и всё UI

  server: {
    host: "0.0.0.0",  // bind to all interfaces for Replit
    port: 5000,       // Replit requires port 5000 for frontend
    strictPort: true, // не переключается на другой порт
    allowedHosts: true, // allow Replit proxy hosts
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