import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArchiveClient from '@/components/blog-archive-client';
import JsonLd from '@/components/json-ld';
import {
  getBlogPosts,
  getBlogPostsByCategory,
} from '@/lib/blog-data';

interface PageProps {
  params: Promise<{
    slug: string;
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
}: PageProps): Promise<Metadata> {
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
    title: `${categoryName} Archives | Shuvam Raha Music Blog`,
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

export default async function CategoryArchivePage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getBlogPostsByCategory(slug);

  if (posts.length === 0) {
    notFound();
  }

  // Find exact category title casing
  let categoryName = slug;
  for (const post of posts) {
    const matched = post.categories.find((cat) => cat.slug === slug);
    if (matched) {
      categoryName = matched.title;
      break;
    }
  }

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
            keywords: post.tags.join(', '),
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
          })),
        }}
      />
      <BlogArchiveClient
        title="Category:"
        subtitle={`Browse all articles, patterns, and guides published under ${categoryName}.`}
        type="category"
        term={categoryName}
        posts={posts}
      />
    </>
  );
}
