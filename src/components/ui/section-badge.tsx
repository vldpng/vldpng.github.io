import React from 'react';
import { cn } from '@/lib/utils';

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Единый маркер секции — пилюля с amber-точкой.
 * По умолчанию оформлен под светлый фон; на тёмных секциях
 * передайте className с подходящими цветами рамки/текста.
 */
export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex self-start items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-4 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300',
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      {children}
    </span>
  );
}
