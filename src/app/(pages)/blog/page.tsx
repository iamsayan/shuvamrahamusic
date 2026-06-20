import { Suspense } from 'react';

import type { Metadata } from 'next';

import BlogListingClient from '@/components/blog-listing-client';
import JsonLd from '@/components/json-ld';
import SectionLoader from '@/components/section-loader';
import { getPaginatedBlogPosts } from '@/lib/blog-data';
import { SCHEMA } from '@/lib/schema';
import { formatSchemaDate } from '@/lib/utils';

interface BlogQueryParams {
  pageNum: number;
  limit: number;
  skip: number;
  filter: Record<string, unknown>;
}

function parseBlogQueryParams(page?: string, search?: string): BlogQueryParams {
  const pageNum = Number(page) || 1;
  const limit = pageNum === 1 ? 10 : 9;
  const skip = pageNum === 1 ? 0 : 10 + (pageNum - 2) * 9;

  const filter: Record<string, unknown> = {};
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  return { pageNum, limit, skip, filter };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}): Promise<Metadata> {
  const { page, search } = await searchParams;
  const { pageNum, limit, skip, filter } = parseBlogQueryParams(page, search);
  const pageSuffix = pageNum > 1 ? ` - Page ${pageNum}` : '';

  // Retrieve the total post count using the exact same query parameters so Next.js fetch cache deduplicates it
  let total = 0;
  try {
    const res = await getPaginatedBlogPosts({
      filter,
      limit,
      skip,
    });
    total = res.total;
  } catch (err) {
    console.error('Failed to get total count in generateMetadata:', err);
  }

  const hasPrev = pageNum > 1;
  const hasNext = pageNum === 1 ? total > 10 : 10 + (pageNum - 1) * 9 < total;

  const prevUrl = hasPrev
    ? `${SCHEMA.BASE_URL}/blog${pageNum - 1 > 1 ? `?page=${pageNum - 1}` : ''}`
    : null;
  const nextUrl = hasNext
    ? `${SCHEMA.BASE_URL}/blog?page=${pageNum + 1}`
    : null;

  return {
    title: `Learn Guitar, Play Your Favorite Songs${pageSuffix}`,
    description: `Explore guitar learning guides, hand exercises, strumming patterns, and gear reviews from LCM-certified instructor Shuvam Raha.${pageSuffix}`,
    alternates: {
      canonical: `/blog${pageNum > 1 ? `?page=${pageNum}` : ''}`,
    },
    pagination: {
      ...(prevUrl ? { previous: prevUrl } : {}),
      ...(nextUrl ? { next: nextUrl } : {}),
    },
    openGraph: {
      title: `Guitar Learning Blog${pageSuffix}`,
      description: `Explore guitar learning guides, hand exercises, strumming patterns, and gear reviews from Shuvam Raha.${pageSuffix}`,
      url: `/blog${pageNum > 1 ? `?page=${pageNum}` : ''}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Guitar Learning Blog${pageSuffix}`,
      description: `Explore guitar learning guides, hand exercises, strumming patterns, and gear reviews from Shuvam Raha.${pageSuffix}`,
    },
  };
}

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}) {
  const { page, search } = await searchParams;
  const { pageNum, limit, skip, filter } = parseBlogQueryParams(page, search);

  const { posts, total } = await getPaginatedBlogPosts({
    filter,
    limit,
    skip,
  });

  const lastSegName = pageNum > 1 ? `Blog (Page ${pageNum})` : 'Blog';

  return (
    <Suspense fallback={<SectionLoader message="Loading articles..." />}>
      <JsonLd
        schema={[
          SCHEMA.breadcrumb('/blog', lastSegName),
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Shuvam Raha Music',
            url: SCHEMA.BASE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SCHEMA.BASE_URL}/blog?search={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Shuvam Raha Music Blog',
            description:
              'Practical guides, finger exercises, gear reviews, and roadmaps from Shuvam Raha to help you learn guitar and master your favorite songs.',
            url: `${SCHEMA.BASE_URL}/blog${pageNum > 1 ? `?page=${pageNum}` : ''}`,
            publisher: {
              '@type': 'Person',
              name: 'Shuvam Raha',
              sameAs: SCHEMA.BASE_URL,
            },
            blogPost: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              url: `${SCHEMA.BASE_URL}/blog/${post.slug}`,
              datePublished: formatSchemaDate(post.raw?._created),
              dateModified: formatSchemaDate(post.raw?._modified),
              keywords: post.tags.map((t) => t.title).join(', '),
              author: {
                '@type': 'Person',
                name: post.author.name,
              },
            })),
          },
        ]}
      />
      <BlogListingClient posts={posts} totalPostsCount={total} />
    </Suspense>
  );
}
