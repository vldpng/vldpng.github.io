import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookingModal } from '../../context/BookingModalContext';

// Фото клиники для карусели (лежат в public/images/clinic).
// Текст hero статичный — меняются только снимки.
const images = [
  '/images/clinic/IMG_4273.jpg_2K_202607182302.webp',
  '/images/clinic/IMG_4279.jpg_2K_202607182323.webp',
  '/images/clinic/IMG_4281.jpg_2K_202607182323.webp',
];

const features = [
  'Индивидуальный подход',
  'Безболезненно',
  'Цифровой протокол',
  'Комфортное лечение',
];

const AUTOPLAY_MS = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const { openModal } = useBookingModal();
  const total = images.length;

  const goTo = useCallback((next: number) => {
    setIndex((next + total) % total);
  }, [total]);

  // Автопрокрутка; сбрасывается при любой смене слайда (в т.ч. ручной).
  useEffect(() => {
    const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, goTo]);

  return (
    <section className="relative overflow-hidden bg-zinc-50">
      {/* ───────── Фото. На мобильных — во весь экран (фон),
          на desktop — правая часть со скруглённым левым краем. ───────── */}
      <div className="absolute top-0 -bottom-0.5 left-0 right-0 lg:left-auto lg:right-0 lg:w-[57%] z-0 overflow-hidden">
        {images.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.06 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        ))}
        {/* Затемнение для читаемости белого текста (мобильные) */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
      </div>

      <div className="relative z-10 max-w-[100rem] px-6 md:px-[50px] lg:pl-8">
        <div className="grid lg:grid-cols-2 items-center gap-10 min-h-[100svh] lg:min-h-[calc(100svh-2rem)] py-32 lg:py-0">

          {/* ───────── Текст + преимущества ───────── */}
          <div className="relative">
            {/* Матовая полупрозрачная панель за текстом (desktop):
                белое стекло с равномерным размытием фона по всей площади. */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -left-20 -top-14 -bottom-14 -right-[18%] rounded-[2rem] border border-white/60 bg-white/55 backdrop-blur-2xl shadow-[0_40px_100px_-40px_rgba(4,27,57,0.4)]"
            />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
            }}
            className="relative flex flex-col items-start max-w-2xl lg:max-w-3xl lg:pl-8 mt-16 sm:mt-24 lg:mt-0"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-display italic text-4xl md:text-5xl lg:text-6xl text-[#FEF9EF] lg:text-zinc-900 whitespace-nowrap"
            >
              Найди свою улыбку
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lead text-[#FEF9EF]/85 lg:text-zinc-500 max-w-[46ch] lg:max-w-[54ch] mt-6"
            >
              Установка виниров с минимальной обточкой зуба. Вашу будущую улыбку
              вы можете увидеть ещё до начала лечения.
            </motion.p>

            {/* Преимущества — 2 колонки, оранжевые чек-иконки.
                Проявляются по очереди, выезжая слева (stagger от контейнера). */}
            <motion.ul
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
              }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4"
            >
              {features.map((label) => (
                <motion.li
                  key={label}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 text-[15px] font-medium text-[#FEF9EF] lg:text-zinc-900"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {label}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA — только в мобильной версии (на desktop кнопка есть в шапке) */}
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={openModal}
              className="lg:hidden btn-sweep mt-10 w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-full text-base font-medium shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              Записаться на приём
            </motion.button>
          </motion.div>
          </div>

          {/* Правая колонка — распорка (фото абсолютное на desktop) */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* ───────── Индикатор слайдов: крупные цифры + кликабельная линия.
          Вынесен на уровень секции — позиционируется в % от всей ширины,
          чтобы стоять внутри фото (правые 57%) на любой ширине экрана. ───────── */}
      <div className="absolute bottom-8 lg:bottom-12 left-1/2 lg:left-[71.5%] -translate-x-1/2 z-20 flex items-center gap-4">
        <span className="font-mono text-xl font-bold tabular-nums text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
          01
        </span>
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Слайд ${i + 1}`}
              aria-current={i === index}
              className="group py-3 -my-3"
            >
              <span
                className={cn(
                  'block h-[3px] rounded-full transition-all duration-300',
                  i === index
                    ? 'w-12 bg-white'
                    : 'w-6 bg-white/50 group-hover:bg-white/80',
                )}
              />
            </button>
          ))}
        </div>
        <span className="font-mono text-xl font-bold tabular-nums text-white/70 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
          {String(total).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
