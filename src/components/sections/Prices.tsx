import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Search, Layers, Syringe, Bandage, Smile, Baby, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '../ui/fade-in';
import { MaskIcon } from '../ui/MaskIcon';

const priceCategories = [
  {
    title: "Диагностика",
    icon: Search,
    iconSrc: "/icons/dental-checkup.svg",
    items: [
      { name: "Первичная консультация врача-стоматолога", price: "от 20 €" },
      { name: "Компьютерная томография (КТ) 3D", price: "от 50 €" },
      { name: "Панорамный снимок (ОПТГ)", price: "от 30 €" }
    ]
  },
  {
    title: "Терапия",
    icon: Bandage,
    iconSrc: "/icons/decay.svg",
    items: [
      { name: "Лечение кариеса (средний)", price: "от 70 €" },
      { name: "Лечение кариеса (глубокий)", price: "от 100 €" },
      { name: "Лечение пульпита (1 канал)", price: "от 150 €" },
      { name: "Эстетическая реставрация зуба", price: "от 120 €" }
    ]
  },
  {
    title: "Ортопедия",
    icon: Layers,
    iconSrc: "/icons/dental-crown.svg",
    items: [
      { name: "Металлокерамическая коронка", price: "от 250 €" },
      { name: "Керамическая коронка (E.max/Циркон)", price: "от 450 €" },
      { name: "Керамический винир", price: "от 500 €" },
      { name: "Съемный протез", price: "от 400 €" }
    ]
  },
  {
    title: "Хирургия",
    icon: Syringe,
    iconSrc: "/icons/implant.svg",
    items: [
      { name: "Удаление зуба простое", price: "от 50 €" },
      { name: "Удаление зуба сложное", price: "от 80 €" },
      { name: "Удаление зуба мудрости", price: "от 120 €" },
      { name: "Установка имплантата (без коронки)", price: "от 600 €" }
    ]
  },
  {
    title: "Ортодонтия",
    icon: Smile,
    iconSrc: "/icons/braces.svg",
    items: [
      { name: "Консультация ортодонта", price: "от 40 €" },
      { name: "Лечение на элайнерах (1 челюсть)", price: "от 1500 €" },
      { name: "Комплексное лечение двух челюстей", price: "от 2500 €" },
      { name: "Корректирующая капа", price: "от 150 €" }
    ]
  },
  {
    title: "Детская стоматология",
    icon: Baby,
    iconSrc: "/icons/kids.svg",
    items: [
      { name: "Консультативный прием детского врача-стоматолога", price: "15 €" },
      { name: "3Д - сканирование детям перед установкой ортодонтического аппарата (2 челюсти)", price: "35 €" },
      { name: "Лечение периодонтита молочного зуба (первое посещение)", price: "52 €" },
      { name: "Лечение пульпита молочного зуба (первое посещение)", price: "48 €" },
      { name: "Лечение пульпита молочного зуба ампутационным методом", price: "72 €" },
      { name: "Удаление молочного зуба (простое)", price: "18 €" },
      { name: "Удаление молочного зуба (сложное)", price: "36 €" },
      { name: "Восстановление молочного зуба пломбой (кариес до 1/3)", price: "42 €" },
      { name: "Герметизация фиссур (неинвазивная)", price: "42 €" },
      { name: "Герметизация фиссур (инвазивная)", price: "55 €" },
      { name: "Профессиональная гигиена полости рта по протоколу GBT (молочный прикус)", price: "30 €" },
      { name: "Профессиональная гигиена полости рта по протоколу GBT (смешанный прикус)", price: "48 €" }
    ]
  },
  {
    title: "Профессиональная гигиена",
    icon: Sparkles,
    iconSrc: "/icons/higien.svg",
    items: [
      { name: "Профессиональная гигиена полости рта по протоколу GBT", price: "от 80 €" },
      { name: "Снятие зубных отложений (Air Flow)", price: "от 50 €" },
      { name: "Полировка зубов", price: "от 30 €" },
      { name: "Реминерализирующая терапия (фторирование)", price: "от 25 €" }
    ]
  },
  {
    title: "Отбеливание",
    icon: Star,
    iconSrc: "/icons/whitening.svg",
    items: [
      { name: "Кабинетное отбеливание Flash", price: "от 250 €" },
      { name: "Домашнее отбеливание (каппы + гель)", price: "от 150 €" },
      { name: "Внутриканальное отбеливание (1 зуб)", price: "от 60 €" }
    ]
  }
];

