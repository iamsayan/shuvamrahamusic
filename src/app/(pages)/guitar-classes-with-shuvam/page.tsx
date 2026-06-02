import Image from "next/image";
import Link from "next/link";
import {
  LuAward,
  LuCircleCheck,
  LuGraduationCap,
  LuGlobe,
  LuClock,
  LuPhone,
  LuArrowRight,
  LuStar,
  LuUsers,
  LuMic,
  LuMonitorSmartphone,
  LuBadgeCheck,
  LuMapPin,
  LuCircleX,
  LuCircleAlert,
  LuCalendarDays,
} from "react-icons/lu";

// Client Components
import SliderGallery from "@/components/slider-gallery";
import YouTubeFacade from "@/components/youtube-facade";
import YouTubeModal from "@/components/youtube-modal";
import ProgramTabs from "@/components/program-tabs";
import PricingTable from "@/components/pricing-table";
import FaqAccordion from "@/components/faq-accordion";

// Static Data
import { perfectFor, notFor } from "@/lib/guitar-data";

// Helper video card component for Student Results
const VideoCard = ({
  videoId,
  isShort = false,
}: {
  videoId: string;
  isShort?: boolean;
}) => (
  <div
    className={`relative w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#131320] ${
      isShort ? "aspect-[9/16]" : "aspect-video"
    }`}
  >
    {videoId ? (
      <YouTubeFacade videoId={videoId} />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e]/50 text-[#9ca3af]/50">
        <span className="text-sm">
          Placeholder {isShort ? "(Short)" : "(Video)"}
        </span>
      </div>
    )}
  </div>
);

interface SerpApiReview {
  user?: {
    name?: string;
    thumbnail?: string;
  };
  rating?: number;
  date?: string;
  snippet?: string;
  text?: string;
}

async function getReviews() {
  const apiKey = process.env.SERP_API_KEY;
  if (!apiKey) {
    return [];
  }

  try {
    const dataId = process.env.SERP_API_DATA_ID;
    const url = `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=${dataId}&api_key=${apiKey}`;

    // 1. Fetch First Page (returns first 8 reviews)
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    let allFetchedReviews = Array.isArray(data.reviews) ? data.reviews : [];

    // 2. Paginate to Page 2 if needed to complete 15 reviews
    if (data.serpapi_pagination?.next_page_token) {
      const page2Url = `${url}&num=20&next_page_token=${encodeURIComponent(data.serpapi_pagination.next_page_token)}`;
      const res2 = await fetch(page2Url, { next: { revalidate: 86400 } });

      if (res2.ok) {
        const data2 = await res2.json();

        if (data2.reviews && Array.isArray(data2.reviews)) {
          allFetchedReviews = [...allFetchedReviews, ...data2.reviews];
        }
      }
    }

    if (allFetchedReviews.length > 0) {
      const fiveStarReviews = allFetchedReviews.filter(
        (r: SerpApiReview) => (r.rating || 5) === 5,
      );

      const limitedReviews = fiveStarReviews.slice(0, 15);

      const merged = limitedReviews.map((r: SerpApiReview) => ({
        author: r.user?.name || "Google User",
        rating: r.rating || 5,
        date: r.date || "recently",
        review: r.snippet || r.text || "",
        profileImage:
          r.user?.thumbnail ||
          "https://lh3.googleusercontent.com/a/default-user=w36-h36",
      }));

      return merged;
    }

    return [];
  } catch (error) {
    console.error("Error fetching live GMB reviews from SerpApi:", error);
    return [];
  }
}

