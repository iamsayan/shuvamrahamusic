'use client';

import { useEffect, useState } from 'react';
import {
  LuGlobe,
  LuMapPin,
  LuExternalLink,
  LuShieldCheck,
} from 'react-icons/lu';
import { Region, Plan, plans } from '@/lib/guitar-data';

export default function SecurePayPage() {
  const [region, setRegion] = useState<Region>('IN');
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);

  useEffect(() => {
    async function getCountryCode() {
      const cached = localStorage.getItem('region');

      if (cached) {
        setRegion(cached as Region);
        return;
      }

      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();

        const region = data.country === 'IN' ? 'IN' : 'GLOBAL';

        localStorage.setItem('region', region);

        setRegion(region);
      } catch (error) {
        console.error(error);
      }
    }

    getCountryCode();
  }, []);

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
      btn: 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/30',
      text: 'text-blue-400',
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
    <main className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-[#05050A] pt-28 pb-16 text-[#f0f0f5]">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-cyan-600/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-violet-600/5 blur-[100px]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-5">
        {/* Unified Card */}
        <div className="relative flex w-full flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-center shadow-2xl backdrop-blur-2xl sm:p-8">
          {/* SSL Status */}
          <div className="mb-6 inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
            <LuShieldCheck className="h-3.5 w-3.5" />
            SECURE PORTAL
          </div>

          <h1 className="font-heading mb-1 text-2xl font-black tracking-tight text-white">
            Choose & Pay
          </h1>
          <p className="mb-6 max-w-[280px] text-xs text-gray-400">
            Select your region and preferred coaching program below.
          </p>

          {/* Region Switcher */}
          <div className="relative mb-5 flex w-full rounded-full border border-white/5 bg-white/[0.03] p-1">
            <button
              onClick={() => {
                setRegion('IN');
                setSelectedPlanIdx(0);
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all duration-300 ${
                region === 'IN'
                  ? 'bg-white/10 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LuMapPin className="h-3.5 w-3.5" />
              India
            </button>
            <button
              onClick={() => {
                setRegion('GLOBAL');
                setSelectedPlanIdx(0);
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all duration-300 ${
                region === 'GLOBAL'
                  ? 'bg-white/10 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LuGlobe className="h-3.5 w-3.5" />
              Global
            </button>
          </div>

          {/* Plan Selection Buttons */}
          <div className="mb-6 flex w-full flex-col gap-2.5">
            {currentPlans.map((plan: Plan, idx: number) => {
              const isActive = selectedPlanIdx === idx;
              const theme = themeMap[plan.theme] || themeMap.blue;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPlanIdx(idx)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? `border-white/20 bg-white/5`
                      : 'border-white/[0.04] bg-white/[0.005] hover:border-white/10 hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${
                        isActive ? 'border-cyan-400' : 'border-gray-600'
                      }`}
                    >
                      {isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      )}
                    </div>
                    <span className="font-heading text-xs font-bold text-white">
                      {plan.name}
                    </span>
                  </div>

                  <span
                    className={`font-heading text-xs font-black ${isActive ? theme.text : 'text-gray-400'}`}
                  >
                    {plan.currency}
                    {plan.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pricing detail string */}
          <div className="mb-6 flex w-full flex-col items-center border-t border-white/5 pt-4">
            <span className="font-heading mb-1 block text-[10px] tracking-wider text-gray-500 uppercase">
              Total Fee
            </span>
            <div className="flex items-baseline gap-0.5">
              <span
                className={`text-3xl font-black ${planTheme.text} font-heading`}
              >
                {activePlan.currency}
                {activePlan.price}
              </span>
              <span className="text-xs font-semibold text-gray-400">
                {activePlan.period}
              </span>
            </div>
          </div>

          {/* Secure Redirection CTA */}
          <a
            href={getPaymentLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full rounded-xl py-3.5 text-sm font-black tracking-wide transition-all duration-300 active:scale-[0.98] ${planTheme.btn} font-heading flex items-center justify-center gap-2`}
          >
            Pay Securely
            <LuExternalLink className="h-4 w-4" />
          </a>

          {/* Direct WhatsApp Support Helper link */}
          <span className="mt-4 text-[10px] leading-relaxed text-gray-500">
            Need help?{' '}
            <a
              href={`https://wa.me/918961369468?text=${encodeURIComponent('Hi Shuvam, I need help with my classes payment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-400 underline transition-colors hover:text-cyan-300"
            >
              Chat on WhatsApp
            </a>
          </span>
        </div>
      </div>
    </main>
  );
}
