import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import TutorialsListingClient from '@/components/tutorials-listing-client';
import cockpit from '@/lib/client';
import { TutorialItem } from '@/types';

export const metadata: Metadata = {
  title: 'Tutorials & Practice Sheets | Shuvam Raha Music',
  description:
    'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
  alternates: {
    canonical: '/tutorials',
  },
  openGraph: {
    title: 'Tutorials & Practice Sheets | Shuvam Raha Music',
    description:
      'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
    url: '/tutorials',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutorials & Practice Sheets | Shuvam Raha Music',
    description:
      'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
  },
};

export default async function TutorialsPage() {
  let tutorials: TutorialItem[] = [];
  try {
    tutorials = await cockpit.getContentTree<TutorialItem[]>('tutorials');
  } catch (error) {
    console.error('Error fetching tutorials from Cockpit CMS:', error);
  }

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://shuvamrahamusic.com/#website',
              url: 'https://shuvamrahamusic.com/',
              name: 'Shuvam Raha Music',
              description: 'Easy To Learn & Easy To Play',
              inLanguage: 'en-US',
            },
            {
              '@type': 'BreadcrumbList',
              name: 'Breadcrumbs',
              '@id': 'https://shuvamrahamusic.com/tutorials/#breadcrumblist',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://shuvamrahamusic.com/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Tutorials',
                },
              ],
            },
            {
              '@type': 'WebPage',
              '@id': 'https://shuvamrahamusic.com/tutorials/#webpage',
              url: 'https://shuvamrahamusic.com/tutorials/',
              inLanguage: 'en-US',
              name: 'Tutorials & Practice Sheets - Shuvam Raha Music',
              description:
                'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
              isPartOf: {
                '@id': 'https://shuvamrahamusic.com/#website',
              },
              breadcrumb: {
                '@id': 'https://shuvamrahamusic.com/tutorials/#breadcrumblist',
              },
            },
          ],
        }}
      />
      <TutorialsListingClient initialItems={tutorials} />
    </>
  );
}
