import cx, { ClassName } from 'classix';
import { twMerge } from 'fluid-tailwindcss/tailwind-merge';

export function cn(...classes: ClassName[]) {
  return twMerge(cx(...classes));
}

/**
 * Normalize trailing slashes in a URL.
 * Removes all trailing slashes and appends exactly one trailing slash (except for '#').
 */
export function normalizeUrl(url: string): string {
  if (!url || url === '#') return url;
  const cleaned = url.replace(/\/+$/, '');
  return `${cleaned}/`;
}

/**
 * Format timestamp (Unix epoch in seconds, or string) to a human-readable date.
 */
export function formatDate(
  timestamp?: number | string,
  locale: string = 'en-US'
): string {
  if (!timestamp) {
    if (locale === 'en-IN') return 'N/A';
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const dateObj = typeof timestamp === 'number'
    ? new Date(timestamp * 1000)
    : new Date(timestamp);

  if (isNaN(dateObj.getTime())) {
    return 'N/A';
  }

  return dateObj.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get currency symbol based on region.
 */
export function getCurrencySymbol(region?: string): string {
  if (!region) return '₹';
  const upper = region.toUpperCase();
  if (
    upper === 'GLOBAL' ||
    upper === 'US' ||
    upper === 'USA' ||
    upper === 'INTERNATIONAL' ||
    upper === 'OUTSIDE INDIA'
  ) {
    return '$';
  }
  return '₹';
}

/**
 * Format currency amount based on region.
 */
export function formatCurrency(amount: number, region?: string): string {
  const symbol = getCurrencySymbol(region);
  return `${symbol}${amount}`;
}

