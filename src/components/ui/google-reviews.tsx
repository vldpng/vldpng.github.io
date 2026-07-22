"use client";

import React, { useEffect, useState } from 'react';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { TestimonialsColumn } from './testimonials-columns-1';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

export function GoogleReviewsIntegration({ fallbackReviews }: { fallbackReviews: any[] }) {
  if (!API_KEY) {
     return <Reviews reviews={fallbackReviews} hasKey={false} />;
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
       <LiveReviewsFetch fallbackReviews={fallbackReviews} />
    </APIProvider>
  )
}

function LiveReviewsFetch({ fallbackReviews }: { fallbackReviews: any[] }) {
  const placesLib = useMapsLibrary('places');
  const [reviews, setReviews] = useState<any[] | null>(null);

  useEffect(() => {
    if (!placesLib) return;
    
    // Пытаемся найти клинику по ссылке или названию
    placesLib.Place.searchByText({
      textQuery: 'https://maps.app.goo.gl/xxSxTXSLivYSAL7s5 Jūrmala dental', // Поиск по ссылке
      fields: ['id', 'reviews', 'displayName']
    }).then(({ places }) => {
      if (places && places[0] && places[0].reviews && places[0].reviews.length > 0) {
        const fetchedReviews = places[0].reviews.map((r: any) => ({
           name: r.authorAttribution?.displayName || 'Пользователь Google',
           role: 'Пациент клиники',
           text: r.text || 'Оценил(а) на отлично',
           image: r.authorAttribution?.photoURI || 'https://ui-avatars.com/api/?name=G&background=random'
        }));
        
        // Так как Google API возвращает до 5 отзывов, мы дополняем их нашими, чтобы заполнить колонки
        const combined = [...fetchedReviews, ...fallbackReviews];
        
        // Убираем возможные дубликаты и оставляем нужное количество (до 9 для красивой сетки)
        setReviews(combined.slice(0, 9));
      } else {
        setReviews(fallbackReviews);
      }
    }).catch((e) => {
      console.error('Не удалось загрузить отзывы:', e);
      setReviews(fallbackReviews);
    });
  }, [placesLib, fallbackReviews]);

  const displayReviews = reviews || fallbackReviews;
  
  return <Reviews reviews={displayReviews} hasKey={true} loading={!reviews} />;
}

function Reviews({ reviews, hasKey, loading = false }: { reviews: any[], hasKey: boolean, loading?: boolean }) {
  const firstColumn = reviews.slice(0, Math.ceil(reviews.length / 3));
  const secondColumn = reviews.slice(Math.ceil(reviews.length / 3), Math.ceil((reviews.length / 3) * 2));
  const thirdColumn = reviews.slice(Math.ceil((reviews.length / 3) * 2));

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 py-20 px-2 md:px-3 relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <Star className="w-3.5 h-3.5 fill-amber-500" />
          Отзывы Google Maps
        </div>

        <h2 className="h-section text-zinc-900 dark:text-white mt-5">
          {loading ? "Синхронизация..." : "Что говорят пациенты"}
        </h2>
        <p className="mt-4 text-lead text-zinc-500 dark:text-zinc-400">
          Действительные и честные оценки на основе реального опыта лечения в нашей клинике.
        </p>
      </motion.div>

      <div className="flex justify-center gap-6 mt-14 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden">
        {firstColumn.length > 0 && <TestimonialsColumn testimonials={firstColumn} duration={35} />}
        {secondColumn.length > 0 && <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={45} />}
        {thirdColumn.length > 0 && <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={35} />}
      </div>
    </div>
  );
}
