'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';

import CockpitImage from '@/components/cockpit-image';
import { GearItem } from '@/types';

import { FaAmazon } from 'react-icons/fa6';
import {
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuExternalLink,
  LuInfo,
  LuSearch,
  LuShoppingBag,
  LuSparkles,
  LuStar,
  LuTarget,
  LuX,
} from 'react-icons/lu';
import { useInView } from 'react-intersection-observer';

export interface Theme {
  text: string;
  bg: string;
  border: string;
  glow: string;
  gradient: string;
  glowColor: string;
  ambient: {
    top: string;
    bottom: string;
  };
}

export const THEME_PALETTE: Theme[] = [
  {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 border-cyan-500/30',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.2)]',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'bg-cyan-500/20',
    ambient: {
      top: 'from-cyan-500/15 to-transparent',
      bottom: 'from-blue-500/10 to-transparent',
    },
  },
  {
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 border-violet-500/30',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    gradient: 'from-violet-500 to-fuchsia-500',
    glowColor: 'bg-violet-500/20',
    ambient: {
      top: 'from-violet-500/15 to-transparent',
      bottom: 'from-fuchsia-500/10 to-transparent',
    },
  },
  {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 border-emerald-500/30',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'bg-emerald-500/20',
    ambient: {
      top: 'from-emerald-500/15 to-transparent',
      bottom: 'from-teal-500/10 to-transparent',
    },
  },
  {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 border-amber-500/30',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'bg-amber-500/20',
    ambient: {
      top: 'from-amber-500/15 to-transparent',
      bottom: 'from-orange-500/10 to-transparent',
    },
  },
  {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20 border-rose-500/30',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]',
    gradient: 'from-rose-500 to-pink-500',
    glowColor: 'bg-rose-500/20',
    ambient: {
      top: 'from-rose-500/15 to-transparent',
      bottom: 'from-pink-500/10 to-transparent',
    },
  },
  {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20 border-blue-500/30',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    gradient: 'from-blue-500 to-indigo-500',
    glowColor: 'bg-blue-500/20',
    ambient: {
      top: 'from-blue-500/15 to-transparent',
      bottom: 'from-indigo-500/10 to-transparent',
    },
  },
  {
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/20 border-fuchsia-500/30',
    glow: 'shadow-[0_0_20px_rgba(217,70,239,0.2)]',
    gradient: 'from-fuchsia-500 to-pink-500',
    glowColor: 'bg-fuchsia-500/20',
    ambient: {
      top: 'from-fuchsia-500/15 to-transparent',
      bottom: 'from-pink-500/10 to-transparent',
    },
  },
  {
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20 border-teal-500/30',
    glow: 'shadow-[0_0_20px_rgba(20,184,166,0.2)]',
    gradient: 'from-teal-500 to-cyan-500',
    glowColor: 'bg-teal-500/20',
    ambient: {
      top: 'from-teal-500/15 to-transparent',
      bottom: 'from-cyan-500/10 to-transparent',
    },
  },
];

export const DEFAULT_THEME: Theme = {
  text: 'text-cyan-400',
  bg: 'bg-cyan-500/10',
  border: 'border-cyan-500/20 border-cyan-500/30',
  glow: 'shadow-[0_0_20px_rgba(34,211,238,0.2)]',
  gradient: 'from-cyan-500 to-blue-500',
  glowColor: 'bg-cyan-500/15',
  ambient: {
    top: 'from-cyan-500/10 to-transparent',
    bottom: 'from-violet-500/10 to-transparent',
  },
};

