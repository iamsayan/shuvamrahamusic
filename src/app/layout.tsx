import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { headers } from 'next/headers';

import Providers from '@/app/providers';
import Footer from '@/components/footer';
import Header from '@/components/header';
import WhatsappButton from '@/components/whatsapp-button';
import cockpit from '@/lib/client';
import type { Settings } from '@/types';
import '@bprogress/core/css';
import { GoogleTagManager } from '@next/third-parties/google';

import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Guitar Classes Online & Offline - Shuvam Raha Music',
    template: '%s - Shuvam Raha Music',
  },
  description:
    'Learn guitar and play your favorite songs in 30 days. Online & offline coaching for beginners and busy professionals. Simple Hindi/Bengali guidance. Students from India, USA, UK & Canada.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Sayan Datta', url: 'https://sayandatta.co.in' }],
  creator: 'Sayan Datta',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    siteName: 'Shuvam Raha Music',
    locale: 'en_IN',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shuvamrahamusic',
    creator: '@shuvamrahamusic',
  },
  other: {
    developer: 'Sayan Datta',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? '';
  const settings = await cockpit.getContentItemByFilter<Settings>('settings', {
    populate: 1,
  });

  return (
    <html
      lang="en"
      className={`${outfit.variable}`}
      suppressHydrationWarning={process.env.NODE_ENV === 'production'}
      data-scroll-behavior="smooth"
    >
      {process.env.NODE_ENV === 'production' && (
        <>
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GA4_ID!}
            nonce={nonce}
            dataLayer={{
              cookie_prefix: 'srmGtag',
              cookie_domain: process.env.NEXT_PUBLIC_SITE_URL!,
              cookie_flags: 'samesite=none;secure',
              allow_google_signals: true,
            }}
          />
        </>
      )}
      <body className="overflow-x-hidden bg-[#05050A] antialiased">
        <Providers settings={settings}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="relative flex flex-1 flex-col">{children}</main>
            <Footer />
            <WhatsappButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
