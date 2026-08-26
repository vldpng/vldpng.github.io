import React, { Fragment, useState } from 'react';
import { cn } from '@/lib/utils';
import { Seo } from '../components/Seo';
import { Faq } from '../components/sections/Faq';
import { FadeIn } from '../components/ui/fade-in';
import { PriceList } from '../components/ui/price-list';
import { ServiceHero } from '../components/ui/service-hero';
import { serviceHeroes } from '../data/serviceHeroes';
import { useContactModal } from '../context/ContactModalContext';
import { usePriceRows, type PriceRef } from '../lib/usePriceRows';

/**
 * Посадочная страница «Элайнеры» (бывшая карточка «Ортодонтия»).
 *
 * Занимает адрес /services/aligners вместо общего шаблона ServicePage:
 * материал длинный, со своей вёрсткой — видео о материале кап, сравнение
 * с брекетами в две цветные колонки, показания и противопоказания.
 *
 * Цены не дублируются в коде, а выбираются из общего прайса по названию —
 * правка через панель администратора видна и здесь, и на /prices.
 */

/** Фон половин в блоке сравнения: холодный у элайнеров, тёплый у брекетов. */
const ALIGNER_BG = '#DCE9F7';
const BRACES_BG = '#FDF4EC';

const PRICE_REFS: PriceRef[] = [
  { category: 'Диагностика', name: 'Интраоральное 3D сканирование' },
  { category: 'Ортодонтия', name: 'Составление плана лечения на элайнерах' },
  { category: 'Ортодонтия', name: 'Ordoline Basic — одна челюсть' },
  { category: 'Ортодонтия', name: 'Ordoline Basic — две челюсти' },
  { category: 'Ортодонтия', name: 'Ordoline Standart — одна челюсть' },
  { category: 'Ортодонтия', name: 'Ordoline Standart — две челюсти' },
  { category: 'Ортодонтия', name: 'Ordoline Advanced — одна челюсть' },
  { category: 'Ортодонтия', name: 'Ordoline Advanced — две челюсти' },
  { category: 'Ортодонтия', name: 'Удерживающая капа после лечения на элайнерах' },
];

/** Пары строк сравнения: слева элайнеры, справа брекеты. */
const COMPARISON: [string, string][] = [
  [
    'Почти незаметны во время лечения',
    'Заметны во время лечения и часто воспринимаются как менее эстетичное решение',
  ],
  [
    'Обычно сопровождаются меньшей болью и дискомфортом',
    'Более высокий уровень дискомфорта (до 4 раз выше), особенно после активаций',
  ],
  [
    'Более удобная гигиена полости рта и до 4 раз меньшее накопление зубного налёта',
    'Более высокий уровень зубного налёта и повышенный риск воспаления дёсен',
  ],
  [
    'Более низкий риск деминерализации эмали',
    'Более высокая частота возникновения очагов деминерализации эмали («белых пятен»)',
  ],
  [
    'Требуется меньше визитов в клинику, меньше внеплановых посещений и меньше времени в кресле',
    'Более частые визиты для активаций, более высокая вероятность внеплановых посещений и большее общее время пребывания пациента в кресле',
  ],
  [
    'Продолжительность лечения сопоставима или короче при лёгких и умеренных случаях',
    'Продолжительность лечения может быть больше в зависимости от сложности клинического случая',
  ],
];

const INDICATIONS = [
  {
    title: 'Скученность зубов лёгкой и средней степени',
    text: 'Когда зубам не хватает места, они «наплывают» друг на друга. Элайнеры мягко и последовательно создают для них необходимое пространство, возвращая каждому зубу правильное положение и выравнивая зубные ряды.',
  },
  {
    title: 'Промежутки между зубами',
    text: 'Элайнеры хорошо справляются с закрытием щелей между зубами, если промежутки не слишком большие и не связаны с патологией уздечки или серьёзными аномалиями прикуса.',
  },
  {
    title: 'Неправильное положение отдельных зубов',
    text: 'Развороты, небольшие наклоны, смещения вперёд/назад — всё это входит в зону возможностей элайнеров.',
  },
  {
    title: 'Рецидив после ортодонтического лечения',
    text: 'Иногда зубы после ношения брекетов со временем снова начинают смещаться. Элайнеры — это комфортный способ вернуть зубам идеальное положение без возврата к несъёмным конструкциям.',
  },
  {
    title: 'Нарушения прикуса лёгкой степени',
    text: 'В отдельных случаях элайнеры могут корректировать неглубокие дистальные и мезиальные смещения, поверхностный открытый прикус, незначительные перекрёстные контакты, но коррекция прикуса капами всегда требует точной диагностики. Средние и тяжёлые формы аномалий прикуса исправляются с помощью брекет-систем и других методик.',
  },
];

