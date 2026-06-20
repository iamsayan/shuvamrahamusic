import Image from 'next/image';
import Link from 'next/link';

import BlogPostCard from '@/components/blog-post-card';
import BrandEndorsements from '@/components/brand-endorsements';
import ExperienceYears from '@/components/experience-years';
import JsonLd from '@/components/json-ld';
import ReviewsMarquee from '@/components/reviews-marquee';
import SliderGallery from '@/components/slider-gallery';
import YouTubeFacade from '@/components/youtube-facade';
import { getBlogPosts } from '@/lib/blog-data';
import { getPricingPlans } from '@/lib/data';
import { authorityPoints, curriculum } from '@/lib/guitar-data';
import { getReviews } from '@/lib/reviews';
import { SCHEMA } from '@/lib/schema';

import { LuArrowRight, LuAward, LuBadgeCheck, LuMusic } from 'react-icons/lu';

const videos = [
  { title: 'Purano Sei Diner Kotha', year: '2024', id: 'Mldyf1c3uxc' },
  { title: 'Ei Mon', year: '2023', id: 'RGfHMP9_O2M' },
  { title: 'Phirti Pothe', year: '2023', id: '_xOSImNUfQ8' },
  { title: 'Ki Jani Keno (Unplugged)', year: '2023', id: 'fg-Ohl7seGQ' },
  { title: 'Bhalobasha (Reprise)', year: '2023', id: 'b6KCbNlsf8U' },
  { title: 'Tor Jonno', year: '2022', id: '1Ad4idf0tAs' },
];

const studentVideos = [
  'QAJUivdGB5k',
  '4y2bCPoBtQw',
  '7rgtIwJlHcc',
  'MuHzObO8sdU',
  '461nZ5U9Wiw',
  'dfTZc5wDeK8',
];

