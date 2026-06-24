'use client';

import { useState } from 'react';

import CoachImageSlider from '@/components/coach-image-slider';
import { authorityPoints, curriculum, features } from '@/lib/guitar-data';
import { GuitarClassesData } from '@/types';

import DynamicText from './dynamic-text';
import {
  LuBadgeCheck,
  LuCircleCheck,
  LuGraduationCap,
  LuShieldCheck,
  LuStar,
} from 'react-icons/lu';

interface ProgramTabsProps {
  classesData: GuitarClassesData;
}

export default function ProgramTabs({ classesData }: ProgramTabsProps) {
  const [activeTab, setActiveTab] = useState<
    'instructor' | 'curriculum' | 'system'
  >('instructor');

  return (
    <div className="flex w-full flex-col items-center">
      {/* Segmented Control (Tabs) */}
      <div className="mb-12 flex flex-wrap justify-center gap-2 rounded-3xl border border-white/10 bg-white/2 p-2 backdrop-blur-md sm:mb-16 sm:gap-4">
        <button
          onClick={() => setActiveTab('instructor')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 sm:px-8 sm:text-base ${
            activeTab === 'instructor'
              ? 'border border-rose-500/30 bg-rose-500/20 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
              : 'border border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LuStar className="size-4" /> Meet Your Coach
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 sm:px-8 sm:text-base ${
            activeTab === 'curriculum'
              ? 'border border-indigo-500/30 bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
              : 'border border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LuGraduationCap className="size-4" /> Curriculum
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 sm:px-8 sm:text-base ${
            activeTab === 'system'
              ? 'border border-cyan-500/30 bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
              : 'border border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LuShieldCheck className="size-4" /> Learning System
        </button>
      </div>

      {/* Dynamic Background Glow based on Active Tab */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-colors duration-1000">
        {activeTab === 'instructor' && (
          <div className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/5 mix-blend-screen blur-[150px]" />
        )}
        {activeTab === 'curriculum' && (
          <div className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/5 mix-blend-screen blur-[150px]" />
        )}
        {activeTab === 'system' && (
          <div className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/5 mix-blend-screen blur-[150px]" />
        )}
      </div>

      {/* Tab Content */}
      <div className="relative z-10 w-full">
        {/* TAB 1: INSTRUCTOR */}
        {activeTab === 'instructor' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
              <div className="flex w-full justify-center lg:w-5/12">
                <div className="group relative aspect-4/5 w-full max-w-[480px] rounded-[2rem] border border-white/10 bg-white/2 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-3xl lg:max-w-full">
                  <div className="relative size-full overflow-hidden rounded-2xl bg-[#0a0a0f]">
                    <CoachImageSlider images={classesData.coach_images} />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#05050A] via-[#05050A]/20 to-transparent" />
                    <div className="absolute right-6 bottom-6 left-6">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                        <LuBadgeCheck className="size-4 text-blue-400" />
                        <span className="text-xs font-bold tracking-wide text-white uppercase sm:text-sm">
                          Verified Instructor
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white sm:text-3xl">
                        Shuvam Raha
                      </h3>
                      <p className="text-sm font-medium text-gray-300 sm:text-base">
                        Guitarist | Performer | Educator
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col lg:w-7/12">
                <h3 className="font-heading mb-8 text-center text-2xl font-bold text-white sm:text-3xl lg:text-left">
                  Why Learn From{' '}
                  <span className="text-rose-400">Shuvam Raha?</span>
                </h3>
                <div className="flex flex-col gap-4">
                  {authorityPoints.map((point, idx) => {
                    const Icon = point.icon;
                    return (
                      <div
                        key={idx}
                        className={`group relative flex flex-col gap-4 overflow-hidden rounded-[1.8rem] border border-white/5 bg-[#0C0C16]/50 p-5 shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#0E0E22]/80 hover:shadow-2xl sm:flex-row sm:items-start sm:gap-6 ${idx === 0 ? 'hover:border-rose-500/30' : ''} ${idx === 1 ? 'hover:border-amber-500/30' : ''} ${idx === 2 ? 'hover:border-emerald-500/30' : ''} ${idx === 3 ? 'hover:border-violet-500/30' : ''} `}
                      >
                        {/* Huge high-tech serial number on left */}
                        <div
                          className={`font-heading w-10 shrink-0 text-3xl font-black tracking-tight opacity-25 transition-all duration-500 select-none group-hover:scale-110 group-hover:opacity-100 sm:mt-0.5 sm:w-12 sm:text-4xl ${idx === 0 ? 'text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]' : ''} ${idx === 1 ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]' : ''} ${idx === 2 ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]' : ''} ${idx === 3 ? 'text-violet-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]' : ''} `}
                        >
                          0{idx + 1}
                        </div>

                        {/* Styled Icon Wrapper */}
                        <div
                          className={`flex size-12 shrink-0 items-center justify-center rounded-xl border ${point.border} ${point.bg} ${point.color} shadow-sm transition-transform duration-500 group-hover:scale-105 sm:mt-0.5`}
                        >
                          <Icon className="size-6" />
                        </div>

                        {/* Title and Description */}
                        <div className="flex-1 space-y-1 text-left">
                          <h4 className="font-heading text-base font-extrabold text-white transition-colors duration-300">
                            <DynamicText text={point.title} />
                          </h4>
                          <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                            {point.desc}
                          </p>
                        </div>

                        {/* Dynamic glow element on hover matching point theme color */}
                        <div
                          className={`pointer-events-none absolute -right-12 -bottom-12 size-32 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100 ${idx === 0 ? 'bg-rose-500/10' : ''} ${idx === 1 ? 'bg-amber-500/10' : ''} ${idx === 2 ? 'bg-emerald-500/10' : ''} ${idx === 3 ? 'bg-violet-500/10' : ''} `}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Interactive learning roadmap tracker (Sticky) */}
              <div className="space-y-6 lg:sticky lg:top-28 lg:col-span-4 lg:h-fit lg:self-start">
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0C0C16]/60 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-indigo-500/20 md:p-8">
                  {/* Subtle background glow */}
                  <div className="pointer-events-none absolute -top-12 -left-12 size-40 rounded-full bg-indigo-500/10 blur-[60px]" />
                  <div className="pointer-events-none absolute -right-12 -bottom-12 size-40 rounded-full bg-blue-500/10 blur-[60px]" />

                  <div className="relative z-10 space-y-6">
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">
                        Roadmap Overview
                      </span>
                      <h3 className="font-heading mt-1 text-xl font-bold text-white sm:text-2xl">
                        Your Learning Path
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-400">
                        A logically structured syllabus designed to transform
                        you from absolute zero to a confident, independent
                        guitar player.
                      </p>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="relative pl-6 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-0.5 before:bg-linear-to-b before:from-emerald-500 before:via-blue-500 before:to-rose-500/30">
                      {curriculum.map((item, idx) => (
                        <div
                          key={idx}
                          className="group/step relative mb-6 last:mb-0"
                        >
                          {/* Indicator Dot */}
                          <div
                            className={`absolute top-1 -left-6.5 size-3 rounded-full border border-[#05050A] transition-all duration-300 group-hover/step:scale-125 ${
                              idx === 0
                                ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                                : ''
                            } ${
                              idx === 1
                                ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                                : ''
                            } ${
                              idx === 2
                                ? 'bg-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                                : ''
                            } ${
                              idx === 3
                                ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                                : ''
                            } ${
                              idx === 4
                                ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                                : ''
                            } `}
                          />

                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase transition-colors duration-300 group-hover/step:text-indigo-400">
                              Phase 0{idx + 1}
                            </span>
                            <span className="text-xs font-bold text-white transition-colors duration-300 group-hover/step:text-white sm:text-sm">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Redesigned Asymmetric Glassmorphic Curriculum Cards */}
              {/* Right Column: Redesigned Asymmetric Glassmorphic Curriculum Cards */}
              <div className="space-y-4 lg:col-span-8">
                {curriculum.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/2 p-5 backdrop-blur-3xl transition-colors hover:bg-white/4 sm:p-6"
                    >
                      <div
                        className={`absolute top-0 right-0 ${item.styles.ambientGlow} size-40 rounded-full opacity-0 blur-[60px] transition-transform duration-700 group-hover:scale-150 group-hover:opacity-100`}
                      />
                      <div className="relative z-10 flex h-full flex-col">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border ${item.styles.iconBorder} ${item.styles.iconBg} ${item.styles.iconText} transition-transform duration-500 group-hover:scale-110`}
                            >
                              <Icon className="size-7" />
                            </div>
                            <div>
                              <span
                                className={`text-[10px] font-black tracking-widest ${item.styles.iconText} mt-1 uppercase opacity-80`}
                              >
                                Phase 0{i + 1} • {item.subtitle}
                              </span>
                              <h3 className="font-heading text-xl leading-tight font-bold text-white sm:text-2xl">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                          <div className="self-start rounded-full border border-white/5 bg-white/2 px-3 py-1 text-[10px] font-bold text-gray-400 backdrop-blur-md transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/5 group-hover:text-white sm:self-center">
                            Curriculum Module
                          </div>
                        </div>

                        <div className="mt-4 border-t border-white/5 pt-4">
                          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3">
                            {item.points.map((point, idx) => (
                              <li
                                key={idx}
                                className="group/item flex items-center gap-3 rounded-xl border border-transparent p-0.5 transition-all duration-300 hover:translate-x-1 hover:border-white/2 hover:bg-white/1"
                              >
                                <div
                                  className={`flex size-5.5 shrink-0 items-center justify-center rounded-lg border ${item.styles.iconBorder} ${item.styles.iconBg} ${item.styles.iconText} shadow-sm transition-transform duration-300 group-hover/item:scale-110`}
                                >
                                  <LuCircleCheck className="size-3.5" />
                                </div>
                                <span className="text-xs text-gray-300 transition-colors group-hover/item:text-white sm:text-sm">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-12 flex w-full justify-center px-5">
              <p className="max-w-2xl rounded-full border border-white/5 bg-white/2 px-6 py-3 text-center text-sm font-medium text-gray-500 md:text-base">
                <span className="mr-2 text-red-400">📌</span>
                From basics to advanced—everything you need to become a complete
                guitarist.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: LEARNING SYSTEM */}
        {activeTab === 'system' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                const badges = [
                  'Support',
                  'Resources',
                  'Certification',
                  'Community',
                ];
                return (
                  <div
                    key={idx}
                    className={`group relative flex flex-col overflow-hidden rounded-[1.8rem] border border-l-4 border-white/10 bg-white/2 p-5 backdrop-blur-3xl transition-all duration-500 hover:bg-white/4 ${idx === 0 ? 'border-l-cyan-500/80 hover:border-cyan-500/30' : ''} ${idx === 1 ? 'border-l-indigo-500/80 hover:border-indigo-500/30' : ''} ${idx === 2 ? 'border-l-emerald-500/80 hover:border-emerald-500/30' : ''} ${idx === 3 ? 'border-l-violet-500/80 hover:border-violet-500/30' : ''} `}
                  >
                    {/* Ambient Glow */}
                    <div
                      className={`pointer-events-none absolute -right-16 -bottom-16 size-48 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 ${idx === 0 ? 'bg-cyan-500/10' : ''} ${idx === 1 ? 'bg-indigo-500/10' : ''} ${idx === 2 ? 'bg-emerald-500/10' : ''} ${idx === 3 ? 'bg-violet-500/10' : ''} `}
                    />

                    {/* Header */}
                    <div className="relative z-10 mb-4 flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${idx === 0 ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400' : ''} ${idx === 1 ? 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400' : ''} ${idx === 2 ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : ''} ${idx === 3 ? 'border-violet-500/20 bg-violet-500/10 text-violet-400' : ''} `}
                        >
                          <Icon className="size-5.5" />
                        </div>
                        <div>
                          <span
                            className={`text-[9px] font-black tracking-widest uppercase opacity-85 ${idx === 0 ? 'text-cyan-400' : ''} ${idx === 1 ? 'text-indigo-400' : ''} ${idx === 2 ? 'text-emerald-400' : ''} ${idx === 3 ? 'text-violet-400' : ''} `}
                          >
                            System Module 0{idx + 1}
                          </span>
                          <h3 className="font-heading text-lg leading-tight font-bold text-white sm:text-xl">
                            {feature.title}
                          </h3>
                        </div>
                      </div>
                      <div className="self-start rounded-full border border-white/5 bg-white/2 px-2.5 py-0.5 text-[9px] font-bold text-gray-400 backdrop-blur-md transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/5 group-hover:text-white sm:self-center">
                        {badges[idx]}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="relative z-10 mb-4 text-xs leading-relaxed font-medium text-gray-400">
                      {feature.desc}
                    </p>

                    {/* Points list */}
                    <ul className="relative z-10 flex flex-1 flex-col gap-2">
                      {feature.points.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="group/item flex items-start gap-3 rounded-xl border border-transparent p-0.5 transition-all duration-300 hover:translate-x-1 hover:border-white/2 hover:bg-white/1"
                        >
                          <div
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border shadow-sm transition-transform duration-300 group-hover/item:scale-110 ${idx === 0 ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400' : ''} ${idx === 1 ? 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400' : ''} ${idx === 2 ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : ''} ${idx === 3 ? 'border-violet-500/20 bg-violet-500/10 text-violet-400' : ''} `}
                          >
                            <LuCircleCheck className="size-3" />
                          </div>
                          <div className="text-xs sm:text-sm">
                            <strong className="block font-extrabold text-white sm:inline">
                              {point.t} —{' '}
                            </strong>
                            <span className="text-gray-400 transition-colors group-hover/item:text-gray-300">
                              {point.d}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
