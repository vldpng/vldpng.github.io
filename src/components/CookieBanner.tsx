import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onConsentChange, readConsent, saveConsent, syncConsentToGoogle } from '@/lib/consent';

/**
 * Баннер согласия на cookie-файлы.
 *
 * Две кнопки намеренно равнозначны по виду и размеру: по ePrivacy отказаться
 * должно быть так же просто, как согласиться. Вариант с единственной кнопкой
 * «OK» и текстом «продолжая пользоваться сайтом, вы соглашаетесь» в ЕС
 * недействителен — и, что важнее для рекламы, Google Consent Mode при нём
 * не получит честного сигнала отказа.
 *
 * До ответа никакие теги Google не загружаются: значения по умолчанию
 * выставлены в index.html как «запрещено».
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      const consent = readConsent();
      setVisible(consent === null);
      // Выбор мог быть сделан в прошлый визит — теги Google должны узнать
      // о нём при каждой загрузке, а не только в момент нажатия кнопки.
      if (consent) syncConsentToGoogle(consent);
    };
    sync();
    return onConsentChange(sync);
  }, []);

  if (!visible) return null;

  const decide = (analytics: boolean, marketing: boolean) => {
    saveConsent({ analytics, marketing });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookie-файлов"
      // По центру внизу: left-1/2 со сдвигом на половину своей ширины.
      // Ширину задаём явно — у fixed-элемента её нечему ограничить,
      // и на телефоне он иначе прилипал бы к краям экрана.
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:max-w-md z-[120] rounded-2xl bg-card dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)] p-5"
    >
      <p className="font-semibold text-zinc-900 dark:text-zinc-50">Мы используем cookies</p>

      <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Используя сайт, вы соглашаетесь с{' '}
        <Link
          to="/cookies"
          className="underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
        >
          обработкой данных
        </Link>{' '}
        с целью сбора аналитики.
      </p>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => decide(true, true)}
          className="flex-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          Принять
        </button>
        <button
          type="button"
          onClick={() => decide(false, false)}
          className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-300 text-zinc-700 dark:text-zinc-200 px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          Только необходимые
        </button>
      </div>
    </div>
  );
}
