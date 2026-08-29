/**
 * Перечень публичных страниц — источник правды для sitemap.xml.
 *
 * Раньше карта сайта велась вручную и разошлась с реальностью: в ней были
 * три несуществующих адреса (/services/esthetic, /doctors/4, /doctors/6),
 * а четыре живые страницы услуг и все правовые документы отсутствовали.
 * Теперь список собирается из тех же данных, что и сами страницы.
 */
import { servicesList } from './services';
import { doctorsData } from './doctors';

export interface RouteEntry {
  /** Путь без языкового префикса, начинается со слэша. */
  path: string;
  /** Приоритет для sitemap: 1.0 — главная, 0.3 — правовые документы. */
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const STATIC_ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  { path: '/prices', priority: 0.9, changefreq: 'monthly' },
  { path: '/doctors', priority: 0.8, changefreq: 'monthly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/patients', priority: 0.6, changefreq: 'monthly' },
  { path: '/patients/rules', priority: 0.3, changefreq: 'yearly' },
  { path: '/patients/booking', priority: 0.3, changefreq: 'yearly' },
  { path: '/patients/diagnostics', priority: 0.3, changefreq: 'yearly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/cookies', priority: 0.3, changefreq: 'yearly' },
];

/**
 * Все индексируемые пути одной языковой версии.
 *
 * Ассистенты и администраторы (support: true) личной страницы не имеют —
 * ServicePage и DoctorPage для них показывают заглушку, поэтому в карту
 * они не попадают.
 */
export function getAllRoutes(): RouteEntry[] {
  const services: RouteEntry[] = servicesList.map((s) => ({
    path: `/services/${s.id}`,
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const doctors: RouteEntry[] = doctorsData
    .filter((d) => !d.support)
    .map((d) => ({
      path: `/doctors/${d.slug}`,
      priority: 0.6,
      changefreq: 'monthly',
    }));

  return [...STATIC_ROUTES, ...services, ...doctors];
}