export default function GearsListingClient({
  initialItems,
}: {
  initialItems?: GearItem[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Dynamically collect active categories from data
  const activeCategories = useMemo(() => {
    const categoriesWithItems = new Set<string>();
    initialItems?.forEach((item) => {
      item.categories?.forEach((cat: string) => {
        categoriesWithItems.add(cat);
      });
    });
    return ['All', ...Array.from(categoriesWithItems).sort()];
  }, [initialItems]);

  // Dynamically assign a color theme to each category based on its sorted index
  const categoryThemes = useMemo(() => {
    const themes: Record<string, typeof DEFAULT_THEME> = {
      All: DEFAULT_THEME,
    };
    const dynamicCats = activeCategories.filter((cat) => cat !== 'All');
    dynamicCats.forEach((cat, idx) => {
      themes[cat] = THEME_PALETTE[idx % THEME_PALETTE.length];
    });
    return themes;
  }, [activeCategories]);

  // Filter products based on search and category tab
  const filteredGears = useMemo(() => {
    const items = initialItems || [];
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (item.subtitle || '')
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        (item.description || '')
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        (item.ideal_for || []).some((bf) =>
          bf.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'All' ||
        item.categories?.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [initialItems, debouncedSearchQuery, selectedCategory]);

  const activeTheme = categoryThemes[selectedCategory] || DEFAULT_THEME;

  return (
    <div className="relative min-h-screen bg-[#05050A] pt-24 pb-24 text-[#f0f0f5]">
      {/* Background ambient glows wrapper (prevents horizontal scroll without breaking sticky positioning) */}
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
              My Gears
            </span>
          </nav>

          {/* Page Title & Tagline */}
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="relative">
              <h1 className="font-heading mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-3xl leading-[1.15] font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                My{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Gears
                </span>
              </h1>
              <p className="text-xs leading-relaxed text-gray-400 sm:text-sm md:text-base">
                I’ve listed all the gear I personally use for my video reels,
                live performances, studio recordings, and teaching.
              </p>
            </div>
          </div>

          {/* Filters Bar: Search & Category Dropdown */}
          <div className="relative z-30 mb-12">
            <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
              {/* Search input capsule */}
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-500">
                  <LuSearch className="h-5 w-5 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search gears, brands, or features..."
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

              {/* Custom Category Dropdown selector */}
              <div ref={dropdownRef} className="relative w-full md:w-60 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${activeTheme.gradient} ${activeTheme.glow}`} />
                    <span className="font-semibold tracking-wide">{selectedCategory}</span>
                  </div>
                  <svg
                    className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-white/10 bg-[#0A0A16] p-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
                    {activeCategories.map((cat) => {
                      const theme = categoryThemes[cat] || DEFAULT_THEME;
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 hover:bg-white/[0.04] cursor-pointer ${
                            isSelected ? `${theme.text} bg-white/[0.03]` : 'text-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${theme.gradient}`} />
                            <span>{cat}</span>
                          </div>
                          {isSelected && <span className={`h-1 w-1 rounded-full bg-gradient-to-r ${theme.gradient} ${theme.glow}`} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gears Inventory Listing Grid */}
          {filteredGears.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#080812]/30 py-24 text-center backdrop-blur-xl">
              <LuSearch className="mb-4 h-10 w-10 animate-bounce text-gray-600" />
              <p className="max-w-md text-base text-gray-500 sm:text-lg">
                No gear matches &quot;{searchQuery}&quot;. Try exploring other
                categories or type a different search term.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-8 lg:gap-12">
              {filteredGears.map((item, idx) => (
                <GearCard
                  key={item._id}
                  item={item}
                  idx={idx}
                  categoryThemes={categoryThemes}
                />
              ))}
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

function GearCard({
  item,
  idx,
  categoryThemes,
}: {
  item: GearItem;
  idx: number;
  categoryThemes: Record<string, Theme>;
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const itemCat = item.categories?.[0];
  const theme = (itemCat && categoryThemes[itemCat]) || DEFAULT_THEME;
  const hasMultipleImages = (item.images?.length || 0) > 1;
  const hoverGlowClass = theme.glowColor;
  const isEven = idx % 2 === 0;

  useEffect(() => {
    if (!hasMultipleImages || !inView) return;

    const interval = setInterval(() => {
      setActiveImgIdx((prev) => (prev + 1) % item.images!.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, inView, item.images]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.images) {
      setActiveImgIdx((prev) =>
        prev === 0 ? item.images!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.images) {
      setActiveImgIdx((prev) => (prev + 1) % item.images!.length);
    }
  };

  const handleDotClick = (dotIdx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIdx(dotIdx);
  };

  return (
    <article
      ref={ref}
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
      <div className="relative h-52 min-h-[200px] shrink-0 overflow-hidden bg-black/50 sm:h-60 md:h-auto md:min-h-0 md:w-[35%] lg:w-[40%]">
        {item.images && item.images.length > 0 ? (
          <div className="relative h-full w-full">
            {item.images.map((img, imgIdx) => (
              <div
                key={imgIdx}
                className="absolute inset-0 h-full w-full transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateX(${(imgIdx - activeImgIdx) * 100}%)`,
                }}
              >
                <CockpitImage
                  asset={img}
                  className="h-full w-full object-cover object-top transition-transform duration-[1500ms] group-hover:scale-[1.03]"
                  fill
                  mode="resize"
                  quality={50}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-900 text-gray-700">
            No Photo Available
          </div>
        )}

        {/* Carousel Overlaid Controls */}
        {hasMultipleImages && item.images && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-black/70 active:scale-95"
            >
              <LuChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-black/70 active:scale-95"
            >
              <LuChevronRight className="h-5 w-5" />
            </button>

            {/* Dots Position Indicator Bar */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/5 bg-black/30 px-2.5 py-1 backdrop-blur-md">
              {item.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleDotClick(idx, e)}
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
        {/* Category badges */}
        <div className="mb-2 flex flex-wrap gap-1.5">
          {item.categories?.map((cat: string, catIdx: number) => {
            const catTheme = categoryThemes[cat] || DEFAULT_THEME;
            return (
              <span
                key={catIdx}
                className={`rounded-full ${catTheme.bg} ${catTheme.text} border border-white/5 px-3 py-1 text-[10px] font-black tracking-widest uppercase`}
              >
                {cat}
              </span>
            );
          })}
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
            {item.ideal_for?.map((feature: string, idx: number) => (
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

        {/* Redesigned Trust & Verification Card */}
        <div className="group/trust relative mt-4 mb-6 overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4">
          {/* Interactive hover glow gradient */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-700 group-hover/trust:opacity-100" />

          <div className="relative z-10 flex flex-col gap-3">
            {/* Subtitle / Header */}
            <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-gray-500 uppercase">
              <LuSparkles className="h-3.5 w-3.5 animate-pulse text-amber-400" />
              <span>Instructor Recommendation</span>
            </div>

            {/* Badges list */}
            <div className="flex flex-col gap-2.5">
              {item.highlights?.map((highlight: string, hIdx: number) => (
                <div key={hIdx} className="flex items-start gap-2.5">
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${hIdx === 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'}`}
                  >
                    {hIdx === 0 ? (
                      <LuStar className="h-3 w-3 fill-amber-400/20" />
                    ) : (
                      <LuTarget className="h-3 w-3 animate-pulse" />
                    )}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${hIdx === 0 ? 'font-bold text-amber-200/90' : 'font-semibold text-cyan-200/90'}`}
                  >
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button Actions */}
        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
          {item.amazon_link && (
            <a
              href={item.amazon_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-amber-500 py-3 text-xs font-black tracking-wider text-black shadow-md shadow-amber-500/10 transition-all duration-300 hover:bg-amber-400 active:scale-95"
            >
              <FaAmazon className="mr-2 h-4 w-4" />
              Check Price on Amazon
            </a>
          )}
          {item.distributor_link && (
            <a
              href={item.distributor_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-950/20 py-3 text-xs font-black tracking-wider text-cyan-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-900/30 active:scale-95"
            >
              <LuShoppingBag className="mr-2 h-4 w-4" />
              Get from Distributor
            </a>
          )}
          {!item.amazon_link && !item.distributor_link && item.brand_link && (
            <a
              href={item.brand_link}
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
        {(item.amazon_link || item.distributor_link) && item.brand_link && (
          <div className="mt-4 text-center">
            <a
              href={item.brand_link}
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
}
