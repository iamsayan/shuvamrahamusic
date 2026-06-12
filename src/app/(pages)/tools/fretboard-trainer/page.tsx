'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import PageLayout from '@/components/page-layout';

import {
  LuAward,
  LuCircleHelp,
  LuCompass,
  LuPlay,
  LuShuffle,
  LuSparkles,
  LuSquare,
  LuVolume2,
  LuVolumeX,
} from 'react-icons/lu';

// Standard 12 chromatic scale notes
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Tuning EADGBE
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

// Backing tracks progressions configuration
const JAM_TRACKS = [
  {
    name: '12-Bar Blues in A',
    bpm: 90,
    root: 'A',
    scale: 'Blues Scale',
    progression: [
      { chord: 'A7', duration: 4, formula: [0, 4, 7, 10], bassNote: 'A' },
      { chord: 'D7', duration: 4, formula: [5, 9, 0, 3], bassNote: 'D' },
      { chord: 'A7', duration: 4, formula: [0, 4, 7, 10], bassNote: 'A' },
      { chord: 'E7', duration: 2, formula: [7, 11, 2, 5], bassNote: 'E' },
      { chord: 'D7', duration: 2, formula: [5, 9, 0, 3], bassNote: 'D' },
    ],
  },
  {
    name: 'Pop Progression in C',
    bpm: 100,
    root: 'C',
    scale: 'Major (Ionian)',
    progression: [
      { chord: 'C Major', duration: 4, formula: [0, 4, 7], bassNote: 'C' },
      { chord: 'G Major', duration: 4, formula: [7, 11, 2], bassNote: 'G' },
      { chord: 'A Minor', duration: 4, formula: [9, 0, 4], bassNote: 'A' },
      { chord: 'F Major', duration: 4, formula: [5, 9, 0], bassNote: 'F' },
    ],
  },
  {
    name: 'Jazz II-V-I in D',
    bpm: 110,
    root: 'D',
    scale: 'Natural Minor (Aeolian)',
    progression: [
      {
        chord: 'E Minor 7',
        duration: 4,
        formula: [4, 7, 11, 2],
        bassNote: 'E',
      },
      {
        chord: 'A Dominant 7',
        duration: 4,
        formula: [9, 1, 4, 7],
        bassNote: 'A',
      },
      { chord: 'D Major 7', duration: 8, formula: [2, 6, 9, 0], bassNote: 'D' },
    ],
  },
];

function getNoteFrequency(noteName: string, octave: number): number {
  const noteIndex = NOTES.indexOf(noteName);
  const a4Index = NOTES.indexOf('A') + 4 * 12;
  const noteRelativeIndex = noteIndex + octave * 12;
  const halfStepsFromA4 = noteRelativeIndex - a4Index;
  return 440 * Math.pow(2, halfStepsFromA4 / 12);
}

