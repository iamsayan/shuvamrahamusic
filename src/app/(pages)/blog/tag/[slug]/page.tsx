import { Suspense } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SectionLoader from '@/components/section-loader';
import BlogArchiveClient from '@/components/blog-archive-client';
import JsonLd from '@/components/json-ld';
import { getBlogPostsByTag, getTags, getTagBySlug } from '@/lib/blog-data';
import { SCHEMA } from '@/lib/schema';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Generate static params for tags dynamically at build time (SSG)
export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

// Generate static SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return {
      title: 'Tag Articles',
    };
  }

  return {
    title: `#${tag.title} Articles`,
    description: `Read all guitar articles, exercises, and guides tagged with #${tag.title} by instructor Shuvam Raha.`,
    alternates: {
      canonical: `/blog/tag/${slug}`,
    },
    openGraph: {
      title: `#${tag.title} Guitar Articles`,
      description: `Read all articles, exercises, and guides tagged with #${tag.title} from Shuvam Raha.`,
      url: `/blog/tag/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `#${tag.title} Guitar Articles`,
      description: `Read all articles, exercises, and guides tagged with #${tag.title} from Shuvam Raha.`,
    },
  };
}

interface ContentProps {
  slug: string;
  searchParams: Promise<{ page?: string }>;
}

async function TagArchiveContent({ slug, searchParams }: ContentProps) {
  const { page } = await searchParams;
  const pageNum = Number(page) || 1;

  // Fetch only the paginated slice
  const limit = 6;
  const skip = (pageNum - 1) * limit;
  const { posts, total } = await getBlogPostsByTag(slug, { limit, skip });

  if (posts.length === 0) {
    notFound();
  }

  const tagName = posts[0].tags.find((tag) => tag.slug === slug)?.title || slug;

  return (
    <>
      <JsonLd
        schema={[
          SCHEMA.breadcrumb(`/blog/tag/${slug}`, `#${tagName}`),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `#${tagName} Guitar Articles - Shuvam Raha Music`,
            description: `All articles and learning resources tagged with #${tagName}.`,
            url: `${SCHEMA.BASE_URL}/blog/tag/${slug}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `#${tagName} Guitar Articles`,
            description: `All articles and learning resources tagged with #${tagName}.`,
            url: `${SCHEMA.BASE_URL}/blog/tag/${slug}`,
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
              datePublished: post.raw?._created
                ? new Date(post.raw._created * 1000).toISOString()
                : undefined,
              dateModified: post.raw?._modified
                ? new Date(post.raw._modified * 1000).toISOString()
                : undefined,
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
        title="Tag:"
        subtitle={`Browse all articles, patterns, and guides tagged with #${tagName}.`}
        type="tag"
        term={`#${tagName}`}
        posts={posts}
        totalPostsCount={total}
      />
    </>
  );
}

export default async function TagArchivePage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SectionLoader message="Loading tag archive..." />}>
      <TagArchiveContent slug={slug} searchParams={searchParams} />
    </Suspense>
  );
}
