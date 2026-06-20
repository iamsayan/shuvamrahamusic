'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useSiteSettings } from '@/app/providers';
import { normalizeUrl } from '@/lib/utils';

import {
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaSpotify,
  FaYoutube,
} from 'react-icons/fa6';
import {
  LuChevronRight,
  LuMail,
  LuMapPin,
  LuMusic,
  LuPhone,
} from 'react-icons/lu';

const socialLinks = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: 'https://www.instagram.com/shuvamrahamusic',
    hoverColor: 'group-hover:text-pink-500',
    hoverBg: 'group-hover:border-pink-500/50 group-hover:bg-pink-500/10',
  },
  {
    name: 'YouTube (Artist Channel)',
    icon: FaYoutube,
    href: 'https://www.youtube.com/channel/UCJRzXDPzTFktE0giVtYk_WQ',
    hoverColor: 'group-hover:text-red-500',
    hoverBg: 'group-hover:border-red-500/50 group-hover:bg-red-500/10',
  },
  {
    name: 'Facebook',
    icon: FaFacebookF,
    href: 'https://www.facebook.com/shuvamrahamusic',
    hoverColor: 'group-hover:text-blue-500',
    hoverBg: 'group-hover:border-blue-500/50 group-hover:bg-blue-500/10',
  },
  {
    name: 'Spotify',
    icon: FaSpotify,
    href: 'https://open.spotify.com/artist/4AmYXw6BaXjFN4urc6SyrG',
    hoverColor: 'group-hover:text-green-500',
    hoverBg: 'group-hover:border-green-500/50 group-hover:bg-green-500/10',
  },
  {
    name: 'Apple Music',
    icon: FaApple,
    href: 'https://music.apple.com/in/artist/shuvam-raha/1541472783',
    hoverColor: 'group-hover:text-pink-500',
    hoverBg: 'group-hover:border-pink-500/50 group-hover:bg-pink-500/10',
  },
  {
    name: 'JioSaavn',
    icon: LuMusic,
    href: 'https://www.jiosaavn.com/artist/shuvam-raha-songs/OgEpPI53TvE_',
    hoverColor: 'group-hover:text-teal-400',
    hoverBg: 'group-hover:border-teal-500/50 group-hover:bg-teal-500/10',
  },
  {
    name: 'YouTube (Educational Hub)',
    icon: FaYoutube,
    href: 'https://www.youtube.com/channel/UCeouq96N_hYXGT7m1NsjF4Q',
    hoverColor: 'group-hover:text-red-500',
    hoverBg: 'group-hover:border-red-500/50 group-hover:bg-red-500/10',
  },
];

