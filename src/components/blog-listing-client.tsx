'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
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
  LuSearch,
} from 'react-icons/lu';

interface BlogListingClientProps {
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 3; // Excluding the featured post, 3 per page is perfect for testing with 5 posts

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const CATEGORIES = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((post) => {
      post.categories.forEach((cat) => {
        if (cat?.title) cats.add(cat.title);
      });
    });
    return ['All', ...Array.from(cats)];
  }, [posts]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Filter posts based on search query and selected category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories.some((cat) =>
          cat.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        post.tags.some((tag) =>
          tag.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'All' ||
        post.categories.some((cat) => cat.title === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  // The first post of the filtered list will be highlighted as featured when starting out
  const featuredPost = useMemo(() => {
    if (filteredPosts.length === 0) return null;
    return filteredPosts[0];
  }, [filteredPosts]);

  // The remaining posts will be displayed in the grid
  const gridPosts = useMemo(() => {
    if (filteredPosts.length <= 1) return [];
    return filteredPosts.slice(1);
  }, [filteredPosts]);

  // Paginated grid posts
  const paginatedGridPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return gridPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [gridPosts, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  }, [gridPosts]);

  return (
    <div className="relative min-h-screen bg-[#05050A] pt-24 pb-24 text-[#f0f0f5]">
      {/* Background ambient glows */}
      {(() => {
        const glowKey = getThemeKey(selectedCategory);
        const glow = AMBIENT_GLOWS[glowKey] || AMBIENT_GLOWS['default'];
        return (
          <>
            <div
              className={`pointer-events-none absolute top-12 left-1/4 h-[400px] w-[400px] rounded-full blur-[130px] transition-all duration-1000 ${glow.top}`}
            />
            <div
              className={`pointer-events-none absolute right-12 bottom-12 h-[400px] w-[400px] rounded-full blur-[130px] transition-all duration-1000 ${glow.bottom}`}
            />
          </>
        );
      })()}

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
            <span className="font-black tracking-wide text-cyan-400">Blog</span>
          </nav>

          {/* Header Title */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-heading mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-3xl leading-[1.15] font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                The Guitar{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Journal
                </span>
              </h1>
              <p className="text-xs leading-relaxed text-gray-400 sm:text-sm md:text-base">
                Practical guides, finger exercises, gear reviews, and roadmaps
                from Shuvam Raha to help you learn guitar and master your
                favorite songs.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-sm shrink-0">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/[0.02] py-3 pr-4 pl-12 text-sm text-white placeholder-gray-500 backdrop-blur-md transition-all duration-300 outline-none focus:border-cyan-500/30 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              />
              <LuSearch className="absolute top-1/2 left-4.5 h-4.5 w-4.5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap gap-2.5">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const themeKey = getThemeKey(category);
            const theme =
              CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`relative rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 outline-none ${
                  isActive
                    ? `bg-gradient-to-r ${theme.gradient} border ${theme.border} text-white ${theme.glow}`
                    : 'border border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/15 hover:bg-white/[0.03] hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* If no articles found */}
        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-[#07070F]/85 p-12 text-center backdrop-blur-3xl md:p-20">
            <LuBookOpen className="mb-6 h-12 w-12 animate-pulse text-gray-600" />
            <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
              No Articles Found
            </h3>
            <p className="mt-2 max-w-sm text-xs text-gray-400 sm:text-sm">
              We couldn&apos;t find any articles matching &quot;{searchQuery}
              &quot;. Try adjusting your keywords or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setCurrentPage(1);
              }}
              className="font-heading mt-6 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/10"
            >
              Reset Filters
            </button>
          </div>
        )}

        {featuredPost &&
          (() => {
            const primaryCat = featuredPost.categories[0]?.title || '';
            const themeKey = getThemeKey(primaryCat);
            const primaryTheme =
              CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];
            return (
              <div className="mb-16">
                <span
                  className={`mb-4 block text-[10px] font-bold tracking-widest ${primaryTheme.text} uppercase`}
                >
                  Featured Article
                </span>
                <div
                  className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#07070F]/80 shadow-2xl backdrop-blur-3xl transition-all duration-500 lg:flex-row hover:${primaryTheme.border} hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]`}
                >
                  {/* Glowing Top Accent Strip */}
                  <div
                    className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${BRIGHT_GRADIENTS[themeKey] || BRIGHT_GRADIENTS['default']} z-20 opacity-40 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* Cover Image */}
                  <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-[55%]">
                    <CockpitImage
                      asset={featuredPost.coverImage}
                      className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.03]"
                      fill
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-80 lg:hidden" />
                  </div>

                  {/* Content Panel */}
                  <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:w-[45%]">
                    {/* Accent glow on hover */}
                    <div
                      className={`pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full ${GLOW_COLORS[themeKey] || GLOW_COLORS['default']} opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100`}
                    />

                    <div>
                      <div className="relative z-10 mb-4 flex flex-wrap items-center gap-2">
                        {featuredPost.categories.map((cat, idx) => {
                          const catThemeKey = getThemeKey(cat.title);
                          const catTheme =
                            CATEGORY_THEMES[catThemeKey] ||
                            CATEGORY_THEMES['default'];
                          return (
                            <Link
                              key={idx}
                              href={`/blog/category/${cat.slug}`}
                              className={`rounded-full border ${catTheme.border} ${catTheme.bg} px-3 py-1 text-[10px] font-black tracking-widest ${catTheme.text} uppercase transition-colors duration-300 hover:bg-white/[0.08]`}
                            >
                              {cat.title}
                            </Link>
                          );
                        })}
                        {featuredPost.tags &&
                          featuredPost.tags.length > 0 &&
                          featuredPost.tags.map((tag, idx) => (
                            <Link
                              key={idx}
                              href={`/blog/tag/${tag.slug}`}
                              className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-gray-400 uppercase transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                            >
                              #{tag.title}
                            </Link>
                          ))}
                        <span className="ml-1 flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase">
                          <LuCalendar className="h-3 w-3" />
                          {featuredPost.date}
                        </span>
                      </div>

                      <h2
                        className={`font-heading mb-4 text-xl leading-tight font-black tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-400 sm:text-2xl lg:text-3xl`}
                      >
                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="after:absolute after:inset-0"
                        >
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="mb-6 text-xs leading-relaxed text-gray-400 sm:text-sm">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                      {/* Author avatar */}
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/5">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">
                            {featuredPost.author.name}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {featuredPost.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Read Link */}
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className={`relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 ${primaryTheme.text} transition-all duration-300 hover:scale-110 hover:border-cyan-500/20 hover:bg-cyan-500/10`}
                      >
                        <LuArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* Regular Posts Grid */}
        {gridPosts.length > 0 && (
          <div className="mb-16">
            <span className="mb-6 block text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              All Articles
            </span>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedGridPosts.map((post) => {
                const primaryCat = post.categories[0]?.title || '';
                const themeKey = getThemeKey(primaryCat);
                const primaryTheme =
                  CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];
                return (
                  <div
                    key={post.id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] transition-all duration-500 hover:${primaryTheme.border} hover:bg-white/[0.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]`}
                  >
                    {/* Glowing Top Accent Strip */}
                    <div
                      className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${BRIGHT_GRADIENTS[themeKey] || BRIGHT_GRADIENTS['default']} z-20 opacity-20 transition-opacity duration-500 group-hover:opacity-90`}
                    />

                    {/* Inner accent glow on hover */}
                    <div
                      className={`pointer-events-none absolute -right-16 -bottom-16 h-36 w-36 rounded-full ${GLOW_COLORS[themeKey] || GLOW_COLORS['default']} z-0 opacity-0 blur-[40px] transition-opacity duration-700 group-hover:opacity-100`}
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

                        {/* Floating Category Pills */}
                        <div className="absolute top-4 left-4 z-10 flex max-w-[85%] flex-wrap gap-1.5">
                          {post.categories.map((cat, idx) => {
                            const catThemeKey = getThemeKey(cat.title);
                            const catTheme =
                              CATEGORY_THEMES[catThemeKey] ||
                              CATEGORY_THEMES['default'];
                            return (
                              <Link
                                key={idx}
                                href={`/blog/category/${cat.slug}`}
                                className={`rounded-full border ${catTheme.border} bg-[#05050A]/85 px-2.5 py-0.5 text-[9px] font-black tracking-widest ${catTheme.text} uppercase backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.08]`}
                              >
                                {cat.title}
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Metadata & Title */}
                      <div className="p-5.5">
                        <div className="mb-2 flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase">
                          <span className="flex items-center gap-1">
                            <LuCalendar className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <LuClock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="relative z-10 mb-2.5 flex flex-wrap gap-1.5">
                            {post.tags.map((tag, idx) => (
                              <Link
                                key={idx}
                                href={`/blog/tag/${tag.slug}`}
                                className={`text-[10px] font-bold ${primaryTheme.text} tracking-wide uppercase opacity-85 hover:underline`}
                              >
                                #{tag.title}
                              </Link>
                            ))}
                          </div>
                        )}

                        <h3
                          className={`font-heading mb-3 text-base leading-snug font-extrabold text-white transition-colors duration-300 group-hover:text-cyan-400`}
                        >
                          <Link
                            href={`/blog/${post.slug}`}
                            className="after:absolute after:inset-0"
                          >
                            {post.title}
                          </Link>
                        </h3>

                        <p className="line-clamp-3 text-xs leading-relaxed text-gray-400">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Read More link strip */}
                    <div className="flex items-center justify-between border-t border-white/[0.04] p-5.5 pt-4">
                      <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase transition-colors duration-300 group-hover:text-white">
                        Read Article
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className={`relative z-10 ${primaryTheme.text} transition-transform duration-300 hover:translate-x-1.5`}
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
