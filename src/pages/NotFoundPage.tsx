import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useContactModal } from '../context/ContactModalContext';
import { clinic } from '../data/clinic';

/**
 * Страница для несуществующих адресов.
 *
 * Раньше маршрута «*» не было вовсе: по любой опечатке в адресе страница
 * отдавала шапку и подвал с пустотой между ними, а сервер при этом отвечал
 * 200 — для поисковика это «мягкий 404», и такие адреса попадают в индекс.
 * noindex здесь обязателен: HTTP-статус на статике поправить нельзя,
 * поэтому исключаем страницу из индекса на уровне разметки.
 */
export function NotFoundPage() {
  const { openModal } = useContactModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Seo
        title="Страница не найдена"
        description="Такой страницы на сайте RoyalDent нет. Вернитесь на главную или свяжитесь с клиникой."
        noindex
      />

      <section className="max-w-7xl mx-auto px-2 md:px-3 py-20 lg:py-32">
        <div className="max-w-2xl">
          <p className="font-mono text-6xl md:text-7xl font-semibold text-amber-700 dark:text-amber-400">
            404
          </p>

          <h1 className="h-section text-zinc-900 dark:text-zinc-50 mt-6">
            Такой страницы нет
          </h1>

          <p className="text-lead text-zinc-600 dark:text-zinc-400 mt-6">
            Возможно, в адресе опечатка или страницу перенесли. Ниже — то, что
            обычно ищут; либо позвоните, и мы подскажем.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              className="btn-sweep inline-flex items-center rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-900 px-7 py-3.5 text-sm font-semibold transition-colors"
            >
              На главную
            </Link>
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-200 text-zinc-900 dark:text-zinc-100 px-7 py-3.5 text-sm font-semibold transition-colors"
            >
              Записаться на приём
            </button>
            <a
              href={clinic.phoneHref}
              className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-200 text-zinc-900 dark:text-zinc-100 px-7 py-3.5 text-sm font-semibold transition-colors"
            >
              {clinic.phoneDisplay}
            </a>
          </div>

          <nav aria-label="Основные разделы" className="mt-14">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                { to: '/services', label: 'Услуги' },
                { to: '/prices', label: 'Цены' },
                { to: '/doctors', label: 'Врачи' },
                { to: '/about', label: 'О клинике' },
                { to: '/patients', label: 'Пациентам' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-zinc-600 dark:text-zinc-400 underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
