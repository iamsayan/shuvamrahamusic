"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Music, ArrowRight, ChevronDown } from "lucide-react";

type SubItem = { name: string; href: string };
type NavLink = {
  name: string;
  href: string;
  raw?: boolean;
  subItems?: SubItem[];
};

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Biography", href: "/biography" },
  { name: "Classes", href: "/", raw: true },
  {
    name: "Gallery",
    href: "/gallery",
    subItems: [
      { name: "Photos", href: "/gallery/photos" },
      { name: "Audios", href: "/gallery/audios" },
      { name: "Videos", href: "/gallery/videos" },
    ],
  },
  { name: "Events", href: "/events" },
  { name: "Gears", href: "/my-gears" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "Blogs", href: "/news" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for dynamic glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[#020205]/70 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 z-50 relative"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-[0.8rem] bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-all duration-300">
              <Music className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-black text-white tracking-tight">
              Shuvam Raha
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5">
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative group">
                <Link
                  href={`${link.raw ? link.href : `https://shuvamrahamusic.com${link.href}`}`}
                  className="relative flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full overflow-hidden transition-colors"
                >
                  <span className="relative z-10 text-xs font-bold text-gray-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {link.name}
                  </span>
                  {link.subItems && (
                    <ChevronDown className="relative z-10 w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-300 group-hover:rotate-180" />
                  )}
                  {/* Pill Hover Effect */}
                  <span className="absolute inset-0 bg-white/10 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none" />
                </Link>

                {/* Dropdown for Desktop */}
                {link.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out">
                    <div className="flex flex-col min-w-[140px] p-2 rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                      {link.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={`https://shuvamrahamusic.com${sub.href}`}
                          className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50 relative">
            <a
              href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
              target="_blank"
              className="hidden sm:inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-white text-[#05050A] font-black text-sm hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Locate
            </a>

            {/* Mobile Hamburger */}
            <button
              className="xl:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 w-full h-[2px] bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "top-2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 w-full h-[2px] bg-current top-2 transform transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 w-full h-[2px] bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "top-2 -rotate-45" : "top-4"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`xl:hidden fixed inset-0 top-0 pt-24 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen
            ? "opacity-100 visible pointer-events-auto backdrop-blur-3xl bg-[#020205]/95 mobile-menu-open"
            : "opacity-0 invisible pointer-events-none backdrop-blur-none bg-[#020205]/0"
        }`}
      >
        <nav className="flex flex-col px-5 h-full overflow-y-auto">
          {navLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col border-b border-white/5 mobile-menu-item">
              <Link
                href={link.href}
                className="group py-4 text-xl font-bold text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between"
                onClick={() => !link.subItems && setIsMobileMenuOpen(false)}
              >
                {link.name}
                {!link.subItems && (
                  <ArrowRight className="w-5 h-5 text-cyan-400 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                )}
              </Link>

              {/* Mobile Subitems */}
              {link.subItems && (
                <div className="flex flex-col pl-4 pb-4 gap-4 border-l-2 border-white/10 ml-2 mb-2">
                  {link.subItems.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.href}
                      className="text-base font-medium text-gray-400 hover:text-cyan-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-10 mb-8 w-full mobile-menu-btn">
            <a
              href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95 transition-transform duration-300"
            >
              Locate
            </a>
          </div>

          {/* Ambient Glow inside Mobile Menu */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-600/20 blur-[100px] pointer-events-none rounded-full" />
        </nav>
      </div>
    </header>
  );
}