const CONTRAINDICATIONS = [
  {
    title: 'Выраженная патология прикуса',
    text: 'Когда требуются сложные перемещения корней, значительное расширение дуги или коррекция положения челюстей, элайнеры не могут дать предсказуемый результат.',
  },
  {
    title: 'Сильные ротации (повороты) зубов и большие вертикальные перемещения',
    text: 'Элайнеры плохо справляются с вращением зуба вокруг оси и с перемещением вверх/вниз — эти задачи корректнее выполнять брекетами.',
  },
  {
    title: 'Отсутствие многих зубов',
    text: 'Для работы кап нужны точки фиксации. Если зубов мало, элайнерам просто не за что удерживаться для перемещения зубов.',
  },
  {
    title: 'Невозможность соблюдать режим ношения',
    text: 'Элайнеры работают только при условии, что они находятся во рту 21–22 часа в сутки. Если по образу жизни или привычкам вы понимаете, что носить капы так долго не получится, эффективность лечения будет низкой. В таких случаях ортодонт предложит альтернативу, которая лучше вам подойдёт и даст более надёжный и предсказуемый результат.',
  },
];

/**
 * Вопросы собраны из фактов, которые уже есть на странице (режим ношения,
 * цена от 1200 €, удерживающая капа, ограничения методики) — так блок не
 * добавляет к сайту утверждений, которых клиника не давала.
 */
const ALIGNERS_FAQ = [
  {
    q: 'Насколько заметны элайнеры?',
    a: 'Почти незаметны: капы прозрачные и повторяют форму зубов. Это главное отличие от брекетов, которые видны во время всего лечения и часто воспринимаются как менее эстетичное решение.',
  },
  {
    q: 'Сколько часов в сутки нужно носить элайнеры?',
    a: 'От 21 до 22 часов. Снимать капы нужно только на время еды и чистки зубов. Если носить их меньше, лечение затягивается, а результат становится непредсказуемым.',
  },
  {
    q: 'Сколько стоит лечение на элайнерах?',
    a: 'От 1200 € за одну челюсть по программе Ordoline Basic. Итоговая сумма зависит от сложности случая и числа челюстей — врач называет её после диагностики и составления плана лечения.',
  },
  {
    q: 'Можно ли есть и пить с элайнерами?',
    a: 'Ограничений в питании нет: капы снимают на время еды. В этом одно из преимуществ перед брекетами, с которыми часть продуктов приходится исключать.',
  },
  {
    q: 'Что происходит после окончания лечения?',
    a: 'Чтобы зубы не вернулись в прежнее положение, изготавливается удерживающая капа — она указана в прайсе отдельной позицией.',
  },
  {
    q: 'Элайнеры подходят всем?',
    a: 'Нет. При выраженной патологии прикуса, сильных поворотах зубов, больших вертикальных перемещениях или отсутствии многих зубов ортодонт предложит брекеты или другую методику — так результат будет надёжнее.',
  },
];

/** Кнопка записи — повторяется в шапке и под прайсом. */
function BookButton({ className = '' }: { className?: string }) {
  const { openModal } = useContactModal();
  return (
    <button
      type="button"
      onClick={openModal}
      className={`btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-7 py-3 rounded-full text-sm font-medium shadow-md hover:shadow-lg active:scale-95 transition-all ${className}`}
    >
      Записаться на приём
    </button>
  );
}

/**
 * Сравнение элайнеров с брекетами.
 *
 * С md — две колонки одной сеткой (а не два независимых блока): строки 01–06
 * должны стоять напротив друг друга, хотя текст в них разной длины.
 *
 * На узком экране колонки схлопнулись бы в чередование «элайнеры — брекеты —
 * элайнеры…», где сравнивать нечего. Поэтому там показывается только одна
 * сторона, а переключатель выбирает какая. Обе половины остаются в разметке
 * и просто скрываются классом: так поиск видит весь текст независимо от
 * состояния переключателя.
 */
