import React, { useRef, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Syringe,
  Activity,
  HeartPulse,
  Stethoscope,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { MaskIcon } from '../ui/MaskIcon';
import { serviceCategories } from '../../data/services';

// Иконки категорий. Где есть фирменный SVG — используем MaskIcon,
// остальным даём подходящую иконку lucide. Ключ — id категории из services.ts.
const categoryIcons: Record<string, React.ReactNode> = {
  implantaciya: <MaskIcon src="/icons/implant.svg" className="w-6 h-6" />,
  protezirovanie: <MaskIcon src="/icons/dental-crown.svg" className="w-6 h-6" />,
  gnatologiya: <Activity size={24} />,
  hirurgiya: <Syringe size={24} />,
  ortodontiya: <MaskIcon src="/icons/braces.svg" className="w-6 h-6" />,
  terapiya: <MaskIcon src="/icons/decay.svg" className="w-6 h-6" />,
  estetika: <MaskIcon src="/icons/whitening.svg" className="w-6 h-6" />,
  diagnostika: <MaskIcon src="/icons/dental-checkup.svg" className="w-6 h-6" />,
  gigiena: <MaskIcon src="/icons/higien.svg" className="w-6 h-6" />,
  parodontologiya: <HeartPulse size={24} />,
  detskaya: <MaskIcon src="/icons/kids.svg" className="w-6 h-6" />,
};

// Сколько под-услуг показывать в карточке-превью (полный список — на /services).
const PREVIEW_ITEMS = 5;

export function MainServices() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Width of a single set of cards (including the gap before the next set).
  const getSetWidth = () => {
    const el = scrollContainerRef.current;
    if (!el) return 0;
    const boundary = el.children[serviceCategories.length] as HTMLElement | undefined;
    return boundary ? boundary.offsetLeft : el.scrollWidth / 3;
  };

  // Start in the middle copy so the user can scroll both directions seamlessly.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollLeft = getSetWidth();
  }, []);

  // Wrap the scroll position to create an infinite loop.
  // Заворачиваем только у настоящих краёв ленты (0 и конец), а старт стоит
  // в средней копии — так у стрелок есть запас в обе стороны и «назад» работает.
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const setWidth = getSetWidth();
    if (setWidth === 0) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft <= 0) {
      el.scrollLeft += setWidth;
    } else if (el.scrollLeft >= maxScroll) {
      el.scrollLeft -= setWidth;
    }
  };

  const scrollLib = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Прокрутка ровно на одну карточку (ширина первой карточки + gap-6 = 24px).
    const first = el.children[0] as HTMLElement | undefined;
    const amount = first ? first.offsetWidth + 24 : el.clientWidth * 0.5;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-24 overflow-hidden relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">

        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

          <div className="lg:w-[38%] lg:shrink-0">
            <SectionBadge className="mb-4">Услуги</SectionBadge>
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-6">
              Весь путь лечения — <span className="text-zinc-500 dark:text-zinc-400">в одной клинике</span>
            </h2>
            <p className="text-lead text-zinc-600 dark:text-zinc-400 mb-8">
              В клинике RoyalDent вы сможете пройти весь путь лечения — от точной цифровой
              диагностики с использованием ИИ до сложных хирургических операций. Мы
              постоянно добавляем новые услуги и совершенствуем подходы, чтобы вы
              ощущали заботу, комфорт и спокойствие.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center text-zinc-900 dark:text-zinc-100 hover:text-amber-500 transition-colors font-medium text-lg lg:text-xl"
            >
              ( Все услуги )
            </Link>
          </div>

          <div className="relative group flex-1 min-w-0">
            {/* Cards Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[0, 1, 2].flatMap((copy) => serviceCategories.map((service, idx) => (
                <div
                  key={`${copy}-${idx}`}
                  className="snap-start shrink-0 w-[calc(100vw-2rem)] md:w-[calc((100%_-_1.5rem)/2)] flex flex-col bg-card dark:bg-zinc-900 rounded-[2rem] p-8 shadow-sm border border-zinc-100 dark:border-zinc-800"
                >
                <div className="flex justify-between items-start mb-12 gap-4">
                  <Link to="/services" className="group/link flex items-start gap-1.5 h-card text-zinc-900 dark:text-zinc-50 hover:text-amber-500 transition-colors">
                    {service.title}
                    <ChevronRight size={20} className="mt-1 shrink-0 text-zinc-300 dark:text-zinc-600 group-hover/link:text-amber-500 transition-colors" />
                  </Link>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0">
                    {categoryIcons[service.id] ?? <Stethoscope size={24} />}
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  {service.items.length > 0 ? (
                    service.items.slice(0, PREVIEW_ITEMS).map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 text-zinc-500 dark:text-zinc-400 text-sm xl:text-base leading-snug"
                      >
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-sm italic text-zinc-400 dark:text-zinc-500 leading-snug">
                      Услуги этого направления скоро появятся.
                    </div>
                  )}
                </div>
              </div>
              )))}
            </div>

            {/* Scroll Controls */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => scrollLib('left')}
                className="w-12 h-12 bg-card dark:bg-zinc-900 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scrollLib('right')}
                className="w-12 h-12 bg-card dark:bg-zinc-900 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
