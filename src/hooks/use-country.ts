import { useEffect, useState } from 'react';

export interface IpInfoData {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
  readme?: string;
}

// Global in-memory cache to deduplicate parallel requests and prevent redundant localStorage reads
let inMemoryCache: IpInfoData | null = null;
let activeFetchPromise: Promise<IpInfoData> | null = null;

export function useCountry() {
  const [countryData, setCountryData] = useState<IpInfoData | null>(
    inMemoryCache
  );

  useEffect(() => {
    if (inMemoryCache) {
      if (countryData !== inMemoryCache) {
        setTimeout(() => setCountryData(inMemoryCache), 0);
      }
      return;
    }

    async function getCountry() {
      const cached = localStorage.getItem('ipinfo_data');
      if (cached) {
        try {
          const data = JSON.parse(cached);
          if (data && data.country) {
            inMemoryCache = data;
            setTimeout(() => setCountryData(data), 0);
            return;
          }
        } catch (e) {
          console.error('Error parsing cached ipinfo_data:', e);
        }
      }

      try {
        if (!activeFetchPromise) {
          activeFetchPromise = fetch('https://ipinfo.io/json')
            .then((res) => res.json())
            .then((data) => {
              inMemoryCache = data;
              localStorage.setItem('ipinfo_data', JSON.stringify(data));
              activeFetchPromise = null;
              return data;
            })
            .catch((err) => {
              activeFetchPromise = null;
              throw err;
            });
        }

        const data = await activeFetchPromise;
        setTimeout(() => setCountryData(data), 0);
      } catch (error) {
        console.error('Error fetching country code:', error);
      }
    }

    getCountry();
  }, [countryData]);

  return countryData;
}
