/**
 * Языковые версии сайта и схема адресов.
 *
 * Латышский — основной, поэтому живёт в корне без префикса:
 *   royaldent.lv/prices      — латышский
 *   royaldent.lv/ru/prices   — русский
 *   royaldent.lv/en/prices   — английский
 *
 * Переключение языка — это переход между разными basename роутера, то есть
 * полная перезагрузка страницы. Так и задумано: клиентская навигация внутри
 * одного basename не умеет прыгать в другой, а перезагрузка гарантирует
 * чистое состояние и правильный <html lang>.
 */

export type LangCode = 'lv' | 'ru' | 'en';

export interface Language {
  code: LangCode;
  /** Подпись в переключателе. */
  label: string;
  /** Префикс пути. У основного языка пустой — он в корне. */
  prefix: string;
  /** Значение hreflang и атрибута <html lang>. */
  hreflang: string;
  /** Готов ли перевод. Незавершённые языки не попадают в sitemap. */
  ready: boolean;
}

export const LANGUAGES: Language[] = [
  // TODO: перевести сайт на латышский и поставить ready: true —
  // после этого корень начнёт отдавать латышскую версию, а временный
  // редирект на /ru в src/main.tsx нужно будет убрать.
  { code: 'lv', label: 'LV', prefix: '', hreflang: 'lv', ready: false },
  { code: 'ru', label: 'RU', prefix: '/ru', hreflang: 'ru', ready: true },
  // TODO: перевести на английский и поставить ready: true.
  { code: 'en', label: 'EN', prefix: '/en', hreflang: 'en', ready: false },
];

export const DEFAULT_LANG: LangCode = 'lv';

/** Язык, на который уводим, пока основной не переведён. */
export const FALLBACK_LANG: LangCode = 'ru';

export const getLanguage = (code: LangCode): Language =>
  LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

/**
 * Определяет язык по пути. Возвращает и сам путь без префикса —
 * он нужен как basename роутера.
 */
/**
 * Путь без языкового префикса: /ru/prices → /prices, /ru → /.
 * Нужен там, где логика завязана на маршрут, а не на язык.
 */
export function stripLangPrefix(pathname: string): string {
  const { prefix } = parseLangFromPath(pathname);
  if (!prefix) return pathname || '/';
  const rest = pathname.slice(prefix.length);
  return rest === '' ? '/' : rest;
}

export function parseLangFromPath(pathname: string): { lang: LangCode; prefix: string } {
  const segment = pathname.split('/')[1]?.toLowerCase() ?? '';
  const match = LANGUAGES.find((l) => l.prefix && l.prefix === `/${segment}`);
  return match
    ? { lang: match.code, prefix: match.prefix }
    : { lang: DEFAULT_LANG, prefix: '' };
}
