import { Suspense } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogArchiveClient from '@/components/blog-archive-client';
import JsonLd from '@/components/json-ld';
import { getBlogPostsByCategory } from '@/lib/blog-data';
import cockpit from '@/lib/client';
import { SCHEMA } from '@/lib/schema';
import { Category } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Generate static params for categories dynamically at build time (SSG)
export async function generateStaticParams() {
  const categories = await cockpit.listContentItems('categories', {
    limit: -1,
    fields: {
      slug: true,
    },
  });

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const pageNum = Number(page) || 1;
  const pageSuffix = pageNum > 1 ? ` - Page ${pageNum}` : '';

  const category = await cockpit.getContentItemByFilter<Category>(
    'categories',
    {
      filter: { slug },
      fields: {
        title: true,
      },
    }
  );

  return {
    title: `${category.title} Articles${pageSuffix}`,
    description: `Read all guitar articles, roadmaps, and guides categorized under ${category.title} by instructor Shuvam Raha.`,
    alternates: {
      canonical: `/blog/category/${slug}${pageNum > 1 ? `?page=${pageNum}` : ''}`,
    },
    openGraph: {
      title: `${category.title} Guitar Articles${pageSuffix}`,
      description: `Read all articles, exercises, and guides categorized under ${category.title} from Shuvam Raha.`,
      url: `/blog/category/${slug}${pageNum > 1 ? `?page=${pageNum}` : ''}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} Guitar Articles${pageSuffix}`,
      description: `Read all articles, exercises, and guides categorized under ${category.title} from Shuvam Raha.`,
    },
  };
}

export default async function CategoryArchivePage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const pageNum = Number(page) || 1;

  // Fetch only the paginated slice
  const limit = 6;
  const skip = (pageNum - 1) * limit;
  const { posts, total } = await getBlogPostsByCategory(slug, { limit, skip });

  if (posts.length === 0) {
    notFound();
  }

  const categoryName =
    posts[0].categories.find((cat) => cat.slug === slug)?.title || slug;

  return (
    <>
      <JsonLd
        schema={[
          SCHEMA.breadcrumb(`/blog/category/${slug}`, categoryName),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${categoryName} Guitar Articles - Shuvam Raha Music`,
            description: `All articles and learning resources categorized under ${categoryName}.`,
            url: `${SCHEMA.BASE_URL}/blog/category/${slug}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${categoryName} Guitar Articles`,
            description: `All articles and learning resources categorized under ${categoryName}.`,
            url: `${SCHEMA.BASE_URL}/blog/category/${slug}`,
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
              datePublished: post.date,
              dateModified: post.modifiedDate,
              keywords: post.tags.map((t) => t.title).join(', '),
              author: {
                '@type': 'Person',
                name: post.author.name,
              },
            })),
          },
        ]}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#05050A]" />}>
        <BlogArchiveClient
          title="Category:"
          subtitle={`Browse all articles, patterns, and guides published under ${categoryName}.`}
          type="category"
          term={categoryName}
          posts={posts}
          totalPostsCount={total}
        />
      </Suspense>
    </>
  );
}
