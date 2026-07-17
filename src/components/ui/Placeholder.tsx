import React from 'react';
import { cn } from '@/lib/utils';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BlackPlaceholder({ className, label, children, ...props }: PlaceholderProps) {
  return (
    <div 
      className={cn("bg-black flex items-center justify-center overflow-hidden relative", className)} 
      {...props}
    >
      {label && <span className="text-zinc-800 text-xs uppercase tracking-widest pointer-events-none select-none absolute">{label}</span>}
      {children}
    </div>
  );
}
