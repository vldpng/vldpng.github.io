/**
 * Telegram-уведомления о заявках с сайта.
 *
 * Токен обязан оставаться на сервере — с ним можно читать и писать от имени
 * бота, поэтому в браузер он не попадает никогда.
 *   TELEGRAM_BOT_TOKEN — токен из @BotFather
 *   TELEGRAM_CHAT_ID   — id группы администраторов (отрицательное число)
 *
 * Пока переменные не заданы, отправка выключена и вызывающий код работает
 * в прежнем режиме «просто залогировать» — так локальная разработка не
 * требует настоящего бота.
 */
import { createHash, timingSafeEqual } from "node:crypto";
import type { Express, Request } from "express";
import { markLeadCalled, setLeadTelegramMessage } from "./db";

// Читаем конфиг лениво: dotenv загружается уже после импорта модуля.
function getConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  return { token, chatId, webhookSecret, enabled: Boolean(token && chatId) };
}

export function isTelegramConfigured(): boolean {
  return getConfig().enabled;
}

/** Экранирует то, что пришло из формы: имя вида `<b>` не должно ломать разметку. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Время заявки в часовом поясе клиники, а не сервера. */
export function rigaTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Riga",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Моноширинная «таблица».
 *
 * Настоящих таблиц в Bot API нет: тег <table> Telegram отклоняет с ошибкой
 * «Unsupported start tag». Единственный способ получить выровненные колонки —
 * блок <pre>, где ширина символа фиксирована. Бонусом Telegram показывает
 * у такого блока кнопку копирования.
 *
 * Пустые значения выбрасываем: у формы обратного звонка нет ни email,
 * ни фамилии, и пустые строки в таблице выглядели бы как потерянные данные.
 */
export function monoTable(rows: Array<[label: string, value: string]>): string {
  const filled = rows.filter(([, value]) => value.trim().length > 0);
  if (filled.length === 0) return "";
  const width = Math.max(...filled.map(([label]) => label.length));
  const body = filled.map(([label, value]) => `${label.padEnd(width)}   ${value}`).join("\n");
  return `<pre>${escapeHtml(body)}</pre>`;
}

async function callTelegram(token: string, method: string, payload: Record<string, unknown>) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Посетитель ждёт ответа формы — не висим на недоступном API дольше 8 секунд.
      signal: AbortSignal.timeout(8000),
    });
    const data: any = await res.json().catch(() => ({}));
    return {
      ok: res.ok && data?.ok === true,
      status: res.status,
      description: data?.description as string | undefined,
      result: data?.result as any,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      description: error instanceof Error ? error.message : String(error),
      result: undefined,
    };
  }
}

/**
 * Отправляет сообщение в чат. Возвращает true только при подтверждённой
 * доставке — вызывающий код по этому флагу решает, показывать ли посетителю
 * «спасибо» или просьбу позвонить.
 */
export async function sendTelegramMessage(html: string, leadId?: number): Promise<boolean> {
  const { token, chatId, enabled } = getConfig();
  if (!enabled || !token) return false;

  // Кнопки «Позвонить» здесь нет намеренно. Схема tel: в inline-кнопках
  // не поддерживается — Telegram отвечает:
  //   inline keyboard button URL 'tel:+37120123456' is invalid:
  //   Wrong port number specified in the URL
  // Двоеточие перед номером он разбирает как порт. Вместо кнопки номер идёт
  // в тексте обычной строкой: клиенты Telegram сами делают его кликабельным,
  // и тап открывает звонилку.
  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text: html,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };
  if (leadId !== undefined) {
    payload.reply_markup = {
      inline_keyboard: [
        [{ text: "✅ Пациенту перезвонили", callback_data: `lead_called:${leadId}` }],
      ],
    };
  }

  try {
    const result = await callTelegram(token, "sendMessage", payload);

    if (!result.ok) {
      // description от Telegram сильно помогает: "chat not found", "bot was kicked" и т.п.
      console.error(`[telegram] sendMessage failed: ${result.status} ${result.description ?? ""}`);
      return false;
    }
    if (leadId !== undefined && result.result?.message_id !== undefined) {
      setLeadTelegramMessage(
        leadId,
        String(result.result.chat?.id ?? chatId),
        String(result.result.message_id),
        html,
      );
    }
    return true;
  } catch (e) {
    console.error("[telegram] sendMessage error:", e);
    return false;
  }
}

