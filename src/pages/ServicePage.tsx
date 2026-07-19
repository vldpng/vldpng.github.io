import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesList } from '../components/sections/Services';
import { BlackPlaceholder } from '../components/ui/Placeholder';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useBookingModal } from '../context/BookingModalContext';
import { Seo } from '../components/Seo';

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
  ceramic: {
    fullDesc: "Керамические реставрации — виниры, накладки и коронки — восстанавливают эстетику и функцию зубов с максимально естественным результатом. Керамика точно повторяет цвет и прозрачность живой эмали.",
    benefits: [
      "Естественный цвет и прозрачность, как у своей эмали",
      "Минимальная обточка тканей зуба",
      "Прочность и стабильность цвета на годы"
    ],
    process: [
      "Диагностика и цифровое планирование улыбки (DSD)",
      "Подготовка зубов и цифровой оттиск",
      "Изготовление и фиксация керамических реставраций"
    ]
  },
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
  microscope: {
    fullDesc: "Использование операционного микроскопа позволяет спасти даже самые сложные зубы, обеспечивая максимальную точность обработки каналов и минимальное вмешательство.",
    benefits: [
      "30-кратное увеличение для ювелирной точности",
      "Возможность сохранить зуб от удаления",
      "Высокое качество пломбировки сложных каналов"
    ],
    process: [
      "Диагностика с использованием 3D снимка",
      "Изоляция зуба коффердамом",
      "Обработка и пломбировка каналов под микроскопом"
    ]
  },
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
  aligners: {
    fullDesc: "Элайнеры — это прозрачные капы для незаметного выравнивания зубов. Идеальный выбор для тех, кто ценит комфорт и эстетику в процессе ортодонтического лечения.",
    benefits: [
      "Незаметны для окружающих",
      "Можно снимать во время еды и чистки зубов",
      "Прогнозируемый результат"
    ],
    process: [
      "3D сканирование и создание виртуального плана лечения",
      "Изготовление индивидуального набора кап",
      "Регулярная смена кап и контроль у врача"
    ]
  }
};

export function ServicePage() {
  const { id } = useParams();
  const { openModal } = useBookingModal();
  
  const serviceBase = servicesList.find(s => s.id === id);
  const details = serviceBase && id ? serviceDetails[id] : null;

  if (!serviceBase || !details) {
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
    <main className="pt-24 pb-32">
      <Seo
        title={serviceBase.title}
        description={details.fullDesc.slice(0, 160)}
        path={`/services/${id}`}
      />
      {/* Hero Section of Service */}
      <section className="bg-zinc-950 text-white py-20 px-4 mb-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm">
              <ArrowLeft size={16} /> Назад к списку услуг
            </Link>
            <h1 className="h-display mb-6">{serviceBase.title}</h1>
            <p className="text-lead text-zinc-400 max-w-2xl">
              {serviceBase.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
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
                  <div className="absolute w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold -left-3 top-0 ring-4 ring-zinc-50">
                    {i + 1}
                  </div>
                  <p className="text-zinc-700 pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="bg-amber-100/50 border border-amber-200 rounded-[3rem] py-16 px-8">
          <h2 className="h-section text-zinc-900 mb-4">Готовы к здоровой улыбке?</h2>
          <p className="text-lead text-zinc-600 mb-8 max-w-lg mx-auto">
            Оставьте заявку на бесплатную консультацию, и мы подберём оптимальный план лечения.
          </p>
          <button
            onClick={() => openModal()}
            className="bg-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-600 transition-colors"
          >
            Записаться на приём
          </button>
        </div>
      </section>
    </main>
  );
}
