/**
 * Команда клиники RoyalDent.
 *
 * ВАЖНО: имена и специальности реальные. Поля стажа, образования
 * и профиля лечения помечены TODO — замените на реальные данные.
 * Компоненты автоматически скрывают пустые секции.
 */

export interface DoctorService {
  id: string;
  title: string;
  href: string;
}

export interface EducationItem {
  title: string;
  subtitle?: string;
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
  /** Профиль лечения — теги. Пусто — секция скрыта. */
  treatmentProfile?: string[];
  bio: string;
  services: DoctorService[];
  photoLabel: string;
  /** Фото сотрудника. Пусто — показывается заглушка. TODO: добавить реальное фото. */
  photoUrl?: string;
}

// Профиль лечения по специальности (используется как значение по умолчанию).
const PROFILE_BY_SPECIALTY: Record<string, string[]> = {
  'Хирург-имплантолог, ортопед': ['Адентия', 'Атрофия кости', 'Протезирование на имплантах'],
  'Стоматолог-ортопед': ['Адентия', 'Стёртые зубы', 'Коронки и виниры'],
  'Стоматолог-терапевт': ['Кариес', 'Пульпит', 'Лечение каналов под микроскопом'],
  'Гигиенист': ['Профгигиена', 'Удаление налёта и камня', 'Профилактика кариеса'],
  'CAD/CAM специалист': ['Цифровые реставрации', 'Коронки', 'Виниры'],
};

export const doctorsData: Doctor[] = [
  {
    id: "1",
    name: "Виталий Двуреченский",
    specialty: "Хирург-имплантолог, ортопед",
    experience: "15 лет", // TODO: реальный стаж
    educationList: [
      {
        title: 'Донецкий государственный медицинский университет имени Максима Горького',
        subtitle: '1989 — 1995',
      },
      { title: 'Интернатура по профилю «Общая стоматология»', subtitle: '1995 — 1996' },
      { title: 'Специализация по ортопедической стоматологии', subtitle: '1996 — 1997' },
      { title: 'Специализация по хирургической стоматологии', subtitle: '1997 — 1998' },
    ],
    treatmentProfile: PROFILE_BY_SPECIALTY['Хирург-имплантолог, ортопед'],
    bio: "Проводит дентальную имплантацию и хирургическое восстановление зубов, а также ортопедическое протезирование — от планирования до фиксации постоянных конструкций.",
    services: [
      { id: "s1", title: "Имплантация", href: "/services/implants" },
    ],
    photoLabel: "[Фото — Виталий Двуреченский, хирург-имплантолог]",
    photoUrl: "/images/staff/Dvurechenskiy.webp",
  },
  {
    id: "2",
    name: "Элина Хейфец",
    specialty: "Стоматолог-ортопед",
    experience: "12 лет", // TODO: реальный стаж
    educationList: [
      { title: 'Стоматология', subtitle: 'Высшее медицинское образование' }, // TODO
    ],
    treatmentProfile: PROFILE_BY_SPECIALTY['Стоматолог-ортопед'],
    bio: "Занимается протезированием и восстановлением зубов: коронки, виниры, мостовидные и съёмные конструкции с акцентом на эстетику и долговечность результата.",
    services: [
      { id: "s4", title: "Имплантация", href: "/services/implants" },
    ],
    photoLabel: "[Фото — Элина Хейфец, стоматолог-ортопед]",
    photoUrl: "/images/staff/Heyfec.webp",
  },
  {
    id: "3",
    name: "Ирина Иванова",
    specialty: "Стоматолог-терапевт",
    experience: "10 лет", // TODO: реальный стаж
    educationList: [
      { title: 'Стоматология', subtitle: 'Высшее медицинское образование' }, // TODO
    ],
    treatmentProfile: PROFILE_BY_SPECIALTY['Стоматолог-терапевт'],
    bio: "Лечит кариес и его осложнения, проводит реставрацию зубов и эндодонтическое лечение каналов под микроскопом с сохранением естественного вида зуба.",
    services: [
      { id: "s5", title: "Лечение под микроскопом", href: "/services/microscope" },
      { id: "s6", title: "Профессиональная гигиена", href: "/services/hygiene" },
    ],
    photoLabel: "[Фото — Ирина Иванова, стоматолог-терапевт]",
    photoUrl: "/images/staff/Ivanova.webp",
  },
  {
    id: "4",
    name: "Юлия Циплякова",
    specialty: "Гигиенист",
    treatmentProfile: PROFILE_BY_SPECIALTY['Гигиенист'],
    bio: "Выполняет профессиональную гигиену полости рта, ультразвуковую чистку и Air Flow, а также обучает пациентов правильному домашнему уходу.",
    services: [
      { id: "s7", title: "Профессиональная гигиена", href: "/services/hygiene" },
      { id: "s8", title: "Отбеливание Flash", href: "/services/whitening" },
    ],
    photoLabel: "[Фото — Юлия Циплякова, гигиенист]",
    photoUrl: "",
  },
  {
    id: "5",
    name: "Валерия Иванова",
    specialty: "Гигиенист",
    treatmentProfile: PROFILE_BY_SPECIALTY['Гигиенист'],
    bio: "Проводит профессиональную чистку зубов, снятие налёта и зубного камня, профилактику кариеса и заболеваний дёсен.",
    services: [
      { id: "s9", title: "Профессиональная гигиена", href: "/services/hygiene" },
      { id: "s10", title: "Отбеливание Flash", href: "/services/whitening" },
    ],
    photoLabel: "[Фото — Валерия Иванова, гигиенист]",
    photoUrl: "",
  },
  {
    id: "6",
    name: "Даниэла Иванова",
    specialty: "Ассистент",
    bio: "Ассистирует врачам во время приёма, готовит кабинет и материалы, помогает пациентам чувствовать себя комфортно на каждом этапе лечения.",
    services: [],
    photoLabel: "[Фото — Даниэла Иванова, ассистент]",
    photoUrl: "",
  },
  {
    id: "7",
    name: "Анастасия Иванова",
    specialty: "Ассистент",
    bio: "Ассистирует стоматологам на приёме, отвечает за стерильность и подготовку инструментов, сопровождает пациента во время процедур.",
    services: [],
    photoLabel: "[Фото — Анастасия Иванова, ассистент]",
    photoUrl: "",
  },
  {
    id: "8",
    name: "Владислав Двуреченский",
    specialty: "CAD/CAM специалист",
    experience: "6 лет", // TODO: реальный стаж
    educationList: [
      { title: 'Зубной техник / CAD-CAM', subtitle: 'Профильное образование' }, // TODO
    ],
    treatmentProfile: PROFILE_BY_SPECIALTY['CAD/CAM специалист'],
    bio: "Отвечает за цифровое моделирование и изготовление реставраций по технологии CAD/CAM: коронки, виниры и каркасы с высокой точностью прилегания.",
    services: [
      { id: "s12", title: "Имплантация", href: "/services/implants" },
    ],
    photoLabel: "[Фото — Владислав Двуреченский, CAD/CAM специалист]",
    photoUrl: "/images/staff/Vladyslav.webp",
  },
];
