'use client';

import React, { useMemo, useState } from 'react';

import Link from 'next/link';

import {
  AMBIENT_GLOWS,
  CATEGORY_THEMES,
  GEAR_CATEGORIES,
  GEAR_ITEMS,
  GLOW_COLORS,
} from '@/lib/gears-data';

import {
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuExternalLink,
  LuInfo,
  LuMusic,
  LuSearch,
  LuShoppingBag,
  LuSparkles,
  LuStar,
  LuTarget,
} from 'react-icons/lu';

// Amazon SVG Icon matching WordPress FontAwesome path
const AmazonIcon = () => (
  <svg
    className="mr-2 h-4 w-4 fill-current"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z" />
  </svg>
);

export default function GearsListingClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Track image carousel active index for each product
  const [carouselIndices, setCarouselIndices] = useState<
    Record<string, number>
  >({});

  const handlePrevImage = (
    id: string,
    imageCount: number,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndices((prev) => {
      const currentIndex = prev[id] || 0;
      const nextIndex = currentIndex === 0 ? imageCount - 1 : currentIndex - 1;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handleNextImage = (
    id: string,
    imageCount: number,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndices((prev) => {
      const currentIndex = prev[id] || 0;
      const nextIndex = currentIndex === imageCount - 1 ? 0 : currentIndex + 1;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handleDotClick = (id: string, idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndices((prev) => ({ ...prev, [id]: idx }));
  };

  // Filter products based on search and category tab
  const filteredGears = useMemo(() => {
    return GEAR_ITEMS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bestFor.some((bf) =>
          bf.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Determine current active glow theme based on active category
  const activeGlow = useMemo(() => {
    const defaultGlow = AMBIENT_GLOWS['All'];
    if (selectedCategory === 'All') return defaultGlow;
    return (
      AMBIENT_GLOWS[selectedCategory as keyof typeof AMBIENT_GLOWS] ||
      defaultGlow
    );
  }, [selectedCategory]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05050A] pt-24 pb-24 text-[#f0f0f5]">
      {/* Background ambient glows */}
      <div
        className={`pointer-events-none absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br ${activeGlow.top} opacity-40 blur-[130px] transition-all duration-1000`}
      />
      <div
        className={`pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tl ${activeGlow.bottom} opacity-40 blur-[130px] transition-all duration-1000`}
      />

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
              My Gears
            </span>
          </nav>

          {/* Micro accent stats */}
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-[10px] font-black tracking-wider text-cyan-400 uppercase backdrop-blur-md">
              <LuSparkles className="h-3 w-3 animate-pulse" /> 8 Pro Gear Items
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-950/20 px-3 py-1 text-[10px] font-black tracking-wider text-violet-400 uppercase backdrop-blur-md">
              <LuMusic className="h-3 w-3" /> Live & Session Verified
            </span>
          </div>

          {/* Page Title & Tagline */}
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-heading mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-4xl leading-[1.1] font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                My{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Gears
                </span>
              </h1>
              <p className="text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
                I’ve listed all the gear I personally use for my video reels,
                live performances, studio recordings, and teaching.
              </p>
            </div>
          </div>

          {/* Filters Bar: Search & Category Pills */}
          <div className="mb-12 flex flex-col gap-6 rounded-[2rem] border border-white/5 bg-[#080812]/50 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-3xl sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Search input capsule */}
            <div className="relative max-w-lg flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-500">
                <LuSearch className="h-5 w-5 transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Search gear by name, details, use-case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0c0c16]/80 py-3.5 pr-4 pl-12 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/40 focus:shadow-[0_0_15px_rgba(6,182,212,0.05)] focus:ring-2 focus:ring-cyan-500/10"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.03] bg-white/[0.01] p-1.5">
              {GEAR_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-bold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'scale-[1.02] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20'
                        : 'text-gray-400 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gears Inventory Listing Grid */}
          {filteredGears.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#080812]/30 py-24 text-center backdrop-blur-xl">
              <LuSearch className="mb-4 h-10 w-10 animate-bounce text-gray-600" />
              <p className="max-w-md text-base text-gray-500 sm:text-lg">
                No gear matches "{searchQuery}". Try exploring other categories
                or type a different search term.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-8 lg:gap-12">
              {filteredGears.map((item, idx) => {
                const themeKey = item.category as keyof typeof CATEGORY_THEMES;
                const theme =
                  CATEGORY_THEMES[themeKey] ||
                  CATEGORY_THEMES['Strings & Cables'];
                const activeImgIdx = carouselIndices[item.id] || 0;
                const hasMultipleImages = item.images.length > 1;
                const hoverGlowClass =
                  GLOW_COLORS[item.category] || GLOW_COLORS['Default'];
                const isEven = idx % 2 === 0;

                return (
                  <article
                    key={item.id}
                    className={`group relative flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-white/[0.01] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.02] hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)]`}
                  >
                    {/* Glowing Top Accent Strip (lights up on hover) */}
                    <div
                      className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${theme.gradient} z-20 opacity-20 transition-opacity duration-500 group-hover:opacity-90`}
                    />

                    {/* Inner Corner Accent Glow (fades in on hover) */}
                    <div
                      className={`pointer-events-none absolute ${isEven ? '-right-24' : '-left-24'} -bottom-24 h-60 w-60 rounded-full ${hoverGlowClass} z-0 opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100`}
                    />

                    {/* Image Slider Wrapper */}
                    <div className="relative h-52 shrink-0 overflow-hidden bg-black/50 sm:h-60 md:h-auto md:w-[35%] lg:w-[40%] min-h-[200px] md:min-h-0">
                      {item.images.length > 0 ? (
                        <img
                          src={item.images[activeImgIdx]}
                          alt={item.title}
                          className="h-full w-full object-cover object-top transition-transform duration-[1500ms] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-900 text-gray-700">
                          No Photo Available
                        </div>
                      )}

                      {/* Top Overlaid Badges */}
                      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase backdrop-blur-md">
                          <LuStar className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                          {item.badge}
                        </span>
                        {item.studentBadge && (
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/80 px-3 py-1.5 text-[10px] font-black tracking-widest text-cyan-300 uppercase backdrop-blur-md">
                            <LuTarget className="h-3.5 w-3.5 shrink-0 animate-pulse text-cyan-400" />
                            {item.studentBadge}
                          </span>
                        )}
                      </div>

                      {/* Carousel Overlaid Controls */}
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={(e) =>
                              handlePrevImage(item.id, item.images.length, e)
                            }
                            className="absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-black/70 active:scale-90"
                          >
                            <LuChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={(e) =>
                              handleNextImage(item.id, item.images.length, e)
                            }
                            className="absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-black/70 active:scale-90"
                          >
                            <LuChevronRight className="h-5 w-5" />
                          </button>

                          {/* Dots Position Indicator Bar */}
                          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/5 bg-black/30 px-2.5 py-1 backdrop-blur-md">
                            {item.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => handleDotClick(item.id, idx, e)}
                                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                                  idx === activeImgIdx
                                    ? 'w-4 bg-cyan-400'
                                    : 'w-1.5 bg-white/40'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Card Content details */}
                    <div className="relative z-10 flex flex-1 flex-col justify-between p-5 sm:p-6 md:p-8">
                      {/* Category badge */}
                      <div className="mb-2 flex">
                        <span
                          className={`rounded-full ${theme.bg} ${theme.text} border border-white/5 px-3 py-1 text-[10px] font-black tracking-widest uppercase`}
                        >
                          {item.category}
                        </span>
                      </div>

                      {/* Title & recommended Tagline */}
                      <h2 className="mb-1 text-lg leading-snug font-black tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-400 sm:text-xl md:text-2xl">
                        {item.title}
                      </h2>
                      <p className="mb-2 text-xs font-semibold tracking-wide text-gray-400">
                        {item.subtitle}
                      </p>

                      <div className="my-2.5 border-t border-white/5" />

                      {/* Main Description */}
                      <p className="mb-4 text-xs leading-relaxed font-normal text-gray-300 sm:text-sm">
                        {item.description}
                      </p>

                      {/* Ideal For list */}
                      <div className="mb-4">
                        <h4 className="mb-2 text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                          Ideal For:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.bestFor.map((feature, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[11px] font-bold text-gray-300 backdrop-blur-sm"
                            >
                              <LuCheck className="mr-1.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Button Actions */}
                      <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
                        {item.links.amazon && (
                          <a
                            href={item.links.amazon}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-amber-500 py-3 text-xs font-black tracking-wider text-black shadow-md shadow-amber-500/10 transition-all duration-300 hover:bg-amber-400 active:scale-95"
                          >
                            <AmazonIcon />
                            Check Price on Amazon
                          </a>
                        )}
                        {item.links.distributor && (
                          <a
                            href={item.links.distributor}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-950/20 py-3 text-xs font-black tracking-wider text-cyan-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-900/30 active:scale-95"
                          >
                            <LuShoppingBag className="mr-2 h-4 w-4" />
                            Get from Distributor
                          </a>
                        )}
                        {!item.links.amazon &&
                          !item.links.distributor &&
                          item.links.official && (
                            <a
                              href={item.links.official}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] py-3 text-xs font-black tracking-wider text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] active:scale-95"
                            >
                              <LuExternalLink className="mr-2 h-4 w-4" />
                              Explore Website
                            </a>
                          )}
                      </div>

                      {/* Visit Official Brand Website row */}
                      {(item.links.amazon || item.links.distributor) &&
                        item.links.official && (
                          <div className="mt-4 text-center">
                            <a
                              href={item.links.official}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-[10px] font-bold tracking-widest text-gray-500 uppercase transition-colors duration-200 hover:text-white"
                            >
                              Visit Official Brand Site
                              <LuExternalLink className="ml-1.5 h-3 w-3" />
                            </a>
                          </div>
                        )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Affiliate support and support text footer section */}
          <div className="mt-20 rounded-3xl border border-white/5 bg-[#080812]/40 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl sm:p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                <LuInfo className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">
                  Affiliate Disclosure & Support
                </h3>
                <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                  Some of the purchase links provided above are affiliate links
                  (such as Amazon Store links). Using these links to make a
                  purchase quietly supports my music training work and
                  high-quality tutorial development — at absolutely{' '}
                  <strong>no extra cost to you</strong>. I only recommend gear
                  items that I have personally played, verified, and trusted in
                  my studio or on stage. Thank you for supporting the music!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
