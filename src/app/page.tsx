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

import {
  LuArrowRight,
  LuAward,
  LuBadgeCheck,
  LuMapPin,
  LuMusic,
  LuStar,
} from 'react-icons/lu';

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
  // Fetch latest posts and GMB reviews dynamically
  const [latestPosts, pricingPlans, reviews] = await Promise.all([
    getBlogPosts({ limit: 3 }),
    getPricingPlans(),
    getReviews(),
  ]);

  const hasReviews = reviews && reviews.length > 0;
  const half = Math.ceil(reviews.length / 2);
  const topRowReviews = reviews.slice(0, half);
  const bottomRowReviews = reviews.slice(half);

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
            {
              '@type': 'Course',
              name: '1-on-1 Personalized Guitar Coaching with Shuvam Raha',
              description:
                'Learn guitar online or offline in 30 days. Structured 1-on-1 classes covering chords, strumming, lead playing, and music theory.',
              provider: { '@id': `${SCHEMA.BASE_URL}/#organization` },
              instructor: { '@id': `${SCHEMA.BASE_URL}/#person` },
              educationalLevel: 'Beginner to Advanced',
              inLanguage: ['en', 'hi', 'bn'],
              url: `${SCHEMA.BASE_URL}/guitar-classes-with-shuvam`,
              offers: (pricingPlans || []).map((plan) => ({
                '@type': 'Offer',
                category: 'Subscription',
                priceCurrency: plan.region === 'India' ? 'INR' : 'USD',
                price: plan.amount.toFixed(2),
                name: plan.name,
                description: plan.description,
                url: `${SCHEMA.BASE_URL}/guitar-classes-with-shuvam/pay?h=${btoa(JSON.stringify({ plan: plan._id, region: plan.region === 'India' ? 'INR' : 'GLOBAL' }))}`,
              })),
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: ['online', 'offline'],
                courseWorkload: 'PT40M',
              },
            },
            {
              '@type': 'SiteNavigationElement',
              name: [
                'Guitar Classes',
                'Biography',
                'Blog',
                'Gallery',
                'Performance Highlights',
                'My Gears',
                'Tutorials',
                'Contact',
              ],
            },
          ],
        }}
      />
      <div className="relative flex-1 overflow-x-hidden bg-[#05050A] text-[#f0f0f5]">
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

          <div className="site-container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="animate-in-1 space-y-6 text-center lg:col-span-7 lg:text-left">
              <div className="badge-trust">
                <LuAward className="size-4 text-cyan-400" />
                <span>LCM Certified Music Instructor</span>
              </div>

              <h1 className="font-heading text-3xl leading-[1.15] font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Shuvam Raha{' '}
                <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  Music
                </span>
              </h1>

              <p className="font-heading text-xl font-medium tracking-wider text-cyan-400">
                Easy To Learn & Easy To Play
              </p>

              <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base lg:mx-0 lg:text-lg">
                Welcome to the professional domain of Shuvam Raha — an LCM
                distinction certified guitarist, instructor, stage performer,
                and music producer. Play your first favorite songs in 30 days.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
                <Link
                  href="/guitar-classes-with-shuvam"
                  className="group btn-primary"
                >
                  Join Guitar Classes
                  <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/biography" className="group btn-secondary">
                  Read Biography
                </Link>
              </div>
            </div>

            <div className="animate-in-3 flex justify-center lg:col-span-5 lg:justify-end">
              <div className="relative aspect-3/4 w-full max-w-95 overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/5">
                <Image
                  src="/hero-guitarist.jpg"
                  alt="Shuvam Raha playing guitar"
                  fill
                  priority
                  className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 380px, 450px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#05050A]/70 via-transparent to-transparent" />
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
              <span className="font-heading text-sm font-bold tracking-[0.15em] text-cyan-400 uppercase">
                Meet the Instructor
              </span>
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
                  className="group font-heading inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-cyan-400"
                >
                  Learn More About Shuvam
                  <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {authorityPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div
                    key={idx}
                    className={`group relative rounded-2xl border ${point.border} ${point.bg} p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/2`}
                  >
                    <div
                      className={`mb-4 inline-flex items-center justify-center rounded-xl border ${point.border} ${point.bg} ${point.color} size-11 transition-transform group-hover:scale-105`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h4 className="font-heading text-base font-extrabold text-white">
                      {point.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
                      {point.desc}
                    </p>
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

            {/* Interactive Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
              {curriculum.map((item, idx) => {
                const Icon = item.icon;
                const colSpanClass = item.colSpan || 'lg:col-span-2';
                return (
                  <div
                    key={idx}
                    className={`group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0c0c16]/50 p-6 shadow-lg backdrop-blur-md transition-all duration-500 md:p-7 ${item.styles.hoverBorder} overflow-hidden hover:-translate-y-1 hover:bg-white/2 hover:shadow-2xl ${colSpanClass}`}
                  >
                    {/* Ambient hover glow inside card */}
                    <div
                      className={`absolute -right-12 -bottom-12 rounded-full ${item.styles.ambientGlow || 'bg-cyan-500/10'} pointer-events-none -z-10 size-32 opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100`}
                    />

                    {/* Giant floating step numbers */}
                    <div className="font-heading pointer-events-none absolute right-4 bottom-1 text-[6.5rem] leading-none font-black text-white/1.5 transition-all duration-700 select-none group-hover:translate-y-1 group-hover:text-white/4">
                      0{idx + 1}
                    </div>

                    <div className="relative z-10 space-y-5">
                      <div
                        className={`flex items-center justify-center rounded-xl border ${item.styles.iconBorder} ${item.styles.iconBg} ${item.styles.iconText} ${item.styles.iconShadow} size-12 transition-transform duration-500 group-hover:scale-110`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-black text-white sm:text-lg">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                          {item.subtitle}
                        </span>
                      </div>

                      <ul className="space-y-3.5 border-t border-white/5 pt-4">
                        {item.points.map((pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2 text-xs leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-sm"
                          >
                            <span
                              className={`rounded-full ${item.styles.iconBg} ${item.styles.iconText} mt-1.5 size-1.5 shrink-0 opacity-80`}
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/guitar-classes-with-shuvam"
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
            <div className="flex flex-col items-center">
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

          {hasReviews ? (
            <>
              <ReviewsMarquee reviews={reviews} />

              {/* View GMB Reviews Button */}
              <div className="site-container relative z-10 mt-12 flex justify-center">
                <a
                  href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/20 bg-linear-to-r from-amber-500/10 to-orange-500/10 px-8 py-3.5 text-sm font-bold tracking-wide text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.05)] transition-all hover:scale-105 hover:border-amber-500/40 hover:from-amber-500/20 hover:to-orange-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] active:scale-95"
                >
                  <span>View All Google Reviews</span>
                  <span>→</span>
                </a>
              </div>
            </>
          ) : (
            <div className="site-container relative z-10 mt-8 flex justify-center">
              <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/8 bg-linear-to-b from-white/3 to-transparent p-6 text-center shadow-2xl backdrop-blur-xl sm:rounded-[2.5rem] sm:p-10">
                {/* Glowing Ambient light */}
                <div className="pointer-events-none absolute top-0 right-0 size-32 rounded-full bg-amber-500/5 blur-2xl" />

                <div className="relative z-10 flex flex-col items-center gap-6">
                  {/* Google Icon Facade */}
                  <div className="flex size-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-xl">
                    <LuMapPin className="size-8 animate-bounce fill-amber-400/10 text-amber-400 [animation-duration:3s]" />
                  </div>

                  {/* CTA Text */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
                      Google Reviews Synced Live
                    </h3>
                    <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">
                      We sync our student success stories directly from Google
                      Maps in real-time. Feel free to browse all verified 5.0
                      star student reviews on our official profile.
                    </p>
                  </div>

                  {/* Rating stars & verification */}
                  <div className="flex items-center gap-3 rounded-full border border-white/5 bg-white/2 px-4 py-2 backdrop-blur-md">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <LuStar
                          key={i}
                          className="size-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="font-heading text-xs font-black tracking-wider text-amber-300 uppercase">
                      5.0 Google Rating
                    </span>
                  </div>

                  {/* Redirect Button */}
                  <a
                    href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-black tracking-wide text-white shadow-lg shadow-amber-500/10 transition-all hover:scale-105 hover:from-amber-600 hover:to-orange-600 active:scale-95"
                  >
                    <span>Browse Verified Reviews on Google</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ==========================================================
          6. MUSIC VIDEOS CAROUSEL
         ========================================================== */}
        <section className="relative z-10 border-t border-white/5 bg-[#07070F]/30 py-20 md:py-28">
          <div className="site-container">
            <div className="mb-12 space-y-3 text-center">
              <span className="font-heading text-sm font-bold tracking-[0.15em] text-cyan-400 uppercase">
                Video Portfolios
              </span>
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
              <span className="font-heading text-sm font-bold tracking-[0.15em] text-violet-400 uppercase">
                Student Showcases
              </span>
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
