import { GoogleReviewsIntegration } from '../ui/google-reviews';
import savedGoogleReviews from '../../data/google-reviews.json';

const googleReviews = savedGoogleReviews;

/**
 * Блок отзывов пациентов с Google Maps.
 * Не путать с компонентом Sample (примеры работ клиники).
 */
export function Reviews() {
  return (
    <section id="reviews" className="overflow-hidden relative scroll-mt-24">
      <GoogleReviewsIntegration fallbackReviews={googleReviews} />
    </section>
  );
}
