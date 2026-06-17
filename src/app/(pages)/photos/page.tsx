import JsonLd from '@/components/json-ld';
import PhotosGalleryClient from '@/components/photos-gallery-client';
import cockpit from '@/lib/client';
import { getGalleryData } from '@/lib/data';
import { SCHEMA } from '@/lib/schema';

export const metadata = {
  title: 'Photo Gallery',
  description:
    'Behind the scenes, live stages, studio recordings, and music class moments with certified guitar instructor Shuvam Raha.',
};

export default async function PhotosGalleryPage() {
  const gallery = await getGalleryData().catch((err) => {
    console.error('Failed to fetch gallery photos:', err);
    return null;
  });

  const images = gallery?.images || [];

  const pageSchema = SCHEMA.webPage({
    path: '/photos',
    name: 'Photo Gallery - Shuvam Raha Music',
    description:
      'Behind the scenes, live stages, studio recordings, and music class moments with certified guitar instructor Shuvam Raha.',
  });

  const breadcrumbSchema = SCHEMA.breadcrumb('/photos');

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${SCHEMA.BASE_URL}/photos/#gallery`,
    url: `${SCHEMA.BASE_URL}/photos/`,
    name: 'Photo Gallery',
    description:
      'Behind the scenes, live stages, studio recordings, and music class moments with certified guitar instructor Shuvam Raha.',
    isPartOf: { '@id': `${SCHEMA.BASE_URL}/photos/#webpage` },
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      name: img.title,
      description: img.description || undefined,
      contentUrl: img.image ? cockpit.getImageUrl(img.image._id) : undefined,
      thumbnailUrl: img.image
        ? cockpit.getImageUrl(img.image._id, { w: 300, h: 200 })
        : undefined,
      dateCreated: img.date || undefined,
      contentLocation: img.location || undefined,
    })),
  };

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema, gallerySchema]} />
      <PhotosGalleryClient images={images} />
    </>
  );
}
