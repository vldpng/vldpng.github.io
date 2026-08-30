import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/fade-in';
import { SectionBadge } from '../ui/section-badge';
import { useContactModal } from '../../context/ContactModalContext';

const aboutStats = [
  { value: '15+', label: 'Лет опыта' },
  { value: '95%', label: 'Довольных пациентов' },
  { value: '100%', label: 'Качество лечения' },
];

export function About() {
  const { openModal } = useContactModal();

  return (
    <section id="about" className="pt-12 lg:pt-16 pb-24 lg:pb-32 bg-zinc-50 dark:bg-zinc-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        {/* Intro — слева тёмный блок, вертикальная линия, справа тег + статистика */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 lg:items-stretch">
          {/* Левая колонка: тёмный блок с заявлением (левый край — до края экрана) */}
          <div className="lg:flex-1 lg:flex lg:flex-col bg-gradient-to-br from-[#4D4D4F] via-[#3B3B3D] to-[#2C2C2D] rounded-[2rem] p-8 lg:p-12 min-[1600px]:rounded-l-none min-[1600px]:ml-[calc((100vw_-_100rem)_*_-0.5_-_0.75rem)]">
            <FadeIn delay={0.1}>
              <p className="text-2xl md:text-3xl lg:text-[2.5rem] font-medium tracking-tight leading-snug text-white">
                RoyalDent — это современная стоматологическая клиника, призванная дарить
                здоровые и уверенные улыбки на каждом этапе жизни. Мы сочетаем передовые
                стоматологические технологии с бережным, индивидуальным подходом, чтобы
                обеспечить точное, комфортное и эффективное лечение.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="lg:mt-auto lg:pt-12">
              <Link
                to="/about"
                className="mt-8 lg:mt-0 inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 px-6 py-3 text-sm font-medium hover:bg-zinc-200 transition-colors"
              >
                О клинике <ArrowUpRight size={16} />
              </Link>
            </FadeIn>
          </div>

          {/* Вертикальная линия-разделитель */}
          <div className="hidden lg:block w-px self-stretch bg-zinc-200 dark:bg-zinc-800" />

          {/* Правая колонка: тег + статистика */}
          <div className="lg:w-[36%] lg:shrink-0 flex flex-col">
            <FadeIn>
              <SectionBadge>Кто мы</SectionBadge>
            </FadeIn>
            <FadeIn
              delay={0.05}
              className="mt-6 flex-1 min-h-[260px] min-[1440px]:h-[clamp(20rem,21.5vw,25.625rem)] min-[1440px]:flex-none min-[1440px]:mr-[calc((100vw_-_100rem)_*_-0.5_-_0.75rem)]"
            >
              <div className="relative h-full overflow-hidden rounded-[2rem] min-[1440px]:rounded-r-none">
                <img
                  src="/images/decor/two-tooth.webp"
                  srcSet="/images/decor/two-tooth-800.webp 800w, /images/decor/two-tooth-1200.webp 1200w, /images/decor/two-tooth.webp 2000w"
                  sizes="(min-width: 1024px) 36vw, calc(100vw - 1rem)"
                  alt="Стоматология RoyalDent"
                  loading="lazy"
                  className="w-full h-full object-cover min-[1440px]:absolute min-[1440px]:inset-y-0 min-[1440px]:right-0 min-[1440px]:w-auto min-[1440px]:max-w-none min-[1440px]:object-contain"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="mt-6">
              <div className="flex divide-x divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800 py-6">
                {aboutStats.map((stat) => (
                  <div key={stat.label} className="flex-1 px-4 text-center">
                    <div className="font-serif text-3xl md:text-4xl font-normal leading-none text-zinc-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="eyebrow text-zinc-500 dark:text-zinc-400 mt-2 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Technologies Block */}
        <div className="mt-24 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            
            {/* Header — во всю ширину сетки, содержимое по центру */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center text-center mb-4">
               <FadeIn delay={0.1}>
                 <h2 className="h-section uppercase text-zinc-900 dark:text-zinc-50 mb-8">
                   Технологии в RoyalDent
                 </h2>
               </FadeIn>
               <FadeIn delay={0.2}>
                 <p className="text-body text-zinc-500 dark:text-zinc-400 max-w-lg">
                   Мы постоянно инвестируем в современные стоматологические технологии и оборудование, для точной диагностики и эффективного лечения.
                 </p>
               </FadeIn>
            </div>

            {/* 01 — выезжает слева направо */}
            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col border-t border-zinc-900 dark:border-zinc-100 pt-6 h-full">
                <span className="text-3xl text-zinc-900 dark:text-zinc-100 mb-6 font-light">01</span>
                <h3 className="h-card text-zinc-900 dark:text-zinc-100 mb-4">
                  Американские протоколы<br className="hidden lg:block"/>
                </h3>
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-[1.65]">
                  В процессе всех процедур отбеливания и профессиональной гигиены мы работаем по Американским протоколам и стандартам, обеспечивая бережный подход без дискомфорта.
                </p>
              </div>
            </FadeIn>
            
            {/* 02 — выезжает справа налево */}
            <FadeIn direction="left" delay={0.15}>
              <div className="flex flex-col border-t border-zinc-900 dark:border-zinc-100 pt-6 h-full">
                <span className="text-3xl text-zinc-900 dark:text-zinc-100 mb-6 font-light">02</span>
                <h3 className="h-card text-zinc-900 dark:text-zinc-100 mb-4">
                  Полный цифровой протокол<br className="hidden lg:block"/>
                </h3>
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-[1.65]">
                  В нашем центре мы используем цифровой протокол, который применяется на всех этапах диагностики, профилактики и лечения.
                </p>
              </div>
            </FadeIn>

            {/* 03 — выезжает слева направо */}
            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col border-t border-zinc-900 dark:border-zinc-100 pt-6 h-full">
                <span className="text-3xl text-zinc-900 dark:text-zinc-100 mb-6 font-light">03</span>
                <h3 className="h-card text-zinc-900 dark:text-zinc-100 mb-4">
                  Работа проводится под микроскопом<br className="hidden lg:block"/>
                </h3>
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-[1.65]">
                  Все наши специалисты работают строго с увеличением, потому что врач без микроскопа — это слепой врач.
                </p>
              </div>
            </FadeIn>

            {/* 04 — выезжает справа налево */}
            <FadeIn direction="left" delay={0.15}>
              <div className="flex flex-col border-t border-zinc-900 dark:border-zinc-100 pt-6 h-full">
                <span className="text-3xl text-zinc-900 dark:text-zinc-100 mb-6 font-light">04</span>
                <h3 className="h-card text-zinc-900 dark:text-zinc-100 mb-4">
                  SmileDesign
                </h3>
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-[1.65]">
                  Перед началом лечения вы можете получить мотивационный дизайн вашей будущей улыбки, чтобы увидеть, как вы будете улыбаться после.
                </p>
              </div>
            </FadeIn>

            {/* 05 — выезжает слева направо */}
            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col border-t border-zinc-900 dark:border-zinc-100 pt-6 h-full">
                <span className="text-3xl text-zinc-900 dark:text-zinc-100 mb-6 font-light">05</span>
                <h3 className="h-card text-zinc-900 dark:text-zinc-100 mb-4">
                  Защищенность
                </h3>
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-[1.65]">
                  Мы обеспечиваем максимальный контроль качества в ходе многофакторной стерилизации.
                </p>
              </div>
            </FadeIn>

            {/* CTA — выезжает справа налево */}
            <FadeIn direction="left" delay={0.15}>
              <div className="flex flex-col pt-6 h-full justify-center">
                 <h3 className="h-card text-zinc-900 dark:text-zinc-100 mb-8 group relative cursor-default">
                   Обсудим проблему,<br/>подберём специалиста,<br/>расскажем, что делать<br/>дальше
                 </h3>
                 <button 
                  onClick={openModal}
                  className="btn-sweep bg-amber-500 hover:bg-amber-400 text-zinc-900 py-3.5 px-6 rounded-[20px] font-medium transition-colors w-max text-base shadow-sm"
                 >
                   Проконсультироваться
                 </button>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}
