import cockpit, { Asset } from '@/lib/client';
import { Category, Post } from '@/types';

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
  categories: string[];
  tags: string[];
  date: string;
  readTime: string;
  author: Author;
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

export const AMBIENT_GLOWS: Record<string, { top: string; bottom: string }> = {
  all: {
    top: 'bg-cyan-600/10',
    bottom: 'bg-violet-600/10',
  },
  emerald: {
    top: 'bg-emerald-600/10',
    bottom: 'bg-teal-600/10',
  },
  violet: {
    top: 'bg-violet-600/10',
    bottom: 'bg-fuchsia-600/10',
  },
  amber: {
    top: 'bg-amber-600/10',
    bottom: 'bg-orange-600/10',
  },
  rose: {
    top: 'bg-rose-600/10',
    bottom: 'bg-pink-600/10',
  },
  cyan: {
    top: 'bg-cyan-600/10',
    bottom: 'bg-blue-600/10',
  },
  default: {
    top: 'bg-cyan-600/10',
    bottom: 'bg-violet-600/10',
  },
};

const AUTHOR_SHUVAM: Author = {
  name: 'Shuvam Raha',
  avatar: '/blog/shuvam-avatar.png',
  role: 'LCM Certified Music Instructor',
  bio: `Professional guitarist, music producer, and educator with over ${new Date().getFullYear() - 2015} years of coaching experience, helping 150+ students globally master the guitar.`,
};

// Helper to format date from unix timestamp (seconds) or string
function formatDate(timestamp?: number | string): string {
  if (!timestamp) {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  if (typeof timestamp === 'number') {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Helper to calculate reading time dynamically
function calculateReadTime(content: string): string {
  const words = content
    .replace(/<[^>]*>/g, '')
    .trim()
    .split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// Helper to calculate excerpt if not present
function generateExcerpt(content: string): string {
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plainText.length <= 160) return plainText;
  return plainText.substring(0, 157) + '...';
}

const mapCategory = (cat: Category | string): string => {
  if (!cat) return '';
  if (typeof cat === 'string') return cat;
  return cat.title || cat.slug || '';
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

async function mapPostToBlogPost(entry: Post): Promise<BlogPost> {
  let coverImage = entry.featured_image as Asset;
  if (entry.featured_image?._id) {
    try {
      const fullAsset = await cockpit.getAsset(entry.featured_image._id);
      if (fullAsset) {
        coverImage = fullAsset;
      }
    } catch (err) {
      console.error(`Error refetching cover image asset ${entry.featured_image._id}:`, err);
    }
  }

  return {
    id: entry._id,
    slug: entry.slug,
    title: entry.title,
    excerpt: generateExcerpt(entry.content),
    content: entry.content,
    coverImage,
    categories: Array.isArray(entry.categories)
      ? entry.categories.map(mapCategory).filter(Boolean)
      : [],
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    date: formatDate(entry._created),
    readTime: calculateReadTime(entry.content),
    author: AUTHOR_SHUVAM,
  };
}

// Plug-and-play fetcher: Queries Cockpit CMS when configured, otherwise falls back to static content
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Queries the Cockpit collection named 'posts'
    const cockpitPosts = await cockpit.listContentItems<Post[]>('posts', {
      populate: 1,
      sort: {
        _created: -1,
      },
    });

    if (!cockpitPosts || !Array.isArray(cockpitPosts)) {
      return [];
    }

    return Promise.all(cockpitPosts.map(mapPostToBlogPost));
  } catch (error) {
    console.error('Error fetching posts from Cockpit CMS:', error);
    return [];
  }
}

// Plug-and-play item fetcher by slug: Queries Cockpit CMS when configured, otherwise falls back to static content
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  try {
    // Queries the Cockpit collection named 'posts' filtered by slug
    const entry = await cockpit.getContentItemByFilter<Post>('posts', {
      filter: { slug },
      populate: 1,
    });

    if (entry) {
      return await mapPostToBlogPost(entry);
    }

    return undefined;
  } catch (error) {
    console.error(
      `Error fetching post by slug "${slug}" from Cockpit CMS:`,
      error
    );
    return undefined;
  }
}
