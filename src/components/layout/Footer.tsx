import React from 'react';
import { Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookingModal } from '../../context/BookingModalContext';
import { clinic } from '../../data/clinic';
import { handleHashClick } from '../../lib/utils';

const columns = [
  // TODO: вернуть колонку «Услуги» с новыми предложениями
  // (ранее: эстетика, имплантация, микроскоп, гигиена, отбеливание, элайнеры)
  {
    title: 'Клиника',
    links: [
      { label: 'О нас', href: '/about', type: 'route' as const },
      { label: 'Врачи', href: '/doctors', type: 'route' as const },
      { label: 'Цены', href: '/prices', type: 'route' as const },
      { label: 'Пациентам', href: '/patients', type: 'route' as const },
      { label: 'Отзывы', href: '/#reviews', type: 'hash' as const },
    ],
  },
  {
    title: 'Информация',
    links: [
      { label: 'Политика конфиденциальности', href: '/privacy', type: 'route' as const },
      { label: 'Пользовательское соглашение', href: '/terms', type: 'route' as const },
      { label: 'FAQ', href: '/#faq', type: 'hash' as const },
      { label: 'Контакты', href: '/#contacts', type: 'hash' as const },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { openModal } = useBookingModal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-amber-50 dark:bg-zinc-950 overflow-hidden font-sans">
      {/* Smooth top fade — blends footer color with previous section's bg-zinc-50 */}
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-50 to-transparent dark:hidden pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Decorative angular gradient blur — anchored to the top-left corner */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-24 w-[55%] h-72 rounded-full bg-amber-500/35 dark:bg-amber-500/25 blur-[150px]" />
        <div className="absolute top-4 left-[18%] w-[40%] h-56 rounded-full bg-zinc-900/18 dark:bg-zinc-700/40 blur-[150px]" />
        <div className="absolute top-28 left-[38%] w-[42%] h-60 rounded-full bg-amber-400/22 dark:bg-amber-400/15 blur-[160px]" />
      </div>

      <div className="relative pt-32 lg:pt-40 px-2 md:px-3 pb-0">

        {/* Top: logo + columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-16 mb-20 lg:mb-28">

          {/* Brand block */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col gap-8">
            <Link to="/" onClick={scrollToTop} className="flex items-center group">
              <img
                src="/brand/logo.svg"
                alt="RoyalDent"
                className="h-12 w-auto object-contain dark:brightness-0 dark:invert transition-all"
              />
            </Link>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
              Безупречная эстетика и комфорт на каждом этапе вашего лечения.
              {' '}
              {clinic.address.full}.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={clinic.phoneHref}
                className="text-base font-semibold text-zinc-900 dark:text-zinc-50 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
              >
                {clinic.phoneDisplay}
              </a>
              <a
                href={clinic.emailHref}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
              >
                {clinic.email}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link, i) => (
                  <li key={i}>
                    {link.type === 'route' ? (
                      <Link
                        to={link.href}
                        className="text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={handleHashClick(link.href.replace('/', ''))}
                        className="text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
                {col.title === 'Информация' && (
                  <li>
                    <button
                      onClick={() => openModal()}
                      className="text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors text-left"
                    >
                      Записаться на приём
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}

          {/* Connect column */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
              Соцсети
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={clinic.social.instagram}
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                >
                  <Instagram size={14} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href={clinic.social.facebook}
                  aria-label="Facebook"
                  className="inline-flex items-center gap-2 text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                >
                  <Facebook size={14} className="fill-current" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href={clinic.social.whatsapp}
                  aria-label="WhatsApp"
                  className="inline-flex items-center gap-2 text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={clinic.social.telegram}
                  aria-label="Telegram"
                  className="inline-flex items-center gap-2 text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                >
                  <Send size={14} /> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: copyright + giant wordmark */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-light text-zinc-500 dark:text-zinc-500">
                © {clinic.legalName}, {currentYear}. Все права защищены.
              </p>
              <p className="text-xs font-light text-zinc-500 dark:text-zinc-500">
                Reg. nr. {clinic.regNr}
              </p>
            </div>
          </div>

          {/* Giant wordmark — partially clipped at bottom */}
          <div className="select-none pointer-events-none relative -mb-[3vw]">
            <span
              className="block text-center font-bold tracking-tighter leading-[0.85] bg-gradient-to-b from-zinc-900 to-zinc-900/30 dark:from-zinc-50 dark:to-zinc-50/10 bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(80px, 22vw, 380px)' }}
              aria-hidden="true"
            >
              RoyalDent
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
