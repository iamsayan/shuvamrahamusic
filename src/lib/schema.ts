/**
 * Centralized Schema.org JSON-LD helpers.
 *
 * Usage:
 *   import { SCHEMA } from '@/lib/schema';
 *   <JsonLd schema={SCHEMA.webSite()} />
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/** Shuvam Raha's verified social / platform profile URLs */
const SAME_AS = [
  'https://www.instagram.com/shuvamrahamusic',
  'https://www.youtube.com/channel/UCJRzXDPzTFktE0giVtYk_WQ',
  'https://www.youtube.com/channel/UCeouq96N_hYXGT7m1NsjF4Q',
  'https://www.facebook.com/shuvamrahamusic',
  'https://open.spotify.com/artist/4AmYXw6BaXjFN4urc6SyrG',
];

// ─── Reusable Entity Blocks ─────────────────────────────────────

/** WebSite entity — one per domain, referenced by @id */
function webSite() {
  return {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: `${BASE_URL}/`,
    name: 'Shuvam Raha Music',
    description: 'Easy To Learn & Easy To Play',
    inLanguage: 'en-US',
    publisher: { '@id': `${BASE_URL}/#person` },
    creator: {
      '@type': 'Person',
      name: 'Sayan Datta',
      url: 'https://sayandatta.co.in',
    },
  };
}

/** Person entity — Shuvam Raha as musician + instructor */
function person() {
  return {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Shuvam Raha',
    url: `${BASE_URL}/biography`,
    image: `${BASE_URL}/hero-guitarist.jpg`,
    jobTitle: 'Professional Guitarist & Music Instructor',
    description:
      'LCM certified (with distinction) professional guitarist, guitar instructor, live performer, and music producer from Kolkata, India.',
    sameAs: SAME_AS,
    knowsAbout: [
      'Guitar',
      'Music Instruction',
      'Music Production',
      'Live Performance',
      'Music Theory',
      'Acoustic Guitar',
      'Electric Guitar',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name: 'LCM Grade Distinction in Electric Guitar',
      recognizedBy: {
        '@type': 'Organization',
        name: 'London College of Music',
      },
    },
    worksFor: { '@id': `${BASE_URL}/#organization` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
  };
}

/** Organization / Business entity */
function organization() {
  return {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${BASE_URL}/#organization`,
    name: 'Shuvam Raha Music',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'LCM certified professional guitar instruction, offering online classes globally and offline classes at the studio in Kolkata.',
    telephone: '+918961369468',
    email: 'contact@shuvamrahamusic.com',
    founder: { '@id': `${BASE_URL}/#person` },
    sameAs: SAME_AS,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.5726',
      longitude: '88.3639',
    },
    priceRange: '$$ / ₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday'],
        opens: '10:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
  };
}

/** WebPage entity builder */
function webPage(opts: { path: string; name: string; description: string }) {
  return {
    '@type': 'WebPage',
    '@id': `${BASE_URL}${opts.path}/#webpage`,
    url: `${BASE_URL}${opts.path}/`,
    inLanguage: 'en-US',
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
  };
}

// ─── Breadcrumb ─────────────────────────────────────────────────

/**
 * Map of known route segments to human-readable names.
 * Unknown segments auto-convert from slug → Title Case.
 */
const ROUTE_NAMES: Record<string, string> = {
  biography: 'Biography',
  blog: 'Blog',
  contact: 'Contact Us',
  gallery: 'Media Gallery',
  'guitar-classes-with-shuvam': 'Guitar Classes with Shuvam',
  'my-gears': 'My Gears',
  'performance-highlights': 'Performance Highlights',
  'privacy-policy': 'Privacy Policy',
  'refund-policy': 'Refund Policy',
  'terms-of-service': 'Terms of Service',
  'payment-history': 'Payment History',
  tools: 'Tools',
  tutorials: 'Learning Materials',
  pay: 'Secure Checkout',
  photos: 'Photo Gallery',
  videos: 'Video Gallery',
  audios: 'Audio Gallery',
  tag: 'Tag',
  category: 'Category',
};

/** Convert a URL slug to Title Case (e.g. "my-blog-post" → "My Blog Post") */
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generates a BreadcrumbList entity from a URL path.
 * Include in any @graph or schema array alongside other page entities.
 *
 * @example SCHEMA.breadcrumb('/biography')
 * @example SCHEMA.breadcrumb('/blog/my-first-post', 'My First Post')
 */
function breadcrumb(path: string, lastSegmentName?: string) {
  const restrictedRoutes = ['category', 'tag', 'gallery'];

  const segments = path.split('/').filter(Boolean);

  let position = 2;

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${BASE_URL}/`,
    },
    ...segments
      .filter((segment, index) => {
        // Keep last segment even if restricted
        const isLast = index === segments.length - 1;

        return isLast || !restrictedRoutes.includes(segment);
      })
      .map((segment, index, filteredSegments) => {
        const isLast = index === filteredSegments.length - 1;

        const originalIndex = segments.indexOf(segment);
        const segPath = '/' + segments.slice(0, originalIndex + 1).join('/');

        const name =
          isLast && lastSegmentName
            ? lastSegmentName
            : ROUTE_NAMES[segment] || slugToTitle(segment);

        return {
          '@type': 'ListItem',
          position: position++,
          name,
          ...(isLast ? {} : { item: `${BASE_URL}${segPath}/` }),
        };
      }),
  ];

  return {
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

export const SCHEMA = {
  BASE_URL,
  SAME_AS,
  webSite,
  person,
  organization,
  webPage,
  breadcrumb,
} as const;
