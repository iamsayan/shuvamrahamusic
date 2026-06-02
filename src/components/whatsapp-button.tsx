"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const pathname = usePathname();

  // Hide floating WhatsApp button on pay page to prevent visual distraction
  if (pathname === "/guitar-classes-with-shuvam/pay") {
    return null;
  }

  return (
    <a
      href="https://wa.me/918961369468"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-0 group-hover:gap-2 px-3.5 py-3.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-xl text-emerald-400 hover:text-white transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] overflow-hidden"
      aria-label="Chat on WhatsApp"
    >
      {/* Ambient Pulsing outer ring */}
      <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25 scale-75 group-hover:scale-100 group-hover:opacity-0 transition-all duration-700 pointer-events-none" />

      {/* Light shimmer swipe effect */}
      <span className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-1/2 transition-transform duration-1000 ease-out" />

      {/* Tooltip that slides out on hover */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-black tracking-wider uppercase transition-all duration-500 ease-out group-hover:max-w-[100px] pr-0 group-hover:pr-2 select-none font-mono">
        Chat With Us
      </span>

      {/* Icon */}
      <FaWhatsapp className="w-5 h-5 group-hover:rotate-[12deg] transition-transform duration-300 shrink-0" />
    </a>
  );
}
