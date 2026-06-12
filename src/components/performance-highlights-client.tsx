'use client';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';

import CockpitImage from '@/components/cockpit-image';
import PageLayout from '@/components/page-layout';
import { Artist, Performance } from '@/types';

import {
  LuCalendarDays,
  LuCompass,
  LuGlobe,
  LuGuitar,
  LuMapPin,
  LuMusic,
  LuSearch,
  LuSparkles,
  LuStar,
  LuUsers,
  LuX,
} from 'react-icons/lu';

interface PerformanceHighlightsClientProps {
  performances: Performance[];
}

const ARTIST_THEME_PALETTES = [
  {
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    hoverBorder: 'hover:border-cyan-500/35',
    hoverBg: 'hover:bg-cyan-500/10',
    badge: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
  },
  {
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    hoverBorder: 'hover:border-violet-500/35',
    hoverBg: 'hover:bg-violet-500/10',
    badge: 'border-violet-500/20 bg-violet-500/10 text-violet-400',
  },
  {
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    hoverBorder: 'hover:border-amber-500/35',
    hoverBg: 'hover:bg-amber-500/10',
    badge: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
  },
  {
    text: 'text-rose-400',
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/5',
    hoverBorder: 'hover:border-rose-500/35',
    hoverBg: 'hover:bg-rose-500/10',
    badge: 'border-rose-500/20 bg-rose-500/10 text-rose-400',
  },
  {
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    hoverBorder: 'hover:border-emerald-500/35',
    hoverBg: 'hover:bg-emerald-500/10',
    badge: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
  },
];

