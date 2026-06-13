'use client';

import { SettingsProvider } from '@/context/settings-context';
import type { Settings } from '@/types';
import { ProgressProvider } from '@bprogress/next/app';

export default function Providers({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings;
}) {
  return (
    <ProgressProvider
      height="2px"
      color="#00d3f3"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <SettingsProvider settings={settings}>{children}</SettingsProvider>
    </ProgressProvider>
  );
}
