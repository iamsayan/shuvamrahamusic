'use client';

import { useState } from 'react';

import PageLayout from '@/components/page-layout';
import YouTubeFacade from '@/components/youtube-facade';

import { LuCalendar, LuPlay, LuSparkles, LuVideo } from 'react-icons/lu';

type VideoFormat = 'Video' | 'Shorts';
type VideoCategory =
  | 'Music Video'
  | 'Product Demo'
  | 'Unboxing'
  | 'Live Performance'
  | 'Tutorial/lessons'
  | 'Students Video';

interface VideoItem {
  id: string;
  title: string;
  category: VideoCategory;
  format: VideoFormat;
  youtubeId: string;
  year: string;
  description: string;
}

const VIDEOS: VideoItem[] = [
  // Videos (Horizontal Format)
  {
    id: 'purano-sei-diner-kotha',
    title: 'Purano Sei Diner Kotha',
    category: 'Music Video',
    format: 'Video',
    youtubeId: 'Mldyf1c3uxc',
    year: '2024',
    description:
      'A contemporary arrangement of the legendary Rabindra Sangeet, produced and played on acoustic guitars by Shuvam Raha.',
  },
  {
    id: 'ei-mon',
    title: 'Ei Mon (Original Single)',
    category: 'Music Video',
    format: 'Video',
    youtubeId: 'RGfHMP9_O2M',
    year: '2023',
    description:
      'Official music video of Shuvam Raha’s original indie single—a mix of acoustic fingerstyle elements and pop groove.',
  },
  {
    id: 'phirti-pothe-video',
    title: 'Phirti Pothe (Official Video)',
    category: 'Music Video',
    format: 'Video',
    youtubeId: '_xOSImNUfQ8',
    year: '2023',
    description:
      'Official release of the heartfelt acoustic Bengali single exploring distance, nostalgia, and acceptance.',
  },
  {
    id: 'ki-jani-keno-live',
    title: 'Ki Jani Keno (Live Unplugged)',
    category: 'Live Performance',
    format: 'Video',
    youtubeId: 'fg-Ohl7seGQ',
    year: '2023',
    description:
      'Raw, energetic acoustic performance at a private set in Kolkata, featuring intimate guitar work.',
  },
  {
    id: 'bhalobasha-reprise',
    title: 'Bhalobasha (Reprise Cover)',
    category: 'Music Video',
    format: 'Video',
    youtubeId: 'b6KCbNlsf8U',
    year: '2023',
    description:
      'A ambient, slow-tempo reprise guitar rendition of the popular track, layered with ambient delay effects.',
  },
  {
    id: 'fender-strat-demo',
    title: 'Fender Stratocaster Tone Test & Playthrough',
    category: 'Product Demo',
    format: 'Video',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder/Strat Demo video
    year: '2024',
    description:
      'Testing clean, crunch, and high-gain tones on the American Professional II Stratocaster in the studio.',
  },
  {
    id: 'focusrite-unboxing',
    title: 'Focusrite Scarlett Solo Gen 4 Unboxing & Setup',
    category: 'Unboxing',
    format: 'Video',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder/Setup video
    year: '2023',
    description:
      'Unboxing the new Gen 4 Scarlett Solo interface and showing step-by-step setup in DAW for beginners.',
  },
  {
    id: 'guitar-modes-lesson',
    title: 'Mastering Guitar Modes: Ionian to Locrian',
    category: 'Tutorial/lessons',
    format: 'Video',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    description:
      'A comprehensive, simplified guide to understanding and practicing modal scales over backing tracks.',
  },

  // Shorts (Portrait Format)
  {
    id: 'student-1',
    title: 'Student Showcase - Fingerstyle Arrangement',
    category: 'Students Video',
    format: 'Shorts',
    youtubeId: 'QAJUivdGB5k',
    year: '2024',
    description:
      'A beginner student playing a complete fingerstyle arrangement after 3 months of 1-on-1 coaching.',
  },
  {
    id: 'student-2',
    title: 'Student Showcase - Rhythmic Timing Control',
    category: 'Students Video',
    format: 'Shorts',
    youtubeId: '4y2bCPoBtQw',
    year: '2024',
    description:
      'Intermediate student displaying solid rhythm playing and timing control over complex song changes.',
  },
  {
    id: 'student-3',
    title: 'Student Spotlight - Chord Transitions',
    category: 'Students Video',
    format: 'Shorts',
    youtubeId: '7rgtIwJlHcc',
    year: '2023',
    description:
      'Demonstrating seamless chord progression transitions and smooth finger exercises progression.',
  },
  {
    id: 'weekly-routine-short',
    title: 'Daily 15 Min Practice Routine',
    category: 'Tutorial/lessons',
    format: 'Shorts',
    youtubeId: 'MuHzObO8sdU',
    year: '2024',
    description:
      'A quick 15-minute routine to improve finger coordination and pick control every single day.',
  },
  {
    id: 'boss-katana-short',
    title: 'Boss Katana-50 Quick Tones',
    category: 'Product Demo',
    format: 'Shorts',
    youtubeId: 'dfTZc5wDeK8',
    year: '2023',
    description:
      'Testing the ambient delays and crunch tones of the Katana-50 amp in 30 seconds.',
  },
  {
    id: 'acoustic-unboxing-short',
    title: 'Yamaha FS80C Unboxing!',
    category: 'Unboxing',
    format: 'Shorts',
    youtubeId: '461nZ5U9Wiw',
    year: '2023',
    description:
      'Quick unboxing of the Yamaha FS80C acoustic guitar, showing build quality and first strum sound.',
  },
];

