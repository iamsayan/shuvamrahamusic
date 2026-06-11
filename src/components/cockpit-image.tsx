'use client';

import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import Image, { type ImageProps } from 'next/image';

import cockpit, { type Asset, type ImageOptions } from '@/lib/client';
import { cn } from '@/lib/utils';
import placeholderImage from '@/public/logo.png';
import { ImagePreset } from '@/types';

import {
  type IntersectionOptions,
  useInView,
} from 'react-intersection-observer';

type CockpitImageProps = Omit<
  ImageProps,
  'loader' | 'src' | 'alt' | 'quality'
> & {
  asset: Asset;
  mode?: ImageOptions['m'];
  twidth?: number;
  theight?: number;
  preset?: ImagePreset;
  quality?: number;
  lazy?: boolean;
  loaderPlaceholder?: boolean | ReactNode;
  containerClassName?: string;
  intersectionOptions?: IntersectionOptions;
};

export default function CockpitImage({
  asset,
  preset,
  mode = 'bestFit',
  twidth = 1920,
  theight = 1080,
  quality = 90,
  lazy = true,
  loaderPlaceholder = true,
  containerClassName,
  intersectionOptions,
  ...rest
}: CockpitImageProps) {
  const [imageState, setImageState] = useState<{
    isLoading: boolean;
    error: boolean;
    useTransform: boolean;
  }>({
    isLoading: true,
    error: false,
    useTransform: true,
  });

  const hasAttemptedFallback = useRef(false);

  const restWidth = rest.width;
  const restHeight = rest.height;

  const url = useMemo(
    () =>
      preset
        ? cockpit.getImagePresetUrl(asset._id, preset, { o: 1 })
        : cockpit.getImageUrl(asset._id, {
            o: 1,
            w: asset.width || (restWidth as number) || twidth,
            h: asset.height || (restHeight as number) || theight,
            q: quality,
            m: mode,
          }),
    [
      asset._id,
      asset.width,
      asset.height,
      twidth,
      theight,
      quality,
      restWidth,
      restHeight,
      preset,
      mode,
    ]
  );

  const objectPosition = useMemo(() => {
    if (
      asset.fp &&
      typeof asset.fp.x === 'number' &&
      typeof asset.fp.y === 'number'
    ) {
      return `${asset.fp.x * 100}% ${asset.fp.y * 100}%`;
    }
    return undefined;
  }, [asset.fp]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px 50px',
    fallbackInView: true,
    skip: !lazy,
    ...intersectionOptions,
  });

  const handleLoad = useCallback(() => {
    setImageState((prev) => ({
      ...prev,
      isLoading: false,
      error: false,
    }));
    hasAttemptedFallback.current = false;
  }, []);

  const handleError = useCallback(() => {
    if (imageState.useTransform && !hasAttemptedFallback.current) {
      hasAttemptedFallback.current = true;
      setImageState((prev) => ({
        ...prev,
        useTransform: false,
        isLoading: true,
      }));
    } else {
      setImageState({
        isLoading: false,
        error: true,
        useTransform: false,
      });
    }
  }, [imageState.useTransform]);

  const shouldRenderImage = !lazy || inView;
  const shouldShowPlaceholder =
    imageState.isLoading && loaderPlaceholder !== false;

  const containerClasses = useMemo(
    () =>
      cn(
        'relative h-full w-full bg-gray-200',
        imageState.error && 'bg-red-100',
        containerClassName
      ),
    [imageState.error, containerClassName]
  );

  return (
    <div ref={ref} className={containerClasses}>
      {shouldShowPlaceholder &&
        (typeof loaderPlaceholder === 'boolean' ? (
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-white shadow-lg">
              <Image
                src={placeholderImage}
                alt="Image placeholder"
                className="size-10 opacity-40"
                priority={false}
              />
            </div>
          </div>
        ) : (
          loaderPlaceholder
        ))}

      {shouldRenderImage && (
        <Image
          src={url}
          alt={asset.altText || asset.title || ''}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          loading={inView ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          unoptimized // true, as this is hosted on vercel, and dont want to use next's optimization is vercel.
          {...rest}
          style={{
            objectPosition,
            ...(rest.style as React.CSSProperties),
          }}
        />
      )}

      {imageState.error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          Failed to load image
        </div>
      )}
    </div>
  );
}
