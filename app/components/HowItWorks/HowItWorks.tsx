import React from "react";
import {
  Settings,
  PhoneCall,
  Map,
  PlayCircle,
  TrendingUp,
  Globe2,
  Sparkles,
  Settings2,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Learning Plan",
      desc: "Pick the program that fits your goals (online or offline)",
      icon: <Settings2 className="w-6 h-6" />,
      colClass: "md:col-span-4",
    },
    {
      num: "02",
      title: "Book Your Free Intro Call",
      desc: "Discuss your level, goals, and availability",
      icon: <PhoneCall className="w-6 h-6" />,
      colClass: "md:col-span-4",
    },
    {
      num: "03",
      title: "Get Your Personalized Roadmap",
      desc: "A clear step-by-step plan tailored to you",
      icon: <Map className="w-6 h-6" />,
      colClass: "md:col-span-4",
    },
    {
      num: "04",
      title: "Start Your Monthly Sessions",
      desc: "Attend structured weekly classes (online/offline)",
      icon: <PlayCircle className="w-6 h-6" />,
      colClass: "md:col-start-3 md:col-span-4",
    },
    {
      num: "05",
      title: "Track Your Weekly Progress",
      desc: "Get feedback, improve faster, and stay consistent",
      icon: <TrendingUp className="w-6 h-6" />,
      colClass: "md:col-start-7 md:col-span-4",
    },
  ];

  return (
    <section
      className="relative w-full py-12 md:py-16 overflow-x-clip bg-[#05050A]"
      id="how-it-works"
    >
      {/* ── Background Ambient Glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        {/* === Compact Section Header === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 w-full border-b border-white/5 pb-6">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-4">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                The Process
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              How It{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Works
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-md md:text-right">
            Start learning guitar in 5 simple steps.
          </p>
        </div>

        {/* === Compact Horizontal Timeline === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 w-full mt-10 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-0" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center px-4 transition-all duration-500"
            >
              {/* Massive Sheer Number Background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-black text-[6rem] leading-none text-white/[0.03] group-hover:text-cyan-500/5 group-hover:-translate-y-4 transition-all duration-500 select-none pointer-events-none z-0">
                {step.num}
              </div>

              {/* Glowing Glass Icon */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#05050A] border border-cyan-500/20 text-cyan-500/60 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 group-hover:text-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-all duration-500 mb-6">
                {step.icon}
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex flex-col gap-2 w-full">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Mobile/Tablet Arrow */}
              {i < steps.length - 1 && (
                <div className="lg:hidden mt-4 text-cyan-500/20">
                  <ArrowDown className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* === Compact Global Availability Banner === */}
        <div className="mt-12 w-full">
          <div className="relative w-full rounded-[2rem] border border-cyan-500/20 bg-[#05050A] overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 py-6 md:px-10 md:py-8 shadow-[0_0_40px_rgba(6,182,212,0.05)] transition-colors duration-500 hover:border-cyan-500/40">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 relative z-10 text-center md:text-left">
              {/* Spinning Globe Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Globe2 className="w-6 h-6 md:w-7 md:h-7 animate-[spin_8s_linear_infinite]" />
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                  Learn From <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Anywhere</span>
                </h3>
                <p className="text-gray-400 text-sm sm:text-base max-w-lg">
                  Flexible scheduling tailored exactly to your local time zone.
                </p>
              </div>
            </div>

            {/* Right Side Pulse Badge */}
            <div className="mt-5 md:mt-0 relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Available Worldwide
              </span>
            </div>
            
            {/* Glowing Floor Trim */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
