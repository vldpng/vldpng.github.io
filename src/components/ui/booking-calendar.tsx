import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function parseISO(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

interface BookingCalendarProps {
  /** Доступные для записи даты в формате YYYY-MM-DD (отсортированы по возрастанию). */
  availableDates: string[];
  value: string | null;
  onSelect: (date: string) => void;
}

export function BookingCalendar({ availableDates, value, onSelect }: BookingCalendarProps) {
  const available = useMemo(() => new Set(availableDates), [availableDates]);

  // Границы навигации по месяцам — от первой до последней доступной даты.
  const { minMonth, maxMonth } = useMemo(() => {
    if (availableDates.length === 0) {
      const m = startOfMonth(new Date());
      return { minMonth: m, maxMonth: m };
    }
    return {
      minMonth: startOfMonth(parseISO(availableDates[0])),
      maxMonth: startOfMonth(parseISO(availableDates[availableDates.length - 1])),
    };
  }, [availableDates]);

  const [view, setView] = useState(() =>
    startOfMonth(
      value ? parseISO(value) : availableDates[0] ? parseISO(availableDates[0]) : new Date(),
    ),
  );

  const year = view.getFullYear();
  const month = view.getMonth();
  const monthLabel = view.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
  const todayISO = toISO(new Date());

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const offset = (firstDay.getDay() + 6) % 7; // понедельник — первый день
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr: (string | null)[] = [];
    for (let i = 0; i < offset; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(toISO(new Date(year, month, d)));
    return arr;
  }, [year, month]);

  const canPrev = startOfMonth(view) > minMonth;
  const canNext = startOfMonth(view) < maxMonth;
  const shift = (delta: number) =>
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));

  return (
    <div>
      {/* Навигация по месяцам */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canPrev}
          aria-label="Предыдущий месяц"
          className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-medium text-zinc-900 dark:text-white capitalize">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={() => shift(1)}
          disabled={!canNext}
          aria-label="Следующий месяц"
          className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Дни недели */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-[11px] uppercase text-zinc-400 py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Сетка дней */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((ds, i) => {
          if (!ds) return <div key={`empty-${i}`} />;
          const isAvailable = available.has(ds);
          const isSelected = ds === value;
          const isToday = ds === todayISO;
          const dayNum = Number(ds.slice(8));
          return (
            <button
              key={ds}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelect(ds)}
              className={cn(
                'relative aspect-square rounded-xl text-sm font-medium flex items-center justify-center transition-colors',
                isSelected
                  ? 'bg-amber-500 text-white'
                  : isAvailable
                    ? 'text-zinc-900 dark:text-white hover:bg-amber-50 dark:hover:bg-amber-500/10'
                    : 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed',
              )}
            >
              {dayNum}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
