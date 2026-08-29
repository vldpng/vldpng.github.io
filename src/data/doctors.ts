/**
 * Команда клиники RoyalDent.
 *
 * ВАЖНО: имена и специальности реальные. Поля, помеченные TODO,
 * пока содержат заглушки — замените на реальные данные.
 * Компоненты автоматически скрывают пустые секции.
 */

export interface EducationItem {
  title: string;
  subtitle?: string;
}

export interface DoctorCase {
  /** Подпись под карточкой — что за работа. */
  title: string;
  /** Фото «до» и «после». Пусто — слайдер покажет тёмную заглушку.
   *  Класть в public/images/cases/, путь указывать от корня: /images/cases/... */
  before?: string;
  after?: string;
}

export interface Certificate {
  /** Скан сертификата. Пусто — в ленте будет пустая рамка-заглушка.
   *  Класть в public/images/certificates/, путь от корня: /images/certificates/... */
  src?: string;
  /** Подпись под сертификатом. Пусто — подписи не будет. */
  title?: string;
}

export interface DoctorEnglishTranslation {
  specialty: string;
  experience?: string;
  bio: string;
  educationList?: EducationItem[];
}

export type DoctorPublicationField =
  | 'name'
  | 'slug'
  | 'specialty'
  | 'bio'
  | 'educationList'
  | 'nameLatin'
  | 'specialtyEn'
  | 'experienceEn'
  | 'bioEn'
  | 'educationListEn';

export interface Doctor {
  /**
   * Внутренний ключ: первичный ключ в базе, по нему панель администратора
   * правит и переставляет карточки. В адресах не участвует — там slug.
   * Наружу не показывается нигде.
   */
  id: string;
  /**
   * Адрес страницы: /doctors/<slug>. Фамилия латиницей, строчными, через
   * дефис. Обязан быть уникальным: страница ищется по нему, и дубль увёл бы
   * один адрес на двух человек. У однофамильцев к фамилии добавляется имя —
   * см. двух Двуреченских ниже.
   */
  slug: string;
  name: string;
  /** Официальное написание имени латиницей для английской версии. */
  nameLatin?: string;
  specialty: string;
  /** Стаж работы. Пусто — блок не отображается. TODO: заполнить. */
  experience?: string;
  /** Образование (строкой, legacy). TODO. */
  education?: string;
  /** Образование — список учреждений. Пусто — секция скрыта. TODO. */
  educationList?: EducationItem[];
  /** Сертификаты — лента под списком образования. Пусто — ленты нет. */
  certificates?: Certificate[];
  /** Кейсы «до/после». Пусто — секция скрыта. */
  cases?: DoctorCase[];
  bio: string;
  /**
   * Услуги врача — маршруты из каталога направлений (serviceCards
   * в components/sections/ServiceCards). Названия подставляются оттуда,
   * поэтому здесь только ссылки: '/services/prosthetics' и т.п.
   */
  services: string[];
  photoLabel: string;
  /** Фото сотрудника. Пусто — показывается заглушка. TODO: добавить реальное фото. */
  photoUrl?: string;
  /**
   * Точка кадрирования для object-position, если центр не подходит.
   * Карточки режут фото под свои пропорции от центра, и на снимках уже
   * обычного 3:4 у людей срезается макушка. 'top' прижимает кадр к верху.
   */
  photoPosition?: string;
  /**
   * Вспомогательный персонал (ассистенты, администраторы): личной страницы
   * нет и на приём к ним не записываются. Карточка показывает фото и
   * должность, но никуда не ведёт; /doctors/:id уводит обратно в список.
   */
  support?: boolean;
  /**
   * Новые записи из админ-панели публикуются только с заполненной английской
   * версией. У старых записей флага нет — это сохраняет обратную совместимость.
   */
  requiresEnglishForPublication?: boolean;
  translations?: {
    en?: DoctorEnglishTranslation;
  };
}

/** Возвращает поля, без которых новый врач не может быть опубликован. */
export function getDoctorPublicationMissingFields(doctor: Doctor): DoctorPublicationField[] {
  const missing: DoctorPublicationField[] = [];
  const english = doctor.translations?.en;

  if (!doctor.name.trim() || doctor.name === 'Новый сотрудник') missing.push('name');
  if (!doctor.slug.trim() || doctor.slug === doctor.id) missing.push('slug');
  if (!doctor.specialty.trim()) missing.push('specialty');
  if (!doctor.bio.trim()) missing.push('bio');
  if (!doctor.support && !doctor.educationList?.length) missing.push('educationList');
  if (!doctor.nameLatin?.trim()) missing.push('nameLatin');
  if (!english?.specialty.trim()) missing.push('specialtyEn');
  if (doctor.experience?.trim() && !english?.experience?.trim()) missing.push('experienceEn');
  if (!english?.bio.trim()) missing.push('bioEn');
  if (!doctor.support && !english?.educationList?.length) missing.push('educationListEn');

  return missing;
}

