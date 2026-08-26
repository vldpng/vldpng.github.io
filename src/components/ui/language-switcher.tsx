import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LANGUAGES, getLanguage, parseLangFromPath } from '../../data/languages';

/** Флаг в переключателе: пропорции 4:3, поэтому ширина задаётся, высота — авто. */
const flagClass = 'w-5 h-auto rounded-[3px] shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]';

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

  const currentLang = getLanguage(current);

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Язык сайта: ${currentLang.label}`}
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 font-semibold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors',
          size === 'sm' ? 'text-xs' : 'text-sm',
        )}
      >
        {/* Флаг текущего языка вместо глобуса: сразу видно, на какой версии
            сайта посетитель, ещё до того как он прочитает код языка. */}
        <img src={currentLang.flag} alt="" className={flagClass} />
        {currentLang.label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            // min-w вырос со 110px: флаг занял место, и подпись «— скоро»
            // у непереведённых языков переносилась на вторую строку.
            'absolute bg-card border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl py-2 flex flex-col min-w-[150px] whitespace-nowrap z-50',
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
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-left text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
                >
                  {/* Флаг приглушён вместе с подписью: иначе яркая картинка
                      выглядит как активный пункт при неактивном тексте. */}
                  <img src={lang.flag} alt="" className={cn(flagClass, 'opacity-40')} />
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
                  'flex items-center gap-2 px-4 py-2 text-xs font-semibold text-left transition-colors',
                  isCurrent
                    ? 'text-zinc-900 bg-zinc-50'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50',
                )}
              >
                <img src={lang.flag} alt="" className={flagClass} />
                {lang.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
