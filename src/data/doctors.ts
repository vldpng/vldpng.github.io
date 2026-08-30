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

/** Переводимые поля врача: набор одинаков для всех языков, кроме русского. */
export interface DoctorTranslation {
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
  | 'educationListEn'
  | 'specialtyLv'
  | 'experienceLv'
  | 'bioLv'
  | 'educationListLv';

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
    en?: DoctorTranslation;
    lv?: DoctorTranslation;
  };
}

/** Возвращает поля, без которых новый врач не может быть опубликован. */
export function getDoctorPublicationMissingFields(doctor: Doctor): DoctorPublicationField[] {
  const missing: DoctorPublicationField[] = [];

  if (!doctor.name.trim() || doctor.name === 'Новый сотрудник') missing.push('name');
  if (!doctor.slug.trim() || doctor.slug === doctor.id) missing.push('slug');
  if (!doctor.specialty.trim()) missing.push('specialty');
  if (!doctor.bio.trim()) missing.push('bio');
  if (!doctor.support && !doctor.educationList?.length) missing.push('educationList');
  if (!doctor.nameLatin?.trim()) missing.push('nameLatin');

  // Латышский и английский требуются в одинаковом объёме: латышский —
  // основной язык сайта, английский — вторая публичная версия. Русский
  // лежит в самих полях врача и отдельной проверки не требует.
  const localized = [
    { translation: doctor.translations?.en, suffix: 'En' },
    { translation: doctor.translations?.lv, suffix: 'Lv' },
  ] as const;

  for (const { translation, suffix } of localized) {
    if (!translation?.specialty.trim()) missing.push(`specialty${suffix}`);
    if (doctor.experience?.trim() && !translation?.experience?.trim()) {
      missing.push(`experience${suffix}`);
    }
    if (!translation?.bio.trim()) missing.push(`bio${suffix}`);
    if (!doctor.support && !translation?.educationList?.length) {
      missing.push(`educationList${suffix}`);
    }
  }

  return missing;
}

