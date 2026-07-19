import React from 'react';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/fade-in';
import { BlackPlaceholder } from '../ui/Placeholder';

/**
 * Сетка направлений на странице /services: тёмные карточки
 * «заголовок → описание → фото со ссылкой „Перейти к услуге"».
 *
 * TODO: заменить фото-заглушки реальными снимками — положить файлы в
 * public/images/services и прописать пути в поле `image` ниже.
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
    title: 'Керамические реставрации',
    desc: 'Восстанавливаем улыбку с помощью керамических виниров, накладок и коронок.',
    to: '/services/ceramic',
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

export function ServiceCards() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceCards.map((card, idx) => (
            <FadeIn key={card.title} delay={0.06 * idx} direction="up" className="h-full">
              <Link
                to={card.to}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-card dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-[0_4px_20px_rgb(58,58,58,0.03)] hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-[0_10px_30px_rgb(58,58,58,0.08)] transition-all"
              >
                {/* Текст */}
                <div className="p-7 pb-6 flex flex-col gap-4">
                  <h3 className="h-card text-zinc-900 dark:text-zinc-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{card.desc}</p>
                </div>

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
