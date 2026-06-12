import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import { SCHEMA } from '@/lib/schema';

export const metadata: Metadata = {
  title: {
    template: '%s - Tools - Shuvam Raha Music',
    default: 'Guitar Tools',
  },
  description:
    'Free interactive guitar learning tools — fretboard note trainer and rhythm strumming workshop.',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Fretboard Note Trainer',
            description:
              'Interactive fretboard visualization tool for learning guitar note positions across all strings and frets.',
            url: `${SCHEMA.BASE_URL}/tools/fretboard-trainer`,
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            author: { '@id': `${SCHEMA.BASE_URL}/#person` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Strumming & Rhythm Workshop',
            description:
              'Interactive strumming pattern sequencer with real-time audio playback, chord progressions, and preset rhythm libraries.',
            url: `${SCHEMA.BASE_URL}/tools/rhythm-workshop`,
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            author: { '@id': `${SCHEMA.BASE_URL}/#person` },
          },
        ]}
      />
      {children}
    </>
  );
}
