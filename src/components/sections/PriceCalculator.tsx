import React, { useState } from 'react';
import { Plus, ArrowRight, Check, Info, Minus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { FadeIn } from '../ui/fade-in';
import { BlackPlaceholder } from '../ui/Placeholder';
import { SectionBadge } from '../ui/section-badge';
import { useBookingModal } from '../../context/BookingModalContext';

interface Option {
  title: string;
  subtitle?: string;
  price: number;
  /** Логотип бренда — показывается над фото импланта. */
  logo?: string;
  /** Фото импланта. */
  img?: string;
  /** Tailwind-класс масштаба для нормализации размера импланта в кадре. */
  imgScale?: string;
}

const implants: Option[] = [
  { title: 'ROOT®', subtitle: 'Швейцария', price: 490, logo: '/icons/ROOTT_logo.png', img: '/images/implants/root.webp' },
  // megagen.webp — квадратный кадр с большими полями, поэтому увеличиваем
  { title: 'Megagen', subtitle: 'Южная Корея', price: 400, logo: '/icons/megagen_logo.svg', img: '/images/implants/megagen.webp', imgScale: 'scale-[2.2]' },
  { title: 'Straumann', subtitle: 'Швейцария', price: 900, logo: '/icons/Straumann_Logo.svg', img: '/images/implants/straumann.webp' },
];

/** Небольшая иллюстрация импланта (резьба) — фолбэк, если фото не загрузилось. */
const ImplantGlyph = () => (
  <svg
    width="18"
    height="40"
    viewBox="0 0 18 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 4h8l-1.5 4h-5z" fill="currentColor" stroke="none" />
    <path d="M4 10h10M4.5 14h9M5 18h8M5.5 22h7M6 26h6M6.5 30h5M8 34h2" />
  </svg>
);

const crowns: Option[] = [
  // Фото коронок с крупным белым полем — увеличиваем масштабом (лишнее обрежется).
  { title: 'Металлическая коронка', price: 550, img: '/images/implants/Metal_dental_crown.webp', imgScale: 'scale-[2.6]' },
  // TODO: уточнить цену металлокерамической коронки (сейчас временная).
  { title: 'Металлокерамическая коронка', price: 500, img: '/images/implants/Metalceramic_crown.webp', imgScale: 'scale-[2.6]' },
  { title: 'Циркониевая коронка', price: 450, img: '/images/implants/Zirconium_crown.webp', imgScale: 'scale-[2.6]' },
];

interface TreatmentStage {
  label: string;
  title: string;
  points: string[];
  /** Фото этапа. Пусто — покажется тёмная заглушка. TODO: реальные снимки. */
  img?: string;
}

const treatmentStages: TreatmentStage[] = [
  {
    label: 'Этап 1',
    title: 'Планирование операции',
    points: [
      'Сканирование зубов',
      'Фото- и видеоанализ',
      'Определение положения нижней челюсти',
      'Примерка Mock-Up (дизайна будущей улыбки)',
      'Изготовление хирургических навигационных шаблонов для точной установки имплантов',
    ],
  },
  {
    label: 'Этап 2',
    title: 'Хирургический этап',
    points: [
      'Удаление зубов, непригодных к восстановлению на верхней челюсти',
      'Проведение имплантации с использованием хирургического шаблона',
    ],
  },
  {
    label: 'Этап 3',
    title: 'Фиксация временной конструкции',
    points: ['Фиксация временной конструкции во время операции'],
  },
  {
    label: 'Этап 4',
    title: 'Постоянное протезирование',
    points: [
      'После интеграции имплантатов и формирования мягких тканей выполнено сканирование с уровня мульти-юнит абатментов',
      'Изготовление постоянной циркониевой ортопедической конструкции',
      'Установка постоянной конструкции',
    ],
  },
];

/** Форматирование денег: «1 480 EUR» (пробел-разделитель тысяч, ru-RU). */
function formatEUR(value: number) {
  return `${value.toLocaleString('ru-RU')} EUR`;
}
/** Ежемесячный платёж по рассрочке (≈ на 9 месяцев). */
function installment(value: number) {
  return `${Math.round(value * 0.111).toLocaleString('ru-RU')} EUR/мес.`;
}

/* ───────────────────────── ШАГ 1 ─────────────────────────
   Интерактивная схема челюсти. Каждый зуб — кликабельный:
   выбор добавляет один имплант и одну коронку. */

/* Реальная иллюстрация челюстей (public/images/implants/jaw.svg).
   Зубы в ней — отдельные белые пути (#fafafa), бороздки — серые (#c2c5c7).
   Подгружаем SVG, вешаем клик прямо на каждый зуб и красим выбранный зелёным.
   Класс зубов определяем по цвету заливки, чтобы не зависеть от имён
   классов конкретного экспорта Illustrator (cls-5 / st3 / …). */
const JAW_IMG = '/images/implants/jaw.svg';
/** Цвет выбранного зуба (как на макете). */
const TOOTH_SELECTED = '#79C24A';
/** Порог по Y (координаты jaw.svg), делящий верхнюю и нижнюю челюсть. */
const JAW_SPLIT_Y = 508;

/** Перекраска зубов по текущему выбору. */
function paintTeeth(root: HTMLElement | null, selected: Set<string>) {
  if (!root) return;
  root.querySelectorAll<SVGPathElement>('[data-tooth]').forEach((el) => {
    const id = el.dataset.tooth;
    el.style.fill = id && selected.has(id) ? TOOTH_SELECTED : '';
  });
}

function JawPicker({
  selected,
  onToggle,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // Актуальные значения без переподписки слушателей.
  const onToggleRef = React.useRef(onToggle);
  onToggleRef.current = onToggle;
  const selectedRef = React.useRef(selected);
  selectedRef.current = selected;

  // Единоразовая загрузка SVG и настройка (императивно, без гонок с React).
  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    let cancelled = false;

    fetch(JAW_IMG)
      .then((r) => r.text())
      .then((txt) => {
        if (cancelled || !containerRef.current) return;
        const host = containerRef.current;
        host.innerHTML = txt;
        const svg = host.querySelector('svg');
        if (!svg) return;
        svg.setAttribute('class', 'w-full h-auto');
        (svg as SVGSVGElement).style.pointerEvents = 'none';

        // Зубы — белые пути (#fafafa). Имя класса зависит от экспорта
        // (st3/cls-5/…), поэтому находим его, распарсив <style> внутри SVG.
        const styleText = svg.querySelector('style')?.textContent ?? '';
        const toothClass = styleText.match(/\.([\w-]+)\s*\{[^}]*fill:\s*#fafafa/i)?.[1];
        const teeth = toothClass
          ? Array.from(svg.querySelectorAll<SVGPathElement>(`path.${toothClass}`))
          : [];
        const boxed = teeth.map((el) => {
          const b = el.getBBox();
          return { el, cx: b.x + b.width / 2, cy: b.y + b.height / 2 };
        });
        const assign = (list: typeof boxed, prefix: string) =>
          list
            .sort((a, b) => a.cx - b.cx)
            .forEach((t, i) => {
              t.el.dataset.tooth = `${prefix}${i + 1}`;
            });
        assign(boxed.filter((t) => t.cy < JAW_SPLIT_Y), 'U');
        assign(boxed.filter((t) => t.cy >= JAW_SPLIT_Y), 'L');

        teeth.forEach((el) => {
          el.style.pointerEvents = 'auto';
          el.style.cursor = 'pointer';
          el.style.transition = 'fill .15s';
          el.addEventListener('click', () => {
            const id = el.dataset.tooth;
            if (id) onToggleRef.current(id);
          });
        });

        paintTeeth(host, selectedRef.current);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  // Перекраска при изменении выбора (data-tooth появляется после настройки).
  React.useEffect(() => {
    paintTeeth(containerRef.current, selected);
  }, [selected]);

  return (
    <div
      ref={containerRef}
      className="jaw-teeth w-full max-w-[19rem] mx-auto select-none [&_[data-tooth]]:hover:fill-[#b6e08f]"
    />
  );
}

/** Компактная кнопка выбора импланта / коронки (тёмная карточка).
   Для имплантов (showMedia) показывается белая плашка с логотипом бренда
   и фото импланта — чтобы они читались и на тёмной, и на белой карточке. */
function OptionPill({
  option,
  selected,
  onSelect,
  showMedia,
  imgError,
  onImgError,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
  showMedia?: boolean;
  imgError?: boolean;
  onImgError?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={option.title}
      className={cn(
        'flex flex-col items-center justify-center text-center gap-1 rounded-xl border-2 p-3 min-h-[6rem] transition-all',
        selected
          ? 'bg-white text-zinc-900 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 shadow-sm',
      )}
    >
      {showMedia && (
        <span className="w-full rounded-lg bg-white flex flex-col items-center gap-1 p-2 mb-1">
          {option.logo && (
            <img
              src={option.logo}
              alt=""
              loading="lazy"
              className="h-5 md:h-6 w-full object-contain"
            />
          )}
          <span className="flex items-center justify-center h-14 w-full overflow-hidden">
            {option.img && !imgError ? (
              <img
                src={option.img}
                alt={option.title}
                loading="lazy"
                onError={onImgError}
                className={cn(
                  // Фото имплантов и коронок — на прозрачном фоне. Тень/blend не
                  // используем: их обрезала бы рамка overflow-hidden в прямоугольник.
                  'h-full w-auto object-contain transition-transform duration-300',
                  option.imgScale,
                )}
              />
            ) : option.logo ? (
              <span className="text-zinc-400">
                <ImplantGlyph />
              </span>
            ) : null}
          </span>
        </span>
      )}
      {/* Название: у коронок — текст, у имплантов вместо него показан логотип. */}
      {!option.logo && (
        <span className="font-semibold text-[13px] leading-tight">{option.title}</span>
      )}
      {option.subtitle && (
        <span className={cn('text-[11px]', selected ? 'text-zinc-500' : 'text-zinc-400')}>
          {option.subtitle}
        </span>
      )}
      <span className="mt-1 font-bold text-sm text-zinc-900">{option.price} EUR</span>
    </button>
  );
}

/* ─────────────────── ИНДИКАТОР ШАГОВ ─────────────────── */

const STEP_LABELS = [
  'Выбор зубов,\nимплантов и коронок',
  'Расчёт\nстоимости',
  'Определение плана\nлечения',
];

function StepIndicator({
  step,
  maxStep,
  onGo,
}: {
  step: number;
  maxStep: number;
  onGo: (n: number) => void;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      {/* Подписи */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {STEP_LABELS.map((label, i) => (
          <span
            key={label}
            className={cn(
              'text-[13px] md:text-sm leading-snug whitespace-pre-line',
              i + 1 <= step ? 'text-zinc-900 font-medium' : 'text-zinc-400',
            )}
          >
            {label}
          </span>
        ))}
      </div>
      {/* Дорожка с кружками */}
      <div className="flex items-center">
        {STEP_LABELS.map((_, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <React.Fragment key={n}>
              <button
                type="button"
                disabled={n > maxStep}
                onClick={() => onGo(n)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold border-2 transition-all',
                  done || active
                    ? 'bg-[#041B39] border-[#041B39] text-white'
                    : 'bg-white border-zinc-300 text-zinc-400',
                  active && 'ring-4 ring-[#041B39]/15',
                  n > maxStep && 'cursor-not-allowed',
                )}
              >
                {n}
              </button>
              {n < STEP_LABELS.length && (
                <div
                  className={cn(
                    'h-[2px] flex-1 transition-colors',
                    n < step ? 'bg-[#041B39]' : 'bg-zinc-300',
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ═════════════════════════ КАЛЬКУЛЯТОР ═════════════════════════ */

export function PriceCalculator() {
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [implantIdx, setImplantIdx] = useState(0);
  const [crownIdx, setCrownIdx] = useState(1);
  const [teeth, setTeeth] = useState<Set<string>>(new Set());
  const [stageIdx, setStageIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Шаг 3 — поля формы
  const [age, setAge] = useState(30);

  const { openModal } = useBookingModal();

  const implant = implants[implantIdx];
  const crown = crowns[crownIdx];
  const activeStage = treatmentStages[stageIdx];

  const upperCount = [...teeth].filter((id) => id.startsWith('U')).length;
  const lowerCount = [...teeth].filter((id) => id.startsWith('L')).length;
  const totalTeeth = teeth.size;

  const toggleTooth = (id: string) =>
    setTeeth((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const goTo = (n: number) => {
    if (n <= maxStep) setStep(n);
  };
  const advance = () => {
    const next = Math.min(step + 1, 3);
    setStep(next);
    setMaxStep((m) => Math.max(m, next));
  };

  // Позиции сметы (шаг 2), кол-во = число выбранных зубов
  const count = totalTeeth;
  const rows = [
    { name: `Имплант ${implant.title} и его установка`, unit: implant.price },
    { name: `Коронка «${crown.title}»`, unit: crown.price },
  ];
  const total = rows.reduce((sum, r) => sum + r.unit * count, 0);

  return (
    <section
      id="implantaciya"
      aria-labelledby="implantaciya-heading"
      className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <FadeIn>
          <SectionBadge className="mb-3">Имплантация</SectionBadge>
          <h2 id="implantaciya-heading" className="h-section text-zinc-900 dark:text-zinc-50">
            Калькулятор цен на{' '}
            <span className="underline decoration-dashed decoration-amber-500/70 underline-offset-8">
              Имплантацию
            </span>
          </h2>
          <p className="text-lead text-zinc-500 dark:text-zinc-400 mt-4 max-w-3xl">
            Имплантация зубов в RoyalDent: выберите имплант, коронку и нужные зубы —
            калькулятор рассчитает стоимость под ключ.
          </p>
        </FadeIn>

        <div className="mt-12">
          <StepIndicator step={step} maxStep={maxStep} onGo={goTo} />

          <AnimatePresence mode="wait">
            {/* ═══════════════ ШАГ 1 ═══════════════ */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Левая колонка: имплант + коронка */}
                  <div className="flex flex-col gap-5">
                    {/* Имплант */}
                    <div className="rounded-3xl bg-[#F8FAFF] text-zinc-900 border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
                      <h3 className="text-xl font-semibold">Стоимость импланта</h3>
                      <p className="text-sm text-zinc-400 mb-5">Хирургический этап</p>
                      <p className="eyebrow text-zinc-400 mb-4 pb-4 border-b border-zinc-200">
                        Выберите имплант
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {implants.map((opt, i) => (
                          <OptionPill
                            key={opt.title}
                            option={opt}
                            selected={implantIdx === i}
                            onSelect={() => setImplantIdx(i)}
                            showMedia
                            imgError={imgErrors[`impl-${i}`]}
                            onImgError={() =>
                              setImgErrors((prev) => ({ ...prev, [`impl-${i}`]: true }))
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Плюс */}
                    <div className="flex items-center justify-center text-amber-500">
                      <Plus size={28} strokeWidth={2.5} />
                    </div>

                    {/* Коронка */}
                    <div className="rounded-3xl bg-[#F8FAFF] text-zinc-900 border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
                      <h3 className="text-xl font-semibold">Стоимость коронки</h3>
                      <p className="text-sm text-zinc-400 mb-5">Ортопедический этап</p>
                      <p className="eyebrow text-zinc-400 mb-4 pb-4 border-b border-zinc-200">
                        Выберите коронку
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {crowns.map((opt, i) => (
                          <OptionPill
                            key={opt.title}
                            option={opt}
                            selected={crownIdx === i}
                            onSelect={() => setCrownIdx(i)}
                            showMedia
                            imgError={imgErrors[`crown-${i}`]}
                            onImgError={() =>
                              setImgErrors((prev) => ({ ...prev, [`crown-${i}`]: true }))
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Правая колонка: интерактивная схема челюстей */}
                  <div className="rounded-3xl bg-[#F8FAFF] text-zinc-900 border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                    <JawPicker selected={teeth} onToggle={toggleTooth} />
                    <div className="flex flex-col gap-6 w-full sm:w-auto">
                      <p className="text-sm text-zinc-400">
                        Отметьте зубы, которые нужно восстановить
                      </p>
                      <div>
                        <p className="font-semibold mb-1 text-zinc-900">Верхняя челюсть</p>
                        <p className="text-sm text-zinc-500 font-mono">
                          Количество имплантов: {upperCount} шт.
                        </p>
                        <p className="text-sm text-zinc-500 font-mono">
                          Количество коронок: {upperCount} шт.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1 text-zinc-900">Нижняя челюсть</p>
                        <p className="text-sm text-zinc-500 font-mono">
                          Количество имплантов: {lowerCount} шт.
                        </p>
                        <p className="text-sm text-zinc-500 font-mono">
                          Количество коронок: {lowerCount} шт.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Следующий шаг — активна после выбора хотя бы одного зуба.
                   Кнопка всегда в DOM (меняем лишь видимость), чтобы блок
                   «Этапы имплантации» ниже не смещался при её появлении. */}
                <button
                  onClick={advance}
                  disabled={totalTeeth === 0}
                  aria-hidden={totalTeeth === 0}
                  className={cn(
                    'mt-10 inline-flex items-center gap-3 rounded-full border-2 border-[#041B39] px-8 py-4 text-[#041B39] font-semibold transition-all duration-300 active:scale-95',
                    totalTeeth > 0
                      ? 'opacity-100 translate-y-0 hover:bg-[#041B39] hover:text-white'
                      : 'opacity-0 translate-y-2 pointer-events-none',
                  )}
                >
                  Следующий шаг
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {/* ═══════════════ ШАГ 2 ═══════════════ */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse">
                    <thead>
                      <tr className="text-left text-zinc-400 text-sm">
                        <th className="font-normal py-4 pr-4">Процедуры</th>
                        <th className="font-normal py-4 px-4">Кол-во и цена</th>
                        <th className="font-normal py-4 px-4 text-right">Стоимость</th>
                        <th className="font-normal py-4 pl-4 text-right">Рассрочка</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr
                          key={r.name}
                          className={cn(
                            'text-zinc-800 dark:text-zinc-200',
                            i % 2 === 1 && 'bg-black/[0.03] dark:bg-white/[0.03]',
                          )}
                        >
                          <td className="py-4 pr-4 rounded-l-lg">{r.name}</td>
                          <td className="py-4 px-4 whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                            {count} <span className="text-amber-500">×</span> {formatEUR(r.unit)}
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            {formatEUR(r.unit * count)}
                          </td>
                          <td className="py-4 pl-4 text-right whitespace-nowrap rounded-r-lg text-zinc-500 dark:text-zinc-400">
                            {installment(r.unit * count)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-amber-50 dark:bg-amber-500/10 font-bold text-zinc-900 dark:text-zinc-50">
                        <td className="py-5 pr-4 rounded-l-lg uppercase text-sm tracking-wide">
                          Итого:
                        </td>
                        <td className="py-5 px-4" />
                        <td className="py-5 px-4 text-right text-lg whitespace-nowrap">
                          {formatEUR(total)}
                        </td>
                        <td className="py-5 pl-4 text-right text-lg whitespace-nowrap rounded-r-lg text-amber-600">
                          {installment(total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={advance}
                    className="btn-sweep inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 font-semibold transition-colors active:scale-95"
                  >
                    Записаться на приём
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => goTo(1)}
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    ← Изменить выбор
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════════════ ШАГ 3 ═══════════════ */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
              >
                {/* Форма */}
                <div>
                  <p className="text-lg text-zinc-700 dark:text-zinc-200 mb-8 max-w-md">
                    Запись на бесплатную компьютерную 3D-томографию и консультацию
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* Возраст */}
                    <div>
                      <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                        Возраст
                      </label>
                      <div className="flex items-center rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden w-40">
                        <button
                          type="button"
                          onClick={() => setAge((a) => Math.max(0, a - 1))}
                          className="px-4 py-3 text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          aria-label="Уменьшить возраст"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="flex-1 text-center font-semibold text-zinc-900 dark:text-zinc-50">
                          {age}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAge((a) => Math.min(120, a + 1))}
                          className="px-4 py-3 text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          aria-label="Увеличить возраст"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Атрофия костной ткани */}
                    <div>
                      <label
                        htmlFor="atrophy"
                        className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2"
                      >
                        Атрофия костной ткани
                      </label>
                      <div className="relative">
                        <select
                          id="atrophy"
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 px-4 py-3 pr-10 focus:outline-none focus:border-amber-500 transition-colors"
                        >
                          <option value="">Не знаю</option>
                          <option value="none">Нет</option>
                          <option value="mild">Незначительная</option>
                          <option value="severe">Значительная</option>
                        </select>
                        <ChevronDown
                          size={18}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="flex items-start gap-2 text-xs text-amber-600 mb-8 max-w-sm">
                    <Info size={14} className="shrink-0 mt-0.5" />
                    Цена может измениться в зависимости от выбранного пункта.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label
                        htmlFor="calc-name"
                        className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2"
                      >
                        Как вас зовут
                      </label>
                      <input
                        id="calc-name"
                        type="text"
                        className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="calc-phone"
                        className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2"
                      >
                        Телефон
                      </label>
                      <input
                        id="calc-phone"
                        type="tel"
                        className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => openModal()}
                    className="btn-sweep inline-flex items-center gap-3 rounded-full border-2 border-amber-500 text-amber-600 hover:text-white px-8 py-4 font-semibold transition-colors active:scale-95"
                  >
                    Отправить
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* Предварительный расчёт */}
                <div className="lg:border-l lg:border-zinc-200 lg:dark:border-zinc-800 lg:pl-16">
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
                    Предварительный расчёт
                  </h3>
                  <div className="flex flex-wrap gap-x-12 gap-y-4 mb-8">
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Стоимость</p>
                      <p className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        {formatEUR(total)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Рассрочка</p>
                      <p className="text-2xl md:text-3xl font-bold text-amber-600">
                        {installment(total)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-md">
                    <p>
                      Калькулятор содержит актуальные цены клиники RoyalDent. Итоговая
                      стоимость подтверждается после консультации и диагностики.
                    </p>
                    <p>
                      Рассрочка до 9 месяцев предоставляется банками-партнёрами. Узнайте
                      о вашей персональной скидке на бесплатной консультации.
                    </p>
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="mt-6 text-amber-600 font-semibold hover:text-amber-700 underline underline-offset-4 transition-colors"
                  >
                    Заказать звонок
                  </button>

                  <div className="mt-8">
                    <button
                      onClick={() => goTo(2)}
                      className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      ← Вернуться к расчёту
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Этапы имплантации */}
        <div className="mt-20 md:mt-24">
          <FadeIn>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              Этапы имплантации
            </h3>
          </FadeIn>

          <FadeIn delay={0.1}>
            {/* Вкладки этапов */}
            <div className="flex flex-wrap justify-start gap-2 md:gap-3 mt-10">
              {treatmentStages.map((stage, idx) => (
                <button
                  key={stage.label}
                  type="button"
                  onClick={() => setStageIdx(idx)}
                  aria-pressed={stageIdx === idx}
                  className={cn(
                    'px-4 md:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95',
                    stageIdx === idx
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-card dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-black/[0.04] dark:border-white/[0.06] hover:text-zinc-900 dark:hover:text-white',
                  )}
                >
                  {stage.label}
                </button>
              ))}
            </div>

            {/* Панель активного этапа */}
            <div className="mt-6 rounded-3xl bg-card dark:bg-zinc-900 border border-black/[0.04] dark:border-white/[0.06] shadow-[0_8px_30px_rgb(58,58,58,0.04)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Текст этапа */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-start">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stageIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <h4 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
                        <span className="text-amber-500">{activeStage.label}:</span>{' '}
                        <span className="text-zinc-900 dark:text-zinc-50">{activeStage.title}</span>
                      </h4>
                      <ul className="space-y-3.5">
                        {activeStage.points.map((point) => (
                          <li key={point} className="flex gap-3 text-zinc-600 dark:text-zinc-300">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Фото этапа */}
                <div className="p-4 lg:p-6 flex">
                  {activeStage.img ? (
                    <img
                      src={activeStage.img}
                      alt={`${activeStage.label}: ${activeStage.title}`}
                      className="w-full rounded-2xl object-cover aspect-[4/3] lg:aspect-auto lg:min-h-[20rem]"
                    />
                  ) : (
                    <BlackPlaceholder
                      label={`Фото — ${activeStage.title}`}
                      className="w-full rounded-2xl aspect-[4/3] lg:aspect-auto lg:min-h-[20rem]"
                    />
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
