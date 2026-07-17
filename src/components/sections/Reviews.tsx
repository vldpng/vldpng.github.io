import React from 'react';
import { GoogleReviewsIntegration } from '../ui/google-reviews';

const googleReviews = [
  {
    name: "Мария Иванова",
    role: "Пациент клиники",
    text: "Очень благодарна доктору Громову за прекрасную работу и внимательное отношение. Имплантация прошла безболезненно и с отличным результатом.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Алексей Смирнов",
    role: "Пациент клиники",
    text: "Профессионализм на высшем уровне. Делал отбеливание и чистку, результат превзошел все ожидания. Отличный сервис и современное оборудование.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Елена Кузнецова",
    role: "Пациент клиники",
    text: "Долго искала хорошего ортодонта, и наконец нашла. Доктор Анна Лиепа составила четкий план лечения на элайнерах. Очень довольна!",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    text: "Отличная клиника, вежливый персонал и врачи от Бога. Ставил коронки, все подошло идеально с первого раза.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Дмитрий Волков",
    role: "Пациент клиники",
  },
  {
    text: "Лечение под микроскопом спасло мой зуб! Огромное спасибо доктору Берзиньшу за ювелирную работу.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Анна Соколова",
    role: "Пациент клиники",
  },
  {
    text: "Удалили зуб мудрости быстро и без боли. Даже не заметил, как прошла операция. Доктор Озолс настоящий профессионал.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Виктор Морозов",
    role: "Пациент клиники",
  },
  {
    text: "Водила ребенка на прием, врач нашел подход за пару минут! Никакого страха, только положительные впечатления.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Светлана Петрова",
    role: "Пациент клиники",
  },
  {
    text: "Лучшая клиника в городе! Цены полностью оправдывают качество услуг. Теперь всей семьей лечимся только здесь.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Сергей Васильев",
    role: "Пациент клиники",
  },
  {
    text: "Сделали потрясающие виниры! Теперь улыбаюсь без стеснения. Огромное спасибо доктору Волковой за красоту.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Ольга Новикова",
    role: "Пациент клиники",
  }
];

/**
 * Блок отзывов пациентов с Google Maps.
 * Не путать с компонентом Sample (примеры работ клиники).
 */
export function Reviews() {
  return (
    <section id="reviews" className="overflow-hidden relative scroll-mt-24">
      <GoogleReviewsIntegration fallbackReviews={googleReviews} />
    </section>
  );
}
