import React, { useEffect } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useContactModal } from '../../context/ContactModalContext';
import { clinic } from '../../data/clinic';

export function ContactModal() {
  const { isOpen, closeModal } = useContactModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="bg-card dark:bg-zinc-900 rounded-[2rem] p-3 shadow-2xl flex flex-col lg:flex-row relative overflow-hidden pointer-events-auto max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={closeModal}
                aria-label="Закрыть"
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Left Dark Info Panel */}
              <div className="bg-zinc-950 text-white rounded-[1.5rem] p-8 lg:p-12 lg:w-[40%] flex flex-col justify-between relative overflow-hidden shrink-0">
                {/* Decorative background circles */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-zinc-800 rounded-full opacity-60 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-zinc-700 rounded-full opacity-60 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Контактная информация</h2>
                  <p className="text-zinc-400 font-light mb-12 text-sm">Оставьте сообщение, и мы свяжемся с вами!</p>
                  
                  <div className="space-y-8 text-[15px]">
                    <div className="flex items-center gap-6">
                      <Phone className="text-amber-500 shrink-0 w-6 h-6" />
                      <a href={clinic.phoneHref} className="opacity-90 hover:opacity-100 transition-opacity font-light">{clinic.phoneDisplay}</a>
                    </div>

                    <div className="flex items-center gap-6">
                      <Mail className="text-amber-500 shrink-0 w-6 h-6" />
                      <a href={clinic.emailHref} className="opacity-90 hover:opacity-100 transition-opacity font-light">{clinic.email}</a>
                    </div>

                    <div className="flex items-start gap-6">
                      <MapPin className="text-amber-500 mt-1 shrink-0 w-6 h-6" />
                      <p className="opacity-90 font-light leading-relaxed max-w-[200px]">{clinic.address.full}, Latvia</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-16 relative z-10">
                  <a href={clinic.social.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition-colors text-zinc-950">
                    <Facebook size={18} className="fill-current" />
                  </a>
                  <a href={clinic.social.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition-colors text-zinc-950">
                    <Instagram size={18} />
                  </a>
                  <a href={clinic.social.whatsapp} aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition-colors text-zinc-950">
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="p-8 lg:p-14 lg:w-[60%] bg-card dark:bg-zinc-900 flex flex-col relative mt-6 lg:mt-0">
                <form className="flex-1 flex flex-col" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 mb-10">
                    <div className="space-y-1 relative group">
                      <label htmlFor="firstName" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Имя <span className="text-amber-500">*</span></label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors rounded-none"
                      />
                    </div>
                    
                    <div className="space-y-1 relative group">
                      <label htmlFor="lastName" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Фамилия</label>
                      <input 
                        type="text" 
                        id="lastName"
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors rounded-none" 
                      />
                    </div>

                    <div className="space-y-1 relative group">
                      <label htmlFor="emailForm" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Email</label>
                      <input 
                        type="email" 
                        id="emailForm"
                        placeholder="youremail@gmail.com"
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors rounded-none" 
                      />
                    </div>

                    <div className="space-y-1 relative group">
                      <label htmlFor="phoneForm" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Номер телефона <span className="text-amber-500">*</span></label>
                      <input
                        type="tel"
                        id="phoneForm"
                        required
                        defaultValue="+371 "
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 relative group mb-10 flex-1">
                    <label htmlFor="message" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Сообщение</label>
                    <textarea 
                      id="message"
                      placeholder="Напишите ваше сообщение.." 
                      className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 placeholder:text-sm mt-2 rounded-none" 
                      rows={2}
                    ></textarea>
                  </div>

                  <div className="flex flex-col items-center justify-center mt-auto relative gap-4">
                     <button type="submit" className="bg-amber-500 text-white rounded-xl px-10 py-4 font-semibold text-sm hover:bg-amber-600 transition-colors w-full sm:w-auto">
                      Отправить сообщение
                     </button>
                     <p className="text-xs text-zinc-500 text-center">
                       Заполняя эту форму, вы соглашаетесь с <a href="#" className="underline underline-offset-2">политикой конфиденциальности</a>
                     </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
