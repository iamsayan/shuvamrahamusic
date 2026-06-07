import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/page-layout';
import JsonLd from '@/components/json-ld';
import YouTubeFacade from '@/components/youtube-facade';
import BiographyAudioPlayer from '@/components/biography-audio-player';

import {
  LuAward,
  LuGraduationCap,
  LuGuitar,
  LuMusic,
  LuMic,
  LuHeadphones,
  LuSettings,
  LuUsers,
  LuFlame,
  LuTv,
  LuVolume2,
} from 'react-icons/lu';

import {
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaYoutube,
  FaAmazon,
} from 'react-icons/fa6';

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

const competencies = [
  {
    title: 'Guitarist',
    description: 'Acoustic & Electric Guitar performance and technique.',
    icon: LuGuitar,
    color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  },
  {
    title: 'Composer & Songwriter',
    description: 'Creating memorable melodies and storytelling through songwriting.',
    icon: LuMusic,
    color: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
  },
  {
    title: 'Vocalist',
    description: 'Bringing music to life with emotional and expressive vocal performance.',
    icon: LuMic,
    color: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
  },
  {
    title: 'Guitar Instructor',
    description: 'Sharing comprehensive knowledge and guiding aspiring musicians since 2014.',
    icon: LuGraduationCap,
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  },
  {
    title: 'Certified Musician',
    description: 'Distinction in Electric Guitar under the London College of Music (LCM).',
    icon: LuAward,
    color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  },
  {
    title: 'Live Performer',
    description: 'Bringing high-energy performance and stage presence to live shows.',
    icon: LuFlame,
    color: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
  },
  {
    title: 'Session Guitarist',
    description: 'Collaborating in-studio with diverse artists, bands, and productions.',
    icon: LuUsers,
    color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
  },
  {
    title: 'Music Producer & Arranger',
    description: 'Shaping soundscapes, arrangements, and modern studio productions.',
    icon: LuSettings,
    color: 'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5',
  },
  {
    title: 'Sound Engineer',
    description: 'Proficient in multitrack recording, session acoustics, and sound design.',
    icon: LuHeadphones,
    color: 'text-teal-400 border-teal-500/20 bg-teal-500/5',
  },
];

