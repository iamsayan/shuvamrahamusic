import { cacheLife, cacheTag } from 'next/cache';

import cockpit from '@/lib/client';
import type {
  GalleryData,
  GearItem,
  GuitarClassesData,
  Performance,
  PricingPlan,
  Settings,
  TutorialItem,
} from '@/types';

export async function getSettings(): Promise<Settings> {
  'use cache';
  cacheLife('weeks');
  cacheTag('settings');
  const settings = await cockpit.getContentItemByFilter<Settings>('settings', {
    populate: 1,
  });
  return settings;
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('pricingplans');
  return cockpit.listContentItems<PricingPlan[]>('pricingplans');
}

export async function getGuitarClassesData(): Promise<GuitarClassesData> {
  'use cache';
  cacheLife('weeks');
  cacheTag('guitarclasses');
  return cockpit.getContentItemByFilter<GuitarClassesData>('guitarclasses', {
    populate: 1,
  });
}

export async function getGears(): Promise<GearItem[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('gears');
  return cockpit.getContentTree<GearItem[]>('gears', { populate: 1 });
}

export async function getPerformances(): Promise<Performance[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('performances');
  return cockpit.getContentTree<Performance[]>('performances', {
    populate: 1,
  });
}

export async function getTutorials(): Promise<TutorialItem[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('tutorials');
  return cockpit.listContentItems<TutorialItem[]>('tutorials', {
    sort: {
      title: 1,
      _created: -1,
    },
  });
}

export async function getGalleryData(): Promise<GalleryData> {
  'use cache';
  cacheLife('weeks');
  cacheTag('gallery');
  return cockpit.getContentItemByFilter<GalleryData>('gallery', {
    populate: 1,
  });
}
