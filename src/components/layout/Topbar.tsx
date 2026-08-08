import React from 'react';
import { MapPin, Phone, Clock, Car } from 'lucide-react';
import { clinic } from '../../data/clinic';
import { socialLinks, externalLinkProps } from '../../data/social';

export function Topbar() {
  return (
    <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-2 md:px-3 hidden md:flex flex-col sm:flex-row justify-between items-center gap-2 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 animate-in slide-in-from-top-2 duration-500">
        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
          <MapPin size={14} className="text-white/55" />
          {clinic.address.full}
        </span>
        <span className="hidden sm:inline text-white/25">|</span>
        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
          <Clock size={14} className="text-white/55" />
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
          <Phone size={14} className="text-white/55" />
          {clinic.phoneDisplay}
        </a>
        <span className="hidden sm:inline text-white/25">|</span>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ Icon, href, label, filled }) => (
            <a
              key={label}
              href={href}
              {...externalLinkProps}
              aria-label={label}
              className="hover:text-white transition-colors"
            >
              <Icon size={14} className={filled ? 'fill-current' : undefined} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
