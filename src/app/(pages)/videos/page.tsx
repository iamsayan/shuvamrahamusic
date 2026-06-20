import JsonLd from '@/components/json-ld';
import VideosGalleryClient from '@/components/videos-gallery-client';
import { getGalleryData } from '@/lib/data';
import { SCHEMA } from '@/lib/schema';
import { formatSchemaDate } from '@/lib/utils';

export const metadata = {
  title: 'Video Gallery',
  description:
    'Watch official music videos, gear unboxings, tone playthroughs, student results, and premium guitar lessons.',
};

export default async function VideosGalleryPage() {
  const gallery = await getGalleryData().catch((err) => {
    console.error('Failed to fetch gallery videos:', err);
    return null;
  });

  const videos = gallery?.videos || [];

  const pageSchema = SCHEMA.webPage({
    path: '/videos',
    name: 'Video Gallery - Shuvam Raha Music',
    description:
      'Watch official music videos, gear unboxings, tone playthroughs, student results, and premium guitar lessons.',
  });

  const breadcrumbSchema = SCHEMA.breadcrumb('/videos');

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGallery',
    '@id': `${SCHEMA.BASE_URL}/videos/#gallery`,
    url: `${SCHEMA.BASE_URL}/videos/`,
    name: 'Video Gallery',
    description:
      'Watch official music videos, gear unboxings, tone playthroughs, student results, and premium guitar lessons.',
    isPartOf: { '@id': `${SCHEMA.BASE_URL}/videos/#webpage` },
    video: videos.map((v) => {
      const isoDate = formatSchemaDate(v.date);
      return {
        '@type': 'VideoObject',
        name: v.title,
        description: v.description || undefined,
        thumbnailUrl: `https://img.youtube.com/vi/${v.video_id}/maxresdefault.jpg`,
        uploadDate: isoDate,
        embedUrl: `https://www.youtube.com/embed/${v.video_id}`,
      };
    }),
  };

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema, gallerySchema]} />
      <VideosGalleryClient videos={videos} />
    </>
  );
}
