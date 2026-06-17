'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
];

export default function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Capture UTM parameters from URL and store in sessionStorage
    UTM_KEYS.forEach((key) => {
      const val = searchParams.get(key);
      if (val) {
        sessionStorage.setItem(key, val);
      }
    });

    // 2. Global Event Listener to automatically decorate outbound Calendly links on-the-fly
    const handleOutboundClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (anchor && anchor.href && anchor.href.includes('calendly.com')) {
        try {
          const url = new URL(anchor.href);
          
          // Append stored UTMs to the Calendly link query parameters
          UTM_KEYS.forEach((key) => {
            const val = sessionStorage.getItem(key);
            if (val) {
              url.searchParams.set(key, val);
            }
          });

          anchor.href = url.toString();
        } catch (err) {
          console.error('Error decorating outbound link with UTMs:', err);
        }
      }
    };

    document.addEventListener('click', handleOutboundClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleOutboundClick, { capture: true });
    };
  }, [searchParams]);

  return null; // Side-effect tracking component only
}
