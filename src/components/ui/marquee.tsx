/**
 * Бегущая лента: горизонтальная строка, которая едет сама и зацикливается.
 *
 * Зацикливание сделано копиями, а не хитрой математикой: дорожка рисуется
 * `repeat` раз подряд и уезжает ровно на ширину одной копии (см. keyframes
 * marquee в index.css). Когда первая копия ушла за левый край, на её месте
 * стоит вторая — стык не виден. Поэтому копий нужно столько, чтобы их суммарной
 * ширины хватило перекрыть экран, иначе в конце цикла появится пустота.
 *
 * Скорость задаётся через --duration на самом компоненте, а не пропом: так
 * соседние строки крутятся с разной скоростью без второй анимации.
 */
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  /** Пустить ленту в обратную сторону. */
  reverse?: boolean;
  /** Останавливать движение, пока курсор внутри — чтобы можно было прочитать. */
  pauseOnHover?: boolean;
  /** Сколько раз продублировать содержимое. */
  repeat?: number;
  /** Секунды на полный проход одной копии. Чем больше, тем медленнее. */
  duration?: number;
  children: ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  duration = 40,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex flex-row overflow-hidden [--gap:1.5rem] [gap:var(--gap)]',
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          // Копии — визуальный повтор одного и того же текста. Для скринридера
          // это дубли, поэтому все, кроме первой, скрыты от него. inert также
          // убирает повторяющиеся ссылки из клавиатурной навигации.
          aria-hidden={i > 0 || undefined}
          inert={i > 0 ? true : undefined}
          // Инлайном, а не классом: перебить длительность из animate-marquee
          // надо на самом элементе, где анимация и применяется.
          style={{ animationDuration: `${duration}s` }}
          className={cn(
            'marquee-track flex shrink-0 flex-row justify-around [gap:var(--gap)] animate-marquee',
            pauseOnHover &&
              'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
