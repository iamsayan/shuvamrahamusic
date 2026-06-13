'use server';

import { getBlogPosts } from '@/lib/blog-data';

export async function searchBlogPostsAction(query: string) {
  if (!query || query.trim() === '') {
    return [];
  }

  try {
    const posts = await getBlogPosts({
      filter: {
        title: { $regex: query, $options: 'i' },
      },
      limit: 5,
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.categories[0]?.title || 'Guitar Tips',
    }));
  } catch (error) {
    console.error('Error in searchBlogPostsAction server action:', error);
    return [];
  }
}
