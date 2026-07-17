import { useEffect } from 'react';
import { clinic } from '../data/clinic';

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
  const url = clinic.siteUrl + (path ?? '');
  const ogImage = image ?? `${clinic.siteUrl}/brand/favicon.png`;

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
    upsertMeta('property', 'og:locale', 'ru_RU');

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertLink('canonical', url);
  }, [fullTitle, desc, url, ogImage, noindex]);

  return null;
}
