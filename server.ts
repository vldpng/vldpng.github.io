import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { registerBookingRoutes } from "./src/server/booking";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  // Load .env if present (dotenv is optional — never crash if it's missing).
  try {
    (await import("dotenv")).config();
  } catch {
    /* dotenv not installed — rely on real environment variables */
  }

  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API routes start
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  registerBookingRoutes(app);
  // API routes end

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      // allowedHosts: true lets the dev server be reached through a tunnel
      // (e.g. *.trycloudflare.com) for temporary demos.
      server: { middlewareMode: true, allowedHosts: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
