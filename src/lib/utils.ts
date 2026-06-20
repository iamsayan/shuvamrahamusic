import cx, { ClassName } from 'classix';
import { format, formatISO, isValid } from 'date-fns';
import { enIN, enUS } from 'date-fns/locale';
import { twMerge } from 'fluid-tailwindcss/tailwind-merge';

export function cn(...classes: ClassName[]) {
  return twMerge(cx(...classes));
}

/**
 * Format timestamp (Unix epoch in seconds, or string/Date) to an ISO 8601 string for schemas.
 */
export function formatSchemaDate(
  timestamp?: number | string | Date
): string | undefined {
  if (!timestamp) return undefined;

  let dateObj: Date;
  if (timestamp instanceof Date) {
    dateObj = timestamp;
  } else if (typeof timestamp === 'number') {
    dateObj =
      timestamp < 99999999999
        ? new Date(timestamp * 1000)
        : new Date(timestamp);
  } else {
    dateObj = new Date(timestamp);
  }

  if (!isValid(dateObj)) return undefined;

  return formatISO(dateObj);
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
  const localeObj = locale === 'en-IN' ? enIN : enUS;

  if (!timestamp) {
    if (locale === 'en-IN') return 'N/A';
    return format(new Date(), 'MMMM d, yyyy', { locale: localeObj });
  }

  const dateObj =
    typeof timestamp === 'number'
      ? new Date(timestamp * 1000)
      : new Date(timestamp);

  if (!isValid(dateObj)) {
    return 'N/A';
  }

  const formatStr = locale === 'en-IN' ? 'd MMMM yyyy' : 'MMMM d, yyyy';
  return format(dateObj, formatStr, { locale: localeObj });
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
