import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRICE_ICON_NAMES, PriceIcon } from '../../components/ui/price-icons';
import type { PriceCategory, PriceItem } from '../../data/prices';

interface CategoryRecord extends PriceCategory {
  id: string;
}

const inputCls =
  'w-full rounded-xl bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-500 transition-colors';
// 36 точек, а не 32: пальцем в кнопку меньше 36 попадать неудобно.
const iconBtnCls =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-30 disabled:hover:border-zinc-300 disabled:cursor-not-allowed transition-colors';

/**
 * Одна категория прайса: заголовок с иконкой и порядком, внутри — список
 * позиций. Категория сохраняется целиком, поэтому правки полей и перестановка
 * позиций живут в локальном состоянии до нажатия «Сохранить».
 */
function CategoryEditor({
  category,
  index,
  total,
  onSaved,
  onDeleted,
  onMove,
}: {
  category: CategoryRecord;
  index: number;
  total: number;
  onSaved: (c: CategoryRecord) => void;
  onDeleted: (id: string) => void;
  onMove: (index: number, direction: -1 | 1) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(category.title);
  const [icon, setIcon] = useState(category.icon);
  const [items, setItems] = useState<PriceItem[]>(category.items);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  // Показывать ли «есть несохранённые правки»: сравниваем с тем, что пришло.
  const dirty =
    title !== category.title ||
    icon !== category.icon ||
    JSON.stringify(items) !== JSON.stringify(category.items);

  const setItem = (i: number, patch: Partial<PriceItem>) =>
    setItems((list) => list.map((it, n) => (n === i ? { ...it, ...patch } : it)));

  const moveItem = (i: number, direction: -1 | 1) => {
    const target = i + direction;
    if (target < 0 || target >= items.length) return;
    setItems((list) => {
      const next = [...list];
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
  };

  const save = async () => {
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch(`/api/admin/prices/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, icon, iconSrc: category.iconSrc, items }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error();
      onSaved(json.data);
      setNote({ kind: 'ok', text: 'Сохранено.' });
    } catch {
      setNote({ kind: 'err', text: 'Не удалось сохранить.' });
    } finally {
      setBusy(false);
    }
  };

  const removeCategory = async () => {
    if (!window.confirm(`Удалить категорию «${category.title}» со всеми ценами?`)) return;
    const res = await fetch(`/api/admin/prices/${category.id}`, { method: 'DELETE' });
    if (res.ok) onDeleted(category.id);
  };

  return (
    <article className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      {/* Шапка категории */}
      <div className="flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
          <PriceIcon icon={icon} iconSrc={category.iconSrc} className="w-5 h-5 text-amber-600" />
        </span>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex flex-1 min-w-0 items-center gap-2 text-left"
        >
          {/* Перенос, а не обрезка: на телефоне «Профессиональная гигиена»
              превращалась в «Профессионал…» и категории было не различить. */}
          <span className="font-semibold break-words">{title || 'Без названия'}</span>
          <span className="text-sm text-zinc-400 shrink-0">
            {items.length} поз.
            {dirty && <span className="text-amber-600"> · не сохранено</span>}
          </span>
          <ChevronDown
            size={16}
            className={cn('shrink-0 text-zinc-400 transition-transform', open && 'rotate-180')}
          />
        </button>

        {/* Порядковый номер прячем на телефоне: место нужнее названию,
            а положение категории и так видно по списку. */}
        <span className="hidden sm:inline text-xs text-zinc-400 shrink-0">
          {index + 1}/{total}
        </span>
        <button
          type="button"
          onClick={() => onMove(index, -1)}
          disabled={index === 0}
          aria-label={`Категорию «${title}» выше`}
          className={iconBtnCls}
        >
          <ArrowUp size={15} />
        </button>
        <button
          type="button"
          onClick={() => onMove(index, 1)}
          disabled={index === total - 1}
          aria-label={`Категорию «${title}» ниже`}
          className={iconBtnCls}
        >
          <ArrowDown size={15} />
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-100 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Название категории</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Иконка</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className={inputCls}
                disabled={Boolean(category.iconSrc)}
              >
                {PRICE_ICON_NAMES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {category.iconSrc && (
                <p className="mt-1 text-[11px] text-zinc-400">
                  У категории своя картинка, выбор из списка не применяется.
                </p>
              )}
            </div>
          </div>

          {/* Позиции */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-500">Услуги и цены</span>
              <button
                type="button"
                onClick={() => setItems((l) => [...l, { name: '', price: '' }])}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-300 hover:border-zinc-900 px-3 py-1.5 text-xs font-medium transition-colors"
              >
                <Plus size={13} /> Добавить услугу
              </button>
            </div>

            {items.length === 0 && (
              <p className="py-6 text-center text-sm text-zinc-400">
                В категории пока нет услуг.
              </p>
            )}

            <ul className="space-y-2">
              {/* На телефоне название занимает всю ширину, а цена и кнопки
                  уходят на вторую строку: в один ряд они дают поля по 60
                  точек, куда не помещается ни название услуги, ни «50 – 100 €». */}
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-center gap-2 sm:flex-nowrap rounded-xl bg-zinc-50/60 p-2 sm:bg-transparent sm:p-0"
                >
                  <input
                    value={item.name}
                    onChange={(e) => setItem(i, { name: e.target.value })}
                    placeholder="Название услуги"
                    className={cn(inputCls, 'w-full sm:flex-1 bg-white sm:bg-zinc-50')}
                  />
                  <input
                    value={item.price}
                    onChange={(e) => setItem(i, { price: e.target.value })}
                    placeholder="45 €"
                    className={cn(inputCls, 'flex-1 sm:flex-none sm:w-24 shrink-0 text-center bg-white sm:bg-zinc-50')}
                  />
                  <button
                    type="button"
                    onClick={() => moveItem(i, -1)}
                    disabled={i === 0}
                    aria-label="Услугу выше"
                    className={iconBtnCls}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(i, 1)}
                    disabled={i === items.length - 1}
                    aria-label="Услугу ниже"
                    className={iconBtnCls}
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setItems((l) => l.filter((_, n) => n !== i))}
                    aria-label="Удалить услугу"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-100">
            <button
              type="button"
              onClick={save}
              disabled={busy || !dirty}
              className="rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              {busy ? 'Сохраняем…' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={removeCategory}
              className="flex items-center gap-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <Trash2 size={15} /> Удалить категорию
            </button>
            {note && (
              <span className={cn('text-sm', note.kind === 'ok' ? 'text-green-600' : 'text-red-600')}>
                {note.text}
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/** Вкладка «Цены»: категории с позициями, обе перестановки и добавление. */
export function AdminPricesPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/prices')
      .then((r) => r.json())
      .then((json) => {
        if (json?.success) setCategories(json.data);
        else setError('Не удалось загрузить прайс.');
      })
      .catch(() => setError('Не удалось загрузить прайс.'))
      .finally(() => setLoading(false));
  }, []);

  /** Порядок категорий применяем сразу, при ошибке откатываем. */
  const moveCategory = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= categories.length) return;

    const previous = categories;
    const next = [...categories];
    [next[index], next[target]] = [next[target], next[index]];
    setCategories(next);
    setError(null);

    try {
      const res = await fetch('/api/admin/prices/order', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: next.map((c) => c.id) }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setCategories(previous);
      setError('Не удалось сохранить порядок категорий.');
    }
  };

  const addCategory = async () => {
    const res = await fetch('/api/admin/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Новая категория', icon: 'Stethoscope', items: [] }),
    });
    const json = await res.json();
    if (res.ok && json.success) setCategories((list) => [...list, json.data]);
  };

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Цены</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Категорий: {categories.length} · услуг: {totalItems}. Порядок здесь — порядок на
            странице цен.
          </p>
        </div>
        <button
          type="button"
          onClick={addCategory}
          className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus size={15} /> Добавить категорию
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="text-sm text-zinc-400">Загружаем…</p>}

      <div className="flex flex-col gap-3">
        {categories.map((category, i) => (
          <CategoryEditor
            key={category.id}
            category={category}
            index={i}
            total={categories.length}
            onSaved={(c) => setCategories((list) => list.map((x) => (x.id === c.id ? c : x)))}
            onDeleted={(id) => setCategories((list) => list.filter((x) => x.id !== id))}
            onMove={moveCategory}
          />
        ))}
      </div>
    </div>
  );
}
