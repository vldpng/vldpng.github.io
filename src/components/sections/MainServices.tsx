import React, { useRef, useEffect, useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Syringe,
  Activity,
  HeartPulse,
  Stethoscope,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionBadge } from '../ui/section-badge';
import { MaskIcon } from '../ui/MaskIcon';
import { serviceCards } from './ServiceCards';

// Иконки направлений. Ключ — путь услуги (`to` из serviceCards).
// Где есть фирменный SVG — MaskIcon, остальным — подходящая иконка lucide.
const serviceIcons: Record<string, React.ReactNode> = {
  '/services/ceramic': <MaskIcon src="/icons/dental-crown.svg" className="w-6 h-6" />,
  '/services/aligners': <MaskIcon src="/icons/braces.svg" className="w-6 h-6" />,
  '/services/surgery': <Syringe size={24} />,
  '/services/implants': <MaskIcon src="/icons/implant.svg" className="w-6 h-6" />,
  '/services/microscope': <MaskIcon src="/icons/decay.svg" className="w-6 h-6" />,
  '/services/hygiene': <MaskIcon src="/icons/higien.svg" className="w-6 h-6" />,
  '/services/tmj': <Activity size={24} />,
  '/services/parodontology': <HeartPulse size={24} />,
  '/services/whitening': <MaskIcon src="/icons/whitening.svg" className="w-6 h-6" />,
};

// Краткие описания направлений для карточек на главной (ключ — путь услуги).
const homeDescriptions: Record<string, string> = {
  '/services/ceramic':
    'Восстанавливаем улыбку с помощью керамических виниров, накладок и коронок.',
  '/services/aligners':
    'Исправляем прикус и неправильное положение зубов с помощью элайнеров.',
  '/services/surgery':
    'Устанавливаем импланты для замены утраченных зубов, а также выполняем другие хирургические вмешательства — от простого удаления до сложных операций.',
  '/services/implants':
    'Тотальная реабилитация всего зубного ряда с помощью имплантов для пациентов, которые утратили большинство или все зубы.',
  '/services/microscope':
    'Выполняем художественные реставрации и лечим корневые каналы с помощью операционного микроскопа.',
  '/services/hygiene':
    'Комплекс профилактических процедур для предотвращения заболеваний зубов и дёсен, а также для поддержания здоровья полости рта.',
  '/services/tmj':
    'Диагностика и лечение дисфункции височно-нижнечелюстного сустава (ВНЧС): подбор терапии, капы при бруксизме и спортивные капы.',
  '/services/parodontology':
    'Лечим заболевания дёсен: от кровоточивости до пародонтита. Регенеративные методики и шинирование подвижных зубов.',
  '/services/whitening':
    'Отбеливание системой Flash — улыбка становится светлее за один визит.',
};

/** Тёмно-синяя карточка направления: заголовок + иконка, описание, фото снизу.
    Тень — только под карточкой (смещение вниз + отрицательный spread). */
function ServiceCard({ card }: { card: (typeof serviceCards)[number] }) {
  return (
    <Link
      to={card.to}
      className="group flex flex-col h-[400px] rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-[#12345f] to-[#041B39] shadow-[0_18px_30px_-14px_rgba(4,27,57,0.45)] hover:shadow-[0_26px_38px_-14px_rgba(4,27,57,0.55)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-3">
        <h3 className="font-serif text-xl leading-snug text-white">
          {card.title}
        </h3>
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
          {serviceIcons[card.to] ?? <Stethoscope size={24} />}
        </div>
      </div>

      <p className="px-6 pb-4 text-base leading-snug text-white/70 line-clamp-5">
        {homeDescriptions[card.to] ?? card.desc}
      </p>

      {/* Фото занимает нижнюю часть карточки */}
      <div className="relative mt-auto h-[200px] overflow-hidden">
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800" aria-hidden="true" />
        )}
      </div>
    </Link>
  );
}

