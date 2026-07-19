import React, { useEffect } from 'react';
import { ServiceCards } from '../components/sections/ServiceCards';
import { Seo } from '../components/Seo';
import { PageBanner } from '../components/ui/page-banner';

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Seo
        title="Услуги"
        description="Стоматологические услуги клиники RoyalDent в Юрмале: эстетическая стоматология, имплантация, лечение под микроскопом, профессиональная гигиена, отбеливание и элайнеры."
        path="/services"
      />

      {/* Banner */}
      <div className="max-w-7xl mx-auto px-2 md:px-3 pt-8">
        <PageBanner breadcrumb="Услуги" title="Услуги" />
      </div>

      <ServiceCards />
    </main>
  );
}
