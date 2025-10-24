// server.ts
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT || (isProd ? 5000 : 3001));
const HOST = isProd ? "0.0.0.0" : (process.env.HOST || "localhost");
const ext = isProd ? "js" : "ts";

const app = express();

// JSON parser + CORS
app.use(express.json({ limit: "1mb" }));
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Health check
app.get("/healthz", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// API routes
try {
  const chat = (await import(`./api/chat.${ext}`)).default;
  const turnEval = (await import(`./api/turn_eval.${ext}`)).default;
  const sessionEnd = (await import(`./api/session_end.${ext}`)).default;

  app.use("/api/chat", chat);
  app.use("/api/turn_eval", turnEval);
  app.use("/api/session_end", sessionEnd);
} catch (e) {
  console.error("❌ Failed to load API routes:", e);
}

// Frontend: dev (Vite middleware) / prod (static)
if (!isProd) {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    root: path.resolve(__dirname, "client"),
    server: { middlewareMode: true, hmr: { overlay: true } },
  });
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      const indexPath = path.resolve(__dirname, "client", "index.html");
      const template = await readFile(indexPath, "utf8");
      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err: unknown) {
      const e = err as Error;
      vite.ssrFixStacktrace?.(e);
      console.error(e);
      res.status(500).end(e.message ?? "Internal Server Error");
    }
  });
} else {
  // Production: serve built Vite files from dist directory
  const distDir = path.resolve(__dirname, "dist");
  app.use(express.static(distDir));
  app.get("*", (_req, res) =>
    res.sendFile(path.join(distDir, "index.html"))
  );
}

app.listen(PORT, HOST, () => {
  console.log(`⚡ Lumen running at http://${HOST}:${PORT} (prod=${isProd})`);
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn("⚠️  OPENROUTER_API_KEY is not set — /api/chat will fallback/error.");
  }
});