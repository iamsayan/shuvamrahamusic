'use client';

import { useEffect, useState } from 'react';

/**
 * A hook to enable real-time live preview overrides for Cockpit CMS content models.
 * If loaded inside an iframe (CMS editor), it intercepts postMessage preview updates and overrides the page state.
 * If browsed normally, it is a zero-overhead pass-through returning the server-side loaded initialData.
 *
 * @param initialData The initial data loaded server-side.
 * @param model The Cockpit CMS model name (e.g. 'posts', 'gears').
 * @param mapFn Optional mapping function to transform the raw CMS entity before state updates.
 */
export function useLivePreview<T, R = T>(
  initialData: R,
  model: string,
  mapFn?: (data: T) => R
): R {
  const [data, setData] = useState<R>(initialData);

  useEffect(() => {
    // Only register listener when loaded within an iframe (i.e. CMS preview panel)
    const inIframe = typeof window !== 'undefined' && window.self !== window.top;
    if (!inIframe) return;

    const handleMessage = (event: MessageEvent) => {
      let payload = event.data;
      if (!payload) return;

      // Handle cases where the CMS stringifies the postMessage payload
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }

      // Check if it's the target content preview event for this model
      if (
        payload.event === 'cockpit:content.preview' &&
        payload.context?.model === model &&
        payload.data
      ) {
        console.log(`[Preview] Received real-time live preview update for ${model}`);
        try {
          const entry = payload.data as T;
          
          if (mapFn) {
            const mapped = mapFn(entry);
            setData(mapped);
          } else {
            setData((prev) => {
              if (Array.isArray(prev)) {
                // If rendering a list, merge/replace the active item being edited by ID
                const item = entry as unknown as { _id: string };
                const list = prev as unknown as Array<{ _id: string }>;
                const idx = list.findIndex((x) => x._id === item._id);
                if (idx > -1) {
                  const updated = [...list];
                  updated[idx] = { ...updated[idx], ...item };
                  return updated as unknown as R;
                } else {
                  return [item, ...list] as unknown as R;
                }
              }
              return entry as unknown as R;
            });
          }
        } catch (err) {
          console.error(`[Preview] Error processing live preview data for ${model}:`, err);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [model, mapFn]);

  return data;
}
