"use client";

import { BadgeCheck, MessageSquareQuote, Star } from "lucide-react";

// ============================================================================
// REVIEW DATA
// ============================================================================
const allReviews = [
  {
    name: "Rahul S.",
    role: "Beginner Student",
    text: "Started from absolute scratch and within 30 days I was playing my favorite songs! The structured syllabus makes all the difference.",
  },
  {
    name: "Priya M.",
    role: "Intermediate Player",
    text: "Shuvam's approach to music theory is mind-blowing. He makes complex concepts feel incredibly simple. Best decision I made.",
  },
  {
    name: "David L.",
    role: "Global Student (USA)",
    text: "Even across time zones, the flexible scheduling and 1-on-1 attention is unmatched. The video feedback on my playing is super helpful.",
  },
  {
    name: "Ananya K.",
    role: "Offline Student",
    text: "Learning in the studio has been an amazing experience. Shuvam instantly spots my mistakes and fixes my posture. Highly recommended!",
  },
  {
    name: "Arjun T.",
    role: "Advanced Learner",
    text: "I was stuck playing the same pentatonic licks for years. Shuvam taught me modes and improvisation. My playing has completely transformed.",
  },
  {
    name: "Sarah W.",
    role: "Global Student (UK)",
    text: "The LCM certification prep is rigorous but very well structured. I passed my Grade 3 with Distinction thanks to this program.",
  },
  {
    name: "Kabir D.",
    role: "Beginner Student",
    text: "I tried learning from YouTube for months with zero progress. Just 4 classes here and I can finally transition chords smoothly.",
  },
  {
    name: "Neha R.",
    role: "Parent",
    text: "My 10-year-old son absolutely loves his classes. Shuvam is incredibly patient and knows exactly how to keep kids engaged with music.",
  },
];

// Split reviews into two rows for the marquee
const topRowReviews = allReviews.slice(0, 4);
const bottomRowReviews = allReviews.slice(4, 8);

// Component for a single Review Card
const ReviewCard = ({ review }: { review: (typeof allReviews)[0] }) => (
  <div className="w-[320px] sm:w-[400px] shrink-0 p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
      "{review.text}"
    </p>
    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
      <div>
        <h4 className="text-white font-bold">{review.name}</h4>
        <p className="text-gray-500 text-xs sm:text-sm">{review.role}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
        <MessageSquareQuote className="w-4 h-4 text-blue-400" />
      </div>
    </div>
  </div>
);

export default function Reviews() {
  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden bg-[#05050A]"
      id="reviews"
    >
      {/* Dynamic CSS for the Infinite Marquee */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: scroll-right 40s linear infinite;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `,
        }}
      />

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-600/5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20 mb-12 sm:mb-16 text-center">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <BadgeCheck className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              Student Success Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Trusted By{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              150+ Students
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
            Don't just take our word for it. Here is what actual students have
            to say about their learning experience.
          </p>
        </div>
      </div>

      {/* === Infinite Marquee Rows === */}
      <div className="relative z-10 w-full flex flex-col gap-6 marquee-container">
        {/* Top Row (Scrolls Left) */}
        <div className="flex w-max gap-6 animate-marquee-left px-4">
          {/* We duplicate the array to create the seamless infinite scrolling effect */}
          {[...topRowReviews, ...topRowReviews].map((review, idx) => (
            <ReviewCard key={`top-${idx}`} review={review} />
          ))}
        </div>

        {/* Bottom Row (Scrolls Right) */}
        <div className="flex w-max gap-6 animate-marquee-right px-4">
          {[...bottomRowReviews, ...bottomRowReviews].map((review, idx) => (
            <ReviewCard key={`bottom-${idx}`} review={review} />
          ))}
        </div>

        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#05050A] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#05050A] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