export default function VideosGalleryPage() {
  const [activeFormat, setActiveFormat] = useState<VideoFormat>('Video');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter items by format (Video/Shorts)
  const formatFiltered = VIDEOS.filter((v) => v.format === activeFormat);

  // Filter items by selected Category
  const finalFiltered =
    activeCategory === 'All'
      ? formatFiltered
      : formatFiltered.filter((v) => v.category === activeCategory);

  // Extract unique categories available in the active format
  const availableCategories = [
    'All',
    ...Array.from(new Set(formatFiltered.map((v) => v.category))),
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

        {/* Videos Grid */}
        {activeFormat === 'Video' ? (
          // Grid layout for Horizontal Videos
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {finalFiltered.map((video) => (
              <div
                key={video.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/1 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/2"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                    <YouTubeFacade videoId={video.youtubeId} />
                    <span className="absolute top-3 right-3 z-20 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[8px] font-bold tracking-widest text-cyan-400 uppercase backdrop-blur-md">
                      {video.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase">
                      <span className="flex items-center gap-1">
                        <LuCalendar className="size-3" />
                        {video.year}
                      </span>
                    </div>

                    <h3 className="font-heading text-sm font-extrabold text-white transition-colors group-hover:text-cyan-400">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400">
                      {video.description}
                    </p>
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
            {finalFiltered.map((video) => (
              <div
                key={video.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/1 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/2"
              >
                <div>
                  <div className="relative aspect-9/16 w-full overflow-hidden bg-gray-900">
                    <YouTubeFacade videoId={video.youtubeId} />
                    <span className="absolute top-3 right-3 z-20 rounded-full border border-white/10 bg-black/60 px-2 py-1 text-[8px] font-bold tracking-widest text-cyan-400 uppercase backdrop-blur-md">
                      {video.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="mb-1.5 flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase">
                      <span className="flex items-center gap-1">
                        <LuCalendar className="size-3" />
                        {video.year}
                      </span>
                    </div>

                    <h3 className="font-heading line-clamp-1 text-xs font-extrabold text-white transition-colors group-hover:text-cyan-400">
                      {video.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-normal text-gray-400">
                      {video.description}
                    </p>
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
