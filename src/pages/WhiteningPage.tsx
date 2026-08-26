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
 * Посадочная страница «Отбеливание зубов».
 *
 * Занимает адрес /services/whitening вместо общего шаблона ServicePage:
 * материал длинный, со своей вёрсткой — этапы кабинетного протокола Fläsh,
 * домашнее отбеливание и полоса с «белой диетой» во всю ширину.
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
    name: 'Кабинетное отбеливание Fläsh',
    note: 'Отбеливание в клинике под LED-лампой за один визит',
  },
  {
    category: 'Профессиональная гигиена',
    name: 'Домашнее отбеливание',
    note: 'Индивидуальные каппы и гель для самостоятельного применения',
  },
  {
    category: 'Профессиональная гигиена',
    name: 'Профессиональная гигиена с использованием Air-Flow',
    note: 'Обязательный этап перед отбеливанием: снимает налёт и зубной камень, чтобы гель действовал равномерно',
  },
];

const INDICATIONS = [
  {
    title: 'Желтоватый или сероватый оттенок эмали',
    text: 'Процедура позволяет осветлить естественный цвет зубов, если он кажется недостаточно белым, но при этом структура эмали сохранена.',
  },
  {
    title: 'Возрастное потемнение зубов',
    text: 'Со временем эмаль теряет яркость, а дентин становится темнее. Отбеливание помогает вернуть зубам более светлый и ухоженный вид.',
  },
  {
    title: 'Пигментация от пищевых красителей и табака',
    text: 'Пятна от кофе, чая, вина, ягод и курения часто не удаётся полностью удалить обычной профессиональной гигиеной. Отбеливание эффективно устраняет такие изменения цвета.',
  },
  {
    title: 'Лёгкие формы флюороза или медикаментозной пигментации',
    text: 'В рамках комплексного эстетического лечения отбеливание может улучшить общий цвет зубов и сделать оттенок более равномерным. Возможность процедуры оценивается индивидуально на консультации.',
  },
];

const CONTRAINDICATIONS = [
  {
    title: 'Воспалительные процессы в полости рта',
    text: 'При гингивите, стоматите или других активных воспалениях процедуру переносят. Сначала проводится лечение и стабилизация состояния дёсен и слизистой.',
  },
  {
    title: 'Выраженная чувствительность зубов',
    text: 'При повышенной реакции на холодное, горячее или сладкое отбеливание может усилить дискомфорт. В таких случаях сначала проводится курс реминерализующей терапии, после чего вопрос процедуры пересматривается.',
  },
];

const STEPS = [
  {
    title: 'Диагностика и подготовка',
    text: 'Перед процедурой врач осматривает зубы, определяет исходный оттенок по шкале VITA и выполняет фотофиксацию. Обязательный этап — профессиональная гигиена: она удаляет налёт и зубной камень, чтобы отбеливающий гель воздействовал равномерно по всей площади коронки.',
  },
  {
    title: 'Защита дёсен и нанесение геля',
    text: 'Дёсны и мягкие ткани изолируются защитным составом. На поверхность зубов наносится отбеливающий гель (на основе 32% пероксида водорода), который активируется специальной LED-лампой.',
  },
  {
    title: 'Основной этап отбеливания',
    text: 'Процедура проходит в несколько циклов по 20 минут. После каждого цикла врач оценивает результат и при необходимости обновляет гель, постепенно осветляя эмаль до желаемого оттенка.',
  },
  {
    title: 'Завершение процедуры и укрепление эмали',
    text: 'После отбеливания гель удаляется, а на зубы наносится реминерализующий состав с фтором и компонентами, снижающими чувствительность. Врач фиксирует итоговый результат и подробно рассказывает, как сохранить эффект отбеливания.',
  },
];

/** Продукты «белой диеты» — под ограничением после процедуры. */
const WHITE_DIET = [
  'ягоды (строго);',
  'кофе;',
  'вино;',
  'соки;',
  'чай;',
  'лимонады;',
  'некоторые овощи (свекла, морковь);',
  'соусы.',
];

/**
 * Вопросы собраны из фактов, которые уже есть на странице (6–8 тонов, цена
 * 135 €, циклы по 20 минут, белая диета, ограничения методики) — так блок не
 * добавляет к сайту утверждений, которых клиника не давала.
 */
