import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Tailwind-класс пропорции кадра, напр. 'aspect-[4/3]' или 'aspect-[3/4]'. */
  aspectClass?: string;
  className?: string;
}

/**
 * Интерактивный слайдер сравнения «До / После».
 * Перетаскивайте ползунок (мышью или пальцем), чтобы открыть фото «после».
 * Если изображения не заданы — показываются тёмные заглушки.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'До',
  afterLabel = 'После',
  aspectClass = 'aspect-[4/3]',
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const stopDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  };

  const Layer = ({ src, placeholderLabel }: { src?: string; placeholderLabel: string }) =>
    src ? (
      <img src={src} alt={placeholderLabel} className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" draggable={false} />
    ) : (
      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
        <span className="text-zinc-600 text-[11px] uppercase tracking-widest select-none">[Фото {placeholderLabel}]</span>
      </div>
    );

  const badgeClass =
    'absolute top-3 z-30 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white pointer-events-none';

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden rounded-2xl select-none', aspectClass, className)}
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
      role="slider"
      aria-label="Сравнение до и после"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Низ: «после» (видно справа) */}
      <Layer src={afterSrc} placeholderLabel="после" />

      {/* Верх: «до», обрезается до позиции ползунка */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="relative h-full w-full">
          <Layer src={beforeSrc} placeholderLabel="до" />
        </div>
      </div>

      {/* Подписи в углах */}
      <span className={`${badgeClass} left-3`}>{beforeLabel}</span>
      <span className={`${badgeClass} right-3`}>{afterLabel}</span>

      {/* Разделитель + ручка */}
      <div className="absolute top-0 bottom-0 z-20 w-0.5 bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-card text-zinc-700 shadow-md cursor-ew-resize">
          <ChevronsLeftRight size={18} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
