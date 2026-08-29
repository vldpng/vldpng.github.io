import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Faq } from '../components/sections/Faq';
import { FadeIn } from '../components/ui/fade-in';
import { PriceList } from '../components/ui/price-list';
import { ServiceHero } from '../components/ui/service-hero';
import { serviceHeroes } from '../data/serviceHeroes';
import { useContactModal } from '../context/ContactModalContext';
import { usePriceRows, type PriceRef } from '../lib/usePriceRows';

/**
 * Посадочная страница «Имплантация All-on-6».
 *
 * Занимает адрес /services/all-on-6 вместо общего шаблона ServicePage:
 * материал длинный, со своей вёрсткой — четыре преимущества в ряд, этапы
 * лечения с миниатюрами и два прайса подряд (временный и постоянный протез).
 *
 * Цены не дублируются в коде, а выбираются из категории «Имплантация» общего
 * прайса — правка через панель администратора видна и здесь, и на /prices.
 */

/** Фирменный синий: тот же, что у подзаголовка баннера (ui/service-hero). */
const BRAND_BLUE = 'text-[#2F6BD8]';

/** Имплантация и временный протез — первый блок цен. */
const SURGERY_PRICE_REFS: PriceRef[] = [
  {
    category: 'Имплантация',
    name: 'Имплантация на 6 имплантах системы Root',
    note: 'Более равномерная нагрузка, восстановление и передних, и большинства жевательных зубов',
  },
  {
    category: 'Имплантация',
    name: 'Имплантация на 6 имплантах системы Megagen',
    note: 'Система AnyRidge даёт максимально предсказуемый результат при установке временного протеза сразу после операции',
  },
  {
    category: 'Имплантация',
    name: 'Имплантация на 6 имплантах системы Straumann',
    note: 'Швейцарская система Straumann гарантирует премиальное качество и долговечность. Расширенная гарантия 8 лет',
  },
];

/** Постоянный протез — второй блок цен, он изготавливается после приживления. */
const PROSTHETICS_PRICE_REFS: PriceRef[] = [
  {
    category: 'Имплантация',
    name: 'Металлокерамический протез на 6 имплантах',
    note: 'Более равномерное распределение нагрузки. Повышенный комфорт при жевании и долговечность конструкции',
  },
  {
    category: 'Имплантация',
    name: 'Протез из диоксида циркония на 6 имплантах',
    note: 'Максимальный комфорт, эстетика и надёжность. Полный зубной ряд с премиальной эстетикой и долгим сроком службы',
  },
];

const ADVANTAGES = [
  {
    title: 'Повседневный комфорт',
    paragraphs: [
      'За счёт большего количества опор нагрузка распределяется более равномерно, и жевать становится проще и привычнее.',
      'Нет необходимости «подстраиваться» под протез или избегать определённых продуктов — можно спокойно есть то, к чему вы привыкли.',
    ],
  },
  {
    title: 'Долговечность и запас прочности',
    paragraphs: [
      'Протез на шести имплантатах лучше переносит жевательную нагрузку по сравнению с креплением на четырёх опорах, т. к. имеет больший запас прочности. Это снижает риск перегрузки и делает работу конструкции более спокойной в повседневной жизни.',
      'При грамотной установке и правильном уходе такой протез служит десятилетия.',
    ],
  },
  {
    title: 'Сохранение костной ткани',
    paragraphs: [
      'Жевательная нагрузка распределяется на большее количество опор, за счёт чего в работу включается больший объём костной ткани.',
      'Это замедляет её дальнейшую атрофию и помогает сохранить стабильность конструкции со временем.',
    ],
  },
  {
    title: 'Больше возможностей при планировании',
    paragraphs: [
      'Дополнительные имплантаты дают больше свободы при их расположении. В ряде случаев это позволяет обойти зоны с недостатком кости и избежать дополнительных операций по её наращиванию.',
    ],
  },
];

