import React, { useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft, User, Briefcase } from 'lucide-react';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { doctorsData, type Doctor } from '../../data/doctors';
import { useBookingModal } from '../../context/BookingModalContext';

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { openModal } = useBookingModal();

  const handleBooking = (e: React.MouseEvent) => {
    // Не даём клику по кнопке перейти на страницу врача — открываем запись.
    e.preventDefault();
    e.stopPropagation();
    openModal();
  };

  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] transition-shadow duration-300 hover:shadow-xl">
      {doctor.photoUrl ? (
        <img
          src={doctor.photoUrl}
          alt={doctor.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-700">
          <User size={64} strokeWidth={1.25} />
        </div>
      )}

      {/* Плавный blur снизу — усиливается к нижнему краю через маску-градиент */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-[6px]"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Затемнение для читаемости текста */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
      />

      {/* Растянутая ссылка на страницу врача — навигация по клику на карточку */}
      <Link
        to={`/doctors/${doctor.id}`}
        aria-label={doctor.name}
        className="absolute inset-0 z-10"
      />

      {/* Контент поверх фото. pointer-events-none — клики проходят к ссылке;
          интерактивной остаётся только кнопка записи. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white">
          {doctor.name}
        </h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
          {doctor.specialty}
        </p>

        {/* Стаж работы (вместо рейтинга из референса) */}
        {doctor.experience && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3.5 py-1.5 backdrop-blur-sm">
            <Briefcase size={14} className="text-amber-400" />
            <span className="text-xs font-medium text-white">
              Стаж {doctor.experience}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleBooking}
          className="btn-sweep pointer-events-auto mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-amber-600 active:scale-95"
        >
          Записаться
        </button>
      </div>
    </div>
  );
}

export function Doctors() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Автопрокрутка: листает вперёд каждые 3.5 с, останавливается при наведении
  // и уважает системную настройку «уменьшить движение».
  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: number | null = null;
    const stop = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };
    const play = () => {
      stop();
      timer = window.setInterval(() => emblaApi.scrollNext(), 3500);
    };

    const root = emblaApi.rootNode();
    play();
    root.addEventListener('pointerenter', stop);
    root.addEventListener('pointerleave', play);

    return () => {
      stop();
      root.removeEventListener('pointerenter', stop);
      root.removeEventListener('pointerleave', play);
    };
  }, [emblaApi]);

  return (
    <section id="doctors" className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeIn>
              <SectionBadge className="mb-4">Команда</SectionBadge>
              <h2 className="h-section text-zinc-900 dark:text-white mb-4">Наши специалисты</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lead text-zinc-500 dark:text-zinc-400 max-w-2xl">
                Врачи, чьи кейсы говорят громче слов. Команда профессионалов со стажем и
                перфекционистским подходом к каждой детали.
              </p>
            </FadeIn>
          </div>

          {/* Navigation arrows */}
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Предыдущий"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white transition-colors hover:bg-zinc-900 hover:text-white hover:border-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Следующий"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white transition-colors hover:bg-zinc-900 hover:text-white hover:border-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} direction="up">
          {/* Зазор между слайдами задан padding-ом внутри слайда (а не gap),
              иначе при loop: true на стыке петли карточки слипаются. */}
          <div className="overflow-hidden -mx-4 px-4 md:mx-0 md:px-0" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6">
              {doctorsData.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex-[0_0_82%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-4 md:pl-6"
                >
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
