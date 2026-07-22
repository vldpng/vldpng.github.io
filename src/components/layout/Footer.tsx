import React, { useState } from 'react';
import { Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clinic } from '../../data/clinic';
import { handleHashClick } from '../../lib/utils';

const columns = [
  {
    title: 'Услуги',
    links: [
      { label: 'Имплантация', href: '/services/implants', type: 'route' as const },
      { label: 'Керамические реставрации', href: '/services/ceramic', type: 'route' as const },
      { label: 'Лечение под микроскопом', href: '/services/microscope', type: 'route' as const },
      { label: 'Профессиональная гигиена', href: '/services/hygiene', type: 'route' as const },
      { label: 'Отбеливание Flash', href: '/services/whitening', type: 'route' as const },
      { label: 'Элайнеры', href: '/services/aligners', type: 'route' as const },
    ],
  },
  {
    title: 'Клиника',
    links: [
      { label: 'О клинике', href: '/about', type: 'route' as const },
      { label: 'Врачи', href: '/doctors', type: 'route' as const },
      { label: 'Цены', href: '/prices', type: 'route' as const },
      { label: 'Пациентам', href: '/patients', type: 'route' as const },
      { label: 'Отзывы', href: '/#reviews', type: 'hash' as const },
    ],
  },
  {
    title: 'Информация',
    links: [
      { label: 'Контакты', href: '/#contacts', type: 'hash' as const },
      { label: 'FAQ', href: '/#faq', type: 'hash' as const },
      { label: 'Политика конфиденциальности', href: '/privacy', type: 'route' as const },
      { label: 'Пользовательское соглашение', href: '/terms', type: 'route' as const },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: clinic.social.instagram, label: 'Instagram' },
  { Icon: Facebook, href: clinic.social.facebook, label: 'Facebook' },
  { Icon: MessageCircle, href: clinic.social.whatsapp, label: 'WhatsApp' },
  { Icon: Send, href: clinic.social.telegram, label: 'Telegram' },
];

const linkClass =
  'text-[13px] text-zinc-400 hover:text-amber-500 transition-colors';

export function Footer() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneValue = phone.trim();
    if (!phoneValue) return;
    // Без бэкенда: открываем письмо клинике с данными пациента для обратного звонка.
    const subject = encodeURIComponent('Заявка на обратный звонок — RoyalDent');
    const body = encodeURIComponent(
      `Здравствуйте! Прошу перезвонить мне.\nИмя: ${name.trim() || '—'}\nТелефон: ${phoneValue}`,
    );
    window.location.href = `${clinic.emailHref}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="relative bg-zinc-950 text-zinc-300 overflow-hidden font-sans">
      {/* Мягкое свечение для глубины */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 left-[8%] w-[45%] h-72 rounded-full bg-amber-500/10 blur-[160px]" />
        <div className="absolute top-10 right-[5%] w-[35%] h-64 rounded-full bg-amber-400/[0.06] blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 lg:pt-24">

        {/* Колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">

          {/* Ссылки */}
          {columns.map((col) => (
            <div
              key={col.title}
              className="lg:col-span-2 first:lg:col-span-3 border-t border-white/10 pt-6"
            >
              <h4 className="text-amber-500 text-[15px] font-medium mb-5">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.type === 'route' ? (
                      <Link to={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={handleHashClick(link.href.replace('/', ''))}
                        className={linkClass}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Подписка */}
          <div className="lg:col-span-5 border-t border-white/10 pt-6">
            <h3 className="text-white text-xl md:text-2xl font-medium leading-snug mb-6 max-w-sm">
              Оставьте телефон и мы вам перезвоним
            </h3>

            <form onSubmit={handleCallback} className="max-w-md flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                aria-label="Ваше имя"
                className="w-full rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-zinc-500 px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Номер телефона"
                aria-label="Номер телефона"
                className="w-full rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-zinc-500 px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              <button
                type="submit"
                className="btn-sweep self-start bg-amber-500 hover:bg-amber-600 text-white px-7 py-3 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Заказать звонок
              </button>
            </form>

            {/* Соцсети */}
            <div className="flex items-center gap-3 mt-7">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-colors"
                >
                  <Icon size={16} className={label === 'Facebook' ? 'fill-current' : ''} />
                </a>
              ))}
            </div>

            {/* Контакты */}
            <div className="flex flex-col gap-1 mt-7">
              <a
                href={clinic.phoneHref}
                className="text-base font-semibold text-white hover:text-amber-500 transition-colors"
              >
                {clinic.phoneDisplay}
              </a>
              <span className="text-[13px] text-zinc-400">
                {clinic.address.full} · {clinic.hours.short}
              </span>
            </div>
          </div>
        </div>

        {/* Гигантский логотип-водяной знак */}
        <div
          className="select-none pointer-events-none relative mt-16 lg:mt-20 -mb-[2vw]"
          aria-hidden="true"
        >
          <span
            className="block text-center font-bold tracking-tighter leading-[0.8]"
            style={{
              fontSize: 'clamp(70px, 18.2vw, 320px)',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(255,255,255,0.12)',
            }}
          >
            RoyalDent
          </span>
        </div>

        {/* Нижняя строка */}
        <div className="relative border-t border-white/10 py-6 lg:pr-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-zinc-500 leading-relaxed">
              SIA «Royal Dent» · Reģ. Nr.: 40203129158
              <br />
              Veselības Inspekcijas atļauja Nr. 130000095
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-[13px] text-zinc-400 hover:text-amber-500 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-[13px] text-zinc-400 hover:text-amber-500 transition-colors">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
