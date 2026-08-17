import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LANGUAGES, getLanguage, parseLangFromPath } from '../../data/languages';

interface LanguageSwitcherProps {
  /** Панель открывается вниз (шапка) или вверх (мобильное меню). */
  direction?: 'down' | 'up';
  /** Размер под место использования. */
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Переключатель языка.
 *
 * Текущий язык берётся из адреса, а не из состояния: раньше кнопка просто
 * меняла надпись, никуда не ведя, и после перезагрузки страницы подпись
 * разъезжалась с содержимым.
 *
 * Переход — обычной ссылкой с полной перезагрузкой: языковые версии живут
 * под разными basename роутера, и клиентская навигация между ними невозможна.
 *
 * Непереведённые языки показываем неактивными, а не прячем: посетителю видно,
 * что версия планируется, но он не попадёт на страницу с чужим языком.
 */
export function LanguageSwitcher({
  direction = 'down',
  size = 'sm',
  className,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // pathname уже без языкового префикса — его снимает basename роутера.
  const { lang: current } = parseLangFromPath(window.location.pathname);

  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Язык сайта: ${getLanguage(current).label}`}
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 font-semibold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors',
          size === 'sm' ? 'text-xs' : 'text-sm',
        )}
      >
        <Globe size={iconSize} /> {getLanguage(current).label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute bg-card border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl py-2 flex flex-col min-w-[110px] z-50',
            direction === 'down'
              ? 'top-full right-0 mt-4 animate-in fade-in slide-in-from-top-2'
              : 'bottom-full left-0 mb-4 animate-in fade-in slide-in-from-bottom-2',
          )}
        >
          {LANGUAGES.map((lang) => {
            const isCurrent = lang.code === current;

            if (!lang.ready) {
              return (
                <span
                  key={lang.code}
                  aria-disabled="true"
                  className="px-4 py-2 text-xs font-semibold text-left text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
                >
                  {lang.label} <span className="normal-case font-normal">— скоро</span>
                </span>
              );
            }

            return (
              <a
                key={lang.code}
                role="menuitem"
                href={`${lang.prefix}${pathname}`}
                hrefLang={lang.hreflang}
                aria-current={isCurrent ? 'true' : undefined}
                className={cn(
                  'px-4 py-2 text-xs font-semibold text-left transition-colors',
                  isCurrent
                    ? 'text-zinc-900 bg-zinc-50'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50',
                )}
              >
                {lang.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
