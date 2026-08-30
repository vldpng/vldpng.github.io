/**
 * Дозаполнение языковых версий врачей в уже работающей базе.
 *
 * Зачем отдельный скрипт, а не reset-doctors: тот очищает таблицу и заливает
 * её из data/doctors.ts заново, теряя всё, что правили через панель. На живой
 * базе это означает удаление заведённых там сотрудников и откат изменённых
 * слагов — то есть битые адреса страниц врачей.
 *
 * Здесь записи обновляются на месте: берём nameLatin и translations из
 * статического списка и дописываем их врачу с тем же именем. Всё остальное —
 * слаг, фото, сертификаты, кейсы, порядок и видимость — остаётся как в базе.
 *
 * Сопоставляем по русскому имени, а не по слагу: слаг администратор может
 * поменять, имя — нет (оно же выводится на сайте).
 *
 * Скрипт идемпотентен: заполняются только пустые поля, уже введённый в панели
 * перевод не затирается. Врачи, которых нет в data/doctors.ts, пропускаются —
 * переводы для них вносит клиника через панель.
 */
import { DatabaseSync } from 'node:sqlite';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { doctorsData, type Doctor } from '../src/data/doctors';

const storageDir = process.env.DB_DIR
  ? process.env.DB_DIR
  : join(dirname(fileURLToPath(import.meta.url)), '..', 'storage');

const db = new DatabaseSync(join(storageDir, 'royaldent.db'));
const rows = db
  .prepare('SELECT id, data, visible, position FROM doctors ORDER BY position')
  .all() as Array<{ id: string; data: string; visible: number; position: number }>;

const backup = join(storageDir, `doctors-backup-${Date.now()}.json`);
writeFileSync(backup, JSON.stringify(rows, null, 2), 'utf8');

const byName = new Map(doctorsData.map((d) => [d.name.trim(), d]));
const update = db.prepare('UPDATE doctors SET data = ? WHERE id = ?');

const filled: string[] = [];
const already: string[] = [];
const skipped: string[] = [];

for (const row of rows) {
  const doctor = JSON.parse(row.data) as Doctor;
  const source = byName.get(doctor.name.trim());

  if (!source) {
    skipped.push(doctor.name);
    continue;
  }

  const next: Doctor = { ...doctor };
  let changed = false;

  if (!next.nameLatin?.trim() && source.nameLatin) {
    next.nameLatin = source.nameLatin;
    changed = true;
  }

  for (const lang of ['en', 'lv'] as const) {
    const existing = next.translations?.[lang];
    const incoming = source.translations?.[lang];
    // Непустым считаем перевод, у которого заполнена специальность или
    // описание: пустой объект панель сохраняет и в отсутствие текста.
    const hasText = Boolean(existing?.specialty?.trim() || existing?.bio?.trim());
    if (!hasText && incoming) {
      next.translations = { ...next.translations, [lang]: incoming };
      changed = true;
    }
  }

  if (!changed) {
    already.push(doctor.name);
    continue;
  }

  update.run(JSON.stringify(next), row.id);
  filled.push(doctor.name);
}

console.log(`backfill-doctor-translations: записей в базе ${rows.length}`);
console.log(`  дозаполнено: ${filled.length}${filled.length ? ' — ' + filled.join(', ') : ''}`);
if (already.length) console.log(`  уже заполнены: ${already.length} — ${already.join(', ')}`);
if (skipped.length) {
  console.log(
    `  нет в data/doctors.ts, пропущены: ${skipped.join(', ')}\n` +
      '    переводы для них нужно внести через панель администратора.',
  );
}
console.log(`  прежнее содержимое сохранено в ${backup}`);
