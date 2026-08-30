"use client";

import { useEffect, useState } from 'react';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Marquee } from './marquee';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_PLATFORM_KEY || '';
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID || 'ChIJmW83sRvd7kYRDQZdAt_PQfk';

type ReviewCard = {
  name: string;
  role: string;
  text: string;
  image: string;
  rating?: number;
  authorUri?: string;
  reviewUri?: string;
};

type ReviewsState = {
  reviews: ReviewCard[];
  googleMapsUri?: string;
  live: boolean;
};

export function GoogleReviewsIntegration({ fallbackReviews }: { fallbackReviews: ReviewCard[] }) {
  if (!API_KEY) {
    return <Reviews reviews={fallbackReviews} live={false} />;
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly" language="lv" region="LV">
      <LiveReviewsFetch fallbackReviews={fallbackReviews} />
    </APIProvider>
  );
}

function LiveReviewsFetch({ fallbackReviews }: { fallbackReviews: ReviewCard[] }) {
  const placesLib = useMapsLibrary('places');
  const [state, setState] = useState<ReviewsState | null>(null);

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;
    const place = new placesLib.Place({ id: PLACE_ID });

    void place
      .fetchFields({
        fields: ['displayName', 'reviews', 'rating', 'userRatingCount', 'googleMapsURI'],
      })
      .then(({ place: fetchedPlace }) => {
        if (cancelled) return;

        const fetchedReviews: ReviewCard[] = (fetchedPlace.reviews ?? []).map((review) => ({
          name: review.authorAttribution?.displayName || 'Пользователь Google Maps',
          role: review.relativePublishTimeDescription || 'Отзыв в Google Maps',
          text: review.text || 'Отзыв оставлен без текста',
          image: review.authorAttribution?.photoURI || '/images/icons/placeholder.webp',
          rating: review.rating ?? undefined,
          authorUri: review.authorAttribution?.uri || undefined,
          reviewUri: review.googleMapsURI || undefined,
        }));

        if (fetchedReviews.length === 0) {
          setState({ reviews: fallbackReviews, live: false });
          return;
        }

        // Places возвращает ограниченную подборку, отсортированную по релевантности.
        // Не смешиваем её с локальными отзывами под маркировкой Google Maps.
        setState({
          reviews: fetchedReviews,
          googleMapsUri: fetchedPlace.googleMapsURI || undefined,
          live: true,
        });
      })
      .catch((error: unknown) => {
        console.error('Не удалось загрузить отзывы Google Maps:', error);
        if (!cancelled) setState({ reviews: fallbackReviews, live: false });
      });

    return () => {
      cancelled = true;
    };
  }, [placesLib, fallbackReviews]);

  return (
    <Reviews
      reviews={state?.reviews ?? fallbackReviews}
      live={state?.live ?? false}
      googleMapsUri={state?.googleMapsUri}
      loading={!state}
    />
  );
}

function Reviews({
  reviews,
  live,
  googleMapsUri,
  loading = false,
}: {
  reviews: ReviewCard[];
  live: boolean;
  googleMapsUri?: string;
  loading?: boolean;
}) {
  // Две встречные строки. При нечётном числе отзывов перевес отдаём верхней:
  // Google обычно возвращает пять штук, и нижняя строка не должна остаться одна.
  const half = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.slice(half);

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
          {live ? 'Отзывы Google Maps' : 'Отзывы пациентов'}
        </div>

        <h2 className="h-section text-zinc-900 dark:text-white mt-5">
          {loading ? "Синхронизация..." : "Что говорят пациенты"}
        </h2>
        <p className="mt-4 text-lead text-zinc-500 dark:text-zinc-400">
          {live
            ? 'Google Maps показывает ограниченную подборку отзывов, отсортированную по релевантности.'
            : 'Отзывы пациентов о лечении в нашей клинике.'}
        </p>
        {live && googleMapsUri && (
          <a
            className="mt-3 text-sm font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
            href={googleMapsUri}
            target="_blank"
            rel="noreferrer"
          >
            Смотреть профиль в Google Maps
          </a>
        )}
      </motion.div>

      <div className="relative mt-14 flex w-full flex-col gap-6 overflow-hidden">
        <Marquee pauseOnHover duration={60}>
          {firstRow.map((review, i) => (
            <ReviewTile key={`top-${review.name}-${i}`} review={review} />
          ))}
        </Marquee>

        {secondRow.length > 0 && (
          <Marquee reverse pauseOnHover duration={75}>
            {secondRow.map((review, i) => (
              <ReviewTile key={`bottom-${review.name}-${i}`} review={review} />
            ))}
          </Marquee>
        )}

        {/* Шторки: лента должна утекать за край, а не обрываться. Цвет повторяет
            фон секции, поэтому градиент задан теми же zinc-50/zinc-950. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 sm:w-32" />
      </div>
    </div>
  );
}

/**
 * Карточка отзыва в ленте. В отличие от вертикальных колонок здесь фиксированная
 * ширина и обрезка текста: у бегущей строки все карточки должны быть одной
 * высоты, иначе лента дёргается по вертикали на каждом стыке.
 */
function ReviewTile({ review }: { review: ReviewCard }) {
  const { name, role, text, image, rating = 5, authorUri, reviewUri } = review;

  return (
    <figure className="w-[300px] shrink-0 rounded-[2rem] border border-zinc-200 bg-card p-6 shadow-sm sm:w-[340px] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-xl">
      <div className="flex items-center gap-3">
        <img
          width={40}
          height={40}
          src={image}
          alt={name}
          loading="lazy"
          className="h-10 w-10 shrink-0 rounded-full border border-zinc-200 object-cover dark:border-zinc-800"
        />
        <figcaption className="flex min-w-0 flex-col text-left">
          {authorUri ? (
            <a
              className="truncate font-semibold leading-tight tracking-tight text-zinc-900 hover:underline dark:text-white"
              href={authorUri}
              target="_blank"
              rel="noreferrer"
            >
              {name}
            </a>
          ) : (
            <span className="truncate font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white">
              {name}
            </span>
          )}
          <span className="mt-0.5 truncate text-[13px] tracking-tight text-zinc-500">{role}</span>
        </figcaption>
      </div>

      <div className="mt-4 flex gap-1">
        {[...Array(5)].map((_, starIndex) => (
          <Star
            key={starIndex}
            className={`h-4 w-4 ${
              starIndex < Math.round(rating)
                ? 'fill-amber-500 text-amber-500'
                : 'fill-transparent text-zinc-300 dark:text-zinc-700'
            }`}
          />
        ))}
      </div>

      <blockquote className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
        "{text}"
      </blockquote>

      {reviewUri && (
        <a
          className="mt-4 inline-block text-xs font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
          href={reviewUri}
          target="_blank"
          rel="noreferrer"
        >
          Открыть отзыв в Google Maps
        </a>
      )}
    </figure>
  );
}
