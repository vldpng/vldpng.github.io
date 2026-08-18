import React from 'react';
import { MoveRight, Syringe, Activity, HeartPulse, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/fade-in';
import { BlackPlaceholder } from '../ui/Placeholder';
import { MaskIcon } from '../ui/MaskIcon';

/**
 * Сетка направлений на странице /services: тёмные карточки
 * «заголовок → описание → фото со ссылкой „Перейти к услуге"».
 */
// Экспортируется: этот же список используется в блоке услуг на главной
// (MainServices), чтобы направления не расходились между страницами.
export const serviceCards: {
  title: string;
  desc: string;
  to: string;
  image?: string;
}[] = [
  {
    title: 'Протезирование зубов',
    desc: 'Восстанавливаем улыбку с помощью керамических виниров, накладок и коронок.',
    to: '/services/prosthetics',
    image: '/images/banners/veneers.webp',
  },
  {
    title: 'Ортодонтия',
    desc: 'Исправляем прикус и неправильное положение зубов с помощью брекет-систем и элайнеров.',
    to: '/services/aligners',
    image: '/images/banners/aligners.webp',
  },
  {
    title: 'Хирургия',
    desc: 'Устанавливаем имплантаты для замены утраченных зубов, а также выполняем другие хирургические вмешательства: от простого удаления зубов до сложных операций с костной пластикой и пластикой десны.',
    to: '/services/surgery',
    image: '/images/banners/surgery.webp',
  },
  {
    title: 'Имплантация All-on-X',
    desc: 'Восстановление всего зубного ряда с помощью имплантатов для пациентов, которые утратили большинство или все зубы на одной из челюстей.',
    to: '/services/implants',
    image: '/images/banners/allonx.webp',
  },
  {
    title: 'Терапия',
    desc: 'Выполняем художественные реставрации и лечим корневые каналы с помощью операционного микроскопа.',
    to: '/services/microscope',
    image: '/images/banners/terapy.webp',
  },
  {
    title: 'Профилактика',
    desc: 'Комплекс профилактических мероприятий для предотвращения заболеваний зубов и десен, а также поддержания здоровья полости рта после завершения плана лечения.',
    to: '/services/hygiene',
    image: '/images/banners/higiena.webp',
  },
  {
    title: 'Лечение сустава',
    desc: 'Диагностика и лечение дисфункции височно-нижнечелюстного сустава (ВНЧС): подбор терапии, капы при бруксизме и спортивные капы.',
    to: '/services/tmj',
    image: '/images/banners/gnatology.webp',
  },
  {
    title: 'Пародонтология',
    desc: 'Лечим заболевания дёсен: от кровоточивости до пародонтита. Регенеративные методики и шинирование подвижных зубов.',
    to: '/services/parodontology',
    image: '/images/banners/parodontology.webp',
  },
  {
    title: 'Отбеливание',
    desc: 'Клиническое отбеливание Flash — улыбка светлее на несколько тонов за один визит, безопасно для эмали.',
    to: '/services/whitening',
    image: '/images/banners/flash.webp',
  },
];

/**
 * Иконки направлений. Ключ — путь услуги (`to` из serviceCards).
 * Где есть фирменный SVG — MaskIcon, остальным — подходящая иконка lucide.
 *
 * Живёт рядом с данными карточек, а не в MainServices: блок услуг на главной
 * уже импортирует отсюда serviceCards, и обратный импорт замкнул бы модули.
 */
export const serviceIcons: Record<string, React.ReactNode> = {
  '/services/prosthetics': <MaskIcon src="/icons/dental-crown.svg" className="w-6 h-6" />,
  '/services/aligners': <MaskIcon src="/icons/braces.svg" className="w-6 h-6" />,
  '/services/surgery': <Syringe size={24} />,
  '/services/implants': <MaskIcon src="/icons/implant.svg" className="w-6 h-6" />,
  '/services/microscope': <MaskIcon src="/icons/decay.svg" className="w-6 h-6" />,
  '/services/hygiene': <MaskIcon src="/icons/higien.svg" className="w-6 h-6" />,
  '/services/tmj': <Activity size={24} />,
  '/services/parodontology': <HeartPulse size={24} />,
  '/services/whitening': <MaskIcon src="/icons/whitening.svg" className="w-6 h-6" />,
};

export function ServiceCards() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceCards.map((card, idx) => (
            <FadeIn key={card.title} delay={0.06 * idx} direction="up" className="h-full">
              {/* Оформление то же, что у карточек услуг на главной (MainServices):
                  тёмно-синий градиент, серифный заголовок и иконка в белом
                  квадрате. Тень смещена вниз с отрицательным spread — светится
                  только под карточкой, а не ореолом вокруг. */}
              <Link
                to={card.to}
                className="group flex flex-col h-full rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#4D4D4F] via-[#3B3B3D] to-[#2C2C2D] shadow-[0_18px_30px_-14px_rgba(59,59,61,0.45)] hover:shadow-[0_26px_38px_-14px_rgba(59,59,61,0.55)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Текст */}
                <div className="flex items-start justify-between gap-4 p-6 pb-3">
                  <h3 className="font-serif text-xl leading-snug text-white">
                    {card.title}
                  </h3>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                    {serviceIcons[card.to] ?? <Stethoscope size={24} />}
                  </div>
                </div>
                <p className="px-6 pb-4 text-base leading-snug text-white/70">{card.desc}</p>

                {/* Фото прижато к низу карточки; поверх — ссылка на услугу */}
                <div className="relative mt-auto h-52 overflow-hidden">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <BlackPlaceholder
                      label={`[Фото: ${card.title}]`}
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                  {/* Затемнение снизу для читаемости подписи */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-4 right-5 flex flex-col items-end gap-1 text-white">
                    <span className="font-mono text-xs uppercase tracking-wide">
                      Перейти к услуге
                    </span>
                    <MoveRight
                      size={26}
                      strokeWidth={1.5}
                      className="group-hover:translate-x-1.5 transition-transform"
                    />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
