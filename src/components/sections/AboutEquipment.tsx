import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { ImageWithFallback } from '../ui/image-with-fallback';

const equipment = [
  { title: 'Швейцарский микроскоп Zeiss', img: '/images/clinic/equipment/eq-1.webp' },
  { title: 'Интраоральный сканер Primescan', img: '/images/clinic/equipment/eq-2.webp' },
  { title: 'Компьютерная томография (КЛКТ)', img: '/images/clinic/equipment/eq-3.webp' },
  { title: 'Аппарат анестезии Quick Sleeper', img: '/images/clinic/equipment/eq-4.webp' },
  { title: 'Система отбеливания Flash', img: '/images/clinic/equipment/eq-5.webp' },
];

export function AboutEquipment() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const arrowClass =
    'w-12 h-12 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all hover:border-amber-500 hover:text-amber-500 active:scale-95';

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <FadeIn>
          <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
            <div>
              <SectionBadge className="mb-4">Оборудование</SectionBadge>
              <h2 className="h-section text-zinc-900 dark:text-zinc-50">
                Технологии мирового уровня
              </h2>
            </div>
            <div className="hidden md:flex gap-3 shrink-0">
              <button type="button" onClick={scrollPrev} aria-label="Предыдущее" className={arrowClass}>
                <ArrowLeft size={20} strokeWidth={1.75} />
              </button>
              <button type="button" onClick={scrollNext} aria-label="Следующее" className={arrowClass}>
                <ArrowRight size={20} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </FadeIn>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5 lg:gap-6">
            {equipment.map((item, i) => (
              <div
                key={i}
                className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_38%] lg:flex-[0_0_31%] min-w-0"
              >
                <div className="bg-card dark:bg-zinc-900 rounded-[2rem] border border-black/[0.04] dark:border-white/[0.06] overflow-hidden h-full">
                  <ImageWithFallback
                    src={item.img}
                    alt={item.title}
                    label="Фото оборудования"
                    className="aspect-[4/3]"
                  />
                  <div className="p-6">
                    <h3 className="text-base lg:text-lg font-medium text-zinc-900 dark:text-zinc-50 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden flex justify-center gap-3 mt-8">
          <button type="button" onClick={scrollPrev} aria-label="Предыдущее" className={arrowClass}>
            <ArrowLeft size={20} strokeWidth={1.75} />
          </button>
          <button type="button" onClick={scrollNext} aria-label="Следующее" className={arrowClass}>
            <ArrowRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
