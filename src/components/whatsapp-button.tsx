'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsappButton() {
  const pathname = usePathname();

  // Hide floating WhatsApp button on pay page to prevent visual distraction
  if (pathname === '/guitar-classes-with-shuvam/pay') {
    return null;
  }

  return (
    <a
      href="https://wa.me/918961369468"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-6 z-50 flex items-center gap-0 overflow-hidden rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-3.5 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-xl transition-all duration-500 group-hover:gap-2 hover:scale-105 hover:text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      {/* Ambient Pulsing outer ring */}
      <span className="pointer-events-none absolute inset-0 scale-75 animate-ping rounded-full border border-emerald-400 opacity-25 transition-all duration-700 group-hover:scale-100 group-hover:opacity-0" />

      {/* Light shimmer swipe effect */}
      <span className="absolute inset-0 w-[200%] -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-1/2" />

      {/* Tooltip that slides out on hover */}
      <span className="max-w-0 overflow-hidden pr-0 text-xs font-black tracking-wider whitespace-nowrap transition-all duration-500 ease-out select-none group-hover:max-w-[100px] group-hover:pr-2">
        Chat
      </span>

      {/* Icon */}
      <FaWhatsapp className="shrink-0 transition-transform duration-300 group-hover:rotate-[12deg] size-5" />
    </a>
  );
}
