import React from 'react';
import { BlackPlaceholder } from '../ui/Placeholder';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/fade-in';

export const servicesList = [
  {
    id: "implants",
    title: "Имплантация",
    desc: "Надежное восстановление утраченных зубов с использованием лучших мировых имплант-систем и пожизненной гарантией.",
  },
  {
    id: "ceramic",
    title: "Керамические реставрации",
    desc: "Восстанавливаем улыбку с помощью керамических виниров, накладок и коронок.",
  },
  {
    id: "surgery",
    title: "Хирургия",
    desc: "Имплантация и хирургические вмешательства: от удаления зубов до костной пластики и пластики десны.",
  },
  {
    id: "tmj",
    title: "Лечение сустава",
    desc: "Диагностика и лечение дисфункции височно-нижнечелюстного сустава (ВНЧС): подбор терапии, капы при бруксизме и спортивные капы.",
  },
  {
    id: "parodontology",
    title: "Пародонтология",
    desc: "Лечим заболевания дёсен: от кровоточивости до пародонтита. Регенеративные методики и шинирование подвижных зубов.",
  },
  {
    id: "microscope",
    title: "Лечение под микроскопом",
    desc: "Ювелирная точность в лечении каналов и спасении зубов с помощью высокоточной оптики.",
  },
  {
    id: "hygiene",
    title: "Профессиональная гигиена",
    desc: "Бережное удаление налета и камня по современным протоколам для абсолютного здоровья ваших десен.",
  },
  {
    id: "whitening",
    title: "Отбеливание Flash",
    desc: "Ослепительная белоснежная улыбка без вреда для эмали. Быстрый и комфортный результат с системой Flash.",
  },
  {
    id: "aligners",
    title: "Элайнеры",
    desc: "Исправление прикуса без брекетов. Максимально комфортный и эстетичный процесс преображения.",
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-card dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <FadeIn>
              <h2 className="h-section text-zinc-900 dark:text-zinc-50 mb-4">Наши услуги</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lead text-zinc-500 dark:text-zinc-400">Комплексный подход к здоровью и эстетике вашей улыбки. Передовые протоколы лечения и бескомпромиссное качество.</p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, idx) => (
            <div key={idx} className="h-full">
              <FadeIn delay={0.1 * idx} direction="up" className="h-full">
                <Link 
                  to={`/services/${service.id}`}
                  className="group flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-100 dark:border-zinc-800"
                >
                  <div className="h-48 w-full relative overflow-hidden shrink-0">
                    <BlackPlaceholder label={`[Фото: ${service.title}]`} className="group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="h-card text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">{service.title}</h3>
                    <p className="text-body text-zinc-600 dark:text-zinc-400 mb-6 flex-1">{service.desc}</p>
                    <div className="mt-auto flex items-center justify-between text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      <span>Узнать больше</span>
                      <div className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:border-zinc-100 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-all">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
