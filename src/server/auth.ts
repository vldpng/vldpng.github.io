/**
 * Вход в панель администратора.
 *
 * Логин и пароль задаются переменными ADMIN_LOGIN / ADMIN_PASSWORD: в dev —
 * через .env, на проде — в настройках Node.js-приложения в Plesk.
 * Дефолт admin/admin ниже — только для разработки, на прод он попасть не
 * может: при NODE_ENV=production сервер без этих переменных не стартует
 * (проверка в server.ts).
 *
 * Сессия — случайный токен в httpOnly-куке: JS на странице его не видит,
 * XSS-скрипт украсть не может. Сами токены живут в БД, поэтому рестарт
 * сервера администраторов не разлогинивает.
 */
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { createSession, deleteSession, isSessionValid, sessionTimeLeft, touchSession } from './db';

const COOKIE_NAME = 'rd_admin';
// Столько же, сколько живёт сессия на сервере (10 минут бездействия).
// Кука переставляется на каждом действии, иначе браузер выбросил бы её
// раньше, чем истечёт сама сессия.
const COOKIE_MAX_AGE_S = 10 * 60;

// Env читаем лениво: dotenv загружается в startServer, уже после импорта модуля.
function getCreds() {
  return {
    login: process.env.ADMIN_LOGIN || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin',
    isDefault: !process.env.ADMIN_LOGIN && !process.env.ADMIN_PASSWORD,
  };
}

/**
 * Сравнение через хэши фиксированной длины: timingSafeEqual требует равных
 * буферов, а сравнивать длину напрямую — уже утечка длины пароля по времени.
 */
function safeEqual(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Кук у нас одна, полноценный парсер не нужен. */
function readSessionToken(req: Request): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === COOKIE_NAME) return decodeURIComponent(rest.join('='));
  }
  return null;
}

function setSessionCookie(req: Request, res: Response, token: string, maxAge: number): void {
  // Secure только на https: на localhost кука с Secure просто не сохранится.
  const isHttps =
    req.secure || String(req.headers['x-forwarded-proto'] ?? '').includes('https');
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${isHttps ? '; Secure' : ''}`,
  );
}

// Перебор паролей: 5 попыток в минуту с адреса, потом 429.
const ATTEMPT_WINDOW_MS = 60_000;
const ATTEMPT_LIMIT = 5;
const attempts = new Map<string, number[]>();

function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (attempts.get(ip) ?? []).filter((t) => now - t < ATTEMPT_WINDOW_MS);
  list.push(now);
  attempts.set(ip, list);
  // Попутно не даём карте расти на каждый новый адрес.
  if (attempts.size > 1000) {
    for (const [key, times] of attempts) {
      if (times.every((t) => now - t >= ATTEMPT_WINDOW_MS)) attempts.delete(key);
    }
  }
  return list.length > ATTEMPT_LIMIT;
}

export function loginHandler(req: Request, res: Response): void {
  const ip = String(req.headers['x-forwarded-for'] ?? req.ip ?? 'unknown').split(',')[0].trim();
  if (isLoginRateLimited(ip)) {
    res.status(429).json({ success: false, error: 'too_many_attempts' });
    return;
  }

  const { login, password } = req.body ?? {};
  const creds = getCreds();
  if (
    typeof login !== 'string' ||
    typeof password !== 'string' ||
    // Без && с ранним выходом: обе проверки выполняются всегда, чтобы время
    // ответа не подсказывало, что именно неверно — логин или пароль.
    [safeEqual(login, creds.login), safeEqual(password, creds.password)].includes(false)
  ) {
    res.status(401).json({ success: false, error: 'invalid_credentials' });
    return;
  }

  if (creds.isDefault) {
    console.warn(
      '[auth] Вход с паролем по умолчанию (admin/admin). Перед продакшеном задайте ADMIN_LOGIN и ADMIN_PASSWORD в .env!',
    );
  }

  const token = randomBytes(32).toString('hex');
  createSession(token);
  setSessionCookie(req, res, token, COOKIE_MAX_AGE_S);
  res.json({ success: true });
}

export function logoutHandler(req: Request, res: Response): void {
  const token = readSessionToken(req);
  if (token) deleteSession(token);
  setSessionCookie(req, res, '', 0);
  res.json({ success: true });
}

/**
 * Страж админских маршрутов: без живой сессии — 401, дальше не пускаем.
 * Каждый успешный проход считается действием и отодвигает истечение,
 * а кука переставляется, чтобы не протухла в браузере раньше сессии.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = readSessionToken(req);
  if (!token || !isSessionValid(token)) {
    res.status(401).json({ success: false, error: 'unauthorized' });
    return;
  }
  touchSession(token);
  setSessionCookie(req, res, token, COOKIE_MAX_AGE_S);
  next();
}

/**
 * То же, но БЕЗ продления. Нужен для проверки «жива ли ещё сессия»:
 * панель опрашивает её по таймеру, и если бы опрос считался действием,
 * открытая вкладка держала бы вход вечно и таймаут не наступал бы никогда.
 */
export function requireAdminProbe(req: Request, res: Response, next: NextFunction): void {
  const token = readSessionToken(req);
  if (!token || !isSessionValid(token)) {
    res.status(401).json({ success: false, error: 'unauthorized' });
    return;
  }
  res.locals.sessionTimeLeft = sessionTimeLeft(token);
  next();
}
