import {
  Guitar,
  Mic2,
  MonitorSmartphone,
  Sparkles,
  Star,
  Tv,
  Zap,
} from "lucide-react";
import SliderGallery from "../SliderGallery/SliderGallery";
import YouTubeFacade from "../YouTubeFacade/YouTubeFacade";

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
      className="relative w-full py-12 md:py-16 overflow-x-clip bg-[#05050A]"
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

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        {/* === Compact Section Header === */}
        <div className="flex flex-col items-center gap-4 mb-8 sm:mb-10 w-full border-b border-white/5 pb-6">
          <div className="flex flex-col items-start">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 mb-4">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">
                Proof That It Works
              </span>
            </div> */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              See Real{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
                Student Results
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-md md:text-right">
            Watch how students go from beginners → confident players.
          </p>
        </div>

        {/* ── ROW 3: Online Class Clips (Full Width) ── */}
        <div className="w-full relative p-4 sm:p-6 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="absolute right-0 top-0 w-[400px] h-full bg-blue-500/5 blur-[80px] pointer-events-none" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <MonitorSmartphone className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">
              Student Performance Videos
            </h3>
            {/* <p className="text-gray-400 text-sm hidden sm:block ml-4 border-l border-white/10 pl-4">
              How structured sessions work globally.
            </p> */}
          </div>
          <div className="relative z-10 w-full">
            <SliderGallery itemWidth={220}>
              {[
                "QAJUivdGB5k",
                "4y2bCPoBtQw",
                "7rgtIwJlHcc",
                "MuHzObO8sdU",
                "461nZ5U9Wiw",
                "dfTZc5wDeK8",
              ].map((item) => (
                <div key={item} className="snap-center shrink-0 w-[220px]">
                  <VideoCard videoId={item} isShort />
                </div>
              ))}
            </SliderGallery>
          </div>
        </div>

        {/* === Bento Grid Architecture === */}
        <div className="flex flex-col gap-6 mt-5">
          {/* ── ROW 1: Live Performances (Left) + Before/After (Right) ── */}
          <div className="grid grid-cols-1 gap-6">
            {/* Live Performances (Span 7) */}
            <div className="relative p-4 sm:p-6 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Mic2 className="w-5 h-5 text-rose-500" />
                <h3 className="text-xl font-bold text-white">
                  Performances by Shuvam Raha
                </h3>
              </div>
              <div className="w-full aspect-video1 rounded-2xl overflow-hidden shadow-2xl relative group">
                {/* <YouTubeFacade videoId="Mldyf1c3uxc" /> */}
                <SliderGallery itemWidth={220}>
                  {[
                    "F4SwCit-b20",
                    "gnlzLjNdzPQ",
                    "0DO8upx3NAw",
                    "rHn8HmNSiPs",
                    "Ul7A9VNI77o",
                    "8kDGelnc6dQ",
                  ].map((item) => (
                    <div key={item} className="snap-center shrink-0 w-[220px]">
                      <VideoCard videoId={item} isShort />
                    </div>
                  ))}
                </SliderGallery>
                {/* <div className="absolute bottom-4 left-4 pointer-events-none">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <h4 className="text-white font-bold drop-shadow-md">
                    Main Stage Show
                  </h4>
                </div> */}
              </div>
            </div>

            {/* Before / After Transformation (Span 5) */}
            <div className="lg:col-span-5 relative p-4 sm:p-6 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden flex flex-col hidden">
              <div className="absolute inset-0 bg-fuchsia-600/5 blur-[80px] pointer-events-none" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <Zap className="w-5 h-5 text-fuchsia-400" />
                <h3 className="text-xl font-bold text-white">Transformation</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1 relative z-10">
                {/* Day 1 */}
                <div className="flex flex-col items-center">
                  <span className="mb-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-600 text-gray-300 text-xs font-bold">
                    Before
                  </span>
                  <div className="w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <VideoCard isShort videoId="rHn8HmNSiPs" />
                  </div>
                </div>
                {/* Day 30 */}
                <div className="flex flex-col items-center">
                  <span className="mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white text-xs font-bold shadow-lg shadow-fuchsia-500/20">
                    After
                  </span>
                  <div className="w-full relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 rounded-2xl blur-lg -z-10" />
                    <VideoCard isShort videoId="rHn8HmNSiPs" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 2: Student Videos Slider (Left) + Offline Sessions (Right) ── */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6"> */}
          {/* Student Playing Videos (Span 8) */}
          {/* <div className="lg:col-span-8 relative p-4 sm:p-6 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Guitar className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-bold text-white">
                  Student Mastery
                </h3>
              </div>
              <div className="flex-1 w-full relative">
                <SliderGallery itemWidth={300}>
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="snap-center shrink-0 w-[300px] sm:w-[400px]"
                    >
                      <VideoCard videoId="Mldyf1c3uxc" />
                    </div>
                  ))}
                </SliderGallery>
              </div>
            </div> */}

          {/* Offline Teaching Sessions (Span 4) */}
          {/* <div className="lg:col-span-4 relative p-4 sm:p-6 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Tv className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-bold text-white">
                  Offline Classes
                </h3>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <VideoCard videoId="Mldyf1c3uxc" />
                <VideoCard videoId="Mldyf1c3uxc" />
              </div>
            </div> */}
          {/* </div> */}
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