/** Заявка на консультацию: имя + телефон, отправка на /api/booking/callback. */
function ConsultForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneValid = phone.replace(/\D/g, '').length >= 8;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (name.trim().length < 2 || !phoneValid) {
      setError('Пожалуйста, укажите имя и корректный номер телефона.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/booking/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), surname: '', phone: phone.trim() }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success === false) throw new Error('callback_failed');
      setDone(true);
    } catch {
      setError('Не удалось отправить заявку. Попробуйте позже или позвоните нам.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-center gap-4 text-white">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500">
          <Check size={22} strokeWidth={3} />
        </span>
        <div>
          <p className="font-semibold">Спасибо, {name.trim()}!</p>
          <p className="text-sm text-white/70">Мы свяжемся с вами в ближайшее время.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          autoComplete="name"
          className="flex-1 min-w-0 rounded-xl border-2 border-amber-500/80 bg-white px-5 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 transition-all"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          autoComplete="tel"
          className="flex-1 min-w-0 rounded-xl border-2 border-amber-500/80 bg-white px-5 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 transition-all"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-sweep shrink-0 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-70 text-white px-8 py-3.5 text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          {submitting ? 'Отправка…' : 'Записаться'}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </form>
  );
}

export function MainServices() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Width of a single set of cards (including the gap before the next set).
  const getSetWidth = () => {
    const el = scrollContainerRef.current;
    if (!el) return 0;
    const boundary = el.children[serviceCards.length] as HTMLElement | undefined;
    return boundary ? boundary.offsetLeft : el.scrollWidth / 3;
  };

  // Start in the middle copy so the user can scroll both directions seamlessly.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollLeft = getSetWidth();
  }, []);

  // Wrap the scroll position to create an infinite loop.
  // Заворачиваем только у настоящих краёв ленты (0 и конец), а старт стоит
  // в средней копии — так у стрелок есть запас в обе стороны и «назад» работает.
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const setWidth = getSetWidth();
    if (setWidth === 0) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft <= 0) {
      el.scrollLeft += setWidth;
    } else if (el.scrollLeft >= maxScroll) {
      el.scrollLeft -= setWidth;
    }
  };

  const scrollLib = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Прокрутка ровно на одну карточку (ширина первой карточки + gap-6 = 24px).
    const first = el.children[0] as HTMLElement | undefined;
    const amount = first ? first.offsetWidth + 24 : el.clientWidth * 0.5;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-24 overflow-hidden relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">

        <SectionBadge className="mb-10">Услуги</SectionBadge>

        <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-12 lg:gap-16">

          {/* Карточки направлений — слева (как на макете).
              Ширина карусели зафиксирована ровно под две карточки по 350px
              (350 + gap-6 + 350 = 724px), поэтому на десктопе видно две. */}
          <div className="relative w-full lg:w-[724px] lg:shrink-0 min-w-0">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto pt-6 pb-12 lg:py-12 snap-x snap-mandatory lg:snap-none hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[0, 1, 2].flatMap((copy) => serviceCards.map((card, idx) => (
                <div
                  key={`${copy}-${idx}`}
                  className="snap-start shrink-0 w-full lg:w-[350px]"
                >
                  <ServiceCard card={card} />
                </div>
              )))}
            </div>

            {/* Scroll Controls. На мобильных — ряд под каруселью; на десктопе
                контейнер «растворяется» (lg:contents), а кнопки становятся
                абсолютными по бокам карусели, по центру карточек. */}
            <div className="flex justify-end gap-3 mt-2 lg:contents">
              <button
                onClick={() => scrollLib('left')}
                className="w-12 h-12 bg-card dark:bg-zinc-900 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors lg:absolute lg:z-10 lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:-translate-x-1/2"
                aria-label="Предыдущая карточка"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scrollLib('right')}
                className="w-12 h-12 bg-card dark:bg-zinc-900 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors lg:absolute lg:z-10 lg:top-1/2 lg:-translate-y-1/2 lg:right-0 lg:translate-x-1/2"
                aria-label="Следующая карточка"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Текст — справа */}
          <div className="lg:flex-1 lg:min-w-0">
            <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-6">
              Весь путь лечения — <span className="text-zinc-500 dark:text-zinc-400">в одной клинике</span>
            </h2>
            <p className="text-lead text-zinc-600 dark:text-zinc-400 mb-8">
              В клинике RoyalDent вы сможете пройти весь путь лечения — от точной цифровой
              диагностики с использованием ИИ до сложных хирургических операций. Мы
              постоянно добавляем новые услуги и совершенствуем подходы, чтобы вы
              ощущали заботу, комфорт и спокойствие.
            </p>
            <Link
              to="/services"
              className="btn-sweep inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Все услуги
            </Link>
          </div>

        </div>

        {/* ───────── Баннер «Записаться на консультацию» ───────── */}
        <div className="mt-10 lg:mt-14 rounded-[2rem] bg-gradient-to-r from-[#0d2b52] to-[#041B39] p-8 lg:p-12 shadow-[0_20px_60px_-20px_rgba(4,27,57,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] items-center gap-8 lg:gap-14">
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl text-white mb-3">
                Записаться на консультацию
              </h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-[36ch]">
                Заполните форму, чтобы наш администратор мог связаться с вами
                и записать на консультацию.
              </p>
            </div>
            <ConsultForm />
          </div>
        </div>

      </div>
    </section>
  );
}
