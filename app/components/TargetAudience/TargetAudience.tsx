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
      className="relative w-full py-20 px-5 md:px-12 lg:px-20 overflow-x-clip bg-[#05050A]"
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

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* === Section Header === */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">
              Who Is This For?
            </span>
          </div>

          <h2 className="flex flex-col font-extrabold tracking-tight text-white mb-2">
            <span className="flex items-center justify-center gap-2 sm:gap-4 text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.1]">
              <span>Is This</span>
              <span className="relative inline-block px-2">
                <span className="absolute -inset-1 blur-lg bg-blue-500/20 rounded-full"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 py-1 mb-0 mt-0 tracking-tight leading-none">
                  For You?
                </span>
              </span>
            </span>
          </h2>
        </div>

        {/* === Dual Window Split Layout === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full mt-16">
          
          {/* Card 1: PERFECT FOR YOU */}
          <div className="group relative rounded-[2rem] border border-emerald-500/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-8 sm:p-10 transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-emerald-500/20" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  This Is <span className="text-emerald-400">Perfect</span> For You If...
                </h3>
              </div>
              
              <ul className="flex flex-col gap-1.5">
                {perfectFor.map((item, i) => (
                  <li 
                    key={i} 
                    className="group/item relative flex items-start gap-3.5 p-3 rounded-xl border border-transparent hover:bg-emerald-500/[0.04] hover:border-emerald-500/20 transition-all duration-300 hover:translate-x-1.5 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-transparent translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-500" />
                    
                    <CheckCircle2 className="relative w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0 mt-0.5 group-hover/item:text-emerald-400 group-hover/item:scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-300" />
                    
                    <span className="relative text-sm sm:text-base font-medium text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: NOT FOR YOU */}
          <div className="group relative rounded-[2rem] border border-rose-500/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-8 sm:p-10 transition-all duration-500 hover:border-rose-500/30 hover:bg-rose-500/[0.02]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[80px] rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-rose-500/20" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                  <XCircle className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  This Is <span className="text-rose-400">NOT</span> For You If...
                </h3>
              </div>
              
              <ul className="flex flex-col gap-1.5">
                {notFor.map((item, i) => (
                  <li 
                    key={i} 
                    className="group/item relative flex items-start gap-3.5 p-3 rounded-xl border border-transparent hover:bg-rose-500/[0.04] hover:border-rose-500/20 transition-all duration-300 hover:translate-x-1.5 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/5 to-transparent translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-500" />

                    <XCircle className="relative w-5 h-5 sm:w-6 sm:h-6 text-rose-500 shrink-0 mt-0.5 group-hover/item:text-rose-400 group-hover/item:scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)] transition-all duration-300" />
                    
                    <span className="relative text-sm sm:text-base font-medium text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
