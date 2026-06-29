import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import StorefrontListingClient from '@/components/storefront-listing-client';
import { SCHEMA } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Recommended Gear Storefront',
  description:
    'Browse the ultimate collection of guitars, pedals, amplifiers, strings, and recording equipment personally recommended by instructor Shuvam Raha.',
  alternates: {
    canonical: '/storefront',
  },
  openGraph: {
    title: 'Recommended Gear Storefront',
    description:
      'Browse the ultimate collection of guitars, pedals, amplifiers, strings, and recording equipment personally recommended by instructor Shuvam Raha.',
    url: '/storefront',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recommended Gear Storefront',
    description:
      'Browse the ultimate collection of guitars, pedals, amplifiers, strings, and recording equipment personally recommended by instructor Shuvam Raha.',
  },
};

export default function StorefrontPage() {
  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            SCHEMA.webSite(),
            SCHEMA.breadcrumb('/storefront'),
            SCHEMA.webPage({
              path: '/storefront',
              name: 'Recommended Gear Storefront - Shuvam Raha Music',
              description:
                'Browse the ultimate collection of guitars, pedals, amplifiers, strings, and recording equipment personally recommended by instructor Shuvam Raha.',
            }),
            {
              '@type': 'ItemList',
              name: "Shuvam Raha's Curated Storefront",
              description:
                'Curated list of electric and acoustic guitars, pedals, amps, strings, and recording gear recommended by Shuvam Raha.',
              numberOfItems: 9,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Yamaha Pacifica PAC112V Electric Guitar',
                  url: `${SCHEMA.BASE_URL}/storefront#yamaha-pacifica-112v`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: "Fender Squier Classic Vibe '60s Stratocaster",
                  url: `${SCHEMA.BASE_URL}/storefront#fender-squier-classic-vibe-60s`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Yamaha FS80C Concert Cutaway Acoustic Guitar',
                  url: `${SCHEMA.BASE_URL}/storefront#yamaha-fs80c-acoustic`,
                },
              ],
            },
          ],
        }}
      />
      <PageLayout
        title="Storefront"
        subtitle="Curated collection of guitars, effects, amplifiers, strings, and recording tools personally tested and recommended for students and musicians."
        variant="plain"
      >
        <StorefrontListingClient />
      </PageLayout>
    </>
  );
}
