'use client';

import { useMemo } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import BlogPostCard from '@/components/blog-post-card';
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

const POSTS_PER_PAGE = 6;

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

  const totalPages = useMemo(() => {
    return Math.ceil(totalPostsCount / POSTS_PER_PAGE);
  }, [totalPostsCount]);

  const getPageLink = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(pageNum));
    return `${pathname}?${params.toString()}`;
  };

  // Determine theme based on category name (or default for tags)
  const themeKey = useMemo(() => {
    return type === 'category' ? getThemeKey(term) : 'default';
  }, [type, term]);

  const primaryTheme = CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];

  return (
    <div className="relative min-h-screen bg-[#05050A] pt-24 pb-24 text-[#f0f0f5]">
      <div className="relative z-10 mx-auto w-full max-w-350 px-5 md:px-12 lg:px-20">
        <div className="flex w-full flex-col pt-8 pb-6">
          {/* Breadcrumbs */}
          <nav className="font-heading mb-6 flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase sm:text-xs">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-white"
            >
              Home
            </Link>
            <span className="text-[10px] font-normal text-gray-700 sm:text-xs">
              /
            </span>
            <Link
              href="/blog"
              className="transition-colors duration-200 hover:text-white"
            >
              Blog
            </Link>
            <span className="text-[10px] font-normal text-gray-700 sm:text-xs">
              /
            </span>
            <span className="text-gray-500 uppercase">{type}</span>
            <span className="text-[10px] font-normal text-gray-700 sm:text-xs">
              /
            </span>
            <span className={`font-black tracking-wide ${primaryTheme.text}`}>
              {term}
            </span>
          </nav>

          {/* Header Title */}
          <div className="max-w-2xl">
            <h1 className="font-heading mb-4 bg-linear-to-r from-white via-white to-gray-400 bg-clip-text text-3xl leading-[1.15] font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              {title}{' '}
              <span
                className={`bg-linear-to-r ${BRIGHT_GRADIENTS[themeKey]} bg-clip-text text-transparent`}
              >
                {term}
              </span>
            </h1>
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm md:text-base">
              {subtitle}
            </p>
          </div>
        </div>

        {/* If no articles found */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-[#07070F]/85 p-12 text-center backdrop-blur-3xl md:p-20">
            <LuBookOpen className="mb-6 animate-pulse text-gray-600 size-12" />
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
                    className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-white/5 bg-white/1 text-gray-400 opacity-30 size-9"
                    aria-label="Previous Page (disabled)"
                  >
                    <LuChevronLeft className="size-4" />
                  </span>
                ) : (
                  <Link
                    href={getPageLink(currentPage - 1)}
                    className="inline-flex items-center justify-center rounded-xl border border-white/5 bg-white/1 text-gray-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white size-9"
                    aria-label="Previous Page"
                  >
                    <LuChevronLeft className="size-4" />
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isActive = currentPage === pageNum;
                    return (
                      <Link
                        key={pageNum}
                        href={getPageLink(pageNum)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                            : 'border border-white/5 bg-white/1 text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  }
                )}

                {currentPage === totalPages ? (
                  <span
                    className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-white/5 bg-white/1 text-gray-400 opacity-30 size-9"
                    aria-label="Next Page (disabled)"
                  >
                    <LuChevronRight className="size-4" />
                  </span>
                ) : (
                  <Link
                    href={getPageLink(currentPage + 1)}
                    className="inline-flex items-center justify-center rounded-xl border border-white/5 bg-white/1 text-gray-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white size-9"
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
                1-on-1 feedback. Book a free introductory call with Shuvam Raha
                to analyze your playstyle and design a custom learning roadmap.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="https://calendly.com/shuvamraha10/intro-call"
                className="group/btn font-heading relative inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 sm:text-sm"
              >
                <LuPhone className="size-4" />
                Book Free Call
                <LuArrowRight className="transition-transform group-hover/btn:translate-x-1 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
