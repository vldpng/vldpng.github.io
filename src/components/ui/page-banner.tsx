import React from 'react';

interface PageBannerProps {
  /** Заголовок страницы (h1), выводится по центру над контентом. */
  title: string;
}

/**
 * Шапка внутренней страницы: один центрированный заголовок и сразу контент.
 * Формулировки развёрнутые («Цены в клинике RoyalDent»), чтобы у каждой
 * страницы был осмысленный h1 для поисковой выдачи.
 */
export function PageBanner({ title }: PageBannerProps) {
  return (
    <div className="pt-2 pb-8 md:pb-10 text-center">
      <h1 className="h-section text-zinc-900 dark:text-zinc-50">{title}</h1>
    </div>
  );
}
