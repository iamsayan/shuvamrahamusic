import type { Metadata } from 'next';
import BlogListingClient from '@/components/blog-listing-client';
import JsonLd from '@/components/json-ld';
import { getBlogPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog | Learn Guitar, Play Your Favorite Songs',
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

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Shuvam Raha Music Blog',
          description:
            'Practical guides, finger exercises, gear reviews, and roadmaps from Shuvam Raha to help you learn guitar and master your favorite songs.',
          url: 'https://shuvamrahamusic.com/blog',
          publisher: {
            '@type': 'Person',
            name: 'Shuvam Raha',
            sameAs: 'https://shuvamrahamusic.com',
          },
          blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `https://shuvamrahamusic.com/blog/${post.slug}`,
            datePublished: post.date,
            keywords: post.tags.join(', '),
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
          })),
        }}
      />
      <BlogListingClient posts={posts} />
    </>
  );
}