export function Prices() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { category?: string } | null;
    if (state?.category) {
      const idx = priceCategories.findIndex(c => c.title === state.category);
      if (idx !== -1) {
        setOpenIndexes(prev => prev.includes(idx) ? prev : [...prev, idx]);
        setTimeout(() => {
          const element = document.getElementById(`cat-${idx}`);
          if (element) {
            const offset = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [location.state]);

  const toggleAccordion = (index: number) => {
    setOpenIndexes(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const scrollToCategory = (id: string, index: number) => {
    const element = document.getElementById(id);
    if (element) {
      if (!openIndexes.includes(index)) {
        setOpenIndexes(prev => [...prev, index]);
      }
      const offset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-2 md:px-3 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24">
          <div className="bg-card dark:bg-zinc-900 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/[0.02] dark:border-white/[0.02]">
            <ul className="space-y-4">
              {priceCategories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <li key={idx}>
                    <button
                      onClick={() => scrollToCategory(`cat-${idx}`, idx)}
                      className="w-full flex items-center gap-4 text-left group py-1 border-none bg-transparent outline-none ring-0 appearance-none"
                    >
                      {cat.iconSrc ? (
                        <MaskIcon src={cat.iconSrc} className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors shrink-0" />
                      ) : (
                        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors shrink-0" />
                      )}
                      <span className="text-zinc-600 dark:text-zinc-300 font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        {cat.title}
                      </span>
                    </button>
                    {idx < priceCategories.length - 1 && (
                      <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800 mt-4" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4 pb-20">
          {priceCategories.map((category, idx) => {
            const isOpen = openIndexes.includes(idx);
            const Icon = category.icon;

            return (
              <div 
                key={idx}
                id={`cat-${idx}`}
                className={cn(
                  "bg-card dark:bg-zinc-900 rounded-3xl transition-all duration-300 scroll-m-24",
                  "shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/[0.02] dark:border-white/[0.02]",
                  isOpen ? "pt-6 pb-2" : "py-6"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between px-2 md:px-3 text-left focus:outline-none appearance-none"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      {category.iconSrc ? (
                        <MaskIcon src={category.iconSrc} className="w-[22px] h-[22px] text-amber-500 dark:text-amber-400" />
                      ) : (
                        <Icon className="w-[22px] h-[22px] text-amber-500 dark:text-amber-400" strokeWidth={1.5} />
                      )}
                    </div>
                    <span className="text-[18px] md:text-[22px] font-medium text-zinc-800 dark:text-zinc-100 tracking-tight">{category.title}</span>
                  </div>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ml-4",
                    "bg-zinc-50 dark:bg-zinc-800 text-zinc-500",
                    isOpen && "rotate-180"
                  )}>
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 md:px-3">
                        <ul className="space-y-0 pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex flex-col md:flex-row md:items-center py-5 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 last:pb-2 gap-3 md:gap-0">
                              <span className="text-zinc-600 dark:text-zinc-300 text-[14px] md:text-[15px] font-normal leading-snug pr-0 md:pr-4 flex-1">
                                {item.name}
                              </span>
                              <div className="shrink-0 flex items-center justify-start md:justify-end">
                                <span className="bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-100 whitespace-nowrap min-w-[80px] text-center border border-black/5 dark:border-white/5">
                                  {item.price}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
