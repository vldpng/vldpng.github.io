import { generatedEnglishTranslations } from './english.generated';
import { setRuntimeTranslator } from './runtime';

/**
 * Human-reviewed corrections for brand language and dental terminology.
 * The large generated dictionary stays reproducible; editorial fixes live here.
 */
const manualTranslations: Record<string, string> = {
  'Найди свою улыбку в': 'Find Your Smile in',
  'Иван Граф': 'Ivan Graf',
  'Гнатолог': 'Gnathologist',
  'Институт имени Масима Горького - по специальности врач-стоматолог':
    'Maxim Gorky Institute — Degree in Dentistry',
  'Имплантация': 'Dental Implants',
  'Имплантация зубов': 'Dental Implants',
  'Калькулятор цен на имплантацию': 'Price calculator for implantation',
  'Имплантация All-on-4': 'All-on-4 Dental Implants',
  'Имплантация All-on-6': 'All-on-6 Dental Implants',
  'Записаться на приём': 'Book an Appointment',
  'Запись на приём': 'Book an Appointment',
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
  'Отбеливание Flash': 'Fläsh Teeth Whitening',
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
  'Новый сотрудник': 'New team member',
  'До': 'Before',
  'После': 'After',
  'Отправляем…': 'Sending…',
  'зуб': 'tooth',
  'зуба': 'teeth',
  'зубов': 'teeth',
  'политикой конфиденциальности': 'the Privacy Policy',
  'Только необходимые': 'Essential only',
  'Ортопедия': 'Prosthodontics',
  'Стаж работы': 'Work experience',
  'Этапы имплантации': 'Implantation stages',
  'прайс-листе клиники': "the clinic's price list",
  'Отзывы Google Maps': 'Google Maps reviews',
  'Пользователь Google Maps': 'Google Maps user',
  'Отзыв в Google Maps': 'Review on Google Maps',
  'Отзыв оставлен без текста': 'Review submitted without text',
  'Не удалось загрузить отзывы Google Maps:': 'Unable to load Google Maps reviews:',
  'Отзывы пациентов': 'Patient reviews',
  'Google Maps показывает ограниченную подборку отзывов, отсортированную по релевантности.':
    'Google Maps displays a limited selection of reviews ordered by relevance.',
  'Отзывы пациентов, опубликованные в профиле клиники на Google Maps.':
    "Patient reviews published on the clinic's Google Maps profile.",
  'Отзывы пациентов о лечении в нашей клинике.': 'Patient reviews about treatment at our clinic.',
  'Смотреть профиль в Google Maps': 'View profile on Google Maps',
  'Открыть отзыв в Google Maps': 'Open review on Google Maps',
  'Читать полностью': 'Read full review',
  'Свернуть': 'Show less',
  'долговечность': 'durability',
  'Обработка пародонтального кармана аппаратом Vector':
    'Periodontal pocket treatment with the Vector device',
  'Удерживающая капа после лечения на элайнерах':
    'Retainer after aligner treatment',
  'Лёгкая или умеренная атрофия костной ткани':
    'Mild to moderate bone tissue atrophy',
  'Уже более 15 лет заботимся о детских улыбках':
    "Caring for children's smiles for over 15 years",
  'Хирург-имплантолог, ортопед': 'Implant surgeon and prosthodontist',
  'После интеграции имплантатов и формирования мягких тканей выполнено сканирование с уровня мульти-юнит абатментов':
    'After implant integration and soft-tissue healing, scan at multi-unit abutment level',
  'Права и обязанности пациента в сфере охраны здоровья':
    'Patient rights and responsibilities in healthcare',
  'Запись на первичный и повторный приём к специалистам Клиники осуществляется предварительно одним из следующих способов:':
    "Initial and follow-up appointments with the Clinic's specialists must be booked in advance using one of the following methods:",
  'Это замедляет её дальнейшую атрофию и помогает сохранить стабильность конструкции со временем.':
    'This slows further bone atrophy and helps maintain the stability of the restoration over time.',
  'Команда стоматологов клиники RoyalDent в Юрмале: хирурги-имплантологи, ортопеды, ортодонты и эндодонтисты с многолетним опытом.':
    'The RoyalDent team in Jūrmala includes experienced implant surgeons, prosthodontists, orthodontists, and endodontists.',
  'по системе «все на 4 / all on 4», записывайтесь на консультацию к хирургу-ортопеду в клинику RoyalDent.':
    'For All-on-4 treatment, book a consultation with an implant surgeon and prosthodontist at RoyalDent.',
  'От 21 до 22 часов. Снимать капы нужно только на время еды и чистки зубов. Если носить их меньше, лечение затягивается, а результат становится непредсказуемым.':
    '21–22 hours a day. Remove the aligners only for eating and brushing. Wearing them for less time can prolong treatment and make the result unpredictable.',
  'Актуальный прейскурант (cenrādis) на медицинские услуги размещён на информационном стенде и на официальном сайте Клиники.':
    "The current price list (cenrādis) for medical services is available on the information board and on the Clinic's official website.",
  'Тремя способами: позвонить по телефону +371 27 057 783, заполнить форму на сайте — администратор перезвонит и подберёт время, либо написать нам в мессенджер.':
    'There are three ways: call +371 27 057 783, submit the website form and our administrator will call you back to arrange a time, or message us through a messaging app.',
  'Более частые визиты для активаций, более высокая вероятность внеплановых посещений и большее общее время пребывания пациента в кресле':
    'More frequent activation visits, a higher likelihood of unscheduled appointments, and more overall chair time',
  'Как подготовиться к диагностике в клинике RoyalDent в Юрмале: прицельные снимки, ОПТГ, КЛКТ, фотопротокол и внутриротовое сканирование.':
    'How to prepare for diagnostics at RoyalDent in Jūrmala: periapical radiographs, panoramic radiography, CBCT, clinical photography, and intraoral scanning.',
  'К ним относятся прицельные снимки отдельных зубов и другие виды внутриротовой рентгенографии. Специальная подготовка не требуется.':
    'These include periapical radiographs of individual teeth and other types of intraoral radiography. No special preparation is required.',
  'Лечение начинается с осмотра и диагностики. Для точной оценки анатомии корней и количества каналов мы используем прицельный рентген и, при необходимости, компьютерную томографию. Это особенно важно для многоканальных зубов, где анатомия может быть сложной.':
    'Treatment begins with an examination and diagnosis. To assess root anatomy and the number of canals accurately, we use periapical radiographs and, when necessary, CBCT. This is especially important for multirooted teeth with complex anatomy.',
  'Новаторство методики восстановления зубов All-on-4 заключается в том, что для фиксации зубного ряда требуется только 4 имплантата. Их положение, размер и наклон позволяют равномерно распределить нагрузку, используя их в качестве опоры для зубного ряда из 10 зубов.':
    'The All-on-4 concept uses only four implants to support a fixed dental arch. Their position, size, and angulation distribute the load evenly and support a 10-tooth arch.',
  'Восьмёрки, они же зубы мудрости, прорезываются намного позже остальных, не имеют ни функционального, ни эстетического значения.':
    'Third molars, commonly known as wisdom teeth, erupt much later than the other teeth and have no significant functional or aesthetic role.',
  'Прорезавшийся под наклоном моляр часто упирается в близлежащую семёрку, провоцируя её преждевременное разрушение.':
    'A third molar erupting at an angle often presses against the adjacent second molar and may cause its premature damage.',
  'Эдита Чеме': 'Edita Cheme',
  'Элина Хейфец': 'Elīna Heifeca',
  'Виталий Двуреченский': 'Vitaly Dvurechensky',
  'Владислав Двуреченский': 'Vladislav Dvurechensky',
  '[Фото — Эдита Чеме, администратор]': '[Photo — Edita Cheme, administrator]',
  '[Фото — Элина Хейфец, стоматолог-ортопед]':
    '[Photo — Elīna Heifeca, prosthodontist]',
  '[Фото — Виталий Двуреченский, хирург-имплантолог]':
    '[Photo — Vitaly Dvurechensky, implant surgeon]',
  '[Фото — Владислав Двуреченский, ассистент]':
    '[Photo — Vladislav Dvurechensky, assistant]',
  'Настоящие Правила внутреннего распорядка стоматологической клиники «RoyalDent» (далее — Правила) являются организационно-правовым документом и разработаны в соответствии с законодательством Латвийской Республики, в том числе с Гражданским законом (Civillikums), законом «О правах пациентов» (Pacientu tiesību likums), законом «О медицинской деятельности» (Ārstniecības likums), законом «О защите прав потребителей» (Patērētāju tiesību aizsardzības likums), Регламентом (ЕС) 2016/679 (Общий регламент о защите данных, GDPR) и законом «Об обработке данных физических лиц» (Fizisko personu datu apstrādes likums), правилами Кабинета министров № 555 «Veselības aprūpes pakalpojumu organizēšanas un samaksas kārtība», а также иными нормативными актами.':
    'These Internal Rules of the RoyalDent dental clinic (the “Rules”) are an organisational and legal document developed in accordance with the laws of the Republic of Latvia, including the Civil Law (Civillikums), the Law on the Rights of Patients (Pacientu tiesību likums), the Medical Treatment Law (Ārstniecības likums), the Consumer Rights Protection Law (Patērētāju tiesību aizsardzības likums), Regulation (EU) 2016/679 (General Data Protection Regulation, GDPR), the Personal Data Processing Law (Fizisko personu datu apstrādes likums), Cabinet of Ministers Regulation No. 555 “Veselības aprūpes pakalpojumu organizēšanas un samaksas kārtība”, and other applicable laws and regulations.',
  '— скоро': '— coming soon',
  // Хвост шаблона `${n} лет` из localizeDoctor: русский стаж собирается в
  // рантайме, когда в базе у врача лежит голое число без единицы измерения.
  'лет': 'years',
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
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replaceAll('Jurmala', 'Jūrmala')
    .replaceAll('Flash', 'Fläsh')
    .replaceAll('All on 4', 'All-on-4')
    .replaceAll('all on 4', 'All-on-4')
    .replaceAll('All on 6', 'All-on-6')
    .replaceAll('all on 6', 'All-on-6')
    .replaceAll('Orthopedic Dentist', 'Prosthodontist')
    .replaceAll('orthopedic dentist', 'prosthodontist')
    .replaceAll('Orthopedic stage', 'Prosthetic stage')
    .replaceAll('orthopedic stage', 'prosthetic stage')
    .replaceAll('Orthopedic treatment', 'Prosthodontic treatment')
    .replaceAll('orthopedic treatment', 'prosthodontic treatment')
    .replaceAll('Hardware treatment', 'Non-surgical treatment')
    .replaceAll('hardware treatment', 'non-surgical treatment')
    .replaceAll('Hardware gum treatment', 'Non-surgical gum treatment')
    .replaceAll('hardware gum treatment', 'non-surgical gum treatment')
    .replaceAll('Orthopedic products', 'Prosthetic restorations')
    .replaceAll('orthopedic products', 'prosthetic restorations')
    .replaceAll('Orthopedic structures', 'Prosthetic restorations')
    .replaceAll('orthopedic structures', 'prosthetic restorations')
    .replaceAll('Orthopedics', 'Prosthodontics')
    .replaceAll('orthopedics', 'prosthodontics')
    .replaceAll('Retaining cap', 'Retainer')
    .replaceAll('10-teeth arch', '10-tooth arch')
    .replaceAll('targeted X-rays', 'periapical radiographs')
    .replaceAll('targeted x-rays', 'periapical radiographs')
    .replaceAll('targeted images', 'periapical radiographs')
    .replaceAll('eighth teeth', 'third molars')
    .replaceAll('eighth tooth', 'third molar')
    .replaceAll('seventh tooth', 'second molar')
    .replaceAll('message us via messenger', 'message us through a messaging app')
    .replaceAll('chairtime', 'chair time')
    .replaceAll('in accordance with Privacy Policy', 'in accordance with the Privacy Policy')
    .replaceAll('Only essential services', 'Essential only')
    .replaceAll('Book an appointment', 'Book an Appointment')
    .replaceAll('Mon-Fri: 9:00 AM - 8:00 PM', 'Mon–Fri: 09:00–20:00');
}

