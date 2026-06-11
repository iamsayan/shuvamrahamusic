import type { Metadata } from 'next';

import GearsListingClient from '@/components/gears-listing-client';
import JsonLd from '@/components/json-ld';
import cockpit from '@/lib/client';
import { GearItem } from '@/types';

export const metadata: Metadata = {
  title: 'My Gears',
  description:
    'Explore the professional guitars, strings, pickups, cables, recording gear, and accessories personally used and recommended by Shuvam Raha.',
  alternates: {
    canonical: '/my-gears',
  },
  openGraph: {
    title: 'My Gears',
    description:
      'Explore the professional guitars, strings, pickups, cables, recording gear, and accessories personally used and recommended by Shuvam Raha.',
    url: '/my-gears',
    type: 'website',
    images: [
      {
        url: 'https://www.shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Electric-Guitar-Strings-2-819x1024.jpg',
        width: 819,
        height: 1024,
        alt: 'Elixir Electric Guitar Strings Nanoweb 10-46 Light',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Gears',
    description:
      'Explore the professional guitars, strings, pickups, cables, recording gear, and accessories personally used and recommended by Shuvam Raha.',
    images: [
      'https://www.shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Electric-Guitar-Strings-2-819x1024.jpg',
    ],
  },
};

export default async function MyGearsPage() {
  let gears: GearItem[] = [];
  try {
    gears = await cockpit.getContentTree<GearItem[]>('gears');
  } catch (error) {
    console.error('Error fetching gears from Cockpit CMS:', error);
  }

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://www.shuvamrahamusic.com/#website',
              url: 'https://www.shuvamrahamusic.com/',
              name: 'Shuvam Raha Music',
              description: 'Easy To Learn & Easy To Play',
              inLanguage: 'en-US',
            },
            {
              '@type': 'BreadcrumbList',
              name: 'Breadcrumbs',
              '@id': 'https://www.shuvamrahamusic.com/my-gears/#breadcrumblist',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.shuvamrahamusic.com/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'My Gears',
                },
              ],
            },
            {
              '@type': 'WebPage',
              '@id': 'https://www.shuvamrahamusic.com/my-gears/#webpage',
              url: 'https://www.shuvamrahamusic.com/my-gears/',
              inLanguage: 'en-US',
              name: 'My Gears - Shuvam Raha Music',
              description:
                'Explore the professional guitars, strings, pickups, cables, recording gear, and accessories personally used and recommended by Shuvam Raha.',
              isPartOf: {
                '@id': 'https://www.shuvamrahamusic.com/#website',
              },
              breadcrumb: {
                '@id':
                  'https://www.shuvamrahamusic.com/my-gears/#breadcrumblist',
              },
              primaryImageOfPage: {
                '@id': 'https://www.shuvamrahamusic.com/my-gears/#thumbnail',
              },
              image: {
                '@id': 'https://www.shuvamrahamusic.com/my-gears/#thumbnail',
              },
            },
            {
              '@type': 'ImageObject',
              '@id': 'https://www.shuvamrahamusic.com/my-gears/#thumbnail',
              url: 'https://www.shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Electric-Guitar-Strings-2-819x1024.jpg',
            },
          ],
        }}
      />
      <GearsListingClient initialItems={gears} />
    </>
  );
}
