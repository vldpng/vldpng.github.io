import React from 'react';
import { type PriceRow } from '@/lib/usePriceRows';

/**
 * Список цен с отточием — блок «Цены на …» на посадочных страницах услуг.
 *
 * Название и цена разнесены по краям, между ними — растущий пунктир.
 * Название сжимается и переносится по словам, а пунктир схлопывается
 * до нуля: иначе на узком экране длинная строка выталкивала бы цену
 * за границу блока.
 */
export function PriceList({ rows }: { rows: PriceRow[] }) {
  return (
    <ul className="space-y-5">
      {rows.map((row) => (
        <li key={`${row.category}-${row.name}`}>
          <div className="flex items-baseline gap-2">
            <span className="text-body text-zinc-700 dark:text-zinc-200 min-w-0">{row.label}</span>
            {/* baseline держит точки на одной линии с текстом. */}
            <span
              className="flex-1 border-b border-dotted border-zinc-300 dark:border-zinc-700 translate-y-[-0.25rem]"
              aria-hidden="true"
            />
            <span className="text-body font-medium text-zinc-900 dark:text-zinc-50 shrink-0 whitespace-nowrap">
              {row.from ? `от ${row.price}` : row.price}
            </span>
          </div>
          {row.note && (
            <p className="text-xs italic text-zinc-400 dark:text-zinc-500 mt-1 pr-16">{row.note}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
