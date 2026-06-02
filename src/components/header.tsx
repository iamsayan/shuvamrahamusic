"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuMusic, LuArrowRight, LuChevronDown, LuPhone } from "react-icons/lu";

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
  { name: "Classes", href: "/guitar-classes-with-shuvam", raw: true },
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
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header on pay page
  if (pathname === "/guitar-classes-with-shuvam/pay") {
    return null;
  }

  // Handle scroll effect for dynamic glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        isMobileMenuOpen
          ? "h-screen bg-[#020205]/98 backdrop-blur-3xl overflow-y-auto mobile-menu-open"
          : isScrolled
            ? "bg-[#020205]/75 backdrop-blur-xl border-b border-white/10 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-3.5 border-b border-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20 h-full flex flex-col justify-start">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between w-full h-[60px] md:h-[70px] shrink-0">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 z-50 relative"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative flex items-center justify-center w-8.5 h-8.5 md:w-10 md:h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-cyan-500/30 shadow-[0_0_15px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Shuvam Raha Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <span className="text-lg md:text-xl font-black text-white tracking-tight">
              Shuvam Raha
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative group">
                <Link
                  href={`${link.raw ? link.href : `https://shuvamrahamusic.com${link.href}`}`}
                  className="relative flex items-center gap-1 px-3.5 py-1.5 rounded-full overflow-hidden transition-colors"
                >
                  <span className="relative z-10 text-xs font-bold text-gray-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {link.name}
                  </span>
                  {link.subItems && (
                    <LuChevronDown className="relative z-10 w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-300 group-hover:rotate-180" />
                  )}
                  {/* Pill Hover Effect */}
                  <span className="absolute inset-0 bg-white/10 rounded-full scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none" />
                </Link>

                {/* Dropdown for Desktop */}
                {link.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out z-50">
                    <div className="flex flex-col min-w-[150px] p-1.5 rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                      {link.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={`https://shuvamrahamusic.com${sub.href}`}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
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
              href="tel:+918961369468"
              className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-6 sm:py-2 rounded-full bg-white text-[#05050A] sm:font-black text-xs hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.3)] gap-1.5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LuPhone className="w-4 h-4 sm:w-3 sm:h-3" />
              <span className="hidden sm:inline">Call</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="xl:hidden relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-4.5 h-4.5">
                <span
                  className={`absolute left-0 w-full h-[1.5px] bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "top-2 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-[1.5px] bg-current top-2 transform transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-[1.5px] bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "top-2 -rotate-45" : "top-3.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu List */}
        {isMobileMenuOpen && (
          <div className="flex-1 flex flex-col justify-between py-6 mt-2 xl:hidden relative z-10 w-full">
            <nav className="flex flex-col gap-1 w-full max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
              {navLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="flex flex-col border-b border-white/5 mobile-menu-item"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <Link
                    href={`${link.raw ? link.href : `https://shuvamrahamusic.com${link.href}`}`}
                    className="group py-3.5 text-lg font-bold text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between"
                    onClick={() => !link.subItems && setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    {!link.subItems && (
                      <LuArrowRight className="w-4 h-4 text-cyan-400 opacity-0 -translate-x-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                    )}
                  </Link>

                  {/* Mobile Subitems */}
                  {link.subItems && (
                    <div className="flex flex-col pl-4 pb-3.5 gap-3 border-l-2 border-white/10 ml-2 mb-1">
                      {link.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={`https://shuvamrahamusic.com${sub.href}`}
                          className="text-sm font-semibold text-gray-400 hover:text-cyan-400 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>


            {/* Ambient Background glow in Mobile Menu */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-cyan-600/10 blur-[90px] pointer-events-none rounded-full" />
          </div>
        )}
      </div>
    </header>
  );
}
