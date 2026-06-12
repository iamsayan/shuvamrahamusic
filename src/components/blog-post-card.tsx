import Link from 'next/link';

import CockpitImage from '@/components/cockpit-image';
import {
  BRIGHT_GRADIENTS,
  BlogPost,
  CATEGORY_THEMES,
  GLOW_COLORS,
  getThemeKey,
} from '@/lib/blog-shared';

import { LuCalendar, LuChevronRight, LuClock } from 'react-icons/lu';

export interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const primaryCat = post.categories[0]?.title || '';
  const themeKey = getThemeKey(primaryCat);
  const theme = CATEGORY_THEMES[themeKey] || CATEGORY_THEMES['default'];

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] transition-all duration-500 hover:${theme.border} hover:bg-white/[0.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]`}
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
        <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
          {post.coverImage && (
            <CockpitImage
              asset={post.coverImage}
              className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
              fill
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/40 to-transparent" />
        </div>

        {/* Metadata & Title */}
        <div className="p-5.5">
          {/* Date & Read Time metadata */}
          <div className="mb-2.5 flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase">
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

          <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-gray-400">
            {post.excerpt}
          </p>

          {/* Categories (First 3 only) */}
          <div className="relative z-10 flex flex-wrap gap-1.5">
            {post.categories.slice(0, 3).map((cat, idx) => {
              const catThemeKey = getThemeKey(cat.title);
              const catTheme =
                CATEGORY_THEMES[catThemeKey] || CATEGORY_THEMES['default'];
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

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  href={`/blog/tag/${tag.slug}`}
                  className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-gray-400 uppercase transition-colors hover:bg-white/[0.05] hover:text-white"
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
          className={`relative z-10 ${theme.text} transition-transform duration-300 hover:translate-x-1.5`}
        >
          <LuChevronRight className="h-4.5 w-4.5" />
        </Link>
      </div>
    </div>
  );
}