const WHITENING_FAQ = [
  {
    q: 'На сколько тонов светлеют зубы после отбеливания Fläsh?',
    a: 'Кабинетное отбеливание Fläsh осветляет зубы на 6–8 тонов за один визит. Домашняя система работает мягче — от 1 до 4 тонов, поэтому её чаще используют для поддержания результата.',
  },
  {
    q: 'Сколько стоит отбеливание зубов?',
    a: 'Кабинетное отбеливание системой Fläsh — 135 €, набор для домашнего отбеливания — 85 €. Дополнительно потребуется профессиональная гигиена: это обязательный подготовительный этап, без него гель подействует неравномерно.',
  },
  {
    q: 'Сколько времени занимает процедура?',
    a: 'Отбеливание проходит в несколько циклов по 20 минут. К этому добавляется подготовка: осмотр, определение исходного оттенка по шкале VITA, фотофиксация и изоляция дёсен.',
  },
  {
    q: 'Повышается ли чувствительность зубов после отбеливания?',
    a: 'Чтобы этого избежать, сразу после процедуры на зубы наносится укрепляющий состав с нитратом калия и фторидом натрия. Он делает эмаль крепче и снижает риск повышенной чувствительности.',
  },
  {
    q: 'Что нельзя есть и пить после отбеливания?',
    a: 'Некоторое время стоит держаться «белой диеты»: под ограничением ягоды, кофе, чай, вино, соки, лимонады, соусы и окрашивающие овощи вроде свёклы и моркови.',
  },
  {
    q: 'Кому отбеливание не подходит?',
    a: 'При активных воспалениях в полости рта — гингивите, стоматите — процедуру переносят до окончания лечения. При выраженной чувствительности зубов сначала проводится курс реминерализующей терапии, и только потом врач возвращается к вопросу отбеливания.',
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

export function WhiteningPage() {
  const priceRows = usePriceRows(PRICE_REFS);

  return (
    // pt-28 отводит место под плавающую шапку: баннер начинается под меню.
    <main className="pt-28">
      <Seo
        title="Отбеливание зубов в Юрмале"
        description="Безопасное отбеливание зубов в Юрмале системой Fläsh за 135 €: зубы светлее на 6–8 тонов за один визит. Кабинетный и домашний протоколы, показания, этапы и цены клиники RoyalDent."
        path="/services/whitening"
      />

      {/* Шапка — общий компонент, как у всех остальных услуг. Содержимое —
          в data/serviceHeroes. */}
      <ServiceHero content={serviceHeroes.whitening} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* --- О технологии Fläsh --- */}
        <section className="pt-20 md:pt-24 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-10 md:gap-16 items-start">
          <FadeIn>
            <h2 className={`h-section mb-8 ${BRAND_BLUE}`}>
              Что делать, если зубы от природы недостаточно белые?
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-10">
              Наша клиника предлагает Вам передовую немецкую технологию бережного отбеливания Fläsh
              от компании WHITEsmile.
            </p>

            <h3 className={`h-card mb-5 ${BRAND_BLUE}`}>Fläsh</h3>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-10">
              Её основным действующим веществом является пероксид водорода. В состав геля для
              отбеливания входят зеленые пигменты активного хлорофилла, которые позволяют
              контролировать индикацию цвета геля под действием лампы.
            </p>

            <BookButton />
          </FadeIn>

          <FadeIn delay={0.1}>
            <img
              src="/images/whitening/smile-before-after.webp"
              alt="Улыбка пациента до и после отбеливания зубов"
              className="w-full h-auto rounded-2xl shadow-sm"
              loading="lazy"
            />
          </FadeIn>
        </section>

        <EmblemDivider />

        {/* --- Показания и противопоказания --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <FadeIn>
            <h2 className="h-card md:text-3xl text-center text-zinc-900 dark:text-zinc-50 mb-8">
              Показания
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Отбеливание рекомендуется пациентам с здоровыми зубами и дёснами, которые хотят
              улучшить цвет эмали и сделать улыбку более светлой и свежей.
            </p>
            <ul className="space-y-5 list-disc pl-5 marker:text-amber-500">
              {INDICATIONS.map((item) => (
                <li key={item.title} className="text-body text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</span>
                  <br />
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
              В ряде ситуаций отбеливание рекомендуется временно отложить или провести после
              предварительной подготовки. Такой подход позволяет получить прогнозируемый результат и
              избежать нежелательных ощущений.
            </p>
            <ul className="space-y-5 list-disc pl-5 marker:text-amber-500">
              {CONTRAINDICATIONS.map((item) => (
                <li key={item.title} className="text-body text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</span>
                  <br />
                  {item.text}
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>

        <EmblemDivider />

        {/* --- Этапы кабинетного отбеливания --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <FadeIn>
            <h2 className={`h-section mb-8 ${BRAND_BLUE}`}>Этапы кабинетного отбеливания Fläsh</h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-8">
              Кабинетное отбеливание проводится по чёткому и безопасному протоколу, который
              позволяет добиться выраженного результата и сохранить здоровье эмали и дёсен.
            </p>
            {/* Нумерация списка — смысловая: этапы идут строго друг за другом,
                поэтому ol, а не маркированный список с цифрами в тексте. */}
            <ol className="space-y-5 list-decimal pl-5 marker:text-amber-500 marker:font-semibold">
              {STEPS.map((step) => (
                <li key={step.title} className="text-body text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{step.title}</span>
                  <br />
                  {step.text}
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-6">
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Кабинетное отбеливание проводится в клинике лечащим врачом с помощью геля (на основе
              32% пероксида водорода с зелеными пигментами активного хлорофилла) и специальной
              светодиодной лампы, активирующей отбеливающий гель.
            </p>
            <img
              src="/images/whitening/lamp-procedure.webp"
              alt="Отбеливание зубов светодиодной лампой в кресле стоматолога"
              className="w-full h-auto rounded-2xl shadow-sm"
              loading="lazy"
            />
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              После отбеливания используется укрепляющий гель, который делает процедуру более
              комфортной.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Специальная формула с нитратом калия и фторидом натрия делает зубы крепче, помогает
              избежать повышенной чувствительности.
            </p>
          </FadeIn>
        </section>

        <EmblemDivider />

        {/* --- Домашнее отбеливание --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <FadeIn>
            <h2 className={`h-section mb-8 ${BRAND_BLUE}`}>Домашнее отбеливание</h2>
            <p className={`text-lead font-medium mb-8 ${BRAND_BLUE}`}>
              В клинике для Вас изготовят индивидуальные каппы и дадут рекомендации по проведению
              отбеливающих процедур
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Система для домашнего отбеливания действует более мягко, чем для кабинетного, за счёт
              меньшей концентрации пероксида карбамида.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Таким методом возможно повысить белизну зубов от 1 до 4 тонов. Кроме того, мы
              рекомендуем данной системой поддерживать новый тон улыбки после кабинетного
              отбеливания с целью более длительного поддержания полученного результата.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <img
              src="/images/whitening/home-tray.webp"
              alt="Пациентка надевает каппу для домашнего отбеливания зубов"
              className="w-full h-auto rounded-2xl shadow-sm"
              loading="lazy"
            />
          </FadeIn>
        </section>
      </div>

      {/* --- Белая диета --- */}
      <FadeIn>
        {/* Полоса во всю ширину: снимок молочных продуктов сам иллюстрирует
            «белую диету», поэтому он фон, а текст лежит карточкой поверх.
            Снимок очень светлый, и без подложки текст на нём терялся бы. */}
        <section className="relative overflow-hidden">
          <img
            src="/images/whitening/white-diet-background.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-14 md:py-20">
            <div className="max-w-xl rounded-[2rem] bg-card/85 dark:bg-zinc-900/85 backdrop-blur-sm border border-white/60 dark:border-white/10 shadow-lg p-6 md:p-10">
              <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-6">
                Рекомендации после процедуры отбеливания
              </h2>
              <p className="text-body text-zinc-700 dark:text-zinc-200 mb-2">
                После процедуры необходимо стараться поддерживать «белую диету».
              </p>
              <p className="text-body text-zinc-700 dark:text-zinc-200 mb-4">Под ограничением:</p>
              <ul className="space-y-2 list-disc pl-5 marker:text-amber-500 mb-6">
                {WHITE_DIET.map((item) => (
                  <li key={item} className="text-body text-zinc-700 dark:text-zinc-200">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-body text-zinc-700 dark:text-zinc-200">
                После осветления эмали также рекомендовано поддерживать результат качественной
                зубной гигиеной. Для этого следует сменить зубную пасту на средства с малым
                количеством агрессивных абразивов. В состав такой пасты должен входить фтор, чтобы
                поддерживать состояние зубов и предотвращать развитие гиперчувствительности.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* --- Цены --- */}
        <FadeIn>
          <section className="pt-20 md:pt-24">
            <div className="bg-card dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-6 md:p-10 shadow-sm">
              <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-8">
                Цены на отбеливание зубов в Юрмале
              </h2>
              <PriceList rows={priceRows} />
              <BookButton className="mt-10" />
            </div>
          </section>
        </FadeIn>
      </div>

      <Faq items={WHITENING_FAQ} />
    </main>
  );
}
