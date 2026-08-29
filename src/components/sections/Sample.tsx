import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BeforeAfterSlider } from '../ui/before-after-slider';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';

interface WorkCase {
  title: string;
  tags: string[];
  /** Фото «до» и «после». Пусто — покажется тёмная заглушка. */
  before?: string;
  after?: string;
}

/** Только настоящие работы: стоковые заглушки убраны — на странице клиники
    чужие снимки выдают себя за её результаты. */
const cases: WorkCase[] = [
  {
    title: 'Тотальная реабилитация',
    tags: ['#элайнеры', '#виниры', '#функциональная реабилитация'],
    before: '/images/cases/total_rehabilitation_before.webp',
    after: '/images/cases/total_rehabilitation_after.webp',
  },
];

/**
 * Блок «Истории преображения» — тёмная секция с кейсами.
 * Каждая карточка: слайдер «До / После», название, теги и ссылка на кейс.
 * Не путать с компонентом Reviews (отзывы пациентов с Google Maps).
 */
export function Sample() {
  return (
    <section id="sample" className="pt-24 pb-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">

        <div className="mb-12 lg:mb-16 max-w-2xl">
          <FadeIn>
            <SectionBadge className="mb-4">Кейсы</SectionBadge>
          </FadeIn>
          <FadeIn>
            <h2 className="h-section text-zinc-900 dark:text-white mb-4">Истории преображения</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lead text-zinc-500 dark:text-zinc-400">
              Результаты плодотворной работы врача и техника. Улыбки, которые прошли
              долгий путь для достижения результата.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((item, idx) => (
            <React.Fragment key={item.title}>
              <FadeIn delay={0.05 * idx} direction="up">
                <div className="flex h-full flex-col rounded-3xl bg-card border border-zinc-200 dark:bg-white/[0.04] dark:border-white/10 shadow-sm p-4">
                  <BeforeAfterSlider
                    beforeSrc={item.before}
                    afterSrc={item.after}
                    aspectClass="aspect-[4/5]"
                  />
                  <div className="flex flex-1 flex-col px-2 pt-5">
                    <h3 className="text-2xl font-medium text-zinc-900 dark:text-white mb-4">{item.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:bg-white/5 dark:border-white/10 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/services"
                      className="mt-6 inline-flex items-center gap-1.5 self-end text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    >
                      Смотреть кейс
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
