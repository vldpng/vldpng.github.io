import React from 'react';
import { MoveRight, Syringe, HeartPulse, Stethoscope } from 'lucide-react';
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
    title: 'Элайнеры',
    desc: 'Исправляем прикус и положение зубов прозрачными элайнерами Ordoline — незаметно для окружающих и без брекетов.',
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
    // Прежняя карточка «Имплантация All-on-X» разделена на два протокола:
    // у них разная цена и разные показания, и вести обе на /services/implants
    // было неверно. Снимок общий — на нём как раз протез на имплантах.
    title: 'Имплантация All-on-4',
    desc: 'Полный зубной ряд на четырёх имплантах: несъёмный протез для пациентов, утративших все зубы на челюсти.',
    to: '/services/all-on-4',
    image: '/images/banners/allonx.webp',
  },
  {
    title: 'Имплантация All-on-6',
    desc: 'Полный зубной ряд на шести имплантах — максимально стабильная опора протеза при полном отсутствии зубов.',
    to: '/services/all-on-6',
    image: '/images/banners/allonx.webp',
  },
  {
    // TODO: заказчику нужен отдельный снимок для карточки — присланное фото
    // с баннера это вырезка на прозрачном фоне, в object-cover она не годится.
    title: 'Удаление зуба мудрости',
    desc: 'Удаляем зубы мудрости любой сложности — бережно, по КТ-снимку и с сопровождением после операции.',
    to: '/services/wisdom-tooth',
  },
  {
    // TODO: нужен снимок для карточки.
    title: 'Детская стоматология',
    desc: 'Лечим детей бережно и внимательно: ребёнок чувствует себя в безопасности с первых минут приёма.',
    to: '/services/kids',
  },
  {
    // TODO: нужен снимок для карточки.
    title: 'Лечение дёсен Vector',
    desc: 'Аппаратное лечение пародонтальных карманов системой Vector: снимаем воспаление и кровоточивость дёсен.',
    to: '/services/vector',
  },
  {
    title: 'Лечение каналов',
    desc: 'Лечим пульпит и периодонтит под операционным микроскопом и восстанавливаем зуб после лечения.',
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
  '/services/wisdom-tooth': <MaskIcon src="/icons/tooth-extraction.webp" className="w-6 h-6" />,
  '/services/implants': <MaskIcon src="/icons/implant.svg" className="w-6 h-6" />,
  '/services/all-on-4': <MaskIcon src="/icons/dentures.webp" className="w-6 h-6" />,
  '/services/all-on-6': <MaskIcon src="/icons/dentures.webp" className="w-6 h-6" />,
  '/services/microscope': <MaskIcon src="/icons/root-canal.webp" className="w-6 h-6" />,
  '/services/hygiene': <MaskIcon src="/icons/higien.svg" className="w-6 h-6" />,
  '/services/kids': <MaskIcon src="/icons/kids.svg" className="w-6 h-6" />,
  // Направление называется «Лечение сустава», но лечит его гнатолог —
  // отсюда иконка челюстного сустава, а не абстрактный пульс lucide.
  '/services/tmj': <MaskIcon src="/icons/gnatology.webp" className="w-6 h-6" />,
  '/services/parodontology': <HeartPulse size={24} />,
  '/services/vector': <MaskIcon src="/icons/vector.webp" className="w-6 h-6" />,
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
