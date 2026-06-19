import React from 'react';
import ReviewCard from '@/components/review-card';
import { Review } from '@/lib/reviews';

interface ReviewsMarqueeProps {
  reviews: Review[];
}

export default function ReviewsMarquee({ reviews }: ReviewsMarqueeProps) {
  if (!reviews || reviews.length === 0) return null;

  const half = Math.ceil(reviews.length / 2);
  const topRowReviews = reviews.slice(0, half);
  const bottomRowReviews = reviews.slice(half);

  return (
    <div className="relative z-10 flex w-full flex-col gap-6 overflow-hidden group">
      {/* Top Row (Scrolls Left) */}
      <div className="flex w-max gap-6 px-4 animate-[scroll-left_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...topRowReviews, ...topRowReviews].map((review, idx) => (
          <ReviewCard key={`top-${idx}`} review={review} />
        ))}
      </div>

      {/* Bottom Row (Scrolls Right) */}
      <div className="flex w-max gap-4 px-4 sm:gap-6 animate-[scroll-right_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...bottomRowReviews, ...bottomRowReviews].map((review, idx) => (
          <ReviewCard key={`bottom-${idx}`} review={review} />
        ))}
      </div>

      {/* Gradient Fades for Smooth Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-linear-to-r from-[#05050A] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-linear-to-l from-[#05050A] to-transparent z-20" />
    </div>
  );
}
