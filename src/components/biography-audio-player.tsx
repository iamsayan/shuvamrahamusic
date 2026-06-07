'use client';

import { useEffect, useRef, useState } from 'react';
import { LuPause, LuPlay, LuVolume2 } from 'react-icons/lu';

interface AudioPlayerProps {
  audioUrl: string;
  posterUrl: string;
  title: string;
  artist: string;
}

export default function BiographyAudioPlayer({
  audioUrl,
  posterUrl,
  title,
  artist,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('-:--');

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime('0:00');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error('Audio play failed:', err);
      });
      setIsPlaying(true);
    }
  };

  const handleScrubberChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;
    
    const newTime = clickPercentage * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(clickPercentage * 100);
    setCurrentTime(formatTime(newTime));
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f1b]/90 p-4 shadow-xl backdrop-blur-md sm:p-5">
      {/* Glow effect */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-xl" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Album Art / Poster */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterUrl}
          alt={`${title} artwork`}
          className="h-20 w-20 rounded-xl object-cover shadow-lg border border-white/5 mx-auto sm:mx-0"
        />

        <div className="flex-1 text-center sm:text-left">
          <h4 className="font-heading text-base font-extrabold text-white sm:text-lg">
            {title}
          </h4>
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mt-0.5">
            {artist}
          </p>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-center sm:justify-start gap-4">
            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-md transition-all hover:scale-105 hover:bg-white/20 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <LuPause className="h-4 w-4 fill-white" />
              ) : (
                <LuPlay className="h-4 w-4 fill-white ml-0.5" />
              )}
            </button>
            <div className="flex items-center gap-1.5 text-gray-400">
              <LuVolume2 className="h-4 w-4 text-cyan-400/80" />
              <span className="text-xs font-bold tracking-wide">Audio Preview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrubber / Progress Bar */}
      <div className="mt-4">
        <div
          onClick={handleScrubberChange}
          className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/10 overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] font-bold text-gray-500">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}