function translateDynamicString(value: string): string | undefined {
  let match: RegExpMatchArray | null;
  const translated = (part: string) => translateCore(part.trim());

  if ((match = value.match(/^Сертификат (\d+) из (\d+) — (.+)$/))) {
    return `Certificate ${match[1]} of ${match[2]} — ${translated(match[3])}`;
  }
  if ((match = value.match(/^Открыть сертификат (\d+) из (\d+)$/))) {
    return `Open certificate ${match[1]} of ${match[2]}`;
  }
  if ((match = value.match(/^Открыть сертификат: (.+)$/))) {
    return `Open certificate: ${translated(match[1])}`;
  }
  if ((match = value.match(/^Сертификат — (.+)$/))) {
    return `Certificate — ${translated(match[1])}`;
  }
  if ((match = value.match(/^Подробнее о враче: (.+)$/))) {
    return `Learn more about ${translated(match[1])}`;
  }
  if ((match = value.match(/^Фото (\d+) из (\d+)$/))) {
    return `Photo ${match[1]} of ${match[2]}`;
  }
  if ((match = value.match(/^Фото (\d+)$/))) return `Photo ${match[1]}`;
  if ((match = value.match(/^Слайд (\d+)$/))) return `Slide ${match[1]}`;
  if ((match = value.match(/^(.+), работа (\d+)$/))) {
    return `${translated(match[1])}, case ${match[2]}`;
  }
  if ((match = value.match(/^Рентгеновский снимок пролеченных корневых каналов, пример (\d+)$/))) {
    return `Radiograph of treated root canals, example ${match[1]}`;
  }
  if ((match = value.match(/^\[Фото(?::| процесса:| ·| —) (.+)]$/))) {
    return `[Photo — ${translated(match[1])}]`;
  }
  if ((match = value.match(/^Имплант (.+) и его установка$/))) {
    return `${translated(match[1])} implant and placement`;
  }
  if ((match = value.match(/^Коронка «(.+)»$/))) {
    return `Crown: ${translated(match[1])}`;
  }
  if ((match = value.match(/^Имплант: (.+) — (.+) × (\d+)$/))) {
    return `Implant: ${translated(match[1])} — ${match[2]} × ${match[3]}`;
  }
  if ((match = value.match(/^Коронка: (.+) — (.+) × (\d+)$/))) {
    return `Crown: ${translated(match[1])} — ${match[2]} × ${match[3]}`;
  }
  if ((match = value.match(/^Зубы: верхняя челюсть — (\d+), нижняя — (\d+), всего (\d+)$/))) {
    return `Teeth: upper jaw — ${match[1]}, lower jaw — ${match[2]}, total — ${match[3]}`;
  }
  if ((match = value.match(/^Итого: (.+)$/))) return `Total: ${match[1]}`;

  return undefined;
}

