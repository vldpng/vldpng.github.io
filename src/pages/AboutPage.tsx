import React, { useEffect } from 'react';
import { Seo } from '../components/Seo';
import { PageBanner } from '../components/ui/page-banner';
import { AboutApproach } from '../components/sections/AboutApproach';
import { AboutInterior } from '../components/sections/AboutInterior';
import { AboutEquipment } from '../components/sections/AboutEquipment';
import { Partners } from '../components/sections/Partners';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Seo
        title="О нас"
        description="О стоматологической клинике RoyalDent в Юрмале: индивидуальный подход, инновационные технологии, команда экспертов и 15 лет опыта."
        path="/about"
      />

      {/* Banner */}
      <div>
        <div className="max-w-7xl mx-auto px-2 md:px-3 pt-8">
          <PageBanner
            breadcrumb="О нас"
            title="О нас"
            imageUrl="/images/banners/AdobeStock_897174040.jpeg"
            imageAlt="Клиника RoyalDent"
          />
        </div>
      </div>

      <AboutApproach />
      <AboutInterior />
      <AboutEquipment />
      <Partners />
    </main>
  );
}
