import { Author, BlogPost } from '@/lib/blog-shared';
import cockpit, {
  ContentItemGetByFilterOptions,
  ContentItemsListOptions,
  PaginatedList,
} from '@/lib/client';
import { Category, Post, Tag } from '@/types';

export * from '@/lib/blog-shared';

const AUTHOR_SHUVAM: Author = {
  name: 'Shuvam Raha',
  avatar: '/hero-guitarist.jpg',
  role: 'LCM Certified Music Instructor',
  bio: `Professional guitarist, music producer, and educator with over ${new Date().getFullYear() - 2015} years of coaching experience, helping 600+ students globally master the guitar.`,
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
function calculateReadTime(content?: string): string {
  if (!content) return '1 min read';
  const words = content
    .replace(/<[^>]*>/g, '')
    .trim()
    .split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// Helper to calculate excerpt if not present
function generateExcerpt(content?: string): string {
  if (!content) return '';
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

function mapPostToBlogPost(entry: Post): BlogPost {
  return {
    id: entry._id,
    slug: entry.slug,
    title: entry.title,
    excerpt: generateExcerpt(entry.content),
    content: entry.content,
    coverImage: entry.featured_image,
    featured_image: entry.featured_image,
    categories: Array.isArray(entry.categories) ? entry.categories : [],
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    date: formatDate(entry._created),
    modifiedDate: formatDate(entry._modified),
    readTime: calculateReadTime(entry.content),
    author: AUTHOR_SHUVAM,
    raw: entry,
  };
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  total: number;
}

// Fetch paginated posts with total count
export async function getPaginatedBlogPosts(
  options: ContentItemsListOptions = {}
): Promise<PaginatedBlogPosts> {
  try {
    // Queries the Cockpit collection named 'posts'
    const response = await cockpit.listContentItems<
      PaginatedList<Post> | Post[]
    >('posts', {
      populate: 1,
      sort: {
        _created: -1,
      },
      ...options,
    });

    if (!response) {
      return { posts: [], total: 0 };
    }

    // If skip or limit options were passed, Cockpit returns a PaginatedList structure
    if ('data' in response && Array.isArray(response.data)) {
      const posts = response.data.map(mapPostToBlogPost);
      return {
        posts,
        total: response.meta?.total || posts.length,
      };
    }

    // Otherwise it returns a plain array of posts
    if (Array.isArray(response)) {
      const posts = response.map(mapPostToBlogPost);
      return {
        posts,
        total: posts.length,
      };
    }

    return { posts: [], total: 0 };
  } catch (error) {
    console.error('Error fetching posts from database:', error);
    return { posts: [], total: 0 };
  }
}

// Plug-and-play fetcher: Queries database when configured, otherwise falls back to static content
export async function getBlogPosts(
  options: ContentItemsListOptions = {}
): Promise<BlogPost[]> {
  const result = await getPaginatedBlogPosts(options);
  return result.posts;
}

// Plug-and-play item fetcher by slug: Queries database when configured, otherwise falls back to static content
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
      return mapPostToBlogPost(entry);
    }

    return undefined;
  } catch (error) {
    console.error(
      `Error fetching post by slug "${slug}" from database:`,
      error
    );
    return undefined;
  }
}

// Fetch all posts belonging to a specific category slug
export async function getBlogPostsByCategory(
  categorySlug: string,
  options: ContentItemsListOptions = {}
): Promise<PaginatedBlogPosts> {
  try {
    const category = await cockpit.getContentItemByFilter<Category>(
      'categories',
      {
        filter: { slug: categorySlug },
        fields: { _id: true },
      }
    );

    if (!category?._id) return { posts: [], total: 0 };

    const posts = await getPaginatedBlogPosts({
      ...options,
      filter: {
        ...(options.filter && typeof options.filter === 'object'
          ? options.filter
          : {}),
        categories: { $elemMatch: { _id: category._id } },
      },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return { posts: [], total: 0 };
  }
}

// Fetch all posts belonging to a specific tag slug
export async function getBlogPostsByTag(
  tagSlug: string,
  options: ContentItemsListOptions = {}
): Promise<PaginatedBlogPosts> {
  try {
    const tag = await cockpit.getContentItemByFilter<Tag>('tags', {
      filter: { slug: tagSlug },
    });

    if (!tag?._id) return { posts: [], total: 0 };

    const posts = await getPaginatedBlogPosts({
      ...options,
      filter: {
        ...(options.filter && typeof options.filter === 'object'
          ? options.filter
          : {}),
        tags: { $elemMatch: { _id: tag._id } },
      },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return { posts: [], total: 0 };
  }
}
