'use client';

import React, { createContext, useContext } from 'react';

import type { Settings } from '@/types';

interface SettingsContextType {
  settings: Settings | null;
}

const SettingsContext = createContext<SettingsContextType>({ settings: null });

export function SettingsProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings;
}) {
  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
