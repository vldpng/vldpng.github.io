// Первым импортом и не просто так: грузит .env и проверяет обязательные
// переменные до того, как db.ts (через роуты ниже) откроет базу при импорте.
import "./src/server/env";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerBookingRoutes } from "./src/server/booking";
import { registerLeadRoutes } from "./src/server/leads";
import { registerAdminRoutes } from "./src/server/admin";

/**
 * Каталог приложения — считаем от самого файла, а не от process.cwd().
 * На проде Node запускает не человек, а Phusion Passenger (через него Plesk
 * поднимает Node-приложения), и рабочий каталог задаёт он. Полагаться на
 * cwd там нельзя: при несовпадении сайт отдавал бы пустоту без внятной
 * ошибки в логе. В dev это корень проекта, в проде — каталог server.cjs.
 */
const APP_ROOT = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  // Пустая строка и «0» — разные вещи, поэтому проверяем именно наличие:
  // под Phusion Passenger порт назначает он сам, и штатное значение PORT — 0.
  // При записи `Number(...) || 3000` ноль откатился бы на 3000 и всё сломал.
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(express.json());

  // API routes start
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  registerBookingRoutes(app);
  registerLeadRoutes(app);
  registerAdminRoutes(app);
  // API routes end

  // Фото сотрудников отдаём напрямую из public/: загруженные через админку
  // файлы появляются там во время работы, а прод-статика (dist/) собирается
  // один раз при деплое и новых файлов не содержит.
  app.use("/images/staff", express.static(path.join(APP_ROOT, "public/images/staff")));

  // Vite middleware for development.
  // Динамический импорт: в продакшен-сборку (dist/server.cjs) vite не попадает
  // и не требуется при `npm start` — поэтому живёт в devDependencies.
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      // allowedHosts: true lets the dev server be reached through a tunnel
      // (e.g. *.trycloudflare.com) for temporary demos.
      server: { middlewareMode: true, allowedHosts: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(APP_ROOT, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Ошибку старта показываем строкой, а не стеком: в браузере логов Plesk
// читать придётся именно её, и «что задать» там должно быть видно сразу.
startServer().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
