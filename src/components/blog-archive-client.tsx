'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import CockpitImage from '@/components/cockpit-image';
import {
  AMBIENT_GLOWS,
  BRIGHT_GRADIENTS,
  BlogPost,
  CATEGORY_THEMES,
  GLOW_COLORS,
  getThemeKey,
} from '@/lib/blog-shared';

import {
  LuArrowRight,
  LuBookOpen,
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuClock,
  LuPhone,
} from 'react-icons/lu';

interface BlogArchiveClientProps {
  title: string;
  subtitle: string;
  type: 'category' | 'tag';
  term: string;
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

export default function BlogArchiveClient({
  title,
  subtitle,
  type,
  term,
  posts,
}: BlogArchiveClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Paginated posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(posts.length / POSTS_PER_PAGE);
  }, [posts]);

  // Determine theme based on category name (or default for tags)
  const themeKey = useMemo(() => {
    return type === 'category' ? getThemeKey(term) : 'default';
  }, [type, term]);

  const primaryTheme = CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];
  const glow = AMBIENT_GLOWS[themeKey] || AMBIENT_GLOWS['default'];

  return (
    <div className="relative min-h-screen bg-[#05050A] pt-24 pb-24 text-[#f0f0f5]">
      {/* Background ambient glows */}
      <div
        className={`pointer-events-none absolute top-12 left-1/4 h-[400px] w-[400px] rounded-full blur-[130px] transition-all duration-1000 ${glow.top}`}
      />
      <div
        className={`pointer-events-none absolute right-12 bottom-12 h-[400px] w-[400px] rounded-full blur-[130px] transition-all duration-1000 ${glow.bottom}`}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
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
            <span className="text-gray-500 capitalize">{type}</span>
            <span className="text-[10px] font-normal text-gray-700 sm:text-xs">
              /
            </span>
            <span className={`font-black tracking-wide ${primaryTheme.text}`}>
              {term}
            </span>
          </nav>

          {/* Header Title */}
          <div className="max-w-2xl">
            <h1 className="font-heading mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-3xl leading-[1.15] font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              {title}{' '}
              <span
                className={`bg-gradient-to-r ${BRIGHT_GRADIENTS[themeKey]} bg-clip-text text-transparent`}
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
            <LuBookOpen className="mb-6 h-12 w-12 animate-pulse text-gray-600" />
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
              {paginatedPosts.map((post) => {
                const postPrimaryCat = post.categories[0]?.title || '';
                const postThemeKey = getThemeKey(postPrimaryCat);
                const postTheme =
                  CATEGORY_THEMES[postThemeKey] || CATEGORY_THEMES['default'];
                return (
                  <div
                    key={post.id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] transition-all duration-500 hover:${postTheme.border} hover:bg-white/[0.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]`}
                  >
                    {/* Glowing Top Accent Strip */}
                    <div
                      className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${BRIGHT_GRADIENTS[postThemeKey] || BRIGHT_GRADIENTS['default']} z-20 opacity-20 transition-opacity duration-500 group-hover:opacity-90`}
                    />

                    {/* Inner accent glow on hover */}
                    <div
                      className={`pointer-events-none absolute -right-16 -bottom-16 h-36 w-36 rounded-full ${GLOW_COLORS[postThemeKey] || GLOW_COLORS['default']} z-0 opacity-0 blur-[40px] transition-opacity duration-700 group-hover:opacity-100`}
                    />
                    <div>
                      {/* Image */}
                      <div className="relative aspect-video w-full overflow-hidden">
                        <CockpitImage
                          asset={post.coverImage}
                          className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
                          fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/40 to-transparent" />
                      </div>

                      {/* Metadata & Title */}
                      <div className="p-5.5">
                        <div className="mb-3.5 flex items-center justify-between gap-4">
                          {/* Categories */}
                          <div className="relative z-10 flex flex-wrap gap-1.5">
                            {post.categories.map((cat, idx) => {
                              const catThemeKey = getThemeKey(cat.title);
                              const catTheme =
                                CATEGORY_THEMES[catThemeKey] ||
                                CATEGORY_THEMES['default'];
                              return (
                                <Link
                                  key={idx}
                                  href={`/blog/category/${cat.slug}`}
                                  className={`rounded-full border ${catTheme.border} bg-white/[0.02] px-2.5 py-0.5 text-[9px] font-black tracking-widest ${catTheme.text} uppercase transition-colors duration-300 hover:bg-white/[0.08]`}
                                >
                                  {cat.title}
                                </Link>
                              );
                            })}
                          </div>

                          {/* Read Time */}
                          <span className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                            <LuClock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3
                          className={`font-heading mb-2.5 text-base leading-snug font-extrabold text-white transition-colors duration-300 group-hover:text-cyan-400`}
                        >
                          <Link
                            href={`/blog/${post.slug}`}
                            className="after:absolute after:inset-0"
                          >
                            {post.title}
                          </Link>
                        </h3>

                        {/* Date metadata */}
                        <div className="mb-3 flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                          <LuCalendar className="h-3 w-3" />
                          {post.date}
                        </div>

                        <p className="line-clamp-3 text-xs leading-relaxed text-gray-400">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                            {post.tags.map((tag, idx) => (
                              <Link
                                key={idx}
                                href={`/blog/tag/${tag.slug}`}
                                className="rounded-lg bg-white/[0.02] border border-white/[0.05] px-2.5 py-0.5 text-[9px] font-bold text-gray-400 tracking-wide uppercase hover:bg-white/[0.05] hover:text-white transition-colors"
                              >
                                #{tag.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Read More link strip */}
                    <div className="flex items-center justify-between border-t border-white/[0.04] p-5.5 pt-4">
                      <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase transition-colors duration-300 group-hover:text-white">
                        Read Article
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className={`relative z-10 ${postTheme.text} transition-transform duration-300 hover:translate-x-1.5`}
                      >
                        <LuChevronRight className="h-4.5 w-4.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/[0.01] text-gray-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                  aria-label="Previous Page"
                >
                  <LuChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isActive = currentPage === pageNum;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                            : 'border border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/[0.01] text-gray-400 transition-all hover:border-white/10 hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                  aria-label="Next Page"
                >
                  <LuChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* CTA Section Card (Matching design cards of the site) */}
        <div className="group/card relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#07070F]/85 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-500 hover:border-cyan-500/20 sm:p-12">
          {/* Glowing Top Accent Strip */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-60" />
          <div className="pointer-events-none absolute -top-[40%] -right-[10%] h-[300px] w-[300px] rounded-full bg-cyan-600/10 blur-[100px]" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Guitar Classes
              </span>
              <h2 className="font-heading mb-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ready to Accelerate Your{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
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
                className="group/btn font-heading relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 sm:text-sm"
              >
                <LuPhone className="h-4 w-4" />
                Book Free Call
                <LuArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