function ComparisonSection() {
  const [showBraces, setShowBraces] = useState(false);

  const alignerRow = showBraces ? 'hidden md:flex' : 'flex';
  const bracesRow = showBraces ? 'flex' : 'hidden md:flex';
  const alignerBlock = showBraces ? 'hidden md:block' : 'block';
  const bracesBlock = showBraces ? 'block' : 'hidden md:block';

  return (
    <section>
      {/* Переключатель только на мобильном. Фон — цвет активной половины,
          чтобы полоса не читалась как отдельный чужеродный блок. */}
      <div
        className="md:hidden flex justify-center px-4 py-6"
        style={{ backgroundColor: showBraces ? BRACES_BG : ALIGNER_BG }}
      >
        <button
          type="button"
          role="switch"
          aria-checked={showBraces}
          aria-label={showBraces ? 'Показать элайнеры Ordoline' : 'Показать брекеты'}
          onClick={() => setShowBraces((v) => !v)}
          className="inline-flex items-center gap-3 rounded-full bg-amber-500 px-4 py-2 text-white shadow-md active:scale-95 transition-transform"
        >
          <span
            aria-hidden="true"
            className={cn('text-sm transition-opacity', showBraces ? 'opacity-60' : 'font-semibold')}
          >
            Элайнеры Ordoline
          </span>
          <span
            aria-hidden="true"
            className="relative h-6 w-11 shrink-0 rounded-full bg-white/30"
          >
            {/* Положение задаётся left, а не translate: у абсолютного
                элемента translate складывается с уже вычисленной статической
                позицией, и кружок уезжал за пределы дорожки на текст. */}
            <span
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left] duration-200',
                showBraces ? 'left-[22px]' : 'left-0.5',
              )}
            />
          </span>
          <span
            aria-hidden="true"
            className={cn('text-sm transition-opacity', showBraces ? 'font-semibold' : 'opacity-60')}
          >
            Брекеты
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className={cn('px-6 md:px-10 lg:px-16 pb-14 pt-4 md:pt-14', alignerBlock)}
          style={{ backgroundColor: ALIGNER_BG }}
        >
          <h2 className="h-section text-center text-zinc-900 mb-6">Элайнеры Ordoline</h2>
          <p className="text-body text-zinc-700">
            Прозрачные съёмные элайнеры, разработанные для комфорта и гибкости в повседневной жизни.
            Они обеспечивают более удобную гигиену полости рта и минимально влияют на привычный образ
            жизни, однако для достижения эффективности требуют дисциплинированного ношения. В
            некоторых клинических случаях для обеспечения точных перемещений зубов могут
            дополнительно использоваться другие ортодонтические методики.
          </p>
        </div>
        <div
          className={cn('px-6 md:px-10 lg:px-16 pb-14 pt-4 md:pt-14', bracesBlock)}
          style={{ backgroundColor: BRACES_BG }}
        >
          <h2 className="h-section text-center text-zinc-900 mb-6">Брекеты</h2>
          <p className="text-body text-zinc-700">
            Несъёмная ортодонтическая система, обеспечивающая постоянный контроль перемещения зубов.
            Особенно эффективна в сложных клинических случаях, однако может в большей степени влиять
            на комфорт, эстетику и повседневный образ жизни пациента.
          </p>
        </div>

        {COMPARISON.map(([aligner, braces], i) => (
          <Fragment key={aligner}>
            <div
              className={cn(
                'gap-4 px-6 md:px-10 lg:px-16 py-8 border-t border-zinc-900/10',
                alignerRow,
              )}
              style={{ backgroundColor: ALIGNER_BG }}
            >
              <span className="text-base font-semibold text-zinc-900 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-lg leading-relaxed text-zinc-800">{aligner}</p>
            </div>
            <div
              className={cn(
                'gap-4 px-6 md:px-10 lg:px-16 py-8 border-t border-zinc-900/10',
                bracesRow,
              )}
              style={{ backgroundColor: BRACES_BG }}
            >
              <span className="text-base font-semibold text-zinc-900 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-lg leading-relaxed text-zinc-800">{braces}</p>
            </div>
          </Fragment>
        ))}

        <p
          className={cn('px-6 md:px-10 lg:px-16 pb-6 pt-6 text-[11px] text-zinc-500', alignerBlock)}
          style={{ backgroundColor: ALIGNER_BG }}
        >
          Использованная информация взята с сайта ordoline.com
        </p>
        <div className={bracesBlock} style={{ backgroundColor: BRACES_BG }} aria-hidden="true" />
      </div>
    </section>
  );
}