/** Подставляет сохранённую английскую версию, не меняя технические поля врача. */
export function localizeDoctor(doctor: Doctor, lang: 'ru' | 'en' | 'lv'): Doctor {
  // Vecos ierakstos no administrācijas paneļa pieredze reizēm saglabāta kā
  // kails skaitlis (piem., "15"). Pievienojam mērvienību, lai nevienā valodā
  // publiskajā kartītē neparādītos "Стаж 15" / "Darba pieredze 15".
  const numericExperience = doctor.experience?.trim().match(/^\d+$/u)?.[0];
  const fallbackExperience = numericExperience
    ? lang === 'lv'
      ? `${numericExperience} gadi`
      : lang === 'en'
        ? `${numericExperience} years`
        : `${numericExperience} лет`
    : doctor.experience;

  if (lang === 'ru') return { ...doctor, experience: fallbackExperience };
  const translation = doctor.translations?.[lang];
  // Неполный перевод не подставляем: смесь языков в одной карточке хуже,
  // чем полностью русская карточка, которую добьёт словарь в i18n.
  if (
    !translation ||
    !doctor.nameLatin?.trim() ||
    !translation.specialty.trim() ||
    !translation.bio.trim()
  ) {
    return { ...doctor, experience: fallbackExperience };
  }

  return {
    ...doctor,
    name: doctor.nameLatin,
    specialty: translation.specialty,
    experience: translation.experience || fallbackExperience,
    bio: translation.bio,
    educationList: translation.educationList,
    photoLabel: lang === 'lv' ? `[Foto — ${doctor.nameLatin}]` : `[Photo — ${doctor.nameLatin}]`,
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
  
    nameLatin: "Vitālijs Dvurečenskis",
    translations: {
      en: {
        specialty: "Implant surgeon and prosthodontist",
        experience: "30 years",
        bio: "We perform dental implants and surgical restorations, as well as orthopedic prosthetics—from planning to the placement of permanent structures.",
        educationList: [
          { title: "Maxim Gorky Donetsk State Medical University", subtitle: "1989 — 1995" },
          { title: "Internship in General Dentistry", subtitle: "1995 — 1996" },
          { title: "Specialization in Prosthodontistry", subtitle: "1996 — 1997" },
          { title: "Specialization in Surgical Dentistry", subtitle: "1997 — 1998" },
        ],
      },
      lv: {
        specialty: "Zobārsts, implantologs un protēzists",
        experience: "30 gadi",
        bio: "Veic zobu implantāciju un ķirurģisku zobu atjaunošanu, kā arī protezēšanu — no plānošanas līdz pastāvīgo konstrukciju fiksācijai.",
        educationList: [
          { title: "Doņeckas Maksima Gorkija Valsts medicīnas universitāte", subtitle: "1989 — 1995" },
          { title: "Internatūra vispārējā zobārstniecībā", subtitle: "1995 — 1996" },
          { title: "Specializācija zobu protezēšanā", subtitle: "1996 — 1997" },
          { title: "Specializācija mutes ķirurģijā", subtitle: "1997 — 1998" },
        ],
      },
    },
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
  
    nameLatin: "Edgars Bērze",
    translations: {
      en: {
        specialty: "Implant Surgeon",
        experience: "15 years",
        bio: "Performs implant placement and surgical treatments: tooth extractions of any complexity, bone grafting, and jaw preparation for prosthetics.",
        educationList: [
          { title: "Riga Stradins University" },
        ],
      },
      lv: {
        specialty: "Zobārsts, implantologs",
        experience: "15 gadi",
        bio: "Veic implantu ievietošanu un ķirurģisko ārstēšanu: jebkuras sarežģītības zobu ekstrakciju, kaula plastiku un žokļa sagatavošanu protezēšanai.",
        educationList: [
          { title: "Rīgas Stradiņa universitāte" },
        ],
      },
    },
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
  
    nameLatin: "Elīna Heifeca",
    translations: {
      en: {
        specialty: "Prosthodontist",
        experience: "35 years",
        bio: "Specializes in dental prosthetics and restoration: crowns, veneers, bridges, and removable structures with an emphasis on aesthetics and long-lasting results.",
        educationList: [
          { title: "Dentistry", subtitle: "Higher medical education" },
        ],
      },
      lv: {
        specialty: "Zobārsts, protēzists",
        experience: "35 gadi",
        bio: "Nodarbojas ar zobu protezēšanu un atjaunošanu: kronīši, venīri, tiltiņi un izņemamās konstrukcijas ar uzsvaru uz estētiku un rezultāta ilgnoturību.",
        educationList: [
          { title: "Zobārstniecība", subtitle: "Augstākā medicīniskā izglītība" },
        ],
      },
    },
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
  
    nameLatin: "Irina Ivanova",
    translations: {
      en: {
        specialty: "Dentist-therapist",
        experience: "30 years",
        bio: "Treats caries and its complications, performs dental restorations and endodontic root canal treatment under a microscope while preserving the natural appearance of the tooth.",
        educationList: [
          { title: "Dentistry", subtitle: "Higher medical education" },
        ],
      },
      lv: {
        specialty: "Zobārsts",
        experience: "30 gadi",
        bio: "Ārstē kariesu un tā sarežģījumus, veic zobu restaurācijas un sakņu kanālu endodontisko ārstēšanu mikroskopā, saglabājot zoba dabisko izskatu.",
        educationList: [
          { title: "Zobārstniecība", subtitle: "Augstākā medicīniskā izglītība" },
        ],
      },
    },
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
  
    nameLatin: "Valērija Kravčuka",
    translations: {
      en: {
        specialty: "Hygienist",
        experience: "6 years",
        bio: "Performs professional teeth cleaning, plaque and tartar removal, and prevents caries and gum disease.",
      },
      lv: {
        specialty: "Zobu higiēnists",
        experience: "6 gadi",
        bio: "Veic profesionālo zobu tīrīšanu, aplikuma un zobakmens noņemšanu, kariesa un smaganu slimību profilaksi.",
      },
    },
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
  
    nameLatin: "Alīna Purviņa",
    translations: {
      en: {
        specialty: "Hygienist",
        experience: "10 years",
        bio: "Performs professional oral hygiene, scaling, and polishing, and selects home care products.",
      },
      lv: {
        specialty: "Zobu higiēnists",
        experience: "10 gadi",
        bio: "Veic profesionālo mutes higiēnu, zobu nosēdumu noņemšanu un pulēšanu, kā arī iesaka mājas kopšanas līdzekļus.",
      },
    },
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
  
    nameLatin: "Jeļena Jakunčihina",
    translations: {
      en: {
        specialty: "Cosmetologist",
        bio: "Performs aesthetic procedures for the face and around the lips, complementing the work of dentists and helping to achieve a harmonious result.",
      },
      lv: {
        specialty: "Kosmetologs",
        bio: "Veic estētiskās procedūras sejai un lūpu apvidum, papildinot zobārstu darbu un palīdzot sasniegt harmonisku rezultātu.",
      },
    },
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
  
    nameLatin: "Daniela Rožinska",
    translations: {
      en: {
        specialty: "Assistant",
        bio: "Assists doctors during appointments, prepares the office and materials, and helps patients feel comfortable at every stage of treatment.",
      },
      lv: {
        specialty: "Zobārsta asistents",
        bio: "Asistē ārstiem vizītes laikā, sagatavo kabinetu un materiālus, palīdz pacientiem justies komfortabli katrā ārstēšanas posmā.",
      },
    },
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
  
    nameLatin: "Vladislavs Dvurečenskis",
    translations: {
      en: {
        specialty: "Assistant",
        bio: "Assists doctors during appointments, prepares the office and materials, ensures the sterility of instruments, and accompanies the patient during procedures.",
      },
      lv: {
        specialty: "Zobārsta asistents",
        bio: "Asistē ārstiem vizītes laikā, sagatavo kabinetu un materiālus, atbild par instrumentu sterilitāti un pavada pacientu procedūru laikā.",
      },
    },
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
  
    nameLatin: "Edita Čeme",
    translations: {
      en: {
        specialty: "Administrator",
        bio: "We greet patients, schedule appointments, help find a convenient time for your visit, and answer questions about treatment and documentation.",
      },
      lv: {
        specialty: "Administrators",
        bio: "Sagaida pacientus, veic pierakstu un palīdz izvēlēties ērtu vizītes laiku, atbild uz jautājumiem par ārstēšanu un dokumentiem.",
      },
    },
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
  
    nameLatin: "Tatjana Černogorceva",
    translations: {
      en: {
        specialty: "Administrator",
        bio: "Coordinates the clinic schedule and supports patients from the first call until the end of treatment.",
      },
      lv: {
        specialty: "Administrators",
        bio: "Koordinē klīnikas grafiku un pavada pacientus no pirmā zvana līdz ārstēšanas noslēgumam.",
      },
    },
  },
];
