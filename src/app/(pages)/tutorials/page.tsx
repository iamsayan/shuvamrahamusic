import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import TutorialsListingClient from '@/components/tutorials-listing-client';
import cockpit from '@/lib/client';
import { SCHEMA } from '@/lib/schema';
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
            SCHEMA.webSite(),
            SCHEMA.breadcrumb('/tutorials'),
            SCHEMA.webPage({
              path: '/tutorials',
              name: 'Tutorials & Practice Sheets - Shuvam Raha Music',
              description:
                'Download professional guitar fingering exercises, right-hand plectrum practices, manuscript staves, and jazz chord voicings curated by Shuvam Raha.',
            }),
          ],
        }}
      />
      <PageLayout
        title="Learning Materials"
        subtitle="Download high-quality practice sheets, finger exercises, chord charts, and manuscript layouts to support your guitar lessons."
        variant="plain"
      >
        <TutorialsListingClient initialItems={tutorials} />
      </PageLayout>
    </>
  );
}
