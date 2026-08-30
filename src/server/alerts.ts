/**
 * Технические уведомления о сбоях в Telegram.
 *
 * Отдельно от уведомлений о заявках и, по возможности, в отдельный чат
 * (TELEGRAM_ALERT_CHAT_ID): технический шум не должен перемешиваться с
 * обращениями пациентов, иначе администраторы начнут пролистывать и то и
 * другое. Если переменная не задана, алерты только пишутся в лог — как и
 * заявки без TELEGRAM_CHAT_ID.
 *
 * ВАЖНО, ЧТО ЭТОТ МОДУЛЬ НЕ УМЕЕТ: сообщить, что приложение упало. Если
 * процесс мёртв или сервер недоступен, отсюда не выполнится ничего. Падение
 * сайта ловится только снаружи — внешним монитором, который дёргает
 * /api/health. Здесь — ошибки живого приложения.
 */
import { rigaTimestamp, sendTelegramAlert } from './telegram';

/** Одна и та же ошибка повторно уходит в чат не чаще этого интервала. */
const REPEAT_COOLDOWN_MS = 15 * 60 * 1000;
/** Потолок на час: защищает группу от флуда, а бота — от лимитов Telegram. */
const MAX_ALERTS_PER_HOUR = 12;
const HOUR_MS = 60 * 60 * 1000;

const lastSentAt = new Map<string, number>();
let windowStartedAt = Date.now();
let sentInWindow = 0;
let suppressed = 0;

/**
 * Сигнатура ошибки: по ней склеиваются повторы. Цифры выкидываем, иначе
 * id заявки или номер порта в тексте сделают каждое повторение уникальным
 * и кулдаун не сработает ни разу.
 */
function signature(scope: string, message: string): string {
  return `${scope}:${message.replace(/\d+/g, '#').slice(0, 200)}`;
}

function allow(key: string): { send: boolean; skippedSinceLast: number } {
  const now = Date.now();

  if (now - windowStartedAt > HOUR_MS) {
    windowStartedAt = now;
    sentInWindow = 0;
    suppressed = 0;
  }

  const previous = lastSentAt.get(key);
  if (previous !== undefined && now - previous < REPEAT_COOLDOWN_MS) {
    suppressed += 1;
    return { send: false, skippedSinceLast: suppressed };
  }

  if (sentInWindow >= MAX_ALERTS_PER_HOUR) {
    suppressed += 1;
    return { send: false, skippedSinceLast: suppressed };
  }

  lastSentAt.set(key, now);
  sentInWindow += 1;
  const skipped = suppressed;
  suppressed = 0;
  return { send: true, skippedSinceLast: skipped };
}

function describe(error: unknown): { message: string; stack?: string } {
  if (error instanceof Error) {
    return { message: error.message || error.name, stack: error.stack };
  }
  return { message: String(error) };
}

/**
 * Отправляет уведомление о сбое. Ничего не бросает и не ждёт доставки:
 * вызывается из обработчиков ошибок, и падение здесь означало бы потерю
 * исходной ошибки — той, ради которой всё и затевалось.
 */
export function reportError(scope: string, error: unknown, context?: Record<string, string>): void {
  const { message, stack } = describe(error);
  const key = signature(scope, message);
  const { send, skippedSinceLast } = allow(key);

  // В лог пишем всегда: он остаётся единственным источником правды, когда
  // алерты придушены троттлингом или Telegram недоступен.
  console.error(`[alert:${scope}]`, message, context ?? '');

  if (!send) return;

  const lines = [
    `⚠️ <b>Сбой на сайте</b>`,
    ``,
    `<b>Где:</b> ${scope}`,
    `<b>Когда:</b> ${rigaTimestamp()}`,
    `<b>Ошибка:</b> ${message.slice(0, 300)}`,
  ];

  for (const [label, value] of Object.entries(context ?? {})) {
    if (value) lines.push(`<b>${label}:</b> ${value.slice(0, 200)}`);
  }

  if (skippedSinceLast > 0) {
    lines.push(``, `<i>Похожих сбоев с прошлого сообщения: ${skippedSinceLast}</i>`);
  }

  if (stack) {
    const trimmed = stack.split('\n').slice(0, 6).join('\n');
    lines.push(``, `<pre>${trimmed.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>`);
  }

  void sendTelegramAlert(lines.join('\n'));
}

/**
 * Обработчики уровня процесса.
 *
 * После uncaughtException состояние процесса не определено: продолжать
 * работу нельзя, потому что часть данных может быть уже испорчена. Поэтому
 * сообщаем и выходим — Passenger поднимет приложение заново. Небольшая
 * задержка перед выходом даёт запросу к Telegram шанс уйти.
 */
export function installProcessAlerts(): void {
  process.on('unhandledRejection', (reason) => {
    reportError('unhandledRejection', reason);
  });

  process.on('uncaughtException', (error) => {
    reportError('uncaughtException', error, { Действие: 'процесс будет перезапущен' });
    setTimeout(() => process.exit(1), 2000).unref();
  });
}
