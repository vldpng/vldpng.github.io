/**
 * Перезаливка врачей в базу из статического списка data/doctors.ts.
 *
 * Сервер наполняет таблицу doctors только когда она пуста — иначе удалённый
 * через админку сотрудник воскресал бы на каждом старте. Плата за это:
 * правка data/doctors.ts на уже работающей базе на сайте не видна, потому
 * что /api/doctors отдаёт содержимое таблицы.
 *
 * Этот скрипт закрывает такой случай: таблица очищается и заполняется списком
 * заново. Всё, что было отредактировано в панели администратора, при этом
 * теряется — включая порядок карточек и скрытых сотрудников. Запускать
 * осознанно, после правки data/doctors.ts.
 *
 * Перед очисткой прежнее содержимое выгружается в storage/doctors-backup-*.json,
 * чтобы случайный запуск не оказался необратимым: в отличие от прайса, здесь
 * в записи может лежать загруженное через панель фото.
 */
import { DatabaseSync } from 'node:sqlite';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { doctorsData } from '../src/data/doctors';

const storageDir = process.env.DB_DIR
  ? process.env.DB_DIR
  : join(dirname(fileURLToPath(import.meta.url)), '..', 'storage');

const db = new DatabaseSync(join(storageDir, 'royaldent.db'));

const previous = db.prepare('SELECT id, data, visible, position FROM doctors ORDER BY position').all();
const backup = join(storageDir, `doctors-backup-${Date.now()}.json`);
writeFileSync(backup, JSON.stringify(previous, null, 2), 'utf8');

db.exec('DELETE FROM doctors');

const ins = db.prepare('INSERT INTO doctors (id, data, visible, position) VALUES (?, ?, 1, ?)');
doctorsData.forEach((doc, i) => ins.run(doc.id, JSON.stringify(doc), i));

const certificates = doctorsData.reduce((n, d) => n + (d.certificates?.length ?? 0), 0);
const cases = doctorsData.reduce((n, d) => n + (d.cases?.length ?? 0), 0);
console.log(
  `reset-doctors: врачей ${doctorsData.length}, сертификатов ${certificates}, кейсов ${cases}\n` +
    `прежнее содержимое (${previous.length} записей) сохранено в ${backup}`,
);
