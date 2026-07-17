import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';
import { clinic } from '../../data/clinic';
import { SectionBadge } from '../ui/section-badge';
import { useBookingModal } from '../../context/BookingModalContext';

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${clinic.address.street}, ${clinic.address.city}, Latvia`,
)}`;

export function MapSection() {
  const { openModal } = useBookingModal();
  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  // Тяжёлый сторонний iframe карты монтируется только когда блок контактов
  // приближается к области видимости — а не при первой загрузке страницы.
  useEffect(() => {
    const el = mapRef.current;
    if (!el || showMap) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [showMap]);

  return (
    <section id="contacts" className="bg-zinc-50 dark:bg-zinc-950 py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionBadge className="mb-4">Контакты</SectionBadge>
            <h2 className="h-section text-zinc-900 dark:text-zinc-50">
              Как нас найти
            </h2>
          </div>
        </div>

        {/* Card (left) + Map (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-8 items-stretch">

          {/* Contact card — left */}
          <div className="bg-card dark:bg-zinc-900 rounded-[2rem] p-8 lg:p-10 shadow-[0_12px_40px_rgb(58,58,58,0.10)] border border-black/[0.04] dark:border-white/[0.06] flex flex-col">
            <h3 className="h-card text-zinc-900 dark:text-zinc-50 mb-6">
              {clinic.name}
            </h3>

            <ul className="space-y-5 mb-8">
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-0.5">Адрес</p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">{clinic.address.full}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-0.5">Часы работы</p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium">{clinic.hours.short}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">{clinic.hours.weekend}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-0.5">Телефон</p>
                  <a href={clinic.phoneHref} className="text-zinc-900 dark:text-zinc-100 font-medium hover:text-amber-500 transition-colors">
                    {clinic.phoneDisplay}
                  </a>
                </div>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={() => openModal()}
                className="inline-flex items-center justify-center whitespace-nowrap btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg active:scale-95"
              >
                Записаться на приём
              </button>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-200 text-zinc-900 dark:text-zinc-100 px-6 py-3.5 rounded-full text-sm font-semibold transition-colors"
              >
                Маршрут
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Map — right */}
          <div
            ref={mapRef}
            className="rounded-[2rem] overflow-hidden border border-black/[0.04] dark:border-white/[0.06] shadow-[0_8px_40px_rgb(58,58,58,0.06)] bg-zinc-200 dark:bg-zinc-800 min-h-[360px] lg:min-h-[480px] h-full"
          >
            {showMap ? (
              <iframe
                src="https://maps.google.com/maps?q=Piestātnes+iela+11A,+Jūrmala,+Latvia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[360px] lg:min-h-[480px] grayscale-[0.15] contrast-[1.05]"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта проезда к клинике RoyalDent"
              />
            ) : (
              <div
                className="w-full h-full min-h-[360px] lg:min-h-[480px] flex items-center justify-center text-zinc-400 dark:text-zinc-600"
                aria-hidden="true"
              >
                <MapPin size={40} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
