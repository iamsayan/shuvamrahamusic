import React from "react";
import { BookOpen, PlayCircle, Zap, Brain, Crown, Sparkles, CheckCircle2, GraduationCap } from "lucide-react";

const curriculum = [
  {
    title: "Core Foundations",
    subtitle: "(Start from Zero)",
    icon: BookOpen,
    colSpan: "lg:col-span-2",
    styles: {
      iconBg: "bg-emerald-500/10",
      iconBorder: "border-emerald-500/20",
      iconText: "text-emerald-400",
      iconShadow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
      hoverBorder: "hover:border-emerald-500/40",
      ambientGlow: "bg-emerald-500/10",
    },
    points: [
      "Guitar tuning & setup",
      "Finger exercises & strength building",
      "Basic chords & smooth transitions",
      "Strumming patterns used in real songs"
    ]
  },
  {
    title: "Song Playing & Rhythm",
    subtitle: "(Play along)",
    icon: PlayCircle,
    colSpan: "lg:col-span-2",
    styles: {
      iconBg: "bg-blue-500/10",
      iconBorder: "border-blue-500/20",
      iconText: "text-blue-400",
      iconShadow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
      hoverBorder: "hover:border-blue-500/40",
      ambientGlow: "bg-blue-500/10",
    },
    points: [
      "Play full songs step-by-step",
      "Rhythm playing & timing control",
      "Accompaniment techniques",
      "Confidence while playing"
    ]
  },
  {
    title: "Lead Guitar & Techniques",
    subtitle: "(Shred & Solo)",
    icon: Zap,
    colSpan: "lg:col-span-2",
    styles: {
      iconBg: "bg-orange-500/10",
      iconBorder: "border-orange-500/20",
      iconText: "text-orange-400",
      iconShadow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]",
      hoverBorder: "hover:border-orange-500/40",
      ambientGlow: "bg-orange-500/10",
    },
    points: [
      "Lead playing (melodies & solos)",
      "Vibrato, slides, bends, hammer-ons",
      "Fingerstyle & picking techniques",
      "Classic guitar solos"
    ]
  },
  {
    title: "Music Theory",
    subtitle: "(Made Simple)",
    icon: Brain,
    colSpan: "lg:col-span-3",
    styles: {
      iconBg: "bg-violet-500/10",
      iconBorder: "border-violet-500/20",
      iconText: "text-violet-400",
      iconShadow: "shadow-[0_0_20px_rgba(139,92,246,0.2)]",
      hoverBorder: "hover:border-violet-500/40",
      ambientGlow: "bg-violet-500/10",
    },
    points: [
      "Scales & fingerboard knowledge",
      "Chord construction & voicings",
      "Time signature & key understanding",
      "Modes (explained practically, not confusing)"
    ]
  },
  {
    title: "Advanced Skills",
    subtitle: "(For Growth)",
    icon: Crown,
    colSpan: "lg:col-span-3",
    styles: {
      iconBg: "bg-rose-500/10",
      iconBorder: "border-rose-500/20",
      iconText: "text-rose-400",
      iconShadow: "shadow-[0_0_20px_rgba(244,63,94,0.2)]",
      hoverBorder: "hover:border-rose-500/40",
      ambientGlow: "bg-rose-500/10",
    },
    points: [
      "Improvisation & melody creation",
      "Performance skills & stage confidence",
      "Ear training (rhythm, pitch, harmony)",
      "Sight reading & staff notation"
    ]
  }
];

export default function WhatYouLearn() {
  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden bg-[#05050A]"
      id="curriculum"
    >
      {/* ── Background Ambient Glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        
        {/* === Premium Section Header === */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-bold text-indigo-400 tracking-widest uppercase">
              The Complete Curriculum
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            See What You&apos;ll{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-sm">
              Learn
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl font-medium">
            Master Acoustic & Electric Guitar along with highly practical Music Theory.
          </p>
        </div>

        {/* === Bento Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 w-full">
          {curriculum.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-6 sm:p-8 transition-all duration-500 ${item.styles.hoverBorder} hover:bg-white/[0.04] shadow-lg ${item.colSpan}`}
              >
                {/* Internal Hover Glow */}
                <div className={`absolute top-0 right-0 w-40 h-40 ${item.styles.ambientGlow} blur-[60px] rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-100`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${item.styles.iconBg} border ${item.styles.iconBorder} ${item.styles.iconText} group-hover:scale-110 transition-transform duration-500 ${item.styles.iconShadow} shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className={`text-sm font-medium ${item.styles.iconText} mt-0.5 opacity-80`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="flex flex-col gap-3 mt-auto">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${item.styles.iconText} shrink-0 opacity-60 mt-0.5 group-hover:opacity-100 transition-opacity duration-300`} />
                        <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            );
          })}
        </div>

        {/* === Bottom Neon Ribbon Tagline === */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <div className="group relative inline-flex items-center gap-4 px-6 sm:px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-white/20 transition-colors">
            {/* Ribbon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
            <Sparkles className="w-6 h-6 text-indigo-400 shrink-0" />
            <p className="text-sm sm:text-lg lg:text-xl font-bold text-white text-center">
              From basics to advanced—everything you need to become a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                complete guitarist.
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
