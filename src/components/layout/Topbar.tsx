import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { clinic } from '../../data/clinic';

export function Topbar() {
  return (
    <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-2 md:px-3 hidden md:flex flex-col sm:flex-row justify-between items-center gap-2 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 animate-in slide-in-from-top-2 duration-500">
        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
          <MapPin size={14} className="text-zinc-500" />
          {clinic.address.full}
        </span>
        <span className="hidden sm:inline text-zinc-700">|</span>
        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
          <Clock size={14} className="text-zinc-500" />
          {clinic.hours.short}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a href={clinic.phoneHref} className="flex items-center gap-1.5 hover:text-white transition-colors font-medium">
          <Phone size={14} className="text-zinc-500" />
          {clinic.phoneDisplay}
        </a>
        <span className="hidden sm:inline text-zinc-700">|</span>
        <div className="flex items-center gap-3">
          <a href={clinic.social.instagram} aria-label="Instagram" className="hover:text-white transition-colors"><Instagram size={14} /></a>
          <a href={clinic.social.facebook} aria-label="Facebook" className="hover:text-white transition-colors"><Facebook size={14} /></a>
          <a href={clinic.social.whatsapp} aria-label="WhatsApp" className="hover:text-white transition-colors"><MessageCircle size={14} /></a>
          <a href={clinic.social.telegram} aria-label="Telegram" className="hover:text-white transition-colors"><Send size={14} /></a>
        </div>
      </div>
    </div>
  );
}
