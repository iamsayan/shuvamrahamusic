import { Review } from '@/lib/reviews';

import { LuStar } from 'react-icons/lu';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="group relative flex w-72.5 shrink-0 flex-col justify-between overflow-hidden rounded-4xl border border-white/6 bg-linear-to-b from-white/3 to-white/1 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.01] hover:border-amber-500/30 hover:bg-white/5 hover:shadow-[0_0_40px_rgba(245,158,11,0.06)] active:scale-[0.99] sm:w-105 sm:p-7">
      {/* Ambient Background Accent Glow */}
      <div className="pointer-events-none absolute top-0 right-0 size-24 rounded-full bg-amber-500/5 opacity-0 blur-[30px] transition-opacity duration-700 group-hover:opacity-100" />

      {/* Quotation Icon Decorator */}
      <span className="pointer-events-none absolute top-4 right-6 font-serif text-6xl text-white/3 transition-colors duration-500 select-none group-hover:text-amber-500/6">
        “
      </span>

      <div className="flex flex-col gap-4">
        {/* Testimonial Header: Stars & Verification */}
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <LuStar
                key={i}
                className="size-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)] sm:h-4 sm:w-4"
              />
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-wider text-emerald-400 uppercase sm:text-[10px]">
            <span className="animate-duration-1000 size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Verified Student
          </div>
        </div>

        {/* Testimonial Body Text */}
        <p className="relative z-10 line-clamp-4 text-[13px] leading-relaxed text-gray-300 italic transition-colors duration-300 group-hover:text-white sm:text-[14px]">
          &ldquo;{review.review}&rdquo;
        </p>
      </div>

      {/* Testimonial Footer: Student Profile */}
      <div className="mt-6 flex items-center justify-between border-t border-white/6 pt-4">
        <div className="flex flex-col text-left">
          <h4 className="font-heading text-sm font-bold text-white transition-colors duration-300 group-hover:text-amber-400 sm:text-base">
            {review.author}
          </h4>
          <span className="mt-0.5 text-xs text-gray-500">{review.date}</span>
        </div>

        {/* Animated Avatar Ring */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-amber-500 to-orange-500 opacity-20 blur-[3px] transition-opacity duration-500 group-hover:opacity-60" />
          <div className="relative z-10 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/8 transition-all duration-500 group-hover:ring-amber-500/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={review.profileImage}
              alt={review.author}
              className="size-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
