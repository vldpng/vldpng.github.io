import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Microscope, Sparkles } from 'lucide-react';

import { AnimatedText } from '../ui/animated-text';
import { useBookingModal } from '../../context/BookingModalContext';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: <ShieldCheck size={16} />, label: 'Без боли и страха' },
  { icon: <Microscope size={16} />, label: 'Лечение под микроскопом' },
  { icon: <Sparkles size={16} />, label: 'Цифровая диагностика' },
];

export function Hero() {
  const { openModal } = useBookingModal();

  return (
    <section className="relative min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 overflow-hidden">

      {/* Background Video Placeholder — элегантный анимированный градиент */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-br from-amber-50 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black" />
        {/* Мягкие световые пятна */}
        <motion.div
          className="absolute -top-32 -left-24 w-[40rem] h-[40rem] rounded-full bg-amber-200/40 dark:bg-amber-500/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-10rem] right-[-6rem] w-[36rem] h-[36rem] rounded-full bg-[#E4EBFB]/50 dark:bg-[#1E2740]/30 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Тонкая сетка для глубины */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Overlay для читаемости текста */}
        <div className="absolute inset-0 bg-zinc-50/40 dark:bg-zinc-950/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-3 w-full flex-1 flex flex-col py-20 relative z-10 justify-center">

        {/* Text Content */}
        <div className="w-full max-w-4xl flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6 mt-[calc(4rem_+_30px)] md:mt-[calc(7rem_+_30px)]"
          >
            <AnimatedText
              as="h1"
              text={'Идеальная улыбка\n— Ваша уверенность'}
              className="items-start max-w-[800px]"
              textClassName="h-display text-zinc-900 dark:text-zinc-50 text-left"
              underlineClassName="hidden"
              duration={0.03}
              delay={0.1}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2"
            >
              <button
                onClick={() => openModal()}
                className="group inline-flex items-center justify-center gap-2 btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Записаться на приём
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/prices"
                className="inline-flex items-center justify-center gap-2 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-200 text-zinc-900 dark:text-zinc-100 px-7 py-3.5 rounded-full text-sm font-semibold transition-colors"
              >
                Услуги и цены
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-3 mt-4"
            >
              {highlights.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400"
                >
                  <span className="text-amber-500">{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