export default function Footer() {
  const settings = useSiteSettings();

  const currentQuickLinks = (() => {
    if (settings?.footer_menu && settings.footer_menu.length > 0) {
      return settings.footer_menu
        .filter((item) => item.active)
        .map((item) => ({
          ...item,
          url: normalizeUrl(item.url),
        }));
    }
    return null;
  })();

  const currentQuickLinks2 = (() => {
    if (
      settings?.footer_secondary_menu &&
      settings.footer_secondary_menu.length > 0
    ) {
      return settings.footer_secondary_menu
        .filter((item) => item.active)
        .map((item) => ({
          ...item,
          url: normalizeUrl(item.url),
        }));
    }
    return null;
  })();

  const exploreLinks = [
    { title: 'Home', url: '/' },
    { title: 'Guitar Classes', url: '/guitar-classes-with-shuvam' },
    { title: 'Blog', url: '/blog' },
    { title: 'Biography', url: '/biography' },
    { title: 'Contact', url: '/contact' },
  ];

  const mediaLinks = [
    { title: 'Performance Highlights', url: '/performance-highlights' },
    { title: 'Tutorials', url: '/tutorials' },
    { title: 'Videos', url: '/videos' },
    { title: 'Photos', url: '/photos' },
    { title: 'Audios', url: '/audios' },
    { title: 'My Gears', url: '/my-gears' },
  ];

  const finalExploreLinks =
    currentQuickLinks && currentQuickLinks.length > 2
      ? currentQuickLinks
      : exploreLinks;

  const finalMediaLinks =
    currentQuickLinks2 && currentQuickLinks2.length > 2
      ? currentQuickLinks2
      : mediaLinks;

  return (
    <footer className="relative w-full overflow-hidden bg-[#020205] pt-8 pb-4 md:pt-10">
      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-linear-to-r from-transparent via-indigo-500/10 to-transparent" />
      <div className="absolute top-0 left-1/2 h-[1px] w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-400/30 to-transparent blur-[2px]" />

      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[150px] w-full max-w-[1000px] -translate-x-1/2 bg-linear-to-b from-cyan-950/5 via-blue-950/5 to-transparent blur-[80px]" />

      <div className="site-container relative z-10">
        {/* === TOP GRID LAYOUT === */}
        <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
          {/* Left Brand block */}
          <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-2.5">
              <Image
                src="/site-logo.png"
                alt="Shuvam Raha Logo"
                width={80}
                height={50}
                className="h-10 w-auto object-contain md:h-12"
                loading="eager"
              />
            </div>

            <p className="text-sm leading-relaxed text-gray-400 sm:text-[15px]">
              Helping aspiring guitarists break past their limits and master the
              instrument through structured, personalized, and engaging
              coaching.
            </p>

            {/* Brand Social links */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 sm:justify-start">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center rounded-full border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-300 ${social.hoverBg} size-8`}
                  aria-label={social.name}
                >
                  <social.icon
                    className={`text-gray-400 transition-colors duration-300 ${social.hoverColor} size-3.5`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns Block (Quick Links + Media Links + Contact Details) */}
          <div className="flex w-full flex-col items-center justify-between gap-10 sm:flex-row sm:items-start sm:gap-16 lg:flex-1 lg:justify-end lg:gap-16 xl:gap-24">
            {/* Quick Links Column */}
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <h4 className="text-xs font-black tracking-wider text-gray-500 uppercase sm:text-sm">
                Explore
              </h4>
              <ul className="flex flex-col items-center gap-2.5 sm:items-start">
                {finalExploreLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.url}
                      className="group flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors duration-200 hover:text-white sm:text-sm"
                    >
                      <LuChevronRight className="size-3.5 text-cyan-400/80 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Media & Gear Column */}
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <h4 className="text-xs font-black tracking-wider text-gray-500 uppercase sm:text-sm">
                Media &amp; Gear
              </h4>
              <ul className="flex flex-col items-center gap-2.5 sm:items-start">
                {finalMediaLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.url}
                      className="group flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors duration-200 hover:text-white sm:text-sm"
                    >
                      <LuChevronRight className="size-3.5 text-cyan-400/80 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details Column */}
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <h4 className="text-xs font-black tracking-wider text-gray-500 uppercase sm:text-sm">
                Connect
              </h4>
              <div className="flex flex-col items-center gap-2 sm:items-start">
                {/* Email link */}
                <a
                  href="mailto:contact@shuvamrahamusic.com"
                  className="group flex w-fit items-center gap-2.5 rounded-xl border border-white/4 bg-white/1 px-4 py-2 text-xs text-gray-400 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/3 hover:text-white hover:shadow-[0_0_12px_rgba(6,182,212,0.08)] sm:text-sm"
                >
                  <LuMail className="size-3.5 text-cyan-400 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">
                    contact@shuvamrahamusic.com
                  </span>
                </a>

                {/* Phone link */}
                <a
                  href="https://wa.me/918961369468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-2.5 rounded-xl border border-white/4 bg-white/1 px-4 py-2 text-xs text-gray-400 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/3 hover:text-white hover:shadow-[0_0_12px_rgba(16,185,129,0.08)] sm:text-sm"
                >
                  <LuPhone className="size-3.5 text-emerald-400 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">+91 8961369468</span>
                </a>

                {/* Location display */}
                <a
                  href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-2.5 rounded-xl border border-white/4 bg-white/1 px-4 py-2 text-xs text-gray-400 transition-all duration-300 hover:border-rose-500/20 hover:bg-white/3 hover:text-white hover:shadow-[0_0_12px_rgba(244,63,94,0.08)] sm:text-sm"
                >
                  <LuMapPin className="size-3.5 text-rose-400 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">
                    South Dumdum, Kolkata, India
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM COPYRIGHT & DISCLAIMER === */}
        <div className="relative z-10 mt-10 flex flex-col gap-4 border-t border-white/5 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
              <p className="text-xs font-semibold text-gray-500 sm:text-sm">
                &copy; {new Date().getFullYear()} Shuvam Raha Music
              </p>
              <span className="hidden text-gray-800 sm:inline">•</span>
              <p className="flex items-center gap-1 text-xs font-semibold text-gray-500 sm:text-sm">
                <span>Developed by</span>
                <a
                  href="https://sayandatta.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cyan-300"
                >
                  Sayan Datta
                </a>
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
              <span className="text-gray-800">•</span>
              <Link
                href="/privacy-policy"
                className="text-gray-500 transition-colors duration-300 hover:text-white"
              >
                Privacy
              </Link>
              <span className="text-gray-800">•</span>
              <Link
                href="/terms-of-service"
                className="text-gray-500 transition-colors duration-300 hover:text-white"
              >
                Terms
              </Link>
              <span className="text-gray-800">•</span>
              <Link
                href="/refund-policy"
                className="text-gray-500 transition-colors duration-300 hover:text-white"
              >
                Refund Policy
              </Link>
            </div>
          </div>

          <p className="mx-auto mt-1 max-w-6xl text-center text-[10px] leading-relaxed text-gray-500/60 sm:text-xs">
            Payments accepted through this website are only for guitar lessons,
            music education programs, and training services. This website does
            not sell event tickets or concert passes.
          </p>
        </div>
      </div>
    </footer>
  );
}
