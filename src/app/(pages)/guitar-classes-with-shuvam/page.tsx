import type { Metadata } from 'next';
import Link from 'next/link';

import BrandEndorsements from '@/components/brand-endorsements';
// Client Components
import CockpitImage from '@/components/cockpit-image';
import FaqAccordion from '@/components/faq-accordion';
import JsonLd from '@/components/json-ld';
import PricingTable from '@/components/pricing-table';
import ProgramTabs from '@/components/program-tabs';
import ReviewCard from '@/components/review-card';
import SliderGallery from '@/components/slider-gallery';
import YouTubeFacade from '@/components/youtube-facade';
import { getGuitarClassesData, getPricingPlans } from '@/lib/data';
import { allFaqs, notFor, perfectFor } from '@/lib/guitar-data';
import { getReviews } from '@/lib/reviews';
import { SCHEMA } from '@/lib/schema';

import {
  LuArrowRight,
  LuAward,
  LuBadgeCheck,
  LuCalendarDays,
  LuCircleAlert,
  LuCircleCheck,
  LuCircleX,
  LuClock,
  LuGlobe,
  LuGraduationCap,
  LuMapPin,
  LuMic,
  LuMonitorSmartphone,
  LuPhone,
  LuStar,
} from 'react-icons/lu';

export const metadata: Metadata = {
  title:
    'Learn Guitar Online & Offline with Shuvam Raha | Play Songs in 30 Days',
  description:
    'Join 600+ students globally to learn guitar with Shuvam Raha. Online & offline classes for beginners. Personalized roadmap, Hindi/Bengali support, and global scheduling.',
  keywords: [
    'Guitar classes Kolkata',
    'online guitar coaching India',
    'learn guitar in 30 days',
    'Shuvam Raha guitar',
    'beginner guitar lessons Bengali',
    'best guitar teacher online',
    'Kolkata guitar classes near me',
    'learn acoustic guitar fast',
    '1-on-1 private guitar tutor',
  ],
  alternates: {
    canonical: '/guitar-classes-with-shuvam',
  },
  openGraph: {
    title:
      'Learn Guitar Online & Offline with Shuvam Raha | Play Songs in 30 Days',
    description:
      '1-on-1 personalized guitar lessons globally. Online classes or offline studio in Kolkata. Start playing your favorite songs in 30 days!',
    url: '/guitar-classes-with-shuvam',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Learn Guitar Online & Offline with Shuvam Raha | Play Songs in 30 Days',
    description:
      '1-on-1 personalized guitar lessons globally. Start playing your favorite songs in 30 days!',
  },
};

