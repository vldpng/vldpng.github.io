import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { clinic } from '../../data/clinic';
import { socialLinks, externalLinkProps } from '../../data/social';
import { cn, handleHashClick } from '../../lib/utils';

/**
 * Адрес панели администратора. Пустая строка = панели ещё нет: в подвале
 * рисуется неактивная иконка-заглушка. Вписать сюда путь или полный URL —
 * и кнопка станет рабочей ссылкой.
 */
const ADMIN_URL = '/admin';

/** Кнопка админки повторяет вид соседних иконок соцсетей. */
const adminButtonClass =
  'inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/70 hover:text-amber-400 hover:border-amber-500 transition-colors';

const columns = [
  {
    title: 'Услуги',
    links: [
      { label: 'Имплантация', href: '/services/implants', type: 'route' as const },
      { label: 'Протезирование зубов', href: '/services/prosthetics', type: 'route' as const },
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
      { label: 'Порядок записи', href: '/patients/booking', type: 'route' as const },
      // Правовые страницы держим здесь, а не отдельной строкой внизу:
      // «Политика конфиденциальности» иначе выводилась дважды.
      { label: 'Политика конфиденциальности', href: '/privacy', type: 'route' as const },
      { label: 'Правила распорядка', href: '/patients/rules', type: 'route' as const },
      // Постоянный доступ к настройкам cookie: по GDPR согласие нужно уметь
      // отозвать так же легко, как дать.
      { label: 'Cookie-файлы', href: '/cookies', type: 'route' as const },
    ],
  },
];

const linkClass =
  'text-[13px] text-white/70 hover:text-amber-400 transition-colors';

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
              <h4 className="text-amber-400 text-[15px] font-medium mb-5">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {/* Якорные ссылки тоже через Link: обычный <a href="/#reviews">
                        ведёт в корень сайта, а корень — это основной язык.
                        Русский посетитель попадал бы на латышскую главную. */}
                    <Link
                      to={link.href}
                      onClick={
                        link.type === 'hash'
                          ? handleHashClick(link.href.replace('/', ''))
                          : undefined
                      }
                      className={linkClass}
                    >
                      {link.label}
                    </Link>
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
                className="w-full rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/60 px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Номер телефона"
                aria-label="Номер телефона"
                className="w-full rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/60 px-4 py-3.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              <button
                type="submit"
                className="btn-sweep self-start bg-amber-500 hover:bg-amber-400 text-zinc-900 px-7 py-3 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Заказать звонок
              </button>
            </form>

            {/* Соцсети */}
            <div className="flex items-center gap-3 mt-7">
              {socialLinks.map(({ Icon, href, label, filled }) => (
                <a
                  key={label}
                  href={href}
                  {...externalLinkProps}
                  aria-label={label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/70 hover:text-amber-400 hover:border-amber-500 transition-colors"
                >
                  <Icon size={16} className={filled ? 'fill-current' : undefined} />
                </a>
              ))}

              {/* Вход в панель администратора. Пока заглушка: адреса нет,
                  поэтому кнопка неактивна и приглушена — иначе посетитель
                  кликал бы по ней впустую. Когда панель появится, достаточно
                  вписать путь в ADMIN_URL выше, и кнопка сама станет ссылкой. */}
              {ADMIN_URL ? (
                <a
                  href={ADMIN_URL}
                  aria-label="Панель администратора"
                  title="Панель администратора"
                  className={adminButtonClass}
                >
                  <LockKeyhole size={16} />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-label="Панель администратора (пока недоступна)"
                  title="Панель администратора — скоро"
                  className={cn(adminButtonClass, 'opacity-40 cursor-not-allowed')}
                >
                  <LockKeyhole size={16} />
                </button>
              )}
            </div>

            {/* Контакты */}
            <div className="flex flex-col gap-1 mt-7">
              <a
                href={clinic.phoneHref}
                className="text-base font-semibold text-white hover:text-amber-400 transition-colors"
              >
                {clinic.phoneDisplay}
              </a>
              <span className="text-[13px] text-white/70">
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

        {/* Нижняя строка: только реквизиты. Правовые ссылки переехали
            в колонку «Информация» — там они рядом с остальными разделами
            и не дублируются. */}
        <div className="relative border-t border-white/10 py-6 lg:pr-16">
          <span className="text-xs text-white/60 leading-relaxed">
            SIA «Royal Dent» · Reģ. Nr.: 40203129158
            <br />
            Veselības Inspekcijas atļauja Nr. 130000095
          </span>
        </div>
      </div>
    </footer>
  );
}