export default function FretboardJamStudioPage() {
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz' | 'jam'>(
    'explore'
  );

  // AUDIO & CONTEXT STATE
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // EXPLORE STATE
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [exploreType, setExploreType] = useState<'chords' | 'scales'>('chords');
  const [selectedChord, setSelectedChord] = useState('Major');
  const [selectedScale, setSelectedScale] = useState('Major (Ionian)');

  // METRONOME STATE
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [pulse, setPulse] = useState(false);
  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const beatCountRef = useRef(0);

  // JAM STATE
  const [isJamActive, setIsJamActive] = useState(false);
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const jamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startJam = useCallback(() => {
    setCurrentChordIndex(0);
    setCurrentBeatIndex(0);
    setIsJamActive(true);
  }, []);

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

  const activeTrack = JAM_TRACKS[selectedTrackIdx];

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

  const playSynthesizedTone = useCallback(
    (
      frequency: number,
      type: 'sine' | 'triangle' | 'square' = 'triangle',
      duration = 1.0,
      volume = 0.3
    ) => {
      initAudio();
      if (isMuted || !audioContextRef.current) return;

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Exponential pluck volume envelope
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        volume,
        ctx.currentTime + 0.02
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration - 0.05
      );

      // Warm Low-pass decay
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(
        150,
        ctx.currentTime + duration * 0.5
      );

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    },
    [initAudio, isMuted]
  );

  // Plays a clean acoustic pluck for individual fret clicks
  const playCleanFretNote = useCallback(
    (noteName: string, octave: number) => {
      const frequency = getNoteFrequency(noteName, octave);
      playSynthesizedTone(frequency, 'triangle', 1.3, 0.3);
    },
    [playSynthesizedTone]
  );

  // Compute active notes under selection (explore mode OR backing loop scale)
  const highlightedNotes = useMemo(() => {
    if (activeTab === 'jam') {
      const rootIndex = NOTES.indexOf(activeTrack.root);
      const formula = SCALE_FORMULAS[activeTrack.scale] || [];
      return formula.map((interval) => NOTES[(rootIndex + interval) % 12]);
    }

    const rootIndex = NOTES.indexOf(selectedRoot);
    if (exploreType === 'chords') {
      const formula = CHORD_FORMULAS[selectedChord] || [];
      return formula.map((interval) => NOTES[(rootIndex + interval) % 12]);
    } else {
      const formula = SCALE_FORMULAS[selectedScale] || [];
      return formula.map((interval) => NOTES[(rootIndex + interval) % 12]);
    }
  }, [
    activeTab,
    activeTrack,
    selectedRoot,
    exploreType,
    selectedChord,
    selectedScale,
  ]);

  // Retrieve note details for any string index and fret number
  const getNoteDetails = useCallback((stringIndex: number, fret: number) => {
    const stringConfig = STRINGS[stringIndex];
    const noteIdx = (stringConfig.openIndex + fret) % 12;
    const noteName = NOTES[noteIdx];

    let octave = stringConfig.baseOctave;
    const startingIndex = NOTES.indexOf(stringConfig.note);
    if (startingIndex + fret >= 12) {
      octave += Math.floor((startingIndex + fret) / 12);
    }

    return { noteName, octave };
  }, []);

  // Generate note quiz targets
  const generateQuizPrompt = useCallback(() => {
    const randomString = Math.floor(Math.random() * 6);
    const randomFret = Math.floor(Math.random() * 16);
    const { noteName } = getNoteDetails(randomString, randomFret);

    setQuizPrompt({
      note: noteName,
      stringIndex: randomString,
    });
  }, [getNoteDetails]);

  // Start and reset quiz game state
  const startQuiz = useCallback(() => {
    setActiveTab('quiz');
    setIsJamActive(false);
    setIsMetronomeActive(false);
    setQuizScore(0);
    setQuizStreak(0);
    setQuizAttempts(0);
    setQuizFeedback({
      type: null,
      message: 'Locate the note prompted below on the virtual fretboard!',
    });
    generateQuizPrompt();
  }, [generateQuizPrompt]);

  const handleNoteClick = (stringIndex: number, fret: number) => {
    const { noteName, octave } = getNoteDetails(stringIndex, fret);
    playCleanFretNote(noteName, octave);

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

  // TAP TEMPO ACCUMULATOR
  const handleTapTempo = () => {
    const now = Date.now();
    const newTapTimes = [...tapTimes, now].filter((t) => now - t < 3000); // Filter taps older than 3 seconds
    setTapTimes(newTapTimes);

    if (newTapTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTapTimes.length; i++) {
        intervals.push(newTapTimes[i] - newTapTimes[i - 1]);
      }
      const avgInterval =
        intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const estimatedBpm = Math.round(60000 / avgInterval);
      if (estimatedBpm >= 40 && estimatedBpm <= 240) {
        setBpm(estimatedBpm);
      }
    }
  };

  // METRONOME LOOP EFFECT
  useEffect(() => {
    if (metronomeIntervalRef.current)
      clearInterval(metronomeIntervalRef.current);

    if (isMetronomeActive) {
      const intervalMs = (60 / bpm) * 1000;
      metronomeIntervalRef.current = setInterval(() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 80);

        // First beat click has higher pitch
        const frequency = beatCountRef.current % 4 === 0 ? 880 : 440;
        playSynthesizedTone(frequency, 'sine', 0.08, 0.25);

        beatCountRef.current += 1;
      }, intervalMs);
    }

    return () => {
      if (metronomeIntervalRef.current)
        clearInterval(metronomeIntervalRef.current);
    };
  }, [isMetronomeActive, bpm, playSynthesizedTone]);

  // JAM BACKING TRACK TRACK PLAYBACK EFFECT
  useEffect(() => {
    if (jamIntervalRef.current) clearInterval(jamIntervalRef.current);

    if (isJamActive) {
      const currentProgression = activeTrack.progression;
      const intervalMs = (60 / activeTrack.bpm) * 1000;

      let currentChordIdx = 0;
      let beatsRemaining = currentProgression[0].duration;
      let beatInChord = 0;

      jamIntervalRef.current = setInterval(() => {
        const activeChord = currentProgression[currentChordIdx];

        // Synthesize Bass notes corresponding to the progression chord in real-time
        const bassFreq = getNoteFrequency(activeChord.bassNote, 1);
        playSynthesizedTone(bassFreq, 'triangle', 0.6, 0.4);

        // Synthesize Chord pluck harmonies
        activeChord.formula.slice(0, 3).forEach((offset, idx) => {
          const chordFreq = getNoteFrequency(NOTES[offset % 12], 3);
          setTimeout(() => {
            playSynthesizedTone(chordFreq, 'sine', 0.8, 0.12);
          }, idx * 60);
        });

        // Advance beat index inside chord
        beatInChord += 1;
        setCurrentBeatIndex(beatInChord);
        beatsRemaining -= 1;

        if (beatsRemaining <= 0) {
          currentChordIdx = (currentChordIdx + 1) % currentProgression.length;
          const nextChord = currentProgression[currentChordIdx];
          beatsRemaining = nextChord.duration;
          beatInChord = 0;
          setCurrentChordIndex(currentChordIdx);
        }
      }, intervalMs);
    }

    return () => {
      if (jamIntervalRef.current) clearInterval(jamIntervalRef.current);
    };
  }, [isJamActive, activeTrack, playSynthesizedTone]);

  return (
    <PageLayout
      title="Jam Studio"
      subtitle="Practice improvisation, lock timing with the metronome, and play backing tracks with live scale note guidance."
    >
      <div className="flex flex-col gap-10">
        {/* Tab Selection Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab('explore');
                setIsJamActive(false);
                setIsMetronomeActive(false);
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'explore'
                  ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  : 'border border-white/5 bg-white/1 text-gray-400 hover:text-white'
              }`}
            >
              <LuCompass className="size-4.5" />
              Explore Chords & Scales
            </button>
            <button
              onClick={() => {
                setActiveTab('jam');
                setIsMetronomeActive(false);
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'jam'
                  ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  : 'border border-white/5 bg-white/1 text-gray-400 hover:text-white'
              }`}
            >
              <LuSparkles className="size-4.5" />
              Improv Jam Station
            </button>
            <button
              onClick={startQuiz}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'quiz'
                  ? 'border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'border border-white/5 bg-white/1 text-gray-400 hover:text-white'
              }`}
            >
              <LuCircleHelp className="size-4.5" />
              Fretboard Quiz Game
            </button>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center justify-center rounded-full border border-white/10 bg-white/2 text-gray-300 hover:bg-white/5 hover:text-white active:scale-95 size-9"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? (
              <LuVolumeX className="text-rose-400 size-4.5" />
            ) : (
              <LuVolume2 className="text-cyan-400 size-4.5" />
            )}
          </button>
        </div>

        {/* Tab 1: Explore Controls */}
        {activeTab === 'explore' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2.5 rounded-2xl border border-white/4 bg-[#0A0A15]/60 p-5">
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

            <div className="space-y-2.5 rounded-2xl border border-white/4 bg-[#0A0A15]/60 p-5">
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

            <div className="space-y-2.5 rounded-2xl border border-white/4 bg-[#0A0A15]/60 p-5">
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

        {/* Tab 2: Jam Station Control Deck */}
        {activeTab === 'jam' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Backing track selection card */}
            <div className="space-y-3 rounded-2xl border border-white/4 bg-[#0A0A15]/60 p-5">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Backing Loops
              </span>
              <div className="flex flex-col gap-2 pt-1">
                {JAM_TRACKS.map((track, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedTrackIdx(idx);
                      setIsJamActive(false);
                    }}
                    className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                      selectedTrackIdx === idx
                        ? 'border-cyan-500/40 bg-cyan-500/10 text-white'
                        : 'border-white/5 bg-white/0.5 text-gray-400 hover:bg-white/2 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold">{track.name}</p>
                    <p className="mt-0.5 text-[10px] text-gray-500">
                      Tempo: {track.bpm} BPM | Root: {track.root}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Backing loop controller */}
            <div className="flex flex-col justify-between rounded-2xl border border-cyan-500/10 bg-cyan-500/2 p-5">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                  Improv Backing Track
                </span>
                <h4 className="font-heading text-lg font-black text-white sm:text-xl">
                  {activeTrack.name}
                </h4>
                <p className="text-xs text-gray-400">
                  Scale visualizer:{' '}
                  <strong className="text-cyan-400">
                    {activeTrack.root} {activeTrack.scale}
                  </strong>
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                {isJamActive ? (
                  <button
                    onClick={() => setIsJamActive(false)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 text-xs font-black tracking-wider text-white uppercase shadow-md shadow-rose-500/10 transition-all hover:bg-rose-500 active:scale-95"
                  >
                    <LuSquare className="size-4.5" /> Stop Loop
                  </button>
                ) : (
                  <button
                    onClick={startJam}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-xs font-black tracking-wider text-white uppercase shadow-md shadow-cyan-500/10 transition-all hover:bg-cyan-400 active:scale-95"
                  >
                    <LuPlay className="size-4.5" /> Play Jam Loop
                  </button>
                )}
              </div>
            </div>

            {/* Active Chord monitor */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/4 bg-[#0A0A15]/60 p-5">
              <div className="text-center md:text-left">
                <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  Current Chord Harmony
                </span>
                {isJamActive ? (
                  <div className="mt-2">
                    <p className="font-heading text-2xl font-black text-white uppercase">
                      {activeTrack.progression[currentChordIndex]?.chord}
                    </p>
                    <p className="mt-1 text-xs text-cyan-400">
                      Bass:{' '}
                      {activeTrack.progression[currentChordIndex]?.bassNote} |
                      Beat: {currentBeatIndex}/
                      {activeTrack.progression[currentChordIndex]?.duration}
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-gray-500">
                    Press Play to start chord progression visual sync.
                  </p>
                )}
              </div>

              {/* Rhythmic beat visualizer rings */}
              {isJamActive && (
                <div className="mt-4 flex justify-center gap-2">
                  {Array.from({
                    length:
                      activeTrack.progression[currentChordIndex]?.duration || 4,
                  }).map((_, bIdx) => (
                    <div
                      key={bIdx}
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        currentBeatIndex - 1 === bIdx
                          ? 'scale-125 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Quiz Game Controls */}
        {activeTab === 'quiz' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-2 flex items-center justify-between rounded-2xl border border-amber-500/10 bg-amber-500/2 p-5">
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
                className="flex items-center justify-center rounded-full border border-white/10 bg-white/2 text-gray-300 hover:bg-white/5 hover:text-white size-9"
                title="Skip to next target"
              >
                <LuShuffle className="size-4.5" />
              </button>
            </div>

            <div className="flex items-center justify-around rounded-2xl border border-white/4 bg-[#0A0A15]/60 p-5">
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
                  <LuAward className="-mt-1 ml-0.5 inline text-amber-400 size-5" />
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Global Speed Metronome Section */}
        {activeTab !== 'quiz' && (
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/4 bg-[#0A0A15]/30 p-5 md:grid-cols-4">
            {/* Metronome status & controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsMetronomeActive(!isMetronomeActive);
                  setIsJamActive(false); // Stop Jam if metronome started
                }}
                className={`flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${
                  isMetronomeActive
                    ? 'scale-105 border-rose-500 bg-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'border-white/10 bg-white/2 text-gray-400 hover:text-white'
                }`}
              >
                <LuVolume2
                  className={`${isMetronomeActive ? 'animate-bounce' : ''} size-6`}
                />
              </button>
              <div>
                <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  Timing Metronome
                </span>
                <p className="font-heading mt-0.5 text-sm font-bold text-white">
                  {isMetronomeActive
                    ? 'Speed Click Playing'
                    : 'Metronome Muted'}
                </p>
              </div>
            </div>

            {/* Visual pulse ring */}
            <div className="flex items-center justify-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-700 ${
                  pulse
                    ? 'scale-110 border-cyan-400 bg-cyan-400/25 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'border-white/10 bg-white/1'
                }`}
              >
                <div className="rounded-full bg-white/40 size-2" />
              </div>
            </div>

            {/* Slider control */}
            <div className="flex flex-col justify-center gap-1.5 md:col-span-2">
              <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
                <span>Speed: {bpm} BPM</span>
                <button
                  onClick={handleTapTempo}
                  className="cursor-pointer rounded-full border border-white/5 bg-white/5 px-3 py-1 text-gray-300 transition-all hover:border-white/10 hover:text-white active:scale-95"
                >
                  Tap Tempo
                </button>
              </div>
              <input
                type="range"
                min="40"
                max="240"
                value={bpm}
                disabled={isJamActive} // Disable slider when backing loop dictates BPM
                onChange={(e) => setBpm(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-cyan-400 disabled:opacity-50"
              />
            </div>
          </div>
        )}

        {/* Fretboard interface */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Interactive 6-String Guitar Neck (Standard Tuning)
            </div>
            {activeTab !== 'quiz' && (
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/20 size-3.5" />
                Active Chord/Scale Notes
              </div>
            )}
          </div>

          <div className="scrollbar-hide relative overflow-x-auto rounded-3xl border border-white/6 bg-[#080812]/50 p-8 backdrop-blur-2xl">
            <div className="relative min-w-[850px] pt-4 pb-6">
              <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between border-r border-white/5 py-6 pr-6">
                {STRINGS.map((str, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center rounded-xl border border-white/5 bg-white/1 text-xs font-black text-cyan-400 shadow-sm size-10"
                  >
                    {str.note}
                  </div>
                ))}
              </div>

              <div className="ml-16 pr-4">
                <div className="flex justify-between pb-3 text-[10px] font-black text-gray-600">
                  {Array.from({ length: 16 }).map((_, f) => (
                    <div key={f} className="w-10 text-center select-none">
                      {f === 0 ? 'Open' : `Fret ${f}`}
                    </div>
                  ))}
                </div>

                <div className="relative flex flex-col gap-6">
                  <div className="pointer-events-none absolute inset-x-0 inset-y-0 flex flex-col justify-between py-5">
                    {STRINGS.map((_, i) => (
                      <div
                        key={i}
                        className="w-full border-t bg-gray-500 transition-shadow duration-300"
                        style={{
                          height: `${1 + (5 - i) * 0.4}px`,
                          borderColor: `rgba(255, 255, 255, ${0.1 + (5 - i) * 0.05})`,
                        }}
                      />
                    ))}
                  </div>

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
                            <div className="rounded-full bg-white/20 size-2.5" />
                          )}
                          {hasDoubleMarker && (
                            <>
                              <div className="rounded-full bg-white/20 size-2.5" />
                              <div className="rounded-full bg-white/20 size-2.5" />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {STRINGS.map((_, stringIdx) => (
                    <div
                      key={stringIdx}
                      className="relative z-10 flex h-10 items-center justify-between"
                    >
                      {Array.from({ length: 16 }).map((_, fretIdx) => {
                        const { noteName } = getNoteDetails(stringIdx, fretIdx);
                        const isHighlighted =
                          activeTab !== 'quiz' &&
                          highlightedNotes.includes(noteName);

                        const isRoot =
                          activeTab !== 'quiz' &&
                          noteName ===
                            (activeTab === 'jam'
                              ? activeTrack.root
                              : selectedRoot);

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
              <LuSparkles className="size-6" />
            </div>
            <div>
              <h4 className="font-heading mb-1 text-sm font-extrabold text-white sm:text-base">
                {activeTab === 'explore'
                  ? 'Fretboard Exploration Mode'
                  : activeTab === 'jam'
                    ? 'Jam Studio Mode'
                    : 'Quiz System Status'}
              </h4>
              <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                {activeTab === 'explore'
                  ? `Currently visualizing the ${selectedRoot} ${exploreType === 'chords' ? selectedChord : selectedScale} configuration. Click notes on strings to play and listen to their tones.`
                  : activeTab === 'jam'
                    ? `Play the jam loop to hear synthesized rhythm backings. Improvise using the highlighted notes for the ${activeTrack.root} ${activeTrack.scale} scale!`
                    : quizFeedback.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
