'use client';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';

import YouTubeFacade from '@/components/youtube-facade';
import { TutorialItem } from '@/types';

import { LuFileText, LuSearch, LuSparkles, LuX } from 'react-icons/lu';

export interface Theme {
  text: string;
  bg: string;
  border: string;
  glow: string;
  gradient: string;
  glowColor: string;
}

export const THEME_PALETTE: Theme[] = [
  {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 border-cyan-500/30',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'bg-cyan-500/10',
  },
  {
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 border-violet-500/30',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]',
    gradient: 'from-violet-500 to-fuchsia-500',
    glowColor: 'bg-violet-500/10',
  },
  {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 border-emerald-500/30',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'bg-emerald-500/10',
  },
  {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 border-amber-500/30',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'bg-amber-500/10',
  },
  {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20 border-rose-500/30',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.15)]',
    gradient: 'from-rose-500 to-pink-500',
    glowColor: 'bg-rose-500/10',
  },
];

const DEFAULT_THEME: Theme = THEME_PALETTE[0];

function formatFileSize(bytes: number): string {
  if (!bytes) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${Math.round(kb)} KB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

export default function TutorialsListingClient({
  initialItems,
}: {
  initialItems?: TutorialItem[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredTutorials = useMemo(() => {
    const items = initialItems || [];
    if (!debouncedSearchQuery.trim()) return items;

    const query = debouncedSearchQuery.toLowerCase();
    return items.filter((item) => {
      const matchesTitle = item.title.toLowerCase().includes(query);
      const matchesDescription =
        item.description?.toLowerCase().includes(query) || false;
      const matchesLinks = item.links?.some((lnk) =>
        lnk.title.toLowerCase().includes(query)
      );
      return matchesTitle || matchesDescription || matchesLinks;
    });
  }, [initialItems, debouncedSearchQuery]);

  // Construct absolute URL for PDF assets
  const getAssetUrl = (path: string) => {
    const apiHost =
      process.env.NEXT_PUBLIC_API_URL || 'https://web.shuvamrahamusic.com';
    return `${apiHost}/storage/uploads${path}`;
  };

  return (
    <div className="relative min-h-screen bg-[#05050A] pt-24 pb-24 text-[#f0f0f5]">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent opacity-40 blur-[130px]" />
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-violet-500/10 to-transparent opacity-40 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        <div className="flex w-full flex-col pt-8 pb-6">
          {/* Breadcrumbs */}
          <nav className="font-heading mb-6 flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase sm:text-xs">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-white"
            >
              Home
            </Link>
            <span className="text-[10px] font-normal text-gray-700 sm:text-xs">
              /
            </span>
            <span className="font-black tracking-wide text-cyan-400">
              Tutorials
            </span>
          </nav>

          {/* Page Title & Tagline */}
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="relative">
              <h1 className="font-heading mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-3xl leading-[1.15] font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                Learning{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Materials
                </span>
              </h1>
              <p className="text-xs leading-relaxed text-gray-400 sm:text-sm md:text-base">
                Download high-quality practice sheets, finger exercises, chord
                charts, and manuscript layouts to support your guitar lessons.
              </p>
            </div>
          </div>

          {/* Filters Bar: Search Input */}
          <div className="relative z-30 mb-12">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-500">
                <LuSearch className="h-5 w-5 transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Search exercises, manuscript sheets, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/[0.02] py-3.5 pr-12 pl-12 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <LuX className="h-4.5 w-4.5" />
                </button>
              )}
            </div>
          </div>

          {/* Tutorials Inventory Grid */}
          {filteredTutorials.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#080812]/30 py-24 text-center backdrop-blur-xl">
              <LuSearch className="mb-4 h-10 w-10 animate-bounce text-gray-600" />
              <p className="max-w-md text-base text-gray-500 sm:text-lg">
                No materials match &quot;{searchQuery}&quot;. Try typing a
                different search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {filteredTutorials.map((item, idx) => {
                const theme =
                  THEME_PALETTE[idx % THEME_PALETTE.length] || DEFAULT_THEME;
                const hoverGlowClass = theme.glowColor;

                return (
                  <article
                    key={item._id}
                    className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-white/[0.01] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.02] hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
                  >
                    {/* Glowing Top Accent Strip */}
                    <div
                      className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${theme.gradient} z-20 opacity-20 transition-opacity duration-500 group-hover:opacity-90`}
                    />

                    {/* Inner Corner Accent Glow */}
                    <div
                      className={`pointer-events-none absolute -right-24 -bottom-24 h-60 w-60 rounded-full ${hoverGlowClass} z-0 opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100`}
                    />

                    {/* YouTube Video Section */}
                    {item.youtube_video_id && (
                      <div className="relative aspect-video w-full overflow-hidden border-b border-white/[0.04] bg-black/50">
                        <YouTubeFacade videoId={item.youtube_video_id} />
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="relative z-10 flex flex-1 flex-col justify-between p-6 sm:p-8">
                      <div>
                        {/* Accent Header */}
                        <div className="mb-4 flex items-center gap-1.5 text-[10px] font-black tracking-widest text-gray-500 uppercase">
                          <LuSparkles className={`h-3.5 w-3.5 ${theme.text}`} />
                          <span>Topic Resource</span>
                        </div>

                        {/* Title */}
                        <h2 className="mb-4 text-lg leading-snug font-black tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-400 sm:text-xl">
                          {item.title}
                        </h2>

                        {/* Description */}
                        {item.description && (
                          <p className="mb-6 text-xs leading-relaxed text-gray-400 sm:text-sm">
                            {item.description}
                          </p>
                        )}

                        <div className="mb-6 border-t border-white/5" />

                        {/* Links (Attachments) */}
                        <div className="flex flex-col gap-3">
                          {item.links?.map((link, linkIdx) => {
                            const downloadUrl = getAssetUrl(link.asset.path);
                            return (
                              <div
                                key={linkIdx}
                                className="flex flex-col justify-between gap-3 rounded-2xl border border-white/[0.03] bg-white/[0.01] p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03] sm:flex-row sm:items-center"
                              >
                                <div className="flex min-w-0 items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                                    <LuFileText className="h-5 w-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-gray-200">
                                      {link.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {formatFileSize(link.asset.size)}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <a
                                    href={downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-950/20 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-cyan-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-900/30 active:scale-95"
                                  >
                                    View PDF
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
