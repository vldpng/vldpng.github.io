import React, { useEffect } from 'react';
import { Prices } from '../components/sections/Prices';
import { Seo } from '../components/Seo';
import { PageBanner } from '../components/ui/page-banner';

export function PricesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 relative">
      <Seo
        title="Цены на услуги"
        description="Цены на стоматологические услуги в клинике RoyalDent в Юрмале: лечение, имплантация, гигиена, отбеливание, ортодонтия. Прозрачное ценообразование."
        path="/prices"
      />
      <PageBanner title="Цены в клинике RoyalDent" />

      <Prices />
    </main>
  );
}
