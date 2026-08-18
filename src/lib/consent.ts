/**
 * Согласие на cookie-файлы.
 *
 * Выбор посетителя хранится в localStorage и транслируется в Google Consent
 * Mode v2 — механизм, которым сайт сообщает тегам Google, что разрешено.
 * С марта 2024 он обязателен для рекламы на аудиторию из ЕЭЗ: без него
 * Google не наполняет аудитории ремаркетинга и недосчитывает конверсии.
 *
 * Значения по умолчанию («всё запрещено») выставляются в index.html — до
 * загрузки любого тега. Иначе тег успел бы поставить куки раньше, чем
 * человек ответил, и согласие потеряло бы смысл.
 */

export interface ConsentState {
  /** Работа сайта: всегда включены, отключить нельзя. */
  necessary: true;
  /** Обезличенная статистика посещений. */
  analytics: boolean;
  /** Реклама и оценка её эффективности. */
  marketing: boolean;
  /** Когда был сделан выбор — доказательство согласия по GDPR. */
  timestamp: string;
  /** Версия текста: при изменении политики согласие спрашиваем заново. */
  version: number;
}

/** Поднимать при существенном изменении состава cookie или текста политики. */
export const CONSENT_VERSION = 1;

const STORAGE_KEY = 'rd_cookie_consent';

/** Событие для компонентов: выбор изменился (в том числе в другой вкладке). */
const EVENT = 'rd-consent-change';

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    // Устаревшую версию считаем отсутствующей: спросим заново.
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    // Приватный режим или заблокированное хранилище — ведём себя как «выбора нет».
    return null;
  }
}

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * Передаёт выбор в Google Consent Mode. Вызывается и при сохранении, и при
 * загрузке страницы с уже сделанным выбором — теги Google читают последнее
 * состояние, а не только момент нажатия кнопки.
 */
export function syncConsentToGoogle(consent: ConsentState): void {
  const w = window as GtagWindow;
  if (typeof w.gtag !== 'function') return;
  const granted = (v: boolean) => (v ? 'granted' : 'denied');
  w.gtag('consent', 'update', {
    analytics_storage: granted(consent.analytics),
    ad_storage: granted(consent.marketing),
    // Два сигнала из Consent Mode v2: без них реклама в ЕЭЗ работает вслепую.
    ad_user_data: granted(consent.marketing),
    ad_personalization: granted(consent.marketing),
  });
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): ConsentState {
  const consent: ConsentState = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* не смогли сохранить — баннер появится снова, это безопаснее молчания */
  }
  syncConsentToGoogle(consent);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: consent }));
  return consent;
}

export function onConsentChange(handler: () => void): () => void {
  window.addEventListener(EVENT, handler);
  // storage срабатывает в соседних вкладках: выбор должен примениться везде.
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
