import React from 'react';
import { Seo } from '../components/Seo';
import { Faq } from '../components/sections/Faq';
import { FadeIn } from '../components/ui/fade-in';
import { PriceList } from '../components/ui/price-list';
import { ServiceHero } from '../components/ui/service-hero';
import { serviceHeroes } from '../data/serviceHeroes';
import { useContactModal } from '../context/ContactModalContext';
import { usePriceRows, type PriceRef } from '../lib/usePriceRows';

/**
 * Посадочная страница «Лечение дёсен аппаратом Vector».
 *
 * Занимает адрес /services/vector вместо общего шаблона ServicePage: материал
 * длинный, со своей вёрсткой — разбор отличий от обычной гигиены, показания и
 * противопоказания в две колонки и полоса-призыв с оборудованием клиники.
 *
 * Цены не дублируются в коде, а выбираются из категории «Профессиональная
 * гигиена» общего прайса — правка через панель администратора видна и здесь,
 * и на /prices.
 */

/** Фирменный синий: тот же, что у подзаголовка баннера (ui/service-hero). */
const BRAND_BLUE = 'text-[#2F6BD8]';

const PRICE_REFS: PriceRef[] = [
  {
    category: 'Профессиональная гигиена',
    name: 'Лечение 1-го пародонтального кармана системой Vector',
    note: 'Точечная обработка, когда воспаление затрагивает отдельные карманы',
  },
  {
    category: 'Профессиональная гигиена',
    name: 'Лечение 1 челюсти системой Vector',
    note: 'Полная обработка пародонтальных карманов верхней или нижней челюсти',
  },
  {
    category: 'Профессиональная гигиена',
    name: 'Лечение 2-х челюстей системой Vector',
    note: 'Обе челюсти за курс лечения — при генерализованном пародонтите',
  },
];

/** Когда применяется метод — маркированный список во второй секции. */
const INDICATIONS = [
  'при наличии пародонтальных карманов по результатам осмотра и измерения;',
  'как этап комплексного лечения заболеваний пародонта;',
  'как поддерживающая терапия после основного лечения пародонтита.',
];

/** Состояния, при которых процедуру откладывают до подготовки. */
const CONTRAINDICATIONS = [
  'есть острое воспаление с выраженной болезненностью и отёком;',
  'наблюдается тяжёлое общее состояние пациента;',
  'отмечаются нарушения свёртываемости крови.',
];

/**
 * Вопросы собраны из фактов, которые уже есть на странице (задача метода,
 * отличие от гигиены, показания, ограничения) и из прайса — так блок не
 * добавляет к сайту утверждений, которых клиника не давала.
 */
const VECTOR_FAQ = [
  {
    q: 'Что такое лечение дёсен аппаратом Vector?',
    a: 'Это щадящая обработка тканей пародонта и пародонтальных карманов ультразвуком и специальной суспензией. Метод аккуратно убирает бактериальный налёт и зубные отложения в зоне воспаления и создаёт условия, чтобы дёсны могли спокойно восстановиться.',
  },
  {
    q: 'Чем Vector отличается от обычной профессиональной гигиены?',
    a: 'Во время обычной гигиены стоматолог-гигиенист обрабатывает поверхности зубов ультразвуком и AirFlow. Vector позволяет более деликатно обработать поддесневую зону и пародонтальные карманы, где часто сохраняется воспаление.',
  },
  {
    q: 'Сколько стоит лечение дёсен системой Vector?',
    a: 'Лечение одного пародонтального кармана — 30 €, одной челюсти — 250 €, обеих челюстей — 350 €. Точный объём врач определяет после осмотра и измерения карманов.',
  },
  {
    q: 'Кому показано лечение аппаратом Vector?',
    a: 'Основное показание — пародонтит различной степени выраженности с наличием пародонтальных карманов. Метод применяют как этап комплексного лечения заболеваний пародонта и как поддерживающую терапию после основного лечения.',
  },
  {
    q: 'Всегда ли нужен Vector при воспалении дёсен?',
    a: 'Нет. Если пародонтальных карманов нет и воспаление ограничено краем десны, обычно достаточно профессиональной гигиены без применения Vector.',
  },
  {
    q: 'В каких случаях процедуру приходится отложить?',
    a: 'Процедуру переносят или проводят после подготовки при остром воспалении с выраженной болезненностью и отёком, при тяжёлом общем состоянии пациента и при нарушениях свёртываемости крови. После предварительной подготовки лечение проходит безопасно и без осложнений.',
  },
  {
    q: 'Можно ли проводить Vector при беременности или с кардиостимулятором?',
    a: 'Такие ситуации требуют аккуратного планирования: врач оценивает общее состояние здоровья и ситуацию в полости рта, и решение принимается индивидуально на консультации.',
  },
];

/** Кнопка записи — повторяется в первой секции и под прайсом. */
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

/**
 * Полоса-призыв «Доверьте нам вашу улыбку».
 *
 * Идёт от края до края экрана, поэтому стоит вне контейнера страницы —
 * внутренний блок сам держит ту же максимальную ширину, что и остальные
 * секции, чтобы заголовок не убегал от текста выше.
 *
 * Фон — фирменный паттерн с коронами, по краям вырезки оборудования клиники.
 * Слой паттерна размыт и выходит за границы секции на -inset-8: размытие
 * съедает кромки, и без запаса по краям полосы появились бы светлые каёмки.
 * Снимки скрыты на телефоне: там ширины хватает только на заголовок с
 * кнопкой, а по краям вырезки наезжали бы на текст.
 */
