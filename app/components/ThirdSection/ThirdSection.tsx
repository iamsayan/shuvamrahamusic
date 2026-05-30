"use client";

import {
  Award,
  BadgeCheck,
  Clock,
  Headphones,
  Mic,
  Music,
  Users,
} from "lucide-react";
import Image from "next/image";

// ============================================================================
// DATA STRUCTURES
// ============================================================================

const authorityPoints = [
  {
    title: "Professional Performer",
    desc: "Real stage experience—not just theory-based teaching.",
    icon: Mic,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    title: "11+ Years Experience",
    desc: "A decade of experience teaching students at all levels.",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    title: "Music Producer",
    desc: "Deep understanding of sound, tone & modern music production.",
    icon: Headphones,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "LCM Certified",
    desc: "Passed with Distinction. Strong academic + practical foundation.",
    icon: Award,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    title: "100+ Students Trained",
    desc: "Proven track record across India, USA, UK & Canada.",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Multi-Genre Expertise",
    desc: "Bollywood, English Pop, Rock, Fingerstyle, Acoustic & more.",
    icon: Music,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProgramOverview() {
  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden bg-[#05050A]"
      id="overview"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-rose-600/5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Column: Image / Portrait Card */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0f]">
                <Image
                  src="/hero-guitarist.jpg"
                  alt="Shuvam Raha"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  sizes="(max-width: 1024px) 380px, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/10 backdrop-blur-md mb-2">
                    <BadgeCheck className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      Verified Instructor
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white">
                    Shuvam Raha
                  </h3>
                  <p className="text-gray-300 font-medium">
                    Professional Guitarist & Educator
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Why Learn From Shuvam */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
                Why Learn from{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                  Shuvam Raha?
                </span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium">
                Learn from an active professional performer and music producer
                with over a decade of teaching experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {authorityPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] hover:border-white/10 transition-colors duration-300"
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${point.bg} border ${point.border} ${point.color}`}
                  >
                    <point.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      {point.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
