import { CockpitClient } from '@/lib/cockpit';

const cockpit = new CockpitClient({
  host: process.env.NEXT_PUBLIC_API_URL!,
  apiKey: process.env.API_KEY!,
  fetchOptions: {
    next: {
      revalidate: process.env.NODE_ENV !== 'production' ? 0 : 604800, // Default to 1 week (604800 seconds)
    },
  },
});

export default cockpit;

export type * from '@/lib/cockpit';
