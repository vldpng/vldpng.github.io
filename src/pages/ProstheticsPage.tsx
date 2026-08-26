import React, { useCallback, useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { Seo } from '../components/Seo';
import { DoctorCard } from '../components/sections/Doctors';
import { Faq } from '../components/sections/Faq';
import { FadeIn } from '../components/ui/fade-in';
import { BlackPlaceholder } from '../components/ui/Placeholder';
import { PriceList } from '../components/ui/price-list';
import { ServiceHero } from '../components/ui/service-hero';
import { serviceHeroes } from '../data/serviceHeroes';
import { useContactModal } from '../context/ContactModalContext';
import { useDoctors } from '../lib/useDoctors';
import { usePriceRows, type PriceRef } from '../lib/usePriceRows';
import { type Doctor } from '../data/doctors';

/**
 * Посадочная страница «Протезирование зубов».
 *
 * Занимает адрес /services/prosthetics вместо общего шаблона ServicePage:
 * материал длинный, со своей вёрсткой (цены, показания в две колонки,
 * витрины видов протезирования, сравнение материалов, примеры работ).
 *
 * Цены не дублируются в коде, а выбираются из категории «Ортопедия» общего
 * прайса — правка через панель администратора видна и здесь, и на /prices.
 */

const PRICE_REFS: PriceRef[] = [
  {
    category: 'Ортопедия',
    name: 'Металлокерамическая коронка',
    note: 'Надёжное решение по доступной цене. Прочный каркас с керамическим покрытием',
  },
  {
    category: 'Ортопедия',
    name: 'Вкладка, накладка из прессованной керамики',
    note: 'Позволяет восстановить зуб максимально естественно и надёжно. Прочная керамика повторяет цвет и форму зуба',
  },
  {
    category: 'Ортопедия',
    name: 'Коронка из диоксида циркония',
    note: 'Современная эстетика и прочность: цирконий полностью имитирует натуральный зуб',
  },
  {
    category: 'Ортопедия',
    name: 'Коронка из диоксида циркония с нанесением керамики',
    note: 'Ещё более естественный внешний вид за счёт многослойной керамики. Максимально близко к природным зубам',
  },
  {
    category: 'Ортопедия',
    name: 'Винир e.max',
    note: 'Тонкая керамическая накладка на зуб для идеальной улыбки. Высокая эстетика',
  },
  {
    category: 'Ортопедия',
    name: 'Винир с повышенной эстетикой',
    note: 'Премиальное решение для самых высоких эстетических требований. Индивидуальная художественная проработка цвета и формы',
  },
  {
    category: 'Ортопедия',
    name: 'Акриловый съёмный протез',
    note: 'Базовое решение для восстановления зубов. Лёгкий и доступный по цене, позволяет жевать и улыбаться',
  },
  {
    category: 'Ортопедия',
    name: 'Бюгельный протез',
    note: 'Съёмная конструкция на металлической дуге. Держится надёжнее акрилового и меньше ощущается во рту',
  },
];

const INDICATIONS = [
  {
    title: 'Отсутствие одного или нескольких зубов',
    text: 'Своевременная установка протезов предотвращает смещение соседних зубов и нарушение прикуса.',
  },
  {
    title: 'Эстетические дефекты',
    text: 'При сколах, изменении цвета или изначально неэстетичной форме зуба протез помогает восстановить естественный вид улыбки.',
  },
  {
    title: 'Полная адентия',
    text: 'Современные технологии и методы имплантации позволяют полностью восстановить зубной ряд и отказаться от неудобных съёмных протезов.',
  },
  {
    title: 'Разрушение коронковой части более чем на 50%',
    text: 'Протез защищает оставшиеся ткани зуба от дальнейшего разрушения и позволяет вновь полноценно им пользоваться.',
  },
  {
    title: 'Повышенная стираемость зубов',
    text: 'Ортопедические конструкции создают «защитный барьер» и останавливают патологическую стираемость зубов.',
  },
];

const CONTRAINDICATIONS = [
  {
    title: 'Острые воспалительные процессы в полости рта',
    text: 'Сначала нужно провести лечение и устранить воспаление, чтобы установка протезов не вызвала осложнений.',
  },
  {
    title: 'Беременность',
    text: 'Рекомендуется отложить плановое лечение до послеродового периода, чтобы обеспечить пациентке максимальную безопасность и комфорт.',
  },
];

const TYPES = [
  {
    title: 'Керамические виниры',
    desc: 'Реставрации для великолепной улыбки',
    image: '/images/prosthetics/type-veneers.webp',
  },
  {
    title: 'Металлокерамика',
    desc: 'Надёжное и доступное восстановление зубов',
    image: '/images/prosthetics/type-metal-ceramic.webp',
  },
  {
    title: 'Коронки из циркония',
    desc: 'Прочный и эстетичный вариант',
    image: '/images/prosthetics/type-zirconia.webp',
  },
  {
    title: 'Съёмные зубные протезы',
    desc: 'Полное или частичное восстановление зубов',
    image: '/images/prosthetics/type-removable.webp',
  },
];

/** Две панели сравнения материалов, работы внутри каждой листаются каруселью. */
const MATERIALS = [
  {
    title: 'Металлокерамика',
    desc: 'Проверенный временем, надёжный метод протезирования зубов после депульпирования и лечения каналов зуба.',
    features: ['доступность', 'прочность', 'долговечность'],
    shots: [
      '/images/prosthetics/metal-ceramic-4.webp',
      '/images/prosthetics/metal-ceramic-1.webp',
      '/images/prosthetics/metal-ceramic-5.webp',
      '/images/prosthetics/metal-ceramic-2.webp',
      '/images/prosthetics/metal-ceramic-3.webp',
    ],
  },
  {
    title: 'Диоксид циркония',
    desc: 'Решение для повышения эстетики.',
    features: ['красота', 'точность', 'гипоаллергенность'],
    shots: [
      '/images/prosthetics/zirconia-1.webp',
      '/images/prosthetics/zirconia-2.webp',
      '/images/prosthetics/zirconia-3.webp',
      '/images/prosthetics/zirconia-4.webp',
    ],
  },
];

/**
 * Примеры работ: по два кадра на случай.
 * `null` — свободный слот, туда позже встанет фотография работы.
 */
const CASES: { title: string; shots: (string | null)[] }[] = [
  {
    title: 'Протезирование передних шести зубов верхней челюсти коронками E.max',
    shots: [null, '/images/prosthetics/case-emax-front.webp'],
  },
  {
    title: 'Восстановление зубов с помощью имплантатов и циркониевых коронок',
    shots: [null, null],
  },
  {
    title: 'Протезирование 4-х жевательных зубов циркониевыми коронками',
    shots: [null, null],
  },
];

/** Маршрут услуги, по которому отбираются ортопеды в секции врачей. */
const SERVICE_ROUTE = '/services/prosthetics';

const PROSTHETICS_FAQ = [
  {
    q: 'Какие коронки лучше сделать на передние зубы?',
    a: 'Для зоны улыбки в первую очередь важна эстетика, поэтому чаще выбирают безметалловые изделия. Если зуб хорошо сохранён и имеется достаточный объём эмали, оптимальным вариантом будет керамика E-max. При более выраженном разрушении используют диоксид циркония — он не уступает E-max по эстетике и долговечности.',
  },
  {
    q: 'Какой материал лучше подходит для восстановления жевательных зубов?',
    a: 'Здесь в приоритете прочность и способность выдерживать высокую нагрузку. Идеальный вариант — диоксид циркония.',
  },
  {
    q: 'Когда нужно менять коронку?',
    a: 'При износе, нарушении фиксации или изменении состояния тканей под ней. При регулярных осмотрах врач подскажет оптимальный момент для замены.',
  },
  {
    q: 'Сколько времени занимает восстановление коронками?',
    a: 'После консультации обычно нужно два визита с интервалом в 7–14 дней. В первое посещение проводится подготовка и обточка, снимаются слепки, устанавливается временная конструкция. На втором приёме мы фиксируем постоянный протез.',
  },
  {
    q: 'Больно ли ставить коронку?',
    a: 'Нет. Процедуры проводятся под местной анестезией.',
  },
  {
    q: 'Что делать, если коронка начала шататься?',
    a: 'Не выбрасывайте протез и обратитесь к ортопеду. Он оценит состояние конструкции и тканей под ней и определит, можно ли снова её поставить или требуется другое решение.',
  },
];

/** Кнопка записи — повторяется в двух местах страницы. */
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
 * Лента работ внутри панели материала.
 *
 * Кадры сняты в разном формате и на разном фоне, поэтому слайд задаёт им
 * общее соотношение сторон: иначе высота панели прыгала бы при листании,
 * а две соседние панели переставали бы совпадать по нижнему краю.
 */
function MaterialCarousel({ shots, title }: { shots: string[]; title: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className="relative">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex">
            {shots.map((src, i) => (
              <div key={src} className="flex-[0_0_100%] min-w-0">
                <img
                  src={src}
                  alt={`${title}, работа ${i + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {[
          { onClick: scrollPrev, label: 'Предыдущее фото', side: 'left-3', Icon: ChevronLeft },
          { onClick: scrollNext, label: 'Следующее фото', side: 'right-3', Icon: ChevronRight },
        ].map(({ onClick, label, side, Icon }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            aria-label={label}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center',
              'bg-card/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700',
              'text-zinc-900 dark:text-zinc-100 shadow-sm transition-colors hover:bg-card dark:hover:bg-zinc-900',
              side,
            )}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {shots.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Фото ${i + 1}`}
            aria-current={i === selected}
            className={cn(
              'h-2 rounded-full transition-all',
              i === selected ? 'w-6 bg-amber-500' : 'w-2 bg-zinc-300 dark:bg-zinc-700',
            )}
          />
        ))}
      </div>
    </div>
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

export function ProstheticsPage() {
  const priceRows = usePriceRows(PRICE_REFS);

  // Ортопедов отбираем по услуге из карточки врача, а не списком имён:
  // добавили направление врачу в админке — он появился и здесь.
  const doctors = useDoctors().filter(
    (d) => !d.support && d.services?.includes(SERVICE_ROUTE),
  );

  return (
    // pt-28 отводит место под плавающую шапку: баннер начинается под меню.
    <main className="pt-28">
      <Seo
        title="Протезирование зубов в Юрмале"
        description="Протезирование зубов в Юрмале: коронки из металлокерамики и диоксида циркония, виниры e.max, вкладки и съёмные протезы. Собственная зуботехническая лаборатория, гарантия 3 года."
        path="/services/prosthetics"
      />

      {/* Шапка — общий компонент, как у всех остальных услуг: раньше у каждой
          посадочной страницы была своя вёрстка, и заголовки с тезисами были
          набраны по-разному. Содержимое — в data/serviceHeroes. */}
      <ServiceHero content={serviceHeroes.prosthetics} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* --- Где пройти протезирование --- */}
        <FadeIn>
          <section className="pt-20 md:pt-24">
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-8">
              Где пройти протезирование в Юрмале?
            </h2>
            <div className="space-y-5 max-w-5xl">
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                Вы можете обратиться в клинику «RoyalDent». Наши услуги включают установку зубных
                протезов с учётом эстетики и функциональности. Опытные врачи, качественные материалы
                и комфортные условия. Запишитесь на консультацию для выбора оптимального варианта
                лечения.
              </p>
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                Наши врачи регулярно проходят обучение и осваивают новые методики, поэтому мы можем
                успешно решать даже самые сложные клинические ситуации. Такой подход позволяет нам
                добиваться предсказуемых и долговечных результатов — это подтверждают отзывы
                пациентов, которые прошли протезирование у нас в клинике.
              </p>
            </div>
          </section>
        </FadeIn>

        <EmblemDivider />

        {/* --- Цены --- */}
        <FadeIn>
          <section>
            <div className="bg-card dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-6 md:p-10 shadow-sm">
              <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-8">
                Цены на протезирование в Юрмале
              </h2>
              <PriceList rows={priceRows} />
            </div>
          </section>
        </FadeIn>

        <EmblemDivider />

        {/* --- Показания и противопоказания --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <FadeIn>
            <h2 className="h-card md:text-3xl text-center text-zinc-900 dark:text-zinc-50 mb-8">
              Показания
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Протезировать зубы важно не только для красивой улыбки, но и для здоровья всей
              зубочелюстной системы. Основные показания к процедуре:
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
              Противопоказания к протезированию корректнее называть временными ограничениями. В этот
              список входят:
            </p>
            <ul className="space-y-5 list-disc pl-5 marker:text-amber-500 mb-6">
              {CONTRAINDICATIONS.map((item) => (
                <li key={item.title} className="text-body text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</span>
                  <br />
                  {item.text}
                </li>
              ))}
            </ul>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Устранив временные противопоказания, мы можем провести протезирование и восстановить
              целостность зубных рядов.
            </p>
          </FadeIn>
        </section>

        {/* --- Виды протезирования --- */}
        <FadeIn>
          <section className="pt-24">
            <h2 className="h-section text-center text-zinc-900 dark:text-zinc-50 mb-12">
              Виды протезирования зубов в стоматологии
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TYPES.map((type) => (
                // Крупнее только на десктопе (lg): на планшете и телефоне
                // карточки и так во всю ширину колонки.
                // Колонка-флекс с mt-auto на фото: описания у видов разной
                // длины (одна строка против двух), и без этого фотографии
                // в соседних карточках стояли бы на разной высоте.
                <div
                  key={type.title}
                  className="flex flex-col rounded-2xl bg-zinc-100 dark:bg-zinc-900 p-2.5 lg:p-3"
                >
                  <div className="px-2 pt-2 pb-3 lg:pt-3 lg:pb-4 text-center">
                    <h3 className="text-sm lg:text-base font-medium text-zinc-900 dark:text-zinc-50">
                      {type.title}
                    </h3>
                    <span className="my-2 block h-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
                    <p className="text-xs lg:text-sm text-zinc-500 dark:text-zinc-400">{type.desc}</p>
                  </div>
                  <img
                    src={type.image}
                    alt={type.title}
                    className="mt-auto w-full h-52 lg:h-72 object-cover rounded-xl shadow-sm"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>

      {/* --- Полоса с записью на приём --- */}
      <FadeIn>
        <section className="relative mt-24 overflow-hidden">
          <img
            src="/images/prosthetics/cta-background.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {/* Фото размытое и светлое — без осветляющей подложки текст на нём
              местами теряет контраст. */}
          <div className="absolute inset-0 bg-zinc-50/75 dark:bg-zinc-950/80" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-14">
            <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-5">
              Записаться на приём
            </h2>
            <p className="text-body text-zinc-700 dark:text-zinc-300 mb-8">
              Не откладывайте установку протезов — чем раньше начать лечение, тем проще и надёжнее
              будет результат. Записаться на консультацию можно по телефону или через форму на
              сайте. На приёме врач проведёт осмотр, объяснит возможные варианты протезирования,
              составит индивидуальный план и озвучит точную стоимость лечения.
            </p>
            <BookButton className="block w-full max-w-xl mx-auto text-center" />
          </div>
        </section>
      </FadeIn>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* --- Цирконий или металлокерамика --- */}
        <FadeIn>
          <section className="pt-24">
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 pb-5 mb-10 border-b border-zinc-200 dark:border-zinc-800">
              Что выбрать — цирконий или металлокерамику?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-5">
                <p className="text-body text-zinc-600 dark:text-zinc-300">
                  Стоит ли выбрать протез с металлическим основанием или лучше доплатить и выбрать
                  цирконий? Первое, на что вам надо ориентироваться, выбирая материал, — это ваши
                  финансовые возможности. Если вы знаете, что можете позволить оплатить более
                  дорогие и эстетичные ортопедические изделия, делайте их сразу и не сомневайтесь:
                  это оправдано со всех точек зрения.
                </p>
                <p className="text-body text-zinc-600 dark:text-zinc-300">
                  Практика показывает, что после установки металлокерамики спустя годы, когда
                  появляется возможность, пациенты возвращаются за эстетикой — и мы меняем их на
                  цельнокерамические коронки или мосты с основанием из циркония.
                </p>
              </div>
              <div className="space-y-5">
                <p className="text-body text-zinc-600 dark:text-zinc-300">
                  Несмотря на очевидные достоинства металлокерамики (доступность, прочность и
                  долговечность), есть у неё и один недостаток — использование металла. У некоторых
                  пациентов это вызывает сухость полости рта, вкусовые раздражения. Есть и другие
                  причины, делающие нежелательным присутствие обычных стоматологических
                  металлических сплавов в полости рта.
                </p>
                <p className="text-body text-zinc-600 dark:text-zinc-300">
                  Если вам интересно знать, в чём разница, чем вызвана стоимость и как меняется
                  восприятие материала организмом, чем отличаются протезы, которые устанавливают в
                  нашей стоматологии, увидеть примеры до и после — пожалуйста, перейдите на
                  внутренние страницы про металлокерамику и цирконий.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-[2rem] bg-card dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
                {MATERIALS.map((m) => (
                  // Колонка-флекс: описания у материалов разной длины, и без
                  // mt-auto на карусели фотографии в соседних панелях
                  // начинались бы на разной высоте.
                  <div
                    key={m.title}
                    className="flex flex-col md:px-8 md:first:pl-0 md:last:pr-0"
                  >
                    <h3 className="h-card text-center text-zinc-900 dark:text-zinc-50 mb-5">
                      {m.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{m.desc}</p>
                    <ul className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                      {m.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200"
                        >
                          <Check className="w-4 h-4 shrink-0 text-amber-500" strokeWidth={2.5} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <MaterialCarousel shots={m.shots} title={m.title} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* --- Микропротезирование --- */}
        <FadeIn>
          <section className="pt-24">
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-8">
              Микропротезирование зубов
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-16 max-w-5xl">
              Если требуется коррекция эстетических или функциональных нарушений, а сам зуб при этом
              живой, используются виниры и керамические накладки. Индивидуально изготовленные в
              зуботехнической лаборатории, они совершенно не отличаются от настоящих зубов.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div>
                <h3 className="h-card md:text-3xl text-center text-zinc-900 dark:text-zinc-50 mb-6">
                  Вкладки
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  Вкладки выполняют функции пломб
                </p>
                <img
                  src="/images/prosthetics/micro-inlay.webp"
                  alt="Керамические вкладки на модели челюсти"
                  className="w-full h-auto rounded-2xl mb-6"
                  loading="lazy"
                />
                <div className="space-y-5">
                  <p className="text-body text-zinc-600 dark:text-zinc-300">
                    Обычно под протезированием зубов подразумевается установка коронок на зубы. Но
                    очень часто пациенту необходимо воссоздать только часть эмали зуба, при этом не
                    обтачивая его со всех сторон.
                  </p>
                  <p className="text-body text-zinc-600 dark:text-zinc-300">
                    Самое распространённое применение микропротезы (керамические вкладки) получили
                    естественно при лечении кариеса. В случае обнаружения глубокого кариеса для
                    восстановления формы в процессе лечения, для получения более длительного
                    результата, лучше применять не обычный композитный материал, а прочные
                    керамические вкладки.
                  </p>
                  <p className="text-body text-zinc-600 dark:text-zinc-300">
                    Подробное описание, чем лечение кариеса с применением керамических вкладок лучше
                    обычного лечения с применением светоотверждаемого композита, читайте в материале
                    про керамические вкладки.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="h-card md:text-3xl text-center text-zinc-900 dark:text-zinc-50 mb-6">
                  Виниры
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  Накладки, устанавливаемые на внешнюю поверхность зубов
                </p>
                <img
                  src="/images/prosthetics/micro-veneers.webp"
                  alt="Керамические виниры"
                  className="w-full h-auto rounded-2xl mb-6"
                  loading="lazy"
                />
                <div className="space-y-5">
                  <p className="text-body text-zinc-600 dark:text-zinc-300">
                    Виниры — микропротезы из керамики в виде накладок на лицевую поверхность зубов.
                    Появление этой технологии кардинально изменило эстетическую стоматологию.
                  </p>
                  <p className="text-body text-zinc-600 dark:text-zinc-300">
                    Клиника «RoyalDent» — одна из ведущих стоматологий в Латвии в области установки
                    виниров.
                  </p>
                  <p className="text-body text-zinc-600 dark:text-zinc-300">
                    В действительности прочность винира, его оптимальная толщина, точность цвета и
                    прозрачность — вместе эти нюансы доводятся до идеала только при тесной работе
                    доктора и специалиста, который непосредственно изготавливает виниры.
                  </p>
                  <p className="text-body text-zinc-600 dark:text-zinc-300">
                    В клинике «RoyalDent» мы изготавливаем и устанавливаем возможно самые прочные и
                    эстетичные виниры в Латвии.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* --- Примеры работ --- */}
        <section className="pt-24 space-y-14">
          {CASES.map((item, i) => (
            <FadeIn key={item.title} delay={0.05 * i}>
              <h3 className="text-body font-medium text-zinc-900 dark:text-zinc-50 mb-5">
                {item.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {item.shots.map((src, j) =>
                  src ? (
                    <img
                      key={src}
                      src={src}
                      alt={item.title}
                      className="w-full aspect-[4/3] object-cover rounded-2xl border border-zinc-100 dark:border-zinc-800"
                      loading="lazy"
                    />
                  ) : (
                    <BlackPlaceholder
                      key={j}
                      label="Фото работы"
                      className="w-full aspect-[4/3] rounded-2xl"
                    />
                  ),
                )}
              </div>
            </FadeIn>
          ))}
        </section>

        {/* --- Врачи-ортопеды --- */}
        {doctors.length > 0 && (
          <FadeIn>
            <section className="pt-24">
              <h2 className="h-section text-center text-zinc-900 dark:text-zinc-50 mb-12">
                Врачи, которые занимаются протезированием
              </h2>
              {/* Карточка та же, что в карусели на главной. Ограничения по
                  ширине нет: две карточки занимают всю колонку страницы —
                  шире их сделать нельзя, не выходя за её поля. */}
              <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </section>
          </FadeIn>
        )}
      </div>

      <Faq items={PROSTHETICS_FAQ} />
    </main>
  );
}
