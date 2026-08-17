import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { Seo } from '../../components/Seo';

/**
 * Вход в панель администратора.
 *
 * Пароль не хранится на клиенте вообще: форма отправляет пару на
 * /api/admin/login, в ответ сервер ставит httpOnly-куку с токеном сессии —
 * прочитать её из JS нельзя, только предъявлять запросами.
 */
export function AdminLoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Уже вошедшего не мучаем формой — сразу в панель.
  useEffect(() => {
    fetch('/api/admin/me')
      .then((r) => {
        if (r.ok) navigate('/admin/leads', { replace: true });
      })
      .catch(() => {});
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login.trim(), password }),
      });
      if (res.status === 429) {
        setError('Слишком много попыток. Подождите минуту.');
        return;
      }
      if (!res.ok) {
        setError('Неверный логин или пароль.');
        return;
      }
      navigate('/admin/leads', { replace: true });
    } catch {
      setError('Сервер недоступен. Попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <Seo title="Вход в панель администратора" noindex />

      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-zinc-900">
            <LockKeyhole size={20} />
          </span>
          <div>
            <h1 className="text-white font-semibold text-lg leading-tight">RoyalDent</h1>
            <p className="text-zinc-400 text-sm">Панель администратора</p>
          </div>
        </div>

        <label htmlFor="admin-login" className="block text-xs font-semibold text-zinc-400 mb-1.5">
          Логин
        </label>
        <input
          id="admin-login"
          type="text"
          autoComplete="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full mb-5 rounded-xl bg-zinc-800 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-500 transition-colors"
        />

        <label htmlFor="admin-password" className="block text-xs font-semibold text-zinc-400 mb-1.5">
          Пароль
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 rounded-xl bg-zinc-800 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-500 transition-colors"
        />

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !login.trim() || !password}
          className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 py-3 text-sm font-semibold transition-colors"
        >
          {submitting ? 'Проверяем…' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
