'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import PageLayout from '@/components/page-layout';

import {
  LuCircleHelp,
  LuLayoutGrid,
  LuListMusic,
  LuMusic,
  LuPlay,
  LuRotateCcw,
  LuSquare,
  LuVolume2,
  LuVolumeX,
} from 'react-icons/lu';

// Note frequency map for basic chord voicings (EADGBE approximations)
const CHORD_VOICINGS: Record<string, number[]> = {
  C: [130.81, 164.81, 196.0, 261.63, 329.63, 523.25], // C Major
  D: [146.83, 220.0, 293.66, 369.99, 440.0, 587.33], // D Major
  E: [82.41, 123.47, 164.81, 246.94, 329.63, 493.88], // E Major
  G: [98.0, 123.47, 146.83, 196.0, 246.94, 392.0], // G Major
  A: [110.0, 164.81, 220.0, 277.18, 329.63, 440.0], // A Major
  Am: [110.0, 164.81, 220.0, 261.63, 329.63, 440.0], // A Minor
  Dm: [146.83, 220.0, 293.66, 349.23, 440.0, 587.33], // D Minor
  Em: [82.41, 123.47, 164.81, 196.0, 246.94, 329.63], // E Minor
  F: [87.31, 130.81, 174.61, 220.0, 261.63, 349.23], // F Major
  Cadd9: [130.81, 164.81, 196.0, 293.66, 329.63, 523.25],
};

const PRESETS = [
  {
    name: 'Campfire Strum (Folk)',
    pattern: ['D', '-', 'D', 'U', '-', 'U', 'D', 'U'], // D - D U - U D U
    description:
      'The most versatile, essential strumming pattern in guitar history.',
  },
  {
    name: 'Pop Rock Strum',
    pattern: ['D', '-', 'D', '-', 'U', 'D', 'U', 'D'],
    description: 'Energetic pop pattern emphasizing the syncopated off-beats.',
  },
  {
    name: 'Reggae Skank',
    pattern: ['-', 'U', '-', 'U', '-', 'U', '-', 'U'],
    description:
      'Focuses strictly on the upbeat (off-beat) cuts with sharp upstrums.',
  },
  {
    name: 'Driving Eighths',
    pattern: ['D', 'U', 'D', 'U', 'D', 'U', 'D', 'U'],
    description:
      'Continuous movement keeping steady time across all divisions.',
  },
  {
    name: 'Acoustic Ballad',
    pattern: ['D', '-', 'D', 'U', 'X', 'U', 'D', 'U'],
    description:
      'Uses a muted slap/chink (X) on beat 3 for percussive texture.',
  },
];

const CHORD_PROGRESSIONS = [
  { name: 'Pop Progression (G - D - Em - C)', chords: ['G', 'D', 'Em', 'C'] },
  { name: 'Sad/Emotional (Am - F - C - G)', chords: ['Am', 'F', 'C', 'G'] },
  { name: 'Classic Rock (G - C - D - C)', chords: ['G', 'C', 'D', 'C'] },
  { name: 'Mellow Ballad (C - G - Am - F)', chords: ['C', 'G', 'Am', 'F'] },
  { name: 'Spanish Warmth (Am - G - F - E)', chords: ['Am', 'G', 'F', 'E'] },
];

