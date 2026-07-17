import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MouseEvent } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Обработчик клика для якорной ссылки на главной (например, /#reviews).
 * Если пользователь уже на главной — плавно скроллит к секции по id
 * (учитывая scroll-mt-* для компенсации sticky-хедера).
 * Если на другой странице — ничего не делает, и Link/<a> отрабатывает как обычно
 * (переход на главную + скролл в ScrollToTop).
 */
export function handleHashClick(hash: string) {
  return (e: MouseEvent) => {
    if (window.location.pathname === '/') {
      const id = hash.replace(/^#/, '');
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
}
