"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LuGlobe,
  LuMapPin,
  LuArrowLeft,
  LuExternalLink,
  LuShieldCheck,
} from "react-icons/lu";
import { Region, Plan, plans } from "@/lib/guitar-data";

export default function SecurePayPage() {
  const [region, setRegion] = useState<Region>("IN");
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);

  const currentPlans = plans[region];
  const activePlan = currentPlans[selectedPlanIdx];

  // Theme mapping for interactive styling
  const themeMap: Record<string, Record<string, string>> = {
    emerald: {
      btn: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500/30",
      text: "text-emerald-400",
    },
    amber: {
      btn: "bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] border-amber-500/30",
      text: "text-amber-400",
    },
    blue: {
      btn: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/30",
      text: "text-blue-400",
    },
    violet: {
      btn: "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] border-violet-500/30",
      text: "text-violet-400",
    },
  };

  const planTheme = themeMap[activePlan.theme] || themeMap.blue;

  // External gateway redirection link compiler
  const getPaymentLink = () => {
    if (activePlan.link) {
      return activePlan.link;
    }
    const message = `Hi Shuvam, I want to enroll in the "${activePlan.name}" (${activePlan.currency}${activePlan.price}${activePlan.period}). Please share the secure payment link!`;
    return `https://wa.me/918961369468?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="min-h-[90svh] bg-[#05050A] text-[#f0f0f5] pt-28 pb-16 relative overflow-hidden flex items-center justify-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-violet-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-5 flex flex-col items-center">
        
        {/* Back Link */}
        <Link
          href="/guitar-classes-with-shuvam"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-white transition-colors mb-6"
        >
          <LuArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to classes
        </Link>

        {/* Unified Card */}
        <div className="w-full relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col items-center text-center">
          
          {/* SSL Status */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full mb-6">
            <LuShieldCheck className="w-3.5 h-3.5" />
            SECURE PORTAL
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight mb-1 font-heading">
            Choose & Pay
          </h1>
          <p className="text-gray-400 text-xs mb-6 max-w-[280px]">
            Select your region and preferred coaching program below.
          </p>

          {/* Region Switcher */}
          <div className="relative flex p-1 rounded-full bg-white/[0.03] border border-white/5 w-full mb-5">
            <button
              onClick={() => {
                setRegion("IN");
                setSelectedPlanIdx(0);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                region === "IN" ? "bg-white/10 text-white shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              <LuMapPin className="w-3.5 h-3.5" />
              India
            </button>
            <button
              onClick={() => {
                setRegion("GLOBAL");
                setSelectedPlanIdx(0);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                region === "GLOBAL" ? "bg-white/10 text-white shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              <LuGlobe className="w-3.5 h-3.5" />
              Global
            </button>
          </div>

          {/* Plan Selection Buttons */}
          <div className="flex flex-col gap-2.5 w-full mb-6">
            {currentPlans.map((plan: Plan, idx: number) => {
              const isActive = selectedPlanIdx === idx;
              const theme = themeMap[plan.theme] || themeMap.blue;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPlanIdx(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                    isActive
                      ? `border-white/20 bg-white/5`
                      : "border-white/[0.04] bg-white/[0.005] hover:border-white/10 hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      isActive ? "border-cyan-400" : "border-gray-600"
                    }`}>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </div>
                    <span className="text-xs font-bold text-white font-heading">
                      {plan.name}
                    </span>
                  </div>
                  
                  <span className={`text-xs font-black font-heading ${isActive ? theme.text : "text-gray-400"}`}>
                    {plan.currency}
                    {plan.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pricing detail string */}
          <div className="border-t border-white/5 w-full pt-4 mb-6 flex flex-col items-center">
            <span className="text-gray-500 text-[10px] uppercase tracking-wider block font-heading mb-1">
              Total Fee
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className={`text-3xl font-black ${planTheme.text} font-heading`}>
                {activePlan.currency}
                {activePlan.price}
              </span>
              <span className="text-gray-400 text-xs font-semibold">
                {activePlan.period}
              </span>
            </div>
          </div>

          {/* Secure Redirection CTA */}
          <a
            href={getPaymentLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition-all duration-300 active:scale-[0.98] ${planTheme.btn} font-heading flex items-center justify-center gap-2`}
          >
            Pay Securely
            <LuExternalLink className="w-4 h-4" />
          </a>

          {/* Direct WhatsApp Support Helper link */}
          <span className="text-[10px] text-gray-500 mt-4 leading-relaxed">
            Need help?{" "}
            <a
              href={`https://wa.me/918961369468?text=${encodeURIComponent("Hi Shuvam, I need help with my classes payment.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors underline"
            >
              Chat on WhatsApp
            </a>
          </span>
        </div>
      </div>
    </main>
  );
}
