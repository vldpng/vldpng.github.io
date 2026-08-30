import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { onConsentChange, readConsent } from '@/lib/consent';

// Measurement ID is public by design: Google includes it in every page request.
const MEASUREMENT_ID = 'G-J2182LF7X3';
const SCRIPT_ID = 'royaldent-google-analytics';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

let configured = false;
let lastPagePath = '';

function configureAnalytics(): void {
  if (configured) return;

  const w = window as AnalyticsWindow;
  if (typeof w.gtag !== 'function') return;

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  w.gtag('js', new Date());
  // React Router page views are sent below, so the automatic first view is off.
  w.gtag('config', MEASUREMENT_ID, { send_page_view: false });
  configured = true;
}

function sendPageView(): void {
  if (!readConsent()?.analytics) return;

  configureAnalytics();
  const w = window as AnalyticsWindow;
  if (typeof w.gtag !== 'function') return;

  // Deliberately exclude query strings and hashes: they can contain user input.
  const pagePath = window.location.pathname;
  if (lastPagePath === pagePath) return;

  w.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
  });
  lastPagePath = pagePath;
}

/** Loads GA4 only after analytics consent and tracks SPA route changes. */
export function GoogleAnalytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Seo updates document.title in an effect as well; one frame ensures GA gets it.
    const frame = window.requestAnimationFrame(sendPageView);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => onConsentChange(sendPageView), []);

  return null;
}
