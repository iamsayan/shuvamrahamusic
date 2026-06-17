'use client';

import { createContext, use, useContext } from 'react';

import type { PricingPlan, Settings } from '@/types';
import { ProgressProvider } from '@bprogress/next/app';

const SettingsContext = createContext<{
  settingsPromise: Promise<Settings>;
  pricingPlansPromise: Promise<PricingPlan[]>;
} | null>(null);

export default function Providers({
  children,
  settingsPromise,
  pricingPlansPromise,
}: {
  children: React.ReactNode;
  settingsPromise: Promise<Settings>;
  pricingPlansPromise: Promise<PricingPlan[]>;
}) {
  return (
    <ProgressProvider
      height="2px"
      color="#00d3f3"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <SettingsContext value={{ settingsPromise, pricingPlansPromise }}>
        {children}
      </SettingsContext>
    </ProgressProvider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within Providers');
  }

  const settings = use(context.settingsPromise);
  const pricingPlans = use(context.pricingPlansPromise);

  return {
    settings,
    pricing_plans: pricingPlans,
  };
}
