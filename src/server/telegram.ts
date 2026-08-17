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

// Читаем конфиг лениво: dotenv загружается уже после импорта модуля.
function getConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  return { token, chatId, enabled: Boolean(token && chatId) };
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

async function callTelegram(token: string, payload: Record<string, unknown>) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Посетитель ждёт ответа формы — не висим на недоступном API дольше 8 секунд.
    signal: AbortSignal.timeout(8000),
  });
  const data: any = await res.json().catch(() => ({}));
  return { ok: res.ok && data?.ok === true, status: res.status, description: data?.description as string | undefined };
}

/**
 * Отправляет сообщение в чат. Возвращает true только при подтверждённой
 * доставке — вызывающий код по этому флагу решает, показывать ли посетителю
 * «спасибо» или просьбу позвонить.
 */
export async function sendTelegramMessage(html: string): Promise<boolean> {
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

  try {
    const result = await callTelegram(token, payload);

    if (!result.ok) {
      // description от Telegram сильно помогает: "chat not found", "bot was kicked" и т.п.
      console.error(`[telegram] sendMessage failed: ${result.status} ${result.description ?? ""}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[telegram] sendMessage error:", e);
    return false;
  }
}
