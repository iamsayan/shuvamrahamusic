'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuArrowRight, LuChevronDown, LuPhone } from 'react-icons/lu';

type SubItem = { name: string; href: string; raw?: boolean };
type NavLink = {
  name: string;
  href: string;
  raw?: boolean;
  subItems?: SubItem[];
};

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Biography', href: '/biography' },
  {
    name: 'Guiter Classes',
    href: '/guitar-classes-with-shuvam',
    raw: true,
    subItems: [
      {
        name: 'Make Payment',
        href: '/guitar-classes-with-shuvam/pay',
        raw: true,
      },
    ],
  },
  {
    name: 'Performance Highlights',
    href: '/performance-highlights',
  },
  {
    name: 'Gallery',
    href: '/gallery',
    subItems: [
      { name: 'Photos', href: '/gallery/photos' },
      { name: 'Audios', href: '/gallery/audios' },
      { name: 'Videos', href: '/gallery/videos' },
    ],
  },
  { name: 'Gears', href: '/my-gears' },
  {
    name: 'More',
    href: '#',
    subItems: [
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for dynamic glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out flex flex-col ${
        isMobileMenuOpen
          ? 'mobile-menu-open h-screen bg-[#020205]/98 backdrop-blur-3xl py-2 md:py-3.5'
          : isScrolled
            ? 'border-b border-white/10 bg-[#020205]/75 py-1 md:py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-2 md:py-3.5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-start px-5 md:px-12 lg:px-20 min-h-0 flex-1">
        {/* Top Header Bar */}
        <div className="flex h-[60px] w-full shrink-0 items-center justify-between md:h-[70px]">
          {/* Logo */}
          <Link
            href="https://shuvamrahamusic.com"
            className="group relative z-50 flex items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/site-logo.png"
              alt="Shuvam Raha Logo"
              width={100}
              height={50}
              className="-mt-2"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.02] px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md xl:flex">
            {navLinks.map((link, idx) => {
              const isRealLink = link.href && link.href !== '#';

              if (link.subItems && isRealLink) {
                return (
                  <div
                    key={idx}
                    className="group/item relative flex items-center gap-1 rounded-full py-1.5 pr-2.5 pl-3.5 transition-colors"
                  >
                    <Link
                      href={`${link.raw ? link.href : `https://shuvamrahamusic.com${link.href}`}`}
                      className="relative z-10 text-sm font-bold whitespace-nowrap text-gray-300 transition-colors duration-300 group-hover/item:text-white hover:text-white"
                    >
                      {link.name}
                    </Link>
                    <div className="group/chevron relative flex cursor-pointer items-center justify-center p-1">
                      <LuChevronDown className="relative z-10 h-3 w-3 text-gray-400 transition-transform duration-300 group-hover/chevron:rotate-180 group-hover/chevron:text-white" />

                      {/* Dropdown triggered only by Chevron hover */}
                      <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-all duration-300 ease-out group-hover/chevron:visible group-hover/chevron:opacity-100">
                        <div className="flex min-w-[150px] flex-col rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                          {link.subItems.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={`${sub.raw ? sub.href : `https://shuvamrahamusic.com${sub.href}`}`}
                              className="rounded-xl px-3.5 py-2 text-sm font-bold text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Unified Pill Hover Effect */}
                    <span className="pointer-events-none absolute inset-0 scale-75 rounded-full bg-white/10 opacity-0 transition-all duration-300 ease-out group-hover/item:scale-100 group-hover/item:opacity-100" />
                  </div>
                );
              }

              return (
                <div key={idx} className="group relative">
                  <Link
                    href={`${link.raw ? link.href : `https://shuvamrahamusic.com${link.href}`}`}
                    className="relative flex items-center gap-1 overflow-hidden rounded-full px-3.5 py-1.5 transition-colors"
                  >
                    <span className="relative z-10 text-sm font-bold whitespace-nowrap text-gray-300 transition-colors duration-300 group-hover:text-white">
                      {link.name}
                    </span>
                    {link.subItems && (
                      <LuChevronDown className="relative z-10 h-3 w-3 text-gray-400 transition-transform duration-300 group-hover:rotate-180 group-hover:text-white" />
                    )}
                    {/* Pill Hover Effect */}
                    <span className="pointer-events-none absolute inset-0 scale-75 rounded-full bg-white/10 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />
                  </Link>

                  {/* Dropdown for Desktop */}
                  {link.subItems && (
                    <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex min-w-[150px] flex-col rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                        {link.subItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={`${sub.raw ? sub.href : `https://shuvamrahamusic.com${sub.href}`}`}
                            className="rounded-xl px-3.5 py-2 text-sm font-bold text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="relative z-50 flex items-center gap-4">
            <a
              href="tel:+918961369468"
              className="inline-flex h-9 w-9 items-center justify-center gap-1.5 rounded-full bg-white text-sm text-[#05050A] shadow-[0_4px_15px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-[0_4px_25px_rgba(255,255,255,0.3)] active:scale-95 sm:h-auto sm:w-auto sm:px-6 sm:py-2 sm:font-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LuPhone className="h-4 w-4 sm:h-3 sm:w-3" />
              <span className="hidden sm:inline">Call</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white xl:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative h-4.5 w-4.5">
                <span
                  className={`absolute left-0 h-[1.5px] w-full transform bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0.5'
                  }`}
                />
                <span
                  className={`absolute top-2 left-0 h-[1.5px] w-full transform bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full transform bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-3.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu List */}
        {isMobileMenuOpen && (
          <div className="relative z-10 mt-2 flex w-full flex-1 flex-col py-4 xl:hidden min-h-0">
            <nav className="flex w-full flex-col gap-1 overflow-y-auto pr-1 flex-1">
              {navLinks.map((link, idx) => {
                const isRealLink = link.href && link.href !== '#';
                return (
                  <div
                    key={idx}
                    className="mobile-menu-item flex flex-col border-b border-white/5"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <Link
                      href={`${link.raw ? link.href : `https://shuvamrahamusic.com${link.href}`}`}
                      className="group flex items-center justify-between py-2 text-base font-bold text-gray-300 transition-all duration-300 hover:text-white"
                      onClick={() =>
                        (!link.subItems || isRealLink) &&
                        setIsMobileMenuOpen(false)
                      }
                    >
                      {link.name}
                      {(!link.subItems || isRealLink) && (
                        <LuArrowRight className="h-4 w-4 -translate-x-3 text-cyan-400 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                      )}
                    </Link>

                    {/* Mobile Subitems */}
                    {link.subItems && (
                      <div className="mb-1 ml-2 flex flex-col gap-2 border-l-2 border-white/10 pb-2 pl-4">
                        {link.subItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={`${sub.raw ? sub.href : `https://shuvamrahamusic.com${sub.href}`}`}
                            className="py-1 text-sm font-semibold text-gray-400 transition-colors hover:text-cyan-400"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Ambient Background glow in Mobile Menu */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-cyan-600/10 blur-[90px]" />
          </div>
        )}
      </div>
    </header>
  );
}
