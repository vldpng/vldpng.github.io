import React from 'react';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';

// Бренды-партнёры (текстовые логотипы — замените на реальные при наличии).
const partners = [
  'Straumann',
  'MegaGen',
  'Dentsply Sirona',
  'Carl Zeiss',
  'Nobel Biocare',
  'Ivoclar Vivadent',
  '3M ESPE',
];

export function Partners() {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <style>{`
        @keyframes partners-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .partners-track {
          animation: partners-marquee 32s linear infinite;
        }
        .partners-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <FadeIn>
          <SectionBadge className="mb-4">Партнёры</SectionBadge>
          <h2 className="h-section text-zinc-900 dark:text-zinc-50">С кем мы работаем</h2>
          <p className="text-lead text-zinc-500 dark:text-zinc-400 mt-5 max-w-2xl">
            Используем материалы и оборудование ведущих мировых производителей.
          </p>
        </FadeIn>
      </div>

      {/* Бегущая строка */}
      <div className="mt-12 lg:mt-16 relative [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <div className="partners-track flex items-center gap-12 lg:gap-20 w-max">
          {[...partners, ...partners].map((name, i) => (
            <span
              key={i}
              className="text-2xl lg:text-4xl font-semibold tracking-tight text-zinc-300 dark:text-zinc-700 hover:text-amber-500 dark:hover:text-amber-500 transition-colors whitespace-nowrap select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
