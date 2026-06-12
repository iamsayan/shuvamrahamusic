'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import CockpitImage from '@/components/cockpit-image';
import { Asset } from '@/lib/cockpit';

interface CoachImageSliderProps {
  images: Asset[];
}

export default function CoachImageSlider({ images }: CoachImageSliderProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setActiveImgIdx((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images]);

  if (!images || images.length === 0) {
    return (
      <Image
        src="/hero-guitarist.jpg"
        alt="Shuvam Raha - Online Guitar Instructor"
        fill
        className="object-cover opacity-90"
        loading="eager"
        sizes="(max-width: 1024px) 480px, 600px"
      />
    );
  }

  return (
    <div className="relative overflow-hidden size-full">
      {images.map((img, imgIdx) => (
        <div
          key={img._id}
          className="absolute inset-0 transition-all duration-1000 ease-in-out size-full"
          style={{
            transform: `translateX(${(imgIdx - activeImgIdx) * 100}%)`,
          }}
        >
          <CockpitImage
            asset={img}
            className="object-cover object-top opacity-90 transition-transform duration-[2000ms] hover:scale-105 size-full"
            fill
            mode="resize"
            quality={85}
            lazy={false}
            loaderPlaceholder={false}
          />
        </div>
      ))}

      {hasMultipleImages && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/5 bg-black/30 px-2.5 py-1 backdrop-blur-md">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImgIdx(idx)}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                idx === activeImgIdx ? 'w-4 bg-cyan-400' : 'w-1.5 bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
