'use client';

import Image from 'next/image';

interface Brand {
  name: string;
  logo: string;
  width: number;
  height: number;
  filterClass: string;
}

const BRANDS: Brand[] = [
  {
    name: 'Laney Amplification',
    logo: '/laney_New.png',
    width: 140,
    height: 50,
    // Laney is already white-on-black, so we only control opacity to blend it seamlessly
    filterClass: 'opacity-60 transition-all duration-300 hover:opacity-100',
  },
  {
    name: 'Landscape',
    logo: '/LANDSCAPE.png',
    width: 160,
    height: 50,
    // Turn Furtados into a flat white logo by default, showing its red brand color on hover
    filterClass: 'opacity-60 brightness-0 invert transition-all duration-300 hover:opacity-100 hover:brightness-100 hover:invert-0',
  },
];

// Duplicate the list of brands for smooth, continuous looping in marquee mode
const MARQUEE_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

interface BrandEndorsementsProps {
  layout?: 'marquee' | 'grid' | 'compact';
  title?: string;
  className?: string;
}

export default function BrandEndorsements({
  layout = 'marquee',
  title,
  className = '',
}: BrandEndorsementsProps) {
  const defaultTitle =
    layout === 'grid' ? 'Official Endorsements & Partners' : 'Endorsed By';

  if (layout === 'grid') {
    return (
      <div className={`space-y-6 ${className}`}>
        {title !== '' && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              Brand Relations
            </span>
            <h3 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
              {title || defaultTitle}
            </h3>
          </div>
        )}

        <div className="group/card relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A15]/60 p-6 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-cyan-500/20 sm:p-8">
          <div className="pointer-events-none absolute -top-10 -left-10 size-32 rounded-full bg-cyan-500/5 blur-2xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-10 size-32 rounded-full bg-violet-500/5 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-6">
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
              Shuvam is associated with leading music brands through artist
              collaborations and endorsement programs, reflecting his commitment
              to professional sound quality, performance excellence, and music
              education.
            </p>

            <div className="grid grid-cols-2 items-center gap-4 w-full">
              {BRANDS.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex h-20 items-center justify-center rounded-2xl border border-white/5 bg-white/1 p-4 transition-all duration-300 hover:scale-105 hover:border-cyan-500/20 hover:bg-white/2"
                  title={brand.name}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={brand.width}
                    height={brand.height}
                    className={`h-10 w-auto object-contain ${brand.filterClass}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'compact') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 py-4 text-center ${className}`}
      >
        {title !== '' && (
          <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
            {title || 'Official Endorsements'}
          </span>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="relative transition-transform hover:scale-105"
              title={brand.name}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className={`h-8 w-auto object-contain ${brand.filterClass}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default layout: marquee
  return (
    <div className={`w-full overflow-hidden py-6 ${className}`}>
      <div className="mx-auto w-full max-w-350 px-5 md:px-12 lg:px-20">
        {title !== '' && (
          <div className="mb-4 text-center">
            <span className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">
              {title || 'Official Brand Endorsements'}
            </span>
          </div>
        )}

        {/* Marquee Wrapper with fade gradients on sides */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/1 py-4 md:py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#05050A] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#05050A] to-transparent" />

          <div className="marquee-container flex overflow-x-hidden whitespace-nowrap">
            {/* Track 1 */}
            <div className="animate-marquee-left flex shrink-0 items-center justify-around gap-16 pr-16">
              {MARQUEE_BRANDS.map((brand, idx) => (
                <div
                  key={`t1-${idx}`}
                  className="inline-block transition-all duration-300 hover:scale-105"
                  title={brand.name}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={brand.width}
                    height={brand.height}
                    className={`h-10 w-auto object-contain ${brand.filterClass}`}
                  />
                </div>
              ))}
            </div>

            {/* Track 2 (Cloned for seamless infinite scroll) */}
            <div
              className="animate-marquee-left flex shrink-0 items-center justify-around gap-16 pr-16"
              aria-hidden="true"
            >
              {MARQUEE_BRANDS.map((brand, idx) => (
                <div
                  key={`t2-${idx}`}
                  className="inline-block transition-all duration-300 hover:scale-105"
                  title={brand.name}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={brand.width}
                    height={brand.height}
                    className={`h-10 w-auto object-contain ${brand.filterClass}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
