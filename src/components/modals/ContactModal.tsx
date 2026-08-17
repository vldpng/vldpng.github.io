import React, { useEffect, useRef, useState } from 'react';
import { Check, Mail, MapPin, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useContactModal } from '../../context/ContactModalContext';
import { clinic } from '../../data/clinic';
import { socialLinks, externalLinkProps } from '../../data/social';

const EMPTY_FORM = { firstName: '', lastName: '', email: '', phone: '+371 ', message: '' };

/** Простая проверка адреса: символы, «собака», домен с точкой. */
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/**
 * Номер считается заполненным, когда после кода страны набрано не меньше
 * восьми цифр — столько в латвийском номере. Префикс 371 отбрасываем, чтобы
 * поле, где остался только «+371 », не считалось заполненным.
 */
const isValidPhone = (v: string) => v.replace(/\D/g, '').replace(/^371/, '').length >= 8;

export function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  // Поля управляемые: без этого нельзя блокировать отправку до заполнения.
  const [form, setForm] = useState(EMPTY_FORM);
  // Согласие на обработку данных. Хранится в состоянии, потому что от него
  // зависит доступность кнопки отправки.
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField =
    (key: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const canSubmit =
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone) &&
    consent &&
    !submitting;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/leads/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.firstName.trim(),
          surname: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          // Страница нужна администратору: по ней видно, чем интересовался клиент.
          page: window.location.pathname,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success === false) throw new Error('lead_failed');
      setSent(true);
    } catch {
      setError('Не удалось отправить заявку. Попробуйте позже или позвоните нам.');
    } finally {
      setSubmitting(false);
    }
  };

  const dialogRef = useRef<HTMLDivElement>(null);
  // Элемент, с которого открыли модалку: после закрытия фокус обязан
  // вернуться туда, иначе клавиатурный пользователь окажется в начале страницы.
  const openerRef = useRef<HTMLElement | null>(null);

  /**
   * Клавиатура и фокус.
   *
   * Без этого модалка была диалогом только визуально: Escape не закрывал,
   * фокус оставался на странице под ней, и табом можно было уйти в меню
   * за оверлеем — на момент открытия туда вело 130 из 143 доступных элементов.
   */
  useEffect(() => {
    if (!isOpen) return;

    openerRef.current = document.activeElement as HTMLElement | null;

    // Список пересчитываем на каждый Tab: после отправки формы содержимое
    // подменяется экраном благодарности, и старый список стал бы неверным.
    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      // Замыкаем круг вручную: браузер иначе уводит фокус за пределы диалога.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Фокус переводим в два шага. Сначала синхронно на сам диалог: у него
    // tabIndex={-1}, и этого достаточно, чтобы скринридер объявил окно, а Tab
    // сразу попал в ловушку. Затем, когда motion смонтирует содержимое,
    // уводим фокус на первый интерактивный элемент.
    //
    // Одного requestAnimationFrame здесь мало: содержимое появляется не всегда
    // к следующему кадру, и фокус через раз оставался на кнопке под оверлеем.
    dialogRef.current?.focus();

    const raf = requestAnimationFrame(() => {
      const [first] = focusable();
      first?.focus();
    });

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      openerRef.current?.focus();
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Сбрасываем форму и галочку при закрытии: следующий посетитель должен
      // дать согласие сам, а не унаследовать его от прошлой отправки.
      setForm(EMPTY_FORM);
      setConsent(false);
      setSent(false);
      setError(null);
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
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              tabIndex={-1}
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
                  <h2 id="contact-modal-title" className="text-3xl font-bold tracking-tight mb-2">Контактная информация</h2>
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
                  {socialLinks.map(({ Icon, href, label, filled }) => (
                    <a
                      key={label}
                      href={href}
                      {...externalLinkProps}
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition-colors text-zinc-950"
                    >
                      <Icon size={18} className={filled ? 'fill-current' : undefined} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="p-8 lg:p-14 lg:w-[60%] bg-card dark:bg-zinc-900 flex flex-col relative mt-6 lg:mt-0">
                {sent ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-16">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-zinc-900">
                      <Check size={28} strokeWidth={3} />
                    </span>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      Спасибо, {form.firstName.trim()}!
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                      Заявка принята — мы свяжемся с вами в ближайшее время.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-2 bg-amber-500 text-zinc-900 rounded-xl px-10 py-4 font-semibold text-sm hover:bg-amber-600 transition-colors"
                    >
                      Закрыть
                    </button>
                  </div>
                ) : (
                <form className="flex-1 flex flex-col" onSubmit={submit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 mb-10">
                    <div className="space-y-1 relative group">
                      <label htmlFor="firstName" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Имя <span className="text-amber-500">*</span></label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={form.firstName}
                        onChange={setField('firstName')}
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors rounded-none"
                      />
                    </div>

                    <div className="space-y-1 relative group">
                      <label htmlFor="lastName" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Фамилия <span className="text-amber-500">*</span></label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={form.lastName}
                        onChange={setField('lastName')}
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors rounded-none"
                      />
                    </div>

                    <div className="space-y-1 relative group">
                      <label htmlFor="emailForm" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Email <span className="text-amber-500">*</span></label>
                      <input
                        type="email"
                        id="emailForm"
                        required
                        placeholder="youremail@gmail.com"
                        value={form.email}
                        onChange={setField('email')}
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors rounded-none"
                      />
                    </div>

                    <div className="space-y-1 relative group">
                      <label htmlFor="phoneForm" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Номер телефона <span className="text-amber-500">*</span></label>
                      <input
                        type="tel"
                        id="phoneForm"
                        required
                        value={form.phone}
                        onChange={setField('phone')}
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 relative group mb-10 flex-1">
                    <label htmlFor="message" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Сообщение</label>
                    <textarea
                      id="message"
                      placeholder="Напишите ваше сообщение.."
                      value={form.message}
                      onChange={setField('message')}
                      className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 placeholder:text-sm mt-2 rounded-none"
                      rows={2}
                    ></textarea>
                  </div>

                  <div className="flex flex-col items-center justify-center mt-auto relative gap-5">
                     <button
                       type="submit"
                       disabled={!canSubmit}
                       className="bg-amber-500 text-zinc-900 rounded-xl px-10 py-4 font-semibold text-sm hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-500 transition-colors w-full sm:w-auto"
                     >
                      {submitting ? 'Отправляем…' : 'Отправить сообщение'}
                     </button>
                     {error && (
                       <p role="alert" className="text-sm text-red-600 dark:text-red-400 text-center">
                         {error}
                       </p>
                     )}
                     {/* Согласие под кнопкой — так просил заказчик. Кнопка до
                         галочки заблокирована, поэтому подпись к чекбоксу должна
                         объяснять связь: иначе неактивная кнопка выглядит
                         поломкой. required — вторая линия на случай Enter. */}
                     <label
                       htmlFor="consent"
                       className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 max-w-md cursor-pointer select-none"
                     >
                       <input
                         id="consent"
                         type="checkbox"
                         required
                         checked={consent}
                         onChange={(e) => setConsent(e.target.checked)}
                         className="h-4 w-4 shrink-0 cursor-pointer accent-amber-500"
                       />
                       <span className="text-center">
                         Я согласен на обработку моих персональных данных в соответствии с{' '}
                         {/* Открываем в новой вкладке: иначе переход по ссылке
                             закрыл бы модалку и стёр уже заполненную форму. */}
                         <Link
                           to="/privacy"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="underline underline-offset-2"
                         >
                           политикой конфиденциальности
                         </Link>
                       </span>
                     </label>
                  </div>
                </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