const videos = [
  { title: 'Ei Mon', year: '2023', id: 'RGfHMP9_O2M' },
  { title: 'Phirti Pothe', year: '2023', id: '_xOSImNUfQ8' },
  { title: 'Ki Jani Keno (Unplugged)', year: '2023', id: 'fg-Ohl7seGQ' },
  { title: 'Bhalobasha (Reprise)', year: '2023', id: 'b6KCbNlsf8U' },
  { title: 'Purano Sei Diner Kotha', year: '2024', id: 'Mldyf1c3uxc' },
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
        subtitle="Guitarist | Composer | Instructor | Performer | Music Producer | Singer-Songwriter"
      >
        <div className="flex flex-col gap-12 text-left">
          {/* ==========================================
              SECTION 1: HERO & MAIN BIO
             ========================================== */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Desktop Side Profile Frame */}
            <div className="relative mx-auto w-full max-w-[340px] shrink-0 lg:mx-0">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-guitarist.jpg"
                  alt="Shuvam Raha"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Biography Copy */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <LuAward className="h-4 w-4 text-cyan-400" />
                <span className="text-[10px] font-black tracking-widest text-cyan-200 uppercase">
                  LCM Certified Music Instructor
                </span>
              </div>
              <h2 className="font-heading text-2xl font-black text-white sm:text-3xl">
                Shuvam Raha: Musician, Composer, and Educator
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                <p>
                  A multifaceted musician from Kolkata, India,{' '}
                  <strong className="text-white">Shuvam Raha</strong> has
                  established himself as a skilled guitarist, instructor, and
                  composer. His musical journey began during his undergraduate
                  studies in Computer Application (BCA) at{' '}
                  <em className="text-gray-300">
                    JIS College of Engineering Kalyani
                  </em>
                  .
                </p>
                <p>
                  With over <strong className="text-white">11 years of experience</strong>
                  , Shuvam possesses a strong foundation in{' '}
                  <span className="text-cyan-400 font-medium">Western Music Theory</span> and
                  has honed his skills as a proficient guitarist. He achieved a
                  Distinction in Electric Guitar in the Grade exams of the{' '}
                  <strong className="text-white">
                    London College of Music (LCM)
                  </strong>
                  , under the guidance of renowned Classical Guitarist{' '}
                  <a
                    href="https://www.ekanntsingh.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline decoration-cyan-400/30 hover:text-cyan-300 hover:decoration-cyan-300 transition-colors"
                  >
                    Mr. Ekannt Singh
                  </a>
                  .
                </p>
                <p>
                  As a seasoned music educator, Shuvam has been conducting guitar
                  classes since 2014. He has performed at various events,
                  collaborating with artists and showcasing high-energy musicality.
                  His debut original composition,{' '}
                  <span className="text-cyan-400 italic font-semibold">
                    &quot;Ki jani keno&quot;
                  </span>
                  , was featured in <strong className="text-white">E-Times</strong> and
                  streams widely on prominent audio platforms.
                </p>
                <div className="pt-3 flex justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://shuvamrahamusic.com/wp-content/uploads/2025/04/Shuvam-Raha-Signature-Logo-Png-png.avif"
                    alt="Shuvam Raha Signature Logo"
                    className="h-14 w-auto object-contain brightness-0 invert opacity-75 hover:opacity-95 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 2: CORE COMPETENCIES
             ========================================== */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {competencies.map((comp, idx) => {
                const Icon = comp.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.02]"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${comp.color} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading text-sm font-bold text-white sm:text-base">
                        {comp.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                        {comp.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 3: ACADEMIC BACKGROUND
             ========================================== */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
              Academic Background &amp; Credentials
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* BCA Card */}
              <div className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 shadow-sm transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.02]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400">
                  <LuGraduationCap className="h-6 w-6" />
                </div>
                <h4 className="font-heading text-base font-extrabold text-white sm:text-lg">
                  Bachelor&apos;s Degree in Computer Application (BCA)
                </h4>
                <p className="mt-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  JIS College of Engineering, Kalyani
                </p>
                <p className="mt-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  Leveraging a logical, structured technical background to streamline complex digital audio workstation (DAW) workflows, signal path management, and software production tools. Key skills include: structured problem solving, technical agility, adaptability, and collaborative teamwork.
                </p>
              </div>

              {/* LCM Card */}
              <div className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 shadow-sm transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.02]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400">
                  <LuAward className="h-6 w-6" />
                </div>
                <h4 className="font-heading text-base font-extrabold text-white sm:text-lg">
                  Certified Musician - London College of Music (LCM)
                </h4>
                <p className="mt-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  University of West London
                </p>
                <p className="mt-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  Achieved high-level Distinction in Electric Guitar grade certifications. Formal study of Western Music Theory, acoustic/electric performance techniques, and classic and modern guitar styles, mentored by Classical Guitarist Mr. Ekannt Singh.
                </p>
              </div>
            </div>
            <p className="text-center text-xs font-medium italic text-cyan-400/80 pt-2">
              &ldquo;With a unique blend of musical talent, technical expertise, and esteemed educational credentials, Shuvam Raha has successfully merged his passion for music into a fulfilling full-time profession.&rdquo;
            </p>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 4: FEATURED SONG - PHIRTI POTHE
             ========================================== */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
              Featured Composition
            </h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
              {/* Info column */}
              <div className="space-y-4">
                <h4 className="font-heading text-2xl font-black text-white">
                  &ldquo;Phirti Pothe&rdquo;
                </h4>
                <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                  A Heartfelt Ode to Lost Love (2023)
                </p>
                <div className="text-xs leading-relaxed text-gray-400 sm:text-sm space-y-3">
                  <p>
                    Composed and sung by <strong className="text-white">Shuvam Raha</strong>, with lyrics by Niladri Banerjee and Subho Chakroborty, this song resonates with those who have loved, lost, and still find a way to smile.
                  </p>
                  <p>
                    The theme revolves around the bittersweet memories of a past relationship, bidding a final farewell to the comfort and companionship that once was. With its melancholic melody and evocative lyrics, &ldquo;Phirti Pothe&rdquo; is a soulful ballad that explores the complexities of love, loss, and longing.
                  </p>
                </div>

                {/* Streaming Links */}
                <div className="space-y-2 pt-2">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Listen on Streaming Services
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href="https://open.spotify.com/album/1ElJ94vEFe17G6kKbhuH2r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-xs font-bold text-green-400 transition-all hover:bg-green-500/20 active:scale-95"
                    >
                      <FaSpotify className="h-4 w-4" />
                      Spotify
                    </a>
                    <a
                      href="https://music.apple.com/us/album/phirti-pothe/1689193396"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-xl border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-bold text-pink-400 transition-all hover:bg-pink-500/20 active:scale-95"
                    >
                      <FaApple className="h-4 w-4" />
                      Apple Music
                    </a>
                    <a
                      href="https://music.amazon.com/albums/B0C6289PXW"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-400 transition-all hover:bg-amber-500/20 active:scale-95"
                    >
                      <FaAmazon className="h-4 w-4" />
                      Amazon Music
                    </a>
                  </div>
                </div>
              </div>

              {/* Player column */}
              <div>
                <BiographyAudioPlayer
                  audioUrl="https://shuvamrahamusic.com/wp-content/uploads/2018/10/music_preview.mp3"
                  posterUrl="https://shuvamrahamusic.com/wp-content/uploads/2025/04/Phirti-Pothe-downloaded-from-SpotiSongDownloader.com_-150x150.jpg"
                  title="Phirti Pothe"
                  artist="Shuvam Raha"
                />
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* ==========================================
              SECTION 5: VIDEO SHOWCASE GRID
             ========================================== */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
                Featured Performances &amp; Videos
              </h3>
              <p className="text-xs text-gray-400 sm:text-sm">
                Watch original tracks, unplugged renditions, and guitar instrumentals.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f1b]/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20"
                >
                  {/* Aspect ratio frame for YouTube Facade */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                    <YouTubeFacade videoId={vid.id} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading text-sm font-bold text-white line-clamp-1">
                        {vid.title}
                      </h4>
                      <span className="text-[10px] font-black text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
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
              SECTION 6: FEATURED ARTIST PROGRAM
             ========================================== */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f1b]/80 p-6 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-cyan-500/20 sm:p-8">
            <div className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-cyan-500/5 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-violet-500/5 blur-2xl" />

            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              {/* Poster frame */}
              <div className="relative mx-auto w-full max-w-[200px] shrink-0 overflow-hidden rounded-2xl border border-white/5 md:mx-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://shuvamrahamusic.com/wp-content/uploads/2025/09/Dimarzio-Cables-The-Stockist-Shuvam-Raha-poster-819x1024-jpg.avif"
                  alt="Dimarzio Cables The Stockist Shuvam Raha poster"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              {/* Text info */}
              <div className="space-y-3 flex-1">
                <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                  Artist Relations
                </span>
                <h3 className="font-heading text-lg font-extrabold text-white sm:text-xl md:text-2xl">
                  Featured Artist Program
                </h3>
                <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                  Shuvam Raha is featured as a stockist and artist representing{' '}
                  <strong className="text-white">DiMarzio Cables</strong>. This
                  partnership represents his dedication to using premium,
                  tour-grade guitar hardware and high-fidelity signal path chains
                  to achieve clean dynamics, noise rejection, and pristine
                  frequency responses in his live sets and studio recordings alike.
                </p>
              </div>
            </div>
          </div>

          {/* ==========================================
              QUOTE & CALL TO ACTION
             ========================================== */}
          <div className="flex flex-col items-center justify-center text-center py-6 px-4 rounded-3xl border border-white/5 bg-white/[0.005]">
            <span className="text-gray-500 text-3xl font-serif leading-none select-none">&ldquo;</span>
            <p className="font-heading text-base sm:text-xl font-bold tracking-tight text-white max-w-xl -mt-2">
              From passion to profession, every chord tells a story.
            </p>
            <span className="text-gray-500 text-3xl font-serif leading-none select-none mt-1">&rdquo;</span>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/guitar-classes-with-shuvam"
                className="group font-heading relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 sm:text-sm"
              >
                Join Guitar Classes
              </Link>
              <Link
                href="/contact"
                className="group font-heading flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95 sm:text-sm"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* ==========================================
              SOCIAL FOOTPRINT
             ========================================== */}
          <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Connect &amp; Follow Shuvam Raha
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { name: 'Spotify', icon: FaSpotify, url: 'https://open.spotify.com/artist/4AmYXw6BaXjFN4urc6SyrG', color: 'hover:text-green-500 hover:border-green-500/30 hover:bg-green-500/5' },
                { name: 'Apple Music', icon: FaApple, url: 'https://music.apple.com/us/artist/shuvam-raha/1541472783', color: 'hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/5' },
                { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/@shuvamrahamusic', color: 'hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5' },
                { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/shuvamrahamusic', color: 'hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-400/5' },
                { name: 'Facebook', icon: FaFacebookF, url: 'https://www.facebook.com/shuvamrahamusic', color: 'hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5' },
                { name: 'LinkedIn', icon: FaLinkedin, url: 'http://www.linkedin.com/in/shuvam-raha-150b869b', color: 'hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5' },
              ].map((social, sIdx) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={sIdx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 ${social.color}`}
                    title={social.name}
                  >
                    <SocialIcon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
