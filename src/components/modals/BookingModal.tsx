import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, Check, Loader2, Star, Calendar, Clock, User, Phone, Instagram, Facebook, MessageCircle, Send, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useBookingModal } from '../../context/BookingModalContext';
import { clinic } from '../../data/clinic';
import { BookingCalendar } from '../ui/booking-calendar';
import { PhoneField } from '../ui/phone-field';

interface Staff {
  id: number;
  name: string;
  specialization?: string;
  avatar?: string;
  rating?: number;
}

interface Service {
  id: number;
  title: string;
  seance_length?: number;
  price_min?: number;
}

interface Slot {
  time: string;
  datetime: string;
  seance_length?: number;
}

const STEPS = ['Врач', 'Услуга', 'Дата', 'Время', 'Контакты'];

function formatDateLabel(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  const weekday = d.toLocaleDateString('ru-RU', { weekday: 'short' });
  const day = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  return { weekday, day };
}

function formatDuration(sec?: number) {
  if (!sec) return '';
  return `${Math.round(sec / 60)} мин`;
}

/** Basic email format check. */
function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function getJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function BookingModal() {
  const { isOpen, closeModal, preselectStaffId } = useBookingModal();

  // --- Wizard state (right panel) ---
  const [step, setStep] = useState(1);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [times, setTimes] = useState<Slot[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: '', surname: '', email: '', phone: '+371 ' });
  const [formPhoneValid, setFormPhoneValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // --- Callback form state (left panel) ---
  const [cb, setCb] = useState({ name: '', surname: '', phone: '+371 ' });
  const [cbPhoneValid, setCbPhoneValid] = useState(false);
  const [cbSubmitting, setCbSubmitting] = useState(false);
  const [cbDone, setCbDone] = useState(false);
  const [cbError, setCbError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const reset = useCallback(() => {
    setStep(1);
    setSelectedStaff(null);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: '', surname: '', email: '', phone: '+371 ' });
    setFormPhoneValid(false);
    setError(null);
    setDone(false);
    setServices([]);
    setDates([]);
    setTimes([]);
    setCb({ name: '', surname: '', phone: '+371 ' });
    setCbPhoneValid(false);
    setCbDone(false);
    setCbError(null);
  }, []);

  // Load doctors when the modal opens.
  useEffect(() => {
    if (!isOpen) return;
    reset();
    setLoading(true);
    getJson('/api/booking/staff')
      .then((r) => {
        const list: Staff[] = r.data ?? [];
        setStaff(list);
        if (preselectStaffId != null) {
          const pre = list.find((s) => s.id === preselectStaffId);
          if (pre) { setSelectedStaff(pre); setStep(2); }
        }
      })
      .catch(() => setError('Не удалось загрузить список врачей. Попробуйте позже.'))
      .finally(() => setLoading(false));
  }, [isOpen, preselectStaffId, reset]);

  // Load services when a doctor is chosen.
  useEffect(() => {
    if (!selectedStaff || step !== 2) return;
    setLoading(true);
    setError(null);
    getJson(`/api/booking/services?staff_id=${selectedStaff.id}`)
      .then((r) => setServices(r.data ?? []))
      .catch(() => setError('Не удалось загрузить услуги.'))
      .finally(() => setLoading(false));
  }, [selectedStaff, step]);

  // Load dates when a service is chosen.
  useEffect(() => {
    if (!selectedStaff || !selectedService || step !== 3) return;
    setLoading(true);
    setError(null);
    getJson(`/api/booking/dates?staff_id=${selectedStaff.id}&service_ids[]=${selectedService.id}`)
      .then((r) => setDates(r.data?.booking_dates ?? r.data ?? []))
      .catch(() => setError('Не удалось загрузить доступные даты.'))
      .finally(() => setLoading(false));
  }, [selectedStaff, selectedService, step]);

  // Load time slots when a date is chosen.
  useEffect(() => {
    if (!selectedStaff || !selectedDate || step !== 4) return;
    setLoading(true);
    setError(null);
    const svc = selectedService ? `?service_ids[]=${selectedService.id}` : '';
    getJson(`/api/booking/times/${selectedStaff.id}/${selectedDate}${svc}`)
      .then((r) => setTimes(r.data ?? []))
      .catch(() => setError('Не удалось загрузить свободное время.'))
      .finally(() => setLoading(false));
  }, [selectedStaff, selectedService, selectedDate, step]);

  const submit = async () => {
    if (!selectedStaff || !selectedTime) return;
    setSubmitting(true);
    setError(null);
    try {
      const r = await getJson('/api/booking/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: `${form.name.trim()} ${form.surname.trim()}`.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          staff_id: selectedStaff.id,
          datetime: selectedTime.datetime,
          services: selectedService ? [selectedService.id] : [],
        }),
      });
      if (r.success === false) throw new Error('booking_failed');
      setDone(true);
    } catch {
      setError('Не удалось создать запись. Проверьте данные или позвоните нам.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitCallback = async () => {
    setCbSubmitting(true);
    setCbError(null);
    try {
      const r = await getJson('/api/booking/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cb.name.trim(), surname: cb.surname.trim(), phone: cb.phone.trim() }),
      });
      if (r.success === false) throw new Error('callback_failed');
      setCbDone(true);
    } catch {
      setCbError('Не удалось отправить заявку. Попробуйте позже.');
    } finally {
      setCbSubmitting(false);
    }
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const canSubmit = form.name.trim().length > 1 && form.surname.trim().length > 0 && isValidEmail(form.email) && formPhoneValid;
  const canCallback = cb.name.trim().length > 1 && cb.surname.trim().length > 0 && cbPhoneValid;

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
          <div
            className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4 h-[100dvh]"
            style={{
              // Учитываем «чёлку» и панели браузера: считаем высоту от dvh
              // и не даём модалке залезать под статус-бар / индикатор Home.
              paddingTop: 'max(1rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
              // max-h-full: помещается ровно в видимую область (родитель = 100dvh
              // минус отступы). Верх/низ мягко затухают при прокрутке (mask).
              className="bg-card dark:bg-zinc-900 rounded-[2rem] p-3 shadow-2xl flex flex-col lg:flex-row relative pointer-events-auto max-w-5xl w-full max-h-full overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent_0,#000_1.75rem,#000_calc(100%-1.75rem),transparent_100%)] lg:[mask-image:none]"
            >
              <button
                onClick={closeModal}
                aria-label="Закрыть"
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* ===== Left: callback request ===== */}
              <div className="bg-zinc-950 text-white rounded-[1.5rem] p-8 lg:p-10 lg:w-[42%] flex flex-col relative overflow-hidden shrink-0">
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-zinc-800 rounded-full opacity-60 mix-blend-overlay pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-zinc-700 rounded-full opacity-60 mix-blend-overlay pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Заказать звонок</h2>
                  <p className="text-zinc-400 font-light mb-8 text-sm">
                    Оставьте номер — перезвоним в течение 15 минут и поможем с записью.
                  </p>

                  {cbDone ? (
                    <div className="flex flex-col items-start gap-3 py-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                        <Check className="w-6 h-6 text-zinc-950" />
                      </div>
                      <p className="text-lg font-semibold">Спасибо, {cb.name}!</p>
                      <p className="text-zinc-400 font-light text-sm">Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      <div className="space-y-1">
                        <label htmlFor="cb-name" className="text-xs font-semibold text-zinc-400">Имя <span className="text-amber-500">*</span></label>
                        <input
                          id="cb-name" type="text" value={cb.name}
                          onChange={(e) => setCb((f) => ({ ...f, name: e.target.value }))}
                          className="w-full bg-transparent border-b border-zinc-700 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="cb-surname" className="text-xs font-semibold text-zinc-400">Фамилия <span className="text-amber-500">*</span></label>
                        <input
                          id="cb-surname" type="text" value={cb.surname} required
                          onChange={(e) => setCb((f) => ({ ...f, surname: e.target.value }))}
                          className="w-full bg-transparent border-b border-zinc-700 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="cb-phone" className="text-xs font-semibold text-zinc-400">Номер телефона <span className="text-amber-500">*</span></label>
                        <PhoneField
                          id="cb-phone"
                          tone="dark"
                          onChange={(value, valid) => { setCb((f) => ({ ...f, phone: value })); setCbPhoneValid(valid); }}
                        />
                      </div>

                      {cbError && <p className="text-sm text-red-400">{cbError}</p>}

                      <button
                        onClick={submitCallback}
                        disabled={!canCallback || cbSubmitting}
                        className="mt-2 w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 rounded-xl py-3.5 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        {cbSubmitting && <Loader2 size={16} className="animate-spin" />}
                        Заказать звонок
                      </button>
                    </div>
                  )}

                  <div className="mt-auto pt-8 flex items-center justify-between relative z-10">
                    <a href={clinic.phoneHref} className="flex items-center gap-2 text-sm font-light opacity-90 hover:opacity-100 transition-opacity">
                      <Phone size={16} className="text-amber-500" /> {clinic.phoneDisplay}
                    </a>
                    <div className="flex gap-3">
                      <a href={clinic.social.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition-colors">
                        <Instagram size={16} />
                      </a>
                      <a href={clinic.social.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition-colors">
                        <Facebook size={16} className="fill-current" />
                      </a>
                      <a href={clinic.social.whatsapp} aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition-colors">
                        <MessageCircle size={16} />
                      </a>
                      <a href={clinic.social.telegram} aria-label="Telegram" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition-colors">
                        <Send size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== Right: online booking wizard ===== */}
              <div className="lg:w-[58%] flex flex-col min-h-[520px] mt-6 lg:mt-0">
                {/* Wizard header */}
                <div className="flex items-center gap-3 px-6 lg:px-8 pt-8 pr-16 shrink-0">
                  {step > 1 && !done && (
                    <button
                      onClick={goBack}
                      aria-label="Назад"
                      className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0"
                    >
                      <ChevronLeft size={18} />
                    </button>
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                      {done ? 'Запись создана' : 'Онлайн-запись'}
                    </h2>
                    {!done && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Шаг {step} из {STEPS.length} · {STEPS[step - 1]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                {!done && (
                  <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mx-6 lg:mx-8 mt-4 shrink-0 overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500"
                      animate={{ width: `${(step / STEPS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}

                {/* Body */}
                <div className="px-6 lg:px-8 py-6 overflow-y-auto flex-1">
                  {error && (
                    <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  {done ? (
                    <div className="flex flex-col items-center text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-5">
                        <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Спасибо, {form.name}!</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs mb-6">
                        Вы записаны к специалисту <b>{selectedStaff?.name}</b>
                        {selectedService && <> на «{selectedService.title}»</>}
                        {selectedDate && selectedTime && (
                          <> {formatDateLabel(selectedDate).day} в {selectedTime.time}</>
                        )}. Мы отправим подтверждение по SMS.
                      </p>
                      <button
                        onClick={closeModal}
                        className="btn-sweep bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-8 py-3 font-semibold text-sm transition-colors"
                      >
                        Готово
                      </button>
                    </div>
                  ) : loading ? (
                    <div className="flex items-center justify-center py-16 text-zinc-400">
                      <Loader2 className="w-7 h-7 animate-spin" />
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      {/* Step 1 — doctor */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.2 }} className="space-y-3"
                        >
                          {staff.map((doc) => (
                            <button
                              key={doc.id}
                              onClick={() => {
                                setSelectedStaff(doc);
                                setSelectedService(null);
                                setSelectedDate(null);
                                setSelectedTime(null);
                                setStep(2);
                              }}
                              className="w-full flex items-center gap-4 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 dark:hover:border-amber-500/60 hover:bg-amber-50/50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                            >
                              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
                                {doc.avatar
                                  ? <img src={doc.avatar} alt="" className="w-full h-full object-cover" />
                                  : <User className="w-6 h-6 text-zinc-400" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-zinc-900 dark:text-white truncate">{doc.name}</p>
                                {doc.specialization && (
                                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{doc.specialization}</p>
                                )}
                              </div>
                              {doc.rating ? (
                                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
                                  <Star size={13} className="text-amber-400 fill-amber-400" />{doc.rating}
                                </span>
                              ) : null}
                            </button>
                          ))}
                        </motion.div>
                      )}

                      {/* Step 2 — service */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.2 }} className="space-y-3"
                        >
                          <div className="flex items-center gap-2 mb-1 text-sm text-zinc-500 dark:text-zinc-400">
                            <Stethoscope size={16} /> Выберите услугу
                          </div>
                          {services.length === 0 ? (
                            <p className="text-sm text-zinc-500 py-8 text-center">У этого специалиста нет услуг для онлайн-записи.</p>
                          ) : (
                            services.map((svc) => (
                              <button
                                key={svc.id}
                                onClick={() => {
                                  setSelectedService(svc);
                                  setSelectedDate(null);
                                  setSelectedTime(null);
                                  setStep(3);
                                }}
                                className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 dark:hover:border-amber-500/60 hover:bg-amber-50/50 dark:hover:bg-zinc-800/50 transition-colors text-left"
                              >
                                <div className="min-w-0">
                                  <p className="font-medium text-zinc-900 dark:text-white">{svc.title}</p>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                                    <Clock size={12} /> {formatDuration(svc.seance_length)}
                                  </p>
                                </div>
                                {svc.price_min ? (
                                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 shrink-0">
                                    от {svc.price_min.toLocaleString('ru-RU')} €
                                  </span>
                                ) : null}
                              </button>
                            ))
                          )}
                        </motion.div>
                      )}

                      {/* Step 3 — date */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-2 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                            <Calendar size={16} /> Выберите удобную дату
                          </div>
                          {dates.length === 0 ? (
                            <p className="text-sm text-zinc-500 py-8 text-center">Нет доступных дат.</p>
                          ) : (
                            <BookingCalendar
                              availableDates={dates}
                              value={selectedDate}
                              onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); setStep(4); }}
                            />
                          )}
                        </motion.div>
                      )}

                      {/* Step 4 — time */}
                      {step === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-2 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                            <Clock size={16} /> Свободное время
                            {selectedDate && <span className="text-zinc-400">· {formatDateLabel(selectedDate).day}</span>}
                          </div>
                          {times.length === 0 ? (
                            <p className="text-sm text-zinc-500 py-8 text-center">На эту дату нет свободного времени.</p>
                          ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {times.map((t) => (
                                <button
                                  key={t.datetime}
                                  onClick={() => { setSelectedTime(t); setStep(5); }}
                                  className={cn(
                                    'py-3 rounded-xl border text-sm font-medium transition-colors',
                                    selectedTime?.datetime === t.datetime
                                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'
                                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-amber-400'
                                  )}
                                >
                                  {t.time}
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Step 5 — contacts */}
                      {step === 5 && (
                        <motion.div
                          key="step5"
                          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 mb-6 space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                              <User size={15} className="text-amber-500" /> {selectedStaff?.name}
                            </div>
                            {selectedService && (
                              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                <Stethoscope size={15} className="text-amber-500" /> {selectedService.title}
                              </div>
                            )}
                            {selectedDate && selectedTime && (
                              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                <Calendar size={15} className="text-amber-500" />
                                {formatDateLabel(selectedDate).day}, {selectedTime.time}
                              </div>
                            )}
                          </div>

                          <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="space-y-1">
                                <label htmlFor="bk-name" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                  Имя <span className="text-amber-500">*</span>
                                </label>
                                <input
                                  id="bk-name" type="text" value={form.name}
                                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                  className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                                />
                              </div>
                              <div className="space-y-1">
                                <label htmlFor="bk-surname" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                  Фамилия <span className="text-amber-500">*</span>
                                </label>
                                <input
                                  id="bk-surname" type="text" value={form.surname}
                                  onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))}
                                  className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label htmlFor="bk-email" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                Email <span className="text-amber-500">*</span>
                              </label>
                              <input
                                id="bk-email" type="email" value={form.email} placeholder="youremail@gmail.com"
                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                              />
                            </div>
                            <div className="space-y-1">
                              <label htmlFor="bk-phone" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                Телефон <span className="text-amber-500">*</span>
                              </label>
                              <PhoneField
                                id="bk-phone"
                                tone="light"
                                onChange={(value, valid) => { setForm((f) => ({ ...f, phone: value })); setFormPhoneValid(valid); }}
                              />
                            </div>
                          </div>

                          <button
                            onClick={submit}
                            disabled={!canSubmit || submitting}
                            className="mt-8 w-full btn-sweep bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3.5 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                          >
                            {submitting && <Loader2 size={16} className="animate-spin" />}
                            Записаться
                          </button>
                          <p className="text-xs text-zinc-400 text-center mt-3">
                            Нажимая «Записаться», вы соглашаетесь с политикой конфиденциальности
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
