'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string; // Supports standard keys like '5xl' or custom classes like 'max-w-[1400px]'
  textAlign?: 'left' | 'center';
}

const segmentNames: Record<string, string> = {
  'guitar-classes-with-shuvam': 'Guitar Classes',
  pay: 'Payment Portal',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'refund-policy': 'Refund Policy',
  contact: 'Contact Us',
  'my-gears': 'My Gears',
  'performance-highlights': 'Performance Highlights',
};

export default function PageLayout({
  title,
  subtitle,
  children,
  maxWidth = 'max-w-[1400px]',
  textAlign = 'left',
}: PageLayoutProps) {
  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];

  const getBreadcrumbs = () => {
    const items: { name: string; href?: string }[] = [
      { name: 'Home', href: '/' },
    ];
    let currentPath = '';

    pathSegments.forEach((segment, idx) => {
      currentPath += `/${segment}`;
      const name = segmentNames[segment] || segment.replace(/-/g, ' ');
      const formattedName = segmentNames[segment]
        ? name
        : name.charAt(0).toUpperCase() + name.slice(1);

      items.push({
        name: formattedName,
        href: idx === pathSegments.length - 1 ? undefined : currentPath,
      });
    });

    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  const maxWMap = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  };

  const maxWidthClass = maxWidth.startsWith('max-w-')
    ? maxWidth
    : maxWMap[maxWidth as keyof typeof maxWMap] || 'max-w-[1400px]';
  const textAlignmentClass =
    textAlign === 'center'
      ? 'items-center text-center'
      : 'items-start text-left';

  return (
    <main className="relative min-h-screen bg-[#05050A] pt-24 pb-24 text-[#f0f0f5]">
      {/* Floating Instrument Accents */}
      {/* <div className="animate-float-1 pointer-events-none absolute top-1/3 left-8 hidden opacity-20 xl:block">
        <LuMusic className="h-8 w-8 text-cyan-400" />
      </div>
      <div className="animate-float-2 pointer-events-none absolute top-1/2 right-12 hidden opacity-15 xl:block">
        <LuMusic className="h-6 w-6 text-violet-400" />
      </div> */}

      {/* Unified Width Container - keeps Header and Card perfectly aligned */}
      <div
        className={`relative z-10 mx-auto flex w-full ${maxWidthClass} flex-col px-5 md:px-12 lg:px-20`}
      >
        {/* Top Page Header (Matching Landing Hero) */}
        <div
          className={`flex w-full flex-col pt-8 pb-6 ${textAlign === 'center' ? 'items-center text-center' : 'items-start text-left'}`}
        >
          {/* Breadcrumbs trail */}
          <nav
            className={`font-heading mb-6 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase sm:text-xs ${textAlign === 'center' ? 'justify-center' : 'justify-start'}`}
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span className="text-[10px] font-normal text-gray-700 sm:text-xs">
                      /
                    </span>
                  )}
                  {isLast ? (
                    <span className="font-black tracking-wide text-cyan-400">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href || '#'}
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <h1 className="font-heading mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-xs leading-relaxed text-gray-400 sm:text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Main Content Card (Matching the Logistics Dashboard Card) */}
        <div
          className={`group/card relative flex w-full flex-col ${textAlignmentClass} overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#07070F]/85 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-500 hover:border-cyan-500/20 sm:p-10 md:p-12`}
        >
          {/* Glowing Top Accent Strip */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-60" />

          {/* Children content slots */}
          <div className="w-full text-xs leading-relaxed text-gray-300 sm:text-sm md:text-base">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
