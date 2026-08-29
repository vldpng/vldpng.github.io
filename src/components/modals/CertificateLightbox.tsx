import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type Certificate } from '../../data/doctors';

/**
 * Просмотр сертификата в полный размер.
 *
 * В ленте на странице врача плитка высотой 240px — прочитать на ней текст
 * диплома нельзя, а сканы приходят по 2100–3400px по большей стороне. Отсюда
 * отдельное окно: клик по плитке открывает скан во весь экран.
 *
 * Своё, а не ContactModal: там форма заявки со своим контекстом и состоянием,
 * здесь же нужно листание и подгонка картинки под вьюпорт. Общими остаются
 * повадки диалога — Escape, ловушка фокуса, возврат фокуса, блокировка
 * прокрутки фона.
 */
export function CertificateLightbox({
  items,
  index,
  doctorName,
  onClose,
  onNavigate,
}: {
  items: Certificate[];
  /** Индекс открытого сертификата; null — окно закрыто. */
  index: number | null;
  doctorName: string;
  onClose: () => void;
  /**
   * Принимает и число, и функцию от прежнего индекса — как setState. Функция
   * нужна клавиатуре: две стрелки в одном тике React сбатчит, и оба
   * обработчика прочитали бы один и тот же индекс до перерисовки.
   */
  onNavigate: (next: number | ((prev: number | null) => number)) => void;
}) {
  const isOpen = index !== null;
  const current = isOpen ? items[index] : undefined;

  const dialogRef = useRef<HTMLDivElement>(null);
  // Плитка, с которой открыли окно: после закрытия фокус обязан вернуться
  // туда, иначе клавиатурный посетитель окажется в начале страницы.
  const openerRef = useRef<HTMLElement | null>(null);

  // Колбэки держим в ref: обработчик клавиш вешается один раз на открытие, и
  // через замыкание он видел бы функции, актуальные на момент подписки.
  const navRef = useRef({ onNavigate, onClose, total: items.length });
  navRef.current = { onNavigate, onClose, total: items.length };

  useEffect(() => {
    if (!isOpen) return;

    openerRef.current = document.activeElement as HTMLElement | null;

    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    const onKeyDown = (e: KeyboardEvent) => {
      const nav = navRef.current;
      if (e.key === 'Escape') {
        nav.onClose();
        return;
      }
      // Листание по кругу: на краях перескакиваем к другому концу, иначе
      // стрелка молча перестаёт работать и это читается как поломка.
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const step = e.key === 'ArrowLeft' ? -1 : 1;
        nav.onNavigate((prev) => ((prev ?? 0) + step + nav.total) % nav.total);
        return;
      }
      if (e.key !== 'Tab') return;

      const list = focusable();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      // Замыкаем круг вручную: браузер иначе уводит фокус за пределы диалога.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    dialogRef.current?.focus();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'unset';
      openerRef.current?.focus();
    };
    // Зависимость только от факта открытия: при листании подписку пересоздавать
    // не нужно — свежий индекс обработчик берёт из navRef.
  }, [isOpen]);

  // Уважаем системную настройку: при включённом «уменьшить движение» окно
  // просто появляется, без наезда и масштабирования.
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const navButtonClass =
    'pointer-events-auto absolute top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  return (
    <AnimatePresence>
      {isOpen && current && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4 sm:p-8">
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="pointer-events-auto absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={20} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate((index - 1 + items.length) % items.length)}
                  aria-label="Предыдущий сертификат"
                  className={`${navButtonClass} left-2 sm:left-6`}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate((index + 1) % items.length)}
                  aria-label="Следующий сертификат"
                  className={`${navButtonClass} right-2 sm:right-6`}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Сертификат ${index + 1} из ${items.length} — ${doctorName}`}
              tabIndex={-1}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={reduced ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0 }}
              className="pointer-events-auto flex max-w-full flex-col items-center gap-4 outline-none"
            >
              {/* key на картинке: без него при листании React переиспользует
                  тот же <img>, и до загрузки следующего скана на экране
                  остаётся предыдущий — переход выглядит как подмена. */}
              <motion.img
                key={current.src}
                initial={reduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                src={current.src}
                alt={current.title ?? `Сертификат — ${doctorName}`}
                // Высота ограничена вьюпортом за вычетом места под подпись и
                // счётчик, ширина — шириной экрана: скан вписывается целиком
                // при любой ориентации, вертикальной или горизонтальной.
                className="max-h-[78svh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="text-center">
                {current.title && (
                  <p className="text-sm text-white/90 max-w-prose">{current.title}</p>
                )}
                {items.length > 1 && (
                  <p className="mt-1 font-mono text-xs tabular-nums text-white/50">
                    {index + 1} / {items.length}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
