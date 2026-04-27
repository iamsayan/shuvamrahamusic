import React from "react";
import {
  Music,
  Zap,
  Route,
  TrendingUp,
  Sparkles,
  Target,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function WhatYouAchieve() {
  const perfectFor = [
    "You're a beginner, intermediate, or advanced learner",
    "You're a student or working professional with limited time",
    "You're based in India or anywhere globally",
    "You want to play real songs, not just dry theory",
    "You want to learn theory in a simple, practical & fun way",
    "You feel stuck or confused learning from YouTube",
    "You want personal guidance & feedback (not random tutorials)",
  ];

  const notFor = [
    "You're not ready to commit to regular practice",
    "You prefer random free tutorials over structured learning",
    "You're not serious about real progress",
    "You're looking for quick shortcuts instead of building real skills",
    "You expect instant results without effort",
  ];

  return (
    <section
      className="relative w-full py-12 md:py-16 px-5 md:px-12 lg:px-20 overflow-x-clip bg-[#05050A]"
      id="achieve"
    >
      {/* ── Background Glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* === Compact Section Header === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 w-full border-b border-white/5 pb-6">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 mb-4">
              <Target className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-orange-400 tracking-widest uppercase">
                Your Transformation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              What You&apos;ll{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
                Achieve
              </span>
            </h2>
          </div>
        </div>

        {/* === Compact 4-Column Grid (What You Achieve) === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mb-10 md:mb-12">
          {/* Card 1: Play Songs */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-6 transition-all duration-500 hover:border-orange-500/30 hover:bg-white/[0.04] flex flex-col items-center text-center shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-orange-500/20" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Music className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  Play songs confidently
                </h3>
                <p className="text-gray-400 text-sm">
                  (even if starting from absolute zero)
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Learn Faster */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-6 transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.04] flex flex-col items-center text-center shadow-lg">
            <div className="absolute top-0 left-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-violet-500/20" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  Learn faster with clarity
                </h3>
                <p className="text-gray-400 text-sm">
                  (no confusion, no overwhelm)
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Roadmap */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-6 transition-all duration-500 hover:border-emerald-500/30 hover:bg-white/[0.04] flex flex-col items-center text-center shadow-lg">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-emerald-500/20" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Route className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  Structured daily roadmap
                </h3>
                <p className="text-gray-400 text-sm">
                  (always know what to practice)
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Real Improvement */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-6 transition-all duration-500 hover:border-blue-500/30 hover:bg-white/[0.04] flex flex-col items-center text-center shadow-lg">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-blue-500/20" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  See real progress weekly
                </h3>
                <p className="text-gray-400 text-sm">
                  (with personalized feedback)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* === Unified Glassmorphism Panel (Target Audience) === */}
        <div className="relative w-full rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-bl from-rose-500/5 to-transparent pointer-events-none" />

          {/* Left Column: PERFECT FOR YOU */}
          <div className="flex-1 w-full p-6 sm:p-8 lg:p-10 relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-8 flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              Perfect For You If...
            </h3>

            <ul className="flex flex-col gap-4">
              {perfectFor.map((item, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500/50 shrink-0 mt-0.5 group-hover:text-emerald-400 transition-colors duration-300" />
                  <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Divider with VS Badge */}
          <div className="w-full h-px lg:w-px lg:h-auto bg-white/10 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#05050A] border border-white/10 flex items-center justify-center text-xs font-black text-gray-400 z-20 shadow-xl">
              VS
            </div>
          </div>

          {/* Right Column: NOT FOR YOU */}
          <div className="flex-1 w-full p-6 sm:p-8 lg:p-10 relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-8 flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <XCircle className="w-6 h-6" />
              </div>
              NOT For You If...
            </h3>

            <ul className="flex flex-col gap-4">
              {notFor.map((item, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
                >
                  <XCircle className="w-5 h-5 text-rose-500/50 shrink-0 mt-0.5 group-hover:text-rose-400 transition-colors duration-300" />
                  <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
