import React from "react";
import { Music, Zap, Route, TrendingUp, Sparkles, Target } from "lucide-react";

export default function WhatYouAchieve() {
  return (
    <section className="relative w-full py-20 px-5 md:px-12 lg:px-20 overflow-x-clip bg-[#05050A]" id="achieve">
      
      {/* ── Background Glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* === Section Header === */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-400 tracking-wide uppercase">
              Your Transformation
            </span>
          </div>
          
          <h2 className="flex flex-col font-extrabold tracking-tight text-white mb-2">
            <span className="flex items-center justify-center gap-2 sm:gap-4 text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.1]">
              <span>What You&apos;ll</span>
              <span className="relative inline-block px-2">
                <span className="absolute -inset-1 blur-lg bg-orange-500/20 rounded-full"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 py-1 mb-0 mt-0 tracking-tight leading-none">
                  Achieve
                </span>
              </span>
            </span>
          </h2>
        </div>

        {/* === Symmetrical Bento Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 mt-16 w-full">
          
          {/* Card 1: 50% width - Play Songs */}
          <div className="group relative col-span-1 md:col-span-6 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-8 sm:p-10 transition-all duration-500 hover:border-orange-500/30 hover:bg-white/[0.04]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-orange-500/20" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <Music className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Play your favorite songs confidently
                </h3>
                <p className="text-gray-400 text-lg">
                  (even if you&apos;re starting from absolute zero)
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: 50% width - Learn Faster */}
          <div className="group relative col-span-1 md:col-span-6 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-8 sm:p-10 transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.04]">
            <div className="absolute top-0 left-0 w-48 h-48 bg-violet-500/10 blur-[60px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-violet-500/20" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Learn faster with clear guidance
                </h3>
                <p className="text-gray-400 text-base">
                  (no confusion, no overwhelm)
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: 50% width - Roadmap */}
          <div className="group relative col-span-1 md:col-span-6 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-8 sm:p-10 transition-all duration-500 hover:border-emerald-500/30 hover:bg-white/[0.04]">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-emerald-500/20" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Route className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Structured step-by-step roadmap
                </h3>
                <p className="text-gray-400 text-base">
                  (always know what to practice next)
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: 50% width - Real Improvement */}
          <div className="group relative col-span-1 md:col-span-6 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-8 sm:p-10 transition-all duration-500 hover:border-blue-500/30 hover:bg-white/[0.04]">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-blue-500/20" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-8 md:flex-row md:items-end">
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    See real improvement every week
                  </h3>
                  <p className="text-gray-400 text-lg">
                    (with personalized feedback & correction)
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* === Bottom Neon Ribbon Tagline === */}
        <div className="mt-16 sm:mt-24 flex justify-center">
          <div className="group relative inline-flex items-center gap-4 px-6 sm:px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Ribbon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
            <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
            <p className="text-lg sm:text-xl font-bold text-white">
              From beginner to confident player—<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">step by step.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
