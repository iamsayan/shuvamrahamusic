import { cacheLife, cacheTag } from 'next/cache';

import { BlogPost, mapPostToBlogPost } from '@/lib/blog-shared';
import cockpit, {
  ContentItemGetByFilterOptions,
  ContentItemsListOptions,
  PaginatedList,
} from '@/lib/client';
import { Category, Post, Tag } from '@/types';

export * from '@/lib/blog-shared';

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  total: number;
}

// Fetch paginated posts with total count
export async function getPaginatedBlogPosts(
  options: ContentItemsListOptions = {}
): Promise<PaginatedBlogPosts> {
  'use cache';
  cacheLife('weeks');
  cacheTag('posts');

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
  'use cache';
  cacheLife('weeks');
  cacheTag('posts', `post-${slug}`);

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
  'use cache';
  cacheLife('weeks');
  cacheTag('posts', 'categories', `category-${categorySlug}`);

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
  'use cache';
  cacheLife('weeks');
  cacheTag('posts', 'tags', `tag-${tagSlug}`);

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

export async function getCategories(): Promise<Category[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('categories');
  return cockpit.listContentItems<Category[]>('categories', {
    sort: { name: 1 },
    limit: 999,
  });
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  'use cache';
  cacheLife('weeks');
  cacheTag('categories', `category-${slug}`);
  return cockpit.getContentItemByFilter<Category>('categories', {
    filter: { slug },
  });
}

export async function getTags(): Promise<Tag[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('tags');
  return cockpit.listContentItems<Tag[]>('tags', {
    sort: { name: 1 },
    limit: 999,
  });
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  'use cache';
  cacheLife('weeks');
  cacheTag('tags', `tag-${slug}`);
  return cockpit.getContentItemByFilter<Tag>('tags', {
    filter: { slug },
  });
}
