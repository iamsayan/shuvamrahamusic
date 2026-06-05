export interface GearItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category:
    | 'Strings & Cables'
    | 'Pickups & Hardware'
    | 'Studio & Recording'
    | 'Cases & Stands';
  badge: string;
  studentBadge?: string | null;
  bestFor: string[];
  links: {
    amazon?: string;
    distributor?: string;
    official?: string;
  };
  images: string[];
}

export const GEAR_CATEGORIES = [
  'All',
  'Strings & Cables',
  'Pickups & Hardware',
  'Studio & Recording',
  'Cases & Stands',
] as const;

export const CATEGORY_THEMES = {
  'Strings & Cables': {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 border-cyan-500/30',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.2)]',
    gradient: 'from-cyan-500 to-blue-500',
  },
  'Pickups & Hardware': {
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 border-violet-500/30',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  'Studio & Recording': {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 border-emerald-500/30',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    gradient: 'from-emerald-500 to-teal-500',
  },
  'Cases & Stands': {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 border-amber-500/30',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    gradient: 'from-amber-500 to-orange-500',
  },
};

export const GLOW_COLORS = {
  'Strings & Cables': 'bg-cyan-500/20',
  'Pickups & Hardware': 'bg-violet-500/20',
  'Studio & Recording': 'bg-emerald-500/20',
  'Cases & Stands': 'bg-amber-500/20',
  Default: 'bg-cyan-500/15',
};

export const AMBIENT_GLOWS = {
  All: {
    top: 'from-cyan-500/10 to-transparent',
    bottom: 'from-violet-500/10 to-transparent',
  },
  'Strings & Cables': {
    top: 'from-cyan-500/15 to-transparent',
    bottom: 'from-blue-500/10 to-transparent',
  },
  'Pickups & Hardware': {
    top: 'from-violet-500/15 to-transparent',
    bottom: 'from-fuchsia-500/10 to-transparent',
  },
  'Studio & Recording': {
    top: 'from-emerald-500/15 to-transparent',
    bottom: 'from-teal-500/10 to-transparent',
  },
  'Cases & Stands': {
    top: 'from-amber-500/15 to-transparent',
    bottom: 'from-orange-500/10 to-transparent',
  },
};

export const GEAR_ITEMS: GearItem[] = [
  {
    id: 'elixir-electric',
    category: 'Strings & Cables',
    title: 'Elixir Electric Guitar Strings Nanoweb 10–46 Light',
    subtitle:
      'My go-to strings for professional tone, durability & live performance',
    description:
      'For over 5 years, I’ve been consistently using and trusting Elixir Electric Guitar Strings Nanoweb 10–46 Light. These NANOWEB Coating strings have continuously delivered exceptional tone, durability, and playability—qualities that perfectly align with my performance needs and musical expression.',
    badge: 'Personally used & recommended for over 5 years',
    studentBadge: 'Used by many of my students as well',
    bestFor: ['Electric Guitar', 'Live Performances', 'Studio Recording'],
    links: {
      amazon: 'https://amzn.to/4tULfA4',
      official: 'http://www.elixirstrings.com',
    },
    images: [
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Electric-Guitar-Strings-2-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Electric-Guitar-Strings-3-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Electric-Guitar-Strings-1-819x1024.jpg',
    ],
  },
  {
    id: 'elixir-acoustic',
    category: 'Strings & Cables',
    title:
      'Elixir Acoustic Guitar Strings 80/20 Bronze with Nanoweb Coating (11–52 Custom Light)',
    subtitle:
      'My go-to strings for rich tone, clarity & long-lasting performance',
    description:
      'For over 5 years, I’ve been consistently using and trusting Elixir Acoustic Guitar Strings 80/20 Bronze Nanoweb 11–52 Custom Light. These NANOWEB Coating strings have continuously delivered exceptional tone, durability, and playability—qualities that perfectly align with my performance needs and musical expression.',
    badge: 'Personally used & recommended for over 5 years',
    studentBadge: 'Used by many of my students as well',
    bestFor: ['Acoustic Guitar', 'Rich & Warm Tone', 'Fingerstyle & Strumming'],
    links: {
      amazon: 'https://amzn.to/4tc6hdh',
      official: 'http://www.elixirstrings.com',
    },
    images: [
      'https://shuvamrahamusic.com/wp-content/uploads/2025/10/Shuvam-Raha-Elixir-Acoustic-Photoshoot-2025--819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Acoustic-Guitar-Strings-2-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Acoustic-Guitar-Strings-3-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Elixir-Acoustic-Guitar-Strings-4-819x1024.jpg',
    ],
  },
  {
    id: 'suhr-ssv-ssh',
    category: 'Pickups & Hardware',
    title: 'Suhr SSV Neck & Suhr SSH+ Bridge',
    subtitle: 'My main pickup setup for studio + live performance',
    description:
      'I’ve tried many pickups from well-known brands, but once I switched to Suhr, I never looked back. Since 2019, I’ve been using Suhr pickups exclusively in my electric guitars. On my custom Warmoth guitar, I use an SSV (Neck) for warm, clear vintage tone and an SSH+ (Bridge) for power, punch, and rich harmonics — a perfect balance for clean to rock. I’ve been playing this setup for over 7 years and still love it every time I plug in.',
    badge: 'Personally used & trusted since 2019',
    studentBadge: null,
    bestFor: [
      'Warm Vintage Neck Tone (SSV)',
      'High-Output Modern Bridge Tone (SSH+)',
      'Studio & Stage Versatility',
    ],
    links: {
      official: 'https://www.suhr.com/pickups/',
      distributor:
        'https://thestockist.in/product-category/accessories/pickups/?filter_brand=suhr',
    },
    images: [
      'https://shuvamrahamusic.com/wp-content/uploads/2025/11/Shuvam-Raha-Suhr-SSV-Neck-and-SSH-Bridge-Pickups-1-50-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Shuvam-Raha-Suhr-SSV-Neck-and-SSH-Bridge-Pickups-2-819x1024.jpg',
    ],
  },
  {
    id: 'suhr-v60-thornbucker',
    category: 'Pickups & Hardware',
    title: 'Suhr V60 Neck & Middle, and Suhr Thornbucker+ Bridge',
    subtitle: 'My go-to pickup setup for vintage clarity + modern power',
    description:
      'I’ve played pickups from many respected brands, but once I tried Suhr, I was hooked. Since 2019, all my electric guitars have been loaded exclusively with Suhr pickups. On this Fender custom Strat build, I use V60 (Neck & Middle) for classic 60s-style clarity, warmth, and balance, paired with a Thornbucker+ (Bridge) for added punch, output, and rich harmonics. This setup gives me the perfect mix of vintage tone, clarity, and modern power — ideal for everything from clean to driven sounds. After years of playing them, they still inspire me every time I plug in.',
    badge: 'Personally used & trusted since 2019',
    studentBadge: null,
    bestFor: [
      'Vintage 60s Neck & Middle Tone',
      'Smooth Thornbucker+ Humbucker Bridge',
      'Driven Strat Tones',
    ],
    links: {
      official: 'https://www.suhr.com/pickups/',
      distributor:
        'https://thestockist.in/product-category/accessories/pickups/?filter_brand=suhr',
    },
    images: [
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Shuvam-Raha-Suhr-pickups-60neck-v60middle-thronbucker-bridge-1-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Shuvam-Raha-Suhr-pickups-60neck-v60middle-thronbucker-bridge-2-819x1024.jpg',
    ],
  },
  {
    id: 'dimarzio-cables',
    category: 'Strings & Cables',
    title: 'DiMarzio Guitar Cables',
    subtitle: 'My go-to cables for live + studio performance',
    description:
      'I’ve been using DiMarzio guitar cables for the past year for both live and studio work. I use the EP1718SSMG (18ft) for stage performances and the EP1710SSVT (10ft) for studio recordings. They deliver low noise, clear tone, and excellent durability, with a braided design that prevents tangling — reliable for daily use.',
    badge: 'Personally used & trusted',
    studentBadge: null,
    bestFor: [
      'Live stage performances (18ft)',
      'Studio recordings (10ft)',
      'Noiseless braided signal path',
    ],
    links: {
      amazon: 'https://amzn.to/4vGdnIT',
      distributor:
        'https://thestockist.in/product-category/accessories/guitar-cables/?filter_brand=dimarzio',
      official: 'https://www.dimarzio.com/cables/cables/guitar',
    },
    images: [
      'https://shuvamrahamusic.com/wp-content/uploads/2025/09/Dimarzio-Cables-The-Stockist-Shuvam-Raha-poster-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Dimarzio-2-Shuvam-Raha-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Dimarzio-1-Shuvam-Raha-819x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Dimarzio-3-Shuvam-Raha-819x1024.jpg',
    ],
  },
  {
    id: 'gruvgear-kapsule',
    category: 'Cases & Stands',
    title: 'Gruv Gear Kapsule Electric Guitar Case',
    subtitle: 'My go-to case for maximum protection, travel & gigs',
    description:
      'My guitars now have maximum protection and comfort wherever I go. The Gruv Gear Kapsule Electric Guitar Case is rugged, travel-ready, and extremely well-designed — something I genuinely trust for both flights and local gigs. It combines the protection of a hard case with the convenience of a gig bag, making travel stress-free.',
    badge: 'Personally used & trusted',
    studentBadge: null,
    bestFor: [
      'Air travel & touring',
      'Premium guitar protection',
      'Comfortable wheel-transport',
    ],
    links: {
      amazon: 'https://amzn.to/4cuXagG',
      official: 'https://gruvgear.com/collections/guitar-bags/products/kapsule',
      distributor:
        'https://www.promusicals.com/index.php?route=product/manufacturer/info&manufacturer_id=74',
    },
    images: [
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Gruv-gear-kapsule-2-Shuvam-Raha-768x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Gruv-gear-kapsule-1-768x1024.jpg',
    ],
  },
  {
    id: 'uad-apollo',
    category: 'Studio & Recording',
    title: 'UAD Apollo X4 Gen 2',
    subtitle: 'My main audio interface for studio recording & production',
    description:
      'Using Universal Audio interfaces for 5+ years, I’ve upgraded from Apollo Solo & Duo USB to the Apollo x4 Gen 2. The improvement in audio quality, ultra-low latency, and enhanced Unison preamps is clearly noticeable. With powerful DSP for smooth plugin workflow, it feels like a complete professional studio solution — proud to be a UAD user.',
    badge: 'Personally used & trusted',
    studentBadge: null,
    bestFor: [
      'Professional recording & mixing',
      'Real-time DSP plugins',
      'Ultra-low latency tracking',
    ],
    links: {
      official: 'https://www.uaudio.com/pages/apollo',
      distributor:
        'https://www.promusicals.com/index.php?route=product/manufacturer/info&manufacturer_id=58',
    },
    images: [
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/UAD-Apollo-X4-Gen-2-Shuvam-Raha-1-768x1024.jpeg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/UAD-Apollo-X4-Gen-2-Shuvam-Raha-2-768x1024.jpeg',
    ],
  },
  {
    id: 'ollo-x1',
    category: 'Studio & Recording',
    title: 'OLLO Audio X1 Mixing Headphone',
    subtitle: 'My main headphone for mixing & mastering',
    description:
      'After a long wait, the OLLO Audio X1 Mixing Headphones are finally here. Big thanks to Fidelika, the official distributor in India, for making this possible. These open-back headphones deliver an incredibly transparent and detailed sound, which is essential for accurate mixing and mastering decisions.',
    badge: 'Personally used & trusted',
    studentBadge: null,
    bestFor: [
      'Mixing & Mastering',
      'Transparent sound reference',
      'Hours of fatiguing-free studio work',
    ],
    links: {
      distributor: 'https://fidelika.in/ollo-audio-x1/',
      official: 'https://olloaudio.com/products/x1',
    },
    images: [
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Ollo-Audio-Shuvam-Raha-1-768x1024.jpg',
      'https://shuvamrahamusic.com/wp-content/uploads/2026/02/Ollo-Audio-Shuvam-Raha-2-768x1024.jpg',
    ],
  },
];
export type { GearItem as GearItemType };
