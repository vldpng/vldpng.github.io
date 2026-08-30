import React from 'react';
import { Car } from 'lucide-react';
import { clinic } from '../../data/clinic';
import { socialLinks, externalLinkProps } from '../../data/social';
import { MaskIcon } from '../ui/MaskIcon';

export function Topbar() {
  return (
    <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-2 md:px-3 hidden md:flex flex-col sm:flex-row justify-between items-center gap-2 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 animate-in slide-in-from-top-2 duration-500">
        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
          {/* Иконки клиники — чёрные контуры на прозрачном фоне, поэтому идут
              маской: на тёмной полосе они должны быть светлыми, а <img> не
              умеет наследовать цвет текста. */}
          <MaskIcon src="/images/icons/placeholder.webp" className="w-3.5 h-3.5 shrink-0 text-white/55" />
          {clinic.address.full}
        </span>
        <span className="hidden sm:inline text-white/25">|</span>
        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
          <MaskIcon src="/images/icons/timing.webp" className="w-3.5 h-3.5 shrink-0 text-white/55" />
          {clinic.hours.short}
        </span>
        <span className="hidden sm:inline text-white/25">|</span>
        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
          <Car size={14} className="text-white/55" />
          Бесплатная парковка
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a href={clinic.phoneHref} className="flex items-center gap-1.5 hover:text-white transition-colors font-medium">
          <MaskIcon src="/images/icons/phone-call.webp" className="w-3.5 h-3.5 shrink-0 text-white/55" />
          {clinic.phoneDisplay}
        </a>
        <span className="hidden sm:inline text-white/25">|</span>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ src, href, label }) => (
            <a
              key={label}
              href={href}
              {...externalLinkProps}
              aria-label={label}
              className="opacity-90 hover:opacity-100 transition-opacity"
            >
              <img src={src} alt="" width={16} height={16} className="w-4 h-4 rounded-[4px]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
