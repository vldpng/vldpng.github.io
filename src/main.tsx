import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import {
  DEFAULT_LANG,
  FALLBACK_LANG,
  getLanguage,
  parseLangFromPath,
  stripLangPrefix,
} from './data/languages.ts';

const { lang, prefix } = parseLangFromPath(window.location.pathname);
const isLatvianPreview =
  import.meta.env.DEV && new URLSearchParams(window.location.search).get('preview') === 'lv';

/**
 * Пока основной язык (латышский) не переведён, корень уводим на готовую
 * версию. Условие завязано на флаг ready, поэтому редирект исчезнет сам,
 * как только в languages.ts у lv появится ready: true.
 *
 * replace, а не assign: иначе кнопка «назад» возвращала бы на корень,
 * который снова редиректит, и выйти из цикла было бы нельзя.
 */
const needsFallback =
  lang === DEFAULT_LANG && !getLanguage(DEFAULT_LANG).ready && !isLatvianPreview;

if (needsFallback) {
  const target = getLanguage(FALLBACK_LANG).prefix;
  window.location.replace(
    `${target}${window.location.pathname}${window.location.search}${window.location.hash}`,
  );
} else {
  // Язык страницы: важен для скринридеров (произношение) и для поисковиков.
  document.documentElement.lang = getLanguage(lang).hreflang;
  const root = createRoot(document.getElementById('root')!);

  const renderApp = () => {
    root.render(
      <StrictMode>
        {/* basename снимает языковой префикс с путей, поэтому все <Link to="/prices">
            в коде остаются без изменений и сами получают нужный префикс. */}
        <BrowserRouter basename={prefix || undefined}>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  };

  const render = async () => {
    // Словарь большой, поэтому русская версия его не загружает. Админка тоже
    // намеренно остаётся русской даже при ручном переходе на /en/admin.
    const needsEnglish =
      lang === 'en' && !stripLangPrefix(window.location.pathname).startsWith('/admin');
    const needsLatvian =
      lang === 'lv' && !stripLangPrefix(window.location.pathname).startsWith('/admin');

    if (needsEnglish) {
      // Показываем полноценный первый кадр сразу: загрузка словаря больше не
      // оставляет английскому посетителю пустой #root на медленной сети.
      root.render(
        <div className="flex min-h-[100svh] items-center justify-center bg-zinc-50">
          <span
            className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-amber-500"
            role="status"
            aria-label="Loading"
          />
        </div>,
      );
      const { installEnglishTranslation } = await import('./i18n/english.ts');
      installEnglishTranslation();
    }

    if (needsLatvian) {
      const { installLatvianTranslation } = await import('./i18n/latvian.ts');
      installLatvianTranslation();
    }

    renderApp();
  };

  void render();
}
