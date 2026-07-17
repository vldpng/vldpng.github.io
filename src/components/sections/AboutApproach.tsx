import React from 'react';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { ImageWithFallback } from '../ui/image-with-fallback';

const approach = [
  {
    title: 'Инновационные технологии',
    text: 'Клиника RoyalDent оснащена передовым оборудованием с использованием современных технологий, обеспечивая точность, эффективность и комфорт во всех видах стоматологических процедур.',
  },
  {
    title: 'Команда экспертов',
    text: 'Наши специалисты не только обладают многолетним опытом, но и постоянно совершенствуют свои навыки через обучение и участие в международных конференциях.',
  },
  {
    title: 'Значимый медицинский опыт',
    text: 'Наша клиника предоставляет эксклюзивный уровень заботы о здоровье, опираясь на 15-летний опыт и профессиональную компетентность в области стоматологии.',
  },
  {
    title: 'Современные методики',
    text: 'Мы всегда следим за последними тенденциями и инновациями в стоматологии, чтобы предоставлять вам доступ к самым современным и эффективным методикам лечения.',
  },
];

export function AboutApproach() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <FadeIn>
          <SectionBadge className="mb-4">Наш подход</SectionBadge>
          <h2 className="h-section text-zinc-900 dark:text-zinc-50 max-w-3xl">
            Почему пациенты выбирают нас
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mt-14 lg:mt-20 items-start">
          {/* Текстовые пункты */}
          <div className="space-y-8 lg:space-y-10 order-2 md:order-1">
            {approach.map((item, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.05}>
                  <div className="flex gap-5">
                    <span className="text-amber-500 font-semibold text-lg shrink-0 w-9 pt-0.5">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg lg:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>

          {/* Правая колонка: крупный слоган + фото 16:9 (липкая) */}
          <div className="order-1 md:order-2 lg:sticky lg:top-28">
            <FadeIn direction="left">
              <p className="text-2xl md:text-3xl lg:text-[34px] font-medium tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.25] mb-8">
                Индивидуальный подход и забота о пациенте —{' '}
                <span className="text-amber-500">основа каждого приёма.</span>
              </p>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                alt="Клиника RoyalDent"
                label="Фото клиники · 16:9"
                className="aspect-video rounded-[2rem] shadow-[0_24px_60px_-24px_rgb(58,58,58,0.3)]"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
