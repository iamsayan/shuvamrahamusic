import { cacheLife, cacheTag } from 'next/cache';

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

export async function getReviews(): Promise<Review[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('reviews');

  const apiKeysString = process.env.SERP_API_KEYS;
  if (!apiKeysString) {
    return [];
  }

  // Split by comma, trim whitespace, and remove any empty strings
  const apiKeys = apiKeysString.split(',').map(k => k.trim()).filter(Boolean);
  if (apiKeys.length === 0) {
    return [];
  }

  let allFetchedReviews: SerpApiReview[] = [];

  for (const apiKey of apiKeys) {
    try {
      const dataId = process.env.SERP_API_DATA_ID;
      const url = `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=${dataId}&api_key=${apiKey}`;

      // 1. Fetch First Page (returns first 8 reviews)
      const res = await fetch(url);
      if (!res.ok) {
        continue; // Try next key on failure (e.g., quota exceeded)
      }
      
      const data = await res.json();
      if (data.error) {
        continue; // Try next key if SerpApi returned an error
      }
      
      allFetchedReviews = Array.isArray(data.reviews) ? data.reviews : [];

      // 2. Paginate to Page 2 if needed to complete 15 reviews
      if (data.serpapi_pagination?.next) {
        const res2 = await fetch(data.serpapi_pagination.next);

        if (res2.ok) {
          const data2 = await res2.json();

          if (data2.reviews && Array.isArray(data2.reviews)) {
            allFetchedReviews = [...allFetchedReviews, ...data2.reviews];
          }
        }
      }

      // Break loop if successful request
      break;
    } catch (error) {
      console.error('Error fetching live GMB reviews from SerpApi:', error);
      // Continue to next key on network error
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
}
