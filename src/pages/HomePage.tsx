import { Hero } from '../components/sections/Hero';
import { MainServices } from '../components/sections/MainServices';
import { PriceCalculator } from '../components/sections/PriceCalculator';
import { Doctors } from '../components/sections/Doctors';
import { About } from '../components/sections/About';
import { Sample } from '../components/sections/Sample';
import { Reviews } from '../components/sections/Reviews';
import { Faq } from '../components/sections/Faq';
import { MapSection } from '../components/sections/MapSection';
import { Seo } from '../components/Seo';

export function HomePage() {
  return (
    <main>
      <Seo
        title="RoyalDent — Стоматология в Юрмале | Имплантация и лечение под микроскопом"
        description="Современная стоматология RoyalDent в Юрмале без боли и страха: имплантация, лечение под микроскопом, эстетика, профессиональная гигиена и отбеливание. Запишитесь на приём."
        path="/"
      />
      <Hero />
      <About />
      <MainServices />
      <PriceCalculator />
      <Doctors />
      <Sample />
      <Reviews />
      <Faq />
      <MapSection />
    </main>
  );
}
