'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import BlogPostCard from '@/components/blog-post-card';
import PageLayout from '@/components/page-layout';
import {
  BRIGHT_GRADIENTS,
  BlogPost,
  CATEGORY_THEMES,
  getThemeKey,
} from '@/lib/blog-shared';

import {
  LuArrowRight,
  LuBookOpen,
  LuChevronLeft,
  LuChevronRight,
  LuPhone,
} from 'react-icons/lu';

interface BlogArchiveClientProps {
  title: string;
  subtitle: string;
  type: 'category' | 'tag';
  term: string;
  posts: BlogPost[];
  totalPostsCount: number;
}

export default function BlogArchiveClient({
  title,
  subtitle,
  type,
  term,
  posts,
  totalPostsCount,
}: BlogArchiveClientProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Already paginated on the server
  const paginatedPosts = posts;

  const totalPages = Math.ceil(totalPostsCount / posts.length);

  const getPageLink = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(pageNum));
    return `${pathname}?${params.toString()}`;
  };

  // Determine theme based on category name (or default for tags)
  const themeKey = type === 'category' ? getThemeKey(term) : 'default';

  const primaryTheme = CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];

  return (
    <PageLayout
      title={
        <>
          {title}{' '}
          <span
            className={`bg-linear-to-r ${BRIGHT_GRADIENTS[themeKey] || BRIGHT_GRADIENTS['default']} bg-clip-text text-transparent`}
          >
            {term}
          </span>
        </>
      }
      subtitle={subtitle}
      variant="plain"
    >
      {/* If no articles found */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-[#07070F]/85 p-12 text-center backdrop-blur-3xl md:p-20">
          <LuBookOpen className="mb-6 size-12 animate-pulse text-gray-600" />
          <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
            No Articles Found
          </h3>
          <p className="mt-2 max-w-sm text-xs text-gray-400 sm:text-sm">
            We couldn&apos;t find any articles under this {type}.
          </p>
          <Link
            href="/blog"
            className="font-heading mt-6 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/10"
          >
            Back to Blog
          </Link>
        </div>
      ) : (
        <div className="mt-8 mb-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {currentPage === 1 ? (
                <span
                  className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-xl border border-white/5 bg-white/1 text-gray-400 opacity-30"
                  aria-label="Previous Page (disabled)"
                >
                  <LuChevronLeft className="size-4" />
                </span>
              ) : (
                <Link
                  href={getPageLink(currentPage - 1)}
                  className="inline-flex size-9 items-center justify-center rounded-xl border border-white/5 bg-white/1 text-gray-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
                  aria-label="Previous Page"
                >
                  <LuChevronLeft className="size-4" />
                </Link>
              )}

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = pageNum === currentPage;
                return isCurrent ? (
                  <span
                    key={pageNum}
                    className={`inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-xs font-bold ${primaryTheme.text}`}
                  >
                    {pageNum}
                  </span>
                ) : (
                  <Link
                    key={pageNum}
                    href={getPageLink(pageNum)}
                    className="inline-flex size-9 items-center justify-center rounded-xl border border-white/5 bg-white/3 text-xs font-medium text-gray-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {currentPage === totalPages ? (
                <span
                  className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-xl border border-white/5 bg-white/1 text-gray-400 opacity-30"
                  aria-label="Next Page (disabled)"
                >
                  <LuChevronRight className="size-4" />
                </span>
              ) : (
                <Link
                  href={getPageLink(currentPage + 1)}
                  className="inline-flex size-9 items-center justify-center rounded-xl border border-white/5 bg-white/1 text-gray-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white"
                  aria-label="Next Page"
                >
                  <LuChevronRight className="size-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      {/* CTA Section Card (Matching design cards of the site) */}
      <div className="group/card relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#07070F]/85 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-500 hover:border-cyan-500/20 sm:p-12">
        {/* Glowing Top Accent Strip */}
        <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-60" />
        <div className="pointer-events-none absolute -top-[40%] -right-[10%] size-75 rounded-full bg-cyan-600/10 blur-[100px]" />

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              Guitar Classes
            </span>
            <h2 className="font-heading mb-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ready to Accelerate Your{' '}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Guitar Journey?
              </span>
            </h2>
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm md:text-base">
              Learning from articles is great, but nothing beats real-time
              1-on-1 feedback. Book a free introductory call with Shuvam Raha to
              analyze your playstyle and design a custom learning roadmap.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="https://calendly.com/shuvamraha10/intro-call"
              className="group/btn font-heading relative inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 sm:text-sm"
            >
              <LuPhone className="size-4" />
              Book Free Call
              <LuArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
