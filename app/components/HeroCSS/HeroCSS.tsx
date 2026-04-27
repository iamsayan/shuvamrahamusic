"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Play,
  ArrowRight,
  Music,
  CheckCircle2,
  Award,
  Users,
  X,
} from "lucide-react";

export default function HeroCSS() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 md:pt-32 pb-16 overflow-hidden bg-[#020205]">
      {/* Dynamic Keyframes for Floating Elements */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
        }
        .animate-float-1 { animation: float-1 5s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 6s ease-in-out infinite; }
      `,
        }}
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep blue/cyan ambient lighting */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-900/20 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-900/10 blur-[150px] mix-blend-screen" />
        {/* Top Fade */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#020205] to-transparent z-10" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* ── Left Column: Typography & CTAs ── */}
        <div className="flex-1 flex flex-col items-start text-left pt-10 lg:pt-0">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-bold text-cyan-100 tracking-wide uppercase">
              LCM Certified Music Instructor
            </span>
          </div>

          {/* H1 Headline (SEO Optimized) */}
          <h1 className="font-black tracking-tighter text-white mb-6">
            <span className="block text-sm sm:text-base font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3 ml-1">
              Online Guitar Classes
            </span>
            <span className="block text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
              Stop Guessing.
            </span>
            <span className="block text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[1.05]">
              Start{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                Playing.
              </span>
            </span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-gray-400 mb-8 leading-relaxed font-medium">
            Break past your limits with structured, 1-on-1 guitar coaching.
            Whether you're an absolute beginner or looking to master advanced
            solos, learn at your own pace from anywhere in the world.
          </p>

          {/* Key Benefits */}
          <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-10">
            <li className="flex items-center gap-2 text-gray-300 font-medium text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              Tailored Curriculum
            </li>
            <li className="flex items-center gap-2 text-gray-300 font-medium text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              Flexible Timings
            </li>
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="#pricing"
              className="group relative flex justify-center items-center gap-2 w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] active:scale-95"
            >
              Book Free Intro Call
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group flex justify-center items-center gap-3 w-full sm:w-auto rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
              Watch
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 mt-10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#020205] bg-gray-800 overflow-hidden relative shadow-lg"
                >
                  <Image
                    src={`/hero-guitarist.jpg`}
                    alt="Student"
                    fill
                    className="object-cover opacity-50"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-400 mt-0.5">
                Loved by 100+ students worldwide
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Hero Visuals ── */}
        <div className="flex-1 w-full relative mt-16 lg:mt-0">
          <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-[450px] mx-auto lg:max-w-none lg:ml-auto">
            {/* The Main Image Container */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] group">
              <Image
                src="/hero-guitarist.jpg"
                alt="Shuvam Raha - Online Guitar Instructor"
                fill
                priority
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-80" />

              {/* Central Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110 group/btn"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1.5 group-hover/btn:text-cyan-400 group-hover/btn:fill-cyan-400 transition-colors duration-300" />
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            {/* 1. Feature Indicator */}
            <div className="absolute -left-2 sm:-left-12 top-[15%] sm:top-1/4 flex items-center gap-3 p-3 sm:p-4 rounded-2xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl shadow-2xl animate-float-1 pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-white font-bold text-sm sm:text-base leading-tight">
                  1-on-1 Sessions
                </span>
                <span className="text-gray-400 text-xs">
                  Personalized Focus
                </span>
              </div>
            </div>

            {/* 2. Genre Indicator */}
            <div className="absolute -right-2 sm:-right-8 bottom-[15%] sm:bottom-1/4 flex items-center gap-3 p-3 sm:p-4 rounded-2xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl shadow-2xl animate-float-2 pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                <Music className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-white font-bold text-sm sm:text-base leading-tight">
                  All Genres
                </span>
                <span className="text-gray-400 text-xs">
                  Rock, Pop, Acoustic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Video Modal ── */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#020205]/90 backdrop-blur-lg"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors backdrop-blur-md border border-white/10"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute inset-0 bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Mldyf1c3uxc?autoplay=1"
                title="Shuvam Raha - Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
