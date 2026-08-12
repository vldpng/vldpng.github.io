import React, { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { ImageWithFallback } from '../ui/image-with-fallback';

// TODO: заменить пустые строки на реальные снимки интерьера.
// Пустой путь — ImageWithFallback нарисует подписанную заглушку.
const interior = [
  '/images/clinic/IMG_4273.jpg_2K_202607182302.webp',
  '/images/clinic/IMG_4279.jpg_2K_202607182323.webp',
  '/images/clinic/IMG_4281.jpg_2K_202607182323.webp',
  '',
  '',
  '',
];

export function AboutInterior() {
  const [index, setIndex] = useState(0);
  const total = interior.length;

  const goTo = useCallback((next: number) => setIndex((next + total) % total), [total]);

  // Сдвиг именно через функцию обновления: два быстрых клика по стрелке React
  // объединяет в один рендер, и оба обработчика прочитали бы одно и то же
  // старое значение index — карусель проматывала бы всего один кадр.
  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + total) % total),
    [total],
  );

  const navClass =
    'flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white transition-colors hover:bg-zinc-900 hover:text-white hover:border-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900';

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <FadeIn>
          <div className="mb-10 lg:mb-14">
            <SectionBadge>Интерьер</SectionBadge>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Высота подобрана под сами снимки: они сняты в 1.79 и 1.34, а при
              прежних 484px блок выходил 2.93 по соотношению и object-cover
              срезал почти половину кадра сверху и снизу. Кадры лежат стопкой
              и переключаются прозрачностью — так нет сдвига разметки. */}
          <div
            className="relative h-[340px] sm:h-[480px] lg:h-[660px] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900"
            role="group"
            aria-roledescription="карусель"
            aria-label="Интерьер клиники"
          >
            {interior.map((src, i) => (
              <ImageWithFallback
                key={i}
                src={src}
                alt={`Интерьер клиники RoyalDent ${i + 1}`}
                label="Фото интерьера"
                className={cn(
                  'absolute inset-0 h-full w-full transition-opacity duration-500 ease-out',
                  i === index ? 'opacity-100' : 'opacity-0 pointer-events-none',
                )}
              />
            ))}
          </div>

          {/* Стрелки по краям, точки между ними */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Предыдущее фото"
              className={navClass}
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-2.5">
              {interior.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Фото ${i + 1} из ${total}`}
                  aria-current={i === index}
                  // Увеличенная область нажатия: сама точка 8px, но по такой
                  // цели на телефоне не попасть, поэтому вокруг прозрачный отступ.
                  className="p-2 -m-2"
                >
                  <span
                    className={cn(
                      'block h-2 w-2 rounded-full transition-all duration-300',
                      i === index
                        ? 'bg-zinc-900 dark:bg-white w-6'
                        : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400',
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Следующее фото"
              className={navClass}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
