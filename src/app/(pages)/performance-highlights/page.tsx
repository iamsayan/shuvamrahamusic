import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import PerformanceHighlightsClient from '@/components/performance-highlights-client';
import cockpit from '@/lib/client';
import { Performance } from '@/types';

export const metadata: Metadata = {
  title: 'Performance Highlights',
  description:
    'Explore the live performance portfolio, interstate touring history, and professional stage metrics of live guitarist and performing musician Shuvam Raha (2024-2026).',
  alternates: {
    canonical: '/performance-highlights',
  },
  openGraph: {
    title: 'Performance Highlights',
    description:
      'Explore the live performance portfolio, interstate touring history, and professional stage metrics of live guitarist and performing musician Shuvam Raha (2024-2026).',
    url: '/performance-highlights',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Highlights',
    description:
      'Explore the live performance portfolio, interstate touring history, and professional stage metrics of live guitarist and performing musician Shuvam Raha (2024-2026).',
  },
};

export default async function PerformanceHighlightsPage() {
  let performances: Performance[] = [];
  try {
    performances = await cockpit.getContentTree<Performance[]>('performances', {
      populate: 1,
    });
  } catch (error) {
    console.error('Error fetching performances from Cockpit CMS:', error);
  }

  if (!performances || performances.length === 0) {
    notFound();
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
                'https://www.shuvamrahamusic.com/performance-highlights/#breadcrumblist',
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
                  name: 'Performance Highlights',
                },
              ],
            },
            {
              '@type': 'WebPage',
              '@id':
                'https://www.shuvamrahamusic.com/performance-highlights/#webpage',
              url: 'https://www.shuvamrahamusic.com/performance-highlights/',
              inLanguage: 'en-US',
              name: 'Performance Highlights - Shuvam Raha Music',
              description:
                'Explore the live performance portfolio, interstate touring history, and professional stage metrics of live guitarist and performing musician Shuvam Raha (2024-2026).',
              isPartOf: {
                '@id': 'https://www.shuvamrahamusic.com/#website',
              },
              breadcrumb: {
                '@id':
                  'https://www.shuvamrahamusic.com/performance-highlights/#breadcrumblist',
              },
            },
          ],
        }}
      />
      <PageLayout
        title="Performance Highlights"
        subtitle="Live Performance Portfolio, Tour History & Professional Stage Metrics Across Events & Festivals."
      >
        <PerformanceHighlightsClient performances={performances} />
      </PageLayout>
    </>
  );
}
