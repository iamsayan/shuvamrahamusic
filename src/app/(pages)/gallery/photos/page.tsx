import cockpit from '@/lib/client';
import type { GalleryData } from '@/types';
import PhotosGalleryClient from '@/components/photos-gallery-client';
import JsonLd from '@/components/json-ld';
import { SCHEMA } from '@/lib/schema';

export const metadata = {
  title: 'Photo Gallery | Shuvam Raha',
  description: 'Behind the scenes, live stages, studio recordings, and music class moments with certified guitar instructor Shuvam Raha.',
};

export default async function PhotosGalleryPage() {
  const gallery = await cockpit.getContentItemByFilter<GalleryData>('gallery', {
    populate: 1,
  }).catch((err) => {
    console.error('Failed to fetch gallery photos:', err);
    return null;
  });

  const images = gallery?.images || [];

  const pageSchema = SCHEMA.webPage({
    path: '/gallery/photos',
    name: 'Photo Gallery | Shuvam Raha',
    description: 'Behind the scenes, live stages, studio recordings, and music class moments with certified guitar instructor Shuvam Raha.',
  });

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${SCHEMA.BASE_URL}/gallery/photos/#gallery`,
    url: `${SCHEMA.BASE_URL}/gallery/photos/`,
    name: 'Photo Gallery',
    description: 'Behind the scenes, live stages, studio recordings, and music class moments with certified guitar instructor Shuvam Raha.',
    isPartOf: { '@id': `${SCHEMA.BASE_URL}/gallery/photos/#webpage` },
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      name: img.title,
      description: img.description || undefined,
      contentUrl: img.image ? cockpit.getImageUrl(img.image._id) : undefined,
      thumbnailUrl: img.image ? cockpit.getImageUrl(img.image._id, { w: 300, h: 200 }) : undefined,
      dateCreated: img.date || undefined,
      contentLocation: img.location || undefined,
    })),
  };

  return (
    <>
      <JsonLd schema={[pageSchema, gallerySchema]} />
      <PhotosGalleryClient images={images} />
    </>
  );
}
