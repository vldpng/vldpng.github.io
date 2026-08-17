import React, { useEffect } from 'react';
import { Seo } from '../components/Seo';
import { PageBanner } from '../components/ui/page-banner';
import { AboutApproach } from '../components/sections/AboutApproach';
import { AboutInterior } from '../components/sections/AboutInterior';
import { TreatmentProcess } from '../components/sections/TreatmentProcess';
import { Doctors } from '../components/sections/Doctors';
import { Faq, aboutFaqs } from '../components/sections/Faq';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Seo
        title="О клинике"
        description="О стоматологической клинике RoyalDent в Юрмале: индивидуальный подход, инновационные технологии, команда экспертов и 15 лет опыта."
        path="/about"
      />

      <PageBanner title="Больше о клинике RoyalDent" />

      {/* Порядок: сначала показываем клинику, затем объясняем процесс лечения,
          и только после этого — подход и команда. */}
      <AboutInterior />
      <TreatmentProcess />
      <AboutApproach />
      <Doctors />
      {/* Свой набор вопросов и свой якорь: на главной уже есть #faq */}
      <Faq items={aboutFaqs} id="about-faq" />
    </main>
  );
}
