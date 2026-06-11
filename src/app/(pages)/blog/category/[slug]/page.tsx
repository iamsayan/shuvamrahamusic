import { Suspense } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogArchiveClient from '@/components/blog-archive-client';
import JsonLd from '@/components/json-ld';
import { getBlogPosts, getBlogPostsByCategory } from '@/lib/blog-data';

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
  const posts = await getBlogPosts();
  const slugs = new Set<string>();

  posts.forEach((post) => {
    post.categories.forEach((cat) => {
      if (cat?.slug) {
        slugs.add(cat.slug);
      }
    });
  });

  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPostsByCategory(slug);

  if (posts.length === 0) {
    return {
      title: 'Category Not Found | Shuvam Raha Music Blog',
      description: 'The requested blog category could not be found.',
    };
  }

  // Find exact category title casing from the post categories list
  let categoryName = slug;
  for (const post of posts) {
    const matched = post.categories.find((cat) => cat.slug === slug);
    if (matched) {
      categoryName = matched.title;
      break;
    }
  }

  return {
    title: `${categoryName} Archives - Blog`,
    description: `Read all guitar articles, roadmaps, and guides categorized under ${categoryName} by instructor Shuvam Raha.`,
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
    openGraph: {
      title: `${categoryName} Guitar Articles - Shuvam Raha Music`,
      description: `Read all articles, exercises, and guides categorized under ${categoryName} from Shuvam Raha.`,
      url: `/blog/category/${slug}`,
      type: 'website',
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

  // Fetch all posts with minimal fields projection to count total and get category casing
  const allPosts = await getBlogPostsByCategory(slug, {
    fields: { _id: 1, categories: 1 },
  });

  if (allPosts.length === 0) {
    notFound();
  }

  // Find exact category title casing
  let categoryName = slug;
  for (const post of allPosts) {
    const matched = post.categories.find((cat) => cat.slug === slug);
    if (matched) {
      categoryName = matched.title;
      break;
    }
  }

  // Fetch only the paginated slice
  const limit = 6;
  const skip = (pageNum - 1) * limit;
  const posts = await getBlogPostsByCategory(slug, { limit, skip });

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${categoryName} Guitar Articles - Shuvam Raha Music`,
          description: `All articles and learning resources categorized under ${categoryName}.`,
          url: `https://www.shuvamrahamusic.com/blog/category/${slug}`,
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
        <BlogArchiveClient
          title="Category:"
          subtitle={`Browse all articles, patterns, and guides published under ${categoryName}.`}
          type="category"
          term={categoryName}
          posts={posts}
          totalPostsCount={allPosts.length}
        />
      </Suspense>
    </>
  );
}
