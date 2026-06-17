'use client';

import { useState } from 'react';

import CoachImageSlider from '@/components/coach-image-slider';
import { authorityPoints, curriculum, features } from '@/lib/guitar-data';
import { GuitarClassesData } from '@/types';

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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {authorityPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/2 p-5 backdrop-blur-md transition-colors hover:border-white/10 hover:bg-white/5"
                    >
                      <div
                        className={`flex shrink-0 items-center justify-center rounded-xl ${point.bg} border ${point.border} ${point.color} size-12`}
                      >
                        <point.icon className="size-6" />
                      </div>
                      <div>
                        <h4 className="font-heading mb-1 text-lg font-bold text-white sm:text-xl">
                          {point.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-6">
              {curriculum.map((item, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/2 p-6 backdrop-blur-3xl transition-colors hover:bg-white/4 sm:p-8 ${item.colSpan}`}
                >
                  <div
                    className={`absolute top-0 right-0 ${item.styles.ambientGlow} size-40 rounded-full opacity-0 blur-[60px] transition-transform duration-700 group-hover:scale-150 group-hover:opacity-100`}
                  />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center rounded-2xl ${item.styles.iconBg} border ${item.styles.iconBorder} ${item.styles.iconText} size-14 shrink-0`}
                      >
                        <item.icon className="size-7" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg leading-tight font-bold text-white sm:text-xl">
                          {item.title}
                        </h3>
                        <p
                          className={`text-xs font-medium sm:text-sm ${item.styles.iconText} mt-1 opacity-80`}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-auto flex flex-col gap-3">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <LuCircleCheck
                            className={`${item.styles.iconText} mt-0.5 size-5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100`}
                          />
                          <span className="text-xs text-gray-300 transition-colors group-hover:text-white sm:text-sm">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
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
            <div className="mb-8 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded-[2rem] border border-white/10 bg-white/2 p-6 backdrop-blur-3xl transition-colors hover:bg-white/4 sm:p-8"
                >
                  <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                      <feature.icon className="size-7" />
                    </div>
                    <div>
                      <h3 className="font-heading mb-1 text-lg font-bold text-white sm:text-xl">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-gray-400 sm:text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-1 flex-col gap-4">
                    {feature.points.map((point, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-3 text-xs sm:text-sm"
                      >
                        <LuCircleCheck className="mt-0.5 size-5 shrink-0 text-cyan-500" />
                        <div>
                          <strong className="block text-gray-200 sm:inline">
                            {point.t} —{' '}
                          </strong>
                          <span className="text-gray-400">{point.d}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
