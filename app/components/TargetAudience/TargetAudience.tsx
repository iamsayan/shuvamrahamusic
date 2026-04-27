import React from "react";
import { CheckCircle2, XCircle, Users } from "lucide-react";

export default function TargetAudience() {
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
      className="relative w-full py-8 md:py-10 overflow-x-clip bg-[#05050A]"
      id="audience"
    >
      {/* ── Glowing Separator ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[80%] md:max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[50%] md:max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-[2px] z-20" />

      {/* ── Ambient Background Glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        {/* Soft left green glow */}
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-600/5 blur-[130px] mix-blend-screen" />
        {/* Soft right red glow */}
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-rose-600/5 blur-[130px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        {/* === Compact Section Header === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 w-full border-b border-white/5 pb-6">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 mb-4">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
                Who Is This For?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Is This{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                For You?
              </span>
            </h2>
          </div>
        </div>

        {/* === Unified Glassmorphism Panel === */}
        <div className="relative w-full rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl overflow-hidden mt-6 flex flex-col lg:flex-row">
          
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
