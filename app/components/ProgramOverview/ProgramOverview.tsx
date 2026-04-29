"use client";

import {
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Crown,
  FileText,
  GraduationCap,
  Headphones,
  Info,
  MessageCircle,
  Mic,
  Music,
  PlayCircle,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
      "Strumming patterns used in real songs",
    ],
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
      "Confidence while playing",
    ],
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
      "Classic guitar solos",
    ],
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
      "Modes (explained practically, not confusing)",
    ],
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
      "Sight reading & staff notation",
    ],
  },
];

const features = [
  {
    title: "Learning Support & Guidance",
    desc: "Everything you need to learn, practice, and improve—fully structured.",
    icon: ShieldCheck,
    points: [
      {
        t: "Free Introductory Call",
        d: "Understand your level + get a personalized roadmap",
      },
      {
        t: "Structured Syllabus",
        d: "Beginner to Advanced. Always know your next step",
      },
      { t: "Practice Routine (PDF)", d: "Clear daily plan—no confusion" },
      {
        t: "Curated Song List",
        d: "Learn songs based on your taste & skill level",
      },
    ],
  },
  {
    title: "Study Materials & Resources",
    desc: "All materials are shared for easy access anytime via WhatsApp or Email.",
    icon: FileText,
    points: [
      { t: "Practice PDFs", d: "Detailed tabs, notes, and exercises" },
      { t: "Visual Guides", d: "High-quality lesson photos & diagrams" },
      { t: "Audio Tracks", d: "Backing tracks for rhythm & timing control" },
      {
        t: "Video Lessons",
        d: "Recorded video breakdowns for complex sections",
      },
    ],
  },
  {
    title: "Certification (Optional)",
    desc: "Ideal for students who want formal certification & structured growth.",
    icon: Award,
    points: [
      {
        t: "Global Recognition",
        d: "Appear for internationally recognized guitar grade exams",
      },
      {
        t: "Exam Preparation",
        d: "Aligned with reputed Western music boards (like LCM/Trinity)",
      },
      {
        t: "Focused Syllabus",
        d: "Structured specifically to pass your desired grade",
      },
    ],
  },
  {
    title: "Ongoing Support",
    desc: "Never feel stuck. Get help exactly when you need it.",
    icon: MessageCircle,
    points: [
      { t: "Direct WhatsApp Support", d: "Ask doubts anytime between classes" },
      {
        t: "Video Feedback",
        d: "Send short videos of your playing for posture & technique corrections",
      },
    ],
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProgramOverview({ defaultTab = "instructor" }) {
  const [activeTab, setActiveTab] = useState<"instructor" | "curriculum" | "system">(defaultTab);

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#05050A]" id="overview">
      {/* Dynamic Background Glow based on Active Tab */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-colors duration-1000">
        {activeTab === "instructor" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-rose-600/5 blur-[150px] mix-blend-screen" />
        )}
        {activeTab === "curriculum" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-[150px] mix-blend-screen" />
        )}
        {activeTab === "system" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-600/5 blur-[150px] mix-blend-screen" />
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        {/* === SECTION HEADER & TABS === */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-8">
            The Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              Program
            </span>
          </h2>

          {/* Glass Segmented Control (Tabs) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("instructor")}
              className={`px-5 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "instructor"
                  ? "bg-rose-500/20 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)] border border-rose-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Star className="w-4 h-4" /> Meet Your Coach
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`px-5 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "curriculum"
                  ? "bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.2)] border border-indigo-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Curriculum
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`px-5 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "system"
                  ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] border border-cyan-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Learning System
            </button>
          </div>
        </div>

        {/* === TAB CONTENT === */}
        <div className="relative w-full">
          {/* TAB 1: INSTRUCTOR */}
          {activeTab === "instructor" && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
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
                        <h3 className="text-3xl font-black text-white">Shuvam Raha</h3>
                        <p className="text-gray-300 font-medium">
                          Professional Guitarist & Educator
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-7/12 flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center lg:text-left">
                    Why Learn From <span className="text-rose-400">Shuvam?</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {authorityPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] hover:border-white/10 transition-colors"
                      >
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${point.bg} border ${point.border} ${point.color}`}
                        >
                          <point.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg mb-1">{point.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{point.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM */}
          {activeTab === "curriculum" && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 w-full">
                {curriculum.map((item, i) => (
                  <div
                    key={i}
                    className={`group relative rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-6 sm:p-8 hover:bg-white/[0.04] transition-colors ${item.colSpan}`}
                  >
                    <div
                      className={`absolute top-0 right-0 w-40 h-40 ${item.styles.ambientGlow} blur-[60px] rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-100`}
                    />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`flex items-center justify-center w-14 h-14 rounded-2xl ${item.styles.iconBg} border ${item.styles.iconBorder} ${item.styles.iconText} shrink-0`}
                        >
                          <item.icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white leading-tight">
                            {item.title}
                          </h3>
                          <p
                            className={`text-sm font-medium ${item.styles.iconText} mt-0.5 opacity-80`}
                          >
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <ul className="flex flex-col gap-3 mt-auto">
                        {item.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2
                              className={`w-5 h-5 ${item.styles.iconText} shrink-0 opacity-60 mt-0.5 group-hover:opacity-100 transition-opacity`}
                            />
                            <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LEARNING SYSTEM & LOGISTICS */}
          {activeTab === "system" && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                        <feature.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium">{feature.desc}</p>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-4 flex-1">
                      {feature.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-gray-200 block sm:inline">{point.t} — </strong>
                            <span className="text-gray-400 text-sm sm:text-base">{point.d}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Logistics / Schedule Dashboard */}
              <div className="relative w-full rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-3xl overflow-hidden p-8 sm:p-12">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-50" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-6 h-6 text-cyan-400" />
                      <h3 className="text-xl font-bold text-white">Class Schedule</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Available Timings (IST)</p>
                    <ul className="flex flex-col gap-3">
                      <li className="flex items-center gap-2 text-gray-200 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                        <strong className="w-20">Mon - Wed:</strong> <span>10:00 AM – 9:00 PM</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-200 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                        <strong className="w-20">Sat - Sun:</strong> <span>10:00 AM – 4:00 PM</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-6 h-6 text-blue-400" />
                      <h3 className="text-xl font-bold text-white">Booking System</h3>
                    </div>
                    <ul className="flex flex-col gap-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                        <span className="text-gray-300 text-sm">
                          <strong>Fixed Day & Time:</strong> Dedicated slot required.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                        <span className="text-gray-300 text-sm">
                          <strong>1-to-1 Attention:</strong> Entirely private focus.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Info className="w-6 h-6 text-indigo-400" />
                      <h3 className="text-xl font-bold text-white">Important Notes</h3>
                    </div>
                    <ul className="flex flex-col gap-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">
                          <strong>Month-End Break:</strong> No classes on the 29th–31st.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">
                          <strong>Fees Due:</strong> By the 5th of every month.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">
                          <strong>Make-up Classes:</strong> Must be completed within the month.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
