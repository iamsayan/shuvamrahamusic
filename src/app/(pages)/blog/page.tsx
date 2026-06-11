import { Suspense } from 'react';

import type { Metadata } from 'next';

import BlogListingClient from '@/components/blog-listing-client';
import JsonLd from '@/components/json-ld';
import { getPaginatedBlogPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Learn Guitar, Play Your Favorite Songs',
  description:
    'Explore guitar learning guides, hand exercises, strumming patterns, and gear reviews from LCM-certified instructor Shuvam Raha.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Guitar Learning Blog - Shuvam Raha Music',
    description:
      'Explore guitar learning guides, hand exercises, strumming patterns, and gear reviews from Shuvam Raha.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guitar Learning Blog - Shuvam Raha Music',
    description:
      'Explore guitar learning guides, hand exercises, strumming patterns, and gear reviews from Shuvam Raha.',
  },
};

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}) {
  const { page, search } = await searchParams;
  const pageNum = Number(page) || 1;
  const limit = pageNum === 1 ? 10 : 9;
  const skip = pageNum === 1 ? 0 : 10 + (pageNum - 2) * 9;

  // Build query filter
  const filter: Record<string, unknown> = {};
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  const { posts, total } = await getPaginatedBlogPosts({
    filter,
    limit,
    skip,
  });

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Shuvam Raha Music Blog',
          description:
            'Practical guides, finger exercises, gear reviews, and roadmaps from Shuvam Raha to help you learn guitar and master your favorite songs.',
          url: 'https://www.shuvamrahamusic.com/blog',
          publisher: {
            '@type': 'Person',
            name: 'Shuvam Raha',
            sameAs: 'https://www.shuvamrahamusic.com',
          },
          blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `https://www.shuvamrahamusic.com/blog/${post.slug}`,
            datePublished: post.date,
            keywords: post.tags.map((t) => t.title).join(', '),
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
          })),
        }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#05050A]" />}>
        <BlogListingClient posts={posts} totalPostsCount={total} />
      </Suspense>
    </>
  );
}
