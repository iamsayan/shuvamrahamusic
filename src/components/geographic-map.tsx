'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

interface LocationInput {
  name: string;
  state?: string;
  count: number;
  country: string;
}

interface Pin {
  name: string;
  lat: number;
  lon: number;
  count: number;
  type: 'hub' | 'tour' | 'intl';
}

const STATIC_COORDS: Record<string, { lat: number; lon: number }> = {
  guwahati: { lat: 26.1805978, lon: 91.753943 },
  kolkata: { lat: 22.5726459, lon: 88.3638953 },
  gangtok: { lat: 27.329046, lon: 88.6122673 },
  kalimpong: { lat: 27.0702869, lon: 88.4723676 },
  darjeeling: { lat: 27.0377554, lon: 88.263176 },
  bhubaneswar: { lat: 20.2602964, lon: 85.8394521 },
  varanasi: { lat: 25.3356491, lon: 83.0076292 },
  chennai: { lat: 13.0836939, lon: 80.270186 },
  siliguri: { lat: 26.7164127, lon: 88.4309916 },
  raipur: { lat: 21.2380912, lon: 81.6336993 },
  rourkela: { lat: 22.2309255, lon: 84.8678705 },
  jalpaiguri: { lat: 26.6262805, lon: 88.7334485 },
  kurseong: { lat: 26.8818268, lon: 88.2783637 },
  'dinhata, cooch behar': { lat: 26.1238376, lon: 89.4680986 },
  dinhata: { lat: 26.1238376, lon: 89.4680986 },
  midnapore: { lat: 22.4207025, lon: 87.3269963 },
  ranaghat: { lat: 23.1738124, lon: 88.563677 },
  malda: { lat: 25.0057449, lon: 88.1398483 },
  kalna: { lat: 23.2211183, lon: 88.3591889 },
  naihati: { lat: 22.8866078, lon: 88.424196 },
  halisahar: { lat: 22.9322475, lon: 88.4248587 },
  durgapur: { lat: 23.5350475, lon: 87.3380425 },
  indore: { lat: 22.7203616, lon: 75.8681996 },
  'cooch behar': { lat: 26.2559197, lon: 89.4201143 },
  dhanbad: { lat: 23.7952809, lon: 86.4309638 },
  'purba medinipur': { lat: 22.0648451, lon: 87.8377586 },
  chandigarh: { lat: 30.7686399, lon: 76.5750483 },
  kolaghat: { lat: 22.4404312, lon: 87.8191567 },
  bardhaman: { lat: 23.2495714, lon: 87.8681751 },
  thiruvananthapuram: { lat: 8.4882267, lon: 76.947551 },
  kochi: { lat: 9.9679032, lon: 76.2444378 },
  maynaguri: { lat: 26.5652519, lon: 88.8221321 },
  lucknow: { lat: 26.8381, lon: 80.9346001 },
  bhopal: { lat: 23.2584857, lon: 77.401989 },
  hooghly: { lat: 22.9099402, lon: 88.0120825 },
  mandarmani: { lat: 21.6647646, lon: 87.7053427 },
  tinsukia: { lat: 27.4879722, lon: 95.3601855 },
  gangarampur: { lat: 25.4070884, lon: 88.516124 },
  digha: { lat: 21.623077, lon: 87.5082534 },
  'new town': { lat: 22.5882834, lon: 88.4734476 },
  newtown: { lat: 26.2558625, lon: 88.1868134 },
  dooars: { lat: 26.7095409, lon: 88.4340147 },
  suri: { lat: 23.9080538, lon: 87.5277255 },
  keonjhar: { lat: 21.5, lon: 85.5 },
  kalyani: { lat: 22.9749723, lon: 88.4345915 },
  bangalore: { lat: 12.9767936, lon: 77.590082 },
  surat: { lat: 21.2094892, lon: 72.8317058 },
  ranchi: { lat: 23.3700501, lon: 85.3250387 },
  jamshedpur: { lat: 22.8015194, lon: 86.2029579 },
  itahari: { lat: 26.6622505, lon: 87.2748964 },
  nepal: { lat: 26.6622505, lon: 87.2748964 },
  'nepal (itahari)': { lat: 26.6622505, lon: 87.2748964 },
  'salt lake sector v': { lat: 22.5809434, lon: 88.4290872 },
  bilaspur: { lat: 22.1638486, lon: 82.1365923 },
  jharkhand: { lat: 23.3104522, lon: 85.2748774 },
  amritsar: { lat: 31.6356659, lon: 74.8787496 },
};