/** Подставляет сохранённую английскую версию, не меняя технические поля врача. */
export function localizeDoctor(doctor: Doctor, lang: 'ru' | 'en' | 'lv'): Doctor {
  if (lang !== 'en') return doctor;
  const english = doctor.translations?.en;
  if (
    !english ||
    !doctor.nameLatin?.trim() ||
    !english.specialty.trim() ||
    !english.bio.trim()
  ) {
    return doctor;
  }

  return {
    ...doctor,
    name: doctor.nameLatin,
    specialty: english.specialty,
    experience: english.experience,
    bio: english.bio,
    educationList: english.educationList,
    photoLabel: `[Photo — ${doctor.nameLatin}]`,
  };
}

export const doctorsData: Doctor[] = [
  {
    id: "1",
    // Второй Двуреченский — ассистент Владислав ниже; чистая фамилия достаётся
    // врачу, у которого есть страница.
    slug: "dvurechenskiy",
    name: "Виталий Двуреченский",
    specialty: "Хирург-имплантолог, ортопед",
    experience: "30 лет",
    educationList: [
      {
        title: 'Донецкий государственный медицинский университет имени Максима Горького',
        subtitle: '1989 — 1995',
      },
      { title: 'Интернатура по профилю «Общая стоматология»', subtitle: '1995 — 1996' },
      { title: 'Специализация по ортопедической стоматологии', subtitle: '1996 — 1997' },
      { title: 'Специализация по хирургической стоматологии', subtitle: '1997 — 1998' },
    ],
    // Подписи не заполнены намеренно: что именно на каждом скане, знает только
    // клиника — придумывать названия дипломам нельзя. Без title лента покажет
    // плитки без подписей, это штатное поведение.
    certificates: [
      { src: '/images/certificates/Vitaly_certificate1.webp' },
      { src: '/images/certificates/Vitaly_certificate2.webp' },
      { src: '/images/certificates/Vitaly_certificate3.webp' },
      { src: '/images/certificates/Vitaly_certificate4.webp' },
      { src: '/images/certificates/Vitaly_certificate5.webp' },
      { src: '/images/certificates/Vitaly_certificate6.webp' },
      { src: '/images/certificates/Vitaly_certificate7.webp' },
      { src: '/images/certificates/Vitaly_certificate8.webp' },
      { src: '/images/certificates/Vitaly_certificate9.webp' },
    ],
    // Кейсы без снимков не заводим: слайдер показал бы тёмную заглушку
    // «[Фото до] / [Фото после]» — на странице врача это выглядит недоделкой.
    cases: [
      {
        title: 'Тотальная реабилитация',
        before: '/images/cases/total_rehabilitation_before.webp',
        after: '/images/cases/total_rehabilitation_after.webp',
      },
    ],
    bio: "Проводит дентальную имплантацию и хирургическое восстановление зубов, а также ортопедическое протезирование — от планирования до фиксации постоянных конструкций.",
    services: [
      '/services/prosthetics',
      '/services/implants',
      '/services/microscope',
      '/services/tmj',
    ],
    photoLabel: "[Фото — Виталий Двуреченский, хирург-имплантолог]",
    photoUrl: "/images/staff/Vitalij_Doctor.webp",
  },
  {
    id: "13",
    slug: "berze",
    name: "Эдгар Берзе",
    specialty: "Хирург-имплантолог",
    experience: "15 лет",
    educationList: [
      { title: 'Рижский университет имени Паула Страдыня' },
    ],
    bio: "Проводит установку имплантов и хирургическое лечение: удаление зубов любой сложности, костную пластику и подготовку челюсти к протезированию.",
    services: ['/services/implants'],
    photoLabel: "[Фото — Эдгар Берзе, хирург-имплантолог]",
    photoUrl: "/images/staff/Edgar_Doctor.webp",
  },
  {
    id: "2",
    slug: "heyfets",
    name: "Элина Хейфец",
    specialty: "Стоматолог-ортопед",
    experience: "35 лет",
    educationList: [
      { title: 'Стоматология', subtitle: 'Высшее медицинское образование' }, // TODO
    ],
    bio: "Занимается протезированием и восстановлением зубов: коронки, виниры, мостовидные и съёмные конструкции с акцентом на эстетику и долговечность результата.",
    services: ['/services/prosthetics', '/services/implants'],
    photoLabel: "[Фото — Элина Хейфец, стоматолог-ортопед]",
    photoUrl: "/images/staff/Elina_doctor.webp",
  },
  {
    id: "3",
    slug: "ivanova",
    name: "Ирина Иванова",
    specialty: "Стоматолог-терапевт",
    experience: "30 лет",
    educationList: [
      { title: 'Стоматология', subtitle: 'Высшее медицинское образование' }, // TODO
    ],
    bio: "Лечит кариес и его осложнения, проводит реставрацию зубов и эндодонтическое лечение каналов под микроскопом с сохранением естественного вида зуба.",
    services: ['/services/microscope', '/services/hygiene'],
    photoLabel: "[Фото — Ирина Иванова, стоматолог-терапевт]",
    photoUrl: "/images/staff/Irina_Doctor.webp",
    // Кадр уже остальных (990×1485 против 1200×1600), от центра срезало макушку.
    photoPosition: "top",
  },
  {
    id: "5",
    slug: "kravchuk",
    name: "Валерия Кравчук",
    specialty: "Гигиенист",
    experience: "6 лет",
    bio: "Проводит профессиональную чистку зубов, снятие налёта и зубного камня, профилактику кариеса и заболеваний дёсен.",
    services: ['/services/hygiene', '/services/whitening'],
    photoLabel: "[Фото — Валерия Кравчук, гигиенист]",
    photoUrl: "/images/staff/Valerija_higienist.webp",
  },
  {
    id: "9",
    slug: "purvinya",
    name: "Алина Пурвиня",
    specialty: "Гигиенист",
    experience: "10 лет",
    bio: "Выполняет профессиональную гигиену полости рта, снятие зубных отложений и полировку, подбирает средства для домашнего ухода.",
    services: ['/services/hygiene', '/services/whitening'],
    photoLabel: "[Фото — Алина Пурвиня, гигиенист]",
    photoUrl: "/images/staff/Alina_higienist.webp",
  },
  {
    id: "10",
    slug: "yakunchihina",
    name: "Елена Якунчихина",
    specialty: "Косметолог",
    bio: "Проводит эстетические процедуры для лица и зоны вокруг губ, дополняя работу стоматологов и помогая добиться гармоничного результата.",
    services: [],
    photoLabel: "[Фото — Елена Якунчихина, косметолог]",
    photoUrl: "/images/staff/Jelena_cosmetology.webp",
  },
  {
    id: "6",
    slug: "rozhinska",
    name: "Даниэла Рожинска",
    specialty: "Ассистент",
    bio: "Ассистирует врачам во время приёма, готовит кабинет и материалы, помогает пациентам чувствовать себя комфортно на каждом этапе лечения.",
    services: [],
    photoLabel: "[Фото — Даниэла Рожинска, ассистент]",
    photoUrl: "/images/staff/Daniela_asistent.webp",
    support: true,
  },
  {
    id: "8",
    // С именем, потому что фамилия уже занята хирургом Виталием. Личной
    // страницы у ассистента нет, но slug обязан быть уникальным: по нему
    // ищется врач, и дубль увёл бы один адрес на двух человек.
    slug: "dvurechenskiy-vladislav",
    name: "Владислав Двуреченский",
    specialty: "Ассистент",
    bio: "Ассистирует врачам на приёме, готовит кабинет и материалы, отвечает за стерильность инструментов и сопровождает пациента во время процедур.",
    services: [],
    photoLabel: "[Фото — Владислав Двуреченский, ассистент]",
    photoUrl: "", // TODO: фото ещё не снято
    support: true,
  },
  {
    id: "11",
    slug: "cheme",
    name: "Эдита Чеме",
    specialty: "Администратор",
    bio: "Встречает пациентов, ведёт запись на приём и помогает подобрать удобное время визита, отвечает на вопросы по лечению и документам.",
    services: [],
    photoLabel: "[Фото — Эдита Чеме, администратор]",
    photoUrl: "/images/staff/Edita_admin.webp",
    support: true,
  },
  {
    id: "12",
    slug: "chernogortseva",
    name: "Татьяна Черногорцева",
    specialty: "Администратор",
    bio: "Координирует расписание клиники и сопровождает пациентов от первого звонка до завершения лечения.",
    services: [],
    photoLabel: "[Фото — Татьяна Черногорцева, администратор]",
    photoUrl: "/images/staff/Tatiana_admin.webp",
    support: true,
  },
];
