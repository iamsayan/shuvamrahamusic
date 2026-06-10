'use client';

import Link from 'next/link';

import { useRegion } from '@/hooks/use-region';
import { PricingPlan } from '@/types';

import {
  LuCheck,
  LuGlobe,
  LuMapPin,
  LuSparkles,
  LuTriangleAlert,
} from 'react-icons/lu';

interface PricingTableProps {
  plans: PricingPlan[];
}

const getPlanTheme = (planRegion: string, idx: number) => {
  const isIndia = planRegion === 'India';
  return isIndia
    ? idx === 0
      ? 'emerald'
      : 'amber'
    : idx === 0
      ? 'blue'
      : 'violet';
};

export default function PricingTable({ plans }: PricingTableProps) {
  const [region, setRegion] = useRegion();

  // Tailwind purge-safe theme mappings
  const themeMap: Record<string, Record<string, string>> = {
    emerald: {
      card: 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/40 hover:bg-emerald-900/10 shadow-[0_0_30px_rgba(16,185,129,0.02)]',
      glow: 'bg-emerald-500/10',
      button:
        'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      icon: 'text-emerald-400 bg-emerald-500/20',
      text: 'text-emerald-400',
      price: 'text-white',
    },
    amber: {
      card: 'border-amber-500/20 bg-amber-950/10 hover:border-amber-500/40 hover:bg-amber-900/10 shadow-[0_0_30px_rgba(245,158,11,0.02)]',
      glow: 'bg-amber-500/10',
      button:
        'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]',
      icon: 'text-amber-400 bg-amber-500/20',
      text: 'text-amber-400',
      price: 'text-white',
    },
    blue: {
      card: 'border-blue-500/40 bg-blue-900/20 hover:border-blue-400/60 hover:bg-blue-900/30 shadow-[0_0_50px_rgba(59,130,246,0.15)]',
      glow: 'bg-blue-500/20',
      button:
        'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]',
      icon: 'text-blue-400 bg-blue-500/20',
      text: 'text-blue-400',
      price:
        'text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200',
    },
    violet: {
      card: 'border-violet-500/20 bg-violet-950/10 hover:border-violet-500/40 hover:bg-violet-900/10 shadow-[0_0_30px_rgba(139,92,246,0.02)]',
      glow: 'bg-violet-500/10',
      button:
        'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]',
      icon: 'text-violet-400 bg-violet-500/20',
      text: 'text-violet-400',
      price: 'text-white',
    },
  };

  const currentPlans = plans.filter((p) =>
    region === 'IN' ? p.region === 'India' : p.region === 'Outside India'
  );

  return (
    <div className="flex w-full flex-col items-center">
      {/* Interactive Geo-Toggle Switch */}
      <div className="mt-2 mb-12 w-full sm:w-auto">
        <div className="relative mx-auto flex w-full rounded-full border border-white/5 bg-white/[0.03] p-1.5 shadow-2xl backdrop-blur-xl sm:w-[360px]">
          {/* Sliding Active Background */}
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full border border-white/10 bg-white/10 shadow-lg transition-transform duration-500 ease-out ${
              region === 'IN' ? 'translate-x-0' : 'translate-x-[100%]'
            }`}
          />

          <button
            onClick={() => setRegion('IN')}
            className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold transition-colors duration-300 sm:gap-2 sm:py-3 ${
              region === 'IN'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <LuMapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            India (INR)
          </button>

          <button
            onClick={() => setRegion('GLOBAL')}
            className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold transition-colors duration-300 sm:gap-2 sm:py-3 ${
              region === 'GLOBAL'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <LuGlobe className="h-4 w-4 sm:h-5 sm:w-5" />
            Global (USD)
          </button>
        </div>
      </div>

      {/* Pricing Dashboard */}
      <div className="group relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-3xl sm:rounded-[2.5rem]">
        {/* Ambient Corner Glows (Dynamic based on selected plans) */}
        {currentPlans[0] && (
          <div
            className={`pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full opacity-30 blur-[100px] transition-colors duration-700 ${themeMap[getPlanTheme(currentPlans[0].region, 0)].glow}`}
          />
        )}
        {currentPlans[1] && (
          <div
            className={`pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full opacity-30 blur-[100px] transition-colors duration-700 ${themeMap[getPlanTheme(currentPlans[1].region, 1)].glow}`}
          />
        )}

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
          {currentPlans.map((plan: PricingPlan, i: number) => {
            const themeName = getPlanTheme(plan.region, i);
            const styles = themeMap[themeName];
            const isFirst = i === 0;
            const popular = plan.is_popular === true;
            const currency = plan.region === 'India' ? '₹' : '$';

            return (
              <div
                key={`${region}-${i}`}
                className={`relative flex flex-col p-6 transition-all duration-500 hover:bg-white/[0.02] sm:p-8 lg:p-10 ${
                  isFirst
                    ? 'border-b border-white/5 md:border-r md:border-b-0'
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {popular && (
                  <div className="absolute top-3 right-3 z-20 sm:top-6 sm:right-10">
                    <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 px-3 py-1 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                      <LuSparkles className="h-3 w-3 text-white" />
                      <span className="text-[9px] font-bold tracking-widest whitespace-nowrap text-white uppercase sm:text-xs">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3
                    className={`mb-2 text-lg font-bold sm:text-xl ${styles.text} font-heading`}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span
                      className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${styles.price} font-heading`}
                    >
                      {currency}
                      {plan.amount}
                    </span>
                    <span className="text-sm font-medium text-gray-400 sm:text-base">
                      /{plan.duration || 'month'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="mb-8 flex flex-1 flex-col">
                  <span className="font-heading mb-4 text-sm font-bold tracking-wide text-white sm:text-base">
                    Includes:
                  </span>
                  <ul className="flex flex-col gap-3">
                    {(plan.features || []).map(
                      (feature: string, idx: number) => (
                        <li
                          key={idx}
                          className="group/li flex items-start gap-3 text-gray-300"
                        >
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${styles.icon} transition-transform duration-300 group-hover/li:scale-110`}
                          >
                            <LuCheck className="h-3 w-3 stroke-[3]" />
                          </div>
                          <span className="text-sm sm:text-base">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Footer Blocks (Best For & CTA) */}
                <div className="mt-auto flex flex-col gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                    <span className="mb-0.5 block text-[10px] tracking-widest text-gray-500 uppercase">
                      Best for
                    </span>
                    <span className="text-xs font-medium text-gray-300 sm:text-sm">
                      {plan.best_for}
                    </span>
                  </div>

                  <Link
                    href={`/guitar-classes-with-shuvam/pay?plan=${plan._id}&region=${region}`}
                    className={`w-full rounded-xl py-3.5 text-sm font-bold tracking-wide transition-all duration-300 active:scale-[0.98] sm:text-base ${styles.button} font-heading text-center`}
                  >
                    {plan.button_text}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Geographic & Availability Notices Deck */}
      <div className="z-10 mx-auto mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
        {/* Card 1: Residence Policy */}
        <div className="group/note relative flex gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.02]">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-cyan-500/[0.01] opacity-0 blur-xl transition-all duration-500 group-hover/note:bg-cyan-500/[0.02] group-hover/note:opacity-100" />
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition-transform duration-300 group-hover/note:scale-105">
            <LuGlobe className="h-5 w-5" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-heading mb-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Residence Policy
            </span>
            <p className="font-heading text-xs leading-relaxed font-medium text-gray-300 sm:text-sm">
              Pricing is structurally based on your country of residence (not
              payment method).
            </p>
          </div>
        </div>

        {/* Card 2: Slots Notice */}
        <div className="group/note relative flex gap-4 rounded-2xl border border-amber-500/10 bg-amber-500/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/20 hover:bg-amber-500/[0.04]">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-amber-500/[0.01] opacity-0 blur-xl transition-all duration-500 group-hover/note:bg-amber-500/[0.02] group-hover/note:opacity-100" />
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-transform duration-300 group-hover/note:scale-105">
            <LuTriangleAlert className="h-5 w-5" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-heading mb-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Availability
            </span>
            <p className="font-heading text-xs leading-relaxed font-medium text-gray-300 sm:text-sm">
              Limited slots available — priority for serious offline India
              students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
