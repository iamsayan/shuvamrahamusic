import type { Asset, Entity, TreeEntity, SingletonEntity } from '@/lib/cockpit';

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

export interface TutorialItem extends TreeEntity {
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

export interface PricingPlan extends TreeEntity {
  name: string;
  region: 'India' | 'Outside India';
  amount: number;
  duration: string;
  description: string;
  is_popular: boolean | null;
  features: string[];
  button_text: string;
  best_for: string;
}

export interface Category extends Entity {
  title: string;
  slug: string;
}

export interface Tag extends Entity {
  title: string;
  slug: string;
}

export interface Post extends Entity {
  title: string;
  slug: string;
  content: string;
  featured_image: Asset;
  categories: Category[];
  tags?: Tag[];
}

export interface Artist extends TreeEntity {
  name: string;
  description?: string;
  image: Asset;
  formats: string;
  hidden?: boolean;
}

export interface Performance extends TreeEntity {
  date: string[];
  country: string;
  state?: string;
  city: string;
  artist: Artist;
  venue?: string;
  circuit?: string;
  details?: string | null;
}

export interface GuitarClassesData extends Entity {
  student_performance_videos: string[];
  performance_videos: string[];
  hero_image: Asset;
  coach_images: Asset[];
}

export interface GalleryImage {
  image: Asset;
  title: string;
  description: string;
  group: string;
  date?: string;
  location?: string;
}

export interface GalleryVideo {
  video_id: string;
  title: string;
  description: string;
  date: string;
  type: 'Video' | 'Short';
  category: string;
}

export interface GalleryData extends SingletonEntity {
  images: GalleryImage[];
  videos: GalleryVideo[];
}

declare global {
  interface Window {
    Razorpay: new (options: unknown) => { open(): void };
  }
}
