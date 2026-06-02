"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export default function YouTubeModal({
  videoId,
  triggerType = "hero",
}: {
  videoId: string;
  triggerType?: "hero" | "custom";
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      {triggerType === "hero" ? (
        <div
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110 group/btn"
        >
          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1.5 group-hover/btn:text-cyan-400 group-hover/btn:fill-cyan-400 transition-colors duration-300" />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold hover:bg-cyan-500/20 transition-all active:scale-95"
        >
          <Play className="w-4 h-4 fill-cyan-400" />
          Watch Performance
        </button>
      )}

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#020205]/95 backdrop-blur-lg animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors backdrop-blur-md border border-white/10"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute inset-0 bg-black">
              <iframe
                className="w-full h-full"
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
