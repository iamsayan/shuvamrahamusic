'use client';

import React, { useState } from 'react';
import { FaAmazon } from 'react-icons/fa6';
import {
  LuCheck,
  LuExternalLink,
  LuInfo,
  LuSearch,
  LuStar,
  LuX,
  LuSparkles
} from 'react-icons/lu';

interface ProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  amazonUrl: string;
  imageUrl: string;
  priceRange: string;
  badge?: string;
  rating: number;
  reviewCount: string;
  instructorNotes: string;
}

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

const THEME_PALETTE: Theme[] = [
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
];

const PRODUCTS: ProductItem[] = [
  {
    id: 'yamaha-pacifica-112v',
    title: 'Yamaha Pacifica PAC112V Electric Guitar',
    category: 'Guitars',
    description: 'The gold standard beginner-to-intermediate electric guitar featuring an alder body, maple neck, and HSS pickup configuration.',
    features: [
      'Solid Alder Body',
      'Maple Neck with Rosewood Fretboard',
      'Humbucker & 2 Single-Coil Pickups (HSS)',
      'Push-Pull Coil Split on Tone Knob'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B0002H055E',
    imageUrl: 'https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=600',
    priceRange: 'Under ₹25,000 / $300',
    badge: 'Best Starter',
    rating: 4.8,
    reviewCount: '1.2k+',
    instructorNotes: 'I always recommend the Pacifica for students starting their electric guitar journey. Its slim neck profile makes it highly comfortable for smaller hands, and the humbucker pickup provides a fat tone for rock and metal solos.'
  },
  {
    id: 'fender-squier-classic-vibe-60s',
    title: 'Fender Squier Classic Vibe \'60s Stratocaster',
    category: 'Guitars',
    description: 'A vintage-voiced tribute to the 1960s Stratocaster, packing incredible classic tone, playability, and aesthetics.',
    features: [
      '100% Fender-Designed Alnico Pickups',
      'Slim "C"-Shaped Maple Neck Gloss',
      'Vintage-Style Tremolo Bridge',
      'Period-Correct Headstock Markings'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B07N2B2G1F',
    imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=600',
    priceRange: 'Mid-Range',
    badge: 'Pro Pick',
    rating: 4.9,
    reviewCount: '650+',
    instructorNotes: 'The Classic Vibe series punches way above its weight class. The alnico single-coils capture that authentic 60s Strat chime. Perfect for blues, funk, and classic rock players who want premium feel on a budget.'
  },
  {
    id: 'yamaha-fs80c-acoustic',
    title: 'Yamaha FS80C Concert Cutaway Acoustic Guitar',
    category: 'Guitars',
    description: 'A concert-bodied acoustic guitar featuring excellent build quality and loud, resonance acoustic tone.',
    features: [
      'Concert Body Cutaway for easy fret access',
      'Spruce Top with Matte Finish',
      'Comfortable Thin Neck Profile',
      'Durable Mahogany Back & Sides'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B0868J2QG1',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600',
    priceRange: 'Under ₹10,000 / $120',
    badge: 'Best Budget',
    rating: 4.7,
    reviewCount: '4.8k+',
    instructorNotes: 'This is the ultimate entry-level acoustic guitar. The concert body size is slightly smaller than a dreadnought, making it highly comfortable to hold for long practice sessions, especially for younger players.'
  },
  {
    id: 'line6-pod-go',
    title: 'Line 6 POD Go Multi-Effects Processor',
    category: 'Pedals & Effects',
    description: 'A comprehensive tone-creation pedalboard packing professional HX-grade amp modeling and effects.',
    features: [
      'Best-in-class HX Amp and Effect models',
      '4.3-inch Color LCD Display',
      'Lightweight, Compact Portable Design',
      'Built-in Expression Pedal'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B085897T94',
    imageUrl: 'https://images.unsplash.com/photo-1598112972224-b52ec2466a9f?q=80&w=600',
    priceRange: 'Premium',
    badge: 'Must Have',
    rating: 4.8,
    reviewCount: '480+',
    instructorNotes: 'If you want to access thousands of legendary amplifiers, cabinets, and delay/reverb effects without carrying heavy gear, this is the ultimate solution. I use Helix-grade modeling daily for recording reels and gigging.'
  },
  {
    id: 'boss-ds1-distortion',
    title: 'Boss DS-1 Distortion Effects Pedal',
    category: 'Pedals & Effects',
    description: 'The legendary, classic orange distortion pedal that shaped the sound of rock, grunge, and punk guitar solos.',
    features: [
      'Classic Orange Metal Chassis',
      'Level, Tone, and Distortion Controls',
      'Solid and Reliable Analog Circuitry',
      'Buffered Bypass System'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B0002CZV82',
    imageUrl: 'https://images.unsplash.com/photo-1614798228983-9dd8dad4775d?q=80&w=600',
    priceRange: 'Under ₹6,000 / $80',
    badge: 'Legendary',
    rating: 4.8,
    reviewCount: '3.5k+',
    instructorNotes: 'The first pedal every electric guitarist should own. Used by Kurt Cobain, Joe Satriani, and John Frusciante. It delivers everything from mild grit to heavy, screaming rock solos.'
  },
  {
    id: 'boss-katana-50-mk2',
    title: 'Boss Katana-50 MkII Combo Amplifier',
    category: 'Amps & Cabinets',
    description: 'A powerhouse stage-ready 50-watt combo amp with five unique amp characters, custom effects, and power control.',
    features: [
      '50-Watt Power with 12-inch Custom Speaker',
      'Five Amp Characters: Clean, Crunch, Lead, Brown, Acoustic',
      'Over 60 Customizable Boss Effects via Tone Studio',
      'Power Attenuator (0.5W, 25W, 50W)'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B07Y2P6P9R',
    imageUrl: 'https://images.unsplash.com/photo-1598112972279-d59b3be94bf0?q=80&w=600',
    priceRange: 'Under ₹25,000 / $250',
    badge: 'Best Overall',
    rating: 4.9,
    reviewCount: '2.8k+',
    instructorNotes: 'The Katana is the absolute king of home practice and small gig amplifiers. The built-in 0.5W mode lets you crank up high-gain tones at bedroom volumes without waking the neighbors.'
  },
  {
    id: 'daddario-exl110',
    title: 'D\'Addario EXL110 Nickel Wound Strings (10-46)',
    category: 'Strings & Picks',
    description: 'The world\'s standard electric guitar strings, delivering bright, crunchy tone and perfect intonation.',
    features: [
      'Regular Light Gauge (.010, .013, .017, .026, .036, .046)',
      'Bright and Clear Tone signature',
      'Corrosion-Resistant Sealed Packaging',
      'Precision Wound in the USA'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B0002E1A70',
    imageUrl: 'https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=600',
    priceRange: 'Budget',
    badge: 'Daily Essential',
    rating: 4.8,
    reviewCount: '15k+',
    instructorNotes: 'These have been my primary electric guitar strings for over ten years. They are consistent, stable, and have a highly responsive string tension that is perfect for bends and vibrato.'
  },
  {
    id: 'elixir-nanoweb-acoustic',
    title: 'Elixir Strings Acoustic 80/20 Bronze with NANOWEB (12-53)',
    category: 'Strings & Picks',
    description: 'Ultra-premium coated acoustic guitar strings that last 3 to 5 times longer than traditional strings.',
    features: [
      'Light Gauge (.012, .016, .024, .032, .042, .053)',
      '80/20 Bronze with ultra-thin Nanoweb coating',
      'Protects string core from sweat and hand oils',
      'Smooth feel reduces finger squeak'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B0002E1O3M',
    imageUrl: 'https://images.unsplash.com/photo-1508186224248-816d186a1185?q=80&w=600',
    priceRange: 'Mid-Range',
    badge: 'Longest Lasting',
    rating: 4.9,
    reviewCount: '8.4k+',
    instructorNotes: 'If you dislike changing rusty acoustic strings every few weeks, Elixirs are a lifesaver. The thin coating protects them from humidity and corrosion, preserving that brand-new sparkle for months.'
  },
  {
    id: 'focusrite-scarlett-solo',
    title: 'Focusrite Scarlett Solo (4th Gen) USB Interface',
    category: 'Recording Gear',
    description: 'The world\'s most popular USB audio interface, updated with ultra-low noise preamps and studio-grade converters.',
    features: [
      'High-Headroom Instrument Input for guitars',
      'Studio-grade Scarlett Mic Preamp with Air Mode',
      '120dB Dynamic Range Converter chips',
      'Includes Ableton Live Lite & Pro Tools software'
    ],
    amazonUrl: 'https://www.amazon.in/dp/B0C7SZB1GQ',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600',
    priceRange: 'Mid-Range',
    badge: 'Home Studio',
    rating: 4.8,
    reviewCount: '1.4k+',
    instructorNotes: 'This is the most reliable way to plug your guitar into a computer. Essential for recording your own covers, practicing with virtual amp software, or taking online lessons with crystal-clear audio.'
  }
];

const CATEGORIES = [
  'All Gear',
  'Guitars',
  'Pedals & Effects',
  'Amps & Cabinets',
  'Strings & Picks',
  'Recording Gear'
];

export default function StorefrontListingClient() {
  const [selectedCategory, setSelectedCategory] = useState('All Gear');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);

  // Filter products based on category and search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Gear' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.instructorNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'border border-white/5 bg-white/2 text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/2 py-2 pr-4 pl-10 text-xs text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/4 focus:ring-1 focus:ring-cyan-500/30"
          />
          <LuSearch className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-500" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <LuX className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid Listing */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const theme = THEME_PALETTE[index % THEME_PALETTE.length];

            return (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Background Ambient Glow */}
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${theme.ambient.top} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Card Top Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#0A0A10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 rounded-full bg-[#020205]/80 px-2.5 py-1 text-[9px] font-black tracking-widest text-cyan-400 uppercase backdrop-blur-md border border-white/10">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 rounded-full bg-[#020205]/80 px-2.5 py-1 text-[9px] font-bold text-gray-400 backdrop-blur-md border border-white/10">
                    {product.category}
                  </div>
                </div>

                {/* Content Container */}
                <div className="relative flex flex-1 flex-col p-5">
                  {/* Title & Rating */}
                  <div className="mb-2">
                    <h3 className="line-clamp-1 font-heading text-base font-extrabold text-white transition-colors duration-300 group-hover:text-cyan-400">
                      {product.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="flex text-amber-500">
                        <LuStar className="size-3.5 fill-current" />
                      </div>
                      <span className="text-[11px] font-black text-white">{product.rating}</span>
                      <span className="text-[11px] text-gray-500">({product.reviewCount} reviews)</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="line-clamp-2 text-[12px] leading-relaxed text-gray-400">
                    {product.description}
                  </p>

                  {/* Instructor Recommendation Highlight */}
                  <div className="mt-4 rounded-xl border border-white/5 bg-white/2 p-3 transition-colors duration-300 group-hover:bg-[#030712]/40">
                    <div className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                      <LuSparkles className="size-3" />
                      <span>Why Shuvam Recommends It</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] italic leading-relaxed text-gray-300">
                      &ldquo;{product.instructorNotes}&rdquo;
                    </p>
                  </div>

                  {/* Spacer to push button down */}
                  <div className="flex-1 min-h-[1.5rem]" />

                  {/* Price and Action Button Row */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase">Price Range</span>
                      <span className="text-[12px] font-black text-white">{product.priceRange}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveProduct(product)}
                        className="rounded-full bg-white/5 p-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                        title="View Specifications"
                      >
                        <LuInfo className="size-4.5" />
                      </button>
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full bg-[#FF9900]/90 px-3.5 py-2 text-[11px] font-extrabold text-[#111] transition-all duration-300 hover:bg-[#FF9900] hover:shadow-[0_0_15px_rgba(255,153,0,0.3)]"
                      >
                        <FaAmazon className="size-3.5" />
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/2 py-16 text-center">
          <LuInfo className="mx-auto size-8 text-gray-500" />
          <h3 className="mt-3 font-heading text-lg font-bold text-white">No products found</h3>
          <p className="mt-1 text-sm text-gray-400">Try adjusting your search query or filters.</p>
        </div>
      )}

      {/* Product Detail Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveProduct(null)}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#06060F] p-6 shadow-2xl backdrop-blur-3xl md:p-8">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-5 right-5 rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
            >
              <LuX className="size-4" />
            </button>

            {/* Header info */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 md:w-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-linear-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                    {activeProduct.category}
                  </span>
                  {activeProduct.badge && (
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-amber-400 uppercase">
                      {activeProduct.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-black text-white">
                  {activeProduct.title}
                </h3>

                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    <LuStar className="size-4 fill-current" />
                  </div>
                  <span className="text-xs font-black text-white">{activeProduct.rating}</span>
                  <span className="text-xs text-gray-500">({activeProduct.reviewCount} reviews)</span>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block">Price Range</span>
                  <span className="text-sm font-black text-white">{activeProduct.priceRange}</span>
                </div>
              </div>
            </div>

            {/* Middle Section: Specs & Description */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-heading text-[12px] font-black tracking-widest text-gray-400 uppercase border-b border-white/5 pb-2">
                  Product Features
                </h4>
                <ul className="space-y-2">
                  {activeProduct.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <LuCheck className="mt-0.5 size-3.5 shrink-0 text-cyan-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-heading text-[12px] font-black tracking-widest text-gray-400 uppercase border-b border-white/5 pb-2">
                  Instructor Notes
                </h4>
                <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-4 relative overflow-hidden">
                  <div className="absolute -top-1 -left-1 text-4xl text-cyan-500/10 font-serif leading-none">&ldquo;</div>
                  <p className="text-xs italic leading-relaxed text-gray-300 relative z-10">
                    {activeProduct.instructorNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Button Row */}
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/5 pt-5">
              <button
                onClick={() => setActiveProduct(null)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-gray-400 transition-all hover:bg-white/5 hover:text-white"
              >
                Close Details
              </button>
              <a
                href={activeProduct.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#FF9900]/90 px-6 py-2.5 text-xs font-black text-[#111] transition-all duration-300 hover:bg-[#FF9900] hover:shadow-[0_0_20px_rgba(255,153,0,0.4)]"
              >
                <FaAmazon className="size-4" />
                Buy on Amazon
                <LuExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
