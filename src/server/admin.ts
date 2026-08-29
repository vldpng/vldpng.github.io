/**
 * API панели администратора + публичный список врачей.
 *
 * Публичный только GET /api/doctors (его читают страницы сайта, и он отдаёт
 * лишь видимых врачей). Всё остальное — за requireAdmin.
 */
import express, { type Express, type Request, type Response } from 'express';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import {
  getDoctorPublicationMissingFields,
  type Doctor,
} from '../data/doctors';
import type { PriceCategory } from '../data/prices';
import {
  createDoctor,
  createPriceCategory,
  deleteDoctor,
  deletePriceCategory,
  getDoctor,
  listDoctors,
  listLeadsPage,
  listPriceCategories,
  reorderDoctors,
  reorderPriceCategories,
  setDoctorVisibility,
  updateDoctor,
  updatePriceCategory,
} from './db';
import { loginHandler, logoutHandler, requireAdmin, requireAdminProbe } from './auth';
import { UPLOADS_STAFF_DIR } from './paths';

const clean = (v: unknown, max = 200): string => String(v ?? '').trim().slice(0, max);

/**
 * Поля врача принимаем только по списку — иначе через админ-API в JSON можно
 * было бы дописать что угодно. Массивы и вложенные структуры проверяем
 * поэлементно по той же причине.
 */
function sanitizeDoctor(id: string, body: Record<string, unknown>): Doctor {
  const services = Array.isArray(body.services)
    ? body.services.map((s) => clean(s, 100)).filter((s) => s.startsWith('/services/'))
    : [];
  const educationList = Array.isArray(body.educationList)
    ? body.educationList
        .map((e: any) => ({
          title: clean(e?.title, 200),
          subtitle: clean(e?.subtitle, 200) || undefined,
        }))
        .filter((e) => e.title)
    : undefined;
  const translationsBody =
    body.translations && typeof body.translations === 'object'
      ? (body.translations as Record<string, unknown>)
      : {};
  const englishBody =
    translationsBody.en && typeof translationsBody.en === 'object'
      ? (translationsBody.en as Record<string, unknown>)
      : {};
  const educationListEn = Array.isArray(englishBody.educationList)
    ? englishBody.educationList
        .map((e: any) => ({
          title: clean(e?.title, 200),
          subtitle: clean(e?.subtitle, 200) || undefined,
        }))
        .filter((e) => e.title)
    : undefined;

  // Сертификаты и кейсы раньше в белый список не входили, и любое сохранение
  // врача в админке молча стирало ему обе секции: на странице пропадали и
  // лента сертификатов, и блок «до/после». Пустые записи отбрасываем — плитка
  // без скана и подписи не несёт ничего, кроме дырки в ленте.
  const certificates = Array.isArray(body.certificates)
    ? body.certificates
        .map((c: any) => ({
          src: clean(c?.src, 300) || undefined,
          title: clean(c?.title, 200) || undefined,
        }))
        .filter((c) => c.src || c.title)
    : undefined;
  // Кейс без подписи не показать — фильтруем по title, как educationList.
  const cases = Array.isArray(body.cases)
    ? body.cases
        .map((c: any) => ({
          title: clean(c?.title, 200),
          before: clean(c?.before, 300) || undefined,
          after: clean(c?.after, 300) || undefined,
        }))
        .filter((c) => c.title)
    : undefined;

  const name = clean(body.name, 120) || 'Новый сотрудник';
  // Адрес страницы врача. Оставляем только то, что законно смотрится в URL:
  // строчная латиница, цифры и дефис. Пустой слаг откатывается на id — адрес
  // получится некрасивый, но рабочий, а не битый.
  const slug =
    clean(body.slug, 80)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '') || id;
  return {
    id,
    slug,
    name,
    nameLatin: clean(body.nameLatin, 120) || undefined,
    specialty: clean(body.specialty, 160),
    experience: clean(body.experience, 80) || undefined,
    bio: clean(body.bio, 2000),
    services,
    educationList,
    certificates,
    cases,
    photoUrl: clean(body.photoUrl, 300) || undefined,
    photoPosition: clean(body.photoPosition, 40) || undefined,
    photoLabel: `[Фото — ${name}]`,
    support: body.support === true || undefined,
    translations: {
      en: {
        specialty: clean(englishBody.specialty, 160),
        experience: clean(englishBody.experience, 80) || undefined,
        bio: clean(englishBody.bio, 2000),
        educationList: educationListEn,
      },
    },
  };
}

