'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSettings } from '@/app/providers';
import { normalizeUrl } from '@/lib/utils';

import { LuArrowRight, LuChevronDown, LuPhone } from 'react-icons/lu';


export default function Header() {
  const { settings } = useSettings();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const normalizedPathname = normalizeUrl(pathname);

  // Dynamically map menu items from CMS settings if available, otherwise return null
  const currentNavLinks = (() => {
    if (settings?.header_menu && settings.header_menu.length > 0) {
      return settings.header_menu
        .filter((item) => item.active)
        .map((item) => {
          const children = item.children?.map((child) => ({
            ...child,
            url: normalizeUrl(child.url),
          }));
          return {
            ...item,
            url: normalizeUrl(item.url),
            children,
          };
        });
    }
    return null;
  })();

  // Handle scroll effect for dynamic glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
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
      className={`fixed inset-x-0 top-0 z-50 flex flex-col transition-all duration-300 ease-out ${
        isMobileMenuOpen
          ? 'h-screen bg-[#020205]/98 py-2 backdrop-blur-3xl md:py-3.5'
          : isScrolled
            ? 'border-b border-white/10 bg-[#020205]/75 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl md:py-1.5'
            : 'border-b border-transparent bg-transparent py-2 md:py-3.5'
      }`}
    >
      <div className="site-container flex min-h-0 flex-1 flex-col justify-start">
        {/* Top Header Bar */}
        <div className="flex h-15 w-full shrink-0 items-center justify-between md:h-17.5">
          {/* Logo */}
          <Link
            href="/"
            className="group relative z-50 flex items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/site-logo.png"
              alt="Shuvam Raha Logo"
              width={65}
              height={40}
              className="-mt-2 size-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          {currentNavLinks && currentNavLinks.length > 0 && (
            <nav className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/2 px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md xl:flex">
              {currentNavLinks.map((link, idx) => {
                const isRealLink = link.url && link.url !== '#';
                const isActive =
                  normalizedPathname === link.url ||
                  link.children?.some((sub) => normalizedPathname === sub.url);

                if (link.children && link.children.length > 0 && isRealLink) {
                  return (
                    <div
                      key={idx}
                      className="group/item relative flex items-center gap-1 rounded-full py-1.5 pr-2.5 pl-3.5 transition-colors"
                    >
                      <Link
                        href={link.url}
                        className={`relative z-10 text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                          isActive
                            ? 'text-cyan-400'
                            : 'text-gray-300 group-hover/item:text-white hover:text-white'
                        }`}
                      >
                        {link.title}
                      </Link>
                      <div className="group/chevron relative flex cursor-pointer items-center justify-center p-1">
                        <LuChevronDown
                          className={`relative z-10 size-3 transition-transform duration-300 group-hover/chevron:rotate-180 ${
                            isActive
                              ? 'text-cyan-400'
                              : 'text-gray-400 group-hover/chevron:text-white'
                          }`}
                        />

                        {/* Dropdown triggered only by Chevron hover */}
                        <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-all duration-300 ease-out group-hover/chevron:visible group-hover/chevron:opacity-100">
                          <div className="flex min-w-37.5 flex-col rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                            {link.children
                              .filter((sub) => sub.active)
                              .map((sub, sIdx) => {
                                const isSubActive =
                                  normalizedPathname === sub.url;
                                return (
                                  <Link
                                    key={sIdx}
                                    href={sub.url}
                                    className={`rounded-xl px-3.5 py-2 text-sm font-bold transition-colors ${
                                      isSubActive
                                        ? 'bg-cyan-500/10 text-cyan-400'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                  >
                                    {sub.title}
                                  </Link>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      {/* Unified Pill Hover Effect */}
                      <span
                        className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-300 ease-out ${
                          isActive
                            ? 'scale-100 bg-white/5 opacity-100'
                            : 'scale-75 bg-white/10 opacity-0 group-hover/item:scale-100 group-hover/item:opacity-100'
                        }`}
                      />
                    </div>
                  );
                }

                return (
                  <div key={idx} className="group relative">
                    <Link
                      href={link.url}
                      className="relative flex items-center gap-1 overflow-hidden rounded-full px-3.5 py-1.5 transition-colors"
                    >
                      <span
                        className={`relative z-10 text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                          isActive
                            ? 'text-cyan-400'
                            : 'text-gray-300 group-hover:text-white'
                        }`}
                      >
                        {link.title}
                      </span>
                      {link.children && link.children.length > 0 && (
                        <LuChevronDown
                          className={`relative z-10 size-3 transition-transform duration-300 group-hover:rotate-180 ${
                            isActive
                              ? 'text-cyan-400'
                              : 'text-gray-400 group-hover:text-white'
                          }`}
                        />
                      )}
                      {/* Pill Hover Effect */}
                      <span
                        className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-300 ease-out ${
                          isActive
                            ? 'scale-100 bg-white/5 opacity-100'
                            : 'scale-75 bg-white/10 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                        }`}
                      />
                    </Link>

                    {/* Dropdown for Desktop */}
                    {link.children && link.children.length > 0 && (
                      <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex min-w-37.5 flex-col rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                          {link.children
                            .filter((sub) => sub.active)
                            .map((sub, sIdx) => {
                              const isSubActive =
                                normalizedPathname === sub.url;
                              return (
                                <Link
                                  key={sIdx}
                                  href={sub.url}
                                  className={`rounded-xl px-3.5 py-2 text-sm font-bold transition-colors ${
                                    isSubActive
                                      ? 'bg-cyan-500/10 text-cyan-400'
                                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                  }`}
                                >
                                  {sub.title}
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}

          {/* CTA & Mobile Toggle */}
          <div className="relative z-50 flex items-center gap-4">
            <a
              href="tel:+918961369468"
              className="inline-flex size-9 items-center justify-center gap-1.5 rounded-full bg-white text-sm text-[#05050A] shadow-[0_4px_15px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-[0_4px_25px_rgba(255,255,255,0.3)] active:scale-95 sm:h-auto sm:w-auto sm:px-6 sm:py-2 sm:font-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LuPhone className="size-4 sm:h-3 sm:w-3" />
              <span className="hidden sm:inline">Call</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="relative flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white xl:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative size-4.5">
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
        {isMobileMenuOpen && currentNavLinks && currentNavLinks.length > 0 && (
          <div className="relative z-10 mt-2 flex min-h-0 w-full flex-1 flex-col py-4 xl:hidden">
            <nav className="flex w-full flex-1 flex-col gap-1 overflow-y-auto pr-1">
              {currentNavLinks.map((link, idx) => {
                const isRealLink = link.url && link.url !== '#';
                const isActive =
                  normalizedPathname === link.url ||
                  link.children?.some((sub) => normalizedPathname === sub.url);
                return (
                  <div
                    key={idx}
                    className={`flex flex-col border-b border-white/5 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <Link
                      href={link.url}
                      className={`group flex items-center justify-between py-2 text-base font-bold transition-all duration-300 ${
                        isActive
                          ? 'text-cyan-400'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      onClick={() =>
                        (!link.children ||
                          link.children.length === 0 ||
                          isRealLink) &&
                        setIsMobileMenuOpen(false)
                      }
                    >
                      {link.title}
                      {(!link.children ||
                        link.children.length === 0 ||
                        isRealLink) && (
                        <LuArrowRight
                          className={`size-4 transition-all duration-300 ease-out ${
                            isActive
                              ? 'translate-x-0 text-cyan-400 opacity-100'
                              : '-translate-x-3 text-cyan-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                          }`}
                        />
                      )}
                    </Link>

                    {/* Mobile Subitems */}
                    {link.children && link.children.length > 0 && (
                      <div className="mb-1 ml-2 flex flex-col gap-2 border-l-2 border-white/10 pb-2 pl-4">
                        {link.children
                          .filter((sub) => sub.active)
                          .map((sub, sIdx) => {
                            const isSubActive = normalizedPathname === sub.url;
                            return (
                              <Link
                                key={sIdx}
                                href={sub.url}
                                className={`py-1 text-sm font-semibold transition-colors ${
                                  isSubActive
                                    ? 'text-cyan-400'
                                    : 'text-gray-400 hover:text-cyan-400'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.title}
                              </Link>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Ambient Background glow in Mobile Menu */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 size-62.5 -translate-x-1/2 rounded-full bg-cyan-600/10 blur-[90px]" />
          </div>
        )}
      </div>
    </header>
  );
}