/** Этапы лечения: миниатюра слева, текст справа. */
const STEPS: { title: string; image: string; alt: string; paragraphs: string[] }[] = [
  {
    title: 'Всё начинается с консультации и диагностики.',
    image: '/images/allon6/kt-zubov.webp',
    alt: 'КТ-снимок челюстей на мониторе в кабинете диагностики',
    paragraphs: [
      'Мы оцениваем состояние костной ткани, прикус, нагрузку и общее состояние полости рта. На этом этапе становится понятно, подходит ли вам протокол All-on-6 или есть другое рациональное решение.',
    ],
  },
  {
    title: 'Далее мы планируем лечение.',
    image: '/images/allon6/cad.webp',
    alt: '3D-модель челюсти с шестью имплантатами и будущим протезом',
    paragraphs: [
      'Создаётся 3D-модель челюстей, продумывается положение имплантатов и будущая конструкция. Мы заранее учитываем, как протез будет работать под жевательной нагрузкой, чтобы избежать перегрузки имплантатов после установки.',
    ],
  },
  {
    title: 'Хирургический этап проходит под анестезией.',
    image: '/images/allon6/implantaciya.webp',
    alt: 'Установка имплантатов в челюсть по хирургическому шаблону',
    paragraphs: [
      'Устанавливаются имплантаты, и, в большинстве случаев, в этот же день фиксируется временный протез. Вы уходите уже с зубами — можно аккуратно есть, говорить и не выпадать из привычной жизни.',
    ],
  },
  {
    title: 'После этого идёт период адаптации и приживления имплантатов.',
    image: '/images/allon6/protez.webp',
    alt: 'Готовый постоянный протез на шести имплантах в руках техника',
    paragraphs: [
      'Обычно он занимает 4–6 месяцев. В это время важно соблюдать рекомендации по нагрузке и гигиене. Мы контролируем процесс и при необходимости корректируем временную конструкцию.',
      'Когда имплантаты полностью интегрируются, изготавливается постоянный протез.',
      'Он точнее по посадке, прочнее и рассчитан на полноценную жевательную нагрузку на годы.',
    ],
  },
];

/**
 * Правила ухода. `link` — часть текста, которая ведёт на другую услугу:
 * иначе пришлось бы держать в данных готовую разметку.
 */
const CARE_RULES: { title: string; text: string; link?: { label: string; to: string } }[] = [
  {
    title: 'Чистить два раза в день.',
    text: 'Особое внимание нужно уделять линии соединения протеза с десной — там может скапливаться налёт.',
  },
  {
    title: 'Использовать ирригатор.',
    text: 'Вода под давлением вымывает остатки пищи из труднодоступных мест, куда не достаёт щётка. Ирригатор обеспечивает здоровье дёсен вокруг имплантатов.',
  },
  {
    title: 'Раз в полгода посещать гигиениста.',
    text: ' помогает удалить отложения, которые не получается убрать самостоятельно.',
    link: { label: 'Профессиональная чистка', to: '/services/hygiene' },
  },
  {
    title: 'Избегать экстремальных нагрузок.',
    text: 'Не нужно открывать упаковки, грызть особо твёрдые продукты. Конструкция прочная, но бережное отношение продлевает её срок службы.',
  },
  {
    title: 'Регулярно проходить профилактические осмотры.',
    text: 'Рекомендуется каждые полгода записываться в клинику — врач сможет вовремя заметить изменения и скорректировать уход.',
  },
];

/**
 * Вопросы собраны из фактов, которые уже есть на странице (шесть опор против
 * четырёх, временный протез в день операции, 4–6 месяцев приживления, правила
 * ухода) — так блок не добавляет к сайту утверждений, которых клиника не давала.
 */
