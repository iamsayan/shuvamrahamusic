import {
  Sparkles,
  Tv,
  MonitorSmartphone,
  Guitar,
  Sparkle,
  Mic2,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react";
import YouTubeFacade from "../YouTubeFacade/YouTubeFacade";
import SliderGallery from "../SliderGallery/SliderGallery";

// Standard Video Component wrapper
const VideoCard = ({
  videoId,
  isShort = false,
}: {
  videoId: string;
  isShort?: boolean;
}) => (
  <div
    className={`relative w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-surface ${
      isShort ? "aspect-[9/16]" : "aspect-video"
    }`}
  >
    {videoId ? (
      <YouTubeFacade videoId={videoId} />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center bg-surface-hover/50 text-muted/50">
        <span className="text-sm">
          Placeholder {isShort ? "(Short)" : "(Video)"}
        </span>
      </div>
    )}
  </div>
);

export default function StudentResults() {
  return (
    <section
      className="relative w-full py-20 px-5 md:px-12 lg:px-20 overflow-x-clip bg-[#05050A]"
      id="results"
    >
      {/* ── Elegant Glowing Separator ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[80%] md:max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[50%] md:max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent blur-[2px] z-20" />

      {/* ── Ambient Liquid Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        {/* Soft top-left ambient glow */}
        <div className="animate-blob-1 absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
        {/* Subtle right mid glow */}
        <div className="animate-blob-2 absolute top-[40%] right-[-10%] w-[500px] h-[600px] rounded-full bg-fuchsia-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
        {/* Bottom glow */}
        <div className="animate-blob-3 absolute -bottom-[10%] left-[30%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* === Section Header === */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold tracking-wide text-violet-300">
              Proof That It Works
            </span>
          </div>
          <h2 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-extrabold tracking-tight text-white mb-6 leading-tight">
            See Real{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
              Student Results
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Watch how students go from absolute beginners to highly confident
            players in record time.
          </p>
        </div>

        <div className="flex flex-col gap-28">
          {/* === 1. Offline Teaching Sessions === */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <Tv className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Offline Teaching Sessions
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              <VideoCard videoId="Mldyf1c3uxc" />
              <VideoCard videoId="Mldyf1c3uxc" />
            </div>
          </div>

          {/* === 2. Online Class Clips (Shorts Slider) === */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <MonitorSmartphone className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Online Class Clips
                </h3>
                <p className="text-gray-400 text-sm">
                  How structured sessions work from anywhere in the world.
                </p>
              </div>
            </div>

            {/* Horizontal Slider container for Shorts */}
            <SliderGallery itemWidth={260}>
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="snap-center shrink-0 w-[260px] sm:w-[300px]"
                >
                  <VideoCard videoId="rHn8HmNSiPs" isShort />
                </div>
              ))}
            </SliderGallery>
          </div>

          {/* === 3. Student Playing Videos (Wide Slider) === */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <Guitar className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Student Playing Videos
              </h3>
            </div>
            {/* Horizontal Slider container for Vods */}
            <SliderGallery itemWidth={300}>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="snap-center shrink-0 w-[300px] sm:w-[480px] lg:w-[560px]"
                >
                  <VideoCard videoId="Mldyf1c3uxc" />
                </div>
              ))}
            </SliderGallery>
          </div>

          {/* === 4. Before -> After Transformations === */}
          <div className="relative p-6 sm:p-10 rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
            {/* Ambient background glow inside the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[500px] bg-fuchsia-600/20 blur-[120px] pointer-events-none rounded-full" />

            <div className="relative z-10 text-center mb-10">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Before <span className="text-fuchsia-400">→</span> After
              </h3>
              <p className="text-gray-300 font-medium">
                Witness the absolute beginner to confident player journey.
              </p>
            </div>

            {/* Split Comparison UI */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Day 1 Side */}
              <div className="relative flex flex-col items-center">
                <span className="absolute -top-4 left-4 sm:left-10 z-20 px-4 py-1.5 rounded-full bg-gray-800 border border-gray-600 text-gray-300 text-sm font-bold shadow-lg">
                  Day 1
                </span>
                <div className="w-full grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100">
                  <VideoCard isShort videoId="rHn8HmNSiPs" />
                </div>
              </div>

              {/* The "Versus / Arrow" Middle Bridge */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-16 h-16 rounded-full bg-[#05050A] border border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                <Zap className="w-8 h-8 fill-fuchsia-500/20" />
              </div>

              {/* Day 30 Side */}
              <div className="relative flex flex-col items-center">
                <span className="absolute -top-4 right-4 sm:right-10 z-20 px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white border border-white/20 text-sm font-bold shadow-xl shadow-fuchsia-500/20">
                  Day 30
                </span>
                <div className="w-full relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 rounded-[2rem] blur-lg -z-10" />
                  <VideoCard isShort videoId="rHn8HmNSiPs" />
                </div>
              </div>
            </div>
          </div>

          {/* === 5. My Live Performances === */}
          <div className="relative col-span-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 shadow-[0_0_20px_rgba(243,24,71,0.2)]">
                  <Mic2 className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Live Performances
                  </h3>
                  <p className="text-rose-200/70 mt-1">
                    Experience the reality of performing on large stages.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10">
                <span className="relative flex h-2.5 w-2.5 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                <span className="text-sm font-semibold text-rose-400 tracking-wider uppercase">
                  Artist Showcase
                </span>
              </div>
            </div>

            {/* Cinematic Featured Video */}
            <div className="relative w-full rounded-[2.5rem] p-3 sm:p-5 border border-white/5 bg-white/[0.01] backdrop-blur-sm shadow-2xl">
              <div className="w-full aspect-video rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 z-0">
                  <YouTubeFacade videoId="Mldyf1c3uxc" />
                </div>

                {/* Overlay Text / Watermark */}
                <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <h4 className="text-white text-2xl sm:text-3xl font-bold">
                    Main Stage Show
                  </h4>
                </div>
              </div>
            </div>

            {/* 3 Grid smaller thumbnails below the main stage */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <VideoCard videoId="Mldyf1c3uxc" />
              <VideoCard videoId="Mldyf1c3uxc" />
              <VideoCard videoId="Mldyf1c3uxc" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollbar hide utility */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  );
}
