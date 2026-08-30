import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn, handleHashClick } from '@/lib/utils';
import { NavHeader } from '../ui/nav-header';
import { Link } from 'react-router-dom';
import { useContactModal } from '../../context/ContactModalContext';
import { clinic } from '../../data/clinic';
import { LanguageSwitcher } from '../ui/language-switcher';
import { socialLinks, externalLinkProps } from '../../data/social';
import { MaskIcon } from '../ui/MaskIcon';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Состояние языка живёт в LanguageSwitcher и читается из адреса страницы.
  const [isHidden, setIsHidden] = useState(false);
  const { openModal: openBooking } = useContactModal();

  // Скрываем шапку при скролле вниз, показываем при скролле вверх.
  // На самом верху страницы шапка всегда видна.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (y <= 10) {
        setIsHidden(false);
      } else if (y > lastY + 4) {
        setIsHidden(true);
      } else if (y < lastY - 4) {
        setIsHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <header
      className={cn(
        'absolute left-0 top-0 w-full py-4 pointer-events-none z-50 px-6 md:px-[50px] transition-transform duration-300 ease-in-out',
        isHidden && !mobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      {/* Единая матовая панель-«пилюля»: логотип, меню, язык и CTA внутри */}
      <div className="w-full flex items-center justify-between pointer-events-auto rounded-2xl border border-white/40 bg-white/15 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_60px_-25px_rgba(59,59,61,0.35)] px-4 md:px-8 py-2.5">
        
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer group shrink-0"
        >
          {/* shrink-0 обязателен: логотип — широкий wordmark (374×67) без
              заданной ширины, и без него флекс сжимал его до нуля, как только
              содержимое шапки переставало помещаться. */}
          <img
            src="/brand/logo.png"
            alt="RoyalDent"
            width={374}
            height={67}
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <NavHeader />

        {/* Действия справа. На планшете горизонтальное меню не помещается
            (логотип + 6 пунктов + кнопка шире экрана), поэтому до xl пункты
            уходят в выдвижную панель, а в шапке остаются кнопка записи и бургер.
            Переключатель языка там же, в панели. */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          <div className="hidden xl:block">
            <LanguageSwitcher direction="down" size="sm" />
          </div>
          <button onClick={(e) => { e.preventDefault(); openBooking(); }} className="hidden md:block btn-sweep bg-amber-500 hover:bg-amber-400 text-zinc-900 px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap">
            Записаться на приём
          </button>

          <button
            className="xl:hidden p-2 text-zinc-600 dark:text-zinc-300 pointer-events-auto active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>

      {/* Подложка и панель живут вне <header>: у шапки есть translate для
          скрытия при скролле, а трансформация делает элемент containing block
          для fixed-потомков — внутри неё панель отсчитывалась бы от шапки
          (390×101), а не от экрана. */}

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] pointer-events-auto"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer.
          Обёртка ровно по экрану и с overflow-hidden обрезает панель, когда та
          уехала вправо. Без обёртки закрытая панель растягивала макет до
          ширины экрана + 360px: страницу можно было увести вбок (выглядело как
          самопроизвольно открытое меню), а fixed-элементы вроде кнопки
          «наверх» отсчитывались от раздутого макета и уползали за правый край.
          pointer-events-none, чтобы прозрачная обёртка не перехватывала клики. */}
      <div className="xl:hidden fixed inset-0 z-[70] overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute top-0 right-0 w-[85%] max-w-[360px] h-full bg-card dark:bg-zinc-950 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full"
          )}
        >
        <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0 h-[72px]">
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">Меню</span>
          <button
            className="p-2 -mr-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-full transition-colors active:scale-95"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Закрыть меню"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6 overscroll-contain">
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900 dark:text-zinc-100">О клинике</Link>

          <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Услуги</Link>

          <Link to="/prices" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Цены</Link>

          <Link to="/doctors" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Врачи</Link>

          <Link to="/patients" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Пациентам</Link>

          <Link
            to="/#reviews"
            onClick={(e) => {
              handleHashClick('#reviews')(e);
              setMobileMenuOpen(false);
            }}
            className="text-lg font-medium text-zinc-900 dark:text-zinc-100"
          >
            Отзывы
          </Link>

          <hr className="border-zinc-100 dark:border-zinc-800 shrink-0" />
          
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <LanguageSwitcher direction="up" size="md" />
            </div>
            <button onClick={() => { setMobileMenuOpen(false); openBooking(); }} className="btn-sweep bg-amber-500 hover:bg-amber-400 text-zinc-900 px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
              Записаться
            </button>
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3 shrink-0">
            <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <MaskIcon src="/images/icons/placeholder.webp" className="w-4 h-4 shrink-0 text-zinc-400" />
              <span className="truncate">{clinic.address.full}</span>
            </span>
            <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <MaskIcon src="/images/icons/timing.webp" className="w-4 h-4 shrink-0 text-zinc-400" />
              {clinic.hours.short}
            </span>
            <a href={clinic.phoneHref} className="flex items-center gap-2 text-sm text-zinc-900 dark:text-white font-medium">
              <MaskIcon src="/images/icons/phone-call.webp" className="w-4 h-4 shrink-0 text-zinc-400" />
              {clinic.phoneDisplay}
            </a>
            <a href={clinic.emailHref} className="flex items-center gap-2 text-sm text-zinc-900 dark:text-white font-medium pb-2">
              <MaskIcon src="/images/icons/mail.webp" className="w-4 h-4 shrink-0 text-zinc-400" />
              {clinic.email}
            </a>

            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map(({ src, href, label }) => (
                <a
                  key={label}
                  href={href}
                  {...externalLinkProps}
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <img src={src} alt="" width={28} height={28} className="w-7 h-7 rounded-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
