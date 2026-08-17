/**
 * Заявки с сайта → база данных + уведомление в Telegram.
 *
 * Два источника:
 *   /api/leads/callback — короткая форма «обратный звонок» (имя + телефон)
 *   /api/leads/contact  — модалка записи (имя, фамилия, email, телефон, сообщение)
 *
 * Источник правды — таблица leads в SQLite: её показывает панель
 * администратора. Telegram — уведомление поверх: если он недоступен, заявка
 * всё равно сохранена, поэтому посетителю честно отвечаем успехом. Ошибкой
 * отвечаем только если не удалась сама запись в базу.
 */
import type { Express, Request, Response } from "express";
import { insertLead } from "./db";
import { escapeHtml, isTelegramConfigured, monoTable, rigaTimestamp, sendTelegramMessage } from "./telegram";

export interface Lead {
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  /** Человекочитаемое название формы — по нему видно, откуда пришёл клиент. */
  source: string;
  /** Путь страницы, с которой отправлена заявка. */
  page: string;
}

// Формы публичные: обрезаем длину, иначе в чат улетит «простыня».
const clean = (value: unknown, max = 100): string => String(value ?? "").trim().slice(0, max);

// ---------------------------------------------------------------------------
// Простейшая защита от спама
// ---------------------------------------------------------------------------

// Одна заявка с адреса в минуту: живому человеку хватает, скрипту — нет.
const COOLDOWN_MS = 60_000;
const lastLeadByIp = new Map<string, number>();

function clientIp(req: Request): string {
  // За реверс-прокси (GarmTech) настоящий адрес приходит в X-Forwarded-For.
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return (first ?? req.ip ?? "unknown").trim();
}

/**
 * Ключ включает форму, а не только адрес: человек может заказать звонок,
 * а через полминуты передумать и записаться через модалку — блокировать
 * его во второй форме нельзя.
 */
function isRateLimited(ip: string, source: string): boolean {
  const now = Date.now();
  const key = `${ip}|${source}`;
  // Попутно чистим карту, иначе она растёт на каждый новый адрес.
  for (const [k, ts] of lastLeadByIp) {
    if (now - ts > COOLDOWN_MS) lastLeadByIp.delete(k);
  }
  if (now - (lastLeadByIp.get(key) ?? 0) < COOLDOWN_MS) return true;
  lastLeadByIp.set(key, now);
  return false;
}

// ---------------------------------------------------------------------------
// Сообщение
// ---------------------------------------------------------------------------

export function buildMessage(lead: Lead): string {
  const table = monoTable([
    ["Имя", lead.name],
    ["Фамилия", lead.surname],
    ["Телефон", lead.phone],
    ["Email", lead.email],
  ]);

  const parts = [`📞 <b>Новая заявка с сайта</b>`, table];

  if (lead.message) {
    // Цитатой, чтобы длинный текст клиента визуально отделялся от полей.
    parts.push(`<b>Сообщение:</b>\n<blockquote>${escapeHtml(lead.message)}</blockquote>`);
  }

  const origin = [lead.source, lead.page].filter(Boolean).join(" · ");
  parts.push(`<b>Откуда:</b> ${escapeHtml(origin)}\n<b>Время:</b> ${rigaTimestamp()}`);

  // Номер отдельной строкой и обычным текстом: внутри <pre> Telegram ссылки не
  // распознаёт, а здесь сам сделает его кликабельным — тап открывает звонилку.
  parts.push(`Позвонить: ${escapeHtml(lead.phone)}`);

  return parts.filter(Boolean).join("\n\n");
}

// ---------------------------------------------------------------------------
// Общий обработчик
// ---------------------------------------------------------------------------

async function handleLead(req: Request, res: Response, source: string, requireEmail: boolean) {
  const body = req.body ?? {};
  const lead: Lead = {
    name: clean(body.name),
    surname: clean(body.surname),
    email: clean(body.email),
    phone: clean(body.phone, 30),
    message: clean(body.message, 2000),
    source,
    page: clean(body.page, 200),
  };

  if (!lead.name || !lead.phone || (requireEmail && !lead.email)) {
    return res.status(400).json({ success: false, error: "missing_required_fields" });
  }

  const ip = clientIp(req);
  if (isRateLimited(ip, source)) {
    return res.status(429).json({ success: false, error: "too_many_requests" });
  }

  // Сначала база: заявка не должна зависеть от доступности Telegram.
  try {
    insertLead({ ...lead, ip });
  } catch (e) {
    console.error("[lead] запись в БД не удалась:", e);
    return res.status(500).json({ success: false, error: "storage_failed" });
  }

  // Уведомление — вдогонку и без await: посетитель не ждёт Telegram,
  // а неудачная доставка уже не теряет заявку — она в базе и в админке.
  if (isTelegramConfigured()) {
    void sendTelegramMessage(buildMessage(lead)).then((delivered) => {
      if (!delivered) console.warn(`[lead:${source}] заявка в БД, но Telegram не доставлен`);
    });
  } else {
    console.log(`[lead:${source}] ${lead.name} ${lead.surname} — ${lead.phone}`);
  }

  res.json({ success: true });
}

export function registerLeadRoutes(app: Express) {
  app.post("/api/leads/callback", (req, res) => handleLead(req, res, "Форма обратного звонка", false));
  app.post("/api/leads/contact", (req, res) => handleLead(req, res, "Модалка записи", true));
}
