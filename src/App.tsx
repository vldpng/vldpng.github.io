/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Topbar } from './components/layout/Topbar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ContactModalProvider } from './context/ContactModalContext';
import { ContactModal } from './components/modals/ContactModal';
import { BookingModalProvider } from './context/BookingModalContext';
import { BookingModal } from './components/modals/BookingModal';
import { ScrollToTopButton } from './components/ui/scroll-to-top-button';

// Каждая страница загружается отдельным чанком — только при переходе на неё,
// а не в момент первой загрузки сайта.
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServicePage = lazy(() => import('./pages/ServicePage').then((m) => ({ default: m.ServicePage })));
const DoctorPage = lazy(() => import('./pages/DoctorPage').then((m) => ({ default: m.DoctorPage })));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage').then((m) => ({ default: m.DoctorsPage })));
const PricesPage = lazy(() => import('./pages/PricesPage').then((m) => ({ default: m.PricesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const PatientsPage = lazy(() => import('./pages/PatientsPage').then((m) => ({ default: m.PatientsPage })));
const PatientRulesPage = lazy(() =>
  import('./pages/PatientRulesPage').then((m) => ({ default: m.PatientRulesPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span
        className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-amber-500 dark:border-zinc-800 dark:border-t-amber-400"
        role="status"
        aria-label="Загрузка"
      />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Slight delay to ensure elements are rendered
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ContactModalProvider>
      <BookingModalProvider>
      <div className="min-h-screen font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-100">
        <ScrollToTop />
        <Topbar />
        <div className="sticky top-0 z-50 w-full h-0">
          <Header />
        </div>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServicePage />} />
            <Route path="/doctors/:id" element={<DoctorPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patients/rules" element={<PatientRulesPage />} />
          </Routes>
        </Suspense>
        <Footer />
        <ContactModal />
        <BookingModal />
        <ScrollToTopButton />
      </div>
      </BookingModalProvider>
    </ContactModalProvider>
  );
}
