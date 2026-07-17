import React from 'react';
import { cn } from '@/lib/utils';

interface MaskIconProps {
  src: string;
  className?: string;
}

/**
 * Renders a monochrome SVG file as a CSS mask so it inherits the current text
 * color (works with hover states and dark mode), unlike a plain <img>.
 */
export function MaskIcon({ src, className }: MaskIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block bg-current', className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
}
