import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BeforeAfterSlider } from '../ui/before-after-slider';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';

interface WorkCase {
  title: string;
  tags: string[];
  /** Фото «до» и «после». Пусто — покажется тёмная заглушка. TODO: реальные снимки. */
  before?: string;
  after?: string;
}

const cases: WorkCase[] = [
  {
    title: 'Эстетическая реставрация',
    tags: ['#эстетика', '#виниры', '#реставрация'],
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=900',
    after: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Имплантация',
    tags: ['#хирургия', '#имплантация', '#all-on-4'],
    before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=900',
    after: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Ортодонтическое лечение',
    tags: ['#ортодонтия', '#элайнеры'],
    before: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=900',
    after: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=900',
  },
];

/**
 * Блок «Истории преображения» — тёмная секция с кейсами.
 * Каждая карточка: слайдер «До / После», название, теги и ссылка на кейс.
 * Не путать с компонентом Reviews (отзывы пациентов с Google Maps).
 */
export function Sample() {
  return (
    <section id="sample" className="pt-24 pb-24 bg-[#041B39] overflow-hidden relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">

        <div className="mb-12 lg:mb-16 max-w-2xl">
          <FadeIn>
            <SectionBadge className="mb-4 border-white/15 text-zinc-300">Кейсы</SectionBadge>
          </FadeIn>
          <FadeIn>
            <h2 className="h-section text-white mb-4">Истории преображения</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lead text-zinc-400">
              Результаты наших врачей и честные эмоции тех, кто уже доверил нам свою улыбку.
              Потяните ползунок, чтобы увидеть, как было «до» и стало «после».
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((item, idx) => (
            <React.Fragment key={item.title}>
              <FadeIn delay={0.05 * idx} direction="up">
                <div className="flex h-full flex-col rounded-3xl bg-white/[0.04] border border-white/10 p-4">
                  <BeforeAfterSlider
                    beforeSrc={item.before}
                    afterSrc={item.after}
                    aspectClass="aspect-[4/5]"
                  />
                  <div className="flex flex-1 flex-col px-2 pt-5">
                    <h3 className="text-2xl font-medium text-white mb-4">{item.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/services"
                      className="mt-6 inline-flex items-center gap-1.5 self-end text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
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
