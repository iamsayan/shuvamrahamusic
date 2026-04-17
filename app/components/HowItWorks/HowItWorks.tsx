import React from "react";
import { Settings, PhoneCall, Map, PlayCircle, TrendingUp, Globe2, Sparkles, Settings2, ArrowRight, ArrowDown } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Learning Plan",
      desc: "Pick the program that fits your goals (online or offline)",
      icon: <Settings2 className="w-6 h-6" />,
      colClass: "md:col-span-4"
    },
    {
      num: "02",
      title: "Book Your Free Intro Call",
      desc: "Discuss your level, goals, and availability",
      icon: <PhoneCall className="w-6 h-6" />,
      colClass: "md:col-span-4"
    },
    {
      num: "03",
      title: "Get Your Personalized Roadmap",
      desc: "A clear step-by-step plan tailored to you",
      icon: <Map className="w-6 h-6" />,
      colClass: "md:col-span-4"
    },
    {
      num: "04",
      title: "Start Your Monthly Sessions",
      desc: "Attend structured weekly classes (online/offline)",
      icon: <PlayCircle className="w-6 h-6" />,
      colClass: "md:col-start-3 md:col-span-4"
    },
    {
      num: "05",
      title: "Track Your Weekly Progress",
      desc: "Get feedback, improve faster, and stay consistent",
      icon: <TrendingUp className="w-6 h-6" />,
      colClass: "md:col-start-7 md:col-span-4"
    }
  ];

  return (
    <section className="relative w-full py-20 px-5 md:px-12 lg:px-20 overflow-x-clip bg-[#05050A]" id="how-it-works">
      
      {/* ── Background Ambient Glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* === Section Header === */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400 tracking-wide uppercase">
              The Process
            </span>
          </div>
          
          <h2 className="flex flex-col font-extrabold tracking-tight text-white mb-2">
            <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.1]">
              <span>How It</span>
              <span className="relative inline-block px-2">
                <span className="absolute -inset-1 blur-lg bg-cyan-500/20 rounded-full"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 py-1 mb-0 mt-0 tracking-tight leading-none">
                  Works
                </span>
              </span>
            </span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Start learning guitar in 5 simple steps.</p>
        </div>

        {/* === Full-Width Premium Directory List === */}
        <div className="flex flex-col w-full mt-16 relative border-t border-cyan-500/10">
          
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col md:flex-row md:items-center py-8 sm:py-10 px-0 md:px-4 border-b border-cyan-500/10 hover:border-cyan-500/30 transition-colors duration-500 overflow-hidden"
            >
              {/* Hover Ambient Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

              {/* 1. Massive Sheer Number (Left Side) */}
              <div className="w-full md:w-40 lg:w-56 shrink-0 flex items-center mb-4 md:mb-0 relative z-10">
                <span className="font-extrabold text-[4rem] md:text-[5rem] lg:text-[6.5rem] leading-none text-white/[0.05] group-hover:text-cyan-500 group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:translate-x-4 transition-all duration-500 select-none">
                  {step.num}
                </span>
              </div>

              {/* 2. Text Content (Middle) */}
              <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pr-0 md:pr-12 relative z-10 w-full">
                
                <div className="flex flex-col gap-3 max-w-2xl">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-cyan-50 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* 3. Glowing Glass Icon (Far Right) */}
              <div className="absolute top-8 right-0 md:relative md:top-0 md:right-0 shrink-0 flex items-center justify-center w-14 h-14 md:w-20 md:h-20 mr-2 md:mr-6 rounded-2xl md:rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10 text-cyan-500/40 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 group-hover:text-cyan-400 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] group-hover:scale-[1.15] transition-transform duration-500 z-10">
                {step.icon}
              </div>

              {/* Mobile Only Flow Arrow */}
              {i < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-4 left-6 text-cyan-500/30 z-20">
                  <ArrowDown className="w-5 h-5" />
                </div>
              )}

            </div>
          ))}
        </div>

        {/* === Global Availability Cinematic Banner === */}
        <div className="mt-28 md:mt-32 w-full relative group">
          
          {/* Main Cinematic Container */}
          <div className="relative w-full rounded-[2.5rem] md:rounded-[3rem] border border-cyan-500/20 bg-gradient-to-b from-[#05050A] to-[#010810] overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.05)] transition-all duration-700 hover:shadow-[0_0_80px_rgba(6,182,212,0.15)] hover:border-cyan-500/40">
            
            {/* Background Ambient Radar Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start px-6 py-12 md:p-12 lg:p-16 relative z-10 gap-10 lg:gap-16">
              
              {/* Animated Radar/Globe HUD */}
              <div className="relative flex justify-center items-center shrink-0">
                  {/* Radar Pings */}
                  <div className="absolute w-40 h-40 rounded-full border border-cyan-500/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <div className="absolute w-32 h-32 rounded-full border border-cyan-400/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
                  
                  {/* Holographic Globe */}
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl border border-cyan-400/50 rounded-full flex items-center justify-center text-cyan-300 relative z-10 shadow-[0_0_40px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-700">
                      <Globe2 className="w-10 h-10 group-hover:animate-[spin_4s_linear_infinite]" />
                  </div>
              </div>

              {/* Cinematic Typography */}
              <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-4">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase uppercase">Worldwide</span>
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-50 to-cyan-200 mb-3 tracking-tight">
                    Learn From <br className="hidden sm:block md:hidden" /> Anywhere
                  </h3>
                  
                  <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-medium max-w-xl leading-relaxed">
                    Flexible scheduling tailored precisely to your local time zone—bringing world-class guitar lessons directly to you.
                  </p>
              </div>

            </div>

            {/* Glowing Floor Trim */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent group-hover:via-cyan-400 transition-all duration-700"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
