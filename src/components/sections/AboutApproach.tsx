import React from 'react';
import { cn } from '@/lib/utils';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { ImageWithFallback } from '../ui/image-with-fallback';

const approach = [
  {
    title: 'Инновационные технологии',
    text: 'Клиника RoyalDent оснащена передовым оборудованием с использованием современных технологий, обеспечивая точность, эффективность и комфорт во всех видах стоматологических процедур.',
    image: '/images/clinic/IMG_4273.jpg_2K_202607182302.webp',
  },
  {
    title: 'Команда экспертов',
    text: 'Наши специалисты не только обладают многолетним опытом, но и постоянно совершенствуют свои навыки через обучение и участие в международных конференциях.',
    image: '/images/clinic/IMG_4279.jpg_2K_202607182323.webp',
  },
  {
    title: 'Значимый медицинский опыт',
    text: 'Наша клиника предоставляет эксклюзивный уровень заботы о здоровье, опираясь на 15-летний опыт и профессиональную компетентность в области стоматологии.',
    image: '/images/clinic/IMG_4281.jpg_2K_202607182323.webp',
  },
  {
    title: 'Современные методики',
    text: 'Мы всегда следим за последними тенденциями и инновациями в стоматологии, чтобы предоставлять вам доступ к самым современным и эффективным методикам лечения.',
    image: '', // TODO: добавить фото — пока рисуется подписанная заглушка
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
          <p className="text-2xl md:text-3xl lg:text-[34px] font-medium tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.25] mt-8 max-w-4xl">
            Индивидуальный подход и забота о пациенте —{' '}
            <span className="text-amber-700 dark:text-amber-400">основа каждого приёма.</span>
          </p>
        </FadeIn>

        {/* Липкая стопка: каждая карточка прилипает чуть ниже предыдущей, поэтому
            при прокрутке пункты наезжают друг на друга и открываются по очереди.
            Отступ top растёт на 1.5rem за карточку — из-под верхней видно край
            предыдущей, иначе стопка читалась бы как одна карточка.
            Только с md: на телефоне карточки высокие, и залипание мешало бы. */}
        <div className="mt-14 lg:mt-20 space-y-6 lg:space-y-8">
          {approach.map((item, i) => (
            <div
              key={i}
              className="md:sticky"
              style={{ top: `calc(7rem + ${i * 1.5}rem)` }}
            >
              <div className="rounded-[2rem] bg-card dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.06] shadow-[0_18px_50px_-30px_rgb(58,58,58,0.45)] p-6 md:p-8 lg:p-10">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Нечётные пункты (02, 04) разворачиваются: фото уходит влево */}
                  <div className={cn(i % 2 === 1 && 'md:order-2')}>
                    <span className="text-amber-700 dark:text-amber-400 font-semibold text-lg">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mt-2 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>

                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    label={`Фото · ${item.title}`}
                    // На телефоне фото во всю ширину — там высота от соотношения.
                    // С md колонка узкая, и 4/3 давало кадр втрое выше текста
                    // рядом, отсюда пустота в текстовой половине: высота
                    // фиксированная и подобрана под текст.
                    className={cn(
                      'aspect-[16/10] md:aspect-auto md:h-52 lg:h-56 rounded-[1.5rem] w-full',
                      i % 2 === 1 && 'md:order-1',
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
