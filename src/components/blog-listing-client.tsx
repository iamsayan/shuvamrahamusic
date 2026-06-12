'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import BlogPostCard from '@/components/blog-post-card';
import CockpitImage from '@/components/cockpit-image';
import PageLayout from '@/components/page-layout';
import {
  BRIGHT_GRADIENTS,
  BlogPost,
  CATEGORY_THEMES,
  GLOW_COLORS,
  getThemeKey,
} from '@/lib/blog-shared';

import {
  LuArrowRight,
  LuBookOpen,
  LuChevronLeft,
  LuChevronRight,
  LuPhone,
  LuSearch,
  LuX,
} from 'react-icons/lu';

interface BlogListingClientProps {
  posts: BlogPost[];
  totalPostsCount: number;
}

export default function BlogListingClient({
  posts,
  totalPostsCount,
}: BlogListingClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';

  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync localSearch when URL query changes (e.g. on reset or back navigation)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const updateUrl = useCallback(
    (newSearch: string, newPage: number) => {
      const params = new URLSearchParams();
      if (newSearch) {
        params.set('search', newSearch);
      }
      if (newPage > 1) {
        params.set('page', String(newPage));
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname]
  );

  const getPageLink = (pageNum: number) => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    if (pageNum > 1) {
      params.set('page', String(pageNum));
    }
    const queryStr = params.toString();
    return queryStr ? `${pathname}?${queryStr}` : pathname;
  };

  // Debounce search update to URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchQuery) {
        updateUrl(localSearch, 1);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, searchQuery, updateUrl]);

  const handleSearchChange = (query: string) => {
    setLocalSearch(query);
  };

  // The first post of the list will be highlighted as featured when on page 1
  const featuredPost = useMemo(() => {
    if (currentPage > 1) return null;
    if (posts.length === 0) return null;
    return posts[0];
  }, [posts, currentPage]);

  // The remaining posts will be displayed in the grid
  const gridPosts = useMemo(() => {
    if (currentPage > 1) return posts;
    if (posts.length <= 1) return [];
    return posts.slice(1);
  }, [posts, currentPage]);

  // Paginated grid posts - passed directly from server
  const paginatedGridPosts = gridPosts;

  const totalPages = useMemo(() => {
    return totalPostsCount <= 10
      ? 1
      : 1 + Math.ceil((totalPostsCount - 10) / 9);
  }, [totalPostsCount]);

  const themeKey = featuredPost
    ? getThemeKey(featuredPost.categories[0]?.title || '')
    : 'default';
  const primaryTheme = CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];

  return (
    <PageLayout
      title={
        <>
          The Guitar{' '}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Journal
          </span>
        </>
      }
      subtitle="Practical guides, finger exercises, gear reviews, and roadmaps from Shuvam Raha to help you learn guitar and master your favorite songs."
      variant="plain"
      headerRight={
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search articles..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/2 py-3 pr-12 pl-12 text-sm text-white placeholder-gray-500 backdrop-blur-md transition-all duration-300 outline-none focus:border-cyan-500/30 focus:bg-white/4 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          />
          <LuSearch className="absolute top-1/2 left-4.5 size-4.5 -translate-y-1/2 text-gray-500" />
          {localSearch && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute top-1/2 right-4.5 -translate-y-1/2 text-gray-500 transition-colors hover:text-white"
              aria-label="Clear search"
            >
              <LuX className="size-4" />
            </button>
          )}
        </div>
      }
    >
      {/* If no articles found */}
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-[#07070F]/85 p-12 text-center backdrop-blur-3xl md:p-20">
          <LuBookOpen className="mb-6 size-12 animate-pulse text-gray-600" />
          <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
            No Articles Found
          </h3>
          <p className="mt-2 max-w-sm text-xs text-gray-400 sm:text-sm">
            We couldn&apos;t find any articles matching your search query. Try
            checking for typos or searching other keywords.
          </p>
          <button
            type="button"
            onClick={() => handleSearchChange('')}
            className="font-heading mt-6 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/10"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Featured post panel on page 1 */}
      {featuredPost && (
        <div className="mb-16">
          <span className="font-heading mb-6 block text-xs font-black tracking-widest text-gray-500 uppercase">
            Featured Article
          </span>
          <div
            className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#07070F]/80 shadow-2xl backdrop-blur-3xl transition-all duration-500 lg:flex-row hover:${primaryTheme.border} hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]`}
          >
            {/* Glowing Top Accent Strip */}
            <div
              className={`absolute top-0 left-0 h-[3px] w-full bg-linear-to-r ${BRIGHT_GRADIENTS[themeKey] || BRIGHT_GRADIENTS['default']} z-20 opacity-40 transition-opacity duration-500 group-hover:opacity-100`}
            />

            {/* Cover Image */}
            <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-[55%]">
              <CockpitImage
                asset={featuredPost.coverImage}
                className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.03]"
                fill
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#020205] via-transparent to-transparent opacity-80 lg:hidden" />
            </div>

            {/* Content Panel */}
            <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:w-[45%]">
              {/* Accent glow on hover */}
              <div
                className={`pointer-events-none absolute -right-20 -bottom-20 rounded-full ${GLOW_COLORS[themeKey] || GLOW_COLORS['default']} size-56 opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100`}
              />

              <div>
                {/* Category tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {featuredPost.categories.slice(0, 2).map((cat) => {
                    const catTheme =
                      CATEGORY_THEMES[getThemeKey(cat.title)] ||
                      CATEGORY_THEMES['default'];
                    return (
                      <Link
                        href={`/blog/category/${cat.slug}`}
                        key={cat._id}
                        className={`inline-block rounded-full border ${catTheme.border} ${catTheme.bg} px-3 py-1 text-[9px] font-black tracking-widest ${catTheme.text} uppercase`}
                      >
                        {cat.title}
                      </Link>
                    );
                  })}
                </div>

                {/* Title */}
                <h2 className="font-heading mb-3 text-xl leading-tight font-black text-white transition-colors duration-300 group-hover:text-cyan-400 sm:text-2xl lg:text-3xl">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="mb-6 line-clamp-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                {/* Author avatar */}
                <div className="flex items-center gap-3">
                  <div className="relative size-10 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-black tracking-wide text-white uppercase">
                      {featuredPost.author.name}
                    </span>
                    <span className="block text-[9px] font-bold text-gray-500 uppercase">
                      {featuredPost.date}
                    </span>
                  </div>
                </div>

                {/* Read Link */}
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className={`relative z-10 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 ${primaryTheme.text} size-9 transition-all duration-300 hover:scale-110 hover:border-cyan-500/20 hover:bg-cyan-500/10`}
                >
                  <LuArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Section */}
      {paginatedGridPosts.length > 0 && (
        <div className="mb-16">
          <span className="font-heading mb-6 block text-xs font-black tracking-widest text-gray-500 uppercase">
            {currentPage === 1 ? 'Latest Articles' : 'More Articles'}
          </span>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedGridPosts.map((post) => (
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
                const pageTheme = featuredPost
                  ? CATEGORY_THEMES[themeKey]
                  : CATEGORY_THEMES['default'];
                return isCurrent ? (
                  <span
                    key={pageNum}
                    className={`inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-xs font-bold ${pageTheme.text}`}
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
