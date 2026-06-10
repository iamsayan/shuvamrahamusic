import { Asset, Entity } from '@/lib/client';

export interface Member extends Entity {
  name: string;
  phone: string;
  amount: string;
}

export interface GearItem extends Entity {
  title: string;
  subtitle: string;
  description: string;
  ideal_for: string[];
  highlights: string[];
  categories: string[];
  brand_link: string;
  distributor_link: string;
  amazon_link?: string;
  images: Asset[];
}

export interface TutorialLink {
  title: string;
  asset: Asset;
}

export interface TutorialItem extends Entity {
  title: string;
  youtube_video_id?: string;
  description?: string;
  links: TutorialLink[];
}

export type ImagePreset =
  | 'thumbnail'
  | 'small'
  | 'medium'
  | 'large'
  | 'hero'
  | 'tailwind_sm'
  | 'tailwind_md'
  | 'tailwind_lg'
  | 'tailwind_xl'
  | 'tailwind_2xl'
  | 'next_xs'
  | 'next_sm'
  | 'next_md'
  | 'next_lg'
  | 'next_xl'
  | 'next_2xl'
  | 'next_3xl'
  | 'aspect_square'
  | 'aspect_video'
  | 'aspect_banner'
  | 'aspect_card'
  | 'aspect_tall'
  | 'product_thumb'
  | 'product_gallery'
  | 'avatar_small'
  | 'avatar_large'
  | 'favicon'
  | 'logo'
  | 'og_image'
  | 'masonry_column'
  | 'lazy_placeholder'
  | 'bw_cover'
  | 'vintage_photo'
  | 'blurred_hero'
  | 'pixel_art'
  | 'high_contrast'
  | 'blueprint'
  | 'embossed_art';

export interface RazorpayFormData {
  amount: number;
  email: string;
  name: string;
  phone: string;
  currency: 'INR' | 'USD';
  city: string;
  address: string;
}

export interface PricingPlan {
  _id: string;
  name: string;
  region: 'India' | 'Outside India';
  amount: number;
  duration: string;
  description: string;
  is_popular: boolean | null;
  features: string[];
  button_text: string;
  best_for: string;
  _o?: number;
}

declare global {
  interface Window {
    Razorpay: new (options: unknown) => { open(): void };
  }
}
