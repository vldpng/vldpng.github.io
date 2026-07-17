import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { useContactModal } from '../../context/ContactModalContext';

const faqs = [
  {
    q: 'Больно ли лечить зубы в клинике RoyalDent?',
    a: 'Нет. Мы используем аппарат компьютерной анестезии, который обеспечивает полностью безболезненное лечение с минимальным введением анестетика. Большинство процедур проходят абсолютно комфортно — без боли и страха.',
  },
  {
    q: 'Нужно ли записываться заранее?',
    a: 'Да, мы работаем по предварительной записи, чтобы вам не пришлось ждать в очереди. Записаться можно по телефону или через форму на сайте — администратор подберёт удобное для вас время.',
  },
  {
    q: 'Даёте ли вы гарантию на лечение?',
    a: 'Да. На все виды лечения и установленные конструкции предоставляется гарантия. Конкретный срок зависит от вида работ — врач подробно расскажет об этом на консультации.',
  },
  {
    q: 'Можно ли вылечить зуб за одно посещение?',
    a: 'Во многих случаях — да. Благодаря полному цифровому протоколу ряд процедур, таких как лечение кариеса и эстетические реставрации, мы выполняем за один визит.',
  },
  {
    q: 'Принимаете ли вы детей?',
    a: 'Да, у нас работает детский стоматолог. Мы находим подход к каждому ребёнку, чтобы первый визит к врачу прошёл спокойно, без страха и стресса.',
  },
  {
    q: 'На каких языках говорят ваши специалисты?',
    a: 'Наши врачи и администраторы свободно общаются на русском, латышском и английском языках.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openModal } = useContactModal();

  return (
    <section id="faq" className="bg-zinc-50 dark:bg-zinc-950 py-24 scroll-mt-24">
      {/* Структурированные данные для расширенных сниппетов в поиске */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-16">

          {/* Heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <FadeIn>
              <SectionBadge className="mb-4">FAQ</SectionBadge>
              <h2 className="h-section text-zinc-900 dark:text-zinc-50">
                Ответы на часто задаваемые вопросы
              </h2>
              <p className="text-lead text-zinc-500 dark:text-zinc-400 mt-6 max-w-sm">
                Собрали то, о чём пациенты спрашивают чаще всего. Не нашли ответ?
              </p>
              <button
                onClick={openModal}
                className="mt-6 inline-flex items-center justify-center btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg active:scale-95"
              >
                Задать свой вопрос
              </button>
            </FadeIn>
          </div>

          {/* Accordion */}
          <FadeIn delay={0.1} className="flex flex-col gap-3">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-card dark:bg-zinc-900 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_4px_20px_rgb(58,58,58,0.03)] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-2 md:px-3 py-5 md:py-6"
                  >
                    <span className="text-base md:text-lg font-medium text-zinc-900 dark:text-zinc-50">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        'w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-300',
                        isOpen
                          ? 'bg-amber-500 text-white rotate-180'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500',
                      )}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-2 md:px-3 pb-6 text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
