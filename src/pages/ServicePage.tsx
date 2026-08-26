import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesList } from '../components/sections/Services';
import { BlackPlaceholder } from '../components/ui/Placeholder';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Seo } from '../components/Seo';
import { ServiceHero } from '../components/ui/service-hero';
import { serviceHeroes } from '../data/serviceHeroes';

// Расширенные данные для страницы услуг
const serviceDetails: Record<string, { fullDesc: string; benefits: string[]; process: string[] }> = {
  implants: {
    fullDesc: "Имплантация — это самый современный и надежный способ восстановления утраченных зубов. Мы предлагаем решения, которые полностью возвращают функциональность и эстетику.",
    benefits: [
      "Пожизненная гарантия на имплантаты",
      "Безболезненная процедура под местной анестезией",
      "Сохранение объема костной ткани"
    ],
    process: [
      "КТ диагностика и 3D-планирование операции",
      "Установка имплантата",
      "Установка коронки после приживления"
    ]
  },
  // prosthetics сюда не входит: у «Протезирования зубов» своя страница
  // (ProstheticsPage), она перехватывает /services/prosthetics в App.tsx.
  surgery: {
    fullDesc: "Выполняем весь спектр хирургических вмешательств: установку имплантатов, удаление зубов любой сложности, костную пластику и пластику десны. Операции планируются по КТ и проходят максимально бережно.",
    benefits: [
      "Планирование операций по 3D-снимку (КТ)",
      "Бережные протоколы и комфортная анестезия",
      "Полный спектр: от удаления до костной пластики"
    ],
    process: [
      "Консультация хирурга и КТ-диагностика",
      "Планирование и проведение вмешательства",
      "Контрольные осмотры и сопровождение заживления"
    ]
  },
  tmj: {
    fullDesc: "Гнатология занимается работой височно-нижнечелюстного сустава (ВНЧС) и жевательных мышц. Лечим щелчки и боли в суставе, последствия бруксизма и нарушения смыкания зубов.",
    benefits: [
      "Устранение болей, щелчков и напряжения в суставе",
      "Индивидуальные капы при бруксизме",
      "Защита зубов и реставраций от стирания"
    ],
    process: [
      "Консультация гнатолога и функциональная диагностика",
      "Изготовление индивидуальной капы или подбор терапии",
      "Контрольные визиты и коррекция лечения"
    ]
  },
  parodontology: {
    fullDesc: "Пародонтология — лечение тканей вокруг зуба: дёсен, связок и кости. Останавливаем кровоточивость и воспаление, лечим пародонтит и укрепляем подвижные зубы.",
    benefits: [
      "Остановка воспаления и кровоточивости дёсен",
      "Сохранение подвижных зубов (шинирование)",
      "Регенеративные методики восстановления тканей"
    ],
    process: [
      "Приём пародонтолога и составление пародонтальной карты",
      "Профессиональная гигиена и лечение дёсен",
      "Поддерживающая терапия и контрольные осмотры"
    ]
  },
  // microscope сюда не входит: у «Лечения каналов» своя страница
  // (RootCanalPage), она перехватывает /services/microscope в App.tsx.
  hygiene: {
    fullDesc: "Регулярная профессиональная гигиена - залог здоровья зубов и десен. Мы используем щадящие аппаратные методы для глубокого очищения.",
    benefits: [
      "Профилактика кариеса и пародонтита",
      "Осветление эмали на 1-2 тона",
      "Ощущение свежести и гладкости зубов"
    ],
    process: [
      "Ультразвуковое удаление твердого налета (камня)",
      "Очистка системой AirFlow",
      "Полировка эмали и фторирование"
    ]
  },
  whitening: {
    fullDesc: "Система клинического отбеливания Flash позволяет достичь ослепительного результата безопасно и комфортно. Улыбка становится светлее на несколько тонов за один визит.",
    benefits: [
      "Абсолютно безопасно для эмали",
      "Мгновенный результат",
      "Долговременный эффект"
    ],
    process: [
      "Определение исходного цвета и желаемого результата",
      "Изоляция десен и нанесение геля",
      "Активация геля специальной лампой (3-4 цикла по 15 мин)"
    ]
  },
  // aligners сюда не входит: у «Элайнеров» своя страница (AlignersPage),
  // она перехватывает /services/aligners в App.tsx.
};

