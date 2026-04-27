"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  Globe,
  Clock,
  Music,
  ArrowRight,
  Sparkles,
  Play,
  Users,
  X
} from "lucide-react";

export default function HeroCSS() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-24 md:pt-32 pb-16 overflow-hidden bg-[#05050A]" id="hero">
      
      {/* ── Immersive Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-orange-600/10 blur-[150px] mix-blend-screen animate-blob-1" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[150px] mix-blend-screen animate-blob-2" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] mix-blend-screen animate-blob-3" />
        
        {/* Subtle noise/grid texture overlay could go here */}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-12 flex flex-col items-center text-center mt-4 lg:mt-8">
        
        {/* ── Glowing Pill ── */}
        <div className="animate-in-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs sm:text-sm font-bold text-gray-200 tracking-wide">
            Rated 5.0 by 100+ Students Worldwide
          </span>
        </div>

        {/* ── Massive Typography ── */}
        <h1 className="animate-in-2 flex flex-col font-black tracking-tight text-white mb-6 select-none">
          <span className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7.5rem] leading-[0.9] tracking-tighter mb-2 lg:mb-4 drop-shadow-2xl">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">Guitar.</span>
          </span>
          <span className="text-[2.5rem] sm:text-[4rem] lg:text-[5.5rem] leading-[1] text-gray-300 tracking-tight flex flex-wrap justify-center items-center gap-3 sm:gap-5">
            Play Your
            <span className="relative inline-flex items-center justify-center px-6 py-2 sm:px-8 sm:py-3 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl sm:rounded-[2rem] -rotate-2 mx-1 sm:mx-2 shadow-2xl">
               <Music className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400 absolute -top-4 -left-4 sm:-top-6 sm:-left-6 -rotate-12 opacity-80" />
               <span className="text-white text-[2.2rem] sm:text-[3.5rem] lg:text-[4.5rem]">Favorite</span>
            </span>
            Songs.
          </span>
        </h1>

        <p className="animate-in-3 max-w-2xl text-base sm:text-lg lg:text-xl text-gray-400 mb-10 leading-relaxed font-medium px-4">
          Step-by-step online and offline guitar coaching. Go from absolute beginner to playing confidently in just 30 days.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="animate-in-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#book"
            className="group relative flex justify-center items-center gap-2 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-black transition-all hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100 mix-blend-overlay rounded-2xl" />
            Book Free Intro Call
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            onClick={() => setIsVideoOpen(true)}
            className="flex justify-center items-center gap-2 w-full sm:w-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold text-white transition-all hover:bg-white/5 hover:border-white/20"
          >
            <Play className="w-5 h-5 text-gray-400" /> Watch Trailer
          </button>
        </div>

        {/* ── Giant Cinematic Image Panel ── */}
        <div className="animate-in-5 relative w-full max-w-6xl mt-16 sm:mt-24 aspect-[4/3] sm:aspect-video lg:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-2 sm:p-4 shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)] group">
          <div className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden bg-[#0a0a0f]">
            <Image
              src="/hero-guitarist.jpg"
              alt="Guitar Coaching"
              fill
              priority
              className="object-cover opacity-80 sm:opacity-90 transition-transform duration-[2000ms] group-hover:scale-105"
            />
            {/* Inner Vignette / Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05050A]/50 via-transparent to-transparent opacity-50" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div 
                 onClick={() => setIsVideoOpen(true)}
                 className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110 group/btn"
               >
                 <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white fill-white ml-2 group-hover/btn:text-orange-400 group-hover/btn:fill-orange-400 transition-colors duration-300" />
               </div>
            </div>
          </div>

          {/* Floating Glass Stats (Hidden on Mobile, Visible on Desktop) */}
          <div className="hidden lg:flex absolute -left-8 top-1/4 items-center gap-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-float-1">
             <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Globe className="w-6 h-6 text-blue-400" />
             </div>
             <div className="flex flex-col text-left pr-4">
                <span className="text-white font-bold text-lg">Global Reach</span>
                <span className="text-gray-400 text-sm">India, USA, UK, CAN</span>
             </div>
          </div>

          <div className="hidden lg:flex absolute -right-8 bottom-1/4 items-center gap-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-float-2">
             <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <Clock className="w-6 h-6 text-emerald-400" />
             </div>
             <div className="flex flex-col text-left pr-4">
                <span className="text-white font-bold text-lg">Flexible Timings</span>
                <span className="text-gray-400 text-sm">Learn at your own pace</span>
             </div>
          </div>

          <div className="hidden lg:flex absolute left-1/4 -bottom-6 items-center gap-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-float-3">
             <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                <Users className="w-6 h-6 text-violet-400" />
             </div>
             <div className="flex flex-col text-left pr-4">
                <span className="text-white font-bold text-lg">Active Community</span>
                <span className="text-gray-400 text-sm">Join 100+ students</span>
             </div>
          </div>
          
        </div>

      </div>

      {/* ── Bottom Fade to Blend into Next Section ── */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#05050A] to-transparent pointer-events-none z-10" />

      {/* ── Video Modal ── */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors backdrop-blur-md border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* YouTube Iframe */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Shuvam Raha Guitar Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
