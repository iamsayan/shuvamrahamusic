'use client';

import { createContext, use, useContext } from 'react';

import type { Settings } from '@/types';
import { ProgressProvider } from '@bprogress/next/app';

const SettingsContext = createContext<Promise<Settings> | null>(null);

export default function Providers({
  children,
  settingsPromise,
}: {
  children: React.ReactNode;
  settingsPromise: Promise<Settings>;
}) {
  return (
    <ProgressProvider
      height="2px"
      color="#00d3f3"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <SettingsContext value={settingsPromise}>{children}</SettingsContext>
    </ProgressProvider>
  );
}

export function useSettings() {
  const settingsPromise = useContext(SettingsContext);
  if (!settingsPromise) {
    throw new Error('useSettings must be used within SettingsProvider');
  }

  return use(settingsPromise);
}