const ALL_ON_6_FAQ = [
  {
    q: 'Чем All-on-6 отличается от All-on-4?',
    a: 'Протез опирается не на четыре, а на шесть имплантатов. Дополнительные точки опоры позволяют расширить зубной ряд, лучше задействовать боковые зубы и равномернее распределить жевательную нагрузку — у такой конструкции больший запас прочности.',
  },
  {
    q: 'Можно ли есть сразу после операции?',
    a: 'В большинстве случаев временный протез фиксируется в день установки имплантатов — вы уходите из клиники уже с зубами. Первое время есть нужно аккуратно и соблюдать рекомендации врача по нагрузке.',
  },
  {
    q: 'Сколько времени занимает всё лечение?',
    a: 'Хирургический этап с временным протезом проходит за один визит. Затем идёт период приживления имплантатов — обычно 4–6 месяцев. После полной интеграции изготавливается постоянный протез: он точнее по посадке и рассчитан на полноценную жевательную нагрузку.',
  },
  {
    q: 'Подойдёт ли метод, если свои зубы ещё остались, но они подвижны?',
    a: 'Да, это одна из типичных ситуаций. При обширном пародонтите разрушенные и подвижные зубы чаще всего не удаётся сохранить, и их удаление становится частью плана лечения. Решение принимается на консультации после осмотра и КТ.',
  },
  {
    q: 'Нужно ли наращивать кость перед имплантацией?',
    a: 'Не всегда. Шесть имплантатов дают больше свободы в их расположении, и в ряде случаев это позволяет обойти зоны с недостатком кости и избежать дополнительной операции по её наращиванию.',
  },
  {
    q: 'Как ухаживать за протезом на шести имплантах?',
    a: 'Особый уход не требуется. Чистить зубы два раза в день, уделяя внимание линии соединения протеза с десной, пользоваться ирригатором, раз в полгода приходить на профессиональную гигиену и профилактический осмотр. Не стоит открывать протезом упаковки и грызть очень твёрдые продукты.',
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

export function AllOn6Page() {
  const surgeryRows = usePriceRows(SURGERY_PRICE_REFS);
  const prostheticsRows = usePriceRows(PROSTHETICS_PRICE_REFS);

  return (
    // pt-28 отводит место под плавающую шапку: баннер начинается под меню.
    <main className="pt-28">
      <Seo
        title="Имплантация All-on-6 в Юрмале"
        description="Имплантация All-on-6 в Юрмале: несъёмный протез на шести имплантатах при полном отсутствии зубов. Временный протез в день операции, этапы лечения, уход и цены клиники RoyalDent."
        path="/services/all-on-6"
      />

      {/* Шапка — общий компонент, как у всех остальных услуг. Содержимое —
          в data/serviceHeroes. */}
      <ServiceHero content={serviceHeroes['all-on-6']} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* --- Что такое протокол All-on-6 --- */}
        <FadeIn>
          <section className="pt-20 md:pt-24">
            <h2 className={`h-section mb-8 ${BRAND_BLUE}`}>Что такое протокол «All-on-6»</h2>
            <div className="space-y-5 max-w-5xl">
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                Когда пациент приходит с полной потерей зубов или ситуацией, когда их уже невозможно
                сохранить, основной вопрос звучит просто: сделать так, чтобы можно было снова
                нормально жевать, улыбаться, разговаривать и просто радоваться жизни.
              </p>
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                При тотальном протезировании на имплантах самой распространённой методикой является
                «Все на 4» / <Link to="/services/all-on-4" className="underline decoration-amber-500/60 underline-offset-4 hover:text-amber-600 transition-colors">All-on-4</Link>.
                Это рабочее решение, но подходит оно не всегда. Протез на четырёх имплантах обычно
                восстанавливает зону улыбки и часть жевательных зубов.
              </p>
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                Протокол «Все на 6» / All-on-6 позволяет расширить зубной ряд и лучше распределить
                нагрузку. Несъёмный протез фиксируется на шести имплантатах, которые становятся
                опорой для всей конструкции. Дополнительные точки опоры позволяют лучше задействовать
                боковые зубы, на которые приходится основная нагрузка.
              </p>
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                Этот вариант мы рассматриваем в тех случаях, когда есть возможность сделать протез
                более стабильным и комфортным в повседневной жизни.
              </p>
            </div>
          </section>
        </FadeIn>

        <EmblemDivider />

        {/* --- Кому подходит --- */}
        {/* Снимок держится у верха колонки (self-start): текст слева длиннее,
            и без этого заглушка растянулась бы на всю его высоту. */}
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-10 md:gap-16 items-start">
          <FadeIn>
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-8">Кому подходит All-on-6</h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-5">
              All-on-6 подходит тем, кто хочет без компромиссов вернуть возможность нормально жевать
              и улыбаться.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Мы рассматриваем этот метод, когда четырёх имплантатов может быть недостаточно по
              нагрузке, а костная ткань позволяет установить большее количество опор.
            </p>

            <h3 className="h-card text-zinc-900 dark:text-zinc-50 mt-12 mb-5">
              Зубы, которые уже не подлежат сохранению
            </h3>
            <div className="space-y-5">
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                Часто к нам приходят пациенты, у которых ещё остаётся часть своих зубов, но они
                подвижны и разрушены — как правило, на фоне обширного пародонтита. Жевать становится
                неудобно, появляется неприятный запах и постоянный дискомфорт от воспаления дёсен.
              </p>
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                Если заболевание длится уже несколько лет, такие зубы чаще всего не получается
                сохранить. Решиться на удаление последних зубов непросто, но в ряде случаев это
                единственный рациональный способ решить проблему на долгие годы.
              </p>
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                <Link to="/services/implants" className="underline decoration-amber-500/60 underline-offset-4 hover:text-amber-600 transition-colors">Имплантация</Link>
                {' и '}
                <Link to="/services/prosthetics" className="underline decoration-amber-500/60 underline-offset-4 hover:text-amber-600 transition-colors">протезирование</Link>
                {' '}позволяют вернуться к нормальной жизни и любимой еде.
              </p>
            </div>

            <h3 className="h-card text-zinc-900 dark:text-zinc-50 mt-12 mb-5">
              Неудобство съёмного протеза
            </h3>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Многие пациенты уже пробовали{' '}
              <Link to="/services/prosthetics" className="underline decoration-amber-500/60 underline-offset-4 hover:text-amber-600 transition-colors">съёмные конструкции</Link>,
              но не смогли к ним привыкнуть. Протез может смещаться, натирать или мешать при
              разговоре. В такой ситуации переход на несъёмный вариант принципиально меняет ощущения
              в повседневной жизни.
            </p>

            <h3 className="h-card text-zinc-900 dark:text-zinc-50 mt-12 mb-5">
              Повышенная жевательная нагрузка
            </h3>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Сила жевательных мышц у пациентов различается — это зависит от анатомии, привычек и
              рациона. Если мы понимаем, что четырёх имплантатов в вашем случае может быть
              недостаточно для надёжной службы протеза, то рассматриваем протокол «Все на 6».
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            {/* Снимок 500×730 уже, чем слот 4:5, поэтому object-cover режет по
                высоте. При кадрировании от центра уходила голова хирурга —
                object-top прижимает кадр к верху. */}
            <img
              src="/images/allon6/operaciya.webp"
              alt="Хирург устанавливает импланты в ходе операции"
              className="w-full aspect-[4/5] object-cover object-top rounded-2xl shadow-sm"
              loading="lazy"
            />
          </FadeIn>
        </section>

        <EmblemDivider />

        {/* --- Преимущества --- */}
        <FadeIn>
          <section>
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-12">
              Преимущества имплантации «Все на 6»
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {ADVANTAGES.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    {item.title}
                  </h3>
                  <div className="space-y-4">
                    {item.paragraphs.map((text) => (
                      <p key={text} className="text-sm text-zinc-600 dark:text-zinc-300">
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>

      {/* --- Полоса с работами --- */}
      {/* Кадры сведены в один файл-раскладку 3×2, поэтому это одна картинка во
          всю ширину, а не сетка: разрезать её на плитки нечем. */}
      <FadeIn>
        <img
          src="/images/allon6/protesisi_steps.webp"
          alt="Этапы изготовления протеза на шести имплантах: цифровой макет, фрезерованная конструкция и готовая работа во рту"
          className="mt-16 md:mt-24 w-full h-auto"
          loading="lazy"
        />
      </FadeIn>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <EmblemDivider />

        {/* --- Этапы --- */}
        <FadeIn>
          <section>
            <h2 className={`h-section mb-12 ${BRAND_BLUE}`}>
              Этапы имплантации и протезирования All-on-6
            </h2>
            {/* Нумерация списка — смысловая: этапы идут строго друг за другом. */}
            <ol className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {STEPS.map((step) => (
                <li
                  key={step.title}
                  className="flex flex-col sm:flex-row gap-5 sm:gap-8 py-8 first:pt-0"
                >
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full sm:w-32 md:w-40 shrink-0 aspect-[4/3] object-cover rounded-xl shadow-sm"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                      {step.title}
                    </h3>
                    <div className="space-y-4">
                      {step.paragraphs.map((text) => (
                        <p key={text} className="text-sm text-zinc-600 dark:text-zinc-300">
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </FadeIn>

        <EmblemDivider />

        {/* --- Уход и гигиена --- */}
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-10 md:gap-16 items-start">
          <FadeIn>
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-8">Уход и гигиена</h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              После протезирования верхней или нижней челюсти на 6 имплантах не требуется особый
              уход. Главное — соблюдать несколько правил:
            </p>
            <ul className="space-y-4 list-disc pl-5 marker:text-amber-500">
              {CARE_RULES.map((rule) => (
                <li key={rule.title} className="text-body text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{rule.title}</span>{' '}
                  {rule.link && (
                    <Link
                      to={rule.link.to}
                      className="underline decoration-amber-500/60 underline-offset-4 hover:text-amber-600 transition-colors"
                    >
                      {rule.link.label}
                    </Link>
                  )}
                  {rule.text}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <img
              src="/images/allon6/uhod_za_protezom.webp"
              alt="Пациентка рассматривает в зеркале протез на имплантах после осмотра"
              className="w-full h-auto rounded-2xl shadow-sm"
              loading="lazy"
            />
          </FadeIn>
        </section>

        <EmblemDivider />

        {/* --- Цены --- */}
        {/* Два прайса в одной карточке: суммы разнесены по этапам лечения —
            сначала операция с временным протезом, потом постоянный. */}
        <FadeIn>
          <section>
            <div className="bg-card dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-6 md:p-10 shadow-sm">
              <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-8">
                Стоимость имплантации и временного протезирования All-on-6
              </h2>
              <PriceList rows={surgeryRows} />

              <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mt-14 mb-8">
                Стоимость постоянного протезирования All-on-6
              </h2>
              <PriceList rows={prostheticsRows} />

              <BookButton className="mt-10" />
            </div>
          </section>
        </FadeIn>
      </div>

      <Faq items={ALL_ON_6_FAQ} />
    </main>
  );
}
