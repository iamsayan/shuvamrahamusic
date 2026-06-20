import { Suspense } from 'react';

import type { Metadata } from 'next';

import BlogArchiveClient from '@/components/blog-archive-client';
import JsonLd from '@/components/json-ld';
import SectionLoader from '@/components/section-loader';
import {
  getBlogPostsByCategory,
  getCategories,
  getCategoryBySlug,
} from '@/lib/blog-data';
import { SCHEMA } from '@/lib/schema';
import { formatSchemaDate } from '@/lib/utils';

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
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate static SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Articles',
    };
  }

  return {
    title: `${category.title} Articles`,
    description: `Read all guitar articles, roadmaps, and guides categorized under ${category.title} by instructor Shuvam Raha.`,
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
    openGraph: {
      title: `${category.title} Guitar Articles`,
      description: `Read all articles, exercises, and guides categorized under ${category.title} from Shuvam Raha.`,
      url: `/blog/category/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} Guitar Articles`,
      description: `Read all articles, exercises, and guides categorized under ${category.title} from Shuvam Raha.`,
    },
  };
}

interface ContentProps {
  slug: string;
  searchParams: Promise<{ page?: string }>;
}

async function CategoryArchiveContent({ slug, searchParams }: ContentProps) {
  const { page } = await searchParams;
  const pageNum = Number(page) || 1;

  // Fetch only the paginated slice
  const limit = 6;
  const skip = (pageNum - 1) * limit;
  const { posts, total } = await getBlogPostsByCategory(slug, { limit, skip });

  const categoryName =
    posts[0].categories.find((cat) => cat.slug === slug)?.title || slug;

  const lastSegName =
    pageNum > 1 ? `${categoryName} (Page ${pageNum})` : categoryName;

  return (
    <>
      <JsonLd
        schema={[
          SCHEMA.breadcrumb(`/blog/category/${slug}`, lastSegName),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${categoryName} Guitar Articles - Shuvam Raha Music`,
            description: `All articles and learning resources categorized under ${categoryName}.`,
            url: `${SCHEMA.BASE_URL}/blog/category/${slug}${pageNum > 1 ? `?page=${pageNum}` : ''}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${categoryName} Guitar Articles`,
            description: `All articles and learning resources categorized under ${categoryName}.`,
            url: `${SCHEMA.BASE_URL}/blog/category/${slug}${pageNum > 1 ? `?page=${pageNum}` : ''}`,
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
      <BlogArchiveClient
        title="Category:"
        subtitle={`Browse all articles, patterns, and guides published under ${categoryName}.`}
        type="category"
        term={categoryName}
        posts={posts}
        totalPostsCount={total}
      />
    </>
  );
}

export default async function CategoryArchivePage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={<SectionLoader message="Loading category archive..." />}
    >
      <CategoryArchiveContent slug={slug} searchParams={searchParams} />
    </Suspense>
  );
}
