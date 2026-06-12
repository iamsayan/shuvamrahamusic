import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import PerformanceHighlightsClient from '@/components/performance-highlights-client';
import cockpit from '@/lib/client';
import { SCHEMA } from '@/lib/schema';
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
    console.error('Error fetching performances from database:', error);
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
            SCHEMA.webSite(),
            SCHEMA.breadcrumb('/performance-highlights'),
            SCHEMA.webPage({
              path: '/performance-highlights',
              name: 'Performance Highlights - Shuvam Raha Music',
              description:
                'Explore the live performance portfolio, interstate touring history, and professional stage metrics of live guitarist and performing musician Shuvam Raha (2024-2026).',
            }),
            {
              '@type': 'PerformingGroup',
              name: 'Shuvam Raha',
              url: `${SCHEMA.BASE_URL}/performance-highlights`,
              sameAs: SCHEMA.SAME_AS,
              genre: ['Acoustic', 'Indie', 'Bengali Music', 'Bollywood'],
              description:
                'Live guitarist and performing musician based in Kolkata, India. Performs at concerts, festivals, and private events across states.',
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
