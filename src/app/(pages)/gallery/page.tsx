import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';

import { LuImage, LuMusic, LuVideo, LuArrowRight } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Media Gallery',
  description:
    'Explore Shuvam Raha’s media gallery featuring live concert photos, official audio releases, unboxing videos, and guitar lesson clips.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Media Gallery',
    description:
      'Explore Shuvam Raha’s media gallery featuring live concert photos, official audio releases, unboxing videos, and guitar lesson clips.',
    url: '/gallery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Gallery',
    description:
      'Explore Shuvam Raha’s media gallery featuring live concert photos, official audio releases, unboxing videos, and guitar lesson clips.',
  },
};

const GALLERY_HUBS = [
  {
    title: 'Photo Gallery',
    description: 'Behind the scenes, live stages, studio recordings, and guitar masterclasses.',
    href: '/gallery/photos',
    icon: LuImage,
    btnText: 'Explore Photos',
    bgImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    iconColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
  },
  {
    title: 'Audio Gallery',
    description: 'Stream official releases, indie singles, acoustic covers, and compositions.',
    href: '/gallery/audios',
    icon: LuMusic,
    btnText: 'Stream Music',
    bgImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    iconColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  },
  {
    title: 'Video Gallery',
    description: 'Watch music videos, gear unboxings, playthroughs, and guitar guides.',
    href: '/gallery/videos',
    icon: LuVideo,
    btnText: 'Watch Videos',
    bgImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
    iconColor: 'text-red-400 border-red-500/20 bg-red-500/10',
  },
];

export default function GalleryHubPage() {
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
              '@id': 'https://www.shuvamrahamusic.com/gallery/#breadcrumblist',
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
                  name: 'Gallery',
                },
              ],
            },
            {
              '@type': 'WebPage',
              '@id': 'https://www.shuvamrahamusic.com/gallery/#webpage',
              url: 'https://www.shuvamrahamusic.com/gallery/',
              inLanguage: 'en-US',
              name: 'Media Gallery - Shuvam Raha Music',
              description:
                'Explore Shuvam Raha’s media gallery featuring live concert photos, official audio releases, unboxing videos, and guitar lesson clips.',
              isPartOf: {
                '@id': 'https://www.shuvamrahamusic.com/#website',
              },
              breadcrumb: {
                '@id': 'https://www.shuvamrahamusic.com/gallery/#breadcrumblist',
              },
            },
          ],
        }}
      />
      <PageLayout
        title="Media Gallery"
        subtitle="Step into the creative space. Explore live stage moments, stream custom tracks, or watch tutorial videos and unboxings."
        variant="plain"
        textAlign="center"
      >
        <div className="mx-auto mt-4 grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3">
          {GALLERY_HUBS.map((hub, idx) => {
            const Icon = hub.icon;
            return (
              <Link
                key={idx}
                href={hub.href}
                className={`group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#07070F]/55 p-8 transition-all duration-500 hover:border-white/20 ${hub.glowColor}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                  <Image
                    src={hub.bgImage}
                    alt={hub.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay shadow gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-[#030308]/75 to-[#030308]/30 transition-all duration-500 group-hover:via-[#030308]/65" />
                </div>

                {/* Top Glowing Color Accent Strip */}
                <div
                  className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${hub.gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Card Content Wrapper */}
                <div className="relative z-10 space-y-4 text-left">
                  {/* Circular Icon badge */}
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${hub.iconColor} transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-black text-white sm:text-2xl transition-colors duration-300 group-hover:text-cyan-400">
                      {hub.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                      {hub.description}
                    </p>
                  </div>

                  {/* Button Action Trigger */}
                  <div className="inline-flex items-center gap-2 pt-2 text-xs font-black tracking-widest text-cyan-400 uppercase transition-all duration-300 group-hover:translate-x-1">
                    <span>{hub.btnText}</span>
                    <LuArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </PageLayout>
    </>
  );
}
