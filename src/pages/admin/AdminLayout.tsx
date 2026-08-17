import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Inbox, LogOut, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Seo } from '../../components/Seo';

/**
 * Каркас панели администратора: боковое меню слева, содержимое вкладки справа.
 *
 * Первым делом спрашивает сервер, жива ли сессия. Это не защита — защита
 * на сервере, где каждый админ-маршрут за requireAdmin, — а удобство:
 * разлогиненного сразу уводим на форму входа, а не показываем пустые
 * таблицы с ошибками 401.
 */
export function AdminLayout() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch('/api/admin/me')
      .then((r) => {
        if (r.ok) setChecked(true);
        else navigate('/admin', { replace: true });
      })
      .catch(() => navigate('/admin', { replace: true }));
  }, [navigate]);

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
    <div className="min-h-screen flex bg-zinc-100 text-zinc-900">
      <Seo title="Панель администратора" noindex />

      {/* Боковое меню. Не уезжает при прокрутке: sticky + top-0.
          self-start обязателен — иначе flex растянул бы <aside> на всю высоту
          контейнера, а элемент высотой с родителя прилипать не может.
          h-screen задаёт ровно экран, overflow-y-auto страхует на случай,
          когда пунктов станет больше, чем помещается. */}
      <aside className="w-60 shrink-0 self-start sticky top-0 h-screen overflow-y-auto bg-zinc-950 text-white flex flex-col p-4">
        <div className="px-4 py-5">
          <p className="font-semibold text-lg leading-tight">RoyalDent</p>
          <p className="text-xs text-zinc-500 mt-0.5">Панель администратора</p>
        </div>

        <nav className="flex flex-col gap-1.5 mt-2" aria-label="Разделы панели">
          <NavLink to="/admin/leads" className={navItem}>
            <Inbox size={17} /> Заявки
          </NavLink>
          <NavLink to="/admin/doctors" className={navItem}>
            <Stethoscope size={17} /> Врачи
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={logout}
          className="mt-auto flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={17} /> Выйти
        </button>
      </aside>

      {/* Содержимое вкладки */}
      <main className="flex-1 min-w-0 p-6 lg:p-10 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
