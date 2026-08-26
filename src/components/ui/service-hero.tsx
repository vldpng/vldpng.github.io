import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FadeIn } from './fade-in';
import { ServiceTitle } from './service-title';
import { useContactModal } from '../../context/ContactModalContext';
import { type ServiceHeroContent } from '../../data/serviceHeroes';

/**
 * Баннер посадочной страницы услуги: заголовок, подзаголовок, строка с ценой,
 * список тезисов, кнопка записи и снимок справа.
 *
 * Один компонент на все услуги — так страницы гарантированно остаются в
 * одинаковом оформлении. Содержимое приходит из data/serviceHeroes.
 *
 * Тёплый градиент гаснет в белый к правому краю: снимки — вырезки с
 * прозрачным фоном, и на белом их светлые кромки не выдают контур.
 */
const HERO_GRADIENT = 'linear-gradient(100deg, #FBE0CC 0%, #FCEADD 42%, #FFFFFF 100%)';

/**
 * Цвета текста под заливку баннера. Размеры и отступы от тона не зависят —
 * иначе страницы снова начали бы расходиться в наборе.
 */
const TONES = {
  dark: {
    back: 'text-zinc-500 hover:text-zinc-900',
    title: 'text-zinc-900',
    subtitle: 'text-[#2F6BD8]',
    lead: 'text-zinc-900',
    bullet: 'text-zinc-800',
    marker: 'marker:text-zinc-400',
  },
  light: {
    back: 'text-white/70 hover:text-white',
    title: 'text-white',
    // На тёмной заливке фирменный синий подзаголовка сливается с фоном,
    // поэтому берём осветлённый оттенок того же тона.
    subtitle: 'text-[#9EC5FF]',
    lead: 'text-white',
    bullet: 'text-white',
    marker: 'marker:text-white/60',
  },
} as const;

export function ServiceHero({ content }: { content: ServiceHeroContent }) {
  const { openModal } = useContactModal();
  const { title, subtitle, lead, bullets, image, imageAlt, background, backgroundMobile, tone } =
    content;
  const c = TONES[tone ?? 'dark'];
  const desktopBg = background ?? HERO_GRADIENT;

  return (
    // Заливка телефона лежит на самой секции, десктопная — отдельным слоем
    // поверх неё с md. Так страница может иметь две разные заливки, не
    // дублируя разметку баннера.
    <section
      className="relative overflow-hidden"
      style={{ backgroundImage: backgroundMobile ?? desktopBg }}
    >
      {backgroundMobile && (
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{ backgroundImage: desktopBg }}
        />
      )}
      {/* Текстовая колонка фиксированной ширины, снимок занимает остаток.
          Так левая кромка снимка стоит на одном и том же месте у всех восьми
          страниц, а вправо он растёт свободно и уходит за край — и упереться
          в текст не может, какой бы ни была пропорция фото. Это и снимает
          прежнее ограничение на размер: широкий All-on-4 (2.03) диктовал
          высоту всем остальным.

          Вторая колонка именно minmax(0,1fr), а не 1fr: у 1fr минимум равен
          min-content, и колонка растягивалась под полную ширину снимка,
          сминая текст в узкую полосу. */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:grid-cols-[minmax(0,760px)_minmax(0,1fr)] gap-8 md:gap-10 items-center">
        <div className="max-w-xl lg:max-w-none">
          <FadeIn direction="none">
            {/* Возврат к списку услуг. Через Link, а не <a>: у языковых версий
                свой basename роутера, и обычная ссылка на /services увела бы
                русского посетителя на латышскую страницу. */}
            <Link
              to="/services"
              className={`group inline-flex items-center gap-2 mb-5 text-sm font-medium transition-colors ${c.back}`}
            >
              <ArrowLeft
                size={18}
                className="shrink-0 transition-transform group-hover:-translate-x-1"
              />
              Назад к услугам
            </Link>

            {/* Гротеск полужирным, а не общий .h-display: тот набран серифом
                Playfair, а на макете баннера заголовок рубленый. Остальные
                заголовки сайта серифные и остаются как были.

                Размер связан с шириной колонки: первая строка самого длинного
                заголовка («Лечение дёсен аппаратом Vector в») при 44px требует
                744px, поэтому колонка ниже — 760px. Если увеличивать шрифт
                дальше, колонку придётся расширять следом, иначе строка
                разорвётся надвое и «Юрмале» перестанет быть второй строкой. */}
            <ServiceTitle
              title={title}
              className={`font-sans font-bold text-[2.25rem] lg:text-[2.75rem] leading-[1.15] tracking-tight mb-3 ${c.title}`}
            />
            {subtitle && (
              <p className={`text-xl lg:text-[1.5rem] font-bold leading-snug ${c.subtitle}`}>
                {subtitle}
              </p>
            )}
            {lead && <p className={`mt-4 text-lg lg:text-xl font-medium ${c.lead}`}>{lead}</p>}
          </FadeIn>
          <FadeIn delay={0.1}>
            {/* Отступ сверху крупный, между строками — мелкий: на макете список
                стоит заметно отдельной группой от заголовка с подзаголовком. */}
            <ul className={`mt-10 mb-8 space-y-1.5 list-disc pl-5 ${c.marker}`}>
              {bullets.map((line) => (
                <li key={line} className={`text-[15px] lg:text-base leading-relaxed ${c.bullet}`}>
                  {line}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={openModal}
              className="btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              Записаться на приём
            </button>
          </FadeIn>
        </div>

        {/* Снимок во всю высоту баннера, как на макете.

            Обёртка обязательна. Без неё картинка была грид-элементом, и её
            собственная высота (ширина по max-w, делённая на пропорцию) сама
            задавала высоту строки — баннер раздувался, и высоту диктовало
            фото, а не текст. Теперь высоту строки задаёт только текстовая
            колонка, обёртка тянется за ней (self-stretch), отрицательные
            отступы гасят py контейнера, а абсолютная картинка внутри берёт
            ровно эту высоту. Кромки фото совпадают с кромками градиента.

            Прижат к левому краю своей колонки и растёт вправо; всё, что вышло
            за экран, срезает overflow-hidden секции. Левая кромка поэтому
            стоит на одном месте у всех восьми страниц и не может наехать на
            текст, какой бы ни была пропорция фото.

            max-w удерживает самые широкие вырезки: без него All-on-4 (2.03)
            во всю высоту уезжал за экран на треть и растягивался вдвое от
            исходных 560px по ширине — то есть заметно мылил.

            Скрыт на телефоне: колонки там схлопываются в одну, и вырезка
            отодвигала бы заголовок с ценой ниже первого экрана. */}
        <div className="hidden md:block relative self-stretch -my-12 md:-my-16 min-w-0">
          <img
            src={image}
            alt={imageAlt}
            className="absolute bottom-0 left-0 h-full w-auto max-w-[520px] lg:max-w-[900px] object-contain object-bottom"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
