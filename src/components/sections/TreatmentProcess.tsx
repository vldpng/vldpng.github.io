import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { ImageWithFallback } from '../ui/image-with-fallback';

// Свой кадр под каждый этап. Прежде первые три брали снимки интерьера из
// карусели «О клинике», а последние три стояли пустыми — теперь у всех
// шести собственные фотографии.
const steps = [
  {
    title: 'Первичная консультация',
    text: 'Лечение начинается с консультации: врач выслушивает жалобы и пожелания, собирает медицинский анамнез и проводит осмотр полости рта.',
    image: '/images/clinic/konsultacia.webp',
  },
  {
    title: 'Диагностика',
    text: 'Компьютерная томография, внутриротовое сканирование и фотопротокол. Полная картина вместо догадок — только так план лечения получается точным.',
    image: '/images/clinic/diagnostika.webp',
  },
  {
    title: 'Составление плана лечения',
    text: 'На основе данных диагностики врач готовит индивидуальный план: последовательность этапов, сроки и стоимость каждого из них.',
    image: '/images/clinic/plan_lecheniya.webp',
  },
  {
    title: 'Обсуждение плана с пациентом',
    text: 'Разбираем план вместе: объясняем каждый этап, показываем альтернативы и отвечаем на вопросы. К лечению приступаем только после вашего согласия.',
    image: '/images/clinic/obsuzhdenie.webp',
  },
  {
    title: 'Лечение',
    text: 'Работаем поэтапно, в согласованном графике и с контролем результата на каждом шаге. Все манипуляции проводятся под увеличением.',
    image: '/images/clinic/lechenie.webp',
  },
  {
    title: 'Завершение и рекомендации',
    text: 'Оцениваем результат, даём персональные рекомендации по уходу и составляем график профилактических визитов, чтобы результат сохранился надолго.',
    image: '/images/clinic/zaveshenie.webp',
  },
];

/**
 * Отрезок линии до следующего этапа. Заполняется оранжевым по мере прокрутки:
 * шкала привязана к положению самого отрезка (от появления снизу до ухода за
 * линию 60% экрана), поэтому соседние отрезки складываются в одну непрерывную
 * полосу без общих вычислений и без предположений о высоте карточек.
 */
function TimelineSegment() {
  const ref = useRef<HTMLSpanElement>(null);
  // Оба конца диапазона привязаны к одной линии — 60% высоты экрана. Отрезок
  // начинает заливаться, когда через неё проходит его верх, и заканчивает,
  // когда проходит низ. Поэтому в каждый момент заливается ровно один отрезок:
  // те, что выше, уже полные, те, что ниже, ещё пустые, и фронт идёт сплошняком
  // от первого этапа к последнему.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 60%'],
  });
  // Пружина сглаживает рывки при быстрой прокрутке и колесе с шагом.
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="w-[2px] lg:w-[3px] flex-1 mt-2 lg:mt-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"
    >
      <motion.span
        style={{ scaleY: fill }}
        className="block h-full w-full origin-top rounded-full bg-amber-500"
      />
    </span>
  );
}

/**
 * Кружок с номером этапа. Подсветка тоже привязана к прокрутке, а не к
 * useInView: так при обратной прокрутке номер гаснет синхронно с линией,
 * а не остаётся включённым.
 *
 * Яркое кольцо — отдельный слой поверх приглушённого: анимируется только
 * opacity, поэтому цвета остаются в классах и переживут включение тёмной темы.
 */
function TimelineMarker({ label }: { label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Та же линия 60%, что и у отрезков: кружок загорается ровно в тот момент,
  // когда до него дотягивается заливка предыдущего отрезка, а не раньше.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'start 52%'],
  });
  const glow = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const opacity = useTransform(glow, [0, 1], [0, 1]);

  return (
    <span
      ref={ref}
      className="relative flex h-9 w-9 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-full border-2 border-amber-500/25 bg-card dark:bg-zinc-900 font-semibold lg:text-lg text-amber-700 dark:text-amber-400"
    >
      <motion.span
        aria-hidden="true"
        style={{ opacity }}
        className="absolute -inset-0.5 rounded-full border-2 border-amber-500"
      />
      {label}
    </span>
  );
}

export function TreatmentProcess() {
  return (
    // Сверху на телефоне отступ вдвое меньше: секция идёт сразу за каруселью,
    // и её собственный pb уже даёт воздух — иначе разрыв выходил 128px.
    <section className="pt-8 pb-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <FadeIn>
          <SectionBadge className="mb-4">Процесс</SectionBadge>
          <h2 className="h-section text-zinc-900 dark:text-zinc-50 max-w-3xl">
            Как проходит лечение
          </h2>
          <p className="text-lead text-zinc-600 dark:text-zinc-400 mt-6 max-w-2xl">
            Шесть этапов — от первого осмотра до контрольного визита. Вы всегда знаете,
            что происходит сейчас и что будет дальше.
          </p>
        </FadeIn>

        {/* Нумерованный список: этапы идут строго по порядку, поэтому <ol>,
            а не набор <div> — скринридер объявит и номер, и общее количество. */}
        <ol className="mt-14 lg:mt-20">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[2.25rem_1fr] gap-4 lg:grid-cols-[3rem_1fr] lg:gap-10"
            >
              {/* Колонка таймлайна одна на всех ширинах — на телефоне просто
                  уже. Сетка растягивает её на всю высоту строки, поэтому flex-1
                  у линии сам дотягивает её до следующего кружка, без подгонок
                  под высоту карточки. */}
              <div className="flex flex-col items-center">
                <TimelineMarker label={String(i + 1)} />
                {/* Номер в кружке виден, но вслух позицию проговариваем явно. */}
                <span className="sr-only">Этап {i + 1} из {steps.length}</span>
                {i < steps.length - 1 && <TimelineSegment />}
              </div>

              {/* Отступ снизу живёт на карточке, а не на <li>: у элемента сетки
                  margin учитывается в высоте строки, и линия слева тянется
                  ровно до следующего номера. */}
              <FadeIn delay={0.05 * i} className={cn(i < steps.length - 1 && 'mb-6 lg:mb-8')}>
                <div className="rounded-[2rem] bg-card dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.06] shadow-[0_18px_50px_-30px_rgb(58,58,58,0.45)] p-5 md:p-7">
                  {/* Колонка под фото ограничена по ширине, а не поделена
                      пополам: кадры сняты в 16:9, и при половине карточки
                      (610px на 1440) их собственная высота ушла бы за 340px —
                      втрое выше текста рядом. Текст забирает остаток. */}
                  <div className="grid md:grid-cols-[1fr_minmax(0,420px)] gap-5 lg:gap-10 items-center">
                    {/* Крупнее базовых .h-card и text-base на ступень: рядом
                        стоит кадр в 236px, и текст прежнего размера смотрелся
                        рядом с ним мелко. */}
                    <div>
                      <h3 className="h-card text-2xl md:text-3xl text-zinc-900 dark:text-zinc-50 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {step.text}
                      </p>
                    </div>

                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      label={`Фото · ${step.title}`}
                      // Ровно то соотношение, в котором сняты кадры, — тогда
                      // object-cover ничего не срезает. Прежняя фиксированная
                      // высота md:h-48 при ширине колонки давала рамку 3.18
                      // против 1.78 у снимка и съедала 44% кадра по высоте.
                      className="aspect-[16/9] rounded-[1.5rem] w-full"
                    />
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={0.1}>
          <p className="mt-12 lg:mt-16 text-center text-xl md:text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
            Ваш результат — <span className="text-amber-700 dark:text-amber-400">наш общий успех.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
