'use client';

import React, { useMemo, useState } from 'react';

import Link from 'next/link';

import PageLayout from '@/components/page-layout';

import {
  LuCalendarDays,
  LuCompass,
  LuGlobe,
  LuGuitar,
  LuMapPin,
  LuMusic,
  LuSearch,
  LuSparkles,
  LuStar,
  LuUsers,
} from 'react-icons/lu';

// Types for structured data
interface PerformanceShow {
  date: string;
  month: string;
  year: number;
  location: string;
  venue?: string;
  details?: string;
  artist: string;
}

interface CollabItem {
  artist: string;
  type: string;
  circuit: string;
  themeColor: string;
}

interface VenueCategory {
  title: string;
  identity: string;
  items: string[];
  themeColor: string;
  icon: React.ElementType;
}

// 1. Performance Highlights Gigs List
const PERFORMANCE_SHOWS: PerformanceShow[] = [
  // ── 2026 ──
  {
    date: '30th May',
    month: 'May',
    year: 2026,
    location: 'Guwahati',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '25th May',
    month: 'May',
    year: 2026,
    location: 'Gangtok, Sikkim',
    venue: 'Mayfair Spring Valley Resort',
    details: '56th TCC & ERPC MEETING under DVC',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '12th May',
    month: 'May',
    year: 2026,
    location: 'Kolkata',
    venue: 'Scrapyard Brewing Co.',
    artist: 'Kanishk Arora',
  },
  {
    date: '25th April',
    month: 'April',
    year: 2026,
    location: 'Kalimpong',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '24th April',
    month: 'April',
    year: 2026,
    location: 'Darjeeling',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '22nd April',
    month: 'April',
    year: 2026,
    location: 'Guwahati',
    venue: 'Mayfair Spring Valley Resort',
    details: 'The Asian Paints North East Awards 2026',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '25th March',
    month: 'March',
    year: 2026,
    location: 'Bhubaneswar',
    venue: 'Infosys Campus',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '18th & 19th March',
    month: 'March',
    year: 2026,
    location: 'Varanasi',
    venue: 'Taj Ganges',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '15th March',
    month: 'March',
    year: 2026,
    location: 'Kolkata',
    venue: 'GD Birla Sabhaghar',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '14th March',
    month: 'March',
    year: 2026,
    location: 'Chennai',
    venue: 'The Music Academy',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '1st March',
    month: 'March',
    year: 2026,
    location: 'Siliguri',
    venue: 'Shivmandir Ground',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '20th February',
    month: 'February',
    year: 2026,
    location: 'Kolkata',
    venue: 'La Soiree',
    artist: 'Kanishk Arora',
  },
  {
    date: '18th February',
    month: 'February',
    year: 2026,
    location: 'Kolkata',
    venue: 'Drunken Teddy Sector V',
    artist: 'Kanishk Arora',
  },
  {
    date: '14th February',
    month: 'February',
    year: 2026,
    location: 'Kolkata',
    venue: 'Salt Lake Sector V',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '11th February',
    month: 'February',
    year: 2026,
    location: 'Raipur',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '2nd February',
    month: 'February',
    year: 2026,
    location: 'Rourkela',
    artist: 'Kanishk Arora',
  },
  {
    date: '30th January',
    month: 'January',
    year: 2026,
    location: 'Kolkata',
    venue: 'Diamond Harbour',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '29th January',
    month: 'January',
    year: 2026,
    location: 'Siliguri',
    venue: 'Surya Sen Mahavidyalaya',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '24th January',
    month: 'January',
    year: 2026,
    location: 'Jalpaiguri',
    venue: 'ABPC Ground',
    details: 'Jalpaiguri Utsav',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '23rd January',
    month: 'January',
    year: 2026,
    location: 'Siliguri',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '22nd January',
    month: 'January',
    year: 2026,
    location: 'Kurseong',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '21st January',
    month: 'January',
    year: 2026,
    location: 'Cooch Behar',
    venue: 'Dinhata',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '18th January',
    month: 'January',
    year: 2026,
    location: 'Kolkata',
    venue: 'The Bengal Paddle Jetty (The Barge Company)',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '11th January',
    month: 'January',
    year: 2026,
    location: 'Midnapore',
    venue: 'Midnapore Food & Art Festival',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '10th January',
    month: 'January',
    year: 2026,
    location: 'Kolkata',
    venue: 'Asoka Road, Alipore',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '8th January',
    month: 'January',
    year: 2026,
    location: 'Kolkata',
    venue: 'Dumdum Utsav',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '7th January',
    month: 'January',
    year: 2026,
    location: 'Ranaghat',
    venue: 'Ranaghat Vivek Utsav',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '6th January',
    month: 'January',
    year: 2026,
    location: 'New Barrackpore',
    venue: 'New Barrackpore Puspo Mela',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '5th January',
    month: 'January',
    year: 2026,
    location: 'Malda',
    venue: 'Malda College',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '4th January',
    month: 'January',
    year: 2026,
    location: 'Kalna',
    venue: 'Kalna Pithe Puli Utsav',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '3rd January',
    month: 'January',
    year: 2026,
    location: 'Naihati',
    venue: 'RBC College',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '1st January',
    month: 'January',
    year: 2026,
    location: 'Kolkata',
    venue: 'Anderson Club',
    artist: 'Antara Nandy & Ankita Nandy',
  },

  // ── 2025 ──
  {
    date: '31st December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Calcutta Swimming Club',
    artist: 'Kanishk Arora',
  },
  {
    date: '30th December',
    month: 'December',
    year: 2025,
    location: 'Halisahar',
    venue: 'Bijpur Utsav',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '28th December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Drunken Teddy Sector V',
    artist: 'Kanishk Arora',
  },
  {
    date: '28th December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'New Alipore',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '23rd December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Scrapyard Brewing Co.',
    artist: 'Kanishk Arora',
  },
  {
    date: '22nd December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'The Atmosphere',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '21st December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Reality',
    artist: 'Kanishk Arora',
  },
  {
    date: '19th December',
    month: 'December',
    year: 2025,
    location: 'Durgapur',
    venue: 'Gandhi More Mela Ground',
    details: 'Bengal Rising 4.0 — The Annual Business Fair',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '17th December',
    month: 'December',
    year: 2025,
    location: 'Indore',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '12th December',
    month: 'December',
    year: 2025,
    location: 'Durgapur',
    venue: 'Durgapur Utsav',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '10th December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'JW Marriott',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '9th December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Ballygunge',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '8th December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Fairfield by Marriott',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '6th December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Kusum Devi Sunderlal Dugar Jain Dental College',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '5th December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Sabka Club',
    artist: 'Krishna Sharma',
  },
  {
    date: '4th December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Park Street',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '3rd December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Visa House, New Alipore',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '2nd December',
    month: 'December',
    year: 2025,
    location: 'Kolkata',
    venue: 'Ojas Banquet Hall',
    artist: 'Kanishk Arora',
  },
  {
    date: '22nd November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'Taj Bengal',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '16th November',
    month: 'November',
    year: 2025,
    location: 'Cooch Behar',
    venue: 'Rashmela',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '14th November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'The Almond',
    artist: 'Kanishk Arora',
  },
  {
    date: '13th November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'Roots',
    artist: 'Kanishk Arora',
  },
  {
    date: '12th November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'OG By the Lake',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '11th November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'Scrapyard Brewing Co.',
    artist: 'Kanishk Arora',
  },
  {
    date: '9th November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'Reality',
    artist: 'Kanishk Arora',
  },
  {
    date: '8th November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'Darlings',
    artist: 'Kanishk Arora',
  },
  {
    date: '7th November',
    month: 'November',
    year: 2025,
    location: 'Dhanbad, Jharkhand',
    artist: 'Kanishk Arora',
  },
  {
    date: '2nd November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'Anassa',
    artist: 'Kanishk Arora',
  },
  {
    date: '1st November',
    month: 'November',
    year: 2025,
    location: 'Kolkata',
    venue: 'The Cult by The Bikers Café',
    artist: 'Kanishk Arora',
  },
  {
    date: '31st October',
    month: 'October',
    year: 2025,
    location: 'Purba Medinipur',
    venue: 'Nandakumar',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '26th October',
    month: 'October',
    year: 2025,
    location: 'Kolkata',
    venue: 'Reality',
    artist: 'Kanishk Arora',
  },
  {
    date: '25th October',
    month: 'October',
    year: 2025,
    location: 'Kolkata',
    venue: 'Drunken Teddy Sector V',
    artist: 'Kanishk Arora',
  },
  {
    date: '23rd October',
    month: 'October',
    year: 2025,
    location: 'Kolkata',
    venue: 'Roots',
    artist: 'Kanishk Arora',
  },
  {
    date: '6th October',
    month: 'October',
    year: 2025,
    location: 'Siliguri',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '5th October',
    month: 'October',
    year: 2025,
    location: 'Darjeeling',
    venue: 'Taj Chia Kutir Resort & Spa',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '4th October',
    month: 'October',
    year: 2025,
    location: 'Kolkata',
    venue: 'The Cult by The Bikers Café',
    artist: 'Kanishk Arora',
  },
  {
    date: '19th September',
    month: 'September',
    year: 2025,
    location: 'Chandigarh, Punjab',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '17th September',
    month: 'September',
    year: 2025,
    location: 'Kolkata',
    venue: 'RTB 2.0 Club',
    artist: 'Kanishk Arora',
  },
  {
    date: '13th September',
    month: 'September',
    year: 2025,
    location: 'Kolaghat',
    venue: 'Hotel Sonar Bangla',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '31st July',
    month: 'July',
    year: 2025,
    location: 'Kolkata',
    venue: 'ITC Royal',
    details: '25th Flavourful Years of Biskfarm',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '6th June',
    month: 'June',
    year: 2025,
    location: 'Bardhaman',
    artist: 'Antara Nandy & Ankita Nandy',
  },
  {
    date: '13th May',
    month: 'May',
    year: 2025,
    location: 'Kerala',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '9th May',
    month: 'May',
    year: 2025,
    location: 'Kochi',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '23rd April',
    month: 'April',
    year: 2025,
    location: 'Kolkata',
    venue: '27th Ballygunge Park',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '19th April',
    month: 'April',
    year: 2025,
    location: 'Bhubaneswar',
    venue: 'Oopre',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '18th April',
    month: 'April',
    year: 2025,
    location: 'Kolkata',
    venue: 'Altair Boutique Hotel, Galaxy',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '29th March',
    month: 'March',
    year: 2025,
    location: 'Maynaguri',
    details: 'Nexshow VOL1 Presents the Ultimate Music Fusion',
    artist: 'Nandy Sisters',
  },
  {
    date: '28th March',
    month: 'March',
    year: 2025,
    location: 'Kolkata',
    venue: 'Biswa Bangla Convention Centre',
    details: 'Gr Reddy’s Laboratories M Power Meet',
    artist: 'Nandy Sisters',
  },
  {
    date: '26th March',
    month: 'March',
    year: 2025,
    location: 'Kolkata',
    venue: 'Park Street Social',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '24th March',
    month: 'March',
    year: 2025,
    location: 'Lucknow',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '23rd March',
    month: 'March',
    year: 2025,
    location: 'Bhopal, Madhya Pradesh',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '22nd March',
    month: 'March',
    year: 2025,
    location: 'Indore, Madhya Pradesh',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '7th March',
    month: 'March',
    year: 2025,
    location: 'Alipore',
    venue: 'Penn Road',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '1st March',
    month: 'March',
    year: 2025,
    location: 'Kolkata',
    venue: 'Spring Club',
    artist: 'Kanishk Arora',
  },
  {
    date: '28th February',
    month: 'February',
    year: 2025,
    location: 'Newtown',
    venue: 'International Finance Centre',
    artist: 'Kanishk Arora',
  },
  {
    date: '22nd February',
    month: 'February',
    year: 2025,
    location: 'Mankundu',
    venue: 'Supreme Knowledge Foundation College',
    artist: 'Nandy Sisters',
  },
  {
    date: '8th February',
    month: 'February',
    year: 2025,
    location: 'Mandarmani',
    venue: 'SBI Life',
    artist: 'Nandy Sisters',
  },
  {
    date: '2nd February',
    month: 'February',
    year: 2025,
    location: 'Hooghly',
    venue: 'Hooghly Engineering & Technology College, Aquamarina',
    artist: 'Nandy Sisters',
  },
  {
    date: '28th January',
    month: 'January',
    year: 2025,
    location: 'Tinsukia, Assam',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '27th January',
    month: 'January',
    year: 2025,
    location: 'Malda',
    venue: 'Malda College',
    artist: 'Nandy Sisters',
  },
  {
    date: '26th January',
    month: 'January',
    year: 2025,
    location: 'Gangarampur',
    artist: 'Nandy Sisters',
  },
  {
    date: '20th January',
    month: 'January',
    year: 2025,
    location: 'Digha',
    venue: 'Digha Festival',
    artist: 'Nandy Sisters',
  },
  {
    date: '19th January',
    month: 'January',
    year: 2025,
    location: 'Newtown',
    venue: 'Astra Tower',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '17th January',
    month: 'January',
    year: 2025,
    location: 'Newtown',
    venue: 'Derozio Memorial College',
    artist: 'Nandy Sisters',
  },
  {
    date: '12th January',
    month: 'January',
    year: 2025,
    location: 'Dooars',
    venue: 'Dooars Utsav',
    artist: 'Nandy Sisters',
  },
  {
    date: '11th January',
    month: 'January',
    year: 2025,
    location: 'Suri',
    venue: 'Suri Utsav',
    artist: 'Nandy Sisters',
  },
  {
    date: '10th January',
    month: 'January',
    year: 2025,
    location: 'Kolaghat',
    artist: 'Nandy Sisters',
  },
  {
    date: '1st January',
    month: 'January',
    year: 2025,
    location: 'Madhyamgram',
    venue: 'Madhyamgram Paribesh Mela',
    artist: 'Nandy Sisters',
  },

  // ── 2024 ──
  {
    date: '31st December',
    month: 'December',
    year: 2024,
    location: 'Kolkata',
    venue: 'Saturday Club',
    artist: 'Nandy Sisters',
  },
  {
    date: '30th December',
    month: 'December',
    year: 2024,
    location: 'Arambagh',
    venue: 'Arambagh Utsav',
    artist: 'Nandy Sisters',
  },
  {
    date: '29th December',
    month: 'December',
    year: 2024,
    location: 'Haripal',
    venue: 'Haripal Utsav',
    artist: 'Nandy Sisters',
  },
  {
    date: '28th December',
    month: 'December',
    year: 2024,
    location: 'Kolkata',
    venue: 'Hindustan Club',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '22nd December',
    month: 'December',
    year: 2024,
    location: 'Keonjhar, Odisha',
    artist: 'Nandy Sisters',
  },
  {
    date: '21st December',
    month: 'December',
    year: 2024,
    location: 'Kolkata',
    venue: 'ITC Royal',
    artist: 'Kanishk Arora',
  },
  {
    date: '16th December',
    month: 'December',
    year: 2024,
    location: 'Kolkata',
    venue: 'Eco Park',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '15th December',
    month: 'December',
    year: 2024,
    location: 'Baguiati',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '10th December',
    month: 'December',
    year: 2024,
    location: 'Kolkata',
    venue: 'Taj Bengal',
    artist: 'Nandy Sisters',
  },
  {
    date: '1st December',
    month: 'December',
    year: 2024,
    location: 'Kalyani',
    venue: 'Kalyani Boi Utsav',
    artist: 'Nandy Sisters',
  },
  {
    date: '26th November',
    month: 'November',
    year: 2024,
    location: 'Bangalore',
    venue: 'Concorde Mayfair',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '24th November',
    month: 'November',
    year: 2024,
    location: 'Kolkata',
    venue: 'Aristocrat Hotel, New Town',
    artist: 'Avijit',
  },
  {
    date: '3rd November',
    month: 'November',
    year: 2024,
    location: 'Rourkela',
    venue: 'Mayfair',
    artist: 'Nandy Sisters',
  },
  {
    date: '3rd November',
    month: 'November',
    year: 2024,
    location: 'Tamluk',
    artist: 'Nandy Sisters',
  },
  {
    date: '23rd October',
    month: 'October',
    year: 2024,
    location: 'Sundarban',
    venue: 'Hotel Sonar Bangla',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '20th October',
    month: 'October',
    year: 2024,
    location: 'Kerala',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '13th October',
    month: 'October',
    year: 2024,
    location: 'Surat, Gujarat',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '12th October',
    month: 'October',
    year: 2024,
    location: 'Kolkata',
    venue: 'Royal Bengal Hall, City Centre 1',
    artist: 'Kanishk Arora',
  },
  {
    date: '8th October',
    month: 'October',
    year: 2024,
    location: 'Kolkata',
    venue: 'Scrapyard Brewing Co.',
    artist: 'Kanishk Arora',
  },
  {
    date: '1st October',
    month: 'October',
    year: 2024,
    location: 'Kolkata',
    venue: 'Scrapyard Brewing Co.',
    artist: 'Kanishk Arora',
  },
  {
    date: '21st September',
    month: 'September',
    year: 2024,
    location: 'Kolkata',
    venue: 'Eddys',
    artist: 'Kanishk Arora',
  },
  {
    date: '20th September',
    month: 'September',
    year: 2024,
    location: 'Kolkata',
    venue: 'South City – Scrapyard Brewing Co.',
    artist: 'Kanishk Arora',
  },
  {
    date: '15th September',
    month: 'September',
    year: 2024,
    location: 'Kolkata',
    venue: 'Taj Taal Kutir',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '14th September',
    month: 'September',
    year: 2024,
    location: 'Kolkata',
    venue: 'Pride Plaza',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '7th September',
    month: 'September',
    year: 2024,
    location: 'Kolkata',
    venue: 'Almond',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '16th August',
    month: 'August',
    year: 2024,
    location: 'Kolkata',
    venue: 'JW Marriott',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '12th August',
    month: 'August',
    year: 2024,
    location: 'Kolkata',
    venue: 'ITC Royal Bengal',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '10th August',
    month: 'August',
    year: 2024,
    location: 'Siliguri',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '7th August',
    month: 'August',
    year: 2024,
    location: 'Ranchi',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '4th August',
    month: 'August',
    year: 2024,
    location: 'Jamshedpur',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '19th July',
    month: 'July',
    year: 2024,
    location: 'Kolkata',
    venue: 'Hyatt Centric Ballygunge',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '8th July',
    month: 'July',
    year: 2024,
    location: 'Itahari, Nepal',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '30th June',
    month: 'June',
    year: 2024,
    location: 'Kolkata',
    venue: 'Salt Lake Sector V',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '29th June',
    month: 'June',
    year: 2024,
    location: 'Kolkata',
    venue: 'Newtown',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '20th June',
    month: 'June',
    year: 2024,
    location: 'Kolkata',
    venue: 'ITC Sonar Bangla',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '2nd June',
    month: 'June',
    year: 2024,
    location: 'Kolkata',
    venue: 'Ballygunge',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '2nd June',
    month: 'June',
    year: 2024,
    location: 'Kolkata',
    venue: 'Park Street',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '12th May',
    month: 'May',
    year: 2024,
    location: 'Kolkata',
    venue: 'Cobo Calcutta',
    artist: 'Kanishk Arora',
  },
  {
    date: '10th May',
    month: 'May',
    year: 2024,
    location: 'Kolkata',
    venue: 'Taj Bengal',
    artist: 'Kanishk Arora',
  },
  {
    date: '10th May',
    month: 'May',
    year: 2024,
    location: 'Kolkata',
    venue: 'Mishtika Banquet, Eco Park',
    artist: 'Kanishk Arora',
  },
  {
    date: '2nd May',
    month: 'May',
    year: 2024,
    location: 'Bilaspur',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '13th April',
    month: 'April',
    year: 2024,
    location: 'Kolkata',
    venue: 'Bombastic, Celica Park',
    artist: 'Kanishk Arora',
  },
  {
    date: '13th April',
    month: 'April',
    year: 2024,
    location: 'Kolkata',
    venue: 'Reality',
    artist: 'Kanishk Arora',
  },
  {
    date: '2nd April',
    month: 'April',
    year: 2024,
    location: 'Jharkhand',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '31st March',
    month: 'March',
    year: 2024,
    location: 'Kolkata',
    venue: 'Salt Lake Sector 1',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '12th March',
    month: 'March',
    year: 2024,
    location: 'Kolkata',
    venue: 'ITC Royal',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '6th March',
    month: 'March',
    year: 2024,
    location: 'Assam',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '25th February',
    month: 'February',
    year: 2024,
    location: 'Kolkata',
    venue: 'Salt Lake Sector 5',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '23rd February',
    month: 'February',
    year: 2024,
    location: 'Kolkata',
    venue: 'PC Chandra Garden',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '15th February',
    month: 'February',
    year: 2024,
    location: 'Kolkata',
    venue: 'Novotel Kolkata – Hotel & Residences',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '14th February',
    month: 'February',
    year: 2024,
    location: 'Kolkata',
    venue: 'Wedlock Greens Hotels & Resorts',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '2nd February',
    month: 'February',
    year: 2024,
    location: 'Kolkata',
    venue: 'Hyatt Regency',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '21st January',
    month: 'January',
    year: 2024,
    location: 'Amritsar, Punjab',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '17th January',
    month: 'January',
    year: 2024,
    location: 'Kolkata',
    venue: 'Beleghata',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '16th January',
    month: 'January',
    year: 2024,
    location: 'Jamshedpur',
    venue: 'The Wave International',
    artist: 'Priyanka Das Raha',
  },
  {
    date: '6th January',
    month: 'January',
    year: 2024,
    location: 'Kolkata',
    venue: 'Taj Bengal',
    artist: 'Kanishk Arora',
  },
  {
    date: '6th January',
    month: 'January',
    year: 2024,
    location: 'Kolkata',
    venue: 'Alipore',
    artist: 'Priyanka Das Raha',
  },
];

