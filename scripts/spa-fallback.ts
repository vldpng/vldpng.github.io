/**
 * Заглушки для статического хостинга (GitHub Pages) после vite build.
 *
 * Pages отдаёт файлы с диска: если запрошенного пути нет, возвращается
 * 404.html — со статусом 404, даже когда SPA рисует нормальную страницу.
 * Для людей выглядит прилично, для поисковика — «страницы не существует».
 *
 * Поэтому кладём настоящий index.html в каталог каждого языка: корень
 * языковой версии начинает отвечать честным 200. Вложенные маршруты
 * (/ru/about и глубже) по-прежнему уходят в 404.html — на статике это
 * не лечится, полностью решится на GarmTech, где отвечает Node.
 *
 * Список языков берётся из data/languages.ts, так что появление новой
 * версии не потребует правок ни здесь, ни в workflow.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { DEFAULT_LANG, LANGUAGES, type LangCode } from '../src/data/languages';
import { getAllRoutes } from '../src/data/routes';
import { servicesList } from '../src/data/services';
import { doctorsData, localizeDoctor } from '../src/data/doctors';
import { clinic } from '../src/data/clinic';
import { translateEnglish } from '../src/i18n/english';
import { translateLatvian } from '../src/i18n/latvian';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const index = join(dist, 'index.html');
const sourceHtml = readFileSync(index, 'utf8');

const STATIC_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'RoyalDent — Стоматология в Юрмале | Имплантация и лечение под микроскопом',
    description:
      'Современная стоматология RoyalDent в Юрмале без боли и страха: имплантация, лечение под микроскопом, эстетика, профессиональная гигиена и отбеливание. Запишитесь на приём.',
  },
  '/services': {
    title: 'Услуги',
    description:
      'Стоматологические услуги клиники RoyalDent в Юрмале: эстетическая стоматология, имплантация, лечение под микроскопом, профессиональная гигиена, отбеливание и элайнеры.',
  },
  '/prices': {
    title: 'Цены на услуги',
    description:
      'Цены на стоматологические услуги в клинике RoyalDent в Юрмале: лечение, имплантация, гигиена, отбеливание, ортодонтия. Прозрачное ценообразование.',
  },
  '/doctors': {
    title: 'Наши врачи',
    description:
      'Команда стоматологов клиники RoyalDent в Юрмале: хирурги-имплантологи, ортопеды, ортодонты и эндодонтисты с многолетним опытом.',
  },
  '/about': {
    title: 'О клинике',
    description:
      'О стоматологической клинике RoyalDent в Юрмале: индивидуальный подход, инновационные технологии, команда экспертов и 15 лет опыта.',
  },
  '/patients': {
    title: 'Пациентам',
    description:
      'Правила приёма и правовая информация для пациентов клиники RoyalDent в Юрмале: порядок записи, подготовка к исследованиям и нормативные акты.',
  },
  '/patients/rules': {
    title: 'Правила внутреннего распорядка для пациентов',
    description:
      'Правила внутреннего распорядка стоматологической клиники RoyalDent в Юрмале: порядок обращения и записи, права и обязанности пациентов, график работы и условия оказания услуг.',
  },
  '/patients/booking': {
    title: 'Правила записи на первичный приём',
    description:
      'Порядок записи в стоматологическую клинику RoyalDent в Юрмале: способы записи, документы для первого визита, приём несовершеннолетних, отмена и перенос приёма.',
  },
  '/patients/diagnostics': {
    title: 'Правила подготовки к диагностическим исследованиям',
    description:
      'Как подготовиться к диагностике в клинике RoyalDent в Юрмале: прицельные снимки, ОПТГ, КЛКТ, фотопротокол и внутриротовое сканирование.',
  },
  '/privacy': {
    title: 'Политика конфиденциальности',
    description:
      'Политика конфиденциальности и защиты персональных данных сайта стоматологической клиники RoyalDent в Юрмале: какие данные обрабатываются, права пользователя по GDPR.',
  },
  '/cookies': {
    title: 'Использование cookie-файлов',
    description:
      'Какие cookie-файлы использует сайт стоматологической клиники RoyalDent, для чего они нужны и как управлять их сбором.',
  },
};

function routeMeta(route: string) {
  const staticMeta = STATIC_META[route];
  if (staticMeta) return staticMeta;

  if (route.startsWith('/services/')) {
    const service = servicesList.find((item) => route === `/services/${item.id}`);
    if (service) return { title: service.title, description: service.desc };
  }

  if (route.startsWith('/doctors/')) {
    const doctor = doctorsData.find((item) => route === `/doctors/${item.slug}`);
    if (doctor) {
      return {
        title: `${doctor.name} — ${doctor.specialty}`,
        description: `${doctor.name}, ${doctor.specialty}. ${doctor.bio}`,
      };
    }
  }

  return STATIC_META['/'];
}

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function truncateDescription(value: string, maxLength = 160) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength + 1);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > 120 ? lastSpace : maxLength).trimEnd()}…`;
}

function replaceMeta(html: string, attribute: 'name' | 'property', key: string, content: string) {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[\\s\\S]*?>`, 'i');
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`);
}

function translateMeta(code: LangCode, value: string) {
  if (code === 'en') return translateEnglish(value);
  if (code === 'lv') return translateLatvian(value);
  return value;
}

function localizedHtml(route: string, code: LangCode, prefix: string) {
  const sourceMeta = routeMeta(route);
  let title = translateMeta(code, sourceMeta.title);
  let rawDescription = translateMeta(code, sourceMeta.description);

  /*
   * Имя, специальность и биография собираются в предложение уже в рантайме,
   * поэтому словарь точных соответствий целую фразу не распознаёт — собираем
   * её здесь по частям.
   *
   * Источник тот же, что и у страницы: сначала localizeDoctor (языковая
   * версия, записанная в самой карточке), затем словарь. Иначе метаданные
   * разойдутся с содержимым — у врача с заполненным nameLatin в <title>
   * стояло бы «Vitaly Dvurechensky», а на странице «Vitālijs Dvurečenskis».
   *
   * Порядок безопасен в обе стороны: localizeDoctor без перевода в карточке
   * возвращает врача как есть, а translateMeta не трогает строки без
   * кириллицы — то есть уже переведённые не портит.
   */
  if (route.startsWith('/doctors/') && code !== 'ru') {
    const doctor = doctorsData.find((item) => route === `/doctors/${item.slug}`);
    if (doctor) {
      const localized = localizeDoctor(doctor, code);
      const name = translateMeta(code, localized.name);
      const specialty = translateMeta(code, localized.specialty);
      title = `${name} — ${specialty}`;
      rawDescription = `${name}, ${specialty}. ${translateMeta(code, localized.bio)}`;
    }
  }

  const description = truncateDescription(rawDescription);
  const fullTitle = title.includes(clinic.name) ? title : `${title} | ${clinic.name}`;
  const canonical = `${clinic.siteUrl}${prefix}${route === '/' ? '/' : route}`;
  const readyLanguages = LANGUAGES.filter((language) => language.ready);
  const alternates = [
    ...readyLanguages.map(
      (language) =>
        `<link rel="alternate" hreflang="${language.hreflang}" href="${clinic.siteUrl}${language.prefix}${route === '/' ? '/' : route}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${clinic.siteUrl}${LANGUAGES.find((language) => language.code === DEFAULT_LANG)?.prefix ?? ''}${route === '/' ? '/' : route}" />`,
  ].join('\n    ');

  let html = sourceHtml
    .replace(/<html lang="[^"]+">/, `<html lang="${code}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${fullTitle}</title>`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />\n    ${alternates}`);

  html = replaceMeta(html, 'name', 'description', description);
  const ogLocale = code === 'en' ? 'en_GB' : code === 'lv' ? 'lv_LV' : 'ru_RU';
  html = replaceMeta(html, 'property', 'og:locale', ogLocale);
  html = replaceMeta(html, 'property', 'og:url', canonical);
  html = replaceMeta(html, 'property', 'og:title', fullTitle);
  html = replaceMeta(html, 'property', 'og:description', description);
  html = replaceMeta(html, 'name', 'twitter:title', fullTitle);
  html = replaceMeta(html, 'name', 'twitter:description', description);

  return html
    .replace(
      /("description":\s*)"[^"]*"/,
      `$1${JSON.stringify(description)}`,
    )
    .replace(/("url":\s*)"[^"]*"/, `$1${JSON.stringify(canonical)}`);
}

// SPA-фолбэк для всего остального.
copyFileSync(index, join(dist, '404.html'));

const created: string[] = [];
for (const lang of LANGUAGES) {
  if (!lang.ready) continue;

  for (const route of getAllRoutes()) {
    const relativeRoute = route.path === '/' ? '' : route.path.replace(/^\//, '');
    const dir = join(dist, lang.prefix.replace(/^\//, ''), relativeRoute);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, 'index.html'),
      localizedHtml(route.path, lang.code, lang.prefix),
      'utf8',
    );
    created.push(`${lang.prefix}${route.path}`);
  }
}

console.log(
  `spa-fallback: 404.html + ${created.length} локализованных страниц`,
);
