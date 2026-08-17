/**
 * Разовый помощник: показывает chat_id всех чатов, где бот видел сообщения.
 *
 *   1. Прописать TELEGRAM_BOT_TOKEN в .env
 *   2. Добавить бота в группу и сделать администратором
 *   3. Написать в группе /start@имя_бота
 *   4. npm run telegram:chat-id
 *
 * Токен не печатается — в консоль уходят только id и названия чатов.
 */
import "dotenv/config";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("TELEGRAM_BOT_TOKEN не задан в .env");
  process.exit(1);
}

// Заодно проверяем сам токен и показываем @username — он нужен, чтобы
// правильно написать /start@имя_бота в группе.
const meRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
const me: any = await meRes.json();
if (!me?.ok) {
  console.error(`Токен не принят Telegram: ${me?.description ?? meRes.status}`);
  process.exit(1);
}
console.log(`Бот: ${me.result.first_name} (@${me.result.username})\n`);

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data: any = await res.json();

if (!data?.ok) {
  console.error(`Telegram ответил ошибкой: ${data?.description ?? res.status}`);
  process.exit(1);
}

const chats = new Map<number, string>();
for (const update of data.result ?? []) {
  const chat = update.message?.chat ?? update.my_chat_member?.chat ?? update.channel_post?.chat;
  if (chat) chats.set(chat.id, `${chat.type}: ${chat.title ?? chat.username ?? chat.first_name ?? ""}`);
}

if (chats.size === 0) {
  console.log(
    "Чатов не найдено. Проверьте, что бот добавлен в группу, назначен администратором\n" +
      "и что после этого в группе было отправлено сообщение (например /start@имя_бота).\n" +
      "Учтите: getUpdates отдаёт только события за последние 24 часа.",
  );
} else {
  console.log("Найденные чаты (нужный id скопируйте в TELEGRAM_CHAT_ID):\n");
  for (const [id, label] of chats) console.log(`  ${id}\t${label}`);
}