// 2. Collabs Array
const COLLABS: CollabItem[] = [
  {
    artist: 'Priyanka Das Raha',
    type: 'Premium Events, Destination Events, Corporate Shows',
    circuit: 'Hotels, Premium Venues, Interstate Tours',
    themeColor:
      'text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/35 hover:bg-cyan-500/10',
  },
  {
    artist: 'Antara Nandy & Ankita Nandy (Nandy Sisters)',
    type: 'Festivals, Cultural Concerts, Institutional Shows',
    circuit: 'Utsavs, Public Concerts, College Events & Touring Gigs',
    themeColor:
      'text-violet-400 border-violet-500/20 bg-violet-500/5 hover:border-violet-500/35 hover:bg-violet-500/10',
  },
  {
    artist: 'Kanishk Arora',
    type: 'Club & Urban Live Music Circuit',
    circuit: 'Breweries, Clubs, Lounge Venues, Concert Pubs',
    themeColor:
      'text-amber-400 border-amber-500/20 bg-amber-500/5 hover:border-amber-500/35 hover:bg-amber-500/10',
  },
];

// 3. Venue Categories Array
const VENUE_CATEGORIES: VenueCategory[] = [
  {
    title: 'Premium Hotels & Luxury Venues',
    identity:
      'Corporate • Luxury Hospitality • Premium Live Events • Destination Music Performances',
    themeColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    icon: LuStar,
    items: [
      'Taj Bengal, Kolkata',
      'ITC Royal Bengal, Kolkata',
      'JW Marriott Kolkata',
      'Hyatt Regency Kolkata',
      'Novotel Kolkata Hotel & Residences',
      'Fairfield by Marriott Kolkata',
      'Taj Taal Kutir, Kolkata',
      'Mayfair Spring Valley Resort, Guwahati',
    ],
  },
  {
    title: 'Club & Urban Live Music Circuit',
    identity:
      'Urban/ Modern Live Music • Commercial Club Circuit • Contemporary Performance Spaces',
    themeColor: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    icon: LuMusic,
    items: [
      'Scrapyard Brewing Co., Kolkata',
      'Drunken Teddy, Kolkata',
      'Reality Kolkata',
      'Roots Kolkata',
      'The Cult by The Bikers Café',
      'La Soiree Kolkata',
    ],
  },
  {
    title: 'Festivals & Cultural Events',
    identity: 'Large Audience Cultural Performances • Festival Touring Circuit',
    themeColor: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
    icon: LuSparkles,
    items: [
      'Ranaghat Bibek Utsav 2026',
      'New Barrackpore Puspo Mela 2025',
      'Dumdum Utsav 2025',
      'Jalpaiguri Utsav 2026',
      'Durgapur Utsav 2026',
      'Digha Festival 2025',
      'Suri Utsav',
      'Dooars Utsav 2025',
      'Rashmela Cooch Behar 2025',
      'Midnapore Food & Art Festival 2026',
      'Arambag Utsav 2024',
      'Bijpur Utsav 2025',
      'Kalna Pithe Puli Utsav 2026',
      'Kalyani Boi Utsav 2024',
      'Haripal Utsav 2024',
      'Madhyamgram Paribesh Mela 2025',
    ],
  },
  {
    title: 'Institutional & College Performances',
    identity: 'Youth Audience • Institutional Engagement • Campus Concerts',
    themeColor: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
    icon: LuUsers,
    items: [
      'GD Birla Sabhaghar',
      'The Music Academy Chennai',
      'RBC College Naihati',
      'Malda College',
      'Derozio Memorial College',
      'Supreme Knowledge Foundation College',
      'Kusum Devi Sunderlal Dugar Jain Dental College',
      'Infosys Campus Bhubaneswar',
    ],
  },
];

