'use client';

import { useState } from 'react';

import Image from 'next/image';

import PageLayout from '@/components/page-layout';

import {
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuMapPin,
  LuX,
} from 'react-icons/lu';

interface PhotoItem {
  id: string;
  title: string;
  category: 'Live Concerts' | 'Studio Sessions' | 'Music Classes';
  imageUrl: string;
  date: string;
  location: string;
  description: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 'live-kolkata-music-fest',
    title: 'Live at Kolkata Music Fest',
    category: 'Live Concerts',
    imageUrl:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
    date: 'February 2024',
    location: 'Nazrul Mancha, Kolkata',
    description:
      'Headline set performing original acoustic compositions to a crowd of 2,000+ music enthusiasts.',
  },
  {
    id: 'recording-phirti-pothe',
    title: "Recording 'Phirti Pothe'",
    category: 'Studio Sessions',
    imageUrl:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    date: 'November 2023',
    location: 'Saha Records Studio, Kolkata',
    description:
      'Tracking acoustic guitars and vocals for the single release using professional tube condenser microphones.',
  },
  {
    id: 'interactive-guitar-class',
    title: '1-on-1 Guitar Mentorship',
    category: 'Music Classes',
    imageUrl:
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop',
    date: 'Ongoing',
    location: 'Online / Kolkata Studio',
    description:
      'Providing personalized feedback on posture, chord transitions, and fingerstyle techniques.',
  },
  {
    id: 'rehearsal-session',
    title: 'Pre-Show Rehearsal Room',
    category: 'Live Concerts',
    imageUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    date: 'January 2024',
    location: 'Jam Room, South Kolkata',
    description:
      'Perfecting lead guitar solos and dynamic cues with the live band before the winter tour.',
  },
  {
    id: 'mixing-console',
    title: 'Music Production & Mixing',
    category: 'Studio Sessions',
    imageUrl:
      'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1200&auto=format&fit=crop',
    date: 'December 2023',
    location: 'Home Studio, Kolkata',
    description:
      'Arranging and mixing modern backing tracks for students using advanced Digital Audio Workstations.',
  },
  {
    id: 'group-masterclass',
    title: 'Acoustic Guitar Masterclass',
    category: 'Music Classes',
    imageUrl:
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop',
    date: 'September 2023',
    location: 'Kolkata Studio',
    description:
      'Group session explaining the fundamentals of scale progression and rhythmic timing control.',
  },
];

export default function PhotosGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === 'All'
      ? PHOTOS
      : PHOTOS.filter((photo) => photo.category === selectedCategory);

  const categories = [
    'All',
    'Live Concerts',
    'Studio Sessions',
    'Music Classes',
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? filteredPhotos.length - 1 : lightboxIndex - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === filteredPhotos.length - 1 ? 0 : lightboxIndex + 1
    );
  };

  return (
    <PageLayout
      title="Photo Gallery"
      subtitle="Behind the scenes, live stages, studio recordings, and music class moments with certified guitar instructor Shuvam Raha."
      variant="plain"
      textAlign="center"
    >
      <div className="space-y-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'border border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.01] p-4 transition-all duration-500 hover:border-cyan-500/20 hover:bg-white/[0.02]"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/60 to-transparent" />
                <span className="absolute top-3 right-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[8px] font-bold tracking-widest text-cyan-400 uppercase backdrop-blur-md">
                  {photo.category}
                </span>
              </div>

              {/* Text Info */}
              <div className="mt-4 space-y-2">
                <h3 className="font-heading text-sm font-extrabold text-white transition-colors group-hover:text-cyan-400">
                  {photo.title}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
                  {photo.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-[9px] font-bold text-gray-500 uppercase">
                  <span className="flex items-center gap-1">
                    <LuCalendar className="h-3 w-3" />
                    {photo.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <LuMapPin className="h-3 w-3" />
                    {photo.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null &&
          (() => {
            const currentPhoto = filteredPhotos[lightboxIndex];
            return (
              <div
                onClick={() => setLightboxIndex(null)}
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
                  aria-label="Close lightbox"
                >
                  <LuX className="h-5 w-5" />
                </button>

                {/* Lightbox Content Container */}
                <div className="relative flex max-h-[85vh] w-full max-w-[1000px] flex-col items-center justify-center gap-4">
                  {/* Navigation: Prev */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition-colors hover:bg-white/10 sm:left-4"
                    aria-label="Previous photo"
                  >
                    <LuChevronLeft className="h-5 w-5" />
                  </button>

                  {/* Main Image */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
                    <Image
                      src={currentPhoto.imageUrl}
                      alt={currentPhoto.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Navigation: Next */}
                  <button
                    onClick={handleNext}
                    className="absolute right-2 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition-colors hover:bg-white/10 sm:right-4"
                    aria-label="Next photo"
                  >
                    <LuChevronRight className="h-5 w-5" />
                  </button>

                  {/* Photo Description overlay/bottom text */}
                  <div
                    className="w-full max-w-[800px] space-y-1 pt-2 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                      {currentPhoto.category}
                    </span>
                    <h4 className="font-heading text-base font-extrabold text-white sm:text-lg">
                      {currentPhoto.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {currentPhoto.description}
                    </p>
                    <div className="flex justify-center gap-4 text-[9px] font-bold text-gray-500 uppercase">
                      <span>{currentPhoto.date}</span>
                      <span>•</span>
                      <span>{currentPhoto.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
      </div>
    </PageLayout>
  );
}
