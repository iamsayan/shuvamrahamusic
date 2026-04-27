"use client";

import React from "react";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight,
  Music
} from "lucide-react";

// === CUSTOM SOCIAL SVGS ===
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const quickLinks = [
  { name: "Curriculum", href: "#overview" },
  { name: "Meet Your Coach", href: "#overview" },
  { name: "Student Success", href: "#reviews" },
  { name: "Pricing & Plans", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

const socialLinks = [
  { name: "Instagram", icon: InstagramIcon, href: "#", hoverColor: "group-hover:text-pink-500", hoverBg: "group-hover:border-pink-500/50 group-hover:bg-pink-500/10" },
  { name: "YouTube", icon: YoutubeIcon, href: "#", hoverColor: "group-hover:text-red-500", hoverBg: "group-hover:border-red-500/50 group-hover:bg-red-500/10" },
  { name: "Facebook", icon: FacebookIcon, href: "#", hoverColor: "group-hover:text-blue-500", hoverBg: "group-hover:border-blue-500/50 group-hover:bg-blue-500/10" },
];

export default function Footer() {
  return (
    <footer className="relative w-full pt-16 md:pt-24 pb-6 overflow-hidden bg-[#020205]">
      
      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-[2px]" />
      
      {/* Dynamic CSS for Infinite Marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-text {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-text {
          animation: scroll-text 40s linear infinite;
        }
      `}} />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] md:h-[400px] bg-gradient-to-b from-cyan-900/20 via-blue-900/5 to-transparent blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-900/10 blur-[100px] md:blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-20">
        
        {/* === TOP SECTION === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-16 md:mb-20">
          
          {/* Brand & Mission (Col span 5) */}
          <div className="sm:col-span-2 md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Music className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-black text-white tracking-tight">
                Shuvam Raha
              </span>
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-md">
              Helping aspiring guitarists break past their limits and master the instrument through structured, personalized, and engaging coaching.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  className={`group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 ${social.hoverBg}`}
                  aria-label={social.name}
                >
                  <social.icon className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-colors duration-300 ${social.hoverColor}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Col span 3) */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg tracking-wide">Navigation</h4>
            <ul className="flex flex-col w-full">
              {quickLinks.map((link, idx) => (
                <li key={idx} className="group relative border-b border-white/5 last:border-0">
                  <Link 
                    href={link.href} 
                    className="relative flex items-center justify-between py-3.5 md:py-4 overflow-hidden w-full"
                  >
                    {/* Animated Neon Underline */}
                    <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 to-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    
                    {/* Text and Index Shift */}
                    <div className="flex items-center gap-4 relative z-10 transform transition-transform duration-500 ease-out group-hover:translate-x-3">
                      <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-gray-600 group-hover:text-cyan-400 transition-colors duration-300">
                        0{idx + 1}
                      </span>
                      <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                        {link.name}
                      </span>
                    </div>
                    
                    {/* Rotating Arrow */}
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 relative z-10 transform transition-all duration-500 ease-out group-hover:rotate-45 group-hover:scale-110" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information (Col span 4) */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg tracking-wide">Get in Touch</h4>
            <div className="flex flex-col gap-3 md:gap-4">
              <a href="mailto:hello@shuvamraha.com" className="group flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors font-medium">
                    hello@shuvamraha.com
                  </p>
                </div>
              </a>

              <a href="tel:+919876543210" className="group flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Phone / WhatsApp</p>
                  <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors font-medium">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              <div className="group flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-default">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300">
                  <MapPin className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Studio Location</p>
                  <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors font-medium">
                    Kolkata, India <br/>
                    <span className="text-xs text-gray-500 font-normal">(Online Classes Global)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* === MASSIVE DISPLAY TEXT MARQUEE === */}
        <div className="relative w-full border-t border-white/10 pt-8 md:pt-10 pb-4 md:pb-6 overflow-hidden flex items-center select-none group">
          <div className="flex w-max animate-scroll-text group-hover:opacity-50 transition-opacity duration-700">
            {[...Array(4)].map((_, i) => (
              <h2 key={i} className="text-[18vw] md:text-[12vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent tracking-tighter uppercase whitespace-nowrap px-8 md:px-12">
                Shuvam Raha
              </h2>
            ))}
          </div>
          {/* Edge Gradients for Smooth Fade */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#020205] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#020205] to-transparent pointer-events-none" />
        </div>

        {/* === BOTTOM COPYRIGHT ROW === */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-gray-500 text-xs sm:text-sm font-medium text-center sm:text-left">
            &copy; {new Date().getFullYear()} Shuvam Raha Music. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
