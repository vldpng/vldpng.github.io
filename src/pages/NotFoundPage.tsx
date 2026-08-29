import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '../components/Seo';

/**
 * Страница для несуществующих адресов.
 *
 * Раньше маршрута «*» не было вовсе: по любой опечатке в адресе страница
 * отдавала шапку и подвал с пустотой между ними, а сервер при этом отвечал
 * 200 — для поисковика это «мягкий 404», и такие адреса попадают в индекс.
 * noindex здесь обязателен: HTTP-статус на статике поправить нельзя,
 * поэтому исключаем страницу из индекса на уровне разметки.
 *
 * Текст на английском — так в макете.
 */

/**
 * Фон страницы — точная копия НИЖНЕГО ряда пикселей ролика (цвета сняты
 * пипеткой с кадра). Это не украшение, а способ убрать стык: видео обрезается
 * по-разному на разных экранах, и под ним всегда остаётся полоса фона.
 * Раз фон продолжает последнюю строку кадра тон в тон, границы не видно —
 * ни маска, ни постер-картинка не нужны.
 */
const SCENE_GRADIENT = 'linear-gradient(90deg, #FEDFBE 0%, #FDC9AC 50%, #FCB59C 100%)';

/* Зелёный взят из самой брокколи, чтобы подпись не спорила с персонажем.
   Цвета сцены заданы жёстко и намеренно не переключаются в тёмную тему:
   ролик всегда светлый, и тёмный текст на нём читается в любом режиме. */
const INK = '#33632D';
const BUTTON_BG = '#B6DB90';
const BUTTON_BG_HOVER = '#A6D179';

export function NotFoundPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Пока false — атрибута src нет вовсе, и браузер не качает 1.5 МБ.
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Ленивая загрузка. Ролик — фон первого экрана, поэтому «ленивость» здесь
   * не про прокрутку, а про очерёдность: сначала браузер разбирается с
   * разметкой и шрифтами, и только потом мы отдаём ему видео. Наблюдатель
   * оставлен на случай, если блок окажется ниже сгиба на низком экране.
   */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const start = () => setLoad(true);

    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          // requestIdleCallback есть не везде (Safari) — там просто таймер.
          const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
          idle(start);
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Уважаем системную настройку: при «уменьшить движение» кадр остаётся
  // статичным. Ролик всё равно грузим — иначе персонаж не появится вообще.
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <main className="relative w-full overflow-hidden" style={{ background: SCENE_GRADIENT }}>
      <Seo
        title="Страница не найдена"
        description="Такой страницы на сайте RoyalDent нет. Вернитесь на главную или свяжитесь с клиникой."
        noindex
      />

      <section className="relative flex min-h-svh w-full flex-col overflow-hidden">
        {/* Сцена во всю ширину. Пропорции меняются с экраном, и это не
            косметика, а расчёт: ролик 16:9, а брокколи занимает в кадре
            0.306–0.691 по горизонтали и 0.124–0.885 по вертикали (границы
            сняты по зелёным пикселям, не на глаз).
            При object-cover видна доля кадра aspect / (16/9), центрированная.
            Отсюда пределы: контейнер уже 1.42:1 срежет фигуру по бокам,
            шире 2.36:1 — срежет голову и ноги. Берём с запасом.
            На узком экране обрезаются бока — цифры 404 подрезаются, как
            в макете, а персонаж остаётся крупным. */}
        {/* Ролик тянется от края до края, пока это не выталкивает кнопку за
            пределы экрана. При 2.15:1 высота сцены равна ширине/2.15, поэтому
            на широком или низком экране она съедала всю высоту: на 1920x900
            и на 1280x720 кнопка уходила под сгиб.
            Отсюда предел: сцена не выше, чем «экран минус 230 px» — столько
            занимают заголовок, подпись, кнопка и отступ под ней (замерено).
            До 1440 px включительно ограничение не срабатывает, и ролик идёт
            ровно от края до края. Когда срабатывает — боковые края уводим
            в прозрачность: фон продолжает кадр тон в тон, поэтому границы
            не видно. Персонаж от краёв далеко (запас больше 380 px),
            под растворение он не попадает. */}
        <div className="relative mx-auto w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[2.15/1] lg:max-w-[min(1440px,calc((100svh-230px)*2.15))] lg:[mask-image:linear-gradient(to_right,transparent_0,#000_7%,#000_93%,transparent_100%)]">
          <video
            ref={videoRef}
            src={load ? '/videos/404page.mp4' : undefined}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
            onLoadedData={(e) => {
              setReady(true);
              if (reducedMotion) e.currentTarget.pause();
            }}
          />
        </div>

        {/* Подпись и кнопка — под сценой, на чистом градиенте. */}
        <div className="relative z-10 flex shrink-0 flex-col items-center px-6 pb-14 text-center md:pb-20">
          <h1
            className="font-serif italic font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl"
            style={{ color: INK }}
          >
            Oops, i think we’re lost.
          </h1>

          <p
            className="mt-3 text-base md:text-lg lg:text-xl font-medium"
            style={{ color: INK }}
          >
            Let’s get you back home
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm md:text-base font-semibold uppercase tracking-wide transition-colors active:scale-95"
            style={{ backgroundColor: BUTTON_BG, color: INK }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = BUTTON_BG_HOVER;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = BUTTON_BG;
            }}
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
