import { generatedEnglishTranslations } from './english.generated';

/**
 * Human-reviewed corrections for brand language and dental terminology.
 * The large generated dictionary stays reproducible; editorial fixes live here.
 */
const manualTranslations: Record<string, string> = {
  'Имплантация': 'Dental Implants',
  'Имплантация зубов': 'Dental Implants',
  'Имплантация All-on-4': 'All-on-4 Dental Implants',
  'Имплантация All-on-6': 'All-on-6 Dental Implants',
  'Записаться на приём': 'Book an Appointment',
  'Записаться': 'Book an Appointment',
  'Оставить заявку': 'Request an Appointment',
  'Стоматолог-ортопед': 'Prosthodontist',
  'стоматолог-ортопед': 'prosthodontist',
  'Врач стоматолог-ортопед': 'Prosthodontist',
  'Лечение каналов': 'Root Canal Treatment',
  'Лечение каналов под микроскопом': 'Microscope-Assisted Root Canal Treatment',
  'Профессиональная гигиена': 'Professional Dental Cleaning',
  'Лечение дёсен Vector': 'Vector Gum Treatment',
  'Протезирование зубов': 'Dental Restorations',
  'Отбеливание Flash': 'Flash Teeth Whitening',
  'Удаление зуба мудрости': 'Wisdom Tooth Extraction',
  'Детская стоматология': 'Paediatric Dentistry',
  'Лечение сустава': 'TMJ Treatment',
  'ВНЧС': 'TMJ',
  'г. Юрмала': 'Jūrmala',
  'Юрмала': 'Jūrmala',
  'Пн–Пт: 09:00–20:00': 'Mon–Fri: 09:00–20:00',
  'Сб–Вс: выходной': 'Sat–Sun: closed',
  'Подробнее': 'Learn More',
  'Узнать больше': 'Learn More',
  'Все услуги': 'All Services',
  'Все врачи': 'Meet Our Doctors',
  'Пациентам': 'Patient Information',
  'Цены': 'Price List',
  'Главная': 'Home',
  'Назад': 'Back',
  'Закрыть': 'Close',
  'Загрузка': 'Loading',
  '— скоро': '— coming soon',
};

const translations = {
  ...generatedEnglishTranslations,
  ...manualTranslations,
};

const cyrillicPattern = /[А-Яа-яЁё]/;
const orderedTranslations = Object.entries(translations).sort(
  ([sourceA], [sourceB]) => sourceB.length - sourceA.length,
);

function polishDentalEnglish(value: string): string {
  return value
    .replaceAll('Jurmala', 'Jūrmala')
    .replaceAll('Orthopedic Dentist', 'Prosthodontist')
    .replaceAll('orthopedic dentist', 'prosthodontist')
    .replaceAll('Orthopedic stage', 'Prosthetic stage')
    .replaceAll('orthopedic stage', 'prosthetic stage')
    .replaceAll('Orthopedic treatment', 'Prosthodontic treatment')
    .replaceAll('orthopedic treatment', 'prosthodontic treatment')
    .replaceAll('Hardware treatment', 'Non-surgical treatment')
    .replaceAll('hardware treatment', 'non-surgical treatment');
}

function translateCore(value: string): string {
  if (!cyrillicPattern.test(value)) return value;

  const normalized = value.replace(/\s+/g, ' ').trim();
  const exact = translations[normalized];
  if (exact) return polishDentalEnglish(exact);

  // Combined text nodes (for example a label plus a dynamic value) may not
  // exist as one source literal. Longest-first replacement handles them while
  // keeping phone numbers, prices and user-entered values intact.
  let result = normalized;
  for (const [source, target] of orderedTranslations) {
    if (result.includes(source)) result = result.replaceAll(source, target);
  }
  return polishDentalEnglish(result);
}

function translateTextValue(value: string): string {
  if (!cyrillicPattern.test(value)) return value;
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  return `${leading}${translateCore(value)}${trailing}`;
}

const translatedAttributes = [
  'alt',
  'aria-label',
  'aria-roledescription',
  'content',
  'placeholder',
  'title',
] as const;

function translateNode(node: Node): void {
  if (node.nodeType === Node.TEXT_NODE) {
    const value = node.nodeValue;
    if (value && cyrillicPattern.test(value)) {
      node.nodeValue = translateTextValue(value);
    }
    return;
  }

  if (!(node instanceof Element)) return;

  for (const attribute of translatedAttributes) {
    const value = node.getAttribute(attribute);
    if (value && cyrillicPattern.test(value)) {
      node.setAttribute(attribute, translateTextValue(value));
    }
  }

  for (const child of node.childNodes) translateNode(child);
}

/**
 * Installs translation before React mounts. MutationObserver callbacks run in
 * the same event-loop turn as each React commit, avoiding a Russian flash on
 * English routes and also covering lazy pages, modals and SEO metadata.
 */
export function installEnglishTranslation(): void {
  translateNode(document.documentElement);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        translateNode(mutation.target);
        continue;
      }

      if (mutation.type === 'attributes') {
        translateNode(mutation.target);
        continue;
      }

      for (const node of mutation.addedNodes) translateNode(node);
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...translatedAttributes],
  });
}

/** Used by code that must provide translated text before it reaches the DOM. */
export function translateEnglish(value: string): string {
  return translateCore(value);
}
