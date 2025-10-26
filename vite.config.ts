<<<<<<< HEAD
// 🌌 Lumen HD Interface Config — fixed for Buffer + Vite + Replit
=======
// ⚙️ vite.config.ts — Lumen HD Interface Config
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

<<<<<<< HEAD
  // 🌍 FRONTEND ROOT
  root: "client",

  server: {
    host: "0.0.0.0",       // allow Replit / localhost access
    port: 5000,            // Replit default port
    strictPort: true,
    allowedHosts: true,
  },

  // 🧱 BUILD OUTPUT
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
    assetsDir: "assets",
  },

  // 🧩 PATH RESOLVE
=======
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
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
  resolve: {
    alias: {
      "@": "/client",
      "@components": "/client/components",
      "@styles": "/client/styles",
<<<<<<< HEAD
      buffer: "buffer/", // 👈 добавляем фикc Buffer
    },
  },

  // 🌐 GLOBAL FIX for Buffer in browser
  define: {
    global: "window",
  },

  optimizeDeps: {
    include: ["buffer"],
  },
=======
    },
  },
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
});