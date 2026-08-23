import React from 'react';
import { Check } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Doctors } from '../components/sections/Doctors';
import { Faq } from '../components/sections/Faq';
import { FadeIn } from '../components/ui/fade-in';
import { MaskIcon } from '../components/ui/MaskIcon';
import { PriceList } from '../components/ui/price-list';
import { useContactModal } from '../context/ContactModalContext';
import { usePriceRows, type PriceRef } from '../lib/usePriceRows';

/**
 * Посадочная страница «Лечение каналов» (бывшая «Терапия»).
 *
 * Занимает адрес /services/microscope вместо общего шаблона ServicePage:
 * материал длинный, с собственной вёрсткой (разделы про пульпит и
 * периодонтит, галерея снимков, два списка показаний), под сетку
 * «преимущества + этапы» из шаблона он не ложится.
 *
 * Цены не дублируются в коде, а выбираются из общего прайса по названию —
 * правка через панель администратора видна и здесь, и на /prices.
 */

const PRICE_REFS: PriceRef[] = [
  { category: 'Эндодонтия', name: 'Анестезия' },
  {
    category: 'Эндодонтия',
    name: 'Лечение 1 корневого канала',
    note: 'Проводим чистку и пломбирование 1-го канала. Восстановление зуба не входит в стоимость',
  },
  {
    category: 'Эндодонтия',
    name: 'Лечение 2-х корневого канала',
    note: 'Проводим чистку и пломбирование 2-х каналов. Восстановление зуба не входит в стоимость',
  },
  {
    category: 'Эндодонтия',
    name: 'Лечение 3-х корневого канала',
    note: 'Проводим чистку и пломбирование 3-х каналов. Восстановление зуба не входит в стоимость',
  },
  {
    category: 'Эндодонтия',
    name: 'Лечение 4-х корневого канала',
    note: 'Проводим чистку и пломбирование 4-х каналов. Восстановление зуба не входит в стоимость',
  },
  {
    category: 'Эндодонтия',
    name: 'Использование микроскопа (30 минут)',
    note: 'Лечение каналов под микроскопом в сложных случаях',
  },
  {
    category: 'Эндодонтия',
    name: 'Использование микроскопа (60 минут)',
    note: 'Лечение каналов под микроскопом в сложных случаях',
  },
  {
    category: 'Ортопедия',
    name: 'Коронка из диоксида циркония',
    note: 'Современная эстетика и прочность: цирконий полностью имитирует натуральный зуб',
  },
  {
    category: 'Терапия',
    name: 'Восстановление зуба пломбой на 1 поверхности',
    label: 'Восстановление зуба пломбой',
    note: 'Восстановление зуба после лечения каналов',
    from: true,
  },
];

/** Кнопка записи — повторяется в трёх местах страницы. */
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
 * Разделитель между смысловыми блоками: две линии и фирменный герб между
 * ними. Линии уходят в прозрачность к краям, чтобы не выглядеть обрубленными.
 */
function EmblemDivider() {
  return (
    <div className="flex items-center gap-6 py-16" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
      <img src="/brand/emblem.png" alt="" className="h-8 w-auto shrink-0 opacity-90" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
    </div>
  );
}

/** Врезка «нужно к врачу немедленно» — повторяется в двух разделах. */
function UrgencyNote() {
  return (
    <p className="text-amber-700 dark:text-amber-400 font-medium">
      Необходимо немедленное обращение к врачу, иначе резко возрастает риск потери зуба.
    </p>
  );
}

const RVG_SHOTS = ['/images/cases/rvg-1.webp', '/images/cases/rvg-2.webp', '/images/cases/rvg-3.webp', '/images/cases/rvg-4.webp'];

const INDICATIONS = [
  {
    title: 'Острый периодонтит',
    text: 'Сопровождается выраженной болью при накусывании, ощущением «выросшего» зуба, отёком десны. В такой ситуации лечение направлено на снятие воспаления, устранение инфекции и предотвращение её распространения.',
  },
  {
    title: 'Хронический периодонтит',
    text: 'Фиброзный, гранулирующий или гранулематозный процесс, который часто протекает без ярких симптомов и выявляется на рентгеновских снимках. Несмотря на отсутствие боли, воспалительный очаг у верхушки корня постепенно разрушает костную ткань и может привести к образованию кисты. Лечение позволяет устранить источник инфекции и сохранить зуб.',
  },
  {
    title: 'Обострение хронического процесса',
    text: 'При снижении иммунитета или нагрузке на зуб хронический периодонтит может обостряться, вызывая боль, припухлость и дискомфорт. В этом случае проводится лечение, направленное на купирование обострения и последующую санацию очага воспаления.',
  },
];

const CONTRAINDICATIONS = [
  {
    title: 'Нецелесообразность сохранения зуба',
    text: 'Если зуб разрушен ниже уровня десны, имеет подвижность III степени из-за потери костной ткани или значительное поражение тканей, что делает невозможным его восстановление, прогноз лечения неблагоприятный. В таких случаях врач рекомендует удаление с последующим протезированием или имплантацией.',
  },
  {
    title: 'Непроходимость корневых каналов',
    text: 'При сложной анатомии, искривлении или сильной кальцификации каналов, когда их невозможно качественно обработать и герметично запломбировать, эффективность лечения периодонтита резко снижается. Тактика лечения определяется индивидуально.',
  },
];

/**
 * Вопросы этой страницы, а не общий список с главной.
 *
 * Компонент Faq отдаёт вместе с блоком разметку FAQPage для поисковика,
 * поэтому одинаковые вопросы на двух адресах читались бы как дубль.
 */
const ROOT_CANAL_FAQ = [
  {
    q: 'Больно ли лечить пульпит?',
    a: 'Нет. Лечение проводится под современной анестезией и проходит без боли.',
  },
  {
    q: 'Можно ли вылечить пульпит за один визит к стоматологу?',
    a: 'В большинстве случаев — да. Современные методы лечения пульпита позволяют выполнить все манипуляции за один приём. Сложные случаи могут потребовать двух визитов и использования лекарства в каналах.',
  },
  {
    q: 'Сколько времени занимает лечение пульпита?',
    a: 'Зависит от сложности (количества каналов). В среднем лечение пульпита в одно посещение занимает около полутора часов.',
  },
  {
    q: 'Почему зуб может болеть после лечения?',
    a: 'Незначительная боль при накусывании в течение 2–3 дней — это вариант нормы. Так ткани зуба реагируют на вмешательство. При сильной, пульсирующей или нарастающей боли необходимо обратиться к стоматологу.',
  },
  {
    q: 'Сколько нельзя есть после лечения пульпита?',
    a: 'Около 2–3 часов — пока не закончится действие анестезии, иначе можно прикусить щёку.',
  },
];

/**
 * Три шага лечения пульпита. Абзацы и список лежат отдельными полями,
 * чтобы вёрстка колонки не зависела от того, есть ли в шаге перечисление.
 */
const TREATMENT_STEPS = [
  {
    icon: '/images/decor/step-diagnostics.webp',
    title: 'Точная диагностика и осмотр',
    paragraphs: [
      'Лечение начинается с осмотра и диагностики. Для точной оценки анатомии корней и количества каналов мы используем прицельный рентген и, при необходимости, компьютерную томографию. Это особенно важно для многоканальных зубов, где анатомия может быть сложной.',
      'Мы индивидуально подбираем безопасный анестетик, чтобы обеспечить вам спокойствие и комфорт. Поэтому лечение пульпита под анестезией проходит абсолютно безболезненно.',
    ],
  },
  {
    icon: '/images/decor/step-cleaning.webp',
    title: 'Обработка и очистка каналов',
    paragraphs: [
      'После удаления поражённых кариесом тканей и создания доступа врач удаляет воспалённую пульпу и приступает к обработке каналов.',
      'Мы используем:',
    ],
    list: [
      'эндодонтические инструменты с апекслокатором — для точного определения длины каналов;',
      'ультразвук — для очистки труднодоступных участков;',
      'антисептическую обработку каждого канала.',
    ],
    footer:
      'Каждый этап контролируется рентгенологически, чтобы исключить ошибки и повторное воспаление.',
  },
  {
    icon: '/images/decor/step-filling.webp',
    title: 'Пломбирование каналов',
    paragraphs: [
      'После очистки каналы герметично пломбируются. Это предотвращает повторное проникновение инфекции и создаёт надёжную основу для дальнейшего восстановления зуба.',
      'На этом этапе эндодонтическое лечение завершается, но работа с зубом — нет.',
    ],
  },
];

const REMOVAL_REASONS = [
  'зуб разрушен настолько, что его невозможно надёжно восстановить реставрацией;',
  'выявлена трещина или перелом корня, при котором воспаление будет постоянно возвращаться;',
  'воспалительный очаг продолжает разрушать костную ткань, несмотря на проведённое лечение;',
  'сохранение зуба создаёт риск осложнений для соседних зубов и костной ткани.',
];

export function RootCanalPage() {
  const priceRows = usePriceRows(PRICE_REFS);

  return (
    // pt-28 отводит место под плавающую шапку: градиентный баннер начинается
    // под меню, а не уходит под него.
    <main className="pt-28">
      <Seo
        title="Лечение каналов зуба в Юрмале"
        description="Лечение корневых каналов под микроскопом в Юрмале: лечение пульпита и периодонтита, восстановление зуба после лечения. Цены клиники RoyalDent."
        path="/services/microscope"
      />

      {/* Шапка. Градиент идёт слева направо: фирменный оранжевый гаснет
          в цвет фона страницы (#F0F4FF = zinc-50), поэтому баннер не
          обрывается вертикальной линией, а растворяется в странице. */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(90deg, #F7A566 0%, #F0F4FF 100%)' }}
      >
        {/* Колонка шире читаемой сетки страницы (max-w-6xl): на широком экране
            текст шапки должен стоять ближе к левому краю, чем текст статьи.
            Микроскоп из сетки выходит вовсе — он позиционируется от края
            экрана, а не от края контейнера. */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-xl">
            <FadeIn direction="none">
              <h1 className="h-display text-zinc-950 mb-8">Лечение каналов зуба в Юрмале</h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl font-semibold text-zinc-950 mb-5">
                Надёжное восстановление зубов на долгие годы
              </p>
              <ul className="space-y-2.5 mb-9">
                {[
                  'Избавляем от зубной боли',
                  'Помогаем сохранить зуб даже при сильном воспалении',
                  'Лечим каналы так, чтобы воспаление не вернулось',
                  'Восстанавливаем зуб после лечения, чтобы он служил долгие годы',
                ].map((line) => (
                  <li key={line} className="flex gap-3 items-start text-zinc-950">
                    <Check className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-body">{line}</span>
                  </li>
                ))}
              </ul>
              <BookButton />
            </FadeIn>
          </div>
        </div>

        {/* Микроскоп «стоит» на нижней границе баннера у правого края экрана.
            Штатив уходит за правый край — так задумано в макете. */}
        <img
          src="/images/clinic/equipment/microscope-hero.webp"
          alt="Операционный микроскоп Carl Zeiss OPMI pico для лечения корневых каналов"
          className="hidden md:block pointer-events-none absolute bottom-0 -right-10 lg:-right-16 h-[150%] w-auto max-w-none object-contain object-bottom"
          width={734}
          height={912}
        />
      </section>

      {/* Та же ширина, что у шапки: иначе на широком экране заголовок баннера
          начинается заметно левее, чем текст статьи под ним. */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* --- Пульпит --- */}
        {/* Колонка с картинкой шире, чем кажется нужным: контейнер страницы
            1400px, и при узкой картинке строка текста уходила бы за 140
            знаков — читать такую невозможно. */}
        <section className="pt-20 md:pt-24 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_420px] gap-10 md:gap-16 items-start">
          <FadeIn className="space-y-5">
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-8">Лечение пульпита</h2>

            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Пульпит — это воспаление ткани внутри зубных каналов.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Пульпит — одно из самых распространённых стоматологических заболеваний. Чаще всего
              к нему приводит не вылеченный своевременно кариес, из-за которого инфекция доходит
              до пульпы и вызывает её воспаление.
            </p>

            <p className="text-body font-medium text-zinc-900 dark:text-zinc-50 border-l-2 border-amber-500 bg-amber-50 dark:bg-amber-500/10 rounded-r-lg px-4 py-2.5">
              Главный симптом пульпита — самопроизвольная острая боль
            </p>

            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Болевые ощущения обычно резкие, острые и режущие, а могут затухать и возвращаться
              приступами.
            </p>

            <p className="text-body text-amber-700 dark:text-amber-400 font-medium pt-2">
              Лечение пульпита — это последовательное решение двух задач:
            </p>
            <ul className="space-y-4 pt-1">
              {[
                { icon: '/icons/decay.svg', text: 'устранить воспаление и не допустить его повторного появления' },
                { icon: '/icons/dental-crown.svg', text: 'укрепить зуб и восстановить его точную форму и эстетику' },
              ].map((task) => (
                <li key={task.icon} className="flex gap-4 items-center">
                  <MaskIcon src={task.icon} className="w-10 h-10 shrink-0 text-amber-500" />
                  <span className="text-body text-zinc-600 dark:text-zinc-300">{task.text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 space-y-6">
              <UrgencyNote />
              <BookButton />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            <img
              src="/images/decor/tooth-pulp.webp"
              alt="Строение зуба в разрезе: пульпа и корневые каналы"
              className="w-full h-auto rounded-2xl"
              width={738}
              height={553}
              loading="lazy"
            />
          </FadeIn>
        </section>

        {/* --- Как проходит лечение пульпита --- */}
        <section className="pt-20 md:pt-24">
          <FadeIn>
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-5">
              Как проходит лечение пульпита в клинике RoyalDent
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-14 max-w-4xl">
              Мы предлагаем комплексное лечение под ключ: не просто удаляем нерв и пломбируем
              каналы, а полностью восстанавливаем функциональность зуба.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {TREATMENT_STEPS.map((step, i) => (
              <FadeIn key={step.title} delay={0.1 * i} className="space-y-4">
                <img
                  src={step.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-24 h-24 mb-4"
                  width={128}
                  height={128}
                  loading="lazy"
                />
                <h3 className="h-card text-zinc-900 dark:text-zinc-50 mb-2">{step.title}</h3>
                {step.paragraphs.map((text) => (
                  <p key={text} className="text-body text-zinc-600 dark:text-zinc-300">
                    {text}
                  </p>
                ))}
                {step.list && (
                  <ul className="space-y-2 list-disc pl-5 marker:text-amber-500">
                    {step.list.map((line) => (
                      <li key={line} className="text-body text-zinc-600 dark:text-zinc-300">
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
                {step.footer && (
                  <p className="text-body text-zinc-600 dark:text-zinc-300">{step.footer}</p>
                )}
              </FadeIn>
            ))}
          </div>
        </section>

        <EmblemDivider />

        {/* --- Периодонтит --- */}
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_400px] gap-10 md:gap-16 items-start">
          <FadeIn className="space-y-5">
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-8">Лечение периодонтита</h2>

            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Периодонтит — это воспаление мягких тканей, окружающих зуб и удерживающих его в челюсти.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              В настоящее время периодонтит — одно из часто встречающихся воспалительных заболеваний
              корня и окружающих его тканей. Он возникает из-за развития инфекции в корневом канале.
              Если поражение эмали или дентина человек может увидеть самостоятельно и невооружённым
              глазом, то периодонтит бывает трудно определить, не обращаясь к врачу-стоматологу:
              протекать он может даже без глубокой кариозной или пульпитной полости, находясь
              в хронической стадии.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              Микроорганизмы могут попасть в корневой канал в результате вовремя не вылеченного
              кариеса, трещины с нарушением целостности или скола, проведённого ранее
              некачественного удаления нерва и пломбировки каналов, травмы. Если вы начали
              чувствовать боли при приёме пищи, накусывании на зуб или ноющие боли, стоит
              незамедлительно обратиться к специалисту: очень важно заметить заболевание на ранних
              стадиях, ведь не начатое своевременно лечение может привести к потере зуба.
            </p>
            <p className="text-body text-zinc-600 dark:text-zinc-300">
              По месту возникновения очага инфекции периодонтит разделяют на апикальный, который
              затрагивает область вокруг корня и встречается чаще, и маргинальный, который
              изначально возникает в области десны и встречается реже. Апикальный периодонтит
              обычно развивается из-за продуктов жизнедеятельности микроорганизмов, находящихся
              в корневых каналах; маргинальный чаще провоцируется травмой.
            </p>

            <div className="pt-4 space-y-6">
              <UrgencyNote />
              <BookButton />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            {/* На узком экране картинка выходит за поля страницы вправо
                (-mr-4 гасит px-4 контейнера) и встаёт вплотную к краю
                экрана — как микроскоп в шапке. */}
            <img
              src="/images/clinic/equipment/microscope-zumax.webp"
              alt="Микроскоп Zumax в кабинете клиники RoyalDent"
              className="w-[calc(100%+1rem)] max-w-none -mr-4 md:w-full md:mr-0 h-auto"
              width={738}
              height={1039}
              loading="lazy"
            />
          </FadeIn>
        </section>

        {/* Снимки: подтверждают текст выше, поэтому идут сразу за разделом. */}
        <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-14">
          {RVG_SHOTS.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Рентгеновский снимок пролеченных корневых каналов, пример ${i + 1}`}
              className="w-full h-auto rounded-xl border border-zinc-100 dark:border-zinc-800"
              loading="lazy"
            />
          ))}
        </FadeIn>

        {/* --- Показания и противопоказания --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-24">
          <FadeIn>
            <h2 className="h-card md:text-3xl text-center text-zinc-900 dark:text-zinc-50 mb-8">
              Показания к лечению периодонтита
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              Лечение периодонтита проводится в тех случаях, когда воспалительный процесс
              развивается за пределами корня зуба и затрагивает окружающие ткани. Задача врача —
              устранить очаг инфекции, снять боль и предотвратить осложнения.
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
              Противопоказания к лечению периодонтита
            </h2>
            <p className="text-body text-zinc-600 dark:text-zinc-300 mb-6">
              В ряде ситуаций проведение эндодонтического лечения периодонтита оказывается
              нецелесообразным или требует предварительной подготовки.
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

        {/* --- Когда зуб приходится удалять --- */}
        <FadeIn>
          <section className="pt-20">
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-8">
              Когда зуб всё же приходится удалять
            </h2>
            <div className="space-y-5 max-w-4xl">
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                Иногда, несмотря на все современные методы лечения, сохранить зуб оказывается
                невозможно или нецелесообразно. Это не означает «поражение» лечения — в ряде
                ситуаций удаление становится самым разумным и прогнозируемым решением.
              </p>
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                К удалению зуба врач может рекомендовать перейти, если:
              </p>
              <ul className="space-y-2.5 list-disc pl-5 marker:text-amber-500">
                {REMOVAL_REASONS.map((reason) => (
                  <li key={reason} className="text-body text-zinc-600 dark:text-zinc-300">
                    {reason}
                  </li>
                ))}
              </ul>
              <p className="text-body text-zinc-600 dark:text-zinc-300">
                В таких случаях мы заранее обсуждаем альтернативы — имплантацию или
                протезирование, чтобы восстановление зубного ряда прошло без потери функции
                и эстетики.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* --- Цены --- */}
        <FadeIn>
          <section className="pt-20">
            <div className="bg-card dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-6 md:p-10 shadow-sm">
              <h2 className="h-card md:text-3xl text-zinc-900 dark:text-zinc-50 mb-8">
                Цены на лечение каналов в Юрмале
              </h2>
              <PriceList rows={priceRows} />
            </div>
          </section>
        </FadeIn>
      </div>

      {/* Врачи и вопросы — общие секции сайта, во всю ширину, поэтому стоят
          за пределами читаемой колонки страницы. */}
      <Doctors />
      <Faq items={ROOT_CANAL_FAQ} />
    </main>
  );
}
