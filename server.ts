// Первым импортом и не просто так: грузит .env и проверяет обязательные
// переменные до того, как db.ts (через роуты ниже) откроет базу при импорте.
import "./src/server/env";
import express from "express";
import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { registerLeadRoutes } from "./src/server/leads";
import { registerAdminRoutes } from "./src/server/admin";
import { UPLOADS_STAFF_DIR } from "./src/server/paths";
import { registerTelegramRoutes } from "./src/server/telegram";
import { installProcessAlerts, reportError } from "./src/server/alerts";
import { checkDatabase } from "./src/server/db";

/**
 * Каталог приложения — считаем от самого файла, а не от process.cwd().
 * На проде Node запускает не человек, а Phusion Passenger (через него Plesk
 * поднимает Node-приложения), и рабочий каталог задаёт он. Полагаться на
 * cwd там нельзя: при несовпадении сайт отдавал бы пустоту без внятной
 * ошибки в логе. В dev это корень проекта, в проде — каталог server.cjs.
 */
const APP_ROOT = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  // Ставим до создания приложения: падение на старте (например, недоступный
  // каталог данных) тоже должно дойти до Telegram, а не только в лог Plesk.
  installProcessAlerts();

  const app = express();
  // Пустая строка и «0» — разные вещи, поэтому проверяем именно наличие:
  // под Phusion Passenger порт назначает он сам, и штатное значение PORT — 0.
  // При записи `Number(...) || 3000` ноль откатился бы на 3000 и всё сломал.
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(express.json());

  // API routes start
  /*
   * Точка для внешнего монитора. Проверяет базу, а не только живость
   * процесса: без этого «200 OK» приходил бы и тогда, когда заявки уже
   * никуда не сохраняются, и монитор считал бы сайт здоровым.
   *
   * Падение сайта целиком ловится только отсюда, снаружи — изнутри мёртвый
   * процесс сообщить о себе не может.
   */
  app.get("/api/health", (req, res) => {
    try {
      checkDatabase();
      res.json({ status: "ok" });
    } catch (error) {
      reportError("health", error);
      res.status(503).json({ status: "error", error: "database_unavailable" });
    }
  });

  // Записи на приём как отдельной сущности у сайта нет: посетитель оставляет
  // заявку на обратный звонок, она уходит администраторам в Telegram.
  registerLeadRoutes(app);
  registerAdminRoutes(app);
  registerTelegramRoutes(app);
  // API routes end

  // Фото сотрудников ищем в двух местах, и порядок важен.
  // Сначала постоянный каталог (paths.ts): туда админка кладёт загруженные
  // снимки, и он переживает деплой, потому что лежит вне папки приложения.
  // Затем те, что приехали с репозиторием: прод-статика dist/ собирается один
  // раз при деплое и загруженных во время работы файлов не содержит.
  app.use("/images/staff", express.static(UPLOADS_STAFF_DIR));
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
    app.use(express.static(distPath, {
      redirect: false,
      setHeaders(res, filePath) {
        const normalized = filePath.replaceAll("\\", "/");
        if (normalized.includes("/assets/")) {
          // Vite includes a content hash in these names, so they never become
          // stale: a changed file receives a new URL on the next deployment.
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (/\.(?:avif|gif|jpe?g|png|svg|webp|woff2?)$/i.test(normalized)) {
          // Public media has stable names and can change between deployments,
          // therefore it gets a long but finite cache rather than immutable.
          res.setHeader("Cache-Control", "public, max-age=2592000");
        } else if (normalized.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }));
    app.get("*", (req, res) => {
      const cleanPath = req.path.replace(/^\/+|\/+$/g, "");
      const isAdminPath = /^(?:ru\/|en\/)?admin(?:\/|$)/.test(cleanPath);
      const localized = path.join(distPath, cleanPath, "index.html");
      const language = cleanPath.split("/")[0];
      const languageRoot = path.join(distPath, language, "index.html");

      res.setHeader("Cache-Control", "no-cache");
      if (!isAdminPath && existsSync(localized)) {
        return res.sendFile(localized);
      }
      if (!isAdminPath && (language === "ru" || language === "en") && existsSync(languageRoot)) {
        return res.sendFile(languageRoot);
      }
      return res.sendFile(path.join(distPath, "index.html"));
    });
  }

  /*
   * Последний рубеж: сюда попадает всё, что не поймали сами роуты.
   * Регистрируется после всех маршрутов — Express выбирает обработчик
   * ошибок по порядку и по четырём аргументам, поэтому `next` обязателен,
   * даже если не используется.
   */
  app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    reportError("express", err, { Маршрут: `${req.method} ${req.originalUrl}` });
    if (res.headersSent) return;
    res.status(500).json({ success: false, error: "internal_error" });
  });

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