export default function PerformanceHighlightsClient() {
  const [selectedYear, setSelectedYear] = useState<'All' | 2026 | 2025 | 2024>(
    'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtistFilter, setSelectedArtistFilter] = useState('All');

  // Filter shows based on search query, year and artist select
  const filteredShows = useMemo(() => {
    return PERFORMANCE_SHOWS.filter((show) => {
      const matchesYear = selectedYear === 'All' || show.year === selectedYear;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        show.location.toLowerCase().includes(query) ||
        (show.venue && show.venue.toLowerCase().includes(query)) ||
        (show.details && show.details.toLowerCase().includes(query)) ||
        show.artist.toLowerCase().includes(query);

      const matchesArtist =
        selectedArtistFilter === 'All' ||
        show.artist.toLowerCase().includes(selectedArtistFilter.toLowerCase());

      return matchesYear && matchesSearch && matchesArtist;
    });
  }, [selectedYear, searchQuery, selectedArtistFilter]);

  return (
    <PageLayout
      title="Performance Highlights"
      subtitle="Live Performance Portfolio &amp; Professional Stage Metrics (2024 – 2026)"
    >
      <div className="flex flex-col gap-16 text-left">
        {/* ==========================================
            SECTION 1: ARTIST PROFILE OVERVIEW
           ========================================== */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <LuGuitar className="h-4.5 w-4.5 text-cyan-400" />
                <span className="text-[10px] font-black tracking-widest text-cyan-200 uppercase">
                  Performing Artist
                </span>
              </div>
              <h2 className="font-heading text-3xl font-black text-white sm:text-4xl">
                Artist Profile
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              Shuvam Raha is a versatile live guitarist and performing musician
              with extensive experience across premium hospitality venues,
              cultural festivals, club circuits, corporate events, interstate
              touring productions, and institutional concerts.
            </p>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              He has collaborated with multiple established artists and live
              acts including Priyanka Das Raha, Antara Nandy &amp; Ankita Nandy
              (Nandy Sisters), and Kanishk Arora across 150+ live performances
              during the 2024–2026 touring season.
            </p>
          </div>

          {/* Quick Metrics Snapshots */}
          <div className="grid w-full shrink-0 grid-cols-2 gap-4 lg:max-w-[420px]">
            {[
              {
                label: 'Touring Years',
                value: '2024 – 2026',
                icon: LuCalendarDays,
                color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
              },
              {
                label: 'Shows Performed',
                value: '150+ Gigs',
                icon: LuSparkles,
                color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
              },
              {
                label: 'Regional Hubs',
                value: 'India & Nepal',
                icon: LuGlobe,
                color:
                  'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
              },
              {
                label: 'Circuits Covered',
                value: '4 Key Segments',
                icon: LuCompass,
                color: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
              },
            ].map((metric, idx) => {
              const MetricIcon = metric.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.01] p-4.5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.03]"
                >
                  <div
                    className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border ${metric.color} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                  >
                    <MetricIcon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                    {metric.label}
                  </h4>
                  <p className="font-heading mt-1 text-sm font-black text-white sm:text-base">
                    {metric.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="border-white/5" />

        {/* ==========================================
            SECTION 2: GEOGRAPHIC REACH
           ========================================== */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              Touring History
            </span>
            <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Geographic Performance Reach
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                Strong Regional Hubs
              </span>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  Primary Locations
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">
                  Kolkata, Siliguri, Guwahati, Darjeeling
                </p>
              </div>
            </div>

            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-violet-400 uppercase">
                Interstate Touring
              </span>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  9 States Covered
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">
                  Kerala, Punjab, Madhya Pradesh, Assam, Jharkhand, Odisha,
                  Tamil Nadu, Gujarat, Uttar Pradesh
                </p>
              </div>
            </div>

            <div className="space-y-2.5 rounded-2xl border border-white/[0.04] bg-[#0A0A15]/60 p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-emerald-400 uppercase">
                International Tours
              </span>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  Global Concerts
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">
                  Nepal — Itahari Performance (2024)
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* ==========================================
            SECTION 3: COLLABORATION MATRIX
           ========================================== */}
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              On Stage Partnering
            </span>
            <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Artist Collaboration Matrix
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {COLLABS.map((collab, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${collab.themeColor}`}
              >
                {/* Glow Overlay */}
                <div className="pointer-events-none absolute -right-16 -bottom-16 h-36 w-36 rounded-full bg-white/0 blur-xl transition-all duration-500 group-hover:bg-white/[0.02]" />

                <div className="space-y-4">
                  <h4 className="font-heading text-lg leading-snug font-black text-white transition-colors duration-300 group-hover:text-cyan-300">
                    {collab.artist}
                  </h4>

                  <div className="space-y-3 border-t border-white/5 pt-2">
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                        Performance Formats
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm">
                        {collab.type}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                        Core Tour Circuit
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                        {collab.circuit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/5" />

        {/* ==========================================
            SECTION 4: VENUE CATEGORIES
           ========================================== */}
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              Venues Database
            </span>
            <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Venue &amp; Performance Categories
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {VENUE_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0A0A15]/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:bg-[#0E0E22]/60"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${cat.themeColor} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="font-heading text-base font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                          {cat.title}
                        </h4>
                        <span className="mt-1 block text-[9px] leading-relaxed font-bold tracking-wide text-gray-500 uppercase">
                          {cat.identity}
                        </span>
                      </div>

                      <ul className="grid grid-cols-1 gap-1.5 border-t border-white/5 pt-4 sm:grid-cols-2">
                        {cat.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-center gap-1.5 text-xs leading-relaxed text-gray-400 sm:text-sm"
                          >
                            <span className="h-1 w-1 shrink-0 rounded-full bg-cyan-400/60" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="border-white/5" />

        {/* ==========================================
            SECTION 5: LIVE SHOWS TIMELINE
           ========================================== */}
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                Gigs Archive
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                Showcase Gigs Timeline
              </h3>
            </div>

            {/* Filter Pills for Gigs Years */}
            <div className="flex flex-wrap gap-1.5">
              {(['All', 2026, 2025, 2024] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`rounded-full px-4.5 py-1.5 text-[11px] font-black tracking-wider uppercase transition-all duration-300 ${
                    selectedYear === year
                      ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                      : 'border border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/15 hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Filters Bar: Search & Artist Select Filters */}
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/5 bg-[#080812]/50 p-4.5 backdrop-blur-3xl md:grid-cols-3">
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
                <LuSearch className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search by city, venue, or detail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pr-4 pl-10 text-xs text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04]"
              />
            </div>

            {/* Artist Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedArtistFilter}
                onChange={(e) => setSelectedArtistFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs text-white transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04]"
              >
                <option value="All" className="bg-[#05050A] text-gray-300">
                  Filter by Collaborator: All
                </option>
                <option
                  value="Priyanka Das Raha"
                  className="bg-[#05050A] text-gray-300"
                >
                  Priyanka Das Raha
                </option>
                <option
                  value="Antara Nandy"
                  className="bg-[#05050A] text-gray-300"
                >
                  Nandy Sisters
                </option>
                <option
                  value="Kanishk Arora"
                  className="bg-[#05050A] text-gray-300"
                >
                  Kanishk Arora
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[9px] font-black tracking-widest text-gray-400 uppercase">
                ▼
              </div>
            </div>
          </div>

          {/* Vertical Timeline Lists */}
          {filteredShows.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#080812]/30 py-16 text-center">
              <LuSearch className="mb-3 h-8 w-8 animate-pulse text-gray-600" />
              <p className="text-sm text-gray-500">
                No performances match your current search options.
              </p>
            </div>
          ) : (
            <div className="relative ml-2 space-y-6 border-l border-white/10 pl-6">
              {filteredShows.map((show, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col gap-2 rounded-2xl border border-white/[0.03] bg-white/[0.01] p-4.5 transition-all duration-300 hover:border-cyan-500/15 hover:bg-[#0E0E22]/30"
                >
                  {/* Timeline Dot */}
                  <div className="absolute top-[22px] -left-[31px] flex h-2 w-2 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)] transition-transform duration-300 group-hover:scale-125" />

                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <span className="font-heading text-xs font-bold text-gray-400">
                      {show.date} {show.month}, {show.year}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                        show.artist.includes('Priyanka')
                          ? 'border border-cyan-500/20 bg-cyan-500/10 text-cyan-400'
                          : show.artist.includes('Nandy')
                            ? 'border border-violet-500/20 bg-violet-500/10 text-violet-400'
                            : 'border border-amber-500/20 bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {show.artist}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 pt-1 text-sm leading-snug font-bold text-white sm:text-base">
                    <LuMapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <div>
                      <span>
                        {show.venue ? `${show.venue}, ` : ''}
                        {show.location}
                      </span>
                      {show.details && (
                        <span className="mt-1 block text-xs leading-relaxed font-medium text-gray-400 italic sm:text-sm">
                          ({show.details})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==========================================
            SECTION 6: CTA CALL
           ========================================== */}
        <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-[#0A0A15]/60 p-8 text-center shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 sm:p-10">
          <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-violet-500/10 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <h4 className="font-heading text-2xl leading-tight font-black text-white sm:text-3xl">
              Book Shuvam Raha for Live Gigs
            </h4>
            <p className="max-w-xl text-xs leading-relaxed text-gray-400 sm:text-sm">
              Inquire about booking Shuvam Raha as a session guitarist,
              performer for corporate events, destination weddings, cultural
              festivals, or lounge gig bookings.
            </p>

            <div className="mt-4 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/918961369468?text=Hi%20Shuvam,%20I%27m%20interested%20in%20booking%20you%20for%20a%20live%20show!"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-heading flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 sm:text-sm"
              >
                Inquire via WhatsApp
              </a>
              <Link
                href="/contact"
                className="group font-heading flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95 sm:text-sm"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
