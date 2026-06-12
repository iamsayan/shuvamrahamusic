import type { MetadataRoute } from 'next';

import { getBlogPosts } from '@/lib/blog-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Static routes
  const staticRoutes = [
    '',
    '/biography',
    '/guitar-classes-with-shuvam',
    '/guitar-classes-with-shuvam/pay',
    '/my-gears',
    '/performance-highlights',
    '/privacy-policy',
    '/refund-policy',
    '/terms-of-service',
    '/tutorials',
    '/gallery/audios',
    '/gallery/videos',
    '/gallery/photos',
    //'/tools/fretboard-trainer',
    // '/tools/rhythm-workshop',
    '/blog',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch dynamic blog posts
  try {
    const posts = await getBlogPosts({ limit: -1 });

    // Add blog posts
    const blogEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    sitemapEntries.push(...blogEntries);

    // Extract unique categories and tags
    const categorySlugs = new Set<string>();
    const tagSlugs = new Set<string>();

    posts.forEach((post) => {
      post.categories?.forEach((cat) => {
        if (cat.slug) categorySlugs.add(cat.slug);
      });
      post.tags?.forEach((tag) => {
        if (tag.slug) tagSlugs.add(tag.slug);
      });
    });

    // Add category routes
    categorySlugs.forEach((catSlug) => {
      sitemapEntries.push({
        url: `${baseUrl}/blog/category/${catSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.4,
      });
    });

    // Add tag routes
    tagSlugs.forEach((tagSlug) => {
      sitemapEntries.push({
        url: `${baseUrl}/blog/tag/${tagSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.3,
      });
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return sitemapEntries;
}
