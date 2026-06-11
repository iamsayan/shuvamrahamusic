'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

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

  const handleScroll = useCallback(() => {
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
  }, [itemsCount]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const scrollWidth =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const targetScroll = (index / (itemsCount - 1)) * scrollWidth;
    scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }
  };

  // Check initial state in case screen size prevents scrolling
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll();
    }, 0);
    return () => clearTimeout(timer);
  }, [handleScroll]);

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
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by exactly one item width
        scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }, 4000); // 4-second scroll interval

    return () => clearInterval(interval);
  }, [autoScroll, itemsCount, isHovered, itemWidth]);

  const dotsArray = useMemo(
    () => Array.from({ length: itemsCount }),
    [itemsCount]
  );

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
          className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pt-2 pb-4 md:mx-0 md:gap-6 md:px-0"
        >
          {children}
        </div>

        {/* Nav Buttons (Visible all the time) */}
        <button
          onClick={scrollLeft}
          className="absolute top-1/2 left-0 z-20 flex h-12 w-12 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#05050A]/90 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10 md:-translate-x-6"
        >
          <LuChevronLeft className="h-6 w-6 pr-0.5" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute top-1/2 right-0 z-20 flex h-12 w-12 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#05050A]/90 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10 md:translate-x-6"
        >
          <LuChevronRight className="h-6 w-6 pl-0.5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="pointer-events-none mt-6 flex justify-center gap-2">
        {dotsArray.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            disabled
            className={`rounded-full transition-all duration-300 ${
              activeIndex === i
                ? 'h-2 w-8 bg-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                : 'h-2 w-2 bg-white/20'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
