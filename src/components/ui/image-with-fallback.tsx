import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  /** Текст-подпись, если изображение не загрузилось (плейсхолдер). */
  label?: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Изображение с аккуратным фолбэком: если файла нет или он не загрузился,
 * показывается стилизованный плейсхолдер с подписью — без «битых» картинок.
 */
export function ImageWithFallback({
  src,
  alt,
  label,
  className,
  imgClassName,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-zinc-100 dark:bg-zinc-900', className)}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setError(true)}
          className={cn('w-full h-full object-cover', imgClassName)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
          <span className="text-zinc-300 dark:text-zinc-700 text-xs uppercase tracking-[0.2em] font-medium select-none px-4 text-center">
            {label || 'Фото'}
          </span>
        </div>
      )}
    </div>
  );
}
