// 🌌 Lumen HD Interface Config — fixed for Buffer + Vite + Replit
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

<<<<<<< HEAD
  // 🌍 FRONTEND ROOT
  root: "client",

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