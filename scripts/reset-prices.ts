/**
 * Перезаливка прайса в базу из статического каталога data/prices.ts.
 *
 * Сервер наполняет price_categories только когда таблица пуста — иначе
 * удалённая через админку позиция воскресала бы на каждом старте. Плата
 * за это: правка data/prices.ts на уже работающей базе не видна на сайте,
 * потому что /api/prices отдаёт содержимое таблицы.
 *
 * Этот скрипт закрывает такой случай: таблица очищается и заполняется
 * каталогом заново. Всё, что было отредактировано в панели администратора,
 * при этом теряется — запускать осознанно, после правки data/prices.ts.
 */
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { priceCategories } from '../src/data/prices';

const dbPath =
  process.env.DB_DIR
    ? join(process.env.DB_DIR, 'royaldent.db')
    : join(dirname(fileURLToPath(import.meta.url)), '..', 'storage', 'royaldent.db');

const db = new DatabaseSync(dbPath);
db.exec('DELETE FROM price_categories');

const ins = db.prepare('INSERT INTO price_categories (id, data, position) VALUES (?, ?, ?)');
priceCategories.forEach((cat, i) => ins.run(`cat-${i}`, JSON.stringify(cat), i));

const items = priceCategories.reduce((n, cat) => n + cat.items.length, 0);
console.log(`reset-prices: категорий ${priceCategories.length}, позиций ${items}`);