// Helper video card component for Student Results
const VideoCard = ({
  videoId,
  isShort = false,
}: {
  videoId: string;
  isShort?: boolean;
}) => (
  <div
    className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#131320] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
      isShort ? 'aspect-9/16' : 'aspect-video'
    }`}
  >
    {videoId ? (
      <YouTubeFacade videoId={videoId} />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e]/50 text-[#9ca3af]/50">
        <span className="text-sm">
          Placeholder {isShort ? '(Short)' : '(Video)'}
        </span>
      </div>
    )}
  </div>
);

export default async function Page() {
  const [reviews, pricingPlans, classesData] = await Promise.all([
    getReviews(),
    getPricingPlans(),
    getGuitarClassesData(),
  ]);
  const hasReviews = reviews && reviews.length > 0;

  const half = Math.ceil(reviews.length / 2);
  const topRowReviews = reviews.slice(0, half);
  const bottomRowReviews = reviews.slice(half);
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd
        schema={[
          SCHEMA.breadcrumb('/guitar-classes-with-shuvam'),
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: '1-on-1 Personalized Guitar Coaching with Shuvam Raha',
            description:
              'Learn guitar online or offline in 30 days. Structured 1-on-1 classes covering chords, strumming, lead playing, and music theory, with support in English, Hindi, and Bengali.',
            provider: {
              '@type': 'Person',
              name: 'Shuvam Raha',
              sameAs: SCHEMA.BASE_URL,
            },
            courseCode: 'SR-GUITAR-30',
            educationalLevel: 'Beginner to Advanced',
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
              instructor: {
                '@type': 'Person',
                name: 'Shuvam Raha',
                jobTitle: 'LCM Certified Music Instructor',
              },
            },
          },
          SCHEMA.organization(),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          },
        ]}
      />
      <div className="bg-[#05050A] text-[#f0f0f5]">
        {/* =======================================================================
          1. HERO SECTION
          ======================================================================= */}
        <section className="relative flex min-h-svh items-center overflow-hidden bg-[#020205] pt-24 pb-16 md:pt-32">
          <CockpitImage
            fill
            className="absolute inset-0 object-cover object-center opacity-50"
            asset={classesData.hero_image}
            lazy={false}
            loaderPlaceholder={false}
            containerClassName="absolute inset-0 bg-transparent size-full"
          />

          <div className="relative z-20 mx-auto flex w-full max-w-350 flex-col items-center gap-12 px-5 md:px-12 lg:flex-row lg:gap-20 lg:px-20">
            <div className="flex flex-1 flex-col items-center pt-10 text-center lg:pt-0">
              {/* Trust Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md">
                <LuAward className="size-4 text-cyan-400" />
                <span className="text-xs font-bold tracking-wide text-cyan-100 uppercase sm:text-sm">
                  LCM Certified Music Instructor
                </span>
              </div>

              {/* Headline */}
              <h1 className="mb-6 font-black tracking-tighter text-white">
                <span className="font-heading mb-3 ml-1 block text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase sm:text-base">
                  Guitar Classes with Shuvam Raha
                </span>
                <span className="font-heading mb-2 block bg-linear-to-r from-white via-white to-gray-400 bg-clip-text text-[2.4rem] leading-[1.05] text-transparent sm:text-[4rem] lg:text-[5.5rem]">
                  Learn Guitar & Play Your Favorite Songs
                </span>
                <span className="font-heading block text-[2.4rem] leading-[1.05] sm:text-[4rem] lg:text-[5.5rem]">
                  {' '}
                  <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    in 30 days
                  </span>
                </span>
              </h1>

              <p className="mb-8 max-w-2xl text-base leading-relaxed font-medium text-gray-400 sm:text-xl">
                Using my proven step-by-step method, you&apos;ll master the
                essential chords and techniques to play your first few songs in
                just one month of guided practice.
              </p>

              {/* Key Benefits */}
              <ul className="mb-10 flex flex-col items-center gap-4 text-center">
                <li className="max-w-md text-sm font-medium text-gray-300 sm:flex sm:max-w-none sm:items-center sm:justify-center sm:text-base">
                  <LuCircleCheck className="-mt-0.5 mr-2 inline-block size-5 shrink-0 align-middle text-cyan-400 sm:mt-0" />
                  <span>
                    Online & Offline Guitar Coaching for Students{' '}
                    <span className="text-cyan-400">Worldwide</span>.
                  </span>
                </li>
                <li className="max-w-md text-sm font-medium text-gray-300 sm:flex sm:max-w-none sm:items-center sm:justify-center sm:text-base">
                  <LuCircleCheck className="-mt-0.5 mr-2 inline-block size-5 shrink-0 align-middle text-cyan-400 sm:mt-0" />
                  <span>
                    Perfect for{' '}
                    <span className="text-cyan-400">
                      Beginners & Busy Working Professionals.
                    </span>
                  </span>
                </li>
                <li className="max-w-md text-sm font-medium text-gray-300 sm:flex sm:max-w-none sm:items-center sm:justify-center sm:text-base">
                  <LuCircleCheck className="-mt-0.5 mr-2 inline-block size-5 shrink-0 align-middle text-cyan-400 sm:mt-0" />
                  <span>
                    Learn English songs with simple{' '}
                    <span className="text-cyan-400">
                      Hindi/Bengali guidance
                    </span>
                    — even if you&apos;re starting from zero.
                  </span>
                </li>
              </ul>

              {/* CTAs */}
              <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                <Link
                  href="https://calendly.com/shuvamraha10/intro-call"
                  className="group font-heading relative flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] active:scale-95 sm:w-auto sm:text-base"
                >
                  <LuPhone className="size-5 transition-transform group-hover:translate-x-1" />
                  Book Free Intro Call
                </Link>
                <Link
                  href="#pricing"
                  className="group font-heading flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/3 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10 active:scale-95 sm:w-auto sm:text-base"
                >
                  Explore Plans
                  <LuArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Trust Metrics Bar */}
              <div className="relative z-10 mx-auto mt-16 w-full max-w-7xl rounded-4xl border border-white/10 bg-white/2 px-4 py-5 shadow-2xl backdrop-blur-3xl md:px-6 lg:px-8">
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-white/10">
                  {/* 1. 5.0 Rating */}
                  <div className="flex w-full items-center gap-4 p-2 lg:py-1 lg:pr-4 lg:pl-0">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                      <LuStar className="size-5 fill-amber-400" />
                    </div>
                    <div className="flex min-h-12 flex-col justify-center text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading text-sm leading-none font-extrabold text-white sm:text-base">
                          5.0 Rating
                        </span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <LuStar
                              key={i}
                              className="size-2.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="mt-1 max-w-45 text-xs leading-tight text-gray-400">
                        Trusted by 150+ students worldwide
                      </span>
                    </div>
                  </div>

                  {/* 2. 11+ Years Experience */}
                  <div className="flex w-full items-center gap-4 p-2 lg:px-4 lg:py-1">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                      <LuGraduationCap className="size-5" />
                    </div>
                    <div className="flex min-h-12 flex-col justify-center text-left">
                      <span className="font-heading text-sm leading-none font-extrabold text-white sm:text-base">
                        11+ Years Experience
                      </span>
                      <span className="mt-1 max-w-45 text-xs leading-tight text-gray-400">
                        LCM Certified Instructor
                      </span>
                    </div>
                  </div>

                  {/* 3. Global Reach */}
                  <div className="flex w-full items-center gap-4 p-2 lg:px-4 lg:py-1">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                      <LuGlobe className="size-5" />
                    </div>
                    <div className="flex min-h-12 flex-col justify-center text-left">
                      <span className="font-heading text-sm leading-none font-extrabold text-white sm:text-base">
                        Global Reach
                      </span>
                      <span className="mt-1 max-w-45 text-xs leading-tight text-gray-400">
                        India, USA, UK, Canada
                      </span>
                    </div>
                  </div>

                  {/* 4. 1:1 Sessions */}
                  <div className="flex w-full items-center gap-4 p-2 lg:px-4 lg:py-1">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                      <LuAward className="size-5" />
                    </div>
                    <div className="flex min-h-12 flex-col justify-center text-left">
                      <span className="font-heading text-sm leading-none font-extrabold text-white sm:text-base">
                        1:1 Sessions
                      </span>
                      <span className="mt-1 max-w-45 text-xs leading-tight text-gray-400">
                        Online & Offline (Personalized Learning)
                      </span>
                    </div>
                  </div>

                  {/* 5. Flexible Timings */}
                  <div className="flex w-full items-center gap-4 p-2 lg:py-1 lg:pr-0 lg:pl-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                      <LuClock className="size-5" />
                    </div>
                    <div className="flex min-h-12 flex-col justify-center text-left">
                      <span className="font-heading text-sm leading-none font-extrabold text-white sm:text-base">
                        Flexible Timings
                      </span>
                      <span className="mt-1 max-w-45 text-xs leading-tight text-gray-400">
                        Learn at your convenience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Endorsements */}
        <BrandEndorsements
          layout="marquee"
          isSection={true}
          className="relative z-10 py-4"
        />

        {/* =======================================================================
          2. STUDENT RESULTS
          ======================================================================= */}
        <section
          className="relative w-full overflow-x-clip bg-[#05050A] py-12 md:py-16"
          id="results"
        >
          <div className="absolute top-0 left-1/2 z-20 h-px w-full max-w-[80%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent md:max-w-4xl" />
          <div className="absolute top-0 left-1/2 z-20 h-px w-full max-w-[50%] -translate-x-1/2 bg-linear-to-r from-transparent via-violet-500/40 to-transparent blur-[2px] md:max-w-2xl" />

          {/* Ambient Glows */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
            <div className="pointer-events-none absolute -top-[10%] -left-[10%] size-150 rounded-full bg-violet-600/10 mix-blend-screen blur-[120px]" />
            <div className="pointer-events-none absolute top-[40%] right-[-10%] h-150 w-125 rounded-full bg-fuchsia-600/10 mix-blend-screen blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-[10%] left-[30%] size-150 rounded-full bg-indigo-600/10 mix-blend-screen blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-350 px-5 md:px-12 lg:px-20">
            {/* Header */}
            <div className="mb-8 flex w-full flex-col items-center gap-3 pb-5 text-center sm:mb-10">
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                See Real{' '}
                <span className="bg-linear-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                  Student Results
                </span>
              </h2>
              <p className="max-w-md text-sm text-gray-400 sm:text-base lg:text-lg">
                Watch how students go from beginners → confident players.
              </p>
            </div>

            {/* Student Performance Videos Row */}
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/5 bg-white/2 p-4 sm:p-6">
              <div className="pointer-events-none absolute top-0 right-0 h-full w-100 bg-blue-500/5 blur-[80px]" />
              <div className="relative z-10 mb-6 flex items-center gap-3">
                <LuMonitorSmartphone className="size-5 text-blue-400" />
                <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                  Student Performance Videos
                </h3>
              </div>
              <div className="relative z-10 w-full">
                <SliderGallery itemWidth={220} autoScroll={true}>
                  {classesData.student_performance_videos.map((item) => (
                    <div key={item} className="w-55 shrink-0 snap-center">
                      <VideoCard videoId={item} isShort />
                    </div>
                  ))}
                </SliderGallery>
              </div>
            </div>

            <div className="relative mt-4 w-full overflow-hidden rounded-3xl border border-white/5 bg-white/2 p-4 sm:p-6">
              <div className="pointer-events-none absolute top-0 right-0 h-full w-100 bg-blue-500/5 blur-[80px]" />
              <div className="relative z-10 mb-6 flex items-center gap-3">
                <LuMic className="size-5 text-rose-500" />
                <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                  Performances by Shuvam Raha
                </h3>
              </div>
              <div className="relative z-10 w-full">
                <SliderGallery itemWidth={220} autoScroll={true}>
                  {classesData.performance_videos.map((item) => (
                    <div key={item} className="w-55 shrink-0 snap-center">
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
          className="relative w-full overflow-hidden bg-[#05050A] pb-16 md:pb-24"
          id="overview"
        >
          <div className="relative z-10 mx-auto w-full max-w-350 px-5 md:px-12 lg:px-20">
            <div className="mt-12 flex flex-col items-center text-center sm:mt-16">
              <h2 className="font-heading mb-8 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                The Complete{' '}
                <span className="bg-linear-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
                  Program
                </span>
              </h2>
            </div>

            {/* Interactive Client ProgramTabs */}
            <ProgramTabs classesData={classesData} />
          </div>
        </section>

        {/* =======================================================================
          4. WHAT YOU ACHIEVE (Static transformation dashboard)
          ======================================================================= */}
        <section
          className="relative w-full overflow-x-clip bg-[#05050A] pb-12 md:pb-16"
          id="achieve"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
            <div className="absolute top-[10%] right-[10%] size-125 rounded-full bg-orange-600/5 mix-blend-screen blur-[120px]" />
            <div className="absolute bottom-[20%] left-[10%] size-150 rounded-full bg-blue-600/5 mix-blend-screen blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-350 px-5 md:px-12 lg:px-20">
            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left Pod: PERFECT FOR YOU */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-500/10 bg-linear-to-b from-white/3 to-white/1 px-5 py-6 backdrop-blur-3xl transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_30px_80px_rgba(16,185,129,0.06)] sm:rounded-[2.5rem] sm:p-10">
                <div className="pointer-events-none absolute top-0 right-0 size-32 rounded-full bg-emerald-500/5 opacity-50 blur-[50px] transition-opacity duration-700 group-hover:opacity-100" />

                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <h3 className="font-heading flex items-center gap-3 text-lg font-extrabold text-white sm:text-xl">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-transform group-hover:scale-105">
                        <LuCircleCheck className="size-5" />
                      </div>
                      Perfect For You If...
                    </h3>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-emerald-400 uppercase">
                      Recommended
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {perfectFor.map((item, i) => (
                      <div
                        key={i}
                        className="group/item flex items-start gap-4 rounded-2xl border border-white/4 bg-white/1 p-3.5 transition-all duration-300 hover:translate-x-1 hover:border-emerald-500/20 hover:bg-emerald-500/3"
                      >
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-transform group-hover/item:scale-110">
                          <LuCircleCheck className="size-3" />
                        </div>
                        <span className="text-xs leading-relaxed font-medium text-gray-300 transition-colors duration-300 group-hover/item:text-white sm:text-sm md:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Pod: NOT FOR YOU */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-500/10 bg-linear-to-b from-white/3 to-white/1 px-5 py-6 backdrop-blur-3xl transition-all duration-500 hover:border-rose-500/30 hover:shadow-[0_30px_80px_rgba(244,63,94,0.06)] sm:rounded-[2.5rem] sm:p-10">
                <div className="pointer-events-none absolute top-0 right-0 size-32 rounded-full bg-rose-500/5 opacity-50 blur-[50px] transition-opacity duration-700 group-hover:opacity-100" />

                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <h3 className="font-heading flex items-center gap-3 text-lg font-extrabold text-white sm:text-xl">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-transform group-hover:scale-105">
                        <LuCircleX className="size-5" />
                      </div>
                      NOT For You If...
                    </h3>
                    <span className="rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-rose-400 uppercase">
                      Important
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {notFor.map((item, i) => (
                      <div
                        key={i}
                        className="group/item flex items-start gap-4 rounded-2xl border border-white/4 bg-white/1 p-3.5 transition-all duration-300 hover:translate-x-1 hover:border-rose-500/20 hover:bg-rose-500/3"
                      >
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-transform group-hover/item:scale-110">
                          <LuCircleX className="size-3" />
                        </div>
                        <span className="text-xs leading-relaxed font-medium text-gray-300 transition-colors duration-300 group-hover/item:text-white sm:text-sm md:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Floating VS Badge (Overlap on Large Screens) */}
              <div className="group absolute top-1/2 left-1/2 z-20 hidden size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#05050A] text-xs font-black text-gray-400 shadow-2xl lg:flex">
                <div className="absolute inset-0 bg-linear-to-tr from-rose-500/10 to-emerald-500/10 opacity-50 transition-transform duration-700 group-hover:scale-150" />
                <span className="font-heading relative z-10 bg-linear-to-r from-emerald-400 to-rose-400 bg-clip-text pl-0.5 tracking-widest text-transparent">
                  VS
                </span>
              </div>
            </div>

            {/* Logistics Dashboard Control Center */}
            <div className="relative z-10 mt-12 w-full overflow-hidden rounded-3xl border border-white/10 bg-[#07070F]/80 px-5 py-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl sm:rounded-[2.5rem] sm:p-10 md:p-12">
              {/* Glowing Accent Strip */}
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-60" />

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16">
                {/* Column 1: Live Weekly Schedule Strip */}
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        <LuClock className="size-4" />
                      </div>
                      <h3 className="font-heading text-base font-extrabold text-white sm:text-lg">
                        Class Schedule
                      </h3>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                      Available Timings (Indian Standard Time)
                    </p>
                  </div>

                  {/* Calendar Day Grid Strip */}
                  <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
                    <span className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase sm:text-xs">
                      Weekly Schedule Overview
                    </span>
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {[
                        { d: 'M', label: 'Mon', active: 'weekday' },
                        { d: 'T', label: 'Tue', active: 'weekday' },
                        { d: 'W', label: 'Wed', active: 'weekday' },
                        { d: 'T', label: 'Thu', active: 'off' },
                        { d: 'F', label: 'Fri', active: 'off' },
                        { d: 'S', label: 'Sat', active: 'weekend' },
                        { d: 'S', label: 'Sun', active: 'weekend' },
                      ].map((day, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black transition-all sm:text-sm ${
                              day.active === 'weekday'
                                ? 'border border-cyan-500/30 bg-cyan-500/20 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                                : day.active === 'weekend'
                                  ? 'border border-blue-500/30 bg-blue-500/20 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                                  : 'border border-white/4 bg-white/1 text-gray-600 line-through'
                            }`}
                            title={day.label}
                          >
                            {day.d}
                          </div>
                          <span className="text-[10px] font-bold text-gray-500 sm:text-xs">
                            {day.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timing Slot Cards */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-xl border border-cyan-500/10 bg-cyan-500/3 p-3 transition-all duration-300 hover:border-cyan-500/20">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase sm:text-xs">
                          Mon - Wed Sessions
                        </span>
                        <span className="mt-0.5 text-sm font-bold text-white sm:text-base">
                          10:00 AM – 9:00 PM
                        </span>
                      </div>
                      <span className="relative flex size-2 shrink-0">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-cyan-500"></span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-blue-500/10 bg-blue-500/3 p-3 transition-all duration-300 hover:border-blue-500/20">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase sm:text-xs">
                          Weekend Sessions
                        </span>
                        <span className="mt-0.5 text-sm font-bold text-white sm:text-base">
                          10:00 AM – 4:00 PM
                        </span>
                      </div>
                      <span className="relative flex size-2 shrink-0">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-blue-500"></span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Private Booking Panel */}
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                          <LuCalendarDays className="size-4" />
                        </div>
                        <h3 className="font-heading text-base font-extrabold text-white sm:text-lg">
                          Booking System
                        </h3>
                      </div>

                      {/* Pulsing Live indicator */}
                      <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black tracking-wider text-emerald-400 uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)] sm:text-xs">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Slots Active
                      </div>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                      Appointment policies for private classes
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="group/booking rounded-2xl border border-white/4 bg-white/1 p-3.5 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/3">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded border border-blue-500/20 bg-blue-500/10 text-blue-400">
                          <LuCircleCheck className="size-3.5" />
                        </div>
                        <span className="font-heading text-sm font-bold text-white sm:text-base">
                          Fixed Day & Time
                        </span>
                      </div>
                      <p className="pl-9 text-xs leading-relaxed font-medium text-gray-400 sm:text-sm">
                        A dedicated recurring slot is locked in for your
                        personalized coaching journey.
                      </p>
                    </div>

                    <div className="group/booking rounded-2xl border border-white/4 bg-white/1 p-3.5 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/3">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded border border-blue-500/20 bg-blue-500/10 text-blue-400">
                          <LuCircleCheck className="size-3.5" />
                        </div>
                        <span className="font-heading text-sm font-bold text-white sm:text-base">
                          1-to-1 Focus
                        </span>
                      </div>
                      <p className="pl-9 text-xs leading-relaxed font-medium text-gray-400 sm:text-sm">
                        Classes are entirely private. Real-time feedback ensures
                        direct correction.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Policy Board Notes */}
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                        <LuCircleAlert className="size-4" />
                      </div>
                      <h3 className="font-heading text-base font-extrabold text-white sm:text-lg">
                        Important Notes
                      </h3>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                      Official policies & conditions
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      {
                        t: 'Month-End Break',
                        d: 'No classes are conducted on the 29th, 30th, and 31st of any month.',
                      },
                      {
                        t: 'Fees Due',
                        d: 'Monthly tuition fees are due on or before the 5th of every single month.',
                      },
                      {
                        t: 'Make-up Classes',
                        d: 'Missed sessions must be completed within the boundaries of the same month.',
                      },
                    ].map((note, idx) => (
                      <div
                        key={idx}
                        className="group/note rounded-xl border border-l-4 border-white/4 border-l-indigo-500/50 bg-white/1 p-3 transition-all duration-300 hover:border-indigo-500/20 hover:border-l-indigo-400 hover:bg-indigo-500/3"
                      >
                        <span className="font-heading block text-sm font-bold text-white transition-colors group-hover/note:text-indigo-300 sm:text-base">
                          {note.t}
                        </span>
                        <p className="mt-1 text-xs leading-relaxed font-medium text-gray-400 sm:text-sm">
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
          className="relative w-full overflow-visible border-t border-cyan-500/10 bg-[#05050A] py-12 md:py-16"
          id="pricing"
        >
          <div className="relative z-10 mx-auto w-full max-w-350 px-5 md:px-12 lg:px-20">
            <div className="mb-12 flex w-full flex-col items-center gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <LuAward className="size-4 text-emerald-400" />
                  <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase sm:text-sm">
                    Simple Pricing
                  </span>
                </div>
                <h2 className="font-heading mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Choose Your{' '}
                  <span className="bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                    Plan
                  </span>
                </h2>
                <p className="mx-auto max-w-xl text-sm text-gray-400 sm:text-base lg:text-lg">
                  No confusion. Structured coaching based on your goals and
                  location.
                </p>
              </div>
            </div>

            {/* Interactive PricingTable Client Component */}
            <PricingTable plans={pricingPlans} />
          </div>
        </section>

        {/* =======================================================================
          6. REVIEWS (Google Reviews Infinite CSS Marquee)
          ======================================================================= */}
        <section
          className="relative w-full overflow-hidden border-t border-amber-500/10 bg-[#05050A] py-16 md:py-24"
          id="reviews"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 size-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/5 mix-blend-screen blur-[150px]" />
          </div>

          <div className="relative z-10 mx-auto mb-12 w-full max-w-350 px-5 text-center sm:mb-16 md:px-12 lg:px-20">
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <LuBadgeCheck className="size-4 text-amber-400" />
                <span className="text-xs font-bold tracking-widest text-amber-400 uppercase sm:text-sm">
                  Student Success Stories
                </span>
              </div>
              <h2 className="font-heading mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Trusted By{' '}
                <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  100+ Students
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
              <div className="marquee-container relative z-10 flex w-full flex-col gap-6">
                {/* Top Row (Scrolls Left) */}
                <div className="animate-marquee-left flex w-max gap-6 px-4">
                  {[...topRowReviews, ...topRowReviews].map((review, idx) => (
                    <ReviewCard key={`top-${idx}`} review={review} />
                  ))}
                </div>

                {/* Bottom Row (Scrolls Right) */}
                <div className="animate-marquee-right flex w-max gap-4 px-4 sm:gap-6">
                  {[...bottomRowReviews, ...bottomRowReviews].map(
                    (review, idx) => (
                      <ReviewCard key={`bottom-${idx}`} review={review} />
                    )
                  )}
                </div>

                {/* Gradient Fades for Smooth Edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#05050A] to-transparent sm:w-40" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#05050A] to-transparent sm:w-40" />
              </div>

              {/* View GMB Reviews Button */}
              <div className="relative z-10 mx-auto mt-12 flex w-full max-w-350 justify-center px-5 md:px-12 lg:px-20">
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
            <div className="relative z-10 mx-auto mt-8 flex w-full max-w-350 justify-center px-5 md:px-12 lg:px-20">
              <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/8 bg-linear-to-b from-white/3 to-transparent p-6 text-center shadow-2xl backdrop-blur-xl sm:rounded-[2.5rem] sm:p-10">
                {/* Glowing Ambient light */}
                <div className="pointer-events-none absolute top-0 right-0 size-32 rounded-full bg-amber-500/5 blur-2xl" />

                <div className="relative z-10 flex flex-col items-center gap-6">
                  {/* Google Icon Facade */}
                  <div className="flex size-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-xl">
                    <LuMapPin className="animate-slow-bounce size-8 fill-amber-400/10 text-amber-400" />
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

        {/* =======================================================================
          7. FAQ SECTION
          ======================================================================= */}
        <section
          className="relative w-full border-t border-indigo-500/10 bg-[#05050A] py-16 md:py-24"
          id="faq"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[10%] left-[10%] size-150 rounded-full bg-indigo-600/5 mix-blend-screen blur-[120px]" />
            <div className="absolute right-[10%] bottom-[10%] size-150 rounded-full bg-purple-600/5 mix-blend-screen blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-350 px-5 md:px-12 lg:px-20">
            <FaqAccordion />
          </div>
        </section>
      </div>
    </>
  );
}
