import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctorsData, clinicTechnologies, clinicPromos } from '../data/doctors';
import { ArrowLeft, ArrowRight, Star, GraduationCap, Sparkles, Tag } from 'lucide-react';
import { BlackPlaceholder } from '../components/ui/Placeholder';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useBookingModal } from '../context/BookingModalContext';
import { Seo } from '../components/Seo';

/** Заголовок секции — серифный, в тёплом акценте (в стиле макета). */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-serif text-2xl md:text-3xl text-amber-600 mb-6">
      {children}
    </h2>
  );
}

const cardClass =
  'rounded-3xl bg-card border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8';

export function DoctorPage() {
  const { id } = useParams();
  const doctor = doctorsData.find((d) => d.id === id);
  const { openModal } = useBookingModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const others = useMemo(() => doctorsData.filter((d) => d.id !== id).slice(0, 4), [id]);

  // Секции навигации — только те, для которых есть данные.
  const sections = useMemo(() => {
    if (!doctor) return [];
    return [
      { id: 'education', label: 'Образование', show: !!doctor.educationList?.length },
      { id: 'profile', label: 'Профиль лечения', show: !!doctor.treatmentProfile?.length },
      { id: 'services', label: 'Услуги', show: doctor.services.length > 0 },
      { id: 'prices', label: 'Цены', show: !!doctor.prices?.length },
      { id: 'promos', label: 'Акции', show: clinicPromos.length > 0 },
      { id: 'technologies', label: 'Технологии', show: clinicTechnologies.length > 0 },
      { id: 'others', label: 'Другие врачи', show: others.length > 0 },
    ].filter((s) => s.show);
  }, [doctor, others]);

  const [active, setActive] = useState('');

  useEffect(() => {
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12">
        <Seo title="Врач не найден" noindex path={`/doctors/${id ?? ''}`} />
        <h1 className="text-3xl font-semibold mb-4 text-zinc-900">Врач не найден</h1>
        <Link to="/" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-4">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 pt-24 pb-20">
      <Seo
        title={`${doctor.name} — ${doctor.specialty}`}
        description={`${doctor.name}, ${doctor.specialty}. ${doctor.bio}`.slice(0, 160)}
        path={`/doctors/${doctor.id}`}
      />
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        {/* Назад */}
        <div className="mb-8">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft size={16} /> Назад к списку врачей
          </Link>
        </div>

        {/* Шапка врача — hero: фото + оранжевая карточка */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch mb-10">
          {/* Фото */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none lg:w-[29%] aspect-[4/5] lg:aspect-[2/3] lg:self-start min-h-[420px] relative rounded-[2rem] overflow-hidden shadow-xl shrink-0 bg-zinc-100"
          >
            {doctor.photoUrl ? (
              <img src={doctor.photoUrl} alt={doctor.name} className="w-full h-full object-cover" />
            ) : (
              <BlackPlaceholder label={doctor.photoLabel} className="w-full h-full object-cover" />
            )}
          </motion.div>

          {/* Карточка с данными */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:flex-1 rounded-[2rem] bg-amber-500 text-white p-8 md:p-12 lg:p-14 flex flex-col"
          >
            <nav
              aria-label="Хлебные крошки"
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70 mb-10 md:mb-14"
            >
              <Link to="/" className="hover:text-white transition-colors">Главная</Link>
              <span className="text-white/40">—</span>
              <Link to="/doctors" className="hover:text-white transition-colors">Врачи</Link>
              <span className="text-white/40">—</span>
              <span className="text-white">{doctor.name}</span>
            </nav>

            <h1 className="h-display text-white mb-4">{doctor.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
              <p className="text-lead text-white/80 font-light">{doctor.specialty}</p>
              {typeof doctor.rating === 'number' && (
                <span className="inline-flex items-center gap-1 text-white font-semibold">
                  <Star size={16} className="fill-white text-white" />
                  {doctor.rating.toFixed(2)}
                </span>
              )}
            </div>

            {(doctor.experience || doctor.education) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 py-6 border-y border-white/20">
                {doctor.experience && (
                  <div>
                    <h3 className="eyebrow text-white/60 mb-1">Стаж работы</h3>
                    <p className="text-lg text-white font-medium">{doctor.experience}</p>
                  </div>
                )}
                {doctor.education && (
                  <div>
                    <h3 className="eyebrow text-white/60 mb-1">Образование</h3>
                    <p className="text-base text-white">{doctor.education}</p>
                  </div>
                )}
              </div>
            )}

            <p className="text-lead text-white/90 font-light max-w-2xl mb-auto">{doctor.bio}</p>

            <div className="mt-10 md:mt-14">
              <button
                onClick={() => openModal()}
                className="group inline-flex items-center gap-3 bg-white text-zinc-900 pl-7 pr-2.5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all hover:shadow-lg active:scale-95 cursor-pointer"
              >
                Записаться на приём
                <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-amber-500 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Контент: липкое меню + секции. Левая колонка = ширине фото в hero (29%),
           отступы совпадают с hero — меню выравнивается под фотографией. */}
        <div className="grid lg:grid-cols-[29%_1fr] gap-6 lg:gap-8">
          {/* Боковое меню */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <nav className={cn(cardClass, 'p-3')}>
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={cn(
                      'block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                      active === s.id
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-zinc-600 hover:bg-black/[0.03] hover:text-zinc-900',
                    )}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
              <button
                onClick={() => openModal()}
                className="btn-sweep mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-amber-500 text-amber-600 hover:text-white px-6 py-3 font-semibold transition-colors active:scale-95"
              >
                Записаться на приём
                <ArrowRight size={18} />
              </button>
            </div>
          </aside>

          {/* Секции */}
          <div className="flex flex-col gap-12">
            {/* Образование */}
            {doctor.educationList?.length ? (
              <section>
                <SectionHeading id="education">Образование</SectionHeading>
                <div className={cn(cardClass, 'flex flex-col gap-3')}>
                  {doctor.educationList.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl bg-white border border-black/[0.04] px-5 py-4"
                    >
                      <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <GraduationCap size={20} />
                      </span>
                      <div>
                        <p className="font-medium text-zinc-900">{e.title}</p>
                        {e.subtitle && <p className="text-sm text-zinc-500">{e.subtitle}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Профиль лечения */}
            {doctor.treatmentProfile?.length ? (
              <section>
                <SectionHeading id="profile">Профиль лечения</SectionHeading>
                <div className={cn(cardClass, 'flex flex-wrap gap-2.5')}>
                  {doctor.treatmentProfile.map((t) => (
                    <span
                      key={t}
                      className="inline-flex rounded-full bg-white border border-zinc-200 text-zinc-700 px-4 py-2 text-sm font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Услуги */}
            {doctor.services.length > 0 && (
              <section>
                <SectionHeading id="services">Услуги</SectionHeading>
                <div className="flex flex-col gap-3">
                  {doctor.services.map((service) => (
                    <Link
                      key={service.id}
                      to={service.href}
                      className="group flex items-center justify-between px-6 py-4 rounded-2xl bg-card border border-zinc-200 hover:border-amber-500 text-zinc-900 transition-all shadow-sm hover:shadow-md"
                    >
                      <span className="text-lg font-light">{service.title}</span>
                      <ArrowRight
                        size={22}
                        strokeWidth={1.5}
                        className="shrink-0 ml-4 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Цены */}
            {doctor.prices?.length ? (
              <section>
                <SectionHeading id="prices">Цены</SectionHeading>
                <div className={cn(cardClass, 'flex flex-col divide-y divide-zinc-100')}>
                  {doctor.prices.map((p, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="text-zinc-700">{p.title}</span>
                      <span className="font-semibold text-zinc-900 whitespace-nowrap">{p.price}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Акции */}
            {clinicPromos.length > 0 && (
              <section>
                <SectionHeading id="promos">Акции</SectionHeading>
                <div className="grid sm:grid-cols-2 gap-4">
                  {clinicPromos.map((promo, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-3xl bg-amber-50 border border-amber-100 p-6"
                    >
                      <span className="w-11 h-11 rounded-xl bg-white text-amber-600 flex items-center justify-center shrink-0">
                        <Tag size={20} />
                      </span>
                      <div>
                        <p className="font-medium text-zinc-900 leading-snug">{promo.title}</p>
                        {promo.note && <p className="text-sm text-zinc-500 mt-1">{promo.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Используемые технологии */}
            {clinicTechnologies.length > 0 && (
              <section>
                <SectionHeading id="technologies">Используемые технологии</SectionHeading>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clinicTechnologies.map((t) => (
                    <div key={t.title} className={cn(cardClass, 'p-5')}>
                      <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                        <Sparkles size={20} />
                      </span>
                      <h3 className="font-semibold text-zinc-900 mb-1.5 leading-snug">{t.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Другие врачи */}
            {others.length > 0 && (
              <section>
                <SectionHeading id="others">Другие врачи</SectionHeading>
                <div className="grid sm:grid-cols-2 gap-4">
                  {others.map((d) => (
                    <Link
                      key={d.id}
                      to={`/doctors/${d.id}`}
                      className="group flex items-center gap-4 rounded-3xl bg-card border border-black/[0.05] shadow-sm hover:shadow-md hover:border-amber-500/40 p-4 transition-all"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-100">
                        {d.photoUrl ? (
                          <img src={d.photoUrl} alt={d.name} className="w-full h-full object-cover" />
                        ) : (
                          <BlackPlaceholder label={d.photoLabel} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-zinc-900 group-hover:text-amber-600 transition-colors truncate">
                          {d.name}
                        </p>
                        <p className="text-sm text-zinc-500 truncate">{d.specialty}</p>
                      </div>
                      <ArrowRight
                        size={20}
                        className="ml-auto shrink-0 text-zinc-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
