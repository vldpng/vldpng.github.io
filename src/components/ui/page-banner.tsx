import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PageBannerProps {
  /** Крупный заголовок страницы (h1). */
  title: string;
  /** Подпись в хлебных крошках после «Главная» (выводится капсом). */
  breadcrumb: string;
  /** Фото в правой половине баннера. Пусто (или файл не найден) — баннер без фото. */
  imageUrl?: string;
  /** Альтернативный текст фото. */
  imageAlt?: string;
}

export function PageBanner({ title, breadcrumb, imageUrl, imageAlt = '' }: PageBannerProps) {
  // Если файл ещё не положили — прячем блок фото и показываем обычный баннер.
  const [imgError, setImgError] = useState(false);
  const showImage = !!imageUrl && !imgError;

  return (
    <div className="bg-amber-500 dark:bg-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden h-[150px] md:h-[240px] flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/[0.02] dark:border-white/[0.02]">
      {/* Subtle wave watermark */}
      <svg
        className="absolute right-[-10%] top-[-20%] h-[150%] w-auto opacity-20 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFFFFF"
          d="M45.7,-76.4C58,-69.1,66,-53.4,72.7,-38.4C79.4,-23.4,84.9,-9,82.8,4.2C80.8,17.4,71.2,29.3,61.9,40.6C52.6,51.9,43.6,62.6,31.7,70.5C19.8,78.3,5,83.4,-8.4,81.1C-21.8,78.8,-33.7,69,-46.8,60.8C-59.8,52.6,-74.1,45.8,-82.1,33.5C-90,21.1,-91.6,3.3,-86.6,-11.9C-81.5,-27.1,-69.8,-39.7,-57.4,-49C-45,-58.3,-32,-64.3,-18.4,-69.8C-4.8,-75.3,9.3,-80.3,24.1,-80.5C38.9,-80.7,46.1,-75.7,45.7,-76.4Z"
          transform="translate(100 100) scale(1.2)"
        />
      </svg>

      {/* Фото в правой половине баннера */}
      {showImage && (
        <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none">
          <img
            src={imageUrl}
            alt={imageAlt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
          {/* Плавный переход фото в оранжевый фон слева */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-500/35 to-transparent dark:from-zinc-800 dark:via-zinc-800/35" />
        </div>
      )}

      <div className="text-white/80 text-[13px] font-medium tracking-wide relative z-10 flex items-center gap-3 uppercase">
        <Link to="/" className="hover:text-white transition-colors">Главная</Link>
        <span className="w-6 h-[1.5px] bg-white/70"></span>
        <span className="text-white font-semibold">{breadcrumb}</span>
      </div>

      <h1 className="h-display text-white relative z-10 mb-2">{title}</h1>
    </div>
  );
}
