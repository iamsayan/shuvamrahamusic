'use client';

import { useState } from 'react';
import { LuPlay, LuX } from 'react-icons/lu';

export default function YouTubeModal({
  videoId,
  triggerType = 'hero',
}: {
  videoId: string;
  triggerType?: 'hero' | 'custom';
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      {triggerType === 'hero' ? (
        <div
          onClick={() => setIsOpen(true)}
          className="group/btn flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:scale-110 hover:border-white/40 hover:bg-white/20 sm:h-24 sm:w-24"
        >
          <LuPlay className="ml-1.5 h-8 w-8 fill-white text-white transition-colors duration-300 group-hover/btn:fill-cyan-400 group-hover/btn:text-cyan-400 sm:h-10 sm:w-10" />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-6 py-3 font-bold text-cyan-400 transition-all hover:bg-cyan-500/20 active:scale-95"
        >
          <LuPlay className="h-4 w-4 fill-cyan-400" />
          Watch Performance
        </button>
      )}

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-[#020205]/95 p-4 backdrop-blur-lg sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="animate-zoom-in relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white/10"
              aria-label="Close video"
            >
              <LuX className="h-5 w-5" />
            </button>
            <div className="absolute inset-0 bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="Shuvam Raha - Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
