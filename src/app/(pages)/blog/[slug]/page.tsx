import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import BlogPostClient from '@/components/blog-post-client';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-data';
import { AUTHOR_SHUVAM, BlogPost } from '@/lib/blog-shared';
import type { Asset } from '@/lib/client';
import cockpit from '@/lib/client';
import { SCHEMA } from '@/lib/schema';
import type { Post } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all dynamic blog routes
export async function generateStaticParams() {
  const posts = await getBlogPosts({
    fields: {
      slug: true,
    },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata generation for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const draft = await draftMode();
  const isDraft = draft.isEnabled;

  const post = await getBlogPostBySlug(
    slug,
    isDraft ? { filter: { slug, _state: { $in: [0, 1] } } } : {}
  );

  if (!post) {
    if (isDraft) {
      return {
        title: 'Draft Post',
        description: 'Creating your new blog post!',
      };
    }

    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const nextPosts = post.raw?._created
    ? await getBlogPosts({
        filter: { _created: { $gt: post.raw._created } },
        sort: { _created: 1 },
        limit: 1,
      })
    : [];
  const prevPosts = post.raw?._created
    ? await getBlogPosts({
        filter: { _created: { $lt: post.raw._created } },
        sort: { _created: -1 },
        limit: 1,
      })
    : [];
  const nextPost = nextPosts[0] || null;
  const prevPost = prevPosts[0] || null;

  return {
    title: `${post.title} - Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    pagination: {
      ...(prevPost
        ? { previous: `${SCHEMA.BASE_URL}/blog/${prevPost.slug}` }
        : {}),
      ...(nextPost ? { next: `${SCHEMA.BASE_URL}/blog/${nextPost.slug}` } : {}),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: post.coverImage?._id
        ? [
            {
              url: cockpit.getImageUrl(post.coverImage._id),
              alt: post.coverImage?.altText || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?._id
        ? [cockpit.getImageUrl(post.coverImage._id)]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Retrieve Next.js Draft Mode status
  const draft = await draftMode();
  const isDraft = draft.isEnabled;

  let post = await getBlogPostBySlug(
    slug,
    isDraft ? { filter: { slug, _state: { $in: [0, 1] } } } : {}
  );

  if (!post) {
    if (isDraft) {
      // Mock skeleton post structure so client hook can mount and overwrite in real-time
      post = {
        id: 'new-draft',
        slug: slug,
        title: 'Draft Post Preview',
        excerpt: 'Writing draft post content...',
        content:
          '<p>Start typing in the editor to see your live preview here.</p>',
        coverImage: { _id: '', path: '' } as unknown as Asset,
        categories: [],
        tags: [],
        date: new Date().toLocaleDateString(),
        modifiedDate: new Date().toLocaleDateString(),
        readTime: 'Draft',
        author: AUTHOR_SHUVAM,
        raw: {} as unknown as Post,
      } as BlogPost;
    } else {
      notFound();
    }
  }

  // Get related and other posts from API (limit to 15 to optimize performance)
  const allPosts = await getBlogPosts({ limit: 15 });

  const nextPosts = post.raw?._created
    ? await getBlogPosts({
        filter: { _created: { $gt: post.raw._created } },
        sort: { _created: 1 },
        limit: 1,
      })
    : [];
  const prevPosts = post.raw?._created
    ? await getBlogPosts({
        filter: { _created: { $lt: post.raw._created } },
        sort: { _created: -1 },
        limit: 1,
      })
    : [];
  const nextPost = nextPosts[0] || null;
  const prevPost = prevPosts[0] || null;

  // Find posts sharing at least one category with the current post
  const sameCategoryPosts = allPosts.filter(
    (p) =>
      p.slug !== slug &&
      p.categories.some((cat) =>
        post!.categories.some((c) => c.slug === cat.slug)
      )
  );

  // Keep Reading posts (prioritize same category, max 3)
  const keepReadingPosts = [
    ...sameCategoryPosts,
    ...allPosts.filter(
      (p) =>
        p.slug !== slug && !sameCategoryPosts.some((x) => x.slug === p.slug)
    ),
  ].slice(0, 3);

  // Other Articles posts (different from keepReadingPosts and current post, max 3)
  const otherArticlesPosts = allPosts
    .filter(
      (p) => p.slug !== slug && !keepReadingPosts.some((k) => k.slug === p.slug)
    )
    .slice(0, 3);

  return (
    <BlogPostClient
      initialPost={post}
      nextPost={nextPost}
      prevPost={prevPost}
      keepReadingPosts={keepReadingPosts}
      otherArticlesPosts={otherArticlesPosts}
    />
  );
}
