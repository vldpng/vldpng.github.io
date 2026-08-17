/**
 * База данных приложения — SQLite через встроенный node:sqlite.
 *
 * Почему не better-sqlite3/Prisma: node:sqlite не тянет нативных модулей,
 * а значит на хостинге GarmTech ничего не придётся пересобирать под их
 * платформу — работает везде, где есть Node ≥ 22.13. База — один файл
 * в storage/ (каталог в .gitignore), бэкап = копия файла.
 *
 * Здесь же схема и все запросы: остальной сервер знает только функции,
 * а не SQL — при переезде на другую СУБД менять придётся один файл.
 */
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { doctorsData, type Doctor } from '../data/doctors';

const DB_DIR = process.env.DB_DIR || path.join(process.cwd(), 'storage');
mkdirSync(DB_DIR, { recursive: true });

const db = new DatabaseSync(path.join(DB_DIR, 'royaldent.db'));

// WAL: читатели не блокируют писателя — заявка с сайта не будет ждать,
// пока администратор листает таблицу.
db.exec('PRAGMA journal_mode = WAL;');

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    surname    TEXT NOT NULL DEFAULT '',
    email      TEXT NOT NULL DEFAULT '',
    phone      TEXT NOT NULL,
    message    TEXT NOT NULL DEFAULT '',
    source     TEXT NOT NULL DEFAULT '',
    page       TEXT NOT NULL DEFAULT '',
    ip         TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS doctors (
    id       TEXT PRIMARY KEY,
    data     TEXT NOT NULL,              -- Doctor целиком, JSON
    visible  INTEGER NOT NULL DEFAULT 1, -- 0 = скрыт со страницы врачей
    position INTEGER NOT NULL DEFAULT 0  -- порядок в списке
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL          -- unix ms; живут в БД, чтобы
  );                                     -- рестарт сервера не разлогинивал
`);

// Первый запуск: наполняем врачей из статического файла. Только когда таблица
// пуста — иначе удалённый через админку врач воскресал бы на каждом старте.
const doctorCount = (db.prepare('SELECT COUNT(*) AS c FROM doctors').get() as { c: number }).c;
if (doctorCount === 0) {
  const ins = db.prepare('INSERT INTO doctors (id, data, visible, position) VALUES (?, ?, 1, ?)');
  doctorsData.forEach((doc, i) => ins.run(doc.id, JSON.stringify(doc), i));
}

// ---------------------------------------------------------------------------
// Заявки
// ---------------------------------------------------------------------------

export interface LeadRow {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  page: string;
  ip: string;
  created_at: string;
}

export function insertLead(lead: Omit<LeadRow, 'id' | 'created_at'>): number {
  const res = db
    .prepare(
      `INSERT INTO leads (name, surname, email, phone, message, source, page, ip, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      lead.name,
      lead.surname,
      lead.email,
      lead.phone,
      lead.message,
      lead.source,
      lead.page,
      lead.ip,
      new Date().toISOString(),
    );
  return Number(res.lastInsertRowid);
}

/**
 * Страница заявок с поиском.
 *
 * Раньше отдавали таблицу целиком. На замере 50 000 заявок это 23 МБ JSON
 * в браузер и повисшая страница — сама база при этом отвечала за 164 мс,
 * то есть узким местом была передача и отрисовка, а не запрос.
 *
 * Поиск идёт по имени, фамилии, телефону и почте. Для телефона отдельно
 * сравниваем «голые» цифры: в базе номер записан как «+371 20 111 222»,
 * а администратор ищет по «20111222» или по куску из середины.
 */
