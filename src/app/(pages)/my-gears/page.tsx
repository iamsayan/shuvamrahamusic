import type { Metadata } from 'next';

import GearsListingClient from '@/components/gears-listing-client';
import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import cockpit from '@/lib/client';
import { SCHEMA } from '@/lib/schema';
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
            SCHEMA.webSite(),
            SCHEMA.breadcrumb('/my-gears'),
            SCHEMA.webPage({
              path: '/my-gears',
              name: 'My Gears - Shuvam Raha Music',
              description:
                'Explore the professional guitars, strings, pickups, cables, recording gear, and accessories personally used and recommended by Shuvam Raha.',
            }),
            {
              '@type': 'ItemList',
              name: "Shuvam Raha's Gear Collection",
              description:
                'Guitars, strings, pickups, cables, recording gear, and accessories used by Shuvam Raha.',
              numberOfItems: gears.length,
              itemListElement: gears.slice(0, 20).map((gear, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: gear.title,
                url: `${SCHEMA.BASE_URL}/my-gears`,
              })),
            },
            {
              '@type': 'ImageObject',
              '@id': 'https://www.shuvamrahamusic.com/my-gears/#thumbnail',
              url: 'https://www.shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Electric-Guitar-Strings-2-819x1024.jpg',
            },
          ],
        }}
      />
      <PageLayout
        title="My Gears"
        subtitle="I’ve listed all the gear I personally use for my video reels, live performances, studio recordings, and teaching."
        variant="plain"
      >
        <GearsListingClient initialItems={gears} />
      </PageLayout>
    </>
  );
}
