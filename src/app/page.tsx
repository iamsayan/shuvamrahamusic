import Link from 'next/link';
import { LuArrowRight, LuMusic } from 'react-icons/lu';

export default function Home() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#020205] text-[#f0f0f5]">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-cyan-600/10 blur-[120px] animate-blob-1" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[120px] animate-blob-2" />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center px-5 text-center">
        {/* Animated Icon */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-cyan-500/5 backdrop-blur-md animate-slow-bounce">
          <LuMusic className="h-8 w-8 text-cyan-400" />
        </div>

        {/* Title */}
        <h1 className="font-heading mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Shuvam Raha{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Music
          </span>
        </h1>

        {/* Description */}
        <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
          Our main website is currently tuned up and preparing for debut.
          In the meantime, join our active learning programs and master the guitar!
        </p>

        {/* Call to Action */}
        <Link
          href="/guitar-classes-with-shuvam"
          className="group font-heading relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95"
        >
          Explore Guitar Classes
          <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}

