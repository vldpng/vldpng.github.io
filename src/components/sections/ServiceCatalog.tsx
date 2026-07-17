import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { FadeIn } from '../ui/fade-in';
import { serviceCategories } from '../../data/services';

export function ServiceCatalog() {
  // По умолчанию раскрыта первая категория.
  const [openId, setOpenId] = useState<string | null>(serviceCategories[0]?.id ?? null);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <FadeIn delay={0.1} className="flex flex-col gap-3">
          {serviceCategories.map((cat) => {
            const isOpen = openId === cat.id;
            return (
              <div
                key={cat.id}
                className="bg-card dark:bg-zinc-900 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_4px_20px_rgb(58,58,58,0.03)] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : cat.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-2 md:px-3 py-5"
                >
                  <span
                    className={cn(
                      'text-sm md:text-base font-semibold uppercase tracking-wider transition-colors',
                      isOpen
                        ? 'text-amber-700 dark:text-amber-500'
                        : 'text-zinc-900 dark:text-zinc-100',
                    )}
                  >
                    {cat.title}
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
                      <div className="px-2 md:px-3 pb-8 pt-1">
                        {cat.description && (
                          <p className="text-body text-zinc-600 dark:text-zinc-400 mb-6 max-w-3xl">
                            {cat.description}
                          </p>
                        )}

                        {cat.items.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
                            {cat.items.map((item) => (
                              <div
                                key={item.name}
                                className="group flex items-center justify-between gap-3 border-b border-zinc-200/70 dark:border-zinc-800 py-2.5 text-sm text-zinc-600 dark:text-zinc-300"
                              >
                                <span className="leading-snug group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                  {item.name}
                                </span>
                                <ArrowRight
                                  size={15}
                                  className="shrink-0 text-zinc-300 dark:text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm italic text-zinc-400 dark:text-zinc-500">
                            Подробное описание услуг этой категории скоро появится.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