export function ServicePage() {
  const { id } = useParams();

  const serviceBase = servicesList.find(s => s.id === id);
  const details = serviceBase && id ? serviceDetails[id] : null;
  // Баннер по макету заказчика. Есть не у каждой услуги: у кого его нет,
  // остаётся прежняя тёмная шапка.
  const hero = serviceBase && id ? serviceHeroes[id] : null;

  // Страница живая, если у услуги есть хотя бы одно из двух: баннер или
  // текстовый блок. Раньше требовалось и то и другое — новые услуги,
  // для которых заказчик пока прислал только баннер, отдавали бы 404.
  if (!serviceBase || (!details && !hero)) {
    return (
      <div className="py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <Seo title="Услуга не найдена" noindex path={`/services/${id ?? ''}`} />
        <h2 className="text-3xl font-bold mb-6">Услуга не найдена</h2>
        <Link to="/" className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700">
          <ArrowLeft size={20} />
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    // pt-28 при новом баннере отводит место под плавающую шапку: светлый
    // баннер начинается сразу под меню. У тёмной шапки свой внутренний py-20.
    <main className={hero ? 'pt-28' : 'pt-24 pb-32'}>
      <Seo
        title={hero?.title ?? serviceBase.title}
        description={(details?.fullDesc ?? serviceBase.desc).slice(0, 160)}
        path={`/services/${id}`}
      />

      {hero ? (
        <ServiceHero content={hero} />
      ) : (
        /* Hero Section of Service */
        <section className="bg-zinc-950 text-white py-20 px-4 mb-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <nav aria-label="Хлебные крошки" className="mb-8">
                <ol className="flex items-center gap-2 sm:gap-3 text-white/80 text-[10px] sm:text-[13px] font-medium tracking-wide uppercase whitespace-nowrap">
                  <li>
                    <Link to="/" className="hover:text-white transition-colors">Главная</Link>
                  </li>
                  <li aria-hidden="true"><span className="block w-4 sm:w-6 h-[1.5px] bg-white/70"></span></li>
                  <li>
                    <Link to="/services" className="hover:text-white transition-colors">Услуги</Link>
                  </li>
                  <li aria-hidden="true"><span className="block w-4 sm:w-6 h-[1.5px] bg-white/70"></span></li>
                  <li aria-current="page" className="text-white font-semibold">{serviceBase.title}</li>
                </ol>
              </nav>
              <h1 className="h-display mb-6">{serviceBase.title}</h1>
              <p className="text-lead text-zinc-200 max-w-2xl">
                {serviceBase.desc}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Main Content. Есть не у всех услуг: для новых страниц заказчик пока
          прислал только баннер — секции придут отдельно. */}
      {details && (
      <section className={`max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 ${hero ? 'py-20 md:py-24' : ''}`}>
        <div>
          <h2 className="h-section text-zinc-900 mb-6">Подробнее об услуге</h2>
          <p className="text-lead text-zinc-600 mb-10">
            {details.fullDesc}
          </p>

          <h3 className="h-card text-zinc-900 mb-6">Преимущества</h3>
          <ul className="space-y-4 mb-10">
            {details.benefits.map((benefit, i) => (
              <li key={i} className="flex gap-3 text-zinc-700 items-start">
                <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0" />
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-12">
          {/* Image placeholder */}
          <div className="h-80 w-full rounded-3xl overflow-hidden shadow-xl border border-zinc-100">
            <BlackPlaceholder label={`[Фото процесса: ${serviceBase.title}]`} />
          </div>

          <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
            <h3 className="h-card text-zinc-900 mb-6">Как проходит лечение</h3>
            <ol className="space-y-6 relative border-l border-zinc-200 ml-3">
              {details.process.map((step, i) => (
                <li key={i} className="pl-6 relative">
                  <div className="absolute w-6 h-6 bg-amber-500 text-zinc-900 rounded-full flex items-center justify-center text-sm font-bold -left-3 top-0 ring-4 ring-zinc-50">
                    {i + 1}
                  </div>
                  <p className="text-zinc-700 pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      )}
    </main>
  );
}
