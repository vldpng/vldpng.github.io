import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Search, Layers, Syringe, Bandage, Smile, Baby, Sparkles, Microscope } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MaskIcon } from '../ui/MaskIcon';

interface PriceCategory {
  title: string;
  /** Запасная иконка: рисуется, когда для категории нет своей SVG-маски. */
  icon: LucideIcon;
  /** Маска из /public/icons. Нарисованных иконок меньше, чем категорий. */
  iconSrc?: string;
  items: { name: string; price: string }[];
}

const priceCategories: PriceCategory[] = [
  {
    title: "Диагностика",
    icon: Search,
    iconSrc: "/icons/dental-checkup.svg",
    items: [
      { name: "Первичная консультация врача-стоматолога", price: "45 €" },
      { name: "Обследование в экстренных случаях", price: "50 €" },
      { name: "Рентген снимок", price: "15 €" },
      { name: "Интраоральное 3D сканирование", price: "60 €" }
    ]
  },
  {
    title: "Терапия",
    icon: Bandage,
    iconSrc: "/icons/decay.svg",
    items: [
      { name: "Консультация пациента с первичным осмотром состояния полости рта", price: "40 €" },
      { name: "Составление письменного плана лечения", price: "70 €" },
      { name: "Восстановление зуба пломбой на 1 поверхности", price: "80 €" },
      { name: "Восстановление зуба пломбой на 2 поверхностях", price: "100 €" },
      { name: "Восстановление зуба пломбой на 3 и более поверхностях", price: "120 €" },
      { name: "Поверхностная анестезия", price: "3 €" },
      { name: "Инфильтрационная анестезия", price: "15 €" },
      { name: "Проводниковая анестезия", price: "20 €" },
      { name: "Снятие коронки", price: "30 €" },
      { name: "Установка коффердама", price: "20 €" }
    ]
  },
  {
    title: "Эндодонтия",
    icon: Microscope,
    items: [
      { name: "Подготовка одного корневого канала", price: "130 €" },
      { name: "Подготовка двух корневых каналов", price: "150 €" },
      { name: "Подготовка трёх корневых каналов", price: "200 €" },
      { name: "Подготовка четырёх корневых каналов", price: "210 €" },
      { name: "Подготовка пяти корневых каналов", price: "210 €" },
      { name: "Пломбирование одного корневого канала", price: "100 €" },
      { name: "Пломбирование двух корневых каналов", price: "120 €" },
      { name: "Пломбирование трёх корневых каналов", price: "140 €" },
      { name: "Пломбирование четырёх корневых каналов", price: "160 €" },
      { name: "Пломбирование пяти корневых каналов", price: "170 €" },
      { name: "Перелечивание одного корневого канала", price: "220 €" },
      { name: "Перелечивание двух корневых каналов", price: "260 €" },
      { name: "Перелечивание трёх корневых каналов", price: "300 €" },
      { name: "Перелечивание четырёх корневых каналов", price: "310 €" },
      { name: "Перелечивание пяти корневых каналов", price: "320 €" },
      { name: "Повторная обработка корневого канала", price: "60 €" },
      { name: "Нанесение биоматериала", price: "80 €" },
      { name: "Использование микроскопа (30 минут)", price: "35 €" },
      { name: "Использование микроскопа (1 час)", price: "70 €" },
      { name: "Поверхностная анестезия", price: "3 €" },
      { name: "Инфильтрационная анестезия", price: "15 €" },
      { name: "Проводниковая анестезия", price: "20 €" },
      { name: "Дополнительная анестезия", price: "5 €" }
    ]
  },
  {
    title: "Ортопедия",
    icon: Layers,
    iconSrc: "/icons/dental-crown.svg",
    items: [
      { name: "Керамическая коронка", price: "600 €" },
      { name: "Винир", price: "700 €" },
      { name: "Металлическая коронка", price: "450 €" },
      { name: "Циркониевая коронка", price: "650 €" },
      { name: "Циркониевая коронка с керамическим нанесением", price: "700 €" },
      { name: "Коронка на импланте", price: "800 €" },
      { name: "Вкладка", price: "200 €" },
      { name: "Съёмный протез", price: "от 400 €" },
      { name: "Съёмный протез с металлической основой", price: "от 1200 €" },
      { name: "Протез на имплантах", price: "от 1500 €" },
      { name: "Ночная капа", price: "150 €" }
    ]
  },
  {
    title: "Хирургия",
    icon: Syringe,
    items: [
      { name: "Удаление подвижного зуба", price: "60 €" },
      { name: "Удаление однокорневого зуба", price: "80 €" },
      { name: "Удаление многокорневого зуба", price: "120 €" },
      { name: "Удаление зуба с остеотомией", price: "50 – 100 €" },
      { name: "Удаление зуба мудрости и обработка раны", price: "160 €" },
      { name: "Удаление ретинированного зуба мудрости и обработка раны", price: "250 €" },
      { name: "Резекция верхушки корня однокорневого зуба", price: "300 €" },
      { name: "Резекция верхушки корня двухкорневого зуба", price: "400 €" },
      { name: "Лечение альвеолита", price: "100 €" }
    ]
  },
  {
    title: "Имплантология",
    icon: Syringe,
    iconSrc: "/icons/implant.svg",
    items: [
      { name: "Импланты фирмы Root", price: "450 €" },
      { name: "Импланты фирмы Megagen", price: "650 €" },
      { name: "Импланты фирмы Straumann", price: "800 €" },
      { name: "Раскрытие импланта", price: "100 €" },
      { name: "Костная аугментация", price: "от 500 €" },
      { name: "Пластика мягких тканей", price: "от 300 €" }
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
      { name: "Пломбирование молочных зубов", price: "70 – 80 €" },
      { name: "Временная пломба для молочного зуба", price: "50 €" },
      { name: "Витальная пульпотомия молочного зуба", price: "60 €" },
      { name: "Удаление молочного зуба", price: "60 €" },
      { name: "Поверхностная анестезия", price: "3 €" },
      { name: "Инфильтрационная анестезия", price: "15 €" },
      { name: "Проводниковая анестезия", price: "20 €" },
      { name: "Дополнительная анестезия", price: "5 €" }
    ]
  },
  {
    title: "Профессиональная гигиена",
    icon: Sparkles,
    iconSrc: "/icons/higien.svg",
    items: [
      { name: "Полная гигиена полости рта", price: "90 €" },
      { name: "Полная гигиена полости рта после снятия ортодонтических кап", price: "120 €" },
      { name: "Отбеливание зубов с помощью системы отбеливания Flash", price: "350 €" },
      { name: "Капы для отбеливания + гель", price: "250 €" },
      { name: "Нанесение фторлака на 1 зуб", price: "10 €" },
      { name: "Нанесение фторлака на 1 челюсть", price: "30 €" },
      { name: "Маскировка белых и пигментированных пятен на 1 зубе с использованием системы ICON", price: "80 €" },
      { name: "Маскировка белых и пигментированных пятен на каждом следующем зубе с использованием системы ICON", price: "60 €" },
      { name: "Медикаментозная обработка десневых карманов", price: "20 €" }
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
