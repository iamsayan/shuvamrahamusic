import AudiosGalleryClient from '@/components/audios-gallery-client';
import JsonLd from '@/components/json-ld';
import { SCHEMA } from '@/lib/schema';

export const metadata = {
  title: 'Audio Gallery',
  description:
    'Explore and stream Shuvam Raha’s official audio releases, acoustic Bengali singles, instrumental covers, and compositions.',
};

export default async function AudiosGalleryPage() {
  const pageSchema = SCHEMA.webPage({
    path: '/audios',
    name: 'Audio Gallery - Shuvam Raha Music',
    description:
      'Explore and stream Shuvam Raha’s official audio releases, acoustic Bengali singles, instrumental covers, and compositions.',
  });

  const breadcrumbSchema = SCHEMA.breadcrumb('/audios');

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <AudiosGalleryClient />
    </>
  );
}