/**
 * Категория прайса принимается только по известным полям — как и врач.
 * Позиции чистим поэлементно и выбрасываем безымянные: пустая строка в
 * таблице цен выглядела бы как сбой вёрстки.
 */
function sanitizePriceCategory(body: Record<string, unknown>): PriceCategory {
  const items = Array.isArray(body.items)
    ? body.items
        .map((i: any) => ({ name: clean(i?.name, 300), price: clean(i?.price, 40) }))
        .filter((i) => i.name)
    : [];
  return {
    title: clean(body.title, 120) || 'Новая категория',
    icon: clean(body.icon, 40) || 'Stethoscope',
    iconSrc: clean(body.iconSrc, 200) || undefined,
    items,
  };
}

export function registerAdminRoutes(app: Express) {
  // --- вход/выход -----------------------------------------------------------
  app.post('/api/admin/login', loginHandler);
  app.post('/api/admin/logout', logoutHandler);
  // Проверка «жива ли сессия» для фронтенда админки. Намеренно через probe:
  // опрос по таймеру не должен считаться работой и продлевать вход.
  app.get('/api/admin/me', requireAdminProbe, (_req, res) =>
    res.json({ success: true, timeLeftMs: res.locals.sessionTimeLeft }),
  );

  // --- заявки ---------------------------------------------------------------
  app.get('/api/admin/leads', requireAdmin, (req, res) => {
    // Границы жёсткие: limit из запроса иначе позволил бы вытянуть всю
    // таблицу разом и вернул бы ту же проблему, ради которой сделана страница.
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(200, Math.max(10, Number(req.query.limit) || 50));
    const search = clean(req.query.q, 100);

    const { rows, total } = listLeadsPage({ limit, offset: (page - 1) * limit, search });
    res.json({
      success: true,
      data: rows,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
    });
  });

  // --- врачи: публичное чтение ---------------------------------------------
  app.get('/api/doctors', (_req, res) => {
    res.json({ success: true, data: listDoctors(true) });
  });

  // --- врачи: управление ----------------------------------------------------
  app.get('/api/admin/doctors', requireAdmin, (_req, res) => {
    res.json({ success: true, data: listDoctors(false) });
  });

  app.post('/api/admin/doctors', requireAdmin, (req, res) => {
    // Метка времени как id: у затравки из doctors.ts id «1»–«13», коллизий нет.
    const doc: Doctor = {
      ...sanitizeDoctor(String(Date.now()), req.body ?? {}),
      requiresEnglishForPublication: true,
    };
    createDoctor(doc, false);
    res.json({ success: true, data: { ...doc, visible: false } });
  });

  // Раньше маршрутов с :id — иначе «order» имеет шанс уйти в них как id.
  app.patch('/api/admin/doctors/order', requireAdmin, (req, res) => {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids.map((v: unknown) => String(v)) : null;
    if (!ids || ids.length === 0) {
      return res.status(400).json({ success: false, error: 'ids_required' });
    }
    // Присылать нужно весь список: позиция — это индекс, и по частичному
    // набору её не восстановить.
    const known = new Set(listDoctors(false).map((d) => d.id));
    if (ids.length !== known.size || ids.some((id) => !known.has(id))) {
      return res.status(400).json({ success: false, error: 'ids_mismatch' });
    }
    reorderDoctors(ids);
    res.json({ success: true });
  });

  app.put('/api/admin/doctors/:id', requireAdmin, (req, res) => {
    const existing = getDoctor(req.params.id);
    if (!existing) return res.status(404).json({ success: false, error: 'not_found' });
    const doc: Doctor = {
      ...sanitizeDoctor(existing.id, req.body ?? {}),
      requiresEnglishForPublication: existing.requiresEnglishForPublication,
    };
    if (existing.visible && doc.requiresEnglishForPublication) {
      const missing = getDoctorPublicationMissingFields(doc);
      if (missing.length > 0) {
        return res.status(422).json({ success: false, error: 'translation_incomplete', missing });
      }
    }
    updateDoctor(existing.id, doc);
    res.json({ success: true, data: { ...doc, visible: existing.visible } });
  });

  app.patch('/api/admin/doctors/:id/visibility', requireAdmin, (req, res) => {
    const visible = req.body?.visible === true;
    const doctor = getDoctor(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, error: 'not_found' });
    if (visible && doctor.requiresEnglishForPublication) {
      const missing = getDoctorPublicationMissingFields(doctor);
      if (missing.length > 0) {
        return res.status(422).json({ success: false, error: 'translation_incomplete', missing });
      }
    }
    if (!setDoctorVisibility(req.params.id, visible)) {
      return res.status(404).json({ success: false, error: 'not_found' });
    }
    res.json({ success: true });
  });

  app.delete('/api/admin/doctors/:id', requireAdmin, (req, res) => {
    if (!deleteDoctor(req.params.id)) {
      return res.status(404).json({ success: false, error: 'not_found' });
    }
    res.json({ success: true });
  });

  // --- прайс-лист -----------------------------------------------------------
  app.get('/api/prices', (_req, res) => {
    res.json({ success: true, data: listPriceCategories() });
  });

  app.get('/api/admin/prices', requireAdmin, (_req, res) => {
    res.json({ success: true, data: listPriceCategories() });
  });

  app.post('/api/admin/prices', requireAdmin, (req, res) => {
    const id = `cat-${Date.now()}`;
    const cat = sanitizePriceCategory(req.body ?? {});
    createPriceCategory(id, cat);
    res.json({ success: true, data: { id, ...cat } });
  });

  app.patch('/api/admin/prices/order', requireAdmin, (req, res) => {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids.map((v: unknown) => String(v)) : null;
    if (!ids || ids.length === 0) {
      return res.status(400).json({ success: false, error: 'ids_required' });
    }
    const known = new Set(listPriceCategories().map((c) => c.id));
    if (ids.length !== known.size || ids.some((id) => !known.has(id))) {
      return res.status(400).json({ success: false, error: 'ids_mismatch' });
    }
    reorderPriceCategories(ids);
    res.json({ success: true });
  });

  // Категория сохраняется целиком: и поля, и весь список позиций в их порядке.
  // Отдельных маршрутов на позицию нет — перестановка внутри категории это
  // просто другой порядок массива, и сохранять его частями незачем.
  app.put('/api/admin/prices/:id', requireAdmin, (req, res) => {
    const cat = sanitizePriceCategory(req.body ?? {});
    if (!updatePriceCategory(req.params.id, cat)) {
      return res.status(404).json({ success: false, error: 'not_found' });
    }
    res.json({ success: true, data: { id: req.params.id, ...cat } });
  });

  app.delete('/api/admin/prices/:id', requireAdmin, (req, res) => {
    if (!deletePriceCategory(req.params.id)) {
      return res.status(404).json({ success: false, error: 'not_found' });
    }
    res.json({ success: true });
  });

  // --- фото врача -----------------------------------------------------------
  // Файл приходит сырым телом запроса (не multipart): для одного файла до
  // 100 КБ так проще и не нужна зависимость вроде multer.
  app.post(
    '/api/admin/doctors/photo',
    requireAdmin,
    express.raw({ type: 'application/octet-stream', limit: '120kb' }),
    (req: Request, res: Response) => {
      const buf: Buffer = req.body;
      if (!Buffer.isBuffer(buf) || buf.length === 0) {
        return res.status(400).json({ success: false, error: 'empty_body' });
      }
      if (buf.length > 100 * 1024) {
        return res.status(413).json({ success: false, error: 'file_too_large' });
      }
      // Формат проверяем по сигнатуре, а не по расширению: контейнер RIFF
      // с типом WEBP. Переименованный jpg сюда не пройдёт.
      if (buf.subarray(0, 4).toString('ascii') !== 'RIFF' || buf.subarray(8, 12).toString('ascii') !== 'WEBP') {
        return res.status(415).json({ success: false, error: 'not_webp' });
      }

      // Имя собираем сами из безопасных символов; метка времени спасает
      // от перезаписи файла с тем же названием.
      const original = clean(req.query.name, 100)
        .replace(/\.webp$/i, '')
        .replace(/[^a-zA-Z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40) || 'photo';
      const filename = `${original}-${Date.now()}.webp`;

      // Пишем туда же, откуда server.ts раздаёт /images/staff. Каталог общий
      // и вычисляется в одном месте — раньше он считался здесь от cwd,
      // а в server.ts от каталога приложения, и на проде это могло разойтись:
      // панель отвечала успехом, а фото на сайте не появлялось.
      writeFileSync(path.join(UPLOADS_STAFF_DIR, filename), buf);

      res.json({ success: true, data: { url: `/images/staff/${filename}` } });
    },
  );
}
