'use client';

import { createContext, use, useContext } from 'react';

import type { PricingPlan, Settings } from '@/types';
import { ProgressProvider } from '@bprogress/next/app';

const SiteContext = createContext<{
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
      <SiteContext
        value={{ settingsPromise, pricingPlansPromise }}
      >
        {children}
      </SiteContext>
    </ProgressProvider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within Providers');
  }
  return use(context.settingsPromise);
}

export function usePricingPlans() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('usePricingPlans must be used within Providers');
  }
  return use(context.pricingPlansPromise);
}