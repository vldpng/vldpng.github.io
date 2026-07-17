"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BlackPlaceholder } from "./Placeholder";
import { Link } from "react-router-dom";
import { useContactModal } from "../../context/ContactModalContext";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc?: string;
  icon?: React.ReactNode;
  linkHref?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  const { openModal } = useContactModal();
  
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Use lg breakpoint for better fit of 6 panels
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "3fr" : "1.2fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "3fr" : "1.2fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-7xl mx-auto px-2 md:px-3 gap-4",
        "grid",
        "h-[800px] lg:h-[600px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop 
          ? { gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr' }
        )
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 text-white shadow-sm",
            "lg:min-w-[80px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          {item.imgSrc ? (
            <img
              src={item.imgSrc}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 scale-110 grayscale"
            />
          ) : (
            <BlackPlaceholder 
              label={`[Фото: ${item.title}]`} 
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 scale-110 grayscale"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <article
            className="absolute inset-0 flex flex-col justify-end gap-2 p-6"
          >
            <h3 className="hidden origin-left rotate-90 text-sm font-medium uppercase tracking-wider text-white/80 opacity-100 transition-all duration-500 ease-out lg:block group-data-[active=true]:opacity-0 whitespace-nowrap">
              {item.title}
            </h3>

            <div className="text-white/90 opacity-0 transition-all duration-500 delay-75 ease-out group-data-[active=true]:opacity-100 mb-2">
              {item.icon}
            </div>

            <h3 className="text-2xl font-bold text-white opacity-0 transition-all duration-500 delay-150 ease-out group-data-[active=true]:opacity-100 whitespace-nowrap">
              {item.title}
            </h3>

            <p className="w-full max-w-sm text-sm text-zinc-300 opacity-0 transition-all duration-500 delay-225 ease-out group-data-[active=true]:opacity-100">
              {item.description}
            </p>

            <div className="opacity-0 transition-all duration-500 delay-300 ease-out group-data-[active=true]:opacity-100 flex gap-3 mt-4">
              <button onClick={(e) => { e.preventDefault(); openModal(); }} className="bg-card text-zinc-900 px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-zinc-200 transition-colors w-max">
                Записаться
              </button>
              {item.linkHref ? (
                <Link to={item.linkHref} className="bg-zinc-800/80 backdrop-blur text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-zinc-700 transition-colors w-max border border-zinc-700">
                  Подробнее
                </Link>
              ) : (
                <button className="bg-zinc-800/80 backdrop-blur text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-zinc-700 transition-colors w-max border border-zinc-700">
                  Подробнее
                </button>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
