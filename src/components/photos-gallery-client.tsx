'use client';

import { useState } from 'react';
import PageLayout from '@/components/page-layout';
import CockpitImage from '@/components/cockpit-image';
import { LuCalendar, LuChevronLeft, LuChevronRight, LuMapPin, LuX } from 'react-icons/lu';
import type { GalleryImage } from '@/types';

interface PhotosGalleryClientProps {
  images: GalleryImage[];
}

export default function PhotosGalleryClient({ images = [] }: PhotosGalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === 'All'
      ? images
      : images.filter((photo) => photo.group === selectedCategory);

  const categories = [
    'All',
    ...Array.from(new Set(images.map((photo) => photo.group).filter(Boolean))),
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
        {categories.length > 1 && (
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
                    : 'border border-white/5 bg-white/1 text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Photos Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="py-12 text-center text-gray-400">No photos found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/1 p-4 transition-all duration-500 hover:border-cyan-500/20 hover:bg-white/2"
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
                  <CockpitImage
                    asset={photo.image}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#020205]/60 to-transparent" />
                  {photo.group && (
                    <span className="absolute top-3 right-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[8px] font-bold tracking-widest text-cyan-400 uppercase backdrop-blur-md">
                      {photo.group}
                    </span>
                  )}
                </div>

                {/* Text Info */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-heading text-sm font-extrabold text-white transition-colors group-hover:text-cyan-400">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
                      {photo.description}
                    </p>
                  )}

                  {(photo.date || photo.location) && (
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[9px] font-bold text-gray-500 uppercase">
                      {photo.date && (
                        <span className="flex items-center gap-1">
                          <LuCalendar className="size-3" />
                          {photo.date}
                        </span>
                      )}
                      {photo.location && (
                        <span className="flex items-center gap-1">
                          <LuMapPin className="size-3" />
                          {photo.location}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIndex !== null &&
          (() => {
            const currentPhoto = filteredPhotos[lightboxIndex];
            if (!currentPhoto) return null;
            return (
              <div
                onClick={() => setLightboxIndex(null)}
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-in fade-in duration-300"
              >
                {/* Lightbox Content Container */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex max-h-[85vh] w-full max-w-250 flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300"
                >
                  {/* Close Button (placed inside container to sit on top-right of the modal content) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(null);
                    }}
                    className="absolute top-4 right-4 z-55 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition-colors hover:bg-white/10 cursor-pointer"
                    aria-label="Close lightbox"
                  >
                    <LuX className="size-5" />
                  </button>

                  {/* Navigation: Prev */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 z-50 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition-colors hover:bg-white/10 sm:left-4"
                    aria-label="Previous photo"
                  >
                    <LuChevronLeft className="size-5" />
                  </button>

                  {/* Main Image */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
                    <CockpitImage
                      asset={currentPhoto.image}
                      fill
                      className="object-contain"
                      containerClassName="bg-transparent!"
                      loaderPlaceholder={false}
                      priority
                    />
                  </div>

                  {/* Navigation: Next */}
                  <button
                    onClick={handleNext}
                    className="absolute right-2 z-50 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition-colors hover:bg-white/10 sm:right-4"
                    aria-label="Next photo"
                  >
                    <LuChevronRight className="size-5" />
                  </button>

                  {/* Photo Description overlay/bottom text */}
                  <div className="w-full max-w-200 space-y-1 pt-2 text-center">
                    {currentPhoto.group && (
                      <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                        {currentPhoto.group}
                      </span>
                    )}
                    <h4 className="font-heading text-base font-extrabold text-white sm:text-lg">
                      {currentPhoto.title}
                    </h4>
                    {currentPhoto.description && (
                      <p className="text-xs text-gray-400">
                        {currentPhoto.description}
                      </p>
                    )}
                    {(currentPhoto.date || currentPhoto.location) && (
                      <div className="flex justify-center gap-4 text-[9px] font-bold text-gray-500 uppercase">
                        {currentPhoto.date && <span>{currentPhoto.date}</span>}
                        {currentPhoto.date && currentPhoto.location && <span>•</span>}
                        {currentPhoto.location && <span>{currentPhoto.location}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
      </div>
    </PageLayout>
  );
}
