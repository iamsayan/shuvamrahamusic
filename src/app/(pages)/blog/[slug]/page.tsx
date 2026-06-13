import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import CockpitImage from '@/components/cockpit-image';
import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import ShareButtons from '@/components/share-buttons';
import {
  BRIGHT_GRADIENTS,
  CATEGORY_THEMES,
  GLOW_COLORS,
  getBlogPostBySlug,
  getBlogPosts,
  getThemeKey,
} from '@/lib/blog-data';
import cockpit from '@/lib/client';
import { SCHEMA } from '@/lib/schema';

import {
  LuArrowLeft,
  LuArrowRight,
  LuCalendar,
  LuChevronRight,
  LuClock,
  LuHistory,
  LuPhone,
} from 'react-icons/lu';

interface ContentTheme {
  blockquoteBorder: string;
  blockquoteBg: string;
  blockquoteStrong: string;
  codeText: string;
  codeBg: string;
  codeBorder: string;
  preBg: string;
  preBorder: string;
  preCode: string;
}

const CONTENT_THEMES: Record<string, ContentTheme> = {
  emerald: {
    blockquoteBorder: 'border-emerald-500',
    blockquoteBg: 'bg-emerald-500/3',
    blockquoteStrong: 'text-emerald-400',
    codeText: 'text-emerald-400',
    codeBg: 'bg-emerald-950/30',
    codeBorder: 'border-emerald-500/10',
    preBg: 'bg-emerald-950/20',
    preBorder: 'border-emerald-500/10',
    preCode: 'text-emerald-300',
  },
  violet: {
    blockquoteBorder: 'border-violet-500',
    blockquoteBg: 'bg-violet-500/3',
    blockquoteStrong: 'text-violet-400',
    codeText: 'text-violet-400',
    codeBg: 'bg-violet-950/30',
    codeBorder: 'border-violet-500/10',
    preBg: 'bg-violet-950/20',
    preBorder: 'border-violet-500/10',
    preCode: 'text-violet-300',
  },
  amber: {
    blockquoteBorder: 'border-amber-500',
    blockquoteBg: 'bg-amber-500/3',
    blockquoteStrong: 'text-amber-400',
    codeText: 'text-amber-400',
    codeBg: 'bg-amber-950/30',
    codeBorder: 'border-amber-500/10',
    preBg: 'bg-amber-950/20',
    preBorder: 'border-amber-500/10',
    preCode: 'text-amber-300',
  },
  rose: {
    blockquoteBorder: 'border-rose-500',
    blockquoteBg: 'bg-rose-500/3',
    blockquoteStrong: 'text-rose-400',
    codeText: 'text-rose-400',
    codeBg: 'bg-rose-950/30',
    codeBorder: 'border-rose-500/10',
    preBg: 'bg-rose-950/20',
    preBorder: 'border-rose-500/10',
    preCode: 'text-rose-300',
  },
  cyan: {
    blockquoteBorder: 'border-cyan-500',
    blockquoteBg: 'bg-cyan-500/3',
    blockquoteStrong: 'text-cyan-400',
    codeText: 'text-cyan-400',
    codeBg: 'bg-cyan-950/30',
    codeBorder: 'border-cyan-500/10',
    preBg: 'bg-cyan-950/20',
    preBorder: 'border-cyan-500/10',
    preCode: 'text-cyan-300',
  },
  default: {
    blockquoteBorder: 'border-cyan-500',
    blockquoteBg: 'bg-cyan-500/3',
    blockquoteStrong: 'text-cyan-400',
    codeText: 'text-cyan-400',
    codeBg: 'bg-cyan-950/30',
    codeBorder: 'border-cyan-500/10',
    preBg: 'bg-cyan-950/20',
    preBorder: 'border-cyan-500/10',
    preCode: 'text-cyan-300',
  },
};

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
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const nextPosts = await getBlogPosts({
    filter: { _created: { $gt: post.raw._created } },
    sort: { _created: 1 },
    limit: 1,
  });
  const prevPosts = await getBlogPosts({
    filter: { _created: { $lt: post.raw._created } },
    sort: { _created: -1 },
    limit: 1,
  });
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
      images: [
        {
          url: cockpit.getImageUrl(post.featured_image._id),
          alt: post.featured_image?.altText || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [cockpit.getImageUrl(post.featured_image._id)],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;

  const primaryCat = post.categories[0]?.title || '';
  const themeKey = getThemeKey(primaryCat);
  const primaryTheme = CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];
  const contentTheme = CONTENT_THEMES[themeKey] || CONTENT_THEMES['default'];

  // Get related and other posts from API (limit to 15 to optimize performance)
  const allPosts = await getBlogPosts({ limit: 15 });

  const nextPosts = await getBlogPosts({
    filter: { _created: { $gt: post.raw._created } },
    sort: { _created: 1 },
    limit: 1,
  });
  const prevPosts = await getBlogPosts({
    filter: { _created: { $lt: post.raw._created } },
    sort: { _created: -1 },
    limit: 1,
  });
  const nextPost = nextPosts[0] || null;
  const prevPost = prevPosts[0] || null;

  // Find posts sharing at least one category with the current post
  const sameCategoryPosts = allPosts.filter(
    (p) =>
      p.slug !== slug &&
      p.categories.some((cat) =>
        post.categories.some((c) => c.slug === cat.slug)
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
    <>
      <JsonLd
        schema={[
          SCHEMA.breadcrumb(`/blog/${post.slug}`, post.title),
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: cockpit.getImageUrl(post.featured_image._id),
            datePublished: post.raw?._created
              ? new Date(post.raw._created * 1000).toISOString()
              : undefined,
            dateModified: post.raw?._modified
              ? new Date(post.raw._modified * 1000).toISOString()
              : undefined,
            wordCount: post.content
              ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
              : undefined,
            articleSection: post.categories.map((c) => c.title).join(', '),
            keywords: post.tags.map((t) => t.title).join(', '),
            inLanguage: 'en-US',
            author: {
              '@type': 'Person',
              name: post.author.name,
              jobTitle: post.author.role,
              image: `${SCHEMA.BASE_URL}${post.author.avatar}`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Shuvam Raha Music',
              url: SCHEMA.BASE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SCHEMA.BASE_URL}/logo.png`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${SCHEMA.BASE_URL}/blog/${post.slug}`,
            },
            isPartOf: {
              '@type': 'Blog',
              '@id': `${SCHEMA.BASE_URL}/blog`,
              name: 'Shuvam Raha Music Blog',
            },
          },
        ]}
      />

      <PageLayout
        title={
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {post.categories.map((cat, idx) => {
                const catThemeKey = getThemeKey(cat.title);
                const catTheme =
                  CATEGORY_THEMES[catThemeKey] || CATEGORY_THEMES['default'];
                return (
                  <Link
                    key={idx}
                    href={`/blog/category/${cat.slug}`}
                    className={`rounded-full border ${catTheme.border} ${catTheme.bg} px-3 py-1 text-[10px] font-black tracking-widest ${catTheme.text} uppercase transition-colors duration-300 hover:bg-white/8`}
                  >
                    {cat.title}
                  </Link>
                );
              })}
            </div>
            <span>{post.title}</span>
          </div>
        }
        variant="plain"
      >
        <div className="flex flex-col">
          {/* Meta Info */}
          <div className="-mt-4 mb-8 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400">
              {/* Author metadata */}
              <div className="flex items-center gap-3">
                <div className="relative size-9 overflow-hidden rounded-full border border-white/10 bg-white/5">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-white">{post.author.name}</p>
                  <p className="text-[10px] text-gray-500">
                    {post.author.role}
                  </p>
                </div>
              </div>

              <div className="hidden h-4 w-px bg-white/10 sm:block" />

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase">
                  <LuCalendar className="size-3.5 text-gray-500" />
                  {post.date}
                </span>
                {post.modifiedDate && post.modifiedDate !== post.date && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    <LuHistory className="size-3.5 text-gray-500" />
                    Updated: {post.modifiedDate}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase">
                  <LuClock className="size-3.5 text-gray-500" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image Banner */}
          <div className="group relative mb-12 overflow-hidden rounded-4xl border border-white/10 bg-white/2 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div
              className={`absolute top-0 left-0 h-0.75 w-full bg-linear-to-r ${BRIGHT_GRADIENTS[themeKey] || BRIGHT_GRADIENTS['default']} z-20 opacity-50`}
            />
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-[#020205]/60 via-transparent to-transparent" />
            <div className="relative aspect-video max-h-125 w-full">
              <CockpitImage
                asset={post.coverImage}
                className="object-cover transition-transform duration-2000 group-hover:scale-[1.01]"
                fill
                preload
              />
            </div>
          </div>

          {/* 2-Column Content Layout */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <div
                className={`blog-content [&_h2]:font-heading [&_h3]:font-heading text-gray-300 [&_blockquote]:border-l-4 [&_em]:text-gray-200 [&_em]:italic [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-white sm:[&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_li]:text-sm [&_li]:text-gray-300 sm:[&_li]:text-base [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-6 [&_p]:text-sm [&_p]:leading-relaxed sm:[&_p]:text-base [&_p:first-of-type]:mb-8 [&_p:first-of-type]:text-base [&_p:first-of-type]:font-medium [&_p:first-of-type]:text-white sm:[&_p:first-of-type]:text-lg sm:[&_p:first-of-type]:leading-relaxed [&_strong]:font-bold [&_strong]:text-white [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_blockquote]:${contentTheme.blockquoteBorder} [&_blockquote]:${contentTheme.blockquoteBg} [&_blockquote]:my-8 [&_blockquote]:rounded-r-2xl [&_blockquote]:p-5 [&_blockquote]:text-gray-200 [&_blockquote]:italic [&_blockquote_strong]:${contentTheme.blockquoteStrong} [&_blockquote_strong]:not-italic [&_code]:font-mono [&_code]:text-xs sm:[&_code]:text-sm [&_code]:${contentTheme.codeText} [&_code]:${contentTheme.codeBg} [&_code]:rounded [&_code]:border [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:${contentTheme.codeBorder} [&_pre]:font-mono [&_pre]:${contentTheme.preBg} [&_pre]:border [&_pre]:${contentTheme.preBorder} [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:p-5 [&_pre_code]:border-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:${contentTheme.preCode} [&_pre_code]:block [&_pre_code]:w-full [&_pre_code]:text-sm`}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags Footer info & Share Buttons */}
              <div className="mt-12 flex flex-col gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="mr-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                      Tags:
                    </span>
                    {post.tags.map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/blog/tag/${tag.slug}`}
                        className={`rounded-full border ${primaryTheme.border} ${primaryTheme.bg} px-3 py-1 text-xs font-bold ${primaryTheme.text} transition-colors duration-300 hover:bg-white/8`}
                      >
                        #{tag.title}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="shrink-0">
                  <ShareButtons post={post} />
                </div>
              </div>

              {/* Previous & Next Article Navigation */}
              {(prevPost || nextPost) && (
                <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/5 pt-8 sm:grid-cols-2">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="group flex flex-col items-start rounded-2xl border border-white/5 bg-white/2 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]"
                    >
                      <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-gray-500 uppercase transition-colors group-hover:text-cyan-400">
                        <LuArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
                        Previous Article
                      </span>
                      <span className="mt-1.5 line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-cyan-400">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group flex flex-col items-end rounded-2xl border border-white/5 bg-white/2 p-5 text-right backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]"
                    >
                      <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-gray-500 uppercase transition-colors group-hover:text-cyan-400">
                        Next Article
                        <LuArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1.5 line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-cyan-400">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:sticky lg:top-28 lg:col-span-1">
              <div className="space-y-6">
                {/* Author Info Widget */}
                <div className="rounded-2xl border border-white/4 bg-white/1 p-6 backdrop-blur-md">
                  <h3 className="font-heading mb-4 text-xs font-black tracking-widest text-gray-500 uppercase">
                    About The Author
                  </h3>
                  <div className="mb-4 flex items-center gap-3.5">
                    <div className="relative size-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {post.author.name}
                      </h4>
                      <p
                        className={`text-[10px] font-semibold ${primaryTheme.text} uppercase`}
                      >
                        Instructor
                      </p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">
                    {post.author.bio}
                  </p>
                </div>

                {/* Promotional CTA Box */}
                <div className="group/card relative overflow-hidden rounded-2xl border border-white/10 bg-[#07070F]/90 p-6 shadow-xl backdrop-blur-xl">
                  {/* Glowing Top Strip */}
                  <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-60" />

                  <h3 className="font-heading mb-2 text-base font-extrabold text-white">
                    Master the Guitar
                  </h3>
                  <p className="mb-6 text-xs leading-relaxed text-gray-400">
                    Join 600+ students globally. Learn in 30 days with
                    personalized 1-on-1 coaching online or in the Kolkata
                    studio.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="https://calendly.com/shuvamraha10/intro-call"
                      className="group/btn font-heading relative flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-xs font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all hover:scale-102 active:scale-98"
                    >
                      <LuPhone className="size-4" />
                      Book Free Intro Call
                    </Link>
                    <Link
                      href="/guitar-classes-with-shuvam"
                      className="font-heading flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/2 py-3 text-xs font-bold text-white transition-all hover:bg-white/5 active:scale-98"
                    >
                      Explore Programs
                      <LuArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Recent Articles Widget */}
                <div className="rounded-2xl border border-white/4 bg-white/1 p-6 backdrop-blur-md">
                  <h3 className="font-heading mb-4 text-xs font-black tracking-widest text-gray-500 uppercase">
                    Other Articles
                  </h3>
                  <div className="flex flex-col gap-4">
                    {otherArticlesPosts.map((rPost) => {
                      const rPrimaryCat = rPost.categories[0]?.title || '';
                      const rThemeKey = getThemeKey(rPrimaryCat);
                      const rTheme =
                        CATEGORY_THEMES[rThemeKey] ||
                        CATEGORY_THEMES['default'];
                      return (
                        <Link
                          key={rPost.id}
                          href={`/blog/${rPost.slug}`}
                          className="group flex gap-3 text-left"
                        >
                          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                            <CockpitImage
                              asset={rPost.coverImage}
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              fill
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4
                              className={`line-clamp-2 text-xs leading-snug font-bold text-gray-300 group-hover:${rTheme.text} transition-colors duration-300`}
                            >
                              {rPost.title}
                            </h4>
                            <span className="mt-1 text-[9px] font-semibold text-gray-500 uppercase">
                              {rPost.date}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts Bottom Section */}
          {keepReadingPosts.length > 0 && (
            <div className="mt-20 border-t border-white/5 pt-16">
              <h2 className="font-heading mb-8 text-xl font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
                Keep{' '}
                <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Reading
                </span>
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {keepReadingPosts.map((rPost) => {
                  const rPrimaryCat = rPost.categories[0]?.title || '';
                  const rThemeKey = getThemeKey(rPrimaryCat);
                  const rTheme =
                    CATEGORY_THEMES[rThemeKey] || CATEGORY_THEMES['default'];
                  return (
                    <div
                      key={rPost.id}
                      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/4 bg-white/1 transition-all duration-500 hover:${rTheme.border} hover:bg-white/3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]`}
                    >
                      {/* Glowing Top Accent Strip */}
                      <div
                        className={`absolute top-0 left-0 h-0.75 w-full bg-linear-to-r ${BRIGHT_GRADIENTS[rThemeKey] || BRIGHT_GRADIENTS['default']} z-20 opacity-20 transition-opacity duration-500 group-hover:opacity-90`}
                      />

                      {/* Inner accent glow on hover */}
                      <div
                        className={`pointer-events-none absolute -right-16 -bottom-16 rounded-full ${GLOW_COLORS[rThemeKey] || GLOW_COLORS['default']} z-0 size-36 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100`}
                      />

                      <div>
                        <div className="relative aspect-video w-full overflow-hidden">
                          <CockpitImage
                            asset={rPost.coverImage}
                            className="object-cover transition-transform duration-1000 group-hover:scale-103"
                            fill
                          />
                        </div>

                        <div className="p-5">
                          {/* Date & Read Time metadata */}
                          <div className="mb-2.5 flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase">
                            <span className="flex items-center gap-1">
                              <LuCalendar className="size-3" />
                              {rPost.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <LuClock className="size-3" />
                              {rPost.readTime}
                            </span>
                          </div>

                          <h3
                            className={`font-heading mb-2.5 text-sm leading-snug font-extrabold text-white group-hover:${rTheme.text} transition-colors duration-300`}
                          >
                            <Link
                              href={`/blog/${rPost.slug}`}
                              className="after:absolute after:inset-0"
                            >
                              {rPost.title}
                            </Link>
                          </h3>

                          <p className="mb-4 line-clamp-2 text-xs text-gray-400">
                            {rPost.excerpt}
                          </p>

                          {/* Categories (First 3 only) */}
                          <div className="relative z-10 flex flex-wrap gap-1.5">
                            {rPost.categories.slice(0, 3).map((cat, idx) => {
                              const catThemeKey = getThemeKey(cat.title);
                              const catTheme =
                                CATEGORY_THEMES[catThemeKey] ||
                                CATEGORY_THEMES['default'];
                              return (
                                <Link
                                  key={idx}
                                  href={`/blog/category/${cat.slug}`}
                                  className={`rounded-full border ${catTheme.border} bg-white/2 px-2.5 py-0.5 text-[9px] font-black tracking-widest ${catTheme.text} uppercase transition-colors duration-300 hover:bg-white/8`}
                                >
                                  {cat.title}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/4 p-5 pt-3">
                        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase transition-colors duration-300 group-hover:text-white">
                          Read Article
                        </span>
                        <Link
                          href={`/blog/${rPost.slug}`}
                          className={`relative z-10 ${rTheme.text} transition-transform duration-300 hover:translate-x-1`}
                        >
                          <LuChevronRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
}
