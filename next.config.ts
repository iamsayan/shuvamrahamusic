import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.224'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shuvamrahamusic.com',
      },
    ],
  },
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  async redirects() {
    return [
      {
        source: '/category/:slug',
        destination: '/blog/category/:slug',
        permanent: true,
      },
      {
        source: '/tag/:slug',
        destination: '/blog/tag/:slug',
        permanent: true,
      },
      {
        source: '/script-productions-presents-the-judges-of-cym-9',
        destination: '/blog/script-productions-presents-the-judges-of-cym-9',
        permanent: true,
      },
      {
        source: '/lauten-audio-la-120-mic-pair-unboxing-first-impressions',
        destination:
          '/blog/lauten-audio-la-120-mic-pair-unboxing-first-impressions',
        permanent: true,
      },
      {
        source: '/durga-pujo-song-uma-amar-ase-re-mix-masted-by-shuvam-raha',
        destination:
          '/blog/durga-pujo-song-uma-amar-ase-re-mix-masted-by-shuvam-raha',
        permanent: true,
      },
      {
        source: '/essential-jazz-chord-voicings-%F0%9F%8E%B8',
        destination: '/blog/essential-jazz-chord-voicings',
        permanent: true,
      },
      {
        source:
          '/same-shape-different-chord-learn-how-to-play-a-series-of-sus2-chords-using-a-single-shape',
        destination:
          '/blog/same-shape-different-chord-learn-how-to-play-a-series-of-sus2-chords-using-a-single-shape',
        permanent: true,
      },
      {
        source: '/durga-pujo-song-durga-bhabani-mix-masted-by-shuvam-raha',
        destination:
          '/blog/durga-pujo-song-durga-bhabani-mix-masted-by-shuvam-raha',
        permanent: true,
      },
      {
        source:
          '/certified-in-sound-and-hearing-basics-yamaha-audioversity-journey',
        destination:
          '/blog/certified-in-sound-and-hearing-basics-yamaha-audioversity-journey',
        permanent: true,
      },
      {
        source:
          '/testing-two-classic-stereo-mic-techniques-xy-vs-ab-using-lauten-audio-la120-mic',
        destination:
          '/blog/testing-two-classic-stereo-mic-techniques-xy-vs-ab-using-lauten-audio-la120-mic',
        permanent: true,
      },
      {
        source: '/open-voicings-over-a-chromatic-descending-e-major',
        destination: '/blog/open-voicings-over-a-chromatic-descending-e-major',
        permanent: true,
      },
      {
        source: '/student-spotlight-agnivo-chaki-e-minor-arpeggio-practice',
        destination:
          '/blog/student-spotlight-agnivo-chaki-e-minor-arpeggio-practice',
        permanent: true,
      },
      {
        source:
          '/student-spotlight-adhyayan-mukhopadhyay-d-major-scale-practice-with-metronome',
        destination:
          '/blog/student-spotlight-adhyayan-mukhopadhyay-d-major-scale-practice-with-metronome',
        permanent: true,
      },
      {
        source: '/student-spotlight-raja-mukhopadhyay-playing-singing-shokaal',
        destination:
          '/blog/student-spotlight-raja-mukhopadhyay-playing-singing-shokaal',
        permanent: true,
      },
      {
        source:
          '/student-spotlight-pratyush-podder-acoustic-guitar-performance-of-mairis-wedding',
        destination:
          '/blog/student-spotlight-pratyush-podder-acoustic-guitar-performance-of-mairis-wedding',
        permanent: true,
      },
      {
        source: '/%F0%9F%93%A2-fee-structure-update',
        destination: '/blog/fee-structure-update',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
