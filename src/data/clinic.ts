/**
 * Единый источник данных о клинике (NAP — Name / Address / Phone).
 * ВАЖНО: для корректного локального SEO эти данные должны совпадать
 * на сайте и в Google Business Profile. Меняйте значения только здесь.
 */

export const clinic = {
  name: 'RoyalDent',
  legalName: 'RoyalDent Clinic',
  regNr: '40000000000', // TODO: заменить на реальный регистрационный номер
  description:
    'Современная стоматология в Юрмале без боли и страха. Имплантация, лечение под микроскопом, эстетическая стоматология и профессиональная гигиена.',

  // Контакты
  phoneDisplay: '+371 27 057 783',
  phoneHref: 'tel:+37127057783',
  email: 'info@royaldent.lv',
  emailHref: 'mailto:info@royaldent.lv',

  // Адрес
  address: {
    street: 'Piestātnes iela 11A',
    city: 'Jūrmala',
    region: 'Jūrmala',
    postalCode: 'LV-2015',
    country: 'LV',
    full: 'Jūrmala, Piestātnes iela 11A',
  },

  // Геокоординаты (из Google Maps — Dental clinic ROYALDENT)
  geo: {
    latitude: 56.9775754,
    longitude: 23.8268255,
  },

  // Часы работы — единый формат для всего сайта
  hours: {
    short: 'Пн–Пт: 09:00–20:00',
    weekend: 'Сб–Вс: выходной',
    schemaOpeningHours: 'Mo-Fr 09:00-20:00',
  },

  // Социальные сети (TODO: заменить на реальные профили клиники)
  social: {
    instagram: '#',
    facebook: '#',
    whatsapp: '#',
    telegram: '#',
  },

  // Базовый URL сайта (используется для canonical / sitemap / og:url)
  siteUrl: 'https://royaldent.lv',
} as const;