export function listLeadsPage(opts: { limit: number; offset: number; search: string }): {
  rows: LeadRow[];
  total: number;
} {
  const { limit, offset, search } = opts;

  let where = '';
  let params: string[] = [];
  if (search) {
    const like = `%${search}%`;
    const digits = search.replace(/\D/g, '');
    // Сравнение по «голым» цифрам включаем, только если запрос и правда похож
    // на номер: одни цифры и телефонные символы, минимум три цифры. Иначе
    // «patient7@» дало бы поиск по цифре «7», а она есть почти в каждом
    // номере — в выдачу попадала вся таблица.
    const looksLikePhone = /^[\d\s+()-]+$/.test(search) && digits.length >= 3;
    where =
      `WHERE name LIKE ? OR surname LIKE ? OR email LIKE ? OR phone LIKE ?` +
      (looksLikePhone ? ` OR REPLACE(REPLACE(phone, ' ', ''), '-', '') LIKE ?` : '');
    params = looksLikePhone
      ? [like, like, like, like, `%${digits}%`]
      : [like, like, like, like];
  }

  const total = (
    db.prepare(`SELECT COUNT(*) AS c FROM leads ${where}`).get(...params) as { c: number }
  ).c;

  const rows = db
    .prepare(`SELECT * FROM leads ${where} ORDER BY id DESC LIMIT ? OFFSET ?`)
    .all(...params, limit, offset) as unknown as LeadRow[];

  return { rows, total };
}

// ---------------------------------------------------------------------------
// Врачи
// ---------------------------------------------------------------------------

export interface DoctorRecord extends Doctor {
  visible: boolean;
}

function rowToDoctor(row: { data: string; visible: number }): DoctorRecord {
  return { ...(JSON.parse(row.data) as Doctor), visible: row.visible === 1 };
}

export function listDoctors(onlyVisible: boolean): DoctorRecord[] {
  const sql = onlyVisible
    ? 'SELECT data, visible FROM doctors WHERE visible = 1 ORDER BY position'
    : 'SELECT data, visible FROM doctors ORDER BY position';
  return (db.prepare(sql).all() as unknown as Array<{ data: string; visible: number }>).map(
    rowToDoctor,
  );
}

export function getDoctor(id: string): DoctorRecord | null {
  const row = db.prepare('SELECT data, visible FROM doctors WHERE id = ?').get(id) as
    | { data: string; visible: number }
    | undefined;
  return row ? rowToDoctor(row) : null;
}

export function createDoctor(doc: Doctor): void {
  const pos = (db.prepare('SELECT COALESCE(MAX(position), -1) + 1 AS p FROM doctors').get() as {
    p: number;
  }).p;
  db.prepare('INSERT INTO doctors (id, data, visible, position) VALUES (?, ?, 1, ?)').run(
    doc.id,
    JSON.stringify(doc),
    pos,
  );
}

export function updateDoctor(id: string, doc: Doctor): boolean {
  const res = db.prepare('UPDATE doctors SET data = ? WHERE id = ?').run(JSON.stringify(doc), id);
  return res.changes > 0;
}

export function setDoctorVisibility(id: string, visible: boolean): boolean {
  const res = db.prepare('UPDATE doctors SET visible = ? WHERE id = ?').run(visible ? 1 : 0, id);
  return res.changes > 0;
}

export function deleteDoctor(id: string): boolean {
  return db.prepare('DELETE FROM doctors WHERE id = ?').run(id).changes > 0;
}

/**
 * Переставляет врачей: позиция = место в переданном списке.
 *
 * Транзакцией, потому что порядок обязан примениться целиком — сбой на
 * середине оставил бы список наполовину перемешанным, и на сайте врачи
 * выстроились бы в случайном порядке.
 */
export function reorderDoctors(ids: string[]): void {
  const upd = db.prepare('UPDATE doctors SET position = ? WHERE id = ?');
  db.exec('BEGIN');
  try {
    ids.forEach((id, i) => upd.run(i, id));
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
}

// ---------------------------------------------------------------------------
// Сессии администратора
// ---------------------------------------------------------------------------

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // неделя

export function createSession(token: string): void {
  // Заодно чистим протухшие: отдельного планировщика для этого не нужно.
  db.prepare('DELETE FROM sessions WHERE created_at < ?').run(Date.now() - SESSION_TTL_MS);
  db.prepare('INSERT INTO sessions (token, created_at) VALUES (?, ?)').run(token, Date.now());
}

export function isSessionValid(token: string): boolean {
  const row = db.prepare('SELECT created_at FROM sessions WHERE token = ?').get(token) as
    | { created_at: number }
    | undefined;
  return row !== undefined && Date.now() - row.created_at < SESSION_TTL_MS;
}

export function deleteSession(token: string): void {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}