export default function RhythmWorkshopPage() {
  const [bpm, setBpm] = useState(90);
  const [pattern, setPattern] = useState<string[]>(PRESETS[0].pattern);
  const [progression, setProgression] = useState<string[]>(
    CHORD_PROGRESSIONS[0].chords
  );
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepIndexRef = useRef(0);
  const chordCycleRef = useRef(0);

  const initAudio = useCallback(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
  }, []);

  const playStrum = useCallback(
    (strumType: string, chordName: string) => {
      initAudio();
      if (isMuted || !audioContextRef.current) return;
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const frequencies = CHORD_VOICINGS[chordName] || CHORD_VOICINGS.G;
      const now = ctx.currentTime;

      if (strumType === 'D') {
        // Downstrum: Low strings to high strings
        frequencies.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.value = freq;

          // Pluck envelope: offset start time for low-to-high sweep
          const startOffset = index * 0.025;
          gain.gain.setValueAtTime(0, now + startOffset);
          gain.gain.linearRampToValueAtTime(0.25, now + startOffset + 0.01);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            now + startOffset + 0.85
          );

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + startOffset);
          osc.stop(now + startOffset + 0.9);
        });
      } else if (strumType === 'U') {
        // Upstrum: High strings to low strings
        const reversedFreqs = [...frequencies].reverse();
        reversedFreqs.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.value = freq;

          const startOffset = index * 0.02;
          gain.gain.setValueAtTime(0, now + startOffset);
          gain.gain.linearRampToValueAtTime(0.2, now + startOffset + 0.01);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            now + startOffset + 0.7
          );

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + startOffset);
          osc.stop(now + startOffset + 0.85);
        });
      } else if (strumType === 'X') {
        // Muted Strum: Sharp percussive slap
        frequencies.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.value = freq * 0.9;

          const startOffset = index * 0.01;
          gain.gain.setValueAtTime(0, now + startOffset);
          gain.gain.linearRampToValueAtTime(0.3, now + startOffset + 0.005);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            now + startOffset + 0.08
          );

          // Lowpass filter for muted impact sound
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(250, now);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + startOffset);
          osc.stop(now + startOffset + 0.1);
        });
      }
    },
    [initAudio, isMuted]
  );

  const togglePlayback = useCallback(() => {
    setIsPlaying((prev) => {
      const nextPlaying = !prev;
      if (!nextPlaying) {
        setCurrentStep(null);
        setCurrentChordIndex(0);
      }
      return nextPlaying;
    });
  }, []);

  const clearPattern = () => {
    setPattern(Array(8).fill('-'));
  };

  const loadPreset = (presetPattern: string[]) => {
    setPattern([...presetPattern]);
  };

  const handleStepClick = (index: number) => {
    const nextStrumMap: Record<string, string> = {
      '-': 'D',
      D: 'U',
      U: 'X',
      X: '-',
    };
    const newPattern = [...pattern];
    newPattern[index] = nextStrumMap[pattern[index]] || '-';
    setPattern(newPattern);
  };

  // Playback Sequencer Loop
  useEffect(() => {
    if (playIntervalRef.current) clearInterval(playIntervalRef.current);

    if (isPlaying) {
      // 8th note duration at the current BPM
      const stepMs = (60 / bpm / 2) * 1000;

      playIntervalRef.current = setInterval(() => {
        const step = stepIndexRef.current;
        setCurrentStep(step);

        const activeChord = progression[chordCycleRef.current];
        const strum = pattern[step];

        if (strum !== '-') {
          playStrum(strum, activeChord);
        }

        // Advance 8th note steps
        stepIndexRef.current = (step + 1) % 8;

        // Advance chord on the downbeat of the next measure (beat 1 / step 0)
        if (stepIndexRef.current === 0) {
          chordCycleRef.current =
            (chordCycleRef.current + 1) % progression.length;
          setCurrentChordIndex(chordCycleRef.current);
        }
      }, stepMs);
    } else {
      stepIndexRef.current = 0;
      chordCycleRef.current = 0;
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, bpm, pattern, progression, playStrum]);

  // Clean audio state on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getStrumColor = (strum: string) => {
    switch (strum) {
      case 'D':
        return 'border-cyan-500/40 bg-cyan-500/20 text-cyan-400';
      case 'U':
        return 'border-amber-500/40 bg-amber-500/20 text-amber-400';
      case 'X':
        return 'border-rose-500/40 bg-rose-500/20 text-rose-400';
      default:
        return 'border-white/5 bg-[#05050A]/80 text-gray-600 hover:border-white/20';
    }
  };

  return (
    <PageLayout
      title="Strumming & Rhythm Workshop"
      subtitle="Master rhythm, construct interactive strumming grids, and listen to authentic acoustic guitar plucks in real time."
    >
      <div className="flex flex-col gap-10">
        {/* Playback Controls Panel */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayback}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${
                isPlaying
                  ? 'scale-105 border-rose-500 bg-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  : 'border-cyan-500 bg-cyan-500/10 text-cyan-400 hover:scale-105 active:scale-95'
              }`}
            >
              {isPlaying ? (
                <LuSquare className="size-5" />
              ) : (
                <LuPlay className="pl-0.5 size-5" />
              )}
            </button>

            <div>
              <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                Sequencer Engine
              </span>
              <p className="font-heading mt-0.5 text-sm font-bold text-white">
                {isPlaying ? 'Sequencer Active' : 'Sequencer Stopped'}
              </p>
            </div>
          </div>

          {/* Speed / BPM Control */}
          <div className="flex w-full max-w-xs flex-col gap-1 md:w-auto md:min-w-[200px]">
            <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
              <span>BPM Speed: {bpm}</span>
            </div>
            <input
              type="range"
              min="50"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-cyan-400"
            />
          </div>

          {/* Sound Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/2 text-gray-300 hover:bg-white/5 hover:text-white size-10"
            >
              {isMuted ? (
                <LuVolumeX className="text-rose-400 size-5" />
              ) : (
                <LuVolume2 className="text-cyan-400 size-5" />
              )}
            </button>
            <button
              onClick={clearPattern}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/2 text-gray-300 hover:bg-white/5 hover:text-white size-10"
              title="Clear sequencer pattern"
            >
              <LuRotateCcw className="size-5" />
            </button>
          </div>
        </div>

        {/* Step Sequencer Grid */}
        <div className="rounded-3xl border border-white/6 bg-[#080812]/50 p-6 backdrop-blur-2xl md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LuLayoutGrid className="text-cyan-400 size-4.5" />
              <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
                Interactive Strum Sequencer (8th Note Grid)
              </span>
            </div>
            <div className="hidden items-center gap-4 text-[10px] text-gray-500 sm:flex">
              <span className="flex items-center gap-1">
                <span className="rounded bg-cyan-400 size-2" /> Down (D)
              </span>
              <span className="flex items-center gap-1">
                <span className="rounded bg-amber-400 size-2" /> Up (U)
              </span>
              <span className="flex items-center gap-1">
                <span className="rounded bg-rose-400 size-2" /> Mute (X)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
            {pattern.map((strum, idx) => {
              const isActive = currentStep === idx;
              const isQuarterBeat = idx % 2 === 0;

              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  {/* Beat number label */}
                  <span className="text-[10px] font-black text-gray-600">
                    {isQuarterBeat ? `${idx / 2 + 1}` : '&'}
                  </span>

                  <button
                    onClick={() => handleStepClick(idx)}
                    className={`flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border text-lg font-black transition-all duration-200 active:scale-95 ${getStrumColor(strum)} ${
                      isActive
                        ? 'scale-105 shadow-[0_0_15px_rgba(34,211,238,0.3)] ring-2 ring-cyan-400'
                        : ''
                    }`}
                  >
                    {strum === '-' ? 'Rest' : strum}
                  </button>

                  {/* Active Playhead dot indicator */}
                  <div
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'scale-125 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                        : 'bg-transparent'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-center text-[10px] text-gray-500">
            💡 Click on individual beat blocks above to cycle:{' '}
            <strong className="text-cyan-400">Down (D)</strong> →{' '}
            <strong className="text-amber-400">Up (U)</strong> →{' '}
            <strong className="text-rose-400">Muted (X)</strong> →{' '}
            <strong className="text-gray-500">Rest</strong>
          </p>
        </div>

        {/* Preset & Chord Progression Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Preset Strumming Library */}
          <div className="space-y-4 rounded-3xl border border-white/4 bg-[#0A0A15]/60 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <LuListMusic className="text-cyan-400 size-4.5" />
              <h3 className="font-heading text-base font-black text-white">
                Preset Strumming Library
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => loadPreset(preset.pattern)}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/1 p-4 text-left transition-all hover:bg-white/5 hover:text-white"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-black text-white">
                      {preset.name}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {preset.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {preset.pattern.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-black ${
                          p === 'D'
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : p === 'U'
                              ? 'bg-amber-500/20 text-amber-400'
                              : p === 'X'
                                ? 'bg-rose-500/20 text-rose-400'
                                : 'bg-white/5 text-gray-600'
                        }`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chord Progression Chooser */}
          <div className="space-y-4 rounded-3xl border border-white/4 bg-[#0A0A15]/60 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <LuMusic className="text-cyan-400 size-4.5" />
              <h3 className="font-heading text-base font-black text-white">
                Chord Progression Harmony
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {CHORD_PROGRESSIONS.map((prog, idx) => {
                const isActiveProg =
                  progression.join('-') === prog.chords.join('-');
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setProgression(prog.chords);
                      chordCycleRef.current = 0;
                      setCurrentChordIndex(0);
                    }}
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                      isActiveProg
                        ? 'border-cyan-500/40 bg-cyan-500/10 text-white'
                        : 'border-white/5 bg-white/1 text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-black">{prog.name}</p>
                      <p className="text-[10px] text-gray-500">
                        Auto-advances to the next chord every 8 beats
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-black text-cyan-400">
                      {prog.chords.map((chord, cIdx) => (
                        <div
                          key={cIdx}
                          className={`flex items-center justify-center rounded-lg border px-2 py-1 transition-all ${
                            isActiveProg && currentChordIndex === cIdx
                              ? 'scale-105 border-cyan-400 bg-cyan-400/20 text-white shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                              : 'border-white/5 bg-black/40 text-gray-400'
                          }`}
                        >
                          {chord}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Educational Tutorial Card */}
        <div className="flex flex-col gap-6 rounded-3xl border border-white/4 bg-[#0A0A15]/30 p-6 md:p-8 lg:flex-row lg:items-center">
          <div className="flex shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 size-12">
            <LuCircleHelp className="size-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-heading text-sm font-bold text-white">
              Understanding Guitar Strumming Direction
            </h4>
            <p className="text-xs leading-relaxed text-gray-400">
              When playing guitar, maintaining a continuous down-and-up motion
              with your strumming arm is crucial for locking timing. As a rule
              of thumb, downbeats (
              <strong className="text-cyan-400">1, 2, 3, 4</strong>) are played
              with <strong className="text-cyan-400">Downstrums (D)</strong>,
              and upbeats (<strong className="text-amber-400">&</strong>) are
              played with{' '}
              <strong className="text-amber-400">Upstrums (U)</strong>. If a
              beat calls for a rest, keep your arm moving but miss the strings!
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
