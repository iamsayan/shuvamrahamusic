'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import PageLayout from '@/components/page-layout';

import {
  LuAward,
  LuCircleHelp,
  LuCompass,
  LuShuffle,
  LuSparkles,
  LuVolume2,
  LuVolumeX,
} from 'react-icons/lu';

// Standard 12 chromatic scale notes
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Tuning frequencies corresponding to standard EADGBE strings
// 1st string (high E) -> E4
// 2nd string -> B3
// 3rd string -> G3
// 4th string -> D3
// 5th string -> A2
// 6th string (low E) -> E2
const STRINGS = [
  { note: 'E', name: '1st String (E)', openIndex: 4, baseOctave: 4 },
  { note: 'B', name: '2nd String (B)', openIndex: 11, baseOctave: 3 },
  { note: 'G', name: '3rd String (G)', openIndex: 7, baseOctave: 3 },
  { note: 'D', name: '4th String (D)', openIndex: 2, baseOctave: 3 },
  { note: 'A', name: '5th String (A)', openIndex: 9, baseOctave: 2 },
  { note: 'E', name: '6th String (E)', openIndex: 4, baseOctave: 2 },
];

const CHORD_FORMULAS: Record<string, number[]> = {
  Major: [0, 4, 7],
  Minor: [0, 3, 7],
  'Dominant 7th': [0, 4, 7, 10],
  'Major 7th': [0, 4, 7, 11],
  'Minor 7th': [0, 3, 7, 10],
  'Suspended 4th': [0, 5, 7],
};

const SCALE_FORMULAS: Record<string, number[]> = {
  'Major (Ionian)': [0, 2, 4, 5, 7, 9, 11],
  'Natural Minor (Aeolian)': [0, 2, 3, 5, 7, 8, 10],
  'Pentatonic Major': [0, 2, 4, 7, 9],
  'Pentatonic Minor': [0, 3, 5, 7, 10],
  'Blues Scale': [0, 3, 5, 6, 7, 10],
};

// Map notes to their frequencies (based on A4 = 440Hz)
function getNoteFrequency(noteName: string, octave: number): number {
  const noteIndex = NOTES.indexOf(noteName);
  const a4Index = NOTES.indexOf('A') + 4 * 12; // Octave 4 A
  const noteRelativeIndex = noteIndex + octave * 12;
  const halfStepsFromA4 = noteRelativeIndex - a4Index;
  return 440 * Math.pow(2, halfStepsFromA4 / 12);
}

