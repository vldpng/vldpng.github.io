import React, { useState } from 'react';
import { ChevronDown, Menu, X, Globe, MapPin, Phone, Clock, Instagram, Facebook, MessageCircle, Send, Moon, Sun, Search, AlignJustify } from 'lucide-react';
import { cn, handleHashClick } from '@/lib/utils';
import { NavHeader } from '../ui/nav-header';
import { Link } from 'react-router-dom';
import { useBookingModal } from '../../context/BookingModalContext';
import { clinic } from '../../data/clinic';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('RU');
  const { openModal: openBooking } = useBookingModal();

  return (
    <header className="absolute left-0 top-0 w-full py-4 pointer-events-none z-50 px-6 md:px-[50px]">
      {/* Единая матовая панель-«пилюля»: логотип, меню, язык и CTA внутри */}
      <div className="w-full flex items-center justify-between pointer-events-auto rounded-2xl border border-white/40 bg-white/15 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_60px_-25px_rgba(4,27,57,0.35)] px-4 md:px-8 py-2.5">
        
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer group"
        >
          <img src="/brand/logo.svg" alt="RoyalDent" className="h-12 md:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <NavHeader />

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button 
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors"
              onClick={() => setLangOpen(!langOpen)}
            >
              <Globe size={14} /> {currentLang} <ChevronDown size={14} className={cn("transition-transform", langOpen && "rotate-180")} />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-4 bg-card border border-zinc-200 shadow-xl rounded-xl py-2 flex flex-col min-w-[80px] animate-in fade-in slide-in-from-top-2">
                {['RU', 'EN', 'LV'].map((lang) => (
                  <button 
                    key={lang} 
                    className={cn(
                      "px-4 py-2 text-xs font-semibold text-left transition-colors",
                      currentLang === lang ? "text-zinc-900 bg-zinc-50" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    )}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangOpen(false);
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={(e) => { e.preventDefault(); openBooking(); }} className="btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95">
            Записаться на приём
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 pointer-events-auto active:scale-95 transition-transform"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Открыть меню"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] pointer-events-auto"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={cn(
          "md:hidden fixed top-0 right-0 w-[85%] max-w-[360px] h-[100dvh] bg-card dark:bg-zinc-950 z-[70] shadow-2xl flex flex-col pointer-events-auto transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
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

          <a
            href="/#reviews"
            onClick={(e) => {
              handleHashClick('#reviews')(e);
              setMobileMenuOpen(false);
            }}
            className="text-lg font-medium text-zinc-900 dark:text-zinc-100"
          >
            Отзывы
          </a>
          
          <hr className="border-zinc-100 dark:border-zinc-800 shrink-0" />
          
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500 uppercase tracking-widest"
                  onClick={() => setLangOpen(!langOpen)}
                >
                  <Globe size={16} /> {currentLang} <ChevronDown size={14} className={cn("transition-transform", langOpen && "rotate-180")} />
                </button>
                {langOpen && (
                  <div className="absolute bottom-full left-0 mb-4 bg-card border border-zinc-200 shadow-xl rounded-xl py-2 flex flex-col min-w-[80px] animate-in fade-in slide-in-from-bottom-2 z-50">
                    {['RU', 'EN', 'LV'].map((lang) => (
                      <button 
                        key={lang} 
                        className={cn(
                          "px-4 py-2 text-xs font-semibold text-left transition-colors",
                          currentLang === lang ? "text-zinc-900 bg-zinc-50" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                        )}
                        onClick={() => {
                          setCurrentLang(lang);
                          setLangOpen(false);
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => { setMobileMenuOpen(false); openBooking(); }} className="btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
              Записаться
            </button>
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3 shrink-0">
            <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <MapPin size={16} className="text-zinc-400 shrink-0" />
              <span className="truncate">{clinic.address.full}</span>
            </span>
            <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Clock size={16} className="text-zinc-400 shrink-0" />
              {clinic.hours.short}
            </span>
            <a href={clinic.phoneHref} className="flex items-center gap-2 text-sm text-zinc-900 dark:text-white font-medium pb-2">
              <Phone size={16} className="text-zinc-400 shrink-0" />
              {clinic.phoneDisplay}
            </a>

            <div className="flex items-center gap-4 pt-2">
              <a href={clinic.social.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <Instagram size={18} />
              </a>
              <a href={clinic.social.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <Facebook size={18} className="fill-current" />
              </a>
              <a href={clinic.social.whatsapp} aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href={clinic.social.telegram} aria-label="Telegram" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <Send size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