function replaceSafeSegments(value: string): string {
  let result = value;
  for (const [source, target] of orderedTranslations) {
    const trimmed = source.trim();
    if (trimmed.length < 3) continue;
    if (trimmed.includes('«') !== trimmed.includes('»')) continue;

    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'gu');
    result = result.replace(pattern, target);
  }
  return result;
}

function translateCore(value: string): string {
  const sanitized = value.replace(/[\u200B-\u200D\uFEFF]/g, '');
  if (!cyrillicPattern.test(sanitized)) return polishDentalEnglish(sanitized);

  const normalized = sanitized.replace(/\s+/g, ' ').trim();
  const exact = translations[normalized];
  if (exact) return polishDentalEnglish(exact);

  const dynamic = translateDynamicString(normalized);
  if (dynamic) return polishDentalEnglish(dynamic);

  // Legal copy contains a few runtime values (phone, email, site URL). Replace
  // only complete words/phrases, never arbitrary substrings inside names.
  return polishDentalEnglish(replaceSafeSegments(normalized));
}

function translateTextValue(value: string): string {
  if (!cyrillicPattern.test(value) && !/[\u200B-\u200D\uFEFF]/u.test(value)) return value;
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  return `${leading}${translateCore(value)}${trailing}`;
}

/**
 * Enables translation before React mounts, so translated values become part
 * of React's own render tree and navigation remains fully client-side.
 */
export function installEnglishTranslation(): void {
  setRuntimeTranslator(
    translateTextValue,
    () => !/^\/en\/admin(?:\/|$)/.test(window.location.pathname),
  );
}

/** Used by code that must provide translated text before it reaches the DOM. */
export function translateEnglish(value: string): string {
  return translateCore(value);
}
