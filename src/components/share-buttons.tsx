'use client';

import { useEffect, useState } from 'react';

import { BlogPost } from '@/lib/blog-shared';
import cockpit from '@/lib/client';

import { FaFacebookF, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { LuCheck, LuLink, LuShare2 } from 'react-icons/lu';

interface ShareButtonsProps {
  post: BlogPost;
}

export default function ShareButtons({ post }: ShareButtonsProps) {
  const { title } = post;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [shareFile, setShareFile] = useState<File | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'share' in navigator) {
      const frame = requestAnimationFrame(() => {
        setCanShare(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !post.featured_image?._id) return;

    let active = true;
    const prepareFile = async () => {
      try {
        const imageUrl = cockpit.getImageUrl(post.featured_image._id, {
          mime: 'png',
        });

        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const urlSlug = post.slug || 'article';
        const fileName = `${urlSlug}.png`;
        const file = new File([blob], fileName, { type: blob.type });

        if (
          active &&
          'canShare' in navigator &&
          navigator.canShare({ files: [file] })
        ) {
          setShareFile(file);
        }
      } catch (fileErr) {
        console.warn(
          'Failed to prefetch featured image file for sharing:',
          fileErr
        );
      }
    };

    prepareFile();
    return () => {
      active = false;
    };
  }, [post.featured_image?._id, post.slug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      const shareData: ShareData = {
        title: title,
        text: `Check out this article: ${title}`,
        url: url,
      };

      if (shareFile) {
        shareData.files = [shareFile];
      }

      try {
        await navigator.share(shareData);
      } catch (err) {
        // If sharing fails (e.g., due to file sharing restrictions or permission issues),
        // try a fallback attempt without the file payload.
        if (shareData.files) {
          try {
            const fallbackData = { ...shareData };
            delete fallbackData.files;
            await navigator.share(fallbackData);
          } catch (fallbackErr) {
            console.log('Error sharing (fallback): ', fallbackErr);
          }
        } else {
          console.log('Error sharing: ', err);
        }
      }
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Native Share Button (shown only when browser supports Web Share API) */}
      {canShare && (
        <button
          onClick={handleNativeShare}
          className="group relative flex h-9 items-center gap-2 rounded-full border border-white/5 bg-white/2 px-4 py-2 text-xs font-bold text-gray-400 transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-400"
          aria-label="Share article using native sharing panel"
        >
          <LuShare2 className="size-3.5 transition-transform group-hover:scale-110" />
          <span>Share</span>
        </button>
      )}

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        className={`group relative flex h-9 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300 ${
          copied
            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
            : 'border-white/5 bg-white/2 text-gray-400 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-400'
        }`}
        aria-label="Copy article link"
      >
        {copied ? (
          <>
            <LuCheck className="size-3.5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <LuLink className="size-3.5 transition-transform group-hover:rotate-45" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex size-9 items-center justify-center rounded-full border border-white/5 bg-white/2 text-gray-400 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
        aria-label="Share on X (Twitter)"
      >
        <FaXTwitter className="size-3.5" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex size-9 items-center justify-center rounded-full border border-white/5 bg-white/2 text-gray-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
        aria-label="Share on Facebook"
      >
        <FaFacebookF className="size-3.5" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex size-9 items-center justify-center rounded-full border border-white/5 bg-white/2 text-gray-400 transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-400"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp className="size-4" />
      </a>
    </div>
  );
}
