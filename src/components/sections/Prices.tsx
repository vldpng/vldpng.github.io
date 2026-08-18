import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PriceIcon } from '../ui/price-icons';
import { usePrices } from '@/lib/usePrices';

export function Prices() {
  // С сервера (правки из админки), со статическим каталогом как запасным.
  const priceCategories = usePrices();
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
                return (
                  <li key={idx}>
                    <button
                      onClick={() => scrollToCategory(`cat-${idx}`, idx)}
                      className="w-full flex items-center gap-4 text-left group py-1 border-none bg-transparent outline-none ring-0 appearance-none"
                    >
                      <PriceIcon
                        icon={cat.icon}
                        iconSrc={cat.iconSrc}
                        className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors shrink-0"
                      />
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

            return (
              <div 
                key={idx}
                id={`cat-${idx}`}
                className={cn(
                  // transition-colors, а не transition-all: последний заодно
                  // анимировал padding и box-shadow при каждом раскрытии,
                  // хотя нужен был только цветовой переход.
                  "bg-card dark:bg-zinc-900 rounded-3xl transition-colors duration-300 scroll-m-24",
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
                      <PriceIcon
                        icon={category.icon}
                        iconSrc={category.iconSrc}
                        className="w-[22px] h-[22px] text-amber-500 dark:text-amber-400"
                      />
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

                {/* Раскрытие через grid-template-rows 0fr → 1fr, а не через
                    анимацию height в framer-motion. Прежний вариант гнал
                    покадровый JS на главном потоке: замеры давали медиану
                    кадра 33–48 мс и 10–12 просаженных кадров на раскрытие
                    при 16.7 мс в простое. Здесь переход целиком на стороне
                    CSS, JS в кадрах не участвует. */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