export default async function Page() {
  const reviews = await getReviews();
  const hasReviews = reviews && reviews.length > 0;

  const half = Math.ceil(reviews.length / 2);
  const topRowReviews = reviews.slice(0, half);
  const bottomRowReviews = reviews.slice(half);
  return (
    <main className="bg-[#05050A] text-[#f0f0f5]">
      {/* =======================================================================
          1. HERO SECTION
          ======================================================================= */}
      <section className="relative min-h-[100svh] flex items-center pt-24 md:pt-32 pb-16 overflow-hidden bg-[#020205]">
        <Image
          src="/bg.png"
          alt="Hero Background"
          fill
          priority
          className="absolute inset-0 object-cover object-center opacity-50"
        />

        <div className="relative z-20 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col items-center text-center pt-10 lg:pt-0">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <LuAward className="w-4 h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm font-bold text-cyan-100 tracking-wide uppercase">
                LCM Certified Music Instructor
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-black tracking-tighter text-white mb-6">
              <span className="block text-sm sm:text-base font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3 ml-1 font-heading">
                Guitar Classes with Shuvam Raha
              </span>
              <span className="block text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 font-heading">
                Learn Guitar & Play Your Favorite Songs
              </span>
              <span className="block text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] font-heading">
                {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                  in 30 days
                </span>
              </span>
            </h1>

            <p className="max-w-2xl text-base sm:text-xl text-gray-400 mb-8 leading-relaxed font-medium">
              Using my proven step-by-step method, you&apos;ll master the
              essential chords and techniques to play your first few songs in
              just one month of guided practice.
            </p>

            {/* Key Benefits */}
            <ul className="flex flex-col items-center gap-2 sm:gap-4 mb-10">
              <li className="flex items-center text-gray-300 font-medium text-sm">
                <LuCircleCheck className="w-5 h-5 text-cyan-400 mr-2 shrink-0" />
                <span>
                  Online & Offline Guitar Coaching for Students{" "}
                  <span className="text-cyan-400">Worldwide</span>.
                </span>
              </li>
              <li className="flex items-center text-gray-300 font-medium text-sm">
                <LuCircleCheck className="w-5 h-5 text-cyan-400 mr-2 shrink-0" />
                <span>
                  Perfect for{" "}
                  <span className="text-cyan-400">
                    Beginners & Busy Working Professionals.
                  </span>
                </span>
              </li>
              <li className="flex items-center text-gray-300 font-medium text-sm">
                <LuCircleCheck className="w-5 h-5 text-cyan-400 mr-2 shrink-0" />
                <span>
                  Learn English songs with simple{" "}
                  <span className="text-cyan-400">Hindi/Bengali guidance</span>—
                  even if you&apos;re starting from zero.
                </span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="https://calendly.com/shuvamraha10/intro-call"
                className="group relative flex justify-center items-center gap-2 w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] active:scale-95 font-heading"
              >
                <LuPhone className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                Book Free Intro Call
              </Link>
              <Link
                href="#pricing"
                className="group flex justify-center items-center gap-3 w-full sm:w-auto rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 font-heading"
              >
                Explore Plans
                <LuArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="w-full max-w-7xl mx-auto mt-16 py-5 px-4 md:px-6 lg:px-8 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x lg:divide-white/10 w-full">
                {/* 1. 5.0 Rating */}
                <div className="flex items-center gap-4 w-full p-2 lg:pl-0 lg:pr-4 lg:py-1">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    <LuStar className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[48px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-extrabold text-sm sm:text-base leading-none font-heading">
                        5.0 Rating
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <LuStar
                            key={i}
                            className="w-2.5 h-2.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 leading-tight mt-1 max-w-[180px]">
                      Trusted by 150+ students worldwide
                    </span>
                  </div>
                </div>

                {/* 2. 11+ Years Experience */}
                <div className="flex items-center gap-4 w-full p-2 lg:px-4 lg:py-1">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                    <LuGraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[48px]">
                    <span className="text-white font-extrabold text-sm sm:text-base leading-none font-heading">
                      11+ Years Experience
                    </span>
                    <span className="text-xs text-gray-400 leading-tight mt-1 max-w-[180px]">
                      LCM Certified Instructor
                    </span>
                  </div>
                </div>

                {/* 3. Global Reach */}
                <div className="flex items-center gap-4 w-full p-2 lg:px-4 lg:py-1">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <LuGlobe className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[48px]">
                    <span className="text-white font-extrabold text-sm sm:text-base leading-none font-heading">
                      Global Reach
                    </span>
                    <span className="text-xs text-gray-400 leading-tight mt-1 max-w-[180px]">
                      India, USA, UK, Canada
                    </span>
                  </div>
                </div>

                {/* 4. 1:1 Sessions */}
                <div className="flex items-center gap-4 w-full p-2 lg:px-4 lg:py-1">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                    <LuAward className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[48px]">
                    <span className="text-white font-extrabold text-sm sm:text-base leading-none font-heading">
                      1:1 Sessions
                    </span>
                    <span className="text-xs text-gray-400 leading-tight mt-1 max-w-[180px]">
                      Online & Offline (Personalized Learning)
                    </span>
                  </div>
                </div>

                {/* 5. Flexible Timings */}
                <div className="flex items-center gap-4 w-full p-2 lg:pl-4 lg:pr-0 lg:py-1">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <LuClock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[48px]">
                    <span className="text-white font-extrabold text-sm sm:text-base leading-none font-heading">
                      Flexible Timings
                    </span>
                    <span className="text-xs text-gray-400 leading-tight mt-1 max-w-[180px]">
                      Learn at your convenience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Hero Visuals (Hidden in initial responsive layout) ── */}
          <div className="flex-1 w-full relative mt-16 lg:mt-0 hidden">
            <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-[450px] mx-auto lg:max-w-none lg:ml-auto">
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] group">
                <Image
                  src="/hero-guitarist.jpg"
                  alt="Shuvam Raha - Online Guitar Instructor"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-90"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-80" />

                {/* Central Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <YouTubeModal videoId="Mldyf1c3uxc" triggerType="hero" />
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute -left-2 sm:-left-12 top-[15%] sm:top-1/4 flex items-center gap-3 p-3 sm:p-4 rounded-2xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl shadow-2xl pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <LuUsers className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-white font-bold text-sm sm:text-base leading-tight font-heading">
                    1-on-1 Sessions
                  </span>
                  <span className="text-gray-400 text-xs">
                    Personalized Focus
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          2. STUDENT RESULTS
          ======================================================================= */}
      <section
        className="relative w-full py-12 md:py-16 overflow-x-clip bg-[#05050A]"
        id="results"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[80%] md:max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[50%] md:max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent blur-[2px] z-20" />

        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
          <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[600px] rounded-full bg-fuchsia-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
          <div className="absolute -bottom-[10%] left-[30%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10 w-full pb-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
              See Real{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
                Student Results
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md">
              Watch how students go from beginners → confident players.
            </p>
          </div>

          {/* Student Performance Videos Row */}
          <div className="w-full relative p-4 sm:p-6 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="absolute right-0 top-0 w-[400px] h-full bg-blue-500/5 blur-[80px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <LuMonitorSmartphone className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white font-heading">
                Student Performance Videos
              </h3>
            </div>
            <div className="relative z-10 w-full">
              <SliderGallery itemWidth={220} autoScroll={true}>
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

          <div className="w-full relative p-4 sm:p-6 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden mt-4">
            <div className="absolute right-0 top-0 w-[400px] h-full bg-blue-500/5 blur-[80px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <LuMic className="w-5 h-5 text-rose-500" />
              <h3 className="text-xl font-bold text-white font-heading">
                Performances by Shuvam Raha
              </h3>
            </div>
            <div className="relative z-10 w-full">
              <SliderGallery itemWidth={220} autoScroll={true}>
                {[
                  "F4SwCit-b20",
                  "azQquv9akto",
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
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          3. PROGRAM OVERVIEW
          ======================================================================= */}
      <section
        className="relative w-full pb-16 md:pb-24 overflow-hidden bg-[#05050A]"
        id="overview"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center mt-12 sm:mt-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-8 font-heading">
              The Complete{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                Program
              </span>
            </h2>
          </div>

          {/* Interactive Client ProgramTabs */}
          <ProgramTabs />
        </div>
      </section>

      {/* =======================================================================
          4. WHAT YOU ACHIEVE (Static transformation dashboard)
          ======================================================================= */}
      <section
        className="relative w-full pb-12 md:pb-16 overflow-x-clip bg-[#05050A]"
        id="achieve"
      >
        <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] mix-blend-screen" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            {/* Left Pod: PERFECT FOR YOU */}
            <div className="group relative rounded-[2.5rem] border border-emerald-500/10 hover:border-emerald-500/30 bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-3xl p-6 sm:p-10 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(16,185,129,0.06)] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-3 font-heading">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
                      <LuCircleCheck className="w-5 h-5" />
                    </div>
                    Perfect For You If...
                  </h3>
                  <span className="text-[9px] font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full uppercase border border-emerald-500/20">
                    Recommended
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {perfectFor.map((item, i) => (
                    <div
                      key={i}
                      className="group/item flex items-start gap-4 p-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-emerald-500/[0.03] hover:border-emerald-500/20 transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="flex items-center justify-center w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                        <LuCircleCheck className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pod: NOT FOR YOU */}
            <div className="group relative rounded-[2.5rem] border border-rose-500/10 hover:border-rose-500/30 bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-3xl p-6 sm:p-10 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(244,63,94,0.06)] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-[50px] rounded-full pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-3 font-heading">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)] group-hover:scale-105 transition-transform">
                      <LuCircleX className="w-5 h-5" />
                    </div>
                    NOT For You If...
                  </h3>
                  <span className="text-[9px] font-black tracking-widest text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full uppercase border border-rose-500/20">
                    Important
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {notFor.map((item, i) => (
                    <div
                      key={i}
                      className="group/item flex items-start gap-4 p-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-rose-500/[0.03] hover:border-rose-500/20 transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="flex items-center justify-center w-5 h-5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                        <LuCircleX className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Floating VS Badge (Overlap on Large Screens) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#05050A] border border-white/10 items-center justify-center text-xs font-black text-gray-400 z-20 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-emerald-500/10 opacity-50 group-hover:scale-150 transition-transform duration-700" />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-rose-400 tracking-widest pl-0.5 font-heading">
                VS
              </span>
            </div>
          </div>

          {/* Logistics Dashboard Control Center */}
          <div className="relative mt-12 w-full rounded-[2.5rem] border border-white/10 bg-[#07070F]/80 backdrop-blur-3xl overflow-hidden p-6 sm:p-10 md:p-12 z-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            {/* Glowing Accent Strip */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-60" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Column 1: Live Weekly Schedule Strip */}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                      <LuClock className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
                      Class Schedule
                    </h3>
                  </div>
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">
                    Available Timings (Indian Standard Time)
                  </p>
                </div>

                {/* Calendar Day Grid Strip */}
                <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Weekly Schedule Overview
                  </span>
                  <div className="grid grid-cols-7 gap-1.5 text-center">
                    {[
                      { d: "M", label: "Mon", active: "weekday" },
                      { d: "T", label: "Tue", active: "weekday" },
                      { d: "W", label: "Wed", active: "weekday" },
                      { d: "T", label: "Thu", active: "off" },
                      { d: "F", label: "Fri", active: "off" },
                      { d: "S", label: "Sat", active: "weekend" },
                      { d: "S", label: "Sun", active: "weekend" },
                    ].map((day, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                            day.active === "weekday"
                              ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                              : day.active === "weekend"
                                ? "bg-blue-500/20 border border-blue-500/30 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                                : "bg-white/[0.01] border border-white/[0.04] text-gray-600 line-through"
                          }`}
                          title={day.label}
                        >
                          {day.d}
                        </div>
                        <span className="text-[9px] font-bold text-gray-500">
                          {day.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timing Slot Cards */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">
                        Mon - Wed Sessions
                      </span>
                      <span className="text-white font-bold text-xs sm:text-sm mt-0.5">
                        10:00 AM – 9:00 PM
                      </span>
                    </div>
                    <span className="flex h-2 w-2 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/[0.03] border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                        Weekend Sessions
                      </span>
                      <span className="text-white font-bold text-xs sm:text-sm mt-0.5">
                        10:00 AM – 4:00 PM
                      </span>
                    </div>
                    <span className="flex h-2 w-2 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Private Booking Panel */}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                        <LuCalendarDays className="w-4 h-4" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
                        Booking System
                      </h3>
                    </div>

                    {/* Pulsing Live indicator */}
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] font-black text-emerald-400 uppercase tracking-wider shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Slots Active
                    </div>
                  </div>
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">
                    appointment policies for private classes
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="group/booking p-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-blue-500/[0.03] hover:border-blue-500/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <LuCircleCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-white font-bold text-xs sm:text-sm font-heading">
                        Fixed Day & Time
                      </span>
                    </div>
                    <p className="text-gray-400 text-[11px] sm:text-xs pl-9 leading-relaxed font-medium">
                      A dedicated recurring slot is locked in for your
                      personalized coaching journey.
                    </p>
                  </div>

                  <div className="group/booking p-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-blue-500/[0.03] hover:border-blue-500/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <LuCircleCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-white font-bold text-xs sm:text-sm font-heading">
                        1-to-1 Focus
                      </span>
                    </div>
                    <p className="text-gray-400 text-[11px] sm:text-xs pl-9 leading-relaxed font-medium">
                      Classes are entirely private. Real-time feedback ensures
                      direct correction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 3: Policy Board Notes */}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                      <LuCircleAlert className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
                      Important Notes
                    </h3>
                  </div>
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">
                    official policies & conditions
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    {
                      t: "Month-End Break",
                      d: "No classes are conducted on the 29th, 30th, and 31st of any month.",
                    },
                    {
                      t: "Fees Due",
                      d: "Monthly tuition fees are due on or before the 5th of every single month.",
                    },
                    {
                      t: "Make-up Classes",
                      d: "Missed sessions must be completed within the boundaries of the same month.",
                    },
                  ].map((note, idx) => (
                    <div
                      key={idx}
                      className="group/note p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] border-l-4 border-l-indigo-500/50 hover:border-l-indigo-400 hover:bg-indigo-500/[0.03] hover:border-indigo-500/20 transition-all duration-300"
                    >
                      <span className="text-white font-bold text-xs sm:text-sm font-heading block group-hover/note:text-indigo-300 transition-colors">
                        {note.t}
                      </span>
                      <p className="text-gray-400 text-[11px] sm:text-xs mt-1 leading-relaxed font-medium">
                        {note.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          5. PRICING SECTION
          ======================================================================= */}
      <section
        className="relative w-full py-12 md:py-16 overflow-visible bg-[#05050A] border-t border-cyan-500/10"
        id="pricing"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center gap-8 mb-12 w-full">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <LuAward className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
                  Simple Pricing
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">
                Choose Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                  Plan
                </span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
                No confusion. Structured coaching based on your goals and
                location.
              </p>
            </div>
          </div>

          {/* Interactive PricingTable Client Component */}
          <PricingTable />
        </div>
      </section>

      {/* =======================================================================
          6. REVIEWS (Google Reviews Infinite CSS Marquee)
          ======================================================================= */}
      <section
        className="relative w-full py-16 md:py-24 overflow-hidden bg-[#05050A] border-t border-amber-500/10"
        id="reviews"
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-600/5 blur-[150px] mix-blend-screen" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20 mb-12 sm:mb-16 text-center">
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <LuBadgeCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                Student Success Stories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 font-heading">
              Trusted By{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                150+ Students
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
              Don&apos;t just take our word for it. Here is what actual students
              have to say about their learning experience.
            </p>
          </div>
        </div>

        {hasReviews ? (
          <>
            <div className="relative z-10 w-full flex flex-col gap-6 marquee-container">
              {/* Top Row (Scrolls Left) */}
              <div className="flex w-max gap-6 animate-marquee-left px-4">
                {[...topRowReviews, ...topRowReviews].map((review, idx) => (
                  <div
                    key={`top-${idx}`}
                    className="w-[340px] sm:w-[420px] shrink-0 p-6 sm:p-7 rounded-[2rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-xl shadow-2xl hover:border-amber-500/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Ambient Background Accent Glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-[30px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Quotation Icon Decorator */}
                    <span className="absolute top-4 right-6 text-6xl font-serif text-white/[0.03] select-none pointer-events-none group-hover:text-amber-500/[0.06] transition-colors duration-500">
                      “
                    </span>

                    <div className="flex flex-col gap-4">
                      {/* Testimonial Header: Stars & Verification */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <LuStar
                              key={i}
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]"
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] sm:text-[10px] font-black text-emerald-400 tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse animate-duration-1000" />
                          Verified Student
                        </div>
                      </div>

                      {/* Testimonial Body Text */}
                      <p className="text-gray-300 text-[13px] sm:text-[14px] leading-relaxed italic relative z-10 line-clamp-4 group-hover:text-white transition-colors duration-300">
                        &ldquo;{review.review}&rdquo;
                      </p>
                    </div>

                    {/* Testimonial Footer: Student Profile */}
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 mt-6">
                      <div className="flex flex-col text-left">
                        <h4 className="text-white font-bold text-sm sm:text-[15px] font-heading group-hover:text-amber-400 transition-colors duration-300">
                          {review.author}
                        </h4>
                        <span className="text-gray-500 text-xs mt-0.5">
                          {review.date}
                        </span>
                      </div>

                      {/* Animated Avatar Ring */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 opacity-20 blur-[3px] group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="w-10 h-10 rounded-full ring-2 ring-white/[0.08] group-hover:ring-amber-500/40 overflow-hidden flex items-center justify-center shrink-0 relative z-10 transition-all duration-500">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={review.profileImage}
                            alt={review.author}
                            className="rounded-full h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row (Scrolls Right) */}
              <div className="flex w-max gap-6 animate-marquee-right px-4">
                {[...bottomRowReviews, ...bottomRowReviews].map(
                  (review, idx) => (
                    <div
                      key={`bottom-${idx}`}
                      className="w-[340px] sm:w-[420px] shrink-0 p-6 sm:p-7 rounded-[2rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-xl shadow-2xl hover:border-amber-500/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
                    >
                      {/* Ambient Background Accent Glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-[30px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Quotation Icon Decorator */}
                      <span className="absolute top-4 right-6 text-6xl font-serif text-white/[0.03] select-none pointer-events-none group-hover:text-amber-500/[0.06] transition-colors duration-500">
                        “
                      </span>

                      <div className="flex flex-col gap-4">
                        {/* Testimonial Header: Stars & Verification */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <LuStar
                                key={i}
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]"
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] sm:text-[10px] font-black text-emerald-400 tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse animate-duration-1000" />
                            Verified Student
                          </div>
                        </div>

                        {/* Testimonial Body Text */}
                        <p className="text-gray-300 text-[13px] sm:text-[14px] leading-relaxed italic relative z-10 line-clamp-4 group-hover:text-white transition-colors duration-300">
                          &ldquo;{review.review}&rdquo;
                        </p>
                      </div>

                      {/* Testimonial Footer: Student Profile */}
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 mt-6">
                        <div className="flex flex-col text-left">
                          <h4 className="text-white font-bold text-sm sm:text-[15px] font-heading group-hover:text-amber-400 transition-colors duration-300">
                            {review.author}
                          </h4>
                          <span className="text-gray-500 text-xs mt-0.5">
                            {review.date}
                          </span>
                        </div>

                        {/* Animated Avatar Ring */}
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 opacity-20 blur-[3px] group-hover:opacity-60 transition-opacity duration-500" />
                          <div className="w-10 h-10 rounded-full ring-2 ring-white/[0.08] group-hover:ring-amber-500/40 overflow-hidden flex items-center justify-center shrink-0 relative z-10 transition-all duration-500">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={review.profileImage}
                              alt={review.author}
                              className="rounded-full h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* Gradient Fades for Smooth Edges */}
              <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#05050A] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#05050A] to-transparent pointer-events-none" />
            </div>

            {/* View GMB Reviews Button */}
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20 mt-12 flex justify-center">
              <a
                href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/20 hover:border-amber-500/40 text-amber-300 text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
              >
                <span>View All Google Reviews</span>
                <span>→</span>
              </a>
            </div>
          </>
        ) : (
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20 mt-8 flex justify-center">
            <div className="w-full max-w-xl p-8 sm:p-10 rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-xl relative overflow-hidden text-center shadow-2xl">
              {/* Glowing Ambient light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[40px] rounded-full pointer-events-none" />

              <div className="flex flex-col items-center gap-6 relative z-10">
                {/* Google Icon Facade */}
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
                  <LuMapPin className="w-8 h-8 text-amber-400 fill-amber-400/10 animate-slow-bounce" />
                </div>

                {/* CTA Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-extrabold text-xl sm:text-2xl font-heading">
                    Google Reviews Synced Live
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
                    We sync our student success stories directly from Google
                    Maps in real-time. Feel free to browse all verified 5.0 star
                    student reviews on our official profile.
                  </p>
                </div>

                {/* Rating stars & verification */}
                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full backdrop-blur-md">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <LuStar
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black text-amber-300 tracking-wider uppercase font-heading">
                    5.0 Google Rating
                  </span>
                </div>

                {/* Redirect Button */}
                <a
                  href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-black tracking-wide transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/10"
                >
                  <span>Browse Verified Reviews on Google</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =======================================================================
          7. FAQ SECTION
          ======================================================================= */}
      <section
        className="relative w-full py-16 md:py-24 bg-[#05050A] border-t border-indigo-500/10"
        id="faq"
      >
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] mix-blend-screen" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          <FaqAccordion />
        </div>
      </section>
    </main>
  );
}
