import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { ImageWithFallback } from '../ui/image-with-fallback';

const interior = [
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&q=80&w=1200',
];

export function AboutInterior() {
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
              <SectionBadge className="mb-4">Интерьер</SectionBadge>
              <h2 className="h-section text-zinc-900 dark:text-zinc-50">
                Атмосфера, в которой комфортно
              </h2>
            </div>
            <div className="hidden md:flex gap-3 shrink-0">
              <button type="button" onClick={scrollPrev} aria-label="Предыдущее фото" className={arrowClass}>
                <ArrowLeft size={20} strokeWidth={1.75} />
              </button>
              <button type="button" onClick={scrollNext} aria-label="Следующее фото" className={arrowClass}>
                <ArrowRight size={20} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Полноширинная карусель */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 lg:gap-6 px-2 md:px-3">
          {interior.map((src, i) => (
            <div
              key={i}
              className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_42%] min-w-0"
            >
              <ImageWithFallback
                src={src}
                alt={`Интерьер клиники RoyalDent ${i + 1}`}
                label="Фото интерьера"
                className="aspect-[16/10] rounded-[2rem]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Стрелки на мобильных */}
      <div className="md:hidden flex justify-center gap-3 mt-8">
        <button type="button" onClick={scrollPrev} aria-label="Предыдущее фото" className={arrowClass}>
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <button type="button" onClick={scrollNext} aria-label="Следующее фото" className={arrowClass}>
          <ArrowRight size={20} strokeWidth={1.75} />
        </button>
      </div>
    </section>
  );
}