type TelegramCallback = {
  id?: string;
  data?: string;
  from?: { id?: number; first_name?: string; last_name?: string; username?: string };
  message?: { message_id?: number; text?: string; chat?: { id?: number } };
};

function sameSecret(actual: string, expected: string): boolean {
  const a = createHash("sha256").update(actual).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function adminDisplayName(from: TelegramCallback["from"]): string {
  const fullName = [from?.first_name, from?.last_name].filter(Boolean).join(" ").trim();
  return fullName || (from?.username ? `@${from.username}` : `Telegram ID ${from?.id ?? "unknown"}`);
}

async function answerCallback(token: string, id: string | undefined, text: string): Promise<void> {
  if (!id) return;
  const result = await callTelegram(token, "answerCallbackQuery", {
    callback_query_id: id,
    text,
  });
  if (!result.ok) {
    console.error(`[telegram] answerCallbackQuery failed: ${result.status} ${result.description ?? ""}`);
  }
}

/**
 * Telegram присылает сюда нажатия на inline-кнопку. Endpoint начинает
 * работать только после явного setWebhook на публичный HTTPS-адрес сайта.
 */
export function registerTelegramRoutes(app: Express): void {
  app.post("/api/telegram/webhook", async (req: Request, res) => {
    const { token, webhookSecret } = getConfig();
    if (!token || !webhookSecret) {
      return res.status(503).json({ ok: false, error: "telegram_webhook_not_configured" });
    }

    const providedSecret = String(req.headers["x-telegram-bot-api-secret-token"] ?? "");
    if (!providedSecret || !sameSecret(providedSecret, webhookSecret)) {
      return res.status(401).json({ ok: false });
    }

    // Сразу подтверждаем доставку update: дальнейший Bot API вызов может
    // занять несколько секунд, а повторная доставка дала бы лишние клики.
    res.json({ ok: true });

    const callback = (req.body?.callback_query ?? null) as TelegramCallback | null;
    const match = callback?.data?.match(/^lead_called:(\d+)$/);
    if (!callback || !match) return;

    const leadId = Number(match[1]);
    const name = adminDisplayName(callback.from);
    const marked = markLeadCalled(leadId, {
      id: String(callback.from?.id ?? ""),
      name,
    });

    if (!marked.lead) {
      await answerCallback(token, callback.id, "Заявка не найдена");
      return;
    }

    const lead = marked.lead;
    const originalHtml =
      lead.telegram_html || escapeHtml(String(callback.message?.text ?? "Новая заявка с сайта"));
    const statusHtml = [
      "✅ <b>Пациенту уже перезвонили</b>",
      `<b>Администратор:</b> ${escapeHtml(lead.called_by_name)}`,
      `<b>Отмечено:</b> ${rigaTimestamp(new Date(lead.called_at))}`,
    ].join("\n");

    const chatId = lead.telegram_chat_id || String(callback.message?.chat?.id ?? "");
    const messageId = lead.telegram_message_id || String(callback.message?.message_id ?? "");
    const edited = await callTelegram(token, "editMessageText", {
      chat_id: chatId,
      message_id: Number(messageId),
      text: `${originalHtml}\n\n${statusHtml}`,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: { inline_keyboard: [] },
    });

    if (!edited.ok && edited.description !== "Bad Request: message is not modified") {
      console.error(`[telegram] editMessageText failed: ${edited.status} ${edited.description ?? ""}`);
      await answerCallback(token, callback.id, "Статус сохранён, но сообщение не обновилось");
      return;
    }

    await answerCallback(
      token,
      callback.id,
      marked.state === "updated"
        ? "Отмечено: пациенту перезвонили"
        : `Уже отмечено: ${lead.called_by_name}`,
    );
  });
}
