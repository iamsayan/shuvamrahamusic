import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArchiveClient from '@/components/blog-archive-client';
import JsonLd from '@/components/json-ld';
import {
  getBlogPosts,
  getBlogPostsByTag,
} from '@/lib/blog-data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for tags dynamically at build time (SSG)
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const slugs = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tag?.slug) {
        slugs.add(tag.slug);
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
  const posts = await getBlogPostsByTag(slug);

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found | Shuvam Raha Music Blog',
      description: 'The requested blog tag could not be found.',
    };
  }

  // Find exact tag title casing from the post tags list
  let tagName = slug;
  for (const post of posts) {
    const matched = post.tags.find((tag) => tag.slug === slug);
    if (matched) {
      tagName = matched.title;
      break;
    }
  }

  return {
    title: `#${tagName} Articles | Shuvam Raha Music Blog`,
    description: `Read all guitar articles, exercises, and guides tagged with #${tagName} by instructor Shuvam Raha.`,
    alternates: {
      canonical: `/blog/tag/${slug}`,
    },
    openGraph: {
      title: `#${tagName} Guitar Articles - Shuvam Raha Music`,
      description: `Read all articles, exercises, and guides tagged with #${tagName} from Shuvam Raha.`,
      url: `/blog/tag/${slug}`,
      type: 'website',
    },
  };
}

export default async function TagArchivePage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getBlogPostsByTag(slug);

  if (posts.length === 0) {
    notFound();
  }

  // Find exact tag title casing
  let tagName = slug;
  for (const post of posts) {
    const matched = post.tags.find((tag) => tag.slug === slug);
    if (matched) {
      tagName = matched.title;
      break;
    }
  }

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `#${tagName} Guitar Articles - Shuvam Raha Music`,
          description: `All articles and learning resources tagged with #${tagName}.`,
          url: `https://www.shuvamrahamusic.com/blog/tag/${slug}`,
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
      <BlogArchiveClient
        title="Tag:"
        subtitle={`Browse all articles, patterns, and guides tagged with #${tagName}.`}
        type="tag"
        term={`#${tagName}`}
        posts={posts}
      />
    </>
  );
}
