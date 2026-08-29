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

/**
 * Пока основной язык (латышский) не переведён, корень уводим на готовую
 * версию. Условие завязано на флаг ready, поэтому редирект исчезнет сам,
 * как только в languages.ts у lv появится ready: true.
 *
 * replace, а не assign: иначе кнопка «назад» возвращала бы на корень,
 * который снова редиректит, и выйти из цикла было бы нельзя.
 */
const needsFallback = lang === DEFAULT_LANG && !getLanguage(DEFAULT_LANG).ready;

if (needsFallback) {
  const target = getLanguage(FALLBACK_LANG).prefix;
  window.location.replace(
    `${target}${window.location.pathname}${window.location.search}${window.location.hash}`,
  );
} else {
  // Язык страницы: важен для скринридеров (произношение) и для поисковиков.
  document.documentElement.lang = getLanguage(lang).hreflang;

  const render = async () => {
    // Словарь большой, поэтому русская версия его не загружает. Админка тоже
    // намеренно остаётся русской даже при ручном переходе на /en/admin.
    if (lang === 'en' && !stripLangPrefix(window.location.pathname).startsWith('/admin')) {
      const { installEnglishTranslation } = await import('./i18n/english.ts');
      installEnglishTranslation();
    }

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        {/* basename снимает языковой префикс с путей, поэтому все <Link to="/prices">
            в коде остаются без изменений и сами получают нужный префикс. */}
        <BrowserRouter basename={prefix || undefined}>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  };

  void render();
}
