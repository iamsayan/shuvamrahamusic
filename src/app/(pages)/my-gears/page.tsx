import type { Metadata } from 'next';

import GearsListingClient from '@/components/gears-listing-client';
import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import cockpit from '@/lib/client';
import { SCHEMA } from '@/lib/schema';
import { GearItem } from '@/types';

export async function generateMetadata(): Promise<Metadata> {
  const gears = await cockpit.getContentTree<GearItem[]>('gears', {
    fields: {
      images: true,
    },
  });

  const images = new Map();
  gears.forEach((gear) => {
    gear.images.forEach((image) => {
      images.set(image._id, image.altText);
    });
  });

  return {
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
      images: Array.from(images.entries()).map(
        ([img_id, altText]: [string, string]) => ({
          url: cockpit.getImagePresetUrl(img_id, 'medium'),
          width: 819,
          height: 1024,
          alt: altText,
        })
      ),
    },
    twitter: {
      card: 'summary_large_image',
      title: 'My Gears',
      description:
        'Explore the professional guitars, strings, pickups, cables, recording gear, and accessories personally used and recommended by Shuvam Raha.',
      images: Array.from(images.keys()).map((img_id: string) =>
        cockpit.getImagePresetUrl(img_id, 'medium')
      ),
    },
  };
}

export default async function MyGearsPage() {
  let gears: GearItem[] = [];
  try {
    gears = await cockpit.getContentTree<GearItem[]>('gears');
  } catch (error) {
    console.error('Error fetching gears from database:', error);
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
                url: `${SCHEMA.BASE_URL}/my-gears#gear-item-${index + 1}`,
              })),
            },
            ...gears
              .filter((gear) => gear.images && gear.images.length > 0)
              .map((gear) => ({
                '@type': 'ImageObject',
                '@id': `${SCHEMA.BASE_URL}/my-gears/#thumbnail-${gear._id}`,
                url: cockpit.getImagePresetUrl(gear.images[0]._id, 'medium'),
                caption: gear.title,
              })),
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
