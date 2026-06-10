import type { Metadata } from 'next';
import Link from 'next/link';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import YouTubeFacade from '@/components/youtube-facade';

import {
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaYoutube,
} from 'react-icons/fa6';
import {
  LuActivity,
  LuAward,
  LuCheck,
  LuChevronRight,
  LuCompass,
  LuFlame,
  LuGlobe,
  LuGraduationCap,
  LuGuitar,
  LuHeadphones,
  LuMapPin,
  LuMic,
  LuMusic,
  LuSettings,
  LuSparkles,
  LuTarget,
  LuUsers,
} from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Biography | Shuvam Raha Music',
  description:
    'Learn about Shuvam Raha, an LCM certified professional guitarist, instructor, composer, singer-songwriter, and music producer from Kolkata, India.',
  alternates: {
    canonical: '/biography',
  },
  openGraph: {
    title: 'Biography | Shuvam Raha Music',
    description:
      'Learn about Shuvam Raha, an LCM certified professional guitarist, instructor, composer, singer-songwriter, and music producer from Kolkata, India.',
    url: '/biography',
    type: 'profile',
    images: [
      {
        url: '/hero-guitarist.jpg',
        width: 800,
        height: 600,
        alt: 'Shuvam Raha Guitarist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biography | Shuvam Raha Music',
    description:
      'Learn about Shuvam Raha, an LCM certified professional guitarist, instructor, composer, singer-songwriter, and music producer from Kolkata, India.',
    images: ['/hero-guitarist.jpg'],
  },
};

const highlights = [
  {
    title: '11+ Years of Guitar Playing & Teaching Experience',
    icon: LuGuitar,
    color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  },
  {
    title: 'Distinction in Electric Guitar – London College of Music',
    icon: LuAward,
    color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  },
  {
    title: 'Students Across India & Internationally',
    icon: LuUsers,
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  },
  {
    title: 'Feature Artist – Tone Connoisseur',
    icon: LuSparkles,
    color: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
  },
  {
    title: 'Laney Amplification India Endorsed Artist',
    icon: LuFlame,
    color: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
  },
  {
    title: 'Composer, Producer, Session Guitarist & Live Performer',
    icon: LuMusic,
    color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
  },
];

const expertise = [
  {
    role: 'Guitarist (Acoustic & Electric)',
    detail:
      'Performing diverse genres with signature tone clarity, technical precision, and expressiveness.',
    icon: LuGuitar,
    color:
      'text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/30',
  },
  {
    role: 'Music Educator & Instructor',
    detail:
      'Providing structured, analytical, and goal-oriented lessons to students of all skill levels since 2014.',
    icon: LuGraduationCap,
    color:
      'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/30',
  },
  {
    role: 'Live Performer & Session Guitarist',
    detail:
      'Collaborating in-studio and live on stage with bands and independent artists across major projects.',
    icon: LuFlame,
    color:
      'text-orange-400 border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/30',
  },
  {
    role: 'Composer & Songwriter',
    detail:
      'Writing memorable guitar melodies, original hooks, and evocative structures for personal and client releases.',
    icon: LuMusic,
    color:
      'text-violet-400 border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 hover:border-violet-500/30',
  },
  {
    role: 'Music Producer & Arranger',
    detail:
      'Shaping unique sonic textures, backing tracks, arrangements, and modern studio mixes from scratch.',
    icon: LuSettings,
    color:
      'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30',
  },
  {
    role: 'Recording & Sound Specialist',
    detail:
      'Expertise in signal chain configuration, sound design, DAW acoustics, and multitrack tracking.',
    icon: LuHeadphones,
    color:
      'text-teal-400 border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 hover:border-teal-500/30',
  },
];

const videos = [
  { title: 'Purano Sei Diner Kotha', year: '2024', id: 'Mldyf1c3uxc' },
  { title: 'Phirti Pothe', year: '2023', id: '_xOSImNUfQ8' },
  { title: 'Ei Mon', year: '2023', id: 'RGfHMP9_O2M' },
  { title: 'Ki Jani Keno – Unplugged', year: '2023', id: 'fg-Ohl7seGQ' },
  { title: 'Bhalobasha – Reprise', year: '2023', id: 'b6KCbNlsf8U' },
  { title: 'Tor Jonno', year: '2022', id: '1Ad4idf0tAs' },
];

export default function BiographyPage() {
  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://shuvamrahamusic.com/#website',
              url: 'https://shuvamrahamusic.com/',
              name: 'Shuvam Raha Music',
              description: 'Easy To Learn & Easy To Play',
              inLanguage: 'en-US',
            },
            {
              '@type': 'BreadcrumbList',
              name: 'Breadcrumbs',
              '@id': 'https://shuvamrahamusic.com/biography/#breadcrumblist',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://shuvamrahamusic.com/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Biography',
                },
              ],
            },
            {
              '@type': 'WebPage',
              '@id': 'https://shuvamrahamusic.com/biography/#webpage',
              url: 'https://shuvamrahamusic.com/biography/',
              inLanguage: 'en-US',
              name: 'Biography - Shuvam Raha Music',
              description:
                'A multifaceted musician from Kolkata, India, Shuvam Raha has established himself as a skilled guitarist, instructor, composer, and music producer. LCM certified with distinction.',
              isPartOf: {
                '@id': 'https://shuvamrahamusic.com/#website',
              },
              breadcrumb: {
                '@id': 'https://shuvamrahamusic.com/biography/#breadcrumblist',
              },
              primaryImageOfPage: {
                '@id': 'https://shuvamrahamusic.com/biography/#thumbnail',
              },
              image: {
                '@id': 'https://shuvamrahamusic.com/biography/#thumbnail',
              },
            },
            {
              '@type': 'ImageObject',
              '@id': 'https://shuvamrahamusic.com/biography/#thumbnail',
              url: 'https://shuvamrahamusic.com/wp-content/uploads/2025/04/Shuvam-Raha-Signature-Logo-Png.png',
            },
          ],
        }}
      />
      <PageLayout
        title="Biography"
        subtitle="Professional Guitarist • Guitar Coach / Instructor • Live Performer • Music Producer"
      >
        <div className="flex flex-col gap-16 text-left">
          {/* ==========================================
              SECTION 1: HERO & MAIN BIO
             ========================================== */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            {/* Desktop Side Profile Frame */}
            <div className="relative mx-auto w-full max-w-[340px] shrink-0 lg:mx-0">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-guitarist.jpg"
                  alt="Shuvam Raha"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Biography Copy */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <LuAward className="h-4.5 w-4.5 text-cyan-400" />
                  <span className="text-[10px] font-black tracking-widest text-cyan-200 uppercase">
                    LCM Certified Music Instructor
                  </span>
                </div>
                <h2 className="font-heading text-3xl font-black text-white sm:text-4xl">
                  Shuvam Raha
                </h2>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-400">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1">
                    <LuMapPin className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Based in Kolkata</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1">
                    <LuGuitar className="h-3.5 w-3.5 text-cyan-400" />
                    <span>11+ Years of Experience</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1">
                    <LuGlobe className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Online &amp; International Classes Available</span>
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                <p className="font-medium text-gray-300">
                  Helping students build strong musical foundations, develop
                  real-world playing skills, and become confident musicians
                  through structured and personalized guitar training.
                </p>
                <p>
                  Shuvam Raha is a professional guitarist, music educator,
                  performer, and producer with over a decade of experience in
                  music performance, teaching, recording, and production. Known
                  for his structured teaching methodology and practical approach
                  to learning, he helps students move beyond memorization and
                  develop a deeper understanding of music, technique, rhythm,
                  and sound.
                </p>
                <p>
                  His academic background in Computer Applications contributes
                  to a clear, analytical, and well-organized learning framework
                  that simplifies complex musical concepts for students of all
                  levels.
                </p>
                <div className="flex justify-start pt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://shuvamrahamusic.com/wp-content/uploads/2025/04/Shuvam-Raha-Signature-Logo-Png-png.avif"
                    alt="Shuvam Raha Signature Logo"
                    className="h-14 w-auto object-contain opacity-75 brightness-0 invert transition-opacity duration-300 hover:opacity-95"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 2: HIGHLIGHTS
             ========================================== */}
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Highlights
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                Credentials &amp; Milestones
              </h3>
            </div>
            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Decorative subtle ambient glows behind the grid */}
              <div className="pointer-events-none absolute -top-12 -left-12 h-64 w-64 rounded-full bg-cyan-500/5 blur-[80px]" />
              <div className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-violet-500/5 blur-[80px]" />

              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-[#0E0E22]/80 hover:shadow-[0_20px_40px_rgba(6,182,212,0.1)]"
                  >
                    {/* Faint premium index number */}
                    <span className="font-heading absolute top-2 right-4 text-4xl font-black text-white/[0.02] transition-colors duration-500 select-none group-hover:text-white/[0.06]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Inner card subtle hover glow overlay */}
                    <div className="pointer-events-none absolute -top-20 -left-20 h-40 w-40 rounded-full bg-cyan-500/0 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/5" />

                    <div className="flex flex-col gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:scale-105 ${item.color}`}
                      >
                        <Icon className="h-5.5 w-5.5 transition-transform duration-500 group-hover:rotate-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-heading text-sm leading-snug font-bold text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-base">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 3: THE JOURNEY
             ========================================== */}
          <div className="space-y-6">
            {/* The Journey */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                  The Background
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  The Journey
                </h3>
              </div>
              <div className="space-y-4 text-xs leading-relaxed text-gray-400 sm:text-sm">
                <p>
                  Shuvam’s musical journey began during his undergraduate years
                  at{' '}
                  <em className="text-gray-300">JIS College of Engineering</em>.
                  While pursuing his degree, he found himself increasingly drawn
                  to music and eventually decided to pursue it as a career.
                  Since then, he has remained a dedicated learner, believing
                  that in music - as in any art form - the learning never truly
                  ends.
                </p>
                <p>
                  Having experienced the challenges of unstructured learning and
                  scattered resources in his own journey, Shuvam gradually
                  developed a clear and organized approach to learning music.
                  Today, he brings that experience into his teaching, helping
                  students learn in a more structured, supportive, and effective
                  way.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 4: PROFESSIONAL EXPERIENCE
             ========================================== */}
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Professional Roles
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                Music Industry Expertise
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expertise.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`group relative flex gap-4 rounded-2xl border p-5 transition-all duration-300 ${item.color} hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading text-sm font-bold text-white sm:text-base">
                        {item.role}
                      </h4>
                      <p className="text-xs leading-relaxed text-gray-400">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 5: MUSIC & CREATIVE WORK
             ========================================== */}
          <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                  Featured Releases
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  Music &amp; Creative Work
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-gray-400 md:text-right">
                As a composer and performer, Shuvam’s work blends melody,
                emotion, and modern production techniques.
              </p>
            </div>

            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Subtle background glow */}
              <div className="pointer-events-none absolute -top-12 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />

              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0A0A15]/60 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-500/30 hover:bg-[#0E0E22]/80 hover:shadow-[0_20px_40px_rgba(6,182,212,0.12)]"
                >
                  {/* Glow overlay inside card */}
                  <div className="pointer-events-none absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-cyan-500/0 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/5" />

                  <div className="relative aspect-video w-full overflow-hidden border-b border-white/[0.05] bg-black/40">
                    <YouTubeFacade videoId={vid.id} />
                  </div>
                  <div className="relative z-10 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-heading text-sm font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                        {vid.title}
                      </h4>
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-gray-400">
                        {vid.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 7: ENDORSEMENTS & PARTNERSHIPS
             ========================================== */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Brand Relations
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                Endorsements &amp; Partnerships
              </h3>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A15]/60 p-6 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-cyan-500/20 sm:p-8">
              <div className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-cyan-500/5 blur-2xl" />
              <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-violet-500/5 blur-2xl" />

              <div className="space-y-6">
                {/* Text info */}
                <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                  Shuvam is associated with leading music brands through artist
                  collaborations and endorsement programs, reflecting his
                  commitment to professional sound quality, performance
                  excellence, and music education.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-sm text-gray-300 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]">
                    <LuFlame className="h-5 w-5 text-rose-400" />
                    <span>Laney Amplification India Endorsed Artist</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-sm text-gray-300 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]">
                    <LuGuitar className="h-5 w-5 text-cyan-400" />
                    <span>Collaborating Artist with Furtados</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-sm text-gray-300 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]">
                    <LuSparkles className="h-5 w-5 text-amber-400" />
                    <span>
                      Feature Artist – Tone Connoisseur (The Stockist)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-sm text-gray-300 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]">
                    <LuHeadphones className="h-5 w-5 text-violet-400" />
                    <span>Representing DiMarzio Guitar Cables</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 8: TEACHING PHILOSOPHY
             ========================================== */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Teaching Philosophy */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                  The Methodology
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  Teaching Philosophy
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                Shuvam believes that learning guitar should be clear,
                structured, and meaningful. Every student follows a personalized
                learning path designed according to their goals, learning style,
                and pace.
              </p>
              <div className="space-y-3">
                {[
                  'Building strong fundamentals and technique',
                  'Understanding rhythm, timing, and musical feel',
                  'Developing tone and sound quality awareness',
                  'Creating a clear roadmap from beginner to advanced levels',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-gray-300 sm:text-sm"
                  >
                    <LuCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* What Makes His Approach Different */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                  Coaching Advantage
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  What Makes His Approach Different
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  'Personalized training structure based on students goals',
                  'Focus on musicality rather than passive rote memorization',
                  'Step-by-step clarity and transparent progression roadmap',
                  'Integration of tone, equipment, & sound signal awareness',
                  'Suitable for both recreational hobbyists and serious musicians',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-gray-300 sm:text-sm"
                  >
                    <LuTarget className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 9: STUDENTS & IMPACT
             ========================================== */}
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Impact
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                Students &amp; Impact
              </h3>
            </div>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
              Over the years, Shuvam has guided students of different ages and
              backgrounds, helping each one progress toward their own musical
              goals - whether learning for passion, performance, or personal
              growth.
            </p>
          </div>

          {/* ==========================================
              SECTION 10: CTA & FOOTPRINT
             ========================================== */}
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-[#0A0A15]/60 p-8 text-center shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 sm:p-10">
            <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-[80px]" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-violet-500/10 blur-[80px]" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <h4 className="font-heading text-2xl leading-tight font-black text-white sm:text-3xl">
                Ready to Take Your Guitar Playing to the Next Level?
              </h4>
              <p className="max-w-xl text-xs leading-relaxed text-gray-400 sm:text-sm">
                Start your Guitar Journey with the right guidance. Whether
                you're starting from scratch or looking to refine your
                technique, you can learn through a structured learning path
                tailored to your goals.
              </p>

              <div className="mt-4 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
                <a
                  href="https://wa.me/918961369468?text=Hi%20Shuvam,%20I%27m%20interested%20in%20your%20guitar%20classes!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-heading flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 sm:text-sm"
                >
                  Book a Consultation Call
                </a>
                <Link
                  href="/guitar-classes-with-shuvam"
                  className="group font-heading flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95 sm:text-sm"
                >
                  Explore the Plans
                </Link>
                <Link
                  href="/contact"
                  className="group font-heading flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95 sm:text-sm"
                >
                  Get In Touch
                </Link>
              </div>

              <div className="mt-8 flex w-full flex-col items-center gap-3 border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                  Connect &amp; Follow Shuvam Raha
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {[
                    {
                      name: 'Spotify',
                      icon: FaSpotify,
                      url: 'https://open.spotify.com/artist/4AmYXw6BaXjFN4urc6SyrG',
                      color:
                        'hover:text-green-500 hover:border-green-500/30 hover:bg-green-500/5',
                    },
                    {
                      name: 'Apple Music',
                      icon: FaApple,
                      url: 'https://music.apple.com/us/artist/shuvam-raha/1541472783',
                      color:
                        'hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/5',
                    },
                    {
                      name: 'YouTube',
                      icon: FaYoutube,
                      url: 'https://www.youtube.com/@shuvamrahamusic',
                      color:
                        'hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5',
                    },
                    {
                      name: 'Instagram',
                      icon: FaInstagram,
                      url: 'https://www.instagram.com/shuvamrahamusic',
                      color:
                        'hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-400/5',
                    },
                    {
                      name: 'Facebook',
                      icon: FaFacebookF,
                      url: 'https://www.facebook.com/shuvamrahamusic',
                      color:
                        'hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5',
                    },
                    {
                      name: 'LinkedIn',
                      icon: FaLinkedin,
                      url: 'http://www.linkedin.com/in/shuvam-raha-150b869b',
                      color:
                        'hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5',
                    },
                  ].map((social, sIdx) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={sIdx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#070710] text-gray-400 transition-all duration-300 ${social.color}`}
                        title={social.name}
                      >
                        <SocialIcon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
