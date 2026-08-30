import { useEffect } from 'react';
import { onConsentChange, readConsent } from '@/lib/consent';

const PLERDY_SCRIPT_ID = 'royaldent-plerdy';
const PLERDY_SITE_HASH = 'eec82b27a376f31e4fd8d6097fa17c28';
const PLERDY_SUID = 80636;

type PlerdyWindow = Window & {
  __plerdyCode?: number;
  _protocol?: string;
  _site_hash_code?: string;
  _suid?: number;
};

let plerdyStarted = false;

function startPlerdy(): void {
  if (plerdyStarted || !readConsent()?.analytics) return;

  const w = window as PlerdyWindow;
  if (w.__plerdyCode) {
    plerdyStarted = true;
    return;
  }

  w.__plerdyCode = 1;
  w._protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
  w._site_hash_code = PLERDY_SITE_HASH;
  w._suid = PLERDY_SUID;

  const script = document.createElement('script');
  script.id = PLERDY_SCRIPT_ID;
  script.dataset.plerdy_code = '1';
  script.async = true;
  script.referrerPolicy = 'strict-origin-when-cross-origin';
  script.src = `https://a.plerdy.com/public/js/click/main.js?v=${Math.random()}`;
  document.head.appendChild(script);
  plerdyStarted = true;
}

/** Loads Plerdy only after analytics consent and never inside /admin. */
export function PlerdyAnalytics() {
  useEffect(() => {
    const applyConsent = () => {
      if (readConsent()?.analytics) {
        startPlerdy();
      } else if (plerdyStarted) {
        // Removing the script cannot undo listeners already installed by it.
        // Reloading with denied consent guarantees that tracking stops now.
        window.location.reload();
      }
    };

    applyConsent();
    return onConsentChange(applyConsent);
  }, []);

  return null;
}
