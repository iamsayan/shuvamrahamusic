'use client';

import { useReviews } from '@/app/providers';
import ReviewCard from '@/components/review-card';

import { LuMapPin, LuStar } from 'react-icons/lu';

export default function ReviewsMarquee() {
  const reviews = useReviews();
  const hasReviews = reviews && reviews.length > 0;

  if (hasReviews) {
    const half = Math.ceil(reviews.length / 2);
    const topRowReviews = reviews.slice(0, half);
    const bottomRowReviews = reviews.slice(half);

    return (
      <>
        <div className="group relative z-10 flex w-full flex-col gap-6 overflow-hidden">
          {/* Top Row (Scrolls Left) */}
          <div className="flex w-max animate-[scroll-left_40s_linear_infinite] gap-6 px-4 group-hover:[animation-play-state:paused]">
            {[...topRowReviews, ...topRowReviews].map((review, idx) => (
              <ReviewCard key={`top-${idx}`} review={review} />
            ))}
          </div>

          {/* Bottom Row (Scrolls Right) */}
          <div className="flex w-max animate-[scroll-right_40s_linear_infinite] gap-4 px-4 group-hover:[animation-play-state:paused] sm:gap-6">
            {[...bottomRowReviews, ...bottomRowReviews].map((review, idx) => (
              <ReviewCard key={`bottom-${idx}`} review={review} />
            ))}
          </div>

          {/* Gradient Fades for Smooth Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-linear-to-r from-[#05050A] to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-linear-to-l from-[#05050A] to-transparent sm:w-40" />
        </div>

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
    );
  }

  // Fallback block if no reviews
  return (
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
              We sync our student success stories directly from Google Maps in
              real-time. Feel free to browse all verified 5.0 star student
              reviews on our official profile.
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
  );
}
