"use client";

import { useState } from "react";
import {
  LuCheck,
  LuTriangleAlert,
  LuSparkles,
  LuGlobe,
  LuMapPin,
} from "react-icons/lu";
import { Region, Plan, plans } from "@/lib/guitar-data";

export default function PricingTable() {
  const [region, setRegion] = useState<Region>("GLOBAL");

  // Tailwind purge-safe theme mappings
  const themeMap: Record<string, Record<string, string>> = {
    emerald: {
      card: "border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/40 hover:bg-emerald-900/10 shadow-[0_0_30px_rgba(16,185,129,0.02)]",
      glow: "bg-emerald-500/10",
      button:
        "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      icon: "text-emerald-400 bg-emerald-500/20",
      text: "text-emerald-400",
      price: "text-white",
    },
    amber: {
      card: "border-amber-500/20 bg-amber-950/10 hover:border-amber-500/40 hover:bg-amber-900/10 shadow-[0_0_30px_rgba(245,158,11,0.02)]",
      glow: "bg-amber-500/10",
      button:
        "bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]",
      icon: "text-amber-400 bg-amber-500/20",
      text: "text-amber-400",
      price: "text-white",
    },
    blue: {
      card: "border-blue-500/40 bg-blue-900/20 hover:border-blue-400/60 hover:bg-blue-900/30 shadow-[0_0_50px_rgba(59,130,246,0.15)]",
      glow: "bg-blue-500/20",
      button:
        "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]",
      icon: "text-blue-400 bg-blue-500/20",
      text: "text-blue-400",
      price:
        "text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200",
    },
    violet: {
      card: "border-violet-500/20 bg-violet-950/10 hover:border-violet-500/40 hover:bg-violet-900/10 shadow-[0_0_30px_rgba(139,92,246,0.02)]",
      glow: "bg-violet-500/10",
      button:
        "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]",
      icon: "text-violet-400 bg-violet-500/20",
      text: "text-violet-400",
      price: "text-white",
    },
  };

  const currentPlans = plans[region];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive Geo-Toggle Switch */}
      <div className="w-full sm:w-auto mt-2 mb-12">
        <div className="relative flex p-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-xl shadow-2xl w-full sm:w-[360px] mx-auto">
          {/* Sliding Active Background */}
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/10 border border-white/10 rounded-full transition-transform duration-500 ease-out shadow-lg ${
              region === "IN" ? "translate-x-0" : "translate-x-[100%]"
            }`}
          />

          <button
            onClick={() => setRegion("IN")}
            className={`flex-1 relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-full text-sm font-bold transition-colors duration-300 ${
              region === "IN"
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <LuMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            India (INR)
          </button>

          <button
            onClick={() => setRegion("GLOBAL")}
            className={`flex-1 relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-full text-sm font-bold transition-colors duration-300 ${
              region === "GLOBAL"
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <LuGlobe className="w-4 h-4 sm:w-5 sm:h-5" />
            Global (USD)
          </button>
        </div>
      </div>

      {/* Pricing Dashboard */}
      <div className="w-full max-w-5xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden shadow-2xl relative group z-10">
        {/* Ambient Corner Glows (Dynamic based on selected plans) */}
        <div
          className={`absolute top-0 left-0 w-64 h-64 blur-[100px] rounded-full opacity-30 pointer-events-none transition-colors duration-700 ${themeMap[currentPlans[0].theme].glow}`}
        />
        <div
          className={`absolute bottom-0 right-0 w-64 h-64 blur-[100px] rounded-full opacity-30 pointer-events-none transition-colors duration-700 ${themeMap[currentPlans[1].theme].glow}`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
          {currentPlans.map((plan: Plan, i: number) => {
            const styles = themeMap[plan.theme];
            const isFirst = i === 0;

            return (
              <div
                key={`${region}-${i}`}
                className={`relative flex flex-col p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:bg-white/[0.02] ${
                  isFirst ? "border-b md:border-b-0 md:border-r border-white/5" : ""
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-6 sm:right-10 -translate-y-1/2 md:-translate-y-0 md:top-6 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                      <LuSparkles className="w-3 h-3 text-white" />
                      <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 ${styles.text} font-heading`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${styles.price} font-heading`}>
                      {plan.currency}
                      {plan.price}
                    </span>
                    <span className="text-gray-400 font-medium text-sm sm:text-base">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Warning / Conditional Banner */}
                {plan.warning && (
                  <div className="flex items-start gap-2.5 p-3 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90">
                    <LuTriangleAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm font-medium leading-snug">
                      {plan.warning}
                    </p>
                  </div>
                )}

                {/* Features List */}
                <div className="flex-1 flex flex-col mb-8">
                  <span className="text-white text-sm font-bold mb-4 tracking-wide font-heading">
                    Includes:
                  </span>
                  <ul className="flex flex-col gap-3">
                    {plan.includes.map((feature: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-300 group/li"
                      >
                        <div
                          className={`flex items-center justify-center shrink-0 w-5 h-5 rounded-full ${styles.icon} transition-transform duration-300 group-hover/li:scale-110`}
                        >
                          <LuCheck className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Blocks (Best For & CTA) */}
                <div className="mt-auto flex flex-col gap-4">
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-0.5">
                      Best for
                    </span>
                    <span className="text-gray-300 font-medium text-xs sm:text-sm">
                      {plan.bestFor}
                    </span>
                  </div>

                  <button
                    className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-300 active:scale-[0.98] ${styles.button} font-heading`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Geographic & Availability Notices Deck */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mx-auto px-4 z-10">
        {/* Card 1: Residence Policy */}
        <div className="relative group/note flex gap-4 p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-xl hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-cyan-500/[0.01] group-hover/note:bg-cyan-500/[0.02] opacity-0 group-hover/note:opacity-100 blur-xl transition-all duration-500 pointer-events-none" />
          <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover/note:scale-105 transition-transform duration-300">
            <LuGlobe className="w-5 h-5" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block font-heading">
              Residence Policy
            </span>
            <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed font-heading">
              Pricing is structurally based on your country of residence (not payment method).
            </p>
          </div>
        </div>

        {/* Card 2: Slots Notice */}
        <div className="relative group/note flex gap-4 p-5 rounded-2xl border border-amber-500/10 bg-amber-500/[0.02] backdrop-blur-xl hover:border-amber-500/20 hover:bg-amber-500/[0.04] transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-amber-500/[0.01] group-hover/note:bg-amber-500/[0.02] opacity-0 group-hover/note:opacity-100 blur-xl transition-all duration-500 pointer-events-none" />
          <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover/note:scale-105 transition-transform duration-300">
            <LuTriangleAlert className="w-5 h-5" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block font-heading">
              Availability
            </span>
            <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed font-heading">
              Limited slots available—
              <span className="block mt-0.5">priority for serious students.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
