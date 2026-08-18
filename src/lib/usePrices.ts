import { useEffect, useState } from 'react';
import { priceCategories, type PriceCategory } from '../data/prices';

/**
 * Прайс-лист для публичной страницы.
 *
 * Источник — /api/prices (правки из панели администратора видны сразу),
 * но стартуем со статического каталога из data/prices.ts. Это и мгновенный
 * первый кадр, и запасной вариант: на GitHub Pages бэкенда нет, fetch там
 * получает index.html вместо JSON, и страница молча остаётся на статике.
 */
export function usePrices(): PriceCategory[] {
  const [categories, setCategories] = useState<PriceCategory[]>(priceCategories);

  useEffect(() => {
    let alive = true;
    fetch('/api/prices')
      .then((r) => r.json())
      .then((json) => {
        if (alive && json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setCategories(json.data as PriceCategory[]);
        }
      })
      .catch(() => {
        /* статический каталог уже показан */
      });
    return () => {
      alive = false;
    };
  }, []);

  return categories;
}
