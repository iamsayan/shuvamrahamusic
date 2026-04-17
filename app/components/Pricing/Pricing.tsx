"use client";

import React, { useState } from "react";
import {
  Check,
  AlertTriangle,
  Sparkles,
  Globe,
  MapPin,
  CreditCard,
} from "lucide-react";

type Region = "IN" | "GLOBAL";

export default function Pricing() {
  const [region, setRegion] = useState<Region>("GLOBAL");

  // Plan Data Structure
  const plans = {
    IN: [
      {
        name: "Starter Online Plan",
        price: "1500",
        currency: "₹",
        period: "/month",
        description: "Simple, structured guitar coaching based on your goals.",
        includes: [
          "4 sessions/month (40 mins each)",
          "Fixed weekly schedule",
          "Beginner → Intermediate roadmap",
          "Limited WhatsApp / Email support",
        ],
        warning: null,
        bestFor: "Students in India (school/college)",
        buttonText: "Book Free Intro Call",
        theme: "emerald",
        popular: true,
      },
      {
        name: "Offline Coaching (Studio)",
        price: "2000",
        currency: "₹",
        period: "/month",
        description:
          "Physical presence, real-time correction & better progress.",
        includes: [
          "4 sessions/month",
          "Hands-on training (faster learning)",
          "Real-time correction",
          "Personal attention",
        ],
        //warning: "Limited slots available—priority for serious students.",
        bestFor: "Serious learners / kids / parents",
        buttonText: "Check Available Slots",
        theme: "amber",
      },
    ],
    GLOBAL: [
      {
        name: "Global Guitar Program",
        price: "49",
        currency: "$",
        period: "/month",
        description:
          "Song-based learning with flexible scheduling across time zones.",
        includes: [
          "4 sessions/month (flexible across time zones)",
          "Learn English songs",
          "Hindi/Bengali support",
          "Structured 30-day roadmap",
          "Priority WhatsApp support",
          "Flexible scheduling",
        ],
        warning: null,
        bestFor: "International students & working professionals",
        buttonText: "Join Global Program",
        theme: "blue",
        popular: true,
      },
      {
        name: "Pro Guitar Coaching",
        price: "99",
        currency: "$",
        period: "/month",
        description:
          "VIP fast-track progression with a fully customized learning path.",
        includes: [
          "8 sessions/month",
          "Fast-track progress plan",
          "Personal mentoring",
          "Performance & confidence training",
          "Weekly progress tracking",
          "Direct WhatsApp access",
        ],
        warning: null,
        bestFor: "Serious learners who want fast results",
        buttonText: "Apply for Pro Coaching",
        theme: "violet",
      },
    ],
  };

  // Tailwind purge-safe theme mappings
  const themeMap: Record<string, any> = {
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
    <section
      className="relative w-full py-24 px-5 md:px-12 lg:px-20 overflow-visible bg-[#05050A]"
      id="pricing"
    >
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-cyan-600/5 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* === Header & Geo-Toggle === */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">
              Simple Pricing
            </span>
          </div>

          <h2 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-extrabold tracking-tight text-white mb-6 leading-none">
            Choose Your <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Learning Plan
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            No confusion. Just structured guitar coaching based on your goals
            and local country exactly where you are.
          </p>

          {/* Interactive Geo-Toggle Switch */}
          <div className="flex justify-center mt-10 w-full">
            <div className="relative flex p-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-xl shadow-2xl w-full max-w-[340px] sm:max-w-[420px]">
              {/* Sliding Active Background */}
              <div
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/10 border border-white/10 rounded-full transition-transform duration-500 ease-out shadow-lg ${
                  region === "IN" ? "translate-x-0" : "translate-x-[100%]"
                }`}
              />

              <button
                onClick={() => setRegion("IN")}
                className={`flex-1 relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-colors duration-300 ${
                  region === "IN"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                India (INR)
              </button>

              <button
                onClick={() => setRegion("GLOBAL")}
                className={`flex-1 relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-colors duration-300 ${
                  region === "GLOBAL"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                Global (USD)
              </button>
            </div>
          </div>
        </div>

        {/* === 2-Column Pricing Matrix === */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 lg:gap-12 w-full max-w-5xl mx-auto mt-20 relative">
          {currentPlans.map((plan: any, i: number) => {
            const styles = themeMap[plan.theme];

            return (
              <div
                key={`${region}-${i}`}
                className={`group relative w-full md:w-1/2 flex flex-col rounded-[2.5rem] border backdrop-blur-3xl overflow-visible p-8 md:p-10 transition-all duration-500 ${styles.card} animate-in fade-in slide-in-from-bottom-8 ${plan.popular ? "scale-100 md:scale-[1.03] lg:scale-105 z-30" : "z-10"}`}
                style={{
                  animationFillMode: "both",
                  animationDelay: `${i * 150}ms`,
                }}
              >
                {/* Popular Badge Focus */}
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <div className="relative flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}

                {/* Internal Card Ambient Glow */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full opacity-50 pointer-events-none transition-all duration-700 group-hover:scale-150 ${styles.glow}`}
                />

                {/* Plan Header */}
                <div className="relative z-10 mb-8 border-b border-white/5 pb-8">
                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-4 ${styles.text}`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span
                      className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${styles.price}`}
                    >
                      {plan.currency}
                      {plan.price}
                    </span>
                    <span className="text-gray-400 font-medium text-lg">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Warning / Conditional Banner */}
                {plan.warning && (
                  <div className="relative z-10 flex items-start gap-3 p-4 mb-8 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-snug">
                      {plan.warning}
                    </p>
                  </div>
                )}

                {/* Features List */}
                <div className="relative z-10 flex-1 flex flex-col mb-10">
                  <span className="text-white font-bold mb-6 tracking-wide">
                    Includes:
                  </span>
                  <ul className="flex flex-col gap-4">
                    {plan.includes.map((feature: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-4 text-gray-300 group/li"
                      >
                        <div
                          className={`flex items-center justify-center shrink-0 w-6 h-6 rounded-full ${styles.icon} transition-transform duration-300 group-hover/li:scale-110`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Blocks (Best For & CTA) */}
                <div className="relative z-10 mt-auto flex flex-col gap-6">
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                    <span className="text-gray-400 text-xs uppercase tracking-widest block mb-1">
                      Best for
                    </span>
                    <span className="text-white font-medium text-sm">
                      {plan.bestFor}
                    </span>
                  </div>

                  <button
                    className={`w-full py-4 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 active:scale-95 ${styles.button}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Geographic Tagline Note */}
        <div className="mt-20 flex justify-center w-full px-5">
          <p className="text-gray-500 text-sm md:text-base text-center font-medium max-w-2xl bg-white/[0.02] border border-white/5 rounded-full py-3 px-6">
            <span className="text-red-400 mr-2">📌</span>
            Pricing is structurally based on your country of residence (not
            payment method).
          </p>
        </div>
      </div>
    </section>
  );
}