/** Разделитель между смысловыми блоками: две линии и фирменный герб. */
function EmblemDivider() {
  return (
    <div className="flex items-center gap-6 py-16" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
      <img src="/brand/emblem.png" alt="" className="h-8 w-auto shrink-0 opacity-90" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
    </div>
  );
}

export function AlignersPage() {
  const priceRows = usePriceRows(PRICE_REFS);

  return (
    // pt-28 отводит место под плавающую шапку: баннер начинается под меню.
    <main className="pt-28">
      <Seo
        title="Лечение на элайнерах в Юрмале"
        description="Исправление прикуса прозрачными элайнерами Ordoline в Юрмале от 1200 €. Показания и противопоказания, сравнение с брекетами, цены клиники RoyalDent."
        path="/services/aligners"
      />

      {/* Шапка — общий компонент, как у всех остальных услуг: раньше у каждой
          посадочной страницы была своя вёрстка, и заголовки с тезисами были
          набраны по-разному. Содержимое и заливка — в data/serviceHeroes. */}
      <ServiceHero content={serviceHeroes.aligners} />

      {/* Ролик о многослойном материале кап — сразу под шапкой, во всю ширину.
          Звука в ролике нет, поэтому он идёт без органов управления: это
          заставка, а не контент, который включают осознанно. */}
      <video
        src="/videos/ordoline.mp4"
        className="w-full h-auto block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Многослойный материал элайнеров Ordoline"
      />

      {/* --- Сравнение с брекетами --- */}
      <ComparisonSection />

      {/* Два снимка встык, без зазора: слева результат с элайнерами,
          справа — с брекетами, в том же порядке, что колонки выше. */}
      <div className="grid grid-cols-2">
        <img
          src="/images/aligners/smile-aligners.webp"
          alt="Улыбка пациента с прозрачными элайнерами"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <img
          src="/images/aligners/smile-braces.webp"
          alt="Улыбка пациента с брекет-системой"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <EmblemDivider />

        {/* --- Показания и противопоказания --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <FadeIn>
            <h2 className="h-card md:text-3xl text-center text-zinc-900 dark:text-zinc-50 mb-8">
              Показания
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Элайнеры подходят не каждому клиническому случаю, но при правильном подборе они
              позволяют аккуратно и предсказуемо изменить положение зубов. Мы рекомендуем носить капы
              при таких нарушениях, как:
            </p>
            <ul className="space-y-5 list-disc pl-5 marker:text-amber-500">
              {INDICATIONS.map((item) => (
                <li key={item.title} className="text-body text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.title}.
                  </span>{' '}
                  {item.text}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="h-card md:text-3xl text-center text-zinc-900 dark:text-zinc-50 mb-8">
              Противопоказания
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Как и у любой методики, у элайнеров есть свои ограничения. Большинство противопоказаний
              — не абсолютные, а относительные. Мы предлагаем другой вариант коррекции прикуса, если
              есть следующие противопоказания:
            </p>
            <ul className="space-y-5 list-disc pl-5 marker:text-amber-500">
              {CONTRAINDICATIONS.map((item) => (
                <li key={item.title} className="text-body text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.title}.
                  </span>{' '}
                  {item.text}
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>

        <EmblemDivider />

        {/* --- Цены --- */}
        <FadeIn>
          <section>
            <div className="bg-card dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-6 md:p-10 shadow-sm">
              <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-8">
                Цены лечения на элайнерах в Юрмале
              </h2>
              <PriceList rows={priceRows} />
              <BookButton className="mt-10" />
            </div>
          </section>
        </FadeIn>
      </div>

      <Faq items={ALIGNERS_FAQ} />
    </main>
  );
}
