import { useEffect } from 'react';
import { clinic } from '../data/clinic';
import { getLanguage, parseLangFromPath } from '../data/languages';

interface SeoProps {
  /** Заголовок страницы (без названия клиники — оно добавится автоматически). */
  title: string;
  /** Мета-описание для сниппета в выдаче (до ~160 символов). */
  description?: string;
  /** Путь страницы для canonical, напр. "/prices". */
  path?: string;
  /** Изображение для соцсетей (абсолютный URL). */
  image?: string;
  /** noindex для служебных/неполных страниц. */
  noindex?: boolean;
}

/**
 * Цвет панелей браузера (адресная строка iOS Safari, шапка Android Chrome)
 * — тот же, что фон страницы: переменная --color-zinc-50 из index.css.
 * У проекта переопределена палитра zinc: это светло-голубой #F0F4FF,
 * а не почти-белый #fafafa из стандартного Tailwind.
 */
const THEME_COLOR = '#F0F4FF';

const DEFAULT_DESCRIPTION = clinic.description;

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Управляет тегами <head> на уровне страницы.
 *
 * ВНИМАНИЕ: сайт рендерится на клиенте (SPA), поэтому эти теги выставляются
 * через JS. Google их видит, но соцсети и часть краулеров читают только
 * исходный HTML. Базовые теги дублируются в index.html. Для полноценного SEO
 * рекомендуется перейти на SSR/SSG (Remix / Next.js).
 */
export function Seo({ title, description, path, image, noindex }: SeoProps) {
  const fullTitle = title.includes(clinic.name)
    ? title
    : `${title} | ${clinic.name}`;
  const desc = description ?? DEFAULT_DESCRIPTION;

  /**
   * Языковой префикс обязателен в canonical и og:url.
   *
   * Страницы принимают path без префикса («/prices»), потому что для роутера
   * его снимает basename. Но канонический адрес должен указывать на реальную
   * страницу: без префикса /ru/prices объявлял бы каноническим /prices —
   * адрес основного, латышского языка, — и Google счёл бы русскую версию
   * дублем латышской.
   *
   * Язык берём из адреса: сменить его без перезагрузки страницы нельзя,
   * поэтому значение не может устареть между рендерами.
   */
  const { lang, prefix } = parseLangFromPath(window.location.pathname);
  const url = `${clinic.siteUrl}${prefix}${path || '/'}`;
  const ogImage = image ?? `${clinic.siteUrl}/brand/favicon.png`;
  const ogLocale = getLanguage(lang).hreflang;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:site_name', clinic.name);
    upsertMeta('property', 'og:locale', ogLocale);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertLink('canonical', url);

    // Панели Safari/Chrome + фон <html>: второй нужен, чтобы «резинка»
    // при оттягивании страницы за края была того же цвета, что и панели.
    upsertMeta('name', 'theme-color', THEME_COLOR);
    document.documentElement.style.backgroundColor = THEME_COLOR;
  }, [fullTitle, desc, url, ogImage, ogLocale, noindex]);

  return null;
}
