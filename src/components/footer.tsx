"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LuMail,
  LuMapPin,
  LuPhone,
  LuMusic,
  LuInstagram,
  LuYoutube,
  LuFacebook,
  LuHeadphones,
} from "react-icons/lu";

const socialLinks = [
  {
    name: "Instagram",
    icon: LuInstagram,
    href: "https://www.instagram.com/shuvamrahamusic",
    hoverColor: "group-hover:text-pink-500",
    hoverBg: "group-hover:border-pink-500/50 group-hover:bg-pink-500/10",
  },
  {
    name: "YouTube (Artist Channel)",
    icon: LuYoutube,
    href: "https://www.youtube.com/channel/UCJRzXDPzTFktE0giVtYk_WQ",
    hoverColor: "group-hover:text-red-500",
    hoverBg: "group-hover:border-red-500/50 group-hover:bg-red-500/10",
  },
  {
    name: "Facebook",
    icon: LuFacebook,
    href: "https://www.facebook.com/shuvamrahamusic",
    hoverColor: "group-hover:text-blue-500",
    hoverBg: "group-hover:border-blue-500/50 group-hover:bg-blue-500/10",
  },
  {
    name: "Spotify",
    icon: LuHeadphones,
    href: "https://open.spotify.com/artist/4AmYXw6BaXjFN4urc6SyrG",
    hoverColor: "group-hover:text-green-500",
    hoverBg: "group-hover:border-green-500/50 group-hover:bg-green-500/10",
  },
  {
    name: "Apple Music",
    icon: LuMusic,
    href: "https://music.apple.com/us/artist/shuvam-raha/1541472783",
    hoverColor: "group-hover:text-pink-500",
    hoverBg: "group-hover:border-pink-500/50 group-hover:bg-pink-500/10",
  },
  {
    name: "YouTube (Educational Hub)",
    icon: LuYoutube,
    href: "https://www.youtube.com/channel/UCeouq96N_hYXGT7m1NsjF4Q",
    hoverColor: "group-hover:text-red-500",
    hoverBg: "group-hover:border-red-500/50 group-hover:bg-red-500/10",
  },
];

const quickLinks = [
  { name: "Meet Your Coach", href: "#overview" },
  { name: "Student Success", href: "#reviews" },
  { name: "Pricing & Plans", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on pay page
  if (pathname === "/guitar-classes-with-shuvam/pay") {
    return null;
  }

  return (
    <footer className="relative w-full pt-8 md:pt-10 pb-4 overflow-hidden bg-[#020205]">
      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-[2px]" />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[150px] bg-gradient-to-b from-cyan-950/5 via-blue-950/5 to-transparent blur-[80px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        {/* === TOP GRID LAYOUT === */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 w-full">
          {/* Left Brand block */}
          <div className="flex flex-col items-center lg:items-start gap-4 max-w-sm w-full text-center lg:text-left">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                <Image
                  src="/logo.png"
                  alt="Shuvam Raha Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <span className="text-base font-black text-white tracking-tight">
                Shuvam Raha
              </span>
            </div>

            <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed">
              Helping aspiring guitarists break past their limits and master the
              instrument through structured, personalized, and engaging
              coaching.
            </p>

            {/* Brand Social links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-1">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center w-8 h-8 rounded-full border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-300 ${social.hoverBg}`}
                  aria-label={social.name}
                >
                  <social.icon
                    className={`w-3.5 h-3.5 text-gray-400 transition-colors duration-300 ${social.hoverColor}`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns Block (Quick Links + Contact Details) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-16 lg:gap-24 justify-center">
            {/* Quick Links Column */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-500">
                Explore
              </h4>
              <ul className="flex flex-col items-center sm:items-start gap-2.5">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <span className="text-xs font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                        0{idx + 1}.
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details Column */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-500">
                Connect
              </h4>
              <div className="flex flex-col items-center sm:items-start gap-2">
                {/* Email link */}
                <a
                  href="mailto:contact@shuvamrahamusic.com"
                  className="group flex items-center gap-2.5 px-4 py-2 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-500/20 hover:shadow-[0_0_12px_rgba(6,182,212,0.08)] transition-all duration-300 text-xs sm:text-sm text-gray-400 hover:text-white w-fit"
                >
                  <LuMail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">
                    contact@shuvamrahamusic.com
                  </span>
                </a>

                {/* Phone link */}
                <a
                  href="https://wa.me/918961369468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-4 py-2 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 hover:shadow-[0_0_12px_rgba(16,185,129,0.08)] transition-all duration-300 text-xs sm:text-sm text-gray-400 hover:text-white w-fit"
                >
                  <LuPhone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">+91 8961369468</span>
                </a>

                {/* Location display */}
                <a
                  href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-4 py-2 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-rose-500/20 hover:shadow-[0_0_12px_rgba(244,63,94,0.08)] transition-all duration-300 text-xs sm:text-sm text-gray-400 hover:text-white w-fit"
                >
                  <LuMapPin className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Kolkata, India</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM COPYRIGHT & DISCLAIMER === */}
        <div className="pt-6 mt-10 border-t border-white/5 relative z-10 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
              <p className="text-gray-500 text-xs sm:text-sm font-semibold">
                Copyright &copy; {new Date().getFullYear()} Shuvam Raha Music.
              </p>
              <span className="hidden sm:inline text-gray-800">•</span>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold flex items-center gap-1">
                <span>Developed By</span>
                <a
                  href="https://github.com/iamsayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  Sayan Datta
                </a>
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
              <a
                href="https://shuvamrahamusic.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
              >
                Privacy
              </a>
              <span className="text-gray-800">•</span>
              <a
                href="https://shuvamrahamusic.com/terms-of-service/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
              >
                Terms
              </a>
              <span className="text-gray-800">•</span>
              <a
                href="https://shuvamrahamusic.com/refund-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
              >
                Refund Policy
              </a>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500/60 leading-relaxed text-center max-w-6xl mx-auto mt-1">
            Payments accepted through this website are only for guitar lessons,
            music education programs, and training services. This website does
            not sell event tickets or concert passes.
          </p>
        </div>
      </div>
    </footer>
  );
}
