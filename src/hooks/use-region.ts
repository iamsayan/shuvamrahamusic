import { useEffect, useState } from 'react';

import { useCountry } from '@/hooks/use-country';

// Shared state and listeners for zero-context, real-time synchronization between hook instances
let globalRegion: 'IN' | 'GLOBAL' = 'IN';
const listeners = new Set<(region: 'IN' | 'GLOBAL') => void>();

export function useRegion() {
  const countryData = useCountry();
  const [region, setRegion] = useState<'IN' | 'GLOBAL'>(globalRegion);

  // Subscribe to updates
  useEffect(() => {
    listeners.add(setRegion);
    if (region !== globalRegion) {
      setTimeout(() => setRegion(globalRegion), 0);
    }
    return () => {
      listeners.delete(setRegion);
    };
  }, [region]);

  // Handle auto-detection and cache initialization
  useEffect(() => {
    const cached = localStorage.getItem('region_pref');
    const countryCode = countryData?.country;
    const activeRegion =
      cached === 'IN' || cached === 'GLOBAL'
        ? cached
        : countryCode === 'IN'
          ? 'IN'
          : 'GLOBAL';

    if (globalRegion !== activeRegion) {
      globalRegion = activeRegion;
      // Defer state update to prevent synchronous setState inside useEffect warnings
      setTimeout(() => {
        listeners.forEach((listener) => listener(activeRegion));
      }, 0);
    }
  }, [countryData]);

  const updateRegion = (newRegion: 'IN' | 'GLOBAL') => {
    if (globalRegion !== newRegion) {
      globalRegion = newRegion;
      localStorage.setItem('region_pref', newRegion);
      listeners.forEach((listener) => listener(newRegion));
    }
  };

  return [region, updateRegion] as const;
}
