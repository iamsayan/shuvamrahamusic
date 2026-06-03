'use client';

import { useState } from 'react';
import {
  LuCheck,
  LuExternalLink,
  LuGlobe,
  LuMapPin,
  LuShieldCheck,
  LuTriangleAlert,
} from 'react-icons/lu';
import { type Plan, plans } from '@/lib/guitar-data';
import { useRegion } from '@/hooks/use-region';

export default function SecurePayPortal() {
  const [region, setRegion] = useRegion();
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);

  const currentPlans = plans[region];
  const activePlan = currentPlans[selectedPlanIdx];

  // Theme mapping for interactive styling
  const themeMap: Record<string, Record<string, string>> = {
    emerald: {
      btn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500/30',
      text: 'text-emerald-400',
    },
    amber: {
      btn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] border-amber-500/30',
      text: 'text-amber-400',
    },
    blue: {
      btn: 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/30',
      text: 'text-cyan-400',
    },
    violet: {
      btn: 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] border-violet-500/30',
      text: 'text-violet-400',
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
    <div className="w-full">
      {/* SSL Status */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
          <LuShieldCheck className="h-4 w-4 animate-pulse text-emerald-400" />
          256-BIT SSL SECURE CHECKOUT
        </div>
      </div>

      {/* Region Switcher */}
      <div className="relative mb-8 flex w-full rounded-full border border-white/5 bg-white/[0.03] p-1.5 shadow-2xl backdrop-blur-xl">
        <div
          className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full border border-white/10 bg-white/10 shadow-lg transition-transform duration-500 ease-out ${
            region === 'IN' ? 'translate-x-0' : 'translate-x-[100%]'
          }`}
        />
        <button
          onClick={() => {
            setRegion('IN');
            setSelectedPlanIdx(0);
          }}
          className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold transition-colors duration-300 sm:text-sm ${
            region === 'IN' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <LuMapPin className="h-4 w-4" />
          India (INR)
        </button>
        <button
          onClick={() => {
            setRegion('GLOBAL');
            setSelectedPlanIdx(0);
          }}
          className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold transition-colors duration-300 sm:text-sm ${
            region === 'GLOBAL' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <LuGlobe className="h-4 w-4" />
          Global (USD)
        </button>
      </div>

      {/* Plan Selection Buttons */}
      <div className="flex w-full flex-col gap-3">
        {currentPlans.map((plan: Plan, idx: number) => {
          const isActive = selectedPlanIdx === idx;
          const theme = themeMap[plan.theme] || themeMap.blue;

          return (
            <button
              key={idx}
              onClick={() => setSelectedPlanIdx(idx)}
              className={`group/plan-btn relative flex w-full cursor-pointer items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                isActive
                  ? `border-cyan-500/40 bg-white/[0.03] shadow-[0_10px_35px_rgba(6,182,212,0.06)]`
                  : 'border-white/[0.04] bg-white/[0.005] hover:border-white/10 hover:bg-white/[0.01]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-600'
                  }`}
                >
                  {isActive && (
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-bold text-white sm:text-base">
                      {plan.name}
                    </span>
                    {plan.popular && (
                      <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-400 line-clamp-1 max-w-[200px] sm:max-w-none">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-heading text-base font-black sm:text-lg transition-colors duration-300 ${
                    isActive ? theme.text : 'text-gray-400'
                  }`}
                >
                  {plan.currency}
                  {plan.price}
                </span>
                <span className="block text-[10px] text-gray-500 lowercase mt-0.5">
                  {plan.period}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Order Summary Panel */}
      <div className="group/summary relative mt-8 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-6 shadow-xl backdrop-blur-md">
        <div
          className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${
            activePlan.theme === 'emerald'
              ? 'from-emerald-500 to-teal-400'
              : activePlan.theme === 'amber'
                ? 'from-amber-500 to-orange-400'
                : activePlan.theme === 'violet'
                  ? 'from-violet-500 to-fuchsia-400'
                  : 'from-blue-500 to-cyan-400'
          } opacity-70`}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Selected Program
              </span>
              <h4 className="font-heading text-sm font-black text-white mt-0.5 sm:text-base">
                {activePlan.name}
              </h4>
            </div>
            <div className="text-right">
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Billing Period
              </span>
              <p className="font-heading text-xs font-bold text-gray-300 mt-0.5 sm:text-sm capitalize">
                {activePlan.period.replace('/', '')}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Features Included:
            </span>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {activePlan.includes.map((feature, fIdx) => (
                <li
                  key={fIdx}
                  className="flex items-start gap-2 text-xs text-gray-300 sm:text-sm"
                >
                  <LuCheck className={`h-4 w-4 shrink-0 stroke-[3] mt-0.5 ${planTheme.text}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {activePlan.warning && (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/10 bg-amber-500/[0.04] p-3 text-amber-300/90 text-xs">
              <LuTriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p className="leading-snug">{activePlan.warning}</p>
            </div>
          )}

          {/* Best For Tag */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-center mt-2">
            <span className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              Best suited for
            </span>
            <span className="text-xs font-bold text-gray-300">{activePlan.bestFor}</span>
          </div>

          {/* Total Due Display */}
          <div className="flex items-baseline justify-between border-t border-white/5 pt-4 mt-2">
            <span className="font-heading text-xs font-bold text-white sm:text-sm">
              Amount Due Today:
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-heading text-2xl font-black sm:text-3xl ${planTheme.text}`}
              >
                {activePlan.currency}
                {activePlan.price}
              </span>
              <span className="text-xs font-semibold text-gray-400">
                {activePlan.period}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Secure Redirection CTA */}
      <a
        href={getPaymentLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full rounded-2xl py-4 text-sm font-black tracking-wider transition-all duration-300 active:scale-[0.98] ${planTheme.btn} font-heading flex items-center justify-center gap-2 mt-6 cursor-pointer text-center`}
      >
        Proceed to Secure Payment
        <LuExternalLink className="h-4 w-4" />
      </a>

      {/* Direct WhatsApp Support Helper link */}
      <div className="mt-4 text-center">
        <span className="text-[10px] leading-relaxed text-gray-500 sm:text-xs">
          Need help?{' '}
          <a
            href={`https://wa.me/918961369468?text=${encodeURIComponent(
              'Hi Shuvam, I need help with my classes payment.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cyan-400 underline transition-colors hover:text-cyan-300"
          >
            Chat on WhatsApp
          </a>
        </span>
      </div>

      {/* Trust & Safe Payment Deck */}
      <div className="flex flex-col items-center gap-2 border-t border-white/5 pt-6 mt-6 text-center">
        <div className="flex items-center justify-center gap-4 text-gray-500 opacity-60">
          <span className="text-[9px] font-bold uppercase tracking-widest sm:text-[10px]">
            Secured by Razorpay
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[10px] text-gray-400 sm:text-xs">
          <span className="flex items-center gap-1">
            <LuShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> UPI / Net Banking
          </span>
          <span className="flex items-center gap-1">
            <LuShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Credit / Debit Cards
          </span>
          <span className="flex items-center gap-1">
            <LuShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Safe Processing
          </span>
        </div>
      </div>
    </div>
  );
}
