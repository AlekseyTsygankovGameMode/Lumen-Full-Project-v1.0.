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
    outDir: "../dist/client",    // client build goes to dist/client/
    emptyOutDir: true,    // clears dist/client before build
    assetsDir: "assets",  // static assets (css/js/fonts)
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