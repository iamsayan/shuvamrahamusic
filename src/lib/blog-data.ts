import { Author, BlogPost } from '@/lib/blog-shared';
import cockpit, {
  Asset,
  ContentItemGetByFilterOptions,
  ContentItemsListOptions,
} from '@/lib/client';
import { Category, Post, Tag } from '@/types';

export * from '@/lib/blog-shared';

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
      console.error(
        `Error refetching cover image asset ${entry.featured_image._id}:`,
        err
      );
    }
  }

  return {
    id: entry._id,
    slug: entry.slug,
    title: entry.title,
    excerpt: generateExcerpt(entry.content),
    content: entry.content,
    coverImage,
    categories: Array.isArray(entry.categories) ? entry.categories : [],
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    date: formatDate(entry._created),
    readTime: calculateReadTime(entry.content),
    author: AUTHOR_SHUVAM,
  };
}

// Plug-and-play fetcher: Queries Cockpit CMS when configured, otherwise falls back to static content
export async function getBlogPosts(
  options: ContentItemsListOptions = {}
): Promise<BlogPost[]> {
  try {
    // Queries the Cockpit collection named 'posts'
    const cockpitPosts = await cockpit.listContentItems<Post[]>('posts', {
      populate: 1,
      sort: {
        _created: -1,
      },
      ...options,
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
  slug: string,
  options: ContentItemGetByFilterOptions = {}
): Promise<BlogPost | undefined> {
  try {
    // Queries the Cockpit collection named 'posts' filtered by slug
    const entry = await cockpit.getContentItemByFilter<Post>('posts', {
      filter: { slug },
      populate: 1,
      ...options,
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

// Fetch all posts belonging to a specific category slug
export async function getBlogPostsByCategory(
  categorySlug: string
): Promise<BlogPost[]> {
  try {
    const category = await cockpit.getContentItemByFilter<Category>(
      'categories',
      {
        filter: { slug: categorySlug },
      }
    );

    if (!category?._id) {
      return [];
    }

    const posts = await getBlogPosts({
      filter: { categories: { $elemMatch: { _id: category._id } } },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Fetch all posts belonging to a specific tag slug
export async function getBlogPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  try {
    const tag = await cockpit.getContentItemByFilter<Tag>('tags', {
      filter: { slug: tagSlug },
    });

    if (!tag?._id) {
      return [];
    }

    const posts = await getBlogPosts({
      filter: { tags: { $elemMatch: { _id: tag._id } } },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
}
