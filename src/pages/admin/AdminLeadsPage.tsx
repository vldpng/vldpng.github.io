import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, MessageSquareText, Phone, RefreshCw, Search, X } from 'lucide-react';

interface LeadRow {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  page: string;
  ip: string;
  created_at: string;
}

/** Время заявки показываем в поясе клиники, а не администратора. */
const fmtTime = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Europe/Riga',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const th = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500';
const td = 'px-4 py-3 text-sm text-zinc-800 whitespace-nowrap';

const PER_PAGE = 50;

/** Заявки с форм сайта: страница из БД, свежие сверху, с поиском. */
export function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  // Ввод и то, что реально ушло в запрос: между ними задержка,
  // иначе каждая буква — отдельный поход на сервер.
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // id заявки с раскрытым сообщением (одно за раз — таблица не «разъезжается»).
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(input.trim());
      setPage(1); // иначе поиск открылся бы на несуществующей странице
    }, 300);
    return () => clearTimeout(t);
  }, [input]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PER_PAGE),
      });
      if (query) params.set('q', query);
      const res = await fetch(`/api/admin/leads?${params}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error();
      setLeads(json.data);
      setTotal(json.total);
      setPages(json.pages);
    } catch {
      setError('Не удалось загрузить заявки. Обновите страницу.');
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    void load();
  }, [load]);

  const from = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const to = Math.min(page * PER_PAGE, total);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Заявки</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {query
              ? `Найдено: ${total}`
              : total > 0
                ? `Показаны ${from}–${to} из ${total}`
                : 'Всё, что отправлено через формы сайта'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Имя, телефон, почта"
              aria-label="Поиск по заявкам"
              className="w-full sm:w-56 rounded-xl border border-zinc-300 bg-white pl-9 pr-9 py-2.5 text-sm outline-none focus:border-amber-500 transition-colors"
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput('')}
                aria-label="Очистить поиск"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white px-4 py-2.5 text-sm font-medium transition-colors"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : undefined} /> Обновить
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {/* Телефон: карточками. Таблица шириной 900 точек на экране в 375
          означала бы возню с горизонтальной прокруткой на каждую заявку. */}
      <div className="lg:hidden space-y-3">
        {leads.length === 0 && !loading && (
          <p className="bg-white rounded-2xl border border-zinc-200 px-4 py-10 text-center text-sm text-zinc-400">
            {query
              ? `По запросу «${query}» ничего не найдено.`
              : 'Заявок пока нет. Как только кто-то заполнит форму на сайте — появятся здесь.'}
          </p>
        )}
        {leads.map((lead) => (
          <article key={lead.id} className="bg-white rounded-2xl border border-zinc-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold">
                {[lead.name, lead.surname].filter(Boolean).join(' ') || '—'}
              </p>
              <time className="text-xs text-zinc-400 shrink-0 mt-0.5">
                {fmtTime.format(new Date(lead.created_at))}
              </time>
            </div>

            {/* Ссылки, а не текст: с телефона по заявке сразу звонят. */}
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}
                className="flex items-center gap-2 text-sm font-medium text-amber-700"
              >
                <Phone size={14} /> {lead.phone}
              </a>
              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-2 text-sm text-zinc-600 break-all"
                >
                  <Mail size={14} className="shrink-0" /> {lead.email}
                </a>
              )}
            </div>

            {lead.message && (
              <p className="mt-3 rounded-xl bg-amber-50/60 px-3 py-2 text-sm text-zinc-700 whitespace-pre-wrap">
                {lead.message}
              </p>
            )}

            <p className="mt-3 pt-3 border-t border-zinc-100 text-xs text-zinc-400">
              {[lead.source, lead.page].filter(Boolean).join(' · ')}
              {lead.ip && <span className="font-mono"> · {lead.ip}</span>}
            </p>
          </article>
        ))}
      </div>

      {/* Широкий экран: таблица со всеми колонками сразу. */}
      <div className="hidden lg:block bg-white rounded-2xl border border-zinc-200 overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className={th}>Имя</th>
              <th className={th}>Фамилия</th>
              <th className={th}>Телефон</th>
              <th className={th}>Почта</th>
              <th className={th}>IP-адрес</th>
              <th className={th}>Время</th>
              <th className={th}>
                <span className="sr-only">Сообщение</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {leads.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-zinc-400">
                  {query
                    ? `По запросу «${query}» ничего не найдено.`
                    : 'Заявок пока нет. Как только кто-то заполнит форму на сайте — появятся здесь.'}
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <React.Fragment key={lead.id}>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className={td}>{lead.name || '—'}</td>
                  <td className={td}>{lead.surname || '—'}</td>
                  <td className={td}>
                    <a href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`} className="hover:text-amber-700">
                      {lead.phone}
                    </a>
                  </td>
                  <td className={td}>
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} className="hover:text-amber-700">
                        {lead.email}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className={cnMono}>{lead.ip || '—'}</td>
                  <td className={td}>{fmtTime.format(new Date(lead.created_at))}</td>
                  <td className={td}>
                    {(lead.message || lead.source) && (
                      <button
                        type="button"
                        onClick={() => setOpenId(openId === lead.id ? null : lead.id)}
                        aria-expanded={openId === lead.id}
                        aria-label="Показать сообщение и источник заявки"
                        className="text-zinc-400 hover:text-amber-600 transition-colors"
                      >
                        <MessageSquareText size={16} />
                      </button>
                    )}
                  </td>
                </tr>
                {openId === lead.id && (
                  <tr className="bg-amber-50/50">
                    <td colSpan={7} className="px-4 py-3 text-sm text-zinc-700">
                      {lead.message && (
                        <p className="mb-1 whitespace-pre-wrap">{lead.message}</p>
                      )}
                      <p className="text-xs text-zinc-500">
                        {[lead.source, lead.page].filter(Boolean).join(' · ')}
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Переключение страниц. Прячем на одной странице, чтобы не мозолило
          глаза, пока заявок мало. */}
      {pages > 1 && (
        <nav className="mt-4 flex items-center justify-between gap-4" aria-label="Страницы заявок">
          <span className="text-sm text-zinc-500">
            Страница {page} из {pages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium hover:border-zinc-900 disabled:opacity-40 disabled:hover:border-zinc-300 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={15} /> Назад
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages || loading}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium hover:border-zinc-900 disabled:opacity-40 disabled:hover:border-zinc-300 disabled:cursor-not-allowed transition-colors"
            >
              Вперёд <ChevronRight size={15} />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

/** IP моноширинным — столбец из цифр так читается ровнее. */
const cnMono = `${td} font-mono text-xs`;
