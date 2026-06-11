'use client';

import { ProgressProvider } from '@bprogress/next/app';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider
      height="2px"
      color="#00d3f3"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
