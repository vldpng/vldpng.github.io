import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Country {
  iso: string;
  name: string;
  /** Код страны без «+». */
  dial: string;
  flag: string;
  /** Группировка цифр национального номера (сумма = ожидаемое число цифр). */
  groups: number[];
}

// Латвия первой — клиника в Юрмале. Далее соседи и популярные направления.
const COUNTRIES: Country[] = [
  { iso: 'LV', name: 'Латвия', dial: '371', flag: '🇱🇻', groups: [2, 3, 3] },
  { iso: 'LT', name: 'Литва', dial: '370', flag: '🇱🇹', groups: [3, 2, 3] },
  { iso: 'EE', name: 'Эстония', dial: '372', flag: '🇪🇪', groups: [4, 4] },
  { iso: 'RU', name: 'Россия', dial: '7', flag: '🇷🇺', groups: [3, 3, 2, 2] },
  { iso: 'BY', name: 'Беларусь', dial: '375', flag: '🇧🇾', groups: [2, 3, 2, 2] },
  { iso: 'UA', name: 'Украина', dial: '380', flag: '🇺🇦', groups: [2, 3, 2, 2] },
  { iso: 'PL', name: 'Польша', dial: '48', flag: '🇵🇱', groups: [3, 3, 3] },
  { iso: 'DE', name: 'Германия', dial: '49', flag: '🇩🇪', groups: [3, 4, 3] },
  { iso: 'GB', name: 'Великобритания', dial: '44', flag: '🇬🇧', groups: [4, 3, 3] },
  { iso: 'SE', name: 'Швеция', dial: '46', flag: '🇸🇪', groups: [3, 3, 3] },
  { iso: 'FI', name: 'Финляндия', dial: '358', flag: '🇫🇮', groups: [2, 3, 4] },
  { iso: 'NO', name: 'Норвегия', dial: '47', flag: '🇳🇴', groups: [3, 2, 3] },
  { iso: 'DK', name: 'Дания', dial: '45', flag: '🇩🇰', groups: [2, 2, 2, 2] },
  { iso: 'NL', name: 'Нидерланды', dial: '31', flag: '🇳🇱', groups: [3, 3, 3] },
  { iso: 'FR', name: 'Франция', dial: '33', flag: '🇫🇷', groups: [1, 2, 2, 2, 2] },
  { iso: 'ES', name: 'Испания', dial: '34', flag: '🇪🇸', groups: [3, 3, 3] },
  { iso: 'IT', name: 'Италия', dial: '39', flag: '🇮🇹', groups: [3, 3, 4] },
  { iso: 'US', name: 'США / Канада', dial: '1', flag: '🇺🇸', groups: [3, 3, 4] },
  { iso: 'IL', name: 'Израиль', dial: '972', flag: '🇮🇱', groups: [2, 3, 4] },
  { iso: 'GE', name: 'Грузия', dial: '995', flag: '🇬🇪', groups: [3, 2, 2, 2] },
  { iso: 'CZ', name: 'Чехия', dial: '420', flag: '🇨🇿', groups: [3, 3, 3] },
  { iso: 'AT', name: 'Австрия', dial: '43', flag: '🇦🇹', groups: [3, 3, 4] },
  { iso: 'CH', name: 'Швейцария', dial: '41', flag: '🇨🇭', groups: [2, 3, 2, 2] },
];

const DEFAULT_GROUPS = [3, 3, 3, 3];

/** Образец цифр для «призрачного» примера в поле. */
const SAMPLE_DIGITS = '12345678901234';

const natLen = (c: Country) => c.groups.reduce((a, b) => a + b, 0);
const onlyDigits = (s: string) => s.replace(/\D/g, '');

/** Разбивает цифры на группы и склеивает через пробел. */
function formatNational(digits: string, groups: number[]): string {
  const out: string[] = [];
  let i = 0;
  for (const g of groups) {
    if (i >= digits.length) break;
    out.push(digits.slice(i, i + g));
    i += g;
  }
  if (i < digits.length) out.push(digits.slice(i));
  return out.join(' ');
}

interface PhoneFieldProps {
  id?: string;
  /** Цветовая схема: 'dark' — на тёмной панели, 'light' — на светлой/универсальной. */
  tone?: 'dark' | 'light';
  onChange: (value: string, valid: boolean) => void;
}

