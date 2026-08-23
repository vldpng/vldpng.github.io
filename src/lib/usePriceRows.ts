import { usePrices } from './usePrices';

/**
 * Ссылка на позицию общего прайса для блока цен на посадочной странице.
 *
 * Страницы не хранят цены у себя, а показывают выбранные позиции каталога:
 * правка через панель администратора видна и на /prices, и здесь, и цены
 * не расходятся между страницами.
 */
export interface PriceRef {
  /** Категория в каталоге. */
  category: string;
  /** Точное название позиции в каталоге. */
  name: string;
  /** Своя подпись, если каталожная слишком длинная для страницы. */
  label?: string;
  /** Пояснение под строкой — мелким серым. */
  note?: string;
  /** Показывать цену как «от N €»: на странице позиция обобщает несколько. */
  from?: boolean;
}

export interface PriceRow extends PriceRef {
  label: string;
  price: string;
}

/**
 * Находит выбранные позиции в каталоге и подставляет актуальные цены.
 *
 * Позиции, которых в каталоге нет, молча выпадают: удалённая через админку
 * услуга не должна ломать страницу пустой строкой без цены.
 */
export function usePriceRows(refs: PriceRef[]): PriceRow[] {
  const categories = usePrices();

  // Прайс приходит с сервера асинхронно, поэтому ищем на каждый рендер,
  // а не один раз при монтировании: до ответа /api/prices здесь статика.
  return refs
    .map((ref) => {
      const item = categories
        .find((cat) => cat.title === ref.category)
        ?.items.find((it) => it.name === ref.name);
      return item ? { ...ref, label: ref.label ?? item.name, price: item.price } : null;
    })
    .filter((row): row is PriceRow => row !== null);
}
