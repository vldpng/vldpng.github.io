/**
 * Загрузка .env и проверка обязательных переменных окружения.
 *
 * Импортируется ПЕРВЫМ в server.ts, и это принципиально: db.ts открывает
 * базу прямо на этапе импорта, поэтому проверка в теле startServer() до неё
 * не доживает — процесс падает раньше, при попытке создать storage/ в чужом
 * каталоге. Здесь же всё выполняется при загрузке модуля, до остальных.
 *
 * Почему эти три переменные обязательны на проде: без ADMIN_LOGIN и
 * ADMIN_PASSWORD админка пускает по admin/admin (см. auth.ts), а без DB_DIR
 * база создаётся относительно рабочего каталога — а его на проде задаёт
 * Passenger, не мы. Оба отказа тихие: сайт выглядит рабочим, пока не
 * выяснится, что заявок нет или что в панель может зайти кто угодно.
 */
import 'dotenv/config';

const REQUIRED_IN_PRODUCTION = ['ADMIN_LOGIN', 'ADMIN_PASSWORD', 'DB_DIR'];

if (process.env.NODE_ENV === 'production') {
  const missing = REQUIRED_IN_PRODUCTION.filter((name) => !process.env[name]);
  if (missing.length) {
    // Строкой, а не исключением: в браузере логов Plesk читать будут именно
    // её, и «что задать» должно быть видно без разбора стека.
    console.error(
      `Не заданы обязательные переменные окружения: ${missing.join(', ')}.\n` +
        'Задайте их в Plesk → Websites & Domains → Node.js → Custom environment variables.',
    );
    process.exit(1);
  }
}
