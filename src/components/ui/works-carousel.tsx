import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WorkItem {
  title: string;
  category?: string;
  image: string;
}

export function WorksCarousel({ items }: { items: WorkItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    startIndex: 0,
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.scrollTo(0, true);
    onSelect();
    // Повторно пересчитываем размеры после завершения входных анимаций,
    // чтобы центрирование не сбивалось из-за transform на родителе.
    const t = setTimeout(() => {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
    }, 400);
    return () => {
      clearTimeout(t);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const n = items.length;
  const leftIdx = (selected - 1 + n) % n;
  const rightIdx = (selected + 1) % n;

  return (
    <div>
      <div
        ref={emblaRef}
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]"
      >
        <div className="flex items-center pt-16 pb-24">
          {items.map((item, idx) => {
            const isActive = idx === selected;
            const tilt = isActive
              ? ''
              : idx === leftIdx
                ? '-rotate-[4deg]'
                : idx === rightIdx
                  ? 'rotate-[4deg]'
                  : '';
            return (
              <div
                key={idx}
                className="flex-[0_0_72%] sm:flex-[0_0_50%] md:flex-[0_0_42%] lg:flex-[0_0_34%] min-w-0 px-3"
              >
                <div
                  className={cn(
                    'relative aspect-[3/4] rounded-[1.75rem] overflow-hidden transition-all duration-500 ease-out origin-bottom',
                    isActive
                      ? 'scale-100 z-10 shadow-[0_24px_60px_-18px_rgb(58,58,58,0.45)]'
                      : 'scale-[0.84] opacity-80',
                    tilt,
                  )}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Навигация — по центру снизу */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Предыдущая работа"
          className="w-12 h-12 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all hover:border-amber-500 hover:text-amber-500 active:scale-95"
        >
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Следующая работа"
          className="w-12 h-12 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all hover:border-amber-500 hover:text-amber-500 active:scale-95"
        >
          <ArrowRight size={20} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
