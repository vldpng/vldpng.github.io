import React from 'react';
import { cn } from '@/lib/utils';
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

// Раскладка bento: крупное фото слева на две строки, остальные — разными размерами.
const bento = [
  'col-span-2 sm:col-span-4 sm:row-span-2',
  'col-span-1 sm:col-span-2',
  'col-span-1 sm:col-span-2',
  'col-span-1 sm:col-span-3',
  'col-span-1 sm:col-span-3',
];

export function AboutInterior() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <FadeIn>
          <div className="mb-10 lg:mb-14">
            <SectionBadge>Интерьер</SectionBadge>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-6 auto-rows-[160px] sm:auto-rows-[190px] lg:auto-rows-[230px] gap-4 lg:gap-6">
            {interior.map((src, i) => (
              <ImageWithFallback
                key={i}
                src={src}
                alt={`Интерьер клиники RoyalDent ${i + 1}`}
                label="Фото интерьера"
                className={cn('h-full w-full rounded-[2rem]', bento[i] ?? '')}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
