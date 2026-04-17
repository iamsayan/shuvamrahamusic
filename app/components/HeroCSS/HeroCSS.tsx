import Image from "next/image";
import {
  Star,
  Globe,
  Clock,
  Music,
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle2,
} from "lucide-react";

export default function HeroCSS() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05050A] px-5 py-24 md:px-12 lg:px-20"
      id="hero"
    >
      {/* ── Liquid Blobs Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="animate-blob-1 absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/30 blur-[120px] mix-blend-screen" />
        <div className="animate-blob-2 absolute top-[20%] right-[0%] w-[500px] h-[600px] rounded-[40%_60%_70%_30%] bg-orange-500/20 blur-[130px] mix-blend-screen" />
        <div className="animate-blob-3 absolute -bottom-[20%] left-[20%] w-[700px] h-[500px] rounded-[60%_40%_30%_70%] bg-blue-600/20 blur-[140px] mix-blend-screen" />
      </div>

      {/* ── Main Foreground Grid ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 items-center">
        {/* ── Left Column — Text & CTAs ── */}
        <div className="flex flex-col gap-1 sm:gap-2 text-left">
          {/* Top Badge */}
          <div className="animate-in-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md w-fit mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400 tracking-wide">
              Online &amp; Offline Guitar Coaching
            </span>
          </div>

          {/* Dynamic Typographic Lockup */}
          <h1 className="animate-in-2 flex flex-col font-extrabold tracking-tight text-white mb-8">
            <span className="flex items-center gap-3 sm:gap-4 text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.1] mb-2 sm:mb-1">
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-orange-500/10 border border-orange-500/30">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 ml-1" />
              </div>
              <span>
                Learn{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 py-1">
                  Guitar
                </span>{" "}
                &amp; Play
              </span>
            </span>
            <span className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-[3.2rem] sm:text-[4.5rem] lg:text-[5.2rem] leading-none my-1 tracking-tighter">
              <span className="text-white">Your</span>
              <span className="relative inline-flex items-center justify-center px-4 sm:px-6 py-1 bg-gradient-to-r from-orange-500 to-amber-400 text-black rounded-2xl sm:rounded-3xl -rotate-[1.5deg] shadow-[0_10px_40px_rgba(245,158,11,0.3)]">
                <span className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-white/40 mix-blend-overlay"></span>
                Favorite
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 text-[1.1rem] sm:text-[1.6rem] lg:text-[2rem] tracking-[0.4em] sm:tracking-[0.6em] uppercase font-black ml-1 sm:ml-2">
                Songs
              </span>
            </span>
            <span className="flex items-center gap-3 sm:gap-5 text-[2.2rem] sm:text-[3rem] lg:text-[4rem] text-gray-300 leading-none mt-2 sm:mt-3">
              <span className="hidden sm:inline-block w-12 lg:w-24 h-[4px] bg-gradient-to-r from-orange-500 to-transparent rounded-full opacity-70" />
              in just{" "}
              <strong className="text-white relative inline-block">
                30 Days
                <svg
                  className="absolute -bottom-2 lg:-bottom-3 left-0 w-full h-3 lg:h-4 text-amber-500 opacity-60"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 15 100 0"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </strong>
            </span>
          </h1>

          {/* Sleek Scannable 2x2 Feature Grid */}
          <div className="animate-in-3 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-xl">
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md transition-colors hover:bg-white/[0.04]">
              <Globe className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-[0.95rem] text-gray-200 font-medium">
                India, USA, UK & Canada
              </span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md transition-colors hover:bg-white/[0.04]">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-[0.95rem] text-gray-200 font-medium">
                For Beginners &amp; Professionals
              </span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md transition-colors hover:bg-white/[0.04]">
              <Music className="w-5 h-5 text-violet-400 shrink-0" />
              <span className="text-[0.95rem] text-gray-200 font-medium">
                Easy Hindi &amp; Bengali Guidance
              </span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md transition-colors hover:bg-white/[0.04]">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-[0.95rem] text-gray-200 font-medium">
                Flexible Class Timings
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-in-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#book"
              className="group relative flex justify-center items-center gap-2 overflow-hidden rounded-xl bg-orange-500 hover:bg-orange-600 px-8 py-4 sm:py-4 text-[1rem] font-bold text-black transition-all hover:scale-[1.02]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100 mix-blend-overlay" />
              Book Free Intro Call{" "}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#plans"
              className="flex justify-center items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] backdrop-blur-md px-8 py-4 sm:py-4 text-[1rem] font-semibold text-white transition-all hover:bg-white/10"
            >
              Explore Plans <ArrowRight className="w-4 h-4 text-gray-400" />
            </a>
          </div>

          {/* Clean Stats Block */}
          <div className="animate-in-5 mt-10 flex flex-wrap items-center gap-5 text-base font-medium border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <strong className="text-white">5.0 Rating</strong>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Global Students</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <strong className="text-white">100+</strong>{" "}
              <span className="text-gray-300">Students Trained</span>
            </div>
          </div>
        </div>

        {/* ── Right Column — Glass Image Container ── */}
        <div className="animate-slide-in flex justify-center items-center lg:justify-end order-first lg:order-last">
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src="/hero-guitarist.jpg"
                alt="Shuvam Raha - Guitar Instructor"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 380px, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Parallax Floating Glass Icons */}
            <div className="animate-in-6 animate-float-1 absolute -left-4 sm:-left-6 top-1/4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl">
              <Music className="h-5 w-5 sm:h-6 sm:w-6 text-violet-300" />
            </div>
            <div className="animate-in-6 animate-float-2 absolute -right-6 sm:-right-8 top-1/2 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl">
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-orange-400" />
            </div>
            <div className="animate-in-6 animate-float-3 absolute left-6 sm:left-8 -bottom-5 sm:-bottom-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Seamless Bottom Gradient Mask ── */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#05050A] to-transparent pointer-events-none z-10" />
    </section>
  );
}
