import React, { useEffect } from 'react';
import { FileText, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Seo } from '../components/Seo';
import { PageBanner } from '../components/ui/page-banner';

type ItemType = 'doc' | 'link';

interface PatientItem {
  label: string;
  type: ItemType;
  href: string;
}

interface PatientSection {
  title: string;
  items: PatientItem[];
}

const sections: PatientSection[] = [
  {
    title: 'Правила приёма и распорядка',
    items: [
      { label: 'Правила внутреннего распорядка для пациентов', type: 'link', href: '/patients/rules' },
      { label: 'Правила записи на первичный приём', type: 'link', href: '/patients/booking' },
      { label: 'Правила подготовки к диагностическим исследованиям', type: 'link', href: '/patients/diagnostics' },
    ],
  },
  {
    /* Ссылки ведут на первоисточники, а не на пересказ у нас: закон — на
       likumi.lv (официальный публикатор «Latvijas Vēstnesis»), разъяснение
       прав — на Министерство здравоохранения, контакты — на сайт самой
       инспекции. Адреса вида /ta/id/<номер> всегда открывают действующую
       редакцию, поэтому после очередных поправок ссылка не протухнет.
       Все три источника на латышском — русской версии у них нет. */
    title: 'Правовая информация и нормативные акты',
    items: [
      {
        label: 'Закон ЛР «О правах пациентов» (Pacientu tiesību likums)',
        type: 'link',
        href: 'https://likumi.lv/ta/id/203008',
      },
      {
        label: 'Права и обязанности пациента в сфере охраны здоровья',
        type: 'link',
        href: 'https://www.vm.gov.lv/lv/pacienta-tiesibas-un-pienakumi',
      },
      {
        label: 'Контакты контролирующих организаций (Veselības inspekcija)',
        type: 'link',
        href: 'https://www.vi.gov.lv/lv/jaunums/kontakti',
      },
    ],
  },
];

function renderRow(item: PatientItem, keyId: number) {
  const isPlaceholder = item.href === '#';
  const isInternal = item.href.startsWith('/');
  const Icon = item.type === 'doc' ? FileText : ArrowUpRight;

  const className = cn(
    'group flex items-center gap-4 bg-card dark:bg-zinc-900 rounded-2xl border border-black/[0.04] dark:border-white/[0.06]',
    'px-5 md:px-6 py-4 shadow-[0_4px_20px_rgb(58,58,58,0.03)] transition-all',
    'hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgb(58,58,58,0.07)]',
  );

  const inner = (
    <>
      <span className="w-10 h-10 shrink-0 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <span className="flex-1 text-sm md:text-[15px] font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
        {item.label}
      </span>
      <ChevronRight
        size={18}
        className="shrink-0 text-zinc-300 dark:text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all"
      />
    </>
  );

  if (isInternal) {
    return (
      <Link key={keyId} to={item.href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      key={keyId}
      href={item.href}
      {...(item.type === 'doc' && !isPlaceholder ? { download: true } : {})}
      {...(item.type === 'link' && !isPlaceholder
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
      className={className}
    >
      {inner}
    </a>
  );
}

export function PatientsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 lg:pt-24 min-h-screen pb-20 bg-zinc-50 dark:bg-zinc-950">
      <Seo
        title="Пациентам"
        description="Правила приёма и правовая информация для пациентов клиники RoyalDent в Юрмале: порядок записи, подготовка к исследованиям и нормативные акты."
        path="/patients"
      />

      <PageBanner title="Информация для посетителей клиники RoyalDent" />

      <div className="max-w-7xl mx-auto px-2 md:px-3 mt-10 lg:mt-14">
        <div className="space-y-14">
          {sections.map((section, sIdx) => (
            <section key={sIdx}>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.items.map((item, i) => renderRow(item, i))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
