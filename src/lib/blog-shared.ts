import type { Asset } from '@/lib/cockpit';
import type { Category, Post, Tag } from '@/types';

export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: Asset;
  featured_image: Asset;
  categories: Category[];
  tags: Tag[];
  date: string;
  modifiedDate: string;
  readTime: string;
  author: Author;
  raw: Post;
}

export interface CategoryTheme {
  text: string;
  bg: string;
  border: string;
  glow: string;
  gradient: string;
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  violet: {
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]',
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]',
    gradient: 'from-rose-500/20 to-pink-500/20',
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  default: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
};

export const BRIGHT_GRADIENTS: Record<string, string> = {
  emerald: 'from-emerald-500 to-teal-500',
  violet: 'from-violet-500 to-fuchsia-500',
  amber: 'from-amber-500 to-orange-500',
  rose: 'from-rose-500 to-pink-500',
  cyan: 'from-cyan-500 to-blue-500',
  default: 'from-cyan-500 to-blue-500',
};

export const GLOW_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-500/10',
  violet: 'bg-violet-500/10',
  amber: 'bg-amber-500/10',
  rose: 'bg-rose-500/10',
  cyan: 'bg-cyan-500/10',
  default: 'bg-cyan-500/10',
};

export function getThemeKey(categoryName: string): string {
  if (!categoryName) return 'default';
  const lowerName = categoryName.toLowerCase();
  if (lowerName === 'all') return 'all';
  if (lowerName === 'default') return 'default';

  const themeKeys = ['emerald', 'violet', 'amber', 'rose', 'cyan'];
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % themeKeys.length;
  return themeKeys[index];
}
