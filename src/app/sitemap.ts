import type { MetadataRoute } from 'next';

import { getBlogPosts } from '@/lib/blog-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Static routes (excluding /blog, which is dynamic based on post updates)
  const staticRoutes = [
    '',
    '/biography',
    '/guitar-classes-with-shuvam',
    '/guitar-classes-with-shuvam/pay',
    '/guitar-classes-with-shuvam/payment-history',
    '/my-gears',
    '/performance-highlights',
    '/privacy-policy',
    '/refund-policy',
    '/terms-of-service',
    '/tutorials',
    '/audios',
    '/videos',
    '/photos',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch dynamic blog posts
  try {
    // Stagger the fetch longer (e.g. 2.5s) to ensure concurrent page rendering workers
    // have finished their execution and populated the cache before the sitemap runs.
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Project only the necessary fields (slug, categories, tags) to reduce payload size,
    // memory footprint, and database CPU stress.
    const posts = await getBlogPosts({
      limit: 999,
      fields: {
        slug: true,
        categories: true,
        tags: true,
      },
    });

    // Find the latest post update date
    let latestPostDate = new Date();
    if (posts.length > 0) {
      const dates = posts.map((post) =>
        post.raw?._modified
          ? post.raw._modified * 1000
          : post.raw?._created
            ? post.raw._created * 1000
            : Date.now()
      );
      latestPostDate = new Date(Math.max(...dates));
    }

    // Add /blog dynamically with the latest post date
    sitemapEntries.push({
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'daily',
      priority: 0.8,
    });

    // Add blog posts
    const blogEntries = posts.map((post) => {
      const lastMod = post.raw?._modified
        ? new Date(post.raw._modified * 1000)
        : post.raw?._created
          ? new Date(post.raw._created * 1000)
          : new Date();

      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: lastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });
    sitemapEntries.push(...blogEntries);

    // Extract unique categories and tags with their latest modification date
    const categoriesMap = new Map<string, Date>();
    const tagsMap = new Map<string, Date>();

    posts.forEach((post) => {
      const postDate = post.raw?._modified
        ? new Date(post.raw._modified * 1000)
        : post.raw?._created
          ? new Date(post.raw._created * 1000)
          : new Date();

      post.categories?.forEach((cat) => {
        if (cat.slug) {
          const currentLatest = categoriesMap.get(cat.slug);
          if (!currentLatest || postDate > currentLatest) {
            categoriesMap.set(cat.slug, postDate);
          }
        }
      });
      post.tags?.forEach((tag) => {
        if (tag.slug) {
          const currentLatest = tagsMap.get(tag.slug);
          if (!currentLatest || postDate > currentLatest) {
            tagsMap.set(tag.slug, postDate);
          }
        }
      });
    });

    // Add category routes
    categoriesMap.forEach((lastMod, catSlug) => {
      sitemapEntries.push({
        url: `${baseUrl}/blog/category/${catSlug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.4,
      });
    });

    // Add tag routes
    tagsMap.forEach((lastMod, tagSlug) => {
      sitemapEntries.push({
        url: `${baseUrl}/blog/tag/${tagSlug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.3,
      });
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Dynamic fetch failed, push fallback for blog index so it's not omitted from the sitemap
    sitemapEntries.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  return sitemapEntries;
}
