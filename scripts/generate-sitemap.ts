/**
 * Генерация public/sitemap.xml из данных проекта.
 *
 * Запускается автоматически перед сборкой (npm run build), поэтому карта
 * не может разойтись со списком страниц. Языки с ready: false пропускаются:
 * отдавать поисковику адрес непереведённой версии — тот же битый URL.
 *
 * Когда появится вторая языковая версия, у каждого адреса добавятся
 * блоки <xhtml:link rel="alternate" hreflang="..."> на его переводы.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { getAllRoutes } from '../src/data/routes';
import { LANGUAGES } from '../src/data/languages';
import { clinic } from '../src/data/clinic';

const SITE = clinic.siteUrl.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const ready = LANGUAGES.filter((l) => l.ready);
if (ready.length === 0) {
  console.error('Ни один язык не помечен ready — sitemap был бы пустым.');
  process.exit(1);
}

const routes = getAllRoutes();

// hreflang нужен только когда версий больше одной: с единственным языком
// это лишний шум, который Google всё равно проигнорирует.
const multilingual = ready.length > 1;

const urls = ready.flatMap((lang) =>
  routes.map((route) => {
    // Корень основного языка — это "/", а не "" (иначе получится ".../" без пути).
    const href = (p: string, prefix: string) =>
      `${SITE}${prefix}${p === '/' ? (prefix ? '/' : '/') : p}`;

    const alternates = multilingual
      ? ready
          .map(
            (alt) =>
              `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${href(route.path, alt.prefix)}"/>`,
          )
          .join('')
      : '';

    return [
      '  <url>',
      `    <loc>${href(route.path, lang.prefix)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority.toFixed(1)}</priority>${alternates}`,
      '  </url>',
    ].join('\n');
  }),
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  multilingual
    ? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    : '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  '</urlset>',
  '',
].join('\n');

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');

console.log(
  `sitemap.xml: ${urls.length} адресов — ${routes.length} страниц × ${ready.length} яз. (${ready.map((l) => l.code).join(', ')})`,
);
