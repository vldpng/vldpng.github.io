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

export interface Doctor {
  id: string;
  name: string;
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
   * поэтому здесь только ссылки: '/services/ceramic' и т.п.
   */
  services: string[];
  photoLabel: string;
  /** Фото сотрудника. Пусто — показывается заглушка. TODO: добавить реальное фото. */
  photoUrl?: string;
  /**
   * Вспомогательный персонал (ассистенты, администраторы): личной страницы
   * нет и на приём к ним не записываются. Карточка показывает фото и
   * должность, но никуда не ведёт; /doctors/:id уводит обратно в список.
   */
  support?: boolean;
}

export const doctorsData: Doctor[] = [
  {
    id: "1",
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
    // TODO: положить сканы в public/images/certificates/ и проставить src с
    // подписями. Пока три пустые рамки — заготовка ленты, не реальные данные.
    certificates: [{}, {}, {}],
    // TODO: положить снимки в public/images/cases/ и проставить before/after.
    // Без путей слайдер показывает тёмную заглушку «[Фото до] / [Фото после]».
    cases: [
      { title: 'Имплантация при полном отсутствии зубов' },
      { title: 'Одномоментная имплантация после удаления' },
      { title: 'Протезирование на имплантах' },
    ],
    bio: "Проводит дентальную имплантацию и хирургическое восстановление зубов, а также ортопедическое протезирование — от планирования до фиксации постоянных конструкций.",
    services: [
      '/services/ceramic',
      '/services/surgery',
      '/services/implants',
      '/services/microscope',
      '/services/tmj',
    ],
    photoLabel: "[Фото — Виталий Двуреченский, хирург-имплантолог]",
    photoUrl: "/images/staff/Vitalij_Doctor.webp",
  },
  {
    id: "13",
    name: "Эдгар Берзе",
    specialty: "Хирург-имплантолог",
    experience: "15 лет",
    educationList: [
      { title: 'Рижский университет имени Паула Страдыня' },
    ],
    bio: "Проводит установку имплантов и хирургическое лечение: удаление зубов любой сложности, костную пластику и подготовку челюсти к протезированию.",
    services: ['/services/surgery', '/services/implants'],
    photoLabel: "[Фото — Эдгар Берзе, хирург-имплантолог]",
    photoUrl: "/images/staff/Edgar_Doctor.webp",
  },
  {
    id: "2",
    name: "Элина Хейфец",
    specialty: "Стоматолог-ортопед",
    experience: "12 лет", // TODO: реальный стаж
    educationList: [
      { title: 'Стоматология', subtitle: 'Высшее медицинское образование' }, // TODO
    ],
    bio: "Занимается протезированием и восстановлением зубов: коронки, виниры, мостовидные и съёмные конструкции с акцентом на эстетику и долговечность результата.",
    services: ['/services/ceramic', '/services/implants'],
    photoLabel: "[Фото — Элина Хейфец, стоматолог-ортопед]",
    photoUrl: "/images/staff/Elina_doctor.webp",
  },
  {
    id: "3",
    name: "Ирина Иванова",
    specialty: "Стоматолог-терапевт",
    experience: "10 лет", // TODO: реальный стаж
    educationList: [
      { title: 'Стоматология', subtitle: 'Высшее медицинское образование' }, // TODO
    ],
    bio: "Лечит кариес и его осложнения, проводит реставрацию зубов и эндодонтическое лечение каналов под микроскопом с сохранением естественного вида зуба.",
    services: ['/services/microscope', '/services/hygiene'],
    photoLabel: "[Фото — Ирина Иванова, стоматолог-терапевт]",
    photoUrl: "/images/staff/Irina_Doctor.webp",
  },
  {
    id: "5",
    name: "Валерия Кравчука",
    specialty: "Гигиенист",
    bio: "Проводит профессиональную чистку зубов, снятие налёта и зубного камня, профилактику кариеса и заболеваний дёсен.",
    services: ['/services/hygiene', '/services/whitening'],
    photoLabel: "[Фото — Валерия Кравчука, гигиенист]",
    photoUrl: "/images/staff/Valerija_higienist.webp",
  },
  {
    id: "9",
    name: "Алина Пурвиня",
    specialty: "Гигиенист",
    bio: "Выполняет профессиональную гигиену полости рта, снятие зубных отложений и полировку, подбирает средства для домашнего ухода.",
    services: ['/services/hygiene', '/services/whitening'],
    photoLabel: "[Фото — Алина Пурвиня, гигиенист]",
    photoUrl: "/images/staff/Alina_higienist.webp",
  },
  {
    id: "10",
    name: "Елена Якунчихина",
    specialty: "Косметолог",
    bio: "Проводит эстетические процедуры для лица и зоны вокруг губ, дополняя работу стоматологов и помогая добиться гармоничного результата.",
    services: [],
    photoLabel: "[Фото — Елена Якунчихина, косметолог]",
    photoUrl: "/images/staff/Jelena_cosmetology.webp",
  },
  {
    id: "6",
    name: "Даниэла Рожинская",
    specialty: "Ассистент",
    bio: "Ассистирует врачам во время приёма, готовит кабинет и материалы, помогает пациентам чувствовать себя комфортно на каждом этапе лечения.",
    services: [],
    photoLabel: "[Фото — Даниэла Рожинская, ассистент]",
    photoUrl: "/images/staff/Daniela_asistent.webp",
    support: true,
  },
  {
    id: "8",
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
    name: "Эдита", // TODO: добавить фамилию
    specialty: "Администратор",
    bio: "Встречает пациентов, ведёт запись на приём и помогает подобрать удобное время визита, отвечает на вопросы по лечению и документам.",
    services: [],
    photoLabel: "[Фото — Эдита, администратор]",
    photoUrl: "/images/staff/Edita_admin.webp",
    support: true,
  },
  {
    id: "12",
    name: "Татьяна", // TODO: добавить фамилию
    specialty: "Администратор",
    bio: "Координирует расписание клиники и сопровождает пациентов от первого звонка до завершения лечения.",
    services: [],
    photoLabel: "[Фото — Татьяна, администратор]",
    photoUrl: "/images/staff/Tatiana_admin.webp",
    support: true,
  },
];
