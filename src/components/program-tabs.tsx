"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LuStar,
  LuGraduationCap,
  LuShieldCheck,
  LuBadgeCheck,
  LuCircleCheck,
} from "react-icons/lu";
import { authorityPoints, curriculum, features } from "@/lib/guitar-data";

export default function ProgramTabs() {
  const [activeTab, setActiveTab] = useState<
    "instructor" | "curriculum" | "system"
  >("instructor");

  return (
    <div className="w-full flex flex-col items-center">
      {/* Segmented Control (Tabs) */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md mb-12 sm:mb-16">
        <button
          onClick={() => setActiveTab("instructor")}
          className={`px-5 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 flex items-center gap-2 ${
            activeTab === "instructor"
              ? "bg-rose-500/20 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)] border border-rose-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
          }`}
        >
          <LuStar className="w-4 h-4" /> Meet Your Coach
        </button>
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`px-5 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 flex items-center gap-2 ${
            activeTab === "curriculum"
              ? "bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.2)] border border-indigo-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
          }`}
        >
          <LuGraduationCap className="w-4 h-4" /> Curriculum
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`px-5 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 flex items-center gap-2 ${
            activeTab === "system"
              ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] border border-cyan-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
          }`}
        >
          <LuShieldCheck className="w-4 h-4" /> Learning System
        </button>
      </div>

      {/* Dynamic Background Glow based on Active Tab */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-colors duration-1000 overflow-hidden">
        {activeTab === "instructor" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-rose-600/5 blur-[150px] mix-blend-screen" />
        )}
        {activeTab === "curriculum" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-[150px] mix-blend-screen" />
        )}
        {activeTab === "system" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-600/5 blur-[150px] mix-blend-screen" />
        )}
      </div>

      {/* Tab Content */}
      <div className="relative w-full z-10">
        {/* TAB 1: INSTRUCTOR */}
        {activeTab === "instructor" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              <div className="w-full lg:w-5/12 flex justify-center">
                <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0f]">
                    <Image
                      src="/hero-guitarist.jpg"
                      alt="Shuvam Raha"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                      sizes="(max-width: 1024px) 380px, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/10 backdrop-blur-md mb-2">
                        <LuBadgeCheck className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wide">
                          Verified Instructor
                        </span>
                      </div>
                      <h3 className="text-3xl font-black text-white">
                        Shuvam Raha
                      </h3>
                      <p className="text-gray-300 font-medium">
                        Guitarist | Performer | Educator
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-7/12 flex flex-col">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center lg:text-left font-heading">
                  Why Learn From{" "}
                  <span className="text-rose-400">Shuvam Raha?</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {authorityPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] hover:border-white/10 transition-colors"
                    >
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${point.bg} border ${point.border} ${point.color}`}
                      >
                        <point.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl mb-1 font-heading">
                          {point.title}
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
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
        {activeTab === "curriculum" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 w-full">
              {curriculum.map((item, i) => (
                <div
                  key={i}
                  className={`group relative rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden p-6 sm:p-8 hover:bg-white/[0.04] transition-colors ${item.colSpan}`}
                >
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 ${item.styles.ambientGlow} blur-[60px] rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-100`}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`flex items-center justify-center w-14 h-14 rounded-2xl ${item.styles.iconBg} border ${item.styles.iconBorder} ${item.styles.iconText} shrink-0`}
                      >
                        <item.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white leading-tight font-heading">
                          {item.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm font-medium ${item.styles.iconText} mt-1 opacity-80`}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-3 mt-auto">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <LuCircleCheck
                            className={`w-5 h-5 ${item.styles.iconText} shrink-0 opacity-60 mt-0.5 group-hover:opacity-100 transition-opacity`}
                          />
                          <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center w-full px-5">
              <p className="text-gray-500 text-sm md:text-base text-center font-medium max-w-2xl bg-white/[0.02] border border-white/5 rounded-full py-3 px-6">
                <span className="text-red-400 mr-2">📌</span>
                From basics to advanced—everything you need to become a complete guitarist.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: LEARNING SYSTEM */}
        {activeTab === "system" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 font-heading">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm font-medium mt-1">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-4 flex-1">
                    {feature.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                        <LuCircleCheck className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-200 block sm:inline">
                            {point.t} —{" "}
                          </strong>
                          <span className="text-gray-400">
                            {point.d}
                          </span>
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