interface GeographicMapProps {
  locations?: LocationInput[];
}

export default function GeographicMap({ locations = [] }: GeographicMapProps) {
  const [hoveredPin, setHoveredPin] = useState<Pin | null>(null);
  const [resolvedCoords, setResolvedCoords] = useState<
    Record<string, { lat: number; lon: number }>
  >({});

  // 1. Load coordinates from cache or localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('shuvam_geocoded_cache');
      if (cached) {
        setResolvedCoords(JSON.parse(cached));
      }
    } catch (e) {
      console.error('Failed to parse geocoding cache:', e);
    }
  }, []);

  // 2. Rate-limited geocoding effect for any dynamic locations missing coordinates
  useEffect(() => {
    const missingLocations = locations.filter((loc) => {
      const key = loc.name.toLowerCase().trim();
      return !STATIC_COORDS[key] && !resolvedCoords[key];
    });

    if (missingLocations.length === 0) return;

    let isSubscribed = true;
    const cacheUpdate: Record<string, { lat: number; lon: number }> = {
      ...resolvedCoords,
    };

    // Function to run sequential requests with a 1.2 second delay to satisfy Nominatim TOS
    const geocodeQueue = async () => {
      for (const loc of missingLocations) {
        if (!isSubscribed) break;
        const key = loc.name.toLowerCase().trim();

        // Construct a highly descriptive query utilizing city, state (if present), and country
        const queryParts = [loc.name];
        if (loc.state) queryParts.push(loc.state);
        if (loc.country) queryParts.push(loc.country);
        const query = queryParts.join(', ');

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
            {
              headers: {
                'User-Agent':
                  'ShuvamRahaMusicTourMap/1.0 (sayan@shuvamrahamusic.com)',
              },
            }
          );

          if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
              const lat = parseFloat(data[0].lat);
              const lon = parseFloat(data[0].lon);

              if (!isNaN(lat) && !isNaN(lon)) {
                cacheUpdate[key] = { lat, lon };
                if (isSubscribed) {
                  setResolvedCoords({ ...cacheUpdate });
                  localStorage.setItem(
                    'shuvam_geocoded_cache',
                    JSON.stringify(cacheUpdate)
                  );
                }
              }
            } else {
              // Fallback to city name only if city+state+country query yields no results
              const fallbackRes = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(loc.name)}&format=json&limit=1`,
                {
                  headers: {
                    'User-Agent':
                      'ShuvamRahaMusicTourMap/1.0 (sayan@shuvamrahamusic.com)',
                  },
                }
              );
              if (fallbackRes.ok) {
                const fallbackData = await fallbackRes.json();
                if (fallbackData && fallbackData.length > 0) {
                  const lat = parseFloat(fallbackData[0].lat);
                  const lon = parseFloat(fallbackData[0].lon);
                  if (!isNaN(lat) && !isNaN(lon)) {
                    cacheUpdate[key] = { lat, lon };
                    if (isSubscribed) {
                      setResolvedCoords({ ...cacheUpdate });
                      localStorage.setItem(
                        'shuvam_geocoded_cache',
                        JSON.stringify(cacheUpdate)
                      );
                    }
                  }
                }
              }
            }
          }
        } catch (err) {
          console.error(`Geocoding failed for: ${query}`, err);
        }

        // Delay next request by 1.2 seconds to prevent rate-limiting blocks
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    };

    geocodeQueue();

    return () => {
      isSubscribed = false;
    };
  }, [locations, resolvedCoords]);

  // 3. Process inputs into map pins using geographic mapping formulas
  const pins: Pin[] = locations
    .map((loc) => {
      const key = loc.name.toLowerCase().trim();
      const coord = STATIC_COORDS[key] || resolvedCoords[key];
      if (!coord) return null;

      const isIndia = loc.country.toLowerCase() === 'india';
      const isHub = loc.count >= 4;

      return {
        name: loc.name,
        lat: coord.lat,
        lon: coord.lon,
        count: loc.count,
        type: !isIndia ? 'intl' : isHub ? 'hub' : 'tour',
      } as Pin;
    })
    .filter(Boolean) as Pin[];

  return (
    <div className="group relative flex min-h-[400px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/5 bg-[#0A0A16]/60 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20">
      <div className="pointer-events-none absolute -top-10 -left-10 size-32 rounded-full bg-cyan-500/5 blur-2xl" />

      <div className="relative z-10 mb-4 flex flex-col gap-1.5">
        <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
          Live Footprint
        </span>
        <h4 className="font-heading text-lg font-extrabold text-white sm:text-xl">
          Visual Performance Map
        </h4>
        <p className="text-xs text-gray-500">
          Hover over the nodes to explore performance cities mapped dynamically
          from the database.
        </p>
      </div>

      {/* Map Graphic Container */}
      <div className="relative flex min-h-[300px] w-full flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/40">
        {/* Legend indicator (placed outside scaled wrapper) */}
        <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-1 rounded-xl border border-white/5 bg-[#080812]/90 p-3 text-[9px] font-bold tracking-wider uppercase backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-cyan-400" />
            <span className="text-[8px] text-gray-400 sm:text-[9px]">
              Hubs (4+ shows)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-violet-400" />
            <span className="text-[8px] text-gray-400 sm:text-[9px]">
              Tour Cities
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="text-[8px] text-gray-400 sm:text-[9px]">
              International
            </span>
          </div>
        </div>

        {/* Aspect container keeping map centered (scaled to zoom in and crop gaps) */}
        <div className="relative aspect-square w-full origin-center scale-[1.4]">
          <Image
            src="/india_map.png"
            alt="India and South Asia Outline Map"
            fill
            sizes="(max-width: 768px) 100vw, 460px"
            className="object-contain opacity-55 transition-opacity duration-300 group-hover:opacity-70"
            priority
          />

          {/* Glowing pins */}
          {pins.map((pin, idx) => {
            const isHovered = hoveredPin?.name === pin.name;
            const dotColorClass =
              pin.type === 'hub'
                ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.7)]'
                : pin.type === 'intl'
                  ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                  : 'bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.7)]';

            const pingColorClass =
              pin.type === 'hub'
                ? 'bg-cyan-400'
                : pin.type === 'intl'
                  ? 'bg-emerald-400'
                  : 'bg-violet-400';

            // Mapping GPS coordinates to outline map pixels
            // Clamped between 2% and 98% to always stay safely inside map boundaries
            const left = Math.max(2, Math.min(98, 2.76 * pin.lon - 176.1));
            const top = Math.max(2, Math.min(98, 116.68 - 2.75 * pin.lat));

            return (
              <div
                key={idx}
                className={`absolute flex size-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center ${
                  isHovered ? 'z-40' : 'z-20'
                }`}
                style={{ top: `${top}%`, left: `${left}%` }}
                onMouseEnter={() => setHoveredPin(pin)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                {/* Pulsing ring */}
                <span
                  className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${pingColorClass}`}
                />
                {/* Center dot */}
                <span
                  className={`relative inline-flex size-2 rounded-full ${dotColorClass}`}
                />

                {/* Pin Tooltip */}
                {isHovered && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 pointer-events-none absolute bottom-6 left-1/2 z-30 min-w-[130px] -translate-x-1/2 rounded-xl border border-cyan-500/30 bg-[#080812] px-3 py-1.5 text-left text-white shadow-2xl backdrop-blur-md duration-200">
                    <p className="font-heading text-[10px] leading-tight font-extrabold whitespace-nowrap text-cyan-400 uppercase">
                      {pin.name}
                    </p>
                    <p className="mt-0.5 text-[9px] leading-normal whitespace-nowrap text-gray-400">
                      {pin.count} {pin.count === 1 ? 'Show' : 'Shows'} Performed
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