export default function FretboardTrainerPage() {
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz'>('explore');

  // EXPLORE MODE STATE
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [exploreType, setExploreType] = useState<'chords' | 'scales'>('chords');
  const [selectedChord, setSelectedChord] = useState('Major');
  const [selectedScale, setSelectedScale] = useState('Major (Ionian)');

  // AUDIO STATE
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // QUIZ STATE
  const [quizPrompt, setQuizPrompt] = useState<{
    note: string;
    stringIndex: number;
  } | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: 'Find the note prompted above on the virtual fretboard!',
  });

  // Initialize Web Audio Context on first interaction
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

  // Synthesize clean acoustic guitar tone using standard oscillators
  const playNote = useCallback(
    (noteName: string, octave: number) => {
      initAudio();
      if (isMuted || !audioContextRef.current) return;

      // Resume context if suspended (browser security)
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const frequency = getNoteFrequency(noteName, octave);

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Combination of triangle and sine wave for warm pluck sound
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(frequency, ctx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime); // 1st harmonic (octave)

      // Pluck amplitude envelope
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      // Warm Low-pass filter decay
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.6);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1.stop(ctx.currentTime + 1.3);
      osc2.stop(ctx.currentTime + 1.3);
    },
    [initAudio, isMuted]
  );

  // Compute targeted active notes under selection (explore mode)
  const highlightedNotes = useMemo(() => {
    const rootIndex = NOTES.indexOf(selectedRoot);
    if (exploreType === 'chords') {
      const formula = CHORD_FORMULAS[selectedChord] || [];
      return formula.map((interval) => NOTES[(rootIndex + interval) % 12]);
    } else {
      const formula = SCALE_FORMULAS[selectedScale] || [];
      return formula.map((interval) => NOTES[(rootIndex + interval) % 12]);
    }
  }, [selectedRoot, exploreType, selectedChord, selectedScale]);

  // Retrieve note details for any given string index and fret number
  const getNoteDetails = useCallback((stringIndex: number, fret: number) => {
    const stringConfig = STRINGS[stringIndex];
    const noteIdx = (stringConfig.openIndex + fret) % 12;
    const noteName = NOTES[noteIdx];

    // Determine octave based on standard tuning layout
    let octave = stringConfig.baseOctave;
    const startingIndex = NOTES.indexOf(stringConfig.note);
    if (startingIndex + fret >= 12) {
      octave += Math.floor((startingIndex + fret) / 12);
    }

    return { noteName, octave };
  }, []);

  // Generate a new random note prompt for the quiz
  const generateQuizPrompt = useCallback(() => {
    const randomString = Math.floor(Math.random() * 6);
    const randomFret = Math.floor(Math.random() * 16); // 0 to 15 frets
    const { noteName } = getNoteDetails(randomString, randomFret);

    setQuizPrompt({
      note: noteName,
      stringIndex: randomString,
    });
  }, [getNoteDetails]);

  // Start and reset quiz game state safely via user interaction
  const startQuiz = useCallback(() => {
    setActiveTab('quiz');
    setQuizScore(0);
    setQuizStreak(0);
    setQuizAttempts(0);
    setQuizFeedback({
      type: null,
      message: 'Locate the note prompted below on the virtual fretboard!',
    });
    generateQuizPrompt();
  }, [generateQuizPrompt]);

  // Handle note click on the virtual fretboard
  const handleNoteClick = (stringIndex: number, fret: number) => {
    const { noteName, octave } = getNoteDetails(stringIndex, fret);
    playNote(noteName, octave);

    if (activeTab === 'quiz' && quizPrompt) {
      const isCorrectNote = quizPrompt.note === noteName;

      setQuizAttempts((prev) => prev + 1);

      if (isCorrectNote) {
        setQuizScore((prev) => prev + 1);
        setQuizStreak((prev) => prev + 1);
        setQuizFeedback({
          type: 'success',
          message: `Correct! You found ${noteName} on string ${stringIndex + 1}.`,
        });
        generateQuizPrompt();
      } else {
        setQuizStreak(0);
        setQuizFeedback({
          type: 'error',
          message: `Incorrect. That note is ${noteName}. Look for ${quizPrompt.note}!`,
        });
      }
    }
  };

  return (
    <PageLayout
      title="Fretboard Explorer"
      subtitle="Master notes, scales, and chord shapes on standard EADGBE guitar tuning with real-time sound feedback."
    >
      <div className="flex flex-col gap-10">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'explore'
                  ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  : 'border border-white/5 bg-white/[0.01] text-gray-400 hover:text-white'
              }`}
            >
              <LuCompass className="h-4.5 w-4.5" />
              Explore Chords & Scales
            </button>
            <button
              onClick={startQuiz}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'quiz'
                  ? 'border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'border border-white/5 bg-white/[0.01] text-gray-400 hover:text-white'
              }`}
            >
              <LuCircleHelp className="h-4.5 w-4.5" />
              Fretboard Quiz Game
            </button>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-300 hover:bg-white/5 hover:text-white active:scale-95"
            title={isMuted ? 'Unmute guitar sounds' : 'Mute guitar sounds'}
          >
            {isMuted ? (
              <LuVolumeX className="h-4.5 w-4.5 text-rose-400" />
            ) : (
              <LuVolume2 className="h-4.5 w-4.5 text-cyan-400" />
            )}
          </button>
        </div>

        {/* Tab 1: Explore Chords & Scales Controls */}
        {activeTab === 'explore' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Root Note Selector */}
            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Step 1: Root Tone
              </span>
              <div className="grid grid-cols-6 gap-1.5 pt-1.5">
                {NOTES.map((note) => (
                  <button
                    key={note}
                    onClick={() => setSelectedRoot(note)}
                    className={`cursor-pointer rounded-lg py-2 text-center text-xs font-bold transition-all duration-200 ${
                      selectedRoot === note
                        ? 'border border-cyan-500/40 bg-cyan-500/20 text-cyan-200'
                        : 'border border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Selector */}
            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Step 2: Mode selection
              </span>
              <div className="flex gap-2 pt-1.5">
                <button
                  onClick={() => setExploreType('chords')}
                  className={`flex-1 cursor-pointer rounded-xl border py-2.5 text-center text-xs font-black tracking-wider uppercase transition-all ${
                    exploreType === 'chords'
                      ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                      : 'border-white/5 text-gray-400 hover:border-white/15'
                  }`}
                >
                  Chord shapes
                </button>
                <button
                  onClick={() => setExploreType('scales')}
                  className={`flex-1 cursor-pointer rounded-xl border py-2.5 text-center text-xs font-black tracking-wider uppercase transition-all ${
                    exploreType === 'scales'
                      ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                      : 'border-white/5 text-gray-400 hover:border-white/15'
                  }`}
                >
                  Scales & Arpeggios
                </button>
              </div>
            </div>

            {/* Variation Selection Dropdown */}
            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Step 3: Variation details
              </span>
              <div className="pt-1.5">
                {exploreType === 'chords' ? (
                  <select
                    value={selectedChord}
                    onChange={(e) => setSelectedChord(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#080812] px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500/50"
                  >
                    {Object.keys(CHORD_FORMULAS).map((chord) => (
                      <option
                        key={chord}
                        value={chord}
                        className="bg-[#05050A]"
                      >
                        {chord} Chord
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={selectedScale}
                    onChange={(e) => setSelectedScale(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#080812] px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500/50"
                  >
                    {Object.keys(SCALE_FORMULAS).map((scale) => (
                      <option
                        key={scale}
                        value={scale}
                        className="bg-[#05050A]"
                      >
                        {scale} Scale
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Quiz Game Controls */}
        {activeTab === 'quiz' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Active Challenge Prompt */}
            <div className="col-span-2 flex items-center justify-between rounded-2xl border border-amber-500/10 bg-amber-500/[0.02] p-5">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-amber-400 uppercase">
                  ACTIVE CHALLENGE
                </span>
                <h4 className="font-heading text-lg font-black text-white sm:text-xl">
                  {quizPrompt ? (
                    <>
                      Locate{' '}
                      <span className="font-extrabold text-amber-400">
                        {quizPrompt.note}
                      </span>{' '}
                      anywhere on the fretboard
                    </>
                  ) : (
                    'Loading next target...'
                  )}
                </h4>
              </div>

              <button
                onClick={generateQuizPrompt}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-300 hover:bg-white/5 hover:text-white"
                title="Skip to next target"
              >
                <LuShuffle className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Scorecard statistics */}
            <div className="flex items-center justify-around rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <div className="text-center">
                <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase">
                  Score
                </span>
                <p className="font-heading text-2xl font-black text-white">
                  {quizScore}/{quizAttempts}
                </p>
              </div>
              <div className="h-8 w-px bg-white/5" />
              <div className="text-center">
                <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase">
                  Streak
                </span>
                <p className="font-heading text-2xl font-black text-amber-400">
                  {quizStreak}{' '}
                  <LuAward className="-mt-1 ml-0.5 inline h-5 w-5 text-amber-400" />
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fretboard Interface Wrapper */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Interactive 6-String Guitar Neck (Standard Tuning)
            </div>
            {activeTab === 'explore' && (
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="inline-block h-3.5 w-3.5 rounded-full border border-cyan-500/20 bg-cyan-500/20" />
                Active Chord/Scale Notes
              </div>
            )}
          </div>

          <div className="scrollbar-hide relative overflow-x-auto rounded-3xl border border-white/[0.06] bg-[#080812]/50 p-8 backdrop-blur-2xl">
            <div className="relative min-w-[850px] pt-4 pb-6">
              {/* String Tuning Identifiers Column (Left Side) */}
              <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between border-r border-white/5 py-6 pr-6">
                {STRINGS.map((str, idx) => (
                  <div
                    key={idx}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.01] text-xs font-black text-cyan-400 shadow-sm"
                  >
                    {str.note}
                  </div>
                ))}
              </div>

              {/* Fretboard Frame */}
              <div className="ml-16 pr-4">
                {/* Fret Numbers Header */}
                <div className="flex justify-between pb-3 text-[10px] font-black text-gray-600">
                  {Array.from({ length: 16 }).map((_, f) => (
                    <div key={f} className="w-10 text-center select-none">
                      {f === 0 ? 'Open' : `Fret ${f}`}
                    </div>
                  ))}
                </div>

                {/* Horizontal Strings Deck */}
                <div className="relative flex flex-col gap-6">
                  {/* Visual String wires */}
                  <div className="pointer-events-none absolute inset-x-0 inset-y-0 flex flex-col justify-between py-5">
                    {STRINGS.map((_, i) => (
                      <div
                        key={i}
                        className="w-full border-t bg-gray-500 transition-shadow duration-300"
                        style={{
                          height: `${1 + (5 - i) * 0.4}px`, // Thicker strings on bottom
                          borderColor: `rgba(255, 255, 255, ${0.1 + (5 - i) * 0.05})`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Fret Divider Lines */}
                  <div className="pointer-events-none absolute inset-x-0 inset-y-0 flex justify-between">
                    {Array.from({ length: 16 }).map((_, f) => (
                      <div
                        key={f}
                        className="h-full border-l border-white/10"
                        style={{
                          borderLeftWidth: f === 0 ? '0px' : '1.5px',
                        }}
                      />
                    ))}
                  </div>

                  {/* Fret Position Markers (Dots on frets 3, 5, 7, 9, 12, 15) */}
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
                    {Array.from({ length: 16 }).map((_, f) => {
                      const hasSingleMarker = [3, 5, 7, 9, 15].includes(f);
                      const hasDoubleMarker = f === 12;

                      return (
                        <div
                          key={f}
                          className="flex w-10 flex-col items-center justify-center gap-1"
                        >
                          {hasSingleMarker && (
                            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          )}
                          {hasDoubleMarker && (
                            <>
                              <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                              <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Clickable Note Elements Matrix */}
                  {STRINGS.map((_, stringIdx) => (
                    <div
                      key={stringIdx}
                      className="relative z-10 flex h-10 items-center justify-between"
                    >
                      {Array.from({ length: 16 }).map((_, fretIdx) => {
                        const { noteName } = getNoteDetails(stringIdx, fretIdx);
                        const isHighlighted =
                          activeTab === 'explore' &&
                          highlightedNotes.includes(noteName);

                        // Root note highlights
                        const isRoot =
                          activeTab === 'explore' && noteName === selectedRoot;

                        return (
                          <div
                            key={fretIdx}
                            className="flex w-10 items-center justify-center"
                          >
                            <button
                              onClick={() =>
                                handleNoteClick(stringIdx, fretIdx)
                              }
                              className={`flex h-8 w-8 transform cursor-pointer items-center justify-center rounded-full border text-[10px] font-black tracking-wide transition-all duration-300 active:scale-90 ${
                                isRoot
                                  ? 'scale-105 border-rose-400 bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                                  : isHighlighted
                                    ? 'border-cyan-400/40 bg-cyan-500/20 text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                                    : 'border-white/5 bg-[#05050A]/80 text-gray-500 hover:border-white/20 hover:bg-[#0E0E22]/90 hover:text-white'
                              }`}
                            >
                              {noteName}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Instructional Guides & Feedback Card */}
        <div className="rounded-2xl border border-white/5 bg-[#080812]/30 p-6">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                activeTab === 'quiz' && quizFeedback.type === 'error'
                  ? 'border-rose-500/20 bg-rose-500/10 text-rose-400'
                  : activeTab === 'quiz' && quizFeedback.type === 'success'
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                    : 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400'
              }`}
            >
              <LuSparkles className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-heading mb-1 text-sm font-extrabold text-white sm:text-base">
                {activeTab === 'explore'
                  ? 'Fretboard Exploration Mode'
                  : 'Quiz System Status'}
              </h4>
              <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                {activeTab === 'explore'
                  ? `Currently visualizing the ${selectedRoot} ${exploreType === 'chords' ? selectedChord : selectedScale} configuration. Click notes on strings to play and listen to their tones.`
                  : quizFeedback.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
