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
import { ScrollToTopButton } from './components/ui/scroll-to-top-button';
import { CookieBanner } from './components/CookieBanner';

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
const PatientBookingPage = lazy(() =>
  import('./pages/PatientBookingPage').then((m) => ({ default: m.PatientBookingPage })),
);
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const CookiesPage = lazy(() =>
  import('./pages/CookiesPage').then((m) => ({ default: m.CookiesPage })),
);
const AdminLoginPage = lazy(() =>
  import('./pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })),
);
const AdminLayout = lazy(() =>
  import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })),
);
const AdminLeadsPage = lazy(() =>
  import('./pages/admin/AdminLeadsPage').then((m) => ({ default: m.AdminLeadsPage })),
);
const AdminDoctorsPage = lazy(() =>
  import('./pages/admin/AdminDoctorsPage').then((m) => ({ default: m.AdminDoctorsPage })),
);
const AdminPricesPage = lazy(() =>
  import('./pages/admin/AdminPricesPage').then((m) => ({ default: m.AdminPricesPage })),
);

function PageLoader() {
  // 100svh, а не 60vh: при 60vh подвал попадал в первый кадр сразу под
  // спиннером, а после загрузки ленивого чанка страницы улетал вниз —
  // Lighthouse засчитывал это как CLS 0.37 (подвал, сдвиг ~488px).
  // Полноэкранный фолбэк держит подвал за нижней границей вьюпорта,
  // и подмена происходит вне видимой области.
  return (
    <div className="flex min-h-[100svh] items-center justify-center">
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
  // Панель администратора живёт без сайтовой обвязки: шапка, подвал и кнопка
  // «наверх» там только мешали бы. pathname здесь уже без языкового префикса.
  const isAdmin = useLocation().pathname.startsWith('/admin');

  return (
    <ContactModalProvider>
      <div className="min-h-screen font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-100">
        <ScrollToTop />
        {/* Притемнение полосы под часами — только в standalone (см. index.css) */}
        <div className="safe-area-scrim" aria-hidden="true" />
        {!isAdmin && <Topbar />}
        {!isAdmin && (
          <div className="header-sticky sticky top-0 z-50 w-full h-0">
            <Header />
          </div>
        )}
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
            <Route path="/patients/booking" element={<PatientBookingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            {/* Панель администратора: /admin — вход, вкладки — внутри каркаса
                с боковым меню. Доступ проверяет сервер на каждом запросе. */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="leads" element={<AdminLeadsPage />} />
              <Route path="doctors" element={<AdminDoctorsPage />} />
              <Route path="prices" element={<AdminPricesPage />} />
            </Route>
            {/* Должен идти последним: ловит всё, что не совпало выше. */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        {!isAdmin && <Footer />}
        <ContactModal />
        {!isAdmin && <ScrollToTopButton />}
        {/* Баннер только на публичной части: в панели администратора
            рекламных и аналитических тегов нет, спрашивать не о чем. */}
        {!isAdmin && <CookieBanner />}
      </div>
    </ContactModalProvider>
  );
}
