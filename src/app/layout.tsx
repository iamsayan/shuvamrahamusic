import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsappButton from '@/components/whatsapp-button';
import './globals.scss';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shuvamrahamusic.com'),
  title: {
    default: 'Shuvam Raha Music | Guitar Classes Online & Offline',
    template: '%s - Shuvam Raha Music',
  },
  description:
    'Learn guitar and play your favorite songs in 30 days. Online & offline coaching for beginners and busy professionals. Simple Hindi/Bengali guidance. Students from India, USA, UK & Canada.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Sayan Datta', url: 'https://sayandatta.co.in' }],
  creator: 'Sayan Datta',
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning={process.env.NODE_ENV === 'production'}
    >
      <body className="overflow-x-hidden bg-[#05050A] antialiased">
        <Header />
        {children}
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
