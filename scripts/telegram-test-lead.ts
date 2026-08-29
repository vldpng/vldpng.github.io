/**
 * Отправляет тестовую заявку — проверка настройки целиком:
 * токен, chat_id, права бота, вёрстка сообщения.
 *
 *   npm run telegram:test
 *
 * Если TELEGRAM_CHAT_ID ещё не заполнен, скрипт ничего не отправляет,
 * а просто печатает готовую разметку сообщения.
 */
import "dotenv/config";
import { buildMessage, type Lead } from "../src/server/leads";
import { isTelegramConfigured, sendTelegramMessage } from "../src/server/telegram";

const lead: Lead = {
  name: "Иван",
  surname: "Петров",
  email: "ivan.petrov@example.com",
  phone: "+371 20 123 456",
  message: "Здравствуйте! Интересует имплантация, беспокоит зуб слева снизу. Когда можно подойти?",
  source: "ТЕСТ — модалка записи",
  page: "/services/implantacija",
  // Заполнены, чтобы в тестовом сообщении было видно и строки калькулятора.
  age: "42",
  atrophy: "Незначительная",
};

const html = buildMessage(lead);

if (!isTelegramConfigured()) {
  console.log("TELEGRAM_CHAT_ID не заполнен — показываю разметку без отправки:\n");
  console.log(html);
  process.exit(0);
}

const delivered = await sendTelegramMessage(html);
console.log(delivered ? "Отправлено — проверьте группу." : "Не отправлено, причина выше в логе.");
process.exit(delivered ? 0 : 1);
