'use client';

import { useSyncExternalStore } from 'react';

// ============================================================================
// 1. GLOBAL DYNAMIC FIELDS STORE
// Returns referentially stable values to prevent infinite rendering loops.
// ============================================================================
const SERVER_SNAPSHOT = {
  years: 11,
  currentYear: 2026,
};

let clientSnapshot: typeof SERVER_SNAPSHOT | null = null;

const dynamicStore = {
  subscribe: () => () => {}, // Static values, no external state change listeners needed
  getSnapshot: () => {
    if (!clientSnapshot) {
      clientSnapshot = {
        years: new Date().getFullYear() - 2015,
        currentYear: new Date().getFullYear(),
      };
    }
    return clientSnapshot;
  },
  getServerSnapshot: () => SERVER_SNAPSHOT,
};

interface DynamicTextProps {
  text: string;
  // Custom fields can be values or dynamic client-side evaluation functions
  fields?: Record<string, string | number | (() => string | number)>;
}

export default function DynamicText({ text, fields = {} }: DynamicTextProps) {
  // useSyncExternalStore safely reads globals with a build-safe fallback
  const globals = useSyncExternalStore(
    dynamicStore.subscribe,
    dynamicStore.getSnapshot,
    dynamicStore.getServerSnapshot
  );

  let formattedText = text;

  // Replace global placeholders
  Object.entries(globals).forEach(([key, value]) => {
    formattedText = formattedText.replace(
      new RegExp(`{${key}}`, 'g'),
      String(value)
    );
  });

  // Replace custom ad-hoc fields (evaluating functions on client)
  Object.entries(fields).forEach(([key, val]) => {
    const evaluatedValue = typeof val === 'function' ? val() : val;
    formattedText = formattedText.replace(
      new RegExp(`{${key}}`, 'g'),
      String(evaluatedValue)
    );
  });

  return <>{formattedText}</>;
}
