"use client";

import { useState } from "react";
import { LuPlay } from "react-icons/lu";

export default function YouTubeFacade({
  videoId,
}: {
  videoId: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title="YouTube Video"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <div
      className="absolute inset-0 w-full h-full group cursor-pointer bg-surface/50"
      onClick={() => setIsPlaying(true)}
    >
      {/* Thumbnail Facade */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="Video Thumbnail Placeholder"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
      
      {/* Beautiful Glassmorphic Play Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/40">
        <LuPlay className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1 fill-white opacity-90 group-hover:opacity-100" />
      </div>
    </div>
  );
}
