import { cacheLife, cacheTag } from 'next/cache';
import { cache } from 'react';

export interface SerpApiReview {
  user?: {
    name?: string;
    thumbnail?: string;
  };
  rating?: number;
  date?: string;
  snippet?: string;
  text?: string;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  review: string;
  profileImage: string;
}

export const getReviews = cache(async (): Promise<Review[]> => {
  'use cache';
  cacheLife('weeks');
  cacheTag('reviews');

  const apiKey = process.env.SERP_API_KEY;
  if (!apiKey) {
    return [];
  }

  try {
    const dataId = process.env.SERP_API_DATA_ID;
    const url = `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=${dataId}&api_key=${apiKey}`;

    // 1. Fetch First Page (returns first 8 reviews)
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    let allFetchedReviews = Array.isArray(data.reviews) ? data.reviews : [];

    // 2. Paginate to Page 2 if needed to complete 15 reviews
    if (data.serpapi_pagination?.next) {
      const res2 = await fetch(data.serpapi_pagination.next, {
        signal: AbortSignal.timeout(5000),
      });

      if (res2.ok) {
        const data2 = await res2.json();

        if (data2.reviews && Array.isArray(data2.reviews)) {
          allFetchedReviews = [...allFetchedReviews, ...data2.reviews];
        }
      }
    }

    if (allFetchedReviews.length > 0) {
      const fiveStarReviews = allFetchedReviews.filter(
        (r: SerpApiReview) => (r.rating || 5) === 5
      );

      const merged = fiveStarReviews.map((r: SerpApiReview) => ({
        author: r.user?.name || 'Google User',
        rating: r.rating || 5,
        date: r.date || 'recently',
        review: r.snippet || r.text || '',
        profileImage:
          r.user?.thumbnail ||
          'https://lh3.googleusercontent.com/a/default-user=w36-h36',
      }));

      return merged;
    }

    return [];
  } catch (error) {
    console.error('Error fetching live GMB reviews from SerpApi:', error);
    return [];
  }
});
