import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * Плавающая кнопка «Наверх».
 * Появляется в правом нижнем углу после прокрутки страницы вниз
 * и плавно скроллит к началу при клике.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll(); // учесть стартовую позицию (например, при переходе по якорю)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Наверх"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed right-5 bottom-[calc(1.25rem_+_env(safe-area-inset-bottom))] z-50 w-12 h-12 rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/30 flex items-center justify-center hover:bg-amber-600 active:scale-95 transition-colors"
        >
          <ArrowUp size={20} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
