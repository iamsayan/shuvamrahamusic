'use client';

import { useState } from 'react';

import PageLayout from '@/components/page-layout';
import YouTubeFacade from '@/components/youtube-facade';
import type { GalleryVideo } from '@/types';

import { format, isValid } from 'date-fns';
import { LuCalendar, LuPlay, LuSparkles, LuVideo } from 'react-icons/lu';

type VideoFormat = 'Video' | 'Shorts';

interface VideosGalleryClientProps {
  videos: GalleryVideo[];
}

export default function VideosGalleryClient({
  videos = [],
}: VideosGalleryClientProps) {
  const [activeFormat, setActiveFormat] = useState<VideoFormat>('Video');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Helper to extract year or return the date string
  const getYear = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isValid(date) ? format(date, 'yyyy') : dateStr;
  };

  // Filter items by format (Video/Shorts). Mapped from DB field: type: 'Video' | 'Short'
  const formatFiltered = videos.filter((v) => {
    if (activeFormat === 'Video') {
      return v.type === 'Video';
    } else {
      return v.type === 'Short';
    }
  });

  // Filter items by selected Category
  const finalFiltered =
    activeCategory === 'All'
      ? formatFiltered
      : formatFiltered.filter((v) => v.category === activeCategory);

  // Extract unique categories available in the active format
  const availableCategories = [
    'All',
    ...Array.from(
      new Set(formatFiltered.map((v) => v.category).filter(Boolean))
    ),
  ];

  const handleFormatChange = (format: VideoFormat) => {
    setActiveFormat(format);
    setActiveCategory('All');
  };

  return (
    <PageLayout
      title="Video Gallery"
      subtitle="Watch official music videos, gear unboxings, tone playthroughs, student results, and premium guitar lessons."
      variant="plain"
      textAlign="center"
    >
      <div className="space-y-10">
        {/* Format Selector: Videos vs Shorts */}
        <div className="flex justify-center">
          <div className="flex gap-2 rounded-full border border-white/10 bg-[#07070F]/80 p-1.5 backdrop-blur-md">
            <button
              onClick={() => handleFormatChange('Video')}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                activeFormat === 'Video'
                  ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'border border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <LuVideo className="size-4" />
              Standard Videos
            </button>
            <button
              onClick={() => handleFormatChange('Shorts')}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                activeFormat === 'Shorts'
                  ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'border border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <LuPlay className="size-4" />
              Shorts / Reels
            </button>
          </div>
        </div>

        {/* Category Filters */}
        {availableCategories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-6">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-[10px] font-black tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border border-cyan-500/20 bg-cyan-500/5 text-cyan-400'
                    : 'border border-transparent text-gray-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {finalFiltered.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            No videos found in this category.
          </div>
        ) : activeFormat === 'Video' ? (
          // Grid layout for Horizontal Videos
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {finalFiltered.map((video, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/1 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/2"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                    <YouTubeFacade videoId={video.video_id} />
                    {video.category && (
                      <span className="absolute top-3 right-3 z-20 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[8px] font-bold tracking-widest text-cyan-400 uppercase backdrop-blur-md">
                        {video.category}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    {video.date && (
                      <div className="mb-2 flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase">
                        <span className="flex items-center gap-1">
                          <LuCalendar className="size-3" />
                          {getYear(video.date)}
                        </span>
                      </div>
                    )}

                    <h3 className="font-heading text-sm font-extrabold text-white transition-colors group-hover:text-cyan-400">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="mt-2 text-xs leading-relaxed text-gray-400">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-white/4 p-5 pt-3 text-[9px] font-bold text-gray-500 uppercase">
                  <LuVideo className="size-3 text-cyan-400" />
                  <span>Standard Video</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grid layout for Vertical Shorts (aspect-9/16)
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {finalFiltered.map((video, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/1 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/2"
              >
                <div>
                  <div className="relative aspect-9/16 w-full overflow-hidden bg-gray-900">
                    <YouTubeFacade videoId={video.video_id} />
                    {video.category && (
                      <span className="absolute top-3 right-3 z-20 rounded-full border border-white/10 bg-black/60 px-2 py-1 text-[8px] font-bold tracking-widest text-cyan-400 uppercase backdrop-blur-md">
                        {video.category}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    {video.date && (
                      <div className="mb-1.5 flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase">
                        <span className="flex items-center gap-1">
                          <LuCalendar className="size-3" />
                          {getYear(video.date)}
                        </span>
                      </div>
                    )}

                    <h3 className="font-heading line-clamp-1 text-xs font-extrabold text-white transition-colors group-hover:text-cyan-400">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="mt-1 line-clamp-2 text-[11px] leading-normal text-gray-400">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 border-t border-white/4 p-4 pt-2.5 text-[8px] font-bold text-gray-500 uppercase">
                  <LuPlay className="size-3 text-cyan-400" />
                  <span>YouTube Short</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Channel Promotion CTA Box */}
        <div className="group/card relative overflow-hidden rounded-4xl border border-white/10 bg-[#07070F]/85 p-8 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:border-cyan-500/20 sm:p-12">
          {/* Glowing Top Accent Strip */}
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-60" />
          <div className="pointer-events-none absolute -top-[40%] -right-[10%] size-75 rounded-full bg-cyan-600/10 blur-[100px]" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                YouTube Channel
              </span>
              <h2 className="font-heading mb-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                Subscribe for Weekly Guitar{' '}
                <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Guides &amp; Covers
                </span>
              </h2>
              <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                Get free tutorials, finger exercises walkthroughs, gear
                configurations, and covers uploaded regularly. Hit subscribe to
                join the guitar community.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="https://www.youtube.com/channel/UC-N2u9tH94W9h0MebX9zQ7A"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn font-heading relative inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] active:scale-95 sm:text-sm"
              >
                <LuSparkles className="size-4" />
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
