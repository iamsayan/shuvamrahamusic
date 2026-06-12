'use client';

import { useState } from 'react';

import PageLayout from '@/components/page-layout';

import { FaAmazon, FaApple, FaSpotify } from 'react-icons/fa6';
import { LuMusic, LuRadio, LuSparkles } from 'react-icons/lu';
import { SiYoutubemusic } from 'react-icons/si';

interface AudioTrack {
  id: string;
  title: string;
  type: 'album' | 'track' | 'artist';
  embedUrl: string;
  appleEmbedUrl: string;
  description: string;
  releaseYear: string;
  genre: string;
}

const SHUVAM_TRACKS: AudioTrack[] = [
  {
    id: 'artist-profile',
    title: 'Official Artist Profile',
    type: 'artist',
    embedUrl:
      'https://open.spotify.com/embed/artist/4AmYXw6BaXjFN4urc6SyrG?utm_source=generator&theme=0',
    appleEmbedUrl:
      'https://embed.music.apple.com/in/artist/shuvam-raha/1541472783?theme=dark',
    description:
      'Listen to Shuvam Raha’s complete discography, popular releases, and latest singles.',
    releaseYear: 'Continuous',
    genre: 'Indie Pop / Acoustic',
  },
  {
    id: 'phirti-pothe',
    title: 'Phirti Pothe (Single)',
    type: 'album',
    embedUrl:
      'https://open.spotify.com/embed/album/1ElJ94vEFe17G6kKbhuH2r?utm_source=generator&theme=0',
    appleEmbedUrl:
      'https://embed.music.apple.com/in/album/phirti-pothe/1689193396?theme=dark',
    description:
      'A soulful acoustic Bengali ballad composed, produced, and sung by Shuvam Raha, capturing the bittersweet emotions of acceptance.',
    releaseYear: '2023',
    genre: 'Bengali Indie / Acoustic',
  },
];

export default function AudiosGalleryPage() {
  const [activeTrack, setActiveTrack] = useState<AudioTrack>(SHUVAM_TRACKS[0]);
  const [activePlayer, setActivePlayer] = useState<'spotify' | 'apple'>(
    'spotify'
  );

  const activeEmbedUrl =
    activePlayer === 'spotify'
      ? activeTrack.embedUrl
      : activeTrack.appleEmbedUrl;

  return (
    <PageLayout
      title="Audio Gallery"
      subtitle="Explore Shuvam Raha’s official releases, covers, and compositions. Stream full tracks via the interactive players."
      variant="plain"
      textAlign="center"
    >
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Interactive Embed Widget */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/6 bg-[#0A0A15]/60 p-6 shadow-2xl backdrop-blur-2xl">
              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -top-24 -left-24 size-60 rounded-full bg-cyan-500/10 blur-[90px]" />

              <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <LuRadio className="size-5 animate-pulse text-cyan-400" />
                  <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
                    Interactive Music Widget
                  </span>
                </div>

                <div className="flex gap-2 rounded-full border border-white/10 bg-white/2 p-1">
                  <button
                    onClick={() => setActivePlayer('spotify')}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-black tracking-wider uppercase transition-all duration-300 ${
                      activePlayer === 'spotify'
                        ? 'border border-green-500/30 bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.15)]'
                        : 'border border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <FaSpotify className="size-3.5" />
                    Spotify
                  </button>
                  <button
                    onClick={() => setActivePlayer('apple')}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-black tracking-wider uppercase transition-all duration-300 ${
                      activePlayer === 'apple'
                        ? 'border border-pink-500/30 bg-pink-500/20 text-pink-400 shadow-[0_0_10px_rgba(244,63,94,0.15)]'
                        : 'border border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <FaApple className="size-3.5" />
                    Apple Music
                  </button>
                </div>
              </div>

              {/* IFrame player */}
              <div className="relative aspect-video min-h-88 w-full overflow-hidden rounded-2xl bg-black/40 shadow-inner">
                <iframe
                  src={activeEmbedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={activeTrack.title}
                  className="absolute inset-0 size-full border-0"
                />
              </div>

              {/* Active Track Metadata */}
              <div className="mt-6 space-y-2">
                <h3 className="font-heading text-lg font-black text-white sm:text-xl">
                  {activeTrack.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-400">
                  {activeTrack.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-[10px] font-bold text-gray-500 uppercase">
                  <span>
                    Released:{' '}
                    <strong className="text-white">
                      {activeTrack.releaseYear}
                    </strong>
                  </span>
                  <span>
                    Genre:{' '}
                    <strong className="text-white">{activeTrack.genre}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Track Selector Grid */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <LuMusic className="size-4.5 text-cyan-400" />
                <h3 className="font-heading text-base font-black text-white">
                  Select a Release
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {SHUVAM_TRACKS.map((track) => {
                  const isSelected = activeTrack.id === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => setActiveTrack(track)}
                      className={`relative flex flex-col items-start rounded-2xl border p-5 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-green-500/40 bg-green-500/5 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                          : 'border-white/5 bg-white/1 hover:border-white/10 hover:bg-white/3'
                      }`}
                    >
                      <div className="mb-2 flex w-full items-center justify-between">
                        <span
                          className={`text-[10px] font-black tracking-widest uppercase ${isSelected ? 'text-green-400' : 'text-gray-500'}`}
                        >
                          {track.type}
                        </span>
                        {isSelected && (
                          <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-heading text-sm font-extrabold text-white transition-colors group-hover:text-cyan-400">
                        {track.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs leading-normal text-gray-400">
                        {track.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Portal links to major streaming networks */}
            <div className="space-y-4 rounded-3xl border border-white/4 bg-[#0A0A15]/40 p-6">
              <div className="flex items-center gap-2">
                <LuSparkles className="size-4.5 text-cyan-400" />
                <h3 className="font-heading text-sm font-bold text-white">
                  Stream Anywhere
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://open.spotify.com/artist/4AmYXw6BaXjFN4urc6SyrG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 py-3 text-xs font-bold text-green-400 transition-all hover:bg-green-500/20 active:scale-95"
                >
                  <FaSpotify className="size-4" />
                  Spotify
                </a>
                <a
                  href="https://music.apple.com/in/artist/shuvam-raha/1541472783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-pink-500/20 bg-pink-500/10 py-3 text-xs font-bold text-pink-400 transition-all hover:bg-pink-500/20 active:scale-95"
                >
                  <FaApple className="size-4" />
                  Apple Music
                </a>
                <a
                  href="https://music.youtube.com/@shuvamrahamusic?si=EZrZdMBobweAKLrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20 active:scale-95"
                >
                  <SiYoutubemusic className="size-4 text-red-500" />
                  YT Music
                </a>
                <a
                  href="https://www.jiosaavn.com/artist/shuvam-raha-songs/OgEpPI53TvE_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-teal-500/20 bg-teal-500/10 py-3 text-xs font-bold text-teal-400 transition-all hover:bg-teal-500/20 active:scale-95"
                >
                  <LuMusic className="size-4" />
                  JioSaavn
                </a>
                <a
                  href="https://music.amazon.com/albums/B0C6289PXW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 py-3 text-xs font-bold text-amber-400 transition-all hover:bg-amber-500/20 active:scale-95"
                >
                  <FaAmazon className="size-4" />
                  Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