// Helpers for dynamic styling based on artist name
function getArtistTheme(name: string) {
  if (!name) return ARTIST_THEME_PALETTES[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % ARTIST_THEME_PALETTES.length;
  return ARTIST_THEME_PALETTES[index];
}

function getCircuitSubtitle(title: string): string {
  const lower = title.toLowerCase();
  if (
    lower.includes('hotel') ||
    lower.includes('luxury') ||
    lower.includes('premium')
  ) {
    return 'Corporate • Luxury Hospitality • Premium Live Events • Destination Music Performances';
  }
  if (
    lower.includes('club') ||
    lower.includes('urban') ||
    lower.includes('circuit')
  ) {
    return 'Urban/ Modern Live Music • Commercial Club Circuit • Contemporary Performance Spaces';
  }
  if (lower.includes('festival') || lower.includes('cultural')) {
    return 'Large Audience Cultural Performances • Festival Touring Circuit';
  }
  if (
    lower.includes('institution') ||
    lower.includes('college') ||
    lower.includes('campus')
  ) {
    return 'Youth Audience • Institutional Engagement • Campus Concerts';
  }
  return 'Live Performance Circuit';
}

// Helpers for dynamic styling based on category title
function getCategoryTheme(title: string) {
  const lower = title.toLowerCase();
  if (
    lower.includes('hotel') ||
    lower.includes('luxury') ||
    lower.includes('premium')
  ) {
    return {
      themeColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
      icon: LuStar,
    };
  }
  if (
    lower.includes('club') ||
    lower.includes('urban') ||
    lower.includes('circuit')
  ) {
    return {
      themeColor: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
      icon: LuMusic,
    };
  }
  if (lower.includes('festival') || lower.includes('cultural')) {
    return {
      themeColor: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
      icon: LuSparkles,
    };
  }
  if (
    lower.includes('institution') ||
    lower.includes('college') ||
    lower.includes('campus')
  ) {
    return {
      themeColor: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
      icon: LuUsers,
    };
  }
  return {
    themeColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    icon: LuStar,
  };
}

export default function PerformanceHighlightsClient({
  performances,
}: PerformanceHighlightsClientProps) {
  const [selectedYear, setSelectedYear] = useState<string | number>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedArtistFilter, setSelectedArtistFilter] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 1. Mapped artists list
  const artists = useMemo(() => {
    const artistsMap = new Map<string, Artist>();
    performances.forEach((p) => {
      if (
        p.artist &&
        p.artist._id &&
        !artistsMap.has(p.artist._id) &&
        !p.artist.hidden
      ) {
        artistsMap.set(p.artist._id, p.artist);
      }
    });
    return Array.from(artistsMap.values()).sort(
      (a, b) => (a._o || 0) - (b._o || 0)
    );
  }, [performances]);

  // 2. Mapped categories/circuits list
  const categories = useMemo(() => {
    const circuitsMap = new Map<string, Set<string>>();
    performances.forEach((p) => {
      if (p.circuit && p.venue) {
        if (!circuitsMap.has(p.circuit)) {
          circuitsMap.set(p.circuit, new Set());
        }
        const placeName = p.city ? `${p.venue}, ${p.city}` : p.venue;
        circuitsMap.get(p.circuit)!.add(placeName);
      }
    });
    return Array.from(circuitsMap.entries()).map(([title, placesSet]) => ({
      title,
      subtitle: getCircuitSubtitle(title),
      places: Array.from(placesSet),
    }));
  }, [performances]);

  // 3. Mapped timeline list and associated statistics/years
  const { timeline, years, touringYearsRange, timelineArtists } =
    useMemo(() => {
      const yearsSet = new Set<number>();

      const list = performances.map((p) => {
        const dateArray = Array.isArray(p.date)
          ? p.date
          : [p.date].filter(Boolean);
        let year = 2026;
        let dateFormatted = '';

        if (dateArray.length > 0) {
          const sortedDates = [...dateArray].sort();
          const firstDateStr = sortedDates[0];
          const lastDateStr = sortedDates[sortedDates.length - 1];

          const firstDateObj = new Date(firstDateStr);
          year = firstDateObj.getFullYear() || 2026;

          const formatOptions: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
          };

          if (sortedDates.length === 1) {
            try {
              dateFormatted = firstDateObj.toLocaleDateString(
                'en-US',
                formatOptions
              );
            } catch {
              dateFormatted = firstDateStr;
            }
          } else {
            try {
              const firstFormatted = firstDateObj.toLocaleDateString(
                'en-US',
                formatOptions
              );
              const lastFormatted = new Date(lastDateStr).toLocaleDateString(
                'en-US',
                formatOptions
              );
              dateFormatted = `${firstFormatted} – ${lastFormatted}`;
            } catch {
              dateFormatted = `${firstDateStr} – ${lastDateStr}`;
            }
          }
        }

        yearsSet.add(year);

        return {
          date: dateFormatted || 'May 30',
          year,
          artist: p.artist?.name || '',
          location: p.state
            ? `${p.city}, ${p.state}, ${p.country}`
            : `${p.city}, ${p.country}`,
          venue: p.venue || null,
          details: p.details || null,
        };
      });

      const uniqueYears = Array.from(yearsSet);
      const sortedYears = ['All', ...uniqueYears.sort((a, b) => b - a)];

      let touringRange = 'N/A';
      if (uniqueYears.length > 0) {
        const minYear = Math.min(...uniqueYears);
        const maxYear = Math.max(...uniqueYears);
        touringRange =
          minYear === maxYear ? `${minYear}` : `${minYear} – ${maxYear}`;
      }

      // Sort existing non-hidden artists by name for the dropdown filter list
      const artistsSortedNames = artists
        .map((a) => a.name)
        .sort((a, b) => a.localeCompare(b));

      return {
        timeline: list,
        years: sortedYears,
        touringYearsRange: touringRange,
        timelineArtists: artistsSortedNames,
      };
    }, [performances, artists]);

  const totalShowsCount = timeline.length;

  // Dynamically identify regional hubs / countries from show locations
  const hubsCovered = useMemo(() => {
    const countries = new Set<string>();
    countries.add('India'); // Default
    performances.forEach((p) => {
      if (p.country) {
        const countryTrimmed = p.country.trim();
        if (countryTrimmed) {
          countries.add(countryTrimmed);
        }
      }
    });
    return Array.from(countries).join(', ');
  }, [performances]);

  const categoriesCount = `${categories.length} Key Segments`;

  // Dynamically compute Geographic Performance Reach details in a single pass
  const { primaryLocations, statesData, internationalTours } = useMemo(() => {
    const cityCounts = new Map<string, number>();
    const statesSet = new Set<string>();
    const tourSet = new Set<string>();

    performances.forEach((p) => {
      const isIndia = !p.country || p.country.toLowerCase() === 'india';

      if (p.city && isIndia) {
        const city = p.city.trim();
        cityCounts.set(city, (cityCounts.get(city) || 0) + 1);
      }

      if (p.state && isIndia) {
        statesSet.add(p.state.trim());
      }

      if (p.country && !isIndia) {
        const year = p.date?.[0] ? p.date[0].split('-')[0] : '';
        const entry = `${p.country}${p.city ? ` — ${p.city}` : ''}${year ? ` (${year})` : ''}`;
        tourSet.add(entry);
      }
    });

    const primaryLocs = Array.from(cityCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([city]) => city)
      //.slice(0, 6)
      .join(', ');

    return {
      primaryLocations: primaryLocs,
      statesData: {
        count: statesSet.size,
        list: Array.from(statesSet).join(', '),
      },
      internationalTours: Array.from(tourSet).join(', '),
    };
  }, [performances]);

  // Filter shows based on search query, year and artist select
  const filteredShows = useMemo(() => {
    return timeline.filter((show) => {
      const matchesYear =
        selectedYear === 'All' || show.year === Number(selectedYear);

      const query = debouncedSearchQuery.toLowerCase();
      const matchesSearch =
        show.location.toLowerCase().includes(query) ||
        (show.venue && show.venue.toLowerCase().includes(query)) ||
        (show.details && show.details.toLowerCase().includes(query)) ||
        show.artist.toLowerCase().includes(query);

      const matchesArtist =
        selectedArtistFilter === 'All' ||
        show.artist.toLowerCase().includes(selectedArtistFilter.toLowerCase());

      return matchesYear && matchesSearch && matchesArtist;
    });
  }, [timeline, selectedYear, debouncedSearchQuery, selectedArtistFilter]);

  return (
    <PageLayout
      title="Performance Highlights"
      subtitle="Live Performance Portfolio, Tour History & Professional Stage Metrics Across Events & Festivals."
      variant="plain"
    >
      <div className="flex flex-col gap-16 text-left">
        {/* ==========================================
            SECTION 1: ARTIST PROFILE OVERVIEW
           ========================================== */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <LuGuitar className="h-4.5 w-4.5 text-cyan-400" />
                <span className="text-[10px] font-black tracking-widest text-cyan-200 uppercase">
                  Performing Artist
                </span>
              </div>
              <h2 className="font-heading text-3xl font-black text-white sm:text-4xl">
                Artist Profile
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              Shuvam Raha is a versatile live guitarist and performing musician
              with extensive experience across premium hospitality venues,
              cultural festivals, club circuits, corporate events, interstate
              touring productions, and institutional concerts.
            </p>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              He has collaborated with multiple established artists and live
              acts including Priyanka Das Raha, Antara Nandy &amp; Ankita Nandy
              (Nandy Sisters), and Kanishk Arora across {totalShowsCount}+ live
              performances during the {touringYearsRange} touring season.
            </p>
          </div>

          {/* Quick Metrics Snapshots */}
          <div className="grid w-full shrink-0 grid-cols-2 gap-4 lg:max-w-[420px]">
            {[
              {
                label: 'Touring Years',
                value: touringYearsRange,
                icon: LuCalendarDays,
                color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
              },
              {
                label: 'Shows Performed',
                value: totalShowsCount + '+ Gigs',
                icon: LuSparkles,
                color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
              },
              {
                label: 'Regional Hubs',
                value: hubsCovered,
                icon: LuGlobe,
                color:
                  'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
              },
              {
                label: 'Circuits Covered',
                value: categoriesCount,
                icon: LuCompass,
                color: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
              },
            ].map((metric, idx) => {
              const MetricIcon = metric.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.01] p-4.5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.03]"
                >
                  <div
                    className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border ${metric.color} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                  >
                    <MetricIcon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                    {metric.label}
                  </h4>
                  <p className="font-heading mt-1 text-sm font-black text-white sm:text-base">
                    {metric.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="border-white/5" />

        {/* ==========================================
            SECTION 2: GEOGRAPHIC REACH
           ========================================== */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              Touring History
            </span>
            <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Geographic Performance Reach
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                Strong Regional Hubs
              </span>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  Primary Locations
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">
                  {primaryLocations || 'Kolkata, Siliguri, Guwahati'}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-violet-400 uppercase">
                Interstate Touring
              </span>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  {statesData.count} States Covered
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">
                  {statesData.list || 'No interstate tours listed'}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-emerald-400 uppercase">
                International Tours
              </span>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  Global Concerts
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">
                  {internationalTours || 'No international tours listed'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* ==========================================
            SECTION 3: COLLABORATION MATRIX
           ========================================== */}
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              On Stage Partnering
            </span>
            <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Artist Collaboration Matrix
            </h3>
          </div>

          {artists.length === 0 ? (
            <p className="text-sm text-gray-500">
              No collaborators loaded from CMS.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {artists.map((collab, idx) => {
                const theme = getArtistTheme(collab.name);
                return (
                  <div
                    key={idx}
                    className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${theme.border} ${theme.bg} ${theme.hoverBorder} ${theme.hoverBg}`}
                  >
                    {/* Render Artist image from Cockpit if available */}
                    {collab.image && (
                      <div className="relative mb-5 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <CockpitImage
                          asset={collab.image}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <h4 className="font-heading text-lg leading-snug font-black text-white transition-colors duration-300 group-hover:text-cyan-300">
                        {collab.name}
                      </h4>

                      {collab.description && (
                        <p className="line-clamp-3 text-xs leading-relaxed text-gray-400">
                          {collab.description}
                        </p>
                      )}

                      <div className="space-y-3 border-t border-white/5 pt-3">
                        <div>
                          <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                            Performance Formats
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">
                            {collab.formats}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <hr className="border-white/5" />

        {/* ==========================================
            SECTION 4: VENUE CATEGORIES
           ========================================== */}
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              Venues Database
            </span>
            <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Venue &amp; Performance Categories
            </h3>
          </div>

          {categories.length === 0 ? (
            <p className="text-sm text-gray-500">
              No venue categories loaded from CMS.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {categories.map((cat, idx) => {
                const theme = getCategoryTheme(cat.title);
                const Icon = theme.icon;
                return (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0A0A15]/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:bg-[#0E0E22]/60"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${theme.themeColor} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="font-heading text-base font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                            {cat.title}
                          </h4>
                          {/* <span className="mt-1 block text-[10px] leading-relaxed font-bold tracking-wide text-gray-500">
                            {cat.subtitle}
                          </span> */}
                        </div>

                        <ul className="grid grid-cols-1 gap-1.5 border-t border-white/5 pt-4 sm:grid-cols-2">
                          {cat.places &&
                            cat.places.map((place, itemIdx) => (
                              <li
                                key={itemIdx}
                                className="flex items-center gap-1.5 text-[11px] leading-relaxed text-gray-400 sm:text-xs"
                              >
                                <span className="h-1 w-1 shrink-0 rounded-full bg-cyan-400/60" />
                                <span className="line-clamp-1">{place}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <hr className="border-white/5" />

        {/* ==========================================
            SECTION 5: LIVE SHOWS TIMELINE
           ========================================== */}
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Gigs Archive
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                Showcase Gigs Timeline
              </h3>
            </div>

            {/* Filter Pills for Gigs Years */}
            <div className="flex flex-wrap gap-1.5">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`rounded-full px-4.5 py-1.5 text-[11px] font-black tracking-wider uppercase transition-all duration-300 ${
                    selectedYear === year
                      ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                      : 'border border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/15 hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Filters Bar: Search & Artist Select Filters */}
          <div className="grid grid-cols-1 gap-4 rounded-full border border-white/5 bg-[#080812]/50 p-4.5 backdrop-blur-3xl md:grid-cols-3">
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
                <LuSearch className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search by city, venue, or detail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/[0.02] py-2.5 pr-10 pl-10 text-xs text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-4 flex cursor-pointer items-center text-gray-500 transition-colors hover:text-white"
                  aria-label="Clear search"
                >
                  <LuX className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Artist Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedArtistFilter}
                onChange={(e) => setSelectedArtistFilter(e.target.value)}
                className="w-full appearance-none rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs text-white transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04]"
              >
                <option value="All" className="bg-[#05050A] text-gray-300">
                  Filter by Collaborator: All
                </option>
                {timelineArtists.map((artistName) => (
                  <option
                    key={artistName}
                    value={artistName}
                    className="bg-[#05050A] text-gray-300"
                  >
                    {artistName}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[9px] font-black tracking-widest text-gray-400 uppercase">
                ▼
              </div>
            </div>
          </div>

          {/* Vertical Timeline Lists */}
          {filteredShows.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#080812]/30 py-16 text-center">
              <LuSearch className="mb-3 h-8 w-8 animate-pulse text-gray-600" />
              <p className="text-sm text-gray-500">
                No performances match your current search options.
              </p>
            </div>
          ) : (
            <div className="relative ml-2 space-y-6 border-l border-white/10 pl-6">
              {filteredShows.map((show, idx) => {
                const artistTheme = getArtistTheme(show.artist);
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col gap-2 rounded-2xl border border-white/[0.03] bg-white/[0.01] p-4.5 transition-all duration-300 hover:border-cyan-500/15 hover:bg-[#0E0E22]/30"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute top-[22px] -left-[31px] flex h-2 w-2 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)] transition-transform duration-300 group-hover:scale-125" />

                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                      <span className="font-heading text-xs font-bold text-gray-400">
                        {show.date}, {show.year}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${artistTheme.badge}`}
                      >
                        {show.artist}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 pt-1 text-sm leading-snug font-bold text-white sm:text-base">
                      <LuMapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      <div>
                        <span>
                          {show.venue ? `${show.venue}, ` : ''}
                          {show.location}
                        </span>
                        {show.details && (
                          <span className="mt-1 block text-xs leading-relaxed font-medium text-gray-400 italic sm:text-sm">
                            ({show.details})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ==========================================
            SECTION 6: CTA CALL
           ========================================== */}
        <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-[#0A0A15]/60 p-8 text-center shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 sm:p-10">
          <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-violet-500/10 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <h4 className="font-heading text-2xl leading-tight font-black text-white sm:text-3xl">
              Book Shuvam Raha for Live Gigs
            </h4>
            <p className="max-w-xl text-xs leading-relaxed text-gray-400 sm:text-sm">
              Inquire about booking Shuvam Raha as a session guitarist,
              performer for corporate events, destination weddings, cultural
              festivals, or lounge gig bookings.
            </p>

            <div className="mt-4 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/918961369468?text=Hi%20Shuvam,%20I%27m%20interested%20in%20booking%20you%20for%20a%20live%20show!"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-heading flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 sm:text-sm"
              >
                Inquire via WhatsApp
              </a>
              <Link
                href="/contact"
                className="group font-heading flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95 sm:text-sm"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
