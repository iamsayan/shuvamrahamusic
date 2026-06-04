'use client';

import React, { useState, useEffect } from 'react';
import { LuLink, LuCheck, LuShare2 } from 'react-icons/lu';
import { FaFacebookF, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';

interface ShareButtonsProps {
  url: string;
  title: string;
  coverImage?: string;
}

export default function ShareButtons({ url, title, coverImage }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'share' in navigator) {
      const frame = requestAnimationFrame(() => {
        setCanShare(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, []);

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
      try {
        const shareData: ShareData = {
          title: title,
          text: `Check out this article: ${title}`,
          url: url,
        };

        if (coverImage) {
          try {
            // Resolve relative path if necessary
            const absoluteImageUrl = coverImage.startsWith('http')
              ? coverImage
              : `${window.location.origin}${coverImage}`;

            const response = await fetch(absoluteImageUrl);
            const blob = await response.blob();
            const urlSlug = url.split('/').pop() || 'article';
            const fileExt = coverImage.split('.').pop() || 'png';
            const fileName = `${urlSlug}.${fileExt}`;
            const file = new File([blob], fileName, { type: blob.type });

            if ('canShare' in navigator && navigator.canShare({ files: [file] })) {
              shareData.files = [file];
            }
          } catch (fileErr) {
            console.error('Failed to attach cover image file to share sheet:', fileErr);
          }
        }

        await navigator.share(shareData);
      } catch (err) {
        // Ignored, user likely canceled sharing
        console.log('Error sharing: ', err);
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
          className="group relative flex h-9 items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-xs font-bold text-gray-400 transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-400"
          aria-label="Share article using native sharing panel"
        >
          <LuShare2 className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
          <span>Share</span>
        </button>
      )}

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        className={`group relative flex h-9 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300 ${
          copied
            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
            : 'border-white/5 bg-white/[0.02] text-gray-400 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-400'
        }`}
        aria-label="Copy article link"
      >
        {copied ? (
          <>
            <LuCheck className="h-3.5 w-3.5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <LuLink className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
        aria-label="Share on X (Twitter)"
      >
        <FaXTwitter className="h-3.5 w-3.5" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
        aria-label="Share on Facebook"
      >
        <FaFacebookF className="h-3.5 w-3.5" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-400"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp className="h-4 w-4" />
      </a>
    </div>
  );
}
