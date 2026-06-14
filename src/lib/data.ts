import { cache } from 'react';

import cockpit from '@/lib/client';
import type { Settings } from '@/types';

export const getSettings = cache(async () => {
  const settings = await cockpit.getContentItemByFilter<Settings>('settings', {
    populate: 1,
  });
  return settings;
});