function TrustBanner() {
  const { openModal } = useContactModal();
  return (
    <FadeIn>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -inset-8 bg-repeat blur-[2px] dark:opacity-20"
          style={{ backgroundImage: 'url(/images/vector/backgroundlogo.webp)' }}
        />

        <img
          src="/images/vector/okuliary.webp"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[26%] max-w-[380px] h-auto"
          loading="lazy"
        />
        <img
          src="/images/vector/pezohirurgiya.webp"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[30%] max-w-[440px] h-auto"
          loading="lazy"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24 flex flex-col items-center text-center">
          {/* Белое свечение по контуру букв: паттерн под заголовком пёстрый,
              и без него тонкие штрихи серифа тонули в коронах. */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50 max-w-[18ch] mb-10 drop-shadow-[0_2px_18px_rgba(255,255,255,0.95)]">
            Доверьте нам вашу{' '}
            <span className="italic bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              улыбку!
            </span>
          </h2>
          <button
            type="button"
            onClick={openModal}
            className="btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-9 py-3.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            Записаться на консультацию
          </button>
        </div>
      </section>
    </FadeIn>
  );
}

export function VectorPage() {
  const priceRows = usePriceRows(PRICE_REFS);

  return (
    // pt-28 отводит место под плавающую шапку: баннер начинается под меню.
    <main className="pt-28">
      <Seo
        title="Лечение дёсен аппаратом Vector в Юрмале"
        description="Аппаратное лечение дёсен системой Vector в Юрмале от 30 €: щадящая обработка пародонтальных карманов ультразвуком. Показания, противопоказания и цены клиники RoyalDent."
        path="/services/vector"
      />

      {/* Шапка — общий компонент, как у всех остальных услуг. Содержимое —
          в data/serviceHeroes. */}
      <ServiceHero content={serviceHeroes.vector} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* --- Что такое Vector --- */}
        <section className="pt-20 md:pt-24 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-10 md:gap-16 items-start">
          <FadeIn>
            <h2 className={`h-section mb-8 ${BRAND_BLUE}`}>Аппаратное лечение дёсен Vector</h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-12">
              Vector — это щадящий метод обработки тканей пародонта и пародонтальных карманов с
              помощью ультразвука и специальной суспензии. Его задача — аккуратно убрать
              бактериальный налёт и зубные отложения в зоне воспаления и создать условия, чтобы
              дёсны могли спокойно восстановиться.
            </p>

            <h2 className={`h-section mb-8 ${BRAND_BLUE}`}>
              Что делает Vector и чем он отличается от обычной чистки
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Во время обычной профессиональной гигиены стоматолог-гигиенист обрабатывает
              поверхности зубов ультразвуком и AirFlow.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-10">
              Vector же позволяет более деликатно обработать поддесневую зону и пародонтальные
              карманы, где часто сохраняется воспаление.
            </p>

            <BookButton />
          </FadeIn>

          <FadeIn delay={0.1}>
            <img
              src="/images/vector/higienist.webp"
              alt="Стоматолог-гигиенист клиники RoyalDent с макетом челюсти и зубной щёткой"
              className="w-full h-auto rounded-2xl shadow-sm"
              loading="lazy"
            />
          </FadeIn>
        </section>

        <EmblemDivider />

        {/* --- Показания и противопоказания --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <FadeIn>
            <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-8">
              Когда применяется лечение аппаратом Vector
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Vector используется при заболеваниях пародонта, когда формируются пародонтальные
              карманы и воспаление затрагивает ткани глубже края десны.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Основное показание — пародонтит различной степени выраженности с наличием
              пародонтальных карманов.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-4">Метод применяется:</p>
            <ul className="space-y-2 list-disc pl-5 marker:text-amber-500 mb-6">
              {INDICATIONS.map((item) => (
                <li key={item} className="text-body text-zinc-600 dark:text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Если пародонтальных карманов нет и воспаление ограничено краем десны, обычно
              достаточно профессиональной гигиены без применения Vector.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-8">
              Противопоказания и ограничения
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Лечение аппаратом Vector относится к малоинвазивным процедурам, однако перед его
              проведением врач обязательно оценивает общее состояние здоровья и ситуацию в полости
              рта.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-4">
              Процедура может быть отложена или проведена после подготовки, если:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-amber-500 mb-6">
              {CONTRAINDICATIONS.map((item) => (
                <li key={item} className="text-body text-zinc-600 dark:text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Также лечение требует аккуратного планирования при беременности, а также у пациентов с
              кардиостимулятором.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              После предварительной подготовки процедура проводится безопасно и без осложнений.
              Решение принимается индивидуально на консультации.
            </p>
          </FadeIn>
        </section>

        <div className="pb-16 md:pb-20" />
      </div>

      {/* Полоса-призыв во всю ширину экрана — поэтому вне контейнера. */}
      <TrustBanner />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <EmblemDivider />

        {/* --- Цены --- */}
        <FadeIn>
          <section className="pb-4">
            <div className="bg-card dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-6 md:p-10 shadow-sm">
              <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-8">
                Цены на лечение дёсен аппаратом Vector в Юрмале
              </h2>
              <PriceList rows={priceRows} />
              <BookButton className="mt-10" />
            </div>
          </section>
        </FadeIn>
      </div>

      <Faq items={VECTOR_FAQ} />
    </main>
  );
}
