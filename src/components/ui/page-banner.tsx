import React from 'react';
import { Link } from 'react-router-dom';

interface PageBannerProps {
  /** Крупный заголовок страницы (h1). */
  title: string;
  /** Подпись в хлебных крошках после «Главная» (выводится капсом). */
  breadcrumb: string;
}

/**
 * Шапка внутренней страницы: хлебные крошки и h1 обычным текстом,
 * без плашки — контент страницы начинается сразу под заголовком.
 */
export function PageBanner({ title, breadcrumb }: PageBannerProps) {
  return (
    <div className="pb-8 md:pb-10">
      <nav aria-label="Хлебные крошки">
        <ol className="eyebrow flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
          <li>
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Главная
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="block w-6 h-px bg-zinc-300 dark:bg-zinc-700" />
          </li>
          <li aria-current="page" className="text-zinc-900 dark:text-zinc-100">
            {breadcrumb}
          </li>
        </ol>
      </nav>

      <h1 className="h-display text-zinc-900 dark:text-zinc-50 mt-4">{title}</h1>
    </div>
  );
}
