"use client";

import React, { useRef, useState, useEffect } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function SliderGallery({
  children,
  itemWidth = 320,
  autoScroll = false,
}: {
  children: React.ReactNode;
  itemWidth?: number;
  autoScroll?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsCount = React.Children.count(children);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const scrollWidth =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

    // Protect against division by zero
    if (scrollWidth <= 0) {
      setActiveIndex(0);
      return;
    }

    const percentage = scrollLeft / scrollWidth;
    const index = Math.round(percentage * (itemsCount - 1));
    setActiveIndex(Math.min(itemsCount - 1, Math.max(0, index)));
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const scrollWidth =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const targetScroll = (index / (itemsCount - 1)) * scrollWidth;
    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  // Check initial state in case screen size prevents scrolling
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoscroll timer effect (pauses on hover and handles multiple visible items correctly)
  useEffect(() => {
    if (!autoScroll || itemsCount <= 1 || isHovered) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      // If all items are visible on screen, do not scroll
      if (maxScrollLeft <= 0) return;

      // If we are at or near the end of the scrollable area, wrap back to the start
      if (scrollLeft >= maxScrollLeft - 15) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right by exactly one item width
        scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    }, 4000); // 4-second scroll interval

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoScroll, itemsCount, isHovered, itemWidth]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scrollable Container Wrapper for exact vertical centering */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-5 md:gap-6 snap-x snap-mandatory scrollbar-hide pb-4 pt-2 -mx-5 px-5 md:mx-0 md:px-0"
        >
          {children}
        </div>

        {/* Nav Buttons (Visible all the time) */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-[#05050A]/90 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300"
        >
          <LuChevronLeft className="w-6 h-6 pr-0.5" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-[#05050A]/90 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300"
        >
          <LuChevronRight className="w-6 h-6 pl-0.5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6 pointer-events-none">
        {Array.from({ length: itemsCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            disabled
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i
                ? "w-8 h-2 bg-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                : "w-2 h-2 bg-white/20"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
