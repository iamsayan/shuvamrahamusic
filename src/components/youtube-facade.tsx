'use client';

import { useState } from 'react';
import { LuPlay } from 'react-icons/lu';

export default function YouTubeFacade({ videoId }: { videoId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title="YouTube Video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <div
      className="group bg-surface/50 absolute inset-0 h-full w-full cursor-pointer"
      onClick={() => setIsPlaying(true)}
    >
      {/* Thumbnail Facade */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="Video Thumbnail Placeholder"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/10" />

      {/* Beautiful Glassmorphic Play Button */}
      <div className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white/40 group-hover:bg-white/20 sm:h-16 sm:w-16">
        <LuPlay className="ml-1 h-5 w-5 fill-white text-white opacity-90 group-hover:opacity-100 sm:h-6 sm:w-6" />
      </div>
    </div>
  );
}