export function PhoneField({ id, tone = 'light', onChange }: PhoneFieldProps) {
  const [country, setCountry] = useState<Country | null>(COUNTRIES[0]);
  const [dial, setDial] = useState<string>(COUNTRIES[0].dial);
  const [national, setNational] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  const groups = country ? country.groups : DEFAULT_GROUPS;
  const formattedNational = formatNational(national, groups);

  const emit = (d: string, nat: string, c: Country | null) => {
    const grp = c ? c.groups : DEFAULT_GROUPS;
    const full = `+${d}${nat ? ' ' + formatNational(nat, grp) : ' '}`;
    const valid = c ? nat.length === natLen(c) : nat.length >= 6;
    onChange(full, valid);
  };

  // Сообщаем начальное значение родителю один раз при монтировании.
  useEffect(() => {
    emit(dial, national, country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Закрытие выпадающего списка по клику вне компонента.
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleDial = (raw: string) => {
    const d = onlyDigits(raw).slice(0, 4);
    const c = COUNTRIES.find((x) => x.dial === d) ?? null;
    const nat = c ? national.slice(0, natLen(c)) : national;
    setDial(d);
    setCountry(c);
    setNational(nat);
    emit(d, nat, c);
  };

  const handleNational = (raw: string) => {
    let d = onlyDigits(raw);
    if (country) d = d.slice(0, natLen(country));
    setNational(d);
    emit(dial, d, country);
  };

  const pick = (c: Country) => {
    const nat = national.slice(0, natLen(c));
    setCountry(c);
    setDial(c.dial);
    setNational(nat);
    setOpen(false);
    setQuery('');
    emit(c.dial, nat, c);
  };

  // «Призрачный» шаблон-пример: оставшиеся незаполненные позиции (цифрами).
  const template = country
    ? formatNational(SAMPLE_DIGITS.slice(0, natLen(country)), country.groups)
    : '';
  const remaining = template.slice(formattedNational.length);

  const t =
    tone === 'dark'
      ? {
          border: 'border-zinc-700',
          text: 'text-white',
          ghost: 'text-zinc-600',
          muted: 'text-zinc-500',
          drop: 'bg-zinc-900 border-zinc-700',
          item: 'hover:bg-zinc-800 text-zinc-200',
          search: 'bg-zinc-800 text-white placeholder:text-zinc-500',
        }
      : {
          border: 'border-zinc-300 dark:border-zinc-700',
          text: 'text-zinc-900 dark:text-white',
          ghost: 'text-zinc-400 dark:text-zinc-600',
          muted: 'text-zinc-400',
          drop: 'bg-card dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700',
          item: 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200',
          search: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400',
        };

  const q = query.trim().toLowerCase();
  const filtered = COUNTRIES.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.dial.includes(q.replace('+', '')) || c.iso.toLowerCase().includes(q),
  );

  return (
    <div ref={rootRef} className="relative">
      <div className={cn('flex items-center gap-2 border-b transition-colors focus-within:border-amber-500', t.border)}>
        {/* Триггер выбора страны */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn('flex items-center gap-1 py-2 shrink-0', t.text)}
          aria-label="Выбрать страну"
        >
          <span className="text-base leading-none">{country ? country.flag : '🌐'}</span>
          <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180', t.muted)} />
        </button>

        {/* Код страны + номер — единая группа, читается как один телефон */}
        <div className="flex flex-1 items-center gap-1.5 min-w-0">
          {/* Код страны — редактируется вручную */}
          <input
            type="tel"
            inputMode="tel"
            value={`+${dial}`}
            onChange={(e) => handleDial(e.target.value)}
            style={{ width: `${Math.max(2, dial.length + 1)}ch` }}
            className={cn('shrink-0 bg-transparent py-2 text-base focus:outline-none focus-visible:shadow-none', t.text)}
            aria-label="Код страны"
          />

          {/* Национальный номер + призрачный пример */}
          <div className="relative flex-1 min-w-0">
            <div
              aria-hidden="true"
              className={cn('pointer-events-none absolute inset-0 py-2 text-base whitespace-pre overflow-hidden', t.ghost)}
            >
              <span className="invisible">{formattedNational}</span>
              {remaining}
            </div>
            <input
              id={id}
              type="tel"
              inputMode="numeric"
              value={formattedNational}
              onChange={(e) => handleNational(e.target.value)}
              className={cn('relative w-full bg-transparent py-2 text-base focus:outline-none focus-visible:shadow-none', t.text)}
              aria-label="Номер телефона"
            />
          </div>
        </div>
      </div>

      {/* Выпадающий список стран */}
      {open && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-72 max-w-[calc(100vw-3rem)] rounded-xl border shadow-xl overflow-hidden',
            t.drop,
          )}
        >
          <div className={cn('p-2 border-b', t.border)}>
            <div className={cn('flex items-center gap-2 rounded-lg px-2.5 py-1.5', t.search)}>
              <Search size={14} className={t.muted} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск страны"
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  onClick={() => pick(c)}
                  className={cn('flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors', t.item)}
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className={t.muted}>+{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && <li className={cn('px-3 py-3 text-sm', t.muted)}>Ничего не найдено</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
