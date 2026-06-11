import Image from 'next/image';
import Link from 'next/link';

import BiographyAudioPlayer from '@/components/biography-audio-player';
import SliderGallery from '@/components/slider-gallery';
import YouTubeFacade from '@/components/youtube-facade';
import CockpitImage from '@/components/cockpit-image';
import {
  BRIGHT_GRADIENTS,
  CATEGORY_THEMES,
  GLOW_COLORS,
  getBlogPosts,
  getThemeKey,
} from '@/lib/blog-data';
import cockpit from '@/lib/client';
import { authorityPoints, curriculum } from '@/lib/guitar-data';

import {
  FaAmazon,
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaSpotify,
  FaYoutube,
} from 'react-icons/fa6';
import {
  LuArrowRight,
  LuAward,
  LuCalendar,
  LuChevronRight,
  LuClock,
  LuFlame,
  LuGlobe,
  LuGraduationCap,
  LuGuitar,
  LuMic,
  LuMusic,
  LuSettings,
  LuSparkles,
  LuUsers,
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

const highlights = [
  {
    title: 'Corporate Events & Shows',
    organization: 'Various Clients',
    type: 'Live Performance',
  },
  {
    title: "Dr Reddy's Laboratories",
    organization: 'M Power Meet',
    type: 'Corporate Event',
  },
  {
    title: 'Nexshow VOL 1',
    organization: 'Ultimate Music Fusion',
    type: 'Public Concert',
  },
  {
    title: 'Private & Club Sets',
    organization: 'Kolkata venues',
    type: 'Acoustic Unplugged',
  },
];

export default async function Home() {
  // Fetch latest posts dynamically (returns static posts when CMS is not configured)
  const allPosts = await getBlogPosts();
  const latestPosts = allPosts.slice(0, 3);

  // Take first 4 gear items dynamically from Cockpit CMS
  let featuredGears: any[] = [];
  try {
    const response = await cockpit.listContentItems<any[]>('gears', {
      limit: 4,
    });
    featuredGears = response.map((item) => ({
      id: item._id,
      category: item.categories?.[0] || 'Other Guitar Accessories',
      title: item.title,
      description: item.description || '',
    }));
  } catch (error) {
    console.error('Error fetching featured gears:', error);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050A] text-[#f0f0f5]">
      {/* Ambient background glows */}
      <div className="animate-blob-1 pointer-events-none absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[150px]" />
      <div className="animate-blob-2 pointer-events-none absolute top-1/3 right-1/4 h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[150px]" />
      <div className="animate-blob-3 pointer-events-none absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[150px]" />

      {/* ==========================================================
          1. HERO SECTION
         ========================================================== */}
      <section className="relative flex min-h-[100svh] items-center pt-28 pb-20 md:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.png"
            alt="Hero Background Grid"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-color-dodge"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05050A]/90 via-[#05050A]/70 to-[#05050A]" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 md:px-12 lg:grid-cols-12 lg:gap-8 lg:px-20">
          <div className="animate-in-1 space-y-6 text-center lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
              <LuAward className="h-4 w-4 text-cyan-400" />
              <span className="text-[10px] font-black tracking-widest text-cyan-200 uppercase">
                LCM Certified Music Instructor
              </span>
            </div>

            <h1 className="font-heading text-3xl leading-[1.15] font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Shuvam Raha{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                Music
              </span>
            </h1>

            <p className="font-heading text-xl font-medium tracking-wider text-cyan-400">
              Easy To Learn & Easy To Play
            </p>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base lg:mx-0 lg:text-lg">
              Welcome to the professional domain of Shuvam Raha — an LCM
              distinction certified guitarist, instructor, stage performer, and
              music producer. Play your first favorite songs in 30 days.
            </p>

            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
              <Link
                href="/guitar-classes-with-shuvam"
                className="group font-heading relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95"
              >
                Join Guitar Classes
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/biography"
                className="group font-heading flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
              >
                Read Biography
              </Link>
            </div>
          </div>

          <div className="animate-in-3 flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative aspect-[3/4] w-full max-w-[380px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/5">
              <Image
                src="/hero-guitarist.jpg"
                alt="Shuvam Raha playing guitar"
                fill
                priority
                className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 380px, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          2. STATS BAR / CREDENTIALS (Drawn from authorityPoints)
         ========================================================== */}
      <section className="relative z-10 border-y border-white/5 bg-[#07070F]/50 py-10 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="space-y-1">
              <div className="font-heading text-3xl font-black text-cyan-400 sm:text-4xl">
                {new Date().getFullYear() - 2015}+
              </div>
              <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Years Experience
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-heading text-3xl font-black text-violet-400 sm:text-4xl">
                150+
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
          </div>
        </div>
      </section>

      {/* ==========================================================
          3. BIO INTRO SECTION
         ========================================================== */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 md:px-12 lg:grid-cols-12 lg:px-20">
          <div className="space-y-6 lg:col-span-5">
            <span className="font-heading text-sm font-bold tracking-[0.15em] text-cyan-400 uppercase">
              Meet the Instructor
            </span>
            <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              A Unique Fusion of{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Tech &amp; Melody
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              Shuvam holds a Bachelor&apos;s degree in Computer Application
              (BCA) and a high distinction certification in Electric Guitar from
              the <strong>London College of Music (LCM)</strong>. This unique
              combination allows him to integrate logical systems with emotional
              musicality, optimizing sound production software and structured
              guitar classes alike.
            </p>
            <div className="pt-2">
              <Link
                href="/biography"
                className="group font-heading inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-cyan-400"
              >
                Learn More About Shuvam
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {authorityPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-2xl border ${point.border} ${point.bg} p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]`}
                >
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${point.border} ${point.bg} ${point.color} transition-transform group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" />
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
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
              <LuMusic className="h-4 w-4 text-cyan-400" />
              <span className="text-[10px] font-black tracking-widest text-cyan-200 uppercase">
                Guitar Learning Program
              </span>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              What You Will{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.25)]">
                Learn
              </span>
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
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
                  className={`group relative flex flex-col justify-between rounded-2xl border border-white/[0.05] bg-[#0c0c16]/50 p-6 shadow-lg backdrop-blur-md transition-all duration-500 md:p-7 ${item.styles.hoverBorder} overflow-hidden hover:-translate-y-1 hover:bg-white/[0.02] hover:shadow-2xl ${colSpanClass}`}
                >
                  {/* Ambient hover glow inside card */}
                  <div
                    className={`absolute -right-12 -bottom-12 h-32 w-32 rounded-full ${item.styles.ambientGlow || 'bg-cyan-500/10'} pointer-events-none -z-10 opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100`}
                  />

                  {/* Giant floating step numbers */}
                  <div className="font-heading pointer-events-none absolute right-4 bottom-1 text-[6.5rem] leading-none font-black text-white/[0.015] transition-all duration-700 select-none group-hover:translate-y-1 group-hover:text-white/[0.04]">
                    0{idx + 1}
                  </div>

                  <div className="relative z-10 space-y-5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${item.styles.iconBorder} ${item.styles.iconBg} ${item.styles.iconText} ${item.styles.iconShadow} transition-transform duration-500 group-hover:scale-110`}
                    >
                      <Icon className="h-5 w-5" />
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
                            className={`h-1.5 w-1.5 rounded-full ${item.styles.iconBg} ${item.styles.iconText} mt-1.5 shrink-0 opacity-80`}
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
              className="group font-heading inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-xs font-bold text-white shadow-lg shadow-cyan-500/10 transition-all hover:scale-105 hover:shadow-cyan-500/20 active:scale-95 sm:text-sm"
            >
              Explore Course Packages &amp; Pricing
              <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================
          5. FEATURED COMPOSITION (AUDIO PLAYER)
         ========================================================== */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 md:px-12 lg:grid-cols-12 lg:px-20">
          <div className="space-y-6 lg:col-span-7">
            <span className="font-heading text-sm font-bold tracking-[0.15em] text-cyan-400 uppercase">
              Featured Composition
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              &ldquo;Phirti Pothe&rdquo;
            </h2>
            <p className="font-heading text-xs font-bold tracking-widest text-cyan-400/90 uppercase">
              Ballad of Love and Memories (2023)
            </p>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              A soulful acoustic ballad composed, produced, and sung by Shuvam
              Raha, capturing the bittersweet emotions of lost connection and
              acceptance. Listen to the track preview below or stream it on
              major music services.
            </p>

            <div className="space-y-3 pt-4">
              <span className="font-heading block text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                Stream full track on
              </span>
              <div className="flex flex-wrap gap-3">
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
                  Amazon
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <BiographyAudioPlayer
              audioUrl="https://www.shuvamrahamusic.com/wp-content/uploads/2018/10/music_preview.mp3"
              posterUrl="https://www.shuvamrahamusic.com/wp-content/uploads/2025/04/Phirti-Pothe-downloaded-from-SpotiSongDownloader.com_-150x150.jpg"
              title="Phirti Pothe"
              artist="Shuvam Raha"
            />
          </div>
        </div>
      </section>

      {/* ==========================================================
          6. MUSIC VIDEOS CAROUSEL
         ========================================================== */}
      <section className="relative z-10 border-t border-white/5 bg-[#07070F]/30 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
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
                  className="group w-[340px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f1b]/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20"
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
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
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
                <div key={videoId} className="w-[220px] shrink-0 snap-center">
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#131320] shadow-md">
                    <YouTubeFacade videoId={videoId} />
                  </div>
                </div>
              ))}
            </SliderGallery>
          </div>
        </div>
      </section>

      {/* ==========================================================
          8. GEARS HIGHLIGHT (Drawn dynamically from GEAR_ITEMS)
         ========================================================== */}
      <section className="relative z-10 border-t border-white/5 bg-[#07070F]/30 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl space-y-4">
              <span className="font-heading text-sm font-bold tracking-[0.15em] text-cyan-400 uppercase">
                Pro Hardware
              </span>
              <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                The Gear Selection
              </h2>
              <p className="text-sm text-gray-400 sm:text-base">
                Shuvam utilizes industry-standard tour gear, high-fidelity
                pickups, and clean sound-path cabling to secure high dynamic
                resolution in live play and tracking.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/my-gears"
                className="group font-heading inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 active:scale-95 sm:text-sm"
              >
                View Complete Gear Locker
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGears.map((gear) => (
              <div
                key={gear.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f1b]/80 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20"
              >
                <span className="font-heading mb-2 block text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                  {gear.category}
                </span>
                <h3 className="font-heading text-base font-extrabold text-white transition-colors group-hover:text-cyan-400">
                  {gear.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-400">
                  {gear.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================
          9. LATEST ARTICLES SECTION (Drawn dynamically from BLOG_POSTS)
         ========================================================== */}
      {latestPosts.length > 0 && (
        <section className="relative z-10 bg-[#05050A] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
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
                  className="group font-heading inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 active:scale-95 sm:text-sm"
                >
                  Read All Articles
                  <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => {
                const primaryCat = post.categories[0]?.title || '';
                const themeKey = getThemeKey(primaryCat);
                const primaryTheme =
                  CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] transition-all duration-500 hover:${primaryTheme.border} hover:bg-white/[0.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]`}
                  >
                    <div
                      className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${BRIGHT_GRADIENTS[themeKey] || BRIGHT_GRADIENTS['default']} z-20 opacity-20 transition-opacity duration-500 group-hover:opacity-90`}
                    />
                    <div
                      className={`pointer-events-none absolute -right-16 -bottom-16 h-36 w-36 rounded-full ${GLOW_COLORS[themeKey] || GLOW_COLORS['default']} z-0 opacity-0 blur-[40px] transition-opacity duration-700 group-hover:opacity-100`}
                    />

                    <div>
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                        {post.coverImage && (
                          <CockpitImage
                            asset={post.coverImage}
                            className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
                            fill
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/40 to-transparent" />
                        <div className="absolute top-4 left-4 flex max-w-[85%] flex-wrap gap-1.5">
                          {post.categories.map((cat, idx) => {
                            const catThemeKey = getThemeKey(cat.title);
                            const catTheme =
                              CATEGORY_THEMES[catThemeKey] ||
                              CATEGORY_THEMES['default'];
                            return (
                              <span
                                key={idx}
                                className={`rounded-full border ${catTheme.border} bg-[#05050A]/85 px-2.5 py-0.5 text-[9px] font-black tracking-widest ${catTheme.text} uppercase backdrop-blur-md`}
                              >
                                {cat.title}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-5.5">
                        <div className="mb-2 flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase">
                          <span className="flex items-center gap-1">
                            <LuCalendar className="h-3.5 w-3.5" />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <LuClock className="h-3.5 w-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3
                          className={`font-heading mb-3 text-base leading-snug font-extrabold text-white group-hover:${primaryTheme.text} transition-colors duration-300`}
                        >
                          {post.title}
                        </h3>

                        <p className="line-clamp-3 text-xs leading-relaxed text-gray-400">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.04] p-5.5 pt-4">
                      <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase transition-colors duration-300 group-hover:text-white">
                        Read Article
                      </span>
                      <span
                        className={`${primaryTheme.text} transition-transform duration-300 group-hover:translate-x-1.5`}
                      >
                        <LuChevronRight className="h-4.5 w-4.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ==========================================================
          10. PERFORMANCE HIGHLIGHTS / TIMELINE
         ========================================================== */}
      <section className="relative z-10 border-t border-white/5 bg-[#07070F]/30 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
          <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
            <span className="font-heading text-sm font-bold tracking-[0.15em] text-cyan-400 uppercase">
              Live Concerts &amp; Sessions
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Performance Milestones
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              A record of featured public concerts, corporate gigs, and live
              performance collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/[0.04] bg-[#131320]/40 p-6 shadow-md transition-all duration-300 hover:border-violet-500/20 hover:bg-[#131320]/60"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/5 text-violet-400 transition-transform group-hover:scale-105">
                  <LuMusic className="h-5 w-5" />
                </div>
                <span className="font-heading mb-1 block text-[9px] font-black tracking-widest text-gray-500 uppercase">
                  {item.type}
                </span>
                <h3 className="font-heading text-base font-extrabold text-white">
                  {item.title}
                </h3>
                <p className="font-heading mt-1 text-xs font-semibold tracking-wider text-violet-400 uppercase">
                  {item.organization}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              className="group font-heading relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Book Class Details
              <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group font-heading flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
            >
              Contact Shuvam
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