export default async function Home() {
  // Fetch latest posts dynamically
  const [latestPosts, reviews] = await Promise.all([
    getBlogPosts({ limit: 3 }),
    getReviews(),
  ]);

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              ...SCHEMA.webSite(),
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${SCHEMA.BASE_URL}/blog?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            },
            SCHEMA.person(),
            SCHEMA.organization(),
          ],
        }}
      />
      <div className="relative flex-1 overflow-x-clip bg-[#05050A] text-[#f0f0f5]">
        {/* Ambient background glows */}
        <div className="animate-blob-1 pointer-events-none absolute top-1/4 left-1/4 size-100 rounded-full bg-cyan-600/10 blur-[150px]" />
        <div className="animate-blob-2 pointer-events-none absolute top-1/3 right-1/4 size-112.5 rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="animate-blob-3 pointer-events-none absolute bottom-1/4 left-1/3 size-100 rounded-full bg-amber-600/5 blur-[150px]" />

        {/* ==========================================================
          1. HERO SECTION
         ========================================================== */}
        <section className="relative flex min-h-svh items-center pt-28 pb-20 md:pt-36">
          <div className="absolute inset-0 z-0">
            <Image
              src="/bg.png"
              alt="Hero Background Grid"
              fill
              priority
              className="object-cover object-center opacity-40 mix-blend-color-dodge"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#05050A]/90 via-[#05050A]/70 to-[#05050A]" />
          </div>

          {/* Floating decorative elements in the background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Soft ambient music notes drifting in background */}
            <div className="animate-float-1 absolute top-[20%] left-[10%] text-2xl text-cyan-500/20">
              ♫
            </div>
            <div className="animate-float-2 absolute top-[40%] right-[15%] text-3xl text-violet-500/20">
              ♪
            </div>
            <div className="animate-float-3 absolute bottom-[25%] left-[45%] text-xl text-amber-500/10">
              🎸
            </div>
          </div>

          <div className="site-container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="animate-in-1 space-y-8 text-center lg:col-span-7 lg:text-left">
              {/* Premium Trust Badge wrapper */}
              <div className="inline-flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start">
                <div className="badge-trust">
                  <LuAward />
                  <span>LCM Certified Music Instructor</span>
                </div>
                {/* Floating dynamic status pill */}
                <div className="badge-success">
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>Classes Open</span>
                </div>
              </div>

              {/* Redesigned Rich Typography Heading */}
              <div className="space-y-4">
                <h1 className="font-heading text-4xl leading-[1.1] font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Shuvam Raha{' '}
                  <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.35)]">
                    Music
                  </span>
                </h1>

                {/* Premium tag style for Subheading */}
                <div className="font-heading inline-flex items-center gap-2.5 rounded-xl border border-cyan-500/10 bg-cyan-500/5 px-4 py-2 text-sm font-black tracking-widest text-cyan-300 uppercase shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                  <LuMusic className="size-4 animate-bounce" />
                  <span>Easy To Learn &amp; Easy To Play</span>
                </div>
              </div>

              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base lg:mx-0 lg:text-lg">
                Welcome to the professional domain of Shuvam Raha — an LCM
                distinction certified guitarist, instructor, stage performer,
                and music producer. Play your first favorite songs in 30 days.
              </p>

              {/* Redesigned Button Actions wrapper */}
              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
                <Link
                  href="/guitar-classes-with-shuvam"
                  className="group relative flex items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] active:scale-95"
                >
                  Join Guitar Classes
                  <LuArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/biography"
                  className="group flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/3 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 active:scale-95"
                >
                  Read Biography
                </Link>
              </div>
            </div>

            {/* Right Column: Redesigned premium photo frame showcase with backdrop rings */}
            <div className="animate-in-3 relative flex justify-center lg:col-span-5 lg:justify-end">
              {/* Rotating backdrop decorative circles */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-100 -translate-x-1/2 -translate-y-1/2 [animation:spin_60s_linear_infinite] rounded-full border border-dashed border-cyan-500/10" />
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 [animation:spin_40s_linear_infinite_reverse] rounded-full border border-cyan-500/5" />

              <div className="group relative aspect-3/4 w-full max-w-[440px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0C0C16]/40 p-2 shadow-2xl backdrop-blur-md transition-all duration-700 hover:border-cyan-500/30 hover:shadow-cyan-500/10">
                <div className="relative size-full overflow-hidden rounded-[2rem]">
                  <Image
                    src="/hero-guitarist.jpg"
                    alt="Shuvam Raha playing guitar"
                    fill
                    priority
                    className="object-cover opacity-90 transition-transform duration-1500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 380px, 450px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#05050A]/85 via-transparent to-transparent" />

                  {/* Floating floating mini-badge inside photo */}
                  <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#05050A]/70 px-4 py-3 backdrop-blur-md transition-all duration-500 group-hover:border-cyan-500/30">
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                        Artist / Coach
                      </span>
                      <span className="text-xs font-bold text-white">
                        Shuvam Raha
                      </span>
                    </div>
                    <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[8px] font-black tracking-wider text-cyan-200 uppercase">
                      Distinction
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================
          2. STATS BAR / CREDENTIALS (Drawn from authorityPoints)
         ========================================================== */}
        <section className="relative z-10 border-y border-white/5 bg-[#07070F]/50 py-10 backdrop-blur-sm">
          <div className="site-container">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-5">
              <div className="space-y-1">
                <div className="font-heading text-3xl font-black text-cyan-400 sm:text-4xl">
                  <ExperienceYears />
                </div>
                <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Years Experience
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-heading text-3xl font-black text-violet-400 sm:text-4xl">
                  600+
                </div>
                <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Students Mentored
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-heading text-3xl font-black text-amber-400 sm:text-4xl">
                  LCM
                </div>
                <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Grade Distinction
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-heading text-3xl font-black text-emerald-400 sm:text-4xl">
                  100%
                </div>
                <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Practical Syllabus
                </div>
              </div>
              <div className="col-span-2 space-y-1 md:col-span-1">
                <div className="font-heading text-3xl font-black text-fuchsia-400 sm:text-4xl">
                  Global
                </div>
                <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  US • UK • India • Canada
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Endorsements */}
        <BrandEndorsements
          layout="marquee"
          isSection={true}
          className="relative z-10 my-10 border-b border-white/5 py-4"
        />

        {/* ==========================================================
          3. BIO INTRO SECTION
         ========================================================== */}
        <section className="relative z-10 py-20 md:py-28">
          <div className="site-container grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              {/* Premium tag style for Section Subtitle */}
              <div className="font-heading inline-flex items-center gap-2 rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-3.5 py-1.5 text-[10px] font-black tracking-widest text-cyan-400 uppercase shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                <LuAward className="size-3.5" />
                <span>Meet the Instructor</span>
              </div>

              <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                A Unique Fusion of{' '}
                <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Tech &amp; Melody
                </span>
              </h2>

              <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                Shuvam holds a Bachelor&apos;s degree in Computer Application
                (BCA) and a high distinction certification in Electric Guitar
                from the <strong>London College of Music (LCM)</strong>. This
                unique combination allows him to integrate logical systems with
                emotional musicality, optimizing sound production software and
                structured guitar classes alike.
              </p>

              <div className="pt-2">
                <Link
                  href="/biography"
                  className="group font-heading inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/3 px-6 py-3 text-xs font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 active:scale-95 sm:text-sm"
                >
                  Learn More About Shuvam
                  <LuArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {authorityPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div
                    key={idx}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0C0C16]/50 p-6 shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-[#0E0E22]/80 hover:shadow-2xl ${idx === 0 ? 'hover:border-rose-500/30' : ''} ${idx === 1 ? 'hover:border-amber-500/30' : ''} ${idx === 2 ? 'hover:border-emerald-500/30' : ''} ${idx === 3 ? 'hover:border-violet-500/30' : ''} `}
                  >
                    {/* Floating premium index indicator in background */}
                    <span className="font-heading absolute top-2 right-4 text-5xl font-black text-white/2 transition-all duration-500 select-none group-hover:translate-y-1 group-hover:text-white/5">
                      0{idx + 1}
                    </span>

                    {/* Dynamic glow element on hover matching point theme color */}
                    <div
                      className={`pointer-events-none absolute -right-12 -bottom-12 size-32 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100 ${idx === 0 ? 'bg-rose-500/10' : ''} ${idx === 1 ? 'bg-amber-500/10' : ''} ${idx === 2 ? 'bg-emerald-500/10' : ''} ${idx === 3 ? 'bg-violet-500/10' : ''} `}
                    />

                    <div className="relative z-10">
                      <div
                        className={`mb-5 inline-flex items-center justify-center rounded-2xl border ${point.border} ${point.bg} ${point.color} size-12 transition-transform duration-500 group-hover:scale-110`}
                      >
                        <Icon className="size-5.5" />
                      </div>
                      <h4 className="font-heading text-base font-extrabold text-white transition-colors duration-300 group-hover:text-white">
                        {point.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================================
          4. GUITAR CLASSES / CURRICULUM HIGHLIGHTS
         ========================================================== */}
        <section className="relative z-10 border-t border-white/5 bg-[#07070F]/30 py-20 md:py-28">
          <div className="site-container">
            {/* Section Header */}
            <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
              <div className="badge-trust">
                <LuMusic className="size-4 text-cyan-400" />
                <span>Guitar Learning Program</span>
              </div>
              <h2 className="section-title">
                What You Will{' '}
                <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.25)]">
                  Learn
                </span>
              </h2>
              <p className="section-subtitle">
                Master the acoustic or electric guitar from absolute zero. A
                comprehensive, step-by-step roadmap structured for beginners and
                busy working professionals.
              </p>
            </div>

            {/* Split Roadmap & Cards Layout */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Column: Interactive learning roadmap tracker (Sticky) */}
              <div className="space-y-8 lg:sticky lg:top-28 lg:col-span-4 lg:h-fit lg:self-start">
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0A0A15]/60 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 md:p-8">
                  {/* Subtle background glow */}
                  <div className="pointer-events-none absolute -top-12 -left-12 size-40 rounded-full bg-cyan-500/10 blur-[60px]" />
                  <div className="pointer-events-none absolute -right-12 -bottom-12 size-40 rounded-full bg-blue-500/10 blur-[60px]" />

                  <div className="relative z-10 space-y-6">
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                        Roadmap Overview
                      </span>
                      <h3 className="font-heading mt-1 text-xl font-bold text-white sm:text-2xl">
                        Your Learning Path
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-400">
                        A logically structured syllabus designed to transform
                        you from absolute zero to a confident, independent
                        guitar player.
                      </p>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="relative pl-6 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-0.5 before:bg-linear-to-b before:from-emerald-500 before:via-blue-500 before:to-rose-500/30">
                      {curriculum.map((item, idx) => (
                        <div
                          key={idx}
                          className="group/step relative mb-6 last:mb-0"
                        >
                          {/* Indicator Dot */}
                          <div
                            className={`absolute top-1 -left-6.5 size-3 rounded-full border border-[#05050A] transition-all duration-300 group-hover/step:scale-125 ${idx === 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : ''} ${idx === 1 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : ''} ${idx === 2 ? 'bg-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''} ${idx === 3 ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]' : ''} ${idx === 4 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : ''} `}
                          />

                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase transition-colors duration-300 group-hover/step:text-cyan-400">
                              Phase 0{idx + 1}
                            </span>
                            <span className="text-xs font-bold text-white transition-colors duration-300 group-hover/step:text-white sm:text-sm">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Stats Badge */}
                    <div className="flex items-center gap-3 border-t border-white/5 pt-5 text-left">
                      <div className="flex size-9 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        <LuMusic className="size-4.5 animate-pulse" />
                      </div>
                      <div>
                        <div className="font-heading text-xs font-black tracking-widest text-cyan-200 uppercase">
                          Program Detail
                        </div>
                        <div className="text-xs text-gray-400">
                          5 Core Modules • PDF Notes • Audio Backing Tracks
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Redesigned Asymmetric Glassmorphic Curriculum Cards */}
              <div className="space-y-6 lg:col-span-8">
                {curriculum.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0C0C16]/50 p-6 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-[#0E0E22]/80 md:p-8 ${item.styles.hoverBorder}`}
                    >
                      {/* Interactive glowing background element */}
                      <div
                        className={`absolute -right-16 -bottom-16 rounded-full ${item.styles.ambientGlow || 'bg-cyan-500/10'} pointer-events-none -z-10 size-48 opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100`}
                      />

                      {/* Header visual line */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex items-center justify-center rounded-2xl border ${item.styles.iconBorder} ${item.styles.iconBg} ${item.styles.iconText} ${item.styles.iconShadow} size-14 transition-transform duration-500 group-hover:scale-110`}
                          >
                            <Icon className="size-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase transition-colors duration-300 group-hover:text-cyan-400">
                              Phase 0{idx + 1} • {item.subtitle}
                            </span>
                            <h3 className="font-heading text-xl font-black text-white sm:text-2xl">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* Asymmetric indicator pill */}
                        <div className="self-start rounded-full border border-white/5 bg-white/2 px-3 py-1 text-[10px] font-bold text-gray-400 backdrop-blur-md transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/5 group-hover:text-white">
                          Curriculum Module
                        </div>
                      </div>

                      {/* List of points formatted as premium columns */}
                      <div className="mt-6 border-t border-white/5 pt-6">
                        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {item.points.map((pt, pIdx) => (
                            <li
                              key={pIdx}
                              className="group/item flex items-start gap-3 rounded-xl border border-transparent p-1 transition-all duration-300 hover:translate-x-1 hover:border-white/2 hover:bg-white/1"
                            >
                              <div
                                className={`mt-0.5 flex size-5.5 shrink-0 items-center justify-center rounded-lg border ${item.styles.iconBorder} ${item.styles.iconBg} ${item.styles.iconText} shadow-sm transition-transform duration-300 group-hover/item:scale-110`}
                              >
                                <span className="size-1.5 rounded-full bg-current opacity-85" />
                              </div>
                              <span className="text-xs leading-relaxed text-gray-400 transition-colors duration-300 group-hover/item:text-gray-200 sm:text-sm">
                                {pt}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/guitar-classes-with-shuvam#pricing"
                className="group font-heading inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-4 text-xs font-bold text-white shadow-lg shadow-cyan-500/10 transition-all hover:scale-105 hover:shadow-cyan-500/20 active:scale-95 sm:text-sm"
              >
                Explore Course Packages &amp; Pricing
                <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* =======================================================================
          Google Reviews Infinite CSS Marquee Section
        ======================================================================= */}
        <section
          className="relative w-full overflow-hidden border-t border-amber-500/10 bg-[#05050A] py-16 md:py-24"
          id="reviews"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 size-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/5 mix-blend-screen blur-[150px]" />
          </div>

          <div className="site-container relative z-10 mb-12 text-center sm:mb-16">
            <div className="flex flex-col items-center space-y-4">
              <div className="badge-amber">
                <LuBadgeCheck className="size-4 text-amber-400" />
                <span>Student Success Stories</span>
              </div>
              <h2 className="font-heading mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Trusted By{' '}
                <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  150+ Students
                </span>
              </h2>
              <p className="mx-auto max-w-xl text-sm text-gray-400 sm:text-base lg:text-lg">
                Don&apos;t just take our word for it. Here is what actual
                students have to say about their learning experience.
              </p>
            </div>
          </div>

          <ReviewsMarquee reviews={reviews} />
        </section>

        {/* ==========================================================
          6. MUSIC VIDEOS CAROUSEL
         ========================================================== */}
        <section className="relative z-10 border-t border-white/5 bg-[#07070F]/30 py-20 md:py-28">
          <div className="site-container">
            <div className="mb-12 space-y-3 text-center">
              <div className="font-heading text-sm font-bold tracking-[0.15em] text-cyan-400 uppercase">
                Video Portfolios
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Featured Music Videos
              </h2>
              <p className="mx-auto max-w-md text-sm text-gray-400 sm:text-base">
                Original tracks, live unplugged sessions, and music arrangements
                produced by Shuvam.
              </p>
            </div>

            <div className="relative w-full">
              <SliderGallery itemWidth={340} autoScroll={false}>
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    className="group w-85 shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f1b]/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                      <YouTubeFacade videoId={vid.id} />
                    </div>
                    <div className="flex items-center justify-between gap-2 p-4">
                      <h4 className="font-heading line-clamp-1 text-sm font-bold text-white">
                        {vid.title}
                      </h4>
                      <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-black text-gray-500">
                        {vid.year}
                      </span>
                    </div>
                  </div>
                ))}
              </SliderGallery>
            </div>
          </div>
        </section>

        {/* ==========================================================
          7. STUDENT PERFORMANCE VIDEOS CAROUSEL
         ========================================================== */}
        <section className="relative z-10 bg-[#05050A] py-20 md:py-28">
          <div className="site-container">
            <div className="mb-12 space-y-3 text-center">
              <div className="font-heading text-sm font-bold tracking-[0.15em] text-violet-400 uppercase">
                Student Showcases
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Student Results &amp; Spotlights
              </h2>
              <p className="mx-auto max-w-md text-sm text-gray-400 sm:text-base">
                See how students progress from absolute zero to confident stage
                and acoustic performance.
              </p>
            </div>

            <div className="relative w-full">
              <SliderGallery itemWidth={220} autoScroll={true}>
                {studentVideos.map((videoId) => (
                  <div key={videoId} className="w-55 shrink-0 snap-center">
                    <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#131320] shadow-md">
                      <YouTubeFacade videoId={videoId} />
                    </div>
                  </div>
                ))}
              </SliderGallery>
            </div>
          </div>
        </section>

        {/* ==========================================================
          9. LATEST ARTICLES SECTION (Drawn dynamically from BLOG_POSTS)
         ========================================================== */}
        {latestPosts.length > 0 && (
          <section className="relative z-10 bg-[#05050A] py-20 md:py-28">
            <div className="site-container">
              <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-xl space-y-4">
                  <span className="font-heading text-sm font-bold tracking-[0.15em] text-violet-400 uppercase">
                    Lessons &amp; Updates
                  </span>
                  <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                    Latest from the Journal
                  </h2>
                  <p className="text-sm text-gray-400 sm:text-base">
                    Guides, warm-up techniques, and roadmaps from Shuvam to
                    improve your playing speed and clean tones.
                  </p>
                </div>
                <div className="shrink-0">
                  <Link
                    href="/blog"
                    className="group font-heading inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 active:scale-95 sm:text-sm"
                  >
                    Read All Articles
                    <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==========================================================
          13. FOOTER CTA CALLOUT
         ========================================================== */}
        <section className="relative z-10 border-t border-white/5 bg-[#07070F]/50 py-16 md:py-24">
          <div className="mx-auto w-full max-w-3xl space-y-6 px-5 text-center">
            <span className="font-serif text-3xl leading-none text-gray-500 select-none">
              &ldquo;
            </span>
            <p className="font-heading -mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Ready to start playing your favorite songs? Let&apos;s build your
              custom learning roadmap.
            </p>
            <span className="mt-1 font-serif text-3xl leading-none text-gray-500 select-none">
              &rdquo;
            </span>

            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="/guitar-classes-with-shuvam"
                className="group btn-primary"
              >
                Book Class Details
                <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="group btn-secondary">
                Contact Shuvam
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
