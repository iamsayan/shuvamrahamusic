import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import TutorialsListingClient from '@/components/tutorials-listing-client';
import cockpit from '@/lib/client';
import { TutorialItem } from '@/types';

export const metadata: Metadata = {
  title: 'Tutorials & Practice Sheets',
  description:
    'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
  alternates: {
    canonical: '/tutorials',
  },
  openGraph: {
    title: 'Tutorials & Practice Sheets',
    description:
      'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
    url: '/tutorials',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutorials & Practice Sheets',
    description:
      'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
  },
};

export default async function TutorialsPage() {
  let tutorials: TutorialItem[] = [];
  try {
    tutorials = await cockpit.listContentItems<TutorialItem[]>('tutorials', {
      sort: {
        title: 1,
        _created: -1,
      },
    });
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
              '@id': 'https://www.shuvamrahamusic.com/#website',
              url: 'https://www.shuvamrahamusic.com/',
              name: 'Shuvam Raha Music',
              description: 'Easy To Learn & Easy To Play',
              inLanguage: 'en-US',
            },
            {
              '@type': 'BreadcrumbList',
              name: 'Breadcrumbs',
              '@id':
                'https://www.shuvamrahamusic.com/tutorials/#breadcrumblist',
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
                  name: 'Tutorials',
                },
              ],
            },
            {
              '@type': 'WebPage',
              '@id': 'https://www.shuvamrahamusic.com/tutorials/#webpage',
              url: 'https://www.shuvamrahamusic.com/tutorials/',
              inLanguage: 'en-US',
              name: 'Tutorials & Practice Sheets - Shuvam Raha Music',
              description:
                'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
              isPartOf: {
                '@id': 'https://www.shuvamrahamusic.com/#website',
              },
              breadcrumb: {
                '@id':
                  'https://www.shuvamrahamusic.com/tutorials/#breadcrumblist',
              },
            },
          ],
        }}
      />
      <TutorialsListingClient initialItems={tutorials} />
    </>
  );
}
