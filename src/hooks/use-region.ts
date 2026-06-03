import { useEffect, useState } from 'react';

import { type Region } from '@/lib/guitar-data';

export function useRegion() {
  const [region, setRegion] = useState<Region>('IN');

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

        const regionValue = data.country === 'IN' ? 'IN' : 'GLOBAL';

        localStorage.setItem('region', regionValue);
        setRegion(regionValue);
      } catch (error) {
        console.error('Error fetching geolocation:', error);
      }
    }

    getCountryCode();
  }, []);

  return [region, setRegion] as const;
}
