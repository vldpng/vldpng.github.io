import React, { useEffect, useState } from 'react';
import { Seo } from '../components/Seo';
import { PageBanner } from '../components/ui/page-banner';
import { externalLinkProps } from '../data/social';
import { onConsentChange, readConsent, saveConsent } from '@/lib/consent';

/** Инструкции производителей браузеров — на случай полного отключения cookie. */
const BROWSER_LINKS = [
  {
    label: 'Google Chrome',
    href: 'https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=ru',
  },
  {
    label: 'Mozilla Firefox',
    href: 'https://support.mozilla.org/ru/kb/udalenie-kukov-i-dannyh-sajtov-v-firefox',
  },
  {
    label: 'Microsoft Edge',
    href: 'https://support.microsoft.com/ru-ru/windows/168dab11-0753-043d-7c16-ede5947fc64d',
  },
  { label: 'Safari', href: 'https://support.apple.com/ru-ru/guide/safari/sfri11471/mac' },
];

const h2 = 'text-xl md:text-2xl font-medium text-zinc-900 dark:text-zinc-50 mt-10 first:mt-0 mb-3';
const h3 = 'text-base font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2';
const p = 'text-zinc-600 dark:text-zinc-400 leading-relaxed';

/** Панель управления выбором — обязательная часть: согласие нужно уметь отозвать. */
function ConsentSettings() {
  const [consent, setConsent] = useState(readConsent);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);
  const [saved, setSaved] = useState(false);

  useEffect(
    () =>
      onConsentChange(() => {
        const fresh = readConsent();
        setConsent(fresh);
        setAnalytics(fresh?.analytics ?? false);
        setMarketing(fresh?.marketing ?? false);
      }),
    [],
  );

  const row = 'flex items-start gap-3 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0';

  return (
    <div className="mt-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] p-5 bg-zinc-50/60 dark:bg-zinc-950/40">
      <div className={row}>
        <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-amber-500" />
        <span>
          <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Необходимые
          </span>
          <span className="block text-sm text-zinc-500 dark:text-zinc-400">
            Обеспечивают работу сайта и форм записи. Отключить нельзя.
          </span>
        </span>
      </div>

      <label className={`${row} cursor-pointer`}>
        <input
          type="checkbox"
          checked={analytics}
          onChange={(e) => setAnalytics(e.target.checked)}
          className="mt-1 h-4 w-4 accent-amber-500"
        />
        <span>
          <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Аналитика
          </span>
          <span className="block text-sm text-zinc-500 dark:text-zinc-400">
            Обезличенная статистика посещений: какие разделы популярны.
          </span>
        </span>
      </label>

      <label className={`${row} cursor-pointer`}>
        <input
          type="checkbox"
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
          className="mt-1 h-4 w-4 accent-amber-500"
        />
        <span>
          <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Реклама
          </span>
          <span className="block text-sm text-zinc-500 dark:text-zinc-400">
            Оценка эффективности рекламы и показ релевантных объявлений.
          </span>
        </span>
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            saveConsent({ analytics, marketing });
            setSaved(true);
          }}
          className="rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          Сохранить выбор
        </button>
        {saved && <span className="text-sm text-green-600">Сохранено.</span>}
        {consent && !saved && (
          <span className="text-sm text-zinc-400">
            Выбор сделан {new Date(consent.timestamp).toLocaleDateString('ru-RU')}
          </span>
        )}
      </div>
    </div>
  );
}

export function CookiesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 lg:pt-24 min-h-screen pb-20 bg-zinc-50 dark:bg-zinc-950">
      <Seo
        title="Использование cookie-файлов"
        description="Какие cookie-файлы использует сайт стоматологической клиники RoyalDent, для чего они нужны и как управлять их сбором."
        path="/cookies"
      />

      <PageBanner title="Использование cookie-файлов" />

      <article className="max-w-[1000px] mx-auto px-2 md:px-3 mt-10 lg:mt-14 bg-card dark:bg-zinc-900 rounded-3xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_4px_20px_rgb(58,58,58,0.03)] p-6 md:p-12">
        <h2 className={h2}>Что такое cookie-файлы?</h2>
        <p className={p}>
          Cookie — это небольшие файлы, которые отправляются веб-сайтом браузеру и сохраняются на
          компьютере пользователя, когда он посещает веб-страницу. Мы также сохраняем куки-файлы.
          Эти файлы служат для обеспечения корректной работы сайта и помогают осуществлять более
          комфортное взаимодействие пользователя с сайтом.
        </p>

        <h2 className={h2}>Для каких целей используются cookie-файлы?</h2>

        <h3 className={h3}>Обеспечение работоспособности сайта</h3>
        <p className={p}>
          Некоторые cookie-файлы необходимы для стабильной и корректной работы сайта и его модулей.
          Эти файлы не предназначены для сбора какой-либо персональной информации. Если вы
          заблокируете такие cookie-файлы, то мы не сможем гарантировать работоспособность сайта.
        </p>

        <h3 className={h3}>Учёт ваших предпочтений</h3>
        <p className={p}>
          Для комфортного взаимодействия с сайтом мы сохраняем информацию в процессе его
          использования с целью обеспечения индивидуального подхода. Например, мы записываем данные
          о том, что вы уже ответили на уведомление о cookie-файлах, чтобы не показывать его при
          каждом заходе.
        </p>

        <h3 className={h3}>Аналитика данных</h3>
        <p className={p}>
          Cookie-файлы в рамках данной цели позволяют выполнять статистический анализ, благодаря
          чему мы можем улучшать сайт. Такие файлы хранят обезличенные данные и собираются анонимно
          с помощью систем аналитики. Они помогают нам понять, какие разделы пользуются
          популярностью, какие возможности сайта являются полезными и удобными, и каких не хватает.
        </p>

        <h2 className={h2}>Управление настройками файлов cookie</h2>
        <p className={p}>
          Изменить своё решение можно в любой момент прямо здесь: снимите отметку с ненужной
          категории и нажмите «Сохранить выбор». Изменение применяется сразу и действует до
          следующего.
        </p>

        <ConsentSettings />

        <p className={`${p} mt-8`}>
          Дополнительно cookie-файлы можно заблокировать в настройках браузера. Важно понимать, что
          при отключении cookie-файлов возможны сбои в работе сайта и/или недоступность части
          страниц и возможностей. Ниже — краткие инструкции для распространённых браузеров:
        </p>

        <ul className="mt-4 space-y-2">
          {BROWSER_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                {...externalLinkProps}
                className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
