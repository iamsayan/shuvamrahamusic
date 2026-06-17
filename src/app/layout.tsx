import { Suspense } from 'react';

import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Outfit } from 'next/font/google';

import Providers from '@/app/providers';
import Footer from '@/components/footer';
import Header from '@/components/header';
import WhatsappButton from '@/components/whatsapp-button';
import { getSettings } from '@/lib/data';
import '@bprogress/core/css';
import { GoogleTagManager } from '@next/third-parties/google';
import { LuMusic } from 'react-icons/lu';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#05050a',
  colorScheme: 'dark',
};

function RootLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05050A]">
      {/* Background glows */}
      <div className="absolute h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
      <div className="absolute h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[100px]" />
      
      {/* Loader Content */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Icon Ring */}
        <div className="relative flex size-20 items-center justify-center">
          {/* Pulsing outer rings */}
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-cyan-500/20 opacity-75" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 animate-pulse rounded-full border border-indigo-500/30" />
          
          {/* Rotating gradient ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-cyan-400 border-r-cyan-400/30 animate-spin" style={{ animationDuration: '1.5s' }} />
          
          {/* Center icon */}
          <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            <LuMusic className="size-6 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Text details */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h2 className="font-heading text-lg font-black tracking-wider text-white uppercase sm:text-xl">
            Shuvam Raha Music
          </h2>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <span>Tuning your experience</span>
            <span className="flex gap-0.5">
              <span className="size-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="size-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="size-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSettings();

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
        <Providers settingsPromise={settings}>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<RootLoader />}>
              <Header />
              <main className="relative flex flex-1 flex-col">{children}</main>
              <Footer />
              <WhatsappButton />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
