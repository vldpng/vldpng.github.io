import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Inbox, LogOut, Menu, Stethoscope, Tag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Seo } from '../../components/Seo';

const SECTIONS = [
  { to: '/admin/leads', label: 'Заявки', Icon: Inbox },
  { to: '/admin/doctors', label: 'Врачи', Icon: Stethoscope },
  { to: '/admin/prices', label: 'Цены', Icon: Tag },
];

/**
 * Каркас панели администратора: боковое меню и содержимое вкладки.
 *
 * На широком экране меню закреплено слева. На телефоне оно занимало бы
 * 240 из 375 точек, поэтому там превращается в выдвижную панель, а сверху
 * появляется шапка с кнопкой и названием текущего раздела.
 *
 * Первым делом спрашивает сервер, жива ли сессия. Это не защита — защита
 * на сервере, где каждый админ-маршрут за requireAdmin, — а удобство:
 * разлогиненного сразу уводим на форму входа, а не показываем пустые
 * таблицы с ошибками 401.
 */
export function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [checked, setChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Проверка сессии при входе на страницу и дальше по таймеру.
   *
   * Сессия истекает после 10 минут без действий, и без опроса открытая
   * вкладка выглядела бы рабочей: кнопки нажимались бы, а запросы молча
   * возвращали 401. Поэтому раз в минуту спрашиваем сервер и при истечении
   * уводим на форму входа.
   *
   * Опрос идёт через /api/admin/me, который намеренно НЕ продлевает сессию —
   * иначе просто открытая вкладка держала бы вход бесконечно.
   */
  useEffect(() => {
    let alive = true;

    const check = () =>
      fetch('/api/admin/me')
        .then((r) => {
          if (!alive) return;
          if (r.ok) setChecked(true);
          else navigate('/admin', { replace: true });
        })
        .catch(() => {
          if (alive) navigate('/admin', { replace: true });
        });

    void check();
    const timer = setInterval(check, 60_000);
    // Возврат к вкладке — самый вероятный момент, когда сессия уже истекла.
    const onVisible = () => {
      if (document.visibilityState === 'visible') void check();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      alive = false;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [navigate]);

  // Переход по разделу закрывает панель: иначе она осталась бы поверх
  // только что открытой вкладки.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Пока панель открыта — Escape закрывает, страница под ней не прокручивается.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const current = SECTIONS.find((s) => pathname.startsWith(s.to))?.label ?? 'Панель';

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    navigate('/admin', { replace: true });
  };

  const navItem = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
      isActive ? 'bg-amber-500 text-zinc-900' : 'text-zinc-400 hover:text-white hover:bg-white/5',
    );

  if (!checked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Seo title="Панель администратора" noindex />
        <p className="text-zinc-500 text-sm">Проверяем доступ…</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen lg:flex bg-zinc-100 text-zinc-900">
      <Seo title="Панель администратора" noindex />

      {/* Шапка только для телефона: кнопка меню и текущий раздел. */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 bg-zinc-950 text-white px-4 py-3">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню разделов"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>
        <span className="font-semibold truncate">{current}</span>
        <span className="ml-auto text-xs text-zinc-500 shrink-0">RoyalDent</span>
      </header>

      {/* Затемнение под выдвинутой панелью — и способ закрыть её касанием. */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Боковое меню.
          Телефон: выдвижная панель поверх контента, спрятана за левый край.
          Широкий экран: закреплено слева и не уезжает при прокрутке —
          sticky + top-0, а self-start обязателен, иначе flex растянул бы
          <aside> на всю высоту контейнера, и прилипать было бы нечему. */}
      <aside
        className={cn(
          'bg-zinc-950 text-white flex flex-col p-4',
          'fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto transition-transform duration-300',
          menuOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-60 lg:shrink-0 lg:self-start lg:translate-x-0 lg:transition-none',
        )}
      >
        <div className="flex items-start justify-between px-4 py-5">
          <div>
            <p className="font-semibold text-lg leading-tight">RoyalDent</p>
            <p className="text-xs text-zinc-500 mt-0.5">Панель администратора</p>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Закрыть меню"
            className="lg:hidden -mr-2 flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 mt-2" aria-label="Разделы панели">
          {SECTIONS.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={navItem}>
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={logout}
          className="mt-auto flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={17} /> Выйти
        </button>
      </aside>

      {/* Содержимое вкладки. min-w-0 нужен, чтобы широкая таблица внутри
          не растягивала колонку и прокручивалась сама. */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}
