import JsonLd from '@/components/json-ld';
import VideosGalleryClient from '@/components/videos-gallery-client';
import cockpit from '@/lib/client';
import { SCHEMA } from '@/lib/schema';
import type { GalleryData } from '@/types';

export const metadata = {
  title: 'Video Gallery | Shuvam Raha',
  description:
    'Watch official music videos, gear unboxings, tone playthroughs, student results, and premium guitar lessons.',
};

export default async function VideosGalleryPage() {
  const gallery = await cockpit
    .getContentItemByFilter<GalleryData>('gallery', {
      populate: 1,
    })
    .catch((err) => {
      console.error('Failed to fetch gallery videos:', err);
      return null;
    });

  const videos = gallery?.videos || [];

  const pageSchema = SCHEMA.webPage({
    path: '/gallery/videos',
    name: 'Video Gallery | Shuvam Raha',
    description:
      'Watch official music videos, gear unboxings, tone playthroughs, student results, and premium guitar lessons.',
  });

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGallery',
    '@id': `${SCHEMA.BASE_URL}/gallery/videos/#gallery`,
    url: `${SCHEMA.BASE_URL}/gallery/videos/`,
    name: 'Video Gallery',
    description:
      'Watch official music videos, gear unboxings, tone playthroughs, student results, and premium guitar lessons.',
    isPartOf: { '@id': `${SCHEMA.BASE_URL}/gallery/videos/#webpage` },
    video: videos.map((v) => ({
      '@type': 'VideoObject',
      name: v.title,
      description: v.description || undefined,
      thumbnailUrl: `https://img.youtube.com/vi/${v.video_id}/maxresdefault.jpg`,
      uploadDate: v.date || undefined,
      embedUrl: `https://www.youtube.com/embed/${v.video_id}`,
    })),
  };

  return (
    <>
      <JsonLd schema={[pageSchema, gallerySchema]} />
      <VideosGalleryClient videos={videos} />
    </>
  );
}
