import cockpit from '@/lib/cockpit';

export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categories: string[];
  tags: string[];
  date: string;
  readTime: string;
  author: Author;
}

export interface CategoryTheme {
  text: string;
  bg: string;
  border: string;
  glow: string;
  gradient: string;
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  'Getting Started': {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  Technique: {
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]',
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
  },
  Roadmap: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  Gears: {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]',
    gradient: 'from-rose-500/20 to-pink-500/20',
  },
  Rhythm: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  Default: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
};

export const BRIGHT_GRADIENTS: Record<string, string> = {
  'Getting Started': 'from-emerald-500 to-teal-500',
  Technique: 'from-violet-500 to-fuchsia-500',
  Roadmap: 'from-amber-500 to-orange-500',
  Gears: 'from-rose-500 to-pink-500',
  Rhythm: 'from-cyan-500 to-blue-500',
  Default: 'from-cyan-500 to-blue-500',
};

export const GLOW_COLORS: Record<string, string> = {
  'Getting Started': 'bg-emerald-500/10',
  Technique: 'bg-violet-500/10',
  Roadmap: 'bg-amber-500/10',
  Gears: 'bg-rose-500/10',
  Rhythm: 'bg-cyan-500/10',
  Default: 'bg-cyan-500/10',
};

export const AMBIENT_GLOWS: Record<string, { top: string; bottom: string }> = {
  All: {
    top: 'bg-cyan-600/10',
    bottom: 'bg-violet-600/10',
  },
  'Getting Started': {
    top: 'bg-emerald-600/10',
    bottom: 'bg-teal-600/10',
  },
  Technique: {
    top: 'bg-violet-600/10',
    bottom: 'bg-fuchsia-600/10',
  },
  Roadmap: {
    top: 'bg-amber-600/10',
    bottom: 'bg-orange-600/10',
  },
  Gears: {
    top: 'bg-rose-600/10',
    bottom: 'bg-pink-600/10',
  },
  Rhythm: {
    top: 'bg-cyan-600/10',
    bottom: 'bg-blue-600/10',
  },
  Default: {
    top: 'bg-cyan-600/10',
    bottom: 'bg-violet-600/10',
  },
};

// Cockpit CMS collection item structure
interface CockpitPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?:
    | {
        path?: string;
      }
    | string;
  categories?: string[];
  tags?: string[];
  date?: string;
  readTime?: string;
  authorName?: string;
  authorAvatar?:
    | {
        path?: string;
      }
    | string;
  authorRole?: string;
  authorBio?: string;
}

const AUTHOR_SHUVAM: Author = {
  name: 'Shuvam Raha',
  avatar: '/blog/shuvam-avatar.png',
  role: 'LCM Certified Music Instructor',
  bio: 'Professional guitarist, music producer, and educator with over 11 years of coaching experience, helping 150+ students globally master the guitar.',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'play-first-guitar-chord-beginners-guide',
    title: 'How to Play Your First Guitar Chord: A Beginner’s Guide',
    excerpt:
      'Starting guitar from scratch? Learn the exact finger placement and techniques to get a clean, buzzing-free sound on your first chord in minutes.',
    categories: ['Getting Started', 'Technique'],
    tags: ['Chords', 'Acoustic', 'Beginners'],
    date: 'June 4, 2026',
    readTime: '4 min read',
    coverImage: '/blog/acoustic-guitar-chords.png',
    author: AUTHOR_SHUVAM,
    content: `
      <p>Learning your first chord is a major milestone for any aspiring guitarist. However, many beginners run into the same frustrating issues: muffled strings, buzzing sounds, and aching fingers. In this guide, we’ll break down exactly how to play the E Minor (Em) and A Major (A) chords cleanly, without the pain.</p>
      
      <h2>Why the E Minor Chord is the Perfect First Step</h2>
      <p>The E Minor chord requires only two fingers, making it the absolute best starting point. It allows you to focus on your hand posture and pressing technique without overwhelming your fingers.</p>
      
      <blockquote>
        <strong>Pro Tip:</strong> Ensure your thumb is placed flat against the back of the neck, roughly halfway down. This provides the necessary leverage for your fingers on the fretboard.
      </blockquote>

      <h3>Step-by-Step Finger Placement for E Minor (Em):</h3>
      <ul>
        <li><strong>Finger 1 (Index)</strong>: Place it on the 2nd fret of the 5th string (A string).</li>
        <li><strong>Finger 2 (Middle)</strong>: Place it on the 2nd fret of the 4th string (D string).</li>
        <li><strong>Strum</strong>: Strum all 6 strings cleanly from top to bottom.</li>
      </ul>

      <h2>The Secrets to Getting a Clean Tone</h2>
      <p>If your chord sounds muffled or buzzy, check these three critical checkpoints:</p>
      <ol>
        <li><strong>Use the very tips of your fingers:</strong> Ensure your fingers are pointing straight down onto the strings, not collapsing flat. If they collapse, they will accidentally mute the neighboring open strings.</li>
        <li><strong>Get close to the frets:</strong> Place your fingers just behind the metal fret wire, not directly on top of it and not too far behind. Playing right behind the fret requires the least amount of pressure to ring cleanly.</li>
        <li><strong>Press firmly (but don't squeeze):</strong> Squeezing too hard will cause your hand to cramp and can pull the notes sharp. Press just hard enough so that the string makes contact with the metal fret.</li>
      </ol>

      <blockquote>
        "The guitar doesn't require brute strength; it requires precision. A tiny adjustment in the angle of your fingers can make a muted string ring out beautifully."
      </blockquote>

      <h2>Transitioning Between Chords</h2>
      <p>Once your E Minor chord sounds clear, introduce the A Major chord. The secret to smooth transitions is finding a <em>"pivot finger"</em> or establishing a mental anchor point. Keep practicing transitioning slowly between these two chords to build muscle memory before worrying about strumming speed.</p>
    `,
  },
  {
    id: 'post-2',
    slug: '5-exercises-for-faster-finger-dexterity',
    title: '5 Daily Exercises for Faster Finger Dexterity & Strength',
    excerpt:
      'Struggling with slow chord changes or finger stiffness? Incorporate these 5 essential finger exercises into your daily routine to build speed.',
    categories: ['Technique'],
    tags: ['Exercises', 'Speed', 'Electric', 'Warm-ups'],
    date: 'May 28, 2026',
    readTime: '6 min read',
    coverImage: '/blog/finger-dexterity.png',
    author: AUTHOR_SHUVAM,
    content: `
      <p>One of the biggest hurdles beginner and intermediate guitarists face is finger coordination. Your brain knows where your fingers need to go, but they simply refuse to move fast enough. Building finger dexterity takes structured, daily practice. Here are 5 quick exercises you can do in 10 minutes a day.</p>

      <h2>1. The Classic Chromatic "Spider" Walk</h2>
      <p>This exercise builds independent finger strength and coordination. Start on the 1st fret of the low E string, and play frets 1, 2, 3, and 4 using your index, middle, ring, and pinky fingers respectively. Move down to the A string and repeat the sequence, all the way to the high E string, then walk back up.</p>

      <blockquote>
        <strong>Check your posture:</strong> Keep your knuckles parallel to the fretboard and ensure your fingers remain curled close to the strings rather than flying wild.
      </blockquote>

      <h2>2. Finger Anchoring Exercises</h2>
      <p>Hold down your 1st finger on the 5th fret of the G string and your 2nd finger on the 6th fret of the B string. Now, attempt to hammer-on and pull-off with your 3rd and 4th fingers on the high E string without moving the anchored fingers. This isolates the muscles and prevents secondary fingers from tensing up.</p>

      <h2>3. Hammer-ons and Pull-offs (Legato)</h2>
      <p>Play a note on the 5th fret of the high E string, then hammer-on to the 7th fret using your ring finger without picking again. Pull-off back to the 5th fret. Repeat this in a continuous loop. This exercise builds direct strength in your fretting hand fingers without depending on your picking coordination.</p>

      <h2>4. Alternate Picking Sync</h2>
      <p>Pair every single frethand movement with a strict down-up-down-up picking pattern. Slow it down using a metronome. Speed is a natural byproduct of accuracy; if you sync your hands perfectly at 60 BPM, scaling to 120 BPM will feel effortless.</p>

      <blockquote>
        "Practice slowly to build accuracy. Slow is smooth, and smooth is fast. Speed will follow naturally once your muscles internalize the movements."
      </blockquote>

      <h2>5. Stretch & Warm-Up Routines</h2>
      <p>Always stretch your wrists and fingers before jumping into intensive practice. Simple hand stretches prevent repetitive strain injuries (RSI) and prepare your hand for complex chord stretches like the G Major or C Major.</p>
    `,
  },
  {
    id: 'post-3',
    slug: '30-day-guitar-roadmap-learn-fast',
    title: 'The 30-Day Guitar Roadmap: Can You Really Learn That Fast?',
    excerpt:
      'Is it truly possible to play your favorite songs in 30 days? Read about the structured learning path designed for busy professionals.',
    categories: ['Getting Started', 'Roadmap'],
    tags: ['Roadmap', 'Coaching', 'Beginners'],
    date: 'May 15, 2026',
    readTime: '5 min read',
    coverImage: '/blog/guitar-roadmap.png',
    author: AUTHOR_SHUVAM,
    content: `
      <p>A common question from new students is: <em>"Can I really learn the guitar in 30 days?"</em> The answer is yes—but with a caveat. You won't be playing complex classical solos, but you absolutely can play structured rhythm parts of your favorite songs. Let's break down the realistic 30-day roadmap.</p>

      <h2>The Pitfalls of Random Learning</h2>
      <p>Many beginners jump onto YouTube and try to learn random song tutorials, skipping foundations. This leads to bad habits, frustration, and eventual burnout. A structured roadmap removes the guesswork, focusing only on high-value skills that offer immediate payoffs.</p>

      <h3>Week 1: Mechanics and the First Chords</h3>
      <p>Focus entirely on guitar ergonomics, holding the pick, tuning, and learning E Minor, C Major, and G Major chords. Keep your practice sessions short (15-20 minutes) but consistent.</p>

      <h3>Week 2: The Muscle Memory Pivot</h3>
      <p>Practice transitions between your learned chords. Introduce the E Major and A Minor chords. By the end of Week 2, you should be able to switch between G, C, and D chords at a slow, steady pulse.</p>

      <blockquote>
        <strong>Commitment:</strong> You only need 15 minutes of focused practice daily. Consistency is 10 times more effective than practicing for 2 hours once a week.
      </blockquote>

      <h3>Week 3: The Pulse (Rhythm & Strumming)</h3>
      <p>Introduce the universal 4/4 strumming pattern. Practice keeping time without stopping your fretting hand, even if your chord transitions aren't 100% clean. Rhythm is the glue that makes a chord sequence sound like actual music.</p>

      <h3>Week 4: Your First Songs</h3>
      <p>Apply your chords and strumming to simple 3-chord songs (like "Let It Be", "Kabira", or "Knockin' on Heaven's Door"). You will experience the thrill of playing real music along with original backing tracks!</p>

      <blockquote>
        "Having a certified coach to guide you through these 30 days means correcting your posture instantly, saving you months of trial and error."
      </blockquote>

      <h2>What Comes After 30 Days?</h2>
      <p>Once you break the initial barrier of finger soreness and basic coordination, the guitar becomes incredibly fun. From there, you can expand into barre chords, fingerstyle playing, and basic scales to start improvising solos.</p>
    `,
  },
  {
    id: 'post-4',
    slug: 'acoustic-vs-electric-guitar-which-first',
    title: 'Acoustic vs. Electric: Which Guitar Should You Buy First?',
    excerpt:
      'Deciding on your first guitar? We compare acoustic and electric guitars across cost, playability, sound volume, and learning ease.',
    categories: ['Gears'],
    tags: ['Buying Guide', 'Acoustic', 'Electric', 'Budget'],
    date: 'April 30, 2026',
    readTime: '5 min read',
    coverImage: '/blog/acoustic-vs-electric.png',
    author: AUTHOR_SHUVAM,
    content: `
      <p>It's the ultimate debate for every beginner: should you start with an acoustic or an electric guitar? Both instruments have distinct advantages. In this article, we’ll compare them directly to help you make the best choice for your budget and goals.</p>

      <h2>The Case for the Acoustic Guitar</h2>
      <p>The acoustic guitar is the traditional recommendation for beginners. It is a grab-and-go instrument that doesn't require cables, amplifiers, or power outlets.</p>
      <ul>
        <li><strong>Portability:</strong> Simply take it out of the bag and start playing anywhere.</li>
        <li><strong>Developing finger strength:</strong> Acoustic guitars have thicker strings, which helps build finger calluses and hand strength faster.</li>
        <li><strong>Rhythm Foundation:</strong> Perfect for sing-alongs and mastering acoustic strumming.</li>
      </ul>

      <blockquote>
        <strong>Warning:</strong> The thicker steel strings of an acoustic guitar will make your fingertips sore for the first 1-2 weeks. This is completely normal and passes quickly!
      </blockquote>

      <h2>The Case for the Electric Guitar</h2>
      <p>Many beginners don't realize that electric guitars are actually *physically easier* to play than acoustic guitars.</p>
      <ul>
        <li><strong>Thin strings & low action:</strong> The strings are thinner and closer to the fretboard (lower action), requiring much less finger pressure to play clear notes.</li>
        <li><strong>Volume control:</strong> You can practice silently late at night by plugging headphones directly into your amplifier or audio interface.</li>
        <li><strong>Versatility:</strong> Access a massive library of tones—from clean jazz to heavy rock distortion.</li>
      </ul>

      <h2>Which One is Best for Your Budget?</h2>
      <p>An acoustic guitar is generally cheaper upfront because you don't need additional gear. A decent beginner acoustic guitar ranges from ₹5,000 to ₹10,000 ($100 - $150).</p>
      <p>An electric guitar requires an amplifier and a cable. A complete starter pack (guitar + amp + cable + bag) will typically range from ₹15,000 to ₹25,000 ($250 - $400).</p>

      <blockquote>
        "Buy the guitar that inspires you. If you want to play rock solos, buy an electric. If you want to sing around campfires, buy an acoustic. Inspiration beats ease of play every single time."
      </blockquote>

      <h2>The Verdict</h2>
      <p>If budget and simplicity are your priorities, go for an <strong>acoustic guitar</strong>. If you want physically softer playability and love rock/blues tones, get an <strong>electric guitar</strong>.</p>
    `,
  },
  {
    id: 'post-5',
    slug: 'understanding-basic-rhythm-strumming-patterns',
    title: 'Understanding Basic Rhythm & Common Strumming Patterns',
    categories: ['Technique', 'Rhythm'],
    tags: ['Rhythm', 'Strumming', 'Metronome', 'Timing'],
    excerpt:
      'Master the engine of guitar playing. Learn the universal strumming pattern and how to keep perfect time in any song.',
    date: 'April 12, 2026',
    readTime: '5 min read',
    coverImage: '/blog/strumming-patterns.png',
    author: AUTHOR_SHUVAM,
    content: `
      <p>Many beginners focus 90% of their energy on their fretting hand, forgetting that the strumming hand is the "engine" of the guitar. You can play the most complex chords in the world, but if your rhythm is off, it won't sound like music. Let’s unlock the basics of guitar rhythm.</p>

      <h2>Understanding the Metronome (The Beat)</h2>
      <p>Most popular music is written in a <strong>4/4 time signature</strong>. This simply means there are four beats in a measure. Count along out loud: <em>1, 2, 3, 4</em>. Your strumming hand should move continuously in a down-up motion, matching this pulse.</p>

      <h3>Downstrums vs. Upstrums</h3>
      <ul>
        <li><strong>Downstrums</strong> happen on the main beats (1, 2, 3, 4).</li>
        <li><strong>Upstrums</strong> happen in between the beats (the "ands": 1 & 2 & 3 & 4 &).</li>
      </ul>

      <blockquote>
        <strong>The Golden Rule:</strong> Never stop the movement of your strumming hand. Even if you miss a strum, keep your arm swinging in time like a pendulum.
      </blockquote>

      <h2>The Universal Strumming Pattern</h2>
      <p>If you can master this single strumming pattern, you can play thousands of pop, rock, and folk songs. It is often written as:</p>
      
      <pre><code>D - D - U - U - D - U</code></pre>
      
      <p>Let's break down the count for this pattern:</p>
      <ol>
        <li><strong>Beat 1</strong>: Downstrum (D)</li>
        <li><strong>Beat 2</strong>: Downstrum (D) followed by a quick Upstrum (U) on the "and"</li>
        <li><strong>Beat 3</strong>: Miss the downstrum (keep hand moving down), then Upstrum (U) on the "and"</li>
        <li><strong>Beat 4</strong>: Downstrum (D) followed by an Upstrum (U) on the "and"</li>
      </ol>

      <blockquote>
        "Rhythm is about consistency and relaxation. Keep your wrist loose—like you are shaking water off your hand. A stiff wrist will produce a harsh, scraping sound."
      </blockquote>

      <h2>Common Troubleshooting Tips</h2>
      <p>If you're struggling to match the rhythm of a song, try these steps:</p>
      <ul>
        <li><strong>Mute the strings:</strong> Lay your fretting hand gently across the strings to mute them, and practice the strumming pattern on a single rhythmic scratch. This isolates the rhythm from chord changes.</li>
        <li><strong>Tap your foot:</strong> Tap your foot to the beat of the song. It connects your body to the time signature.</li>
        <li><strong>Sing the rhythm:</strong> Before strumming, vocalize the pattern: <em>"Down, Down-Up, Up-Down-Up"</em>. If you can say it, you can play it.</li>
      </ul>
    `,
  },
];

// Helper to resolve cover image path (handles Cockpit assets or string links)
function resolveImagePath(img?: { path?: string } | string): string {
  if (!img) return '/blog/acoustic-guitar-chords.png';
  return '/blog/acoustic-guitar-chords.png';
}

// Plug-and-play fetcher: Queries Cockpit CMS when configured, otherwise falls back to static content
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!cockpit.isConfigured) {
    return BLOG_POSTS;
  }

  try {
    // Queries the Cockpit collection named 'posts'
    const cockpitPosts = await cockpit.getItems<{ entries: CockpitPost[] }>(
      'posts'
    );

    if (
      !cockpitPosts ||
      !cockpitPosts.entries ||
      !Array.isArray(cockpitPosts.entries)
    ) {
      return BLOG_POSTS;
    }

    return cockpitPosts.entries.map((entry) => ({
      id: entry._id,
      slug: entry.slug,
      title: entry.title,
      excerpt: entry.excerpt,
      content: entry.content,
      coverImage: resolveImagePath(entry.coverImage),
      categories: Array.isArray(entry.categories) ? entry.categories : [],
      tags: Array.isArray(entry.tags) ? entry.tags : [],
      date:
        entry.date ||
        new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      readTime: entry.readTime || '5 min read',
      author: {
        name: entry.authorName || 'Shuvam Raha',
        avatar: resolveImagePath(entry.authorAvatar),
        role: entry.authorRole || 'LCM Certified Music Instructor',
        bio:
          entry.authorBio ||
          'Professional guitarist, music producer, and educator.',
      },
    }));
  } catch (error) {
    console.error(
      'Error fetching posts from Cockpit CMS, falling back to static data:',
      error
    );
    return BLOG_POSTS;
  }
}

// Plug-and-play item fetcher by slug: Queries Cockpit CMS when configured, otherwise falls back to static content
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  if (!cockpit.isConfigured) {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }

  try {
    // Queries the Cockpit collection named 'posts' filtered by slug
    const response = await cockpit.getItems<{ entries: CockpitPost[] }>(
      'posts',
      {
        filter: { slug },
        limit: 1,
      }
    );

    if (response && response.entries && response.entries.length > 0) {
      const entry = response.entries[0];
      return {
        id: entry._id,
        slug: entry.slug,
        title: entry.title,
        excerpt: entry.excerpt,
        content: entry.content,
        coverImage: resolveImagePath(entry.coverImage),
        categories: Array.isArray(entry.categories) ? entry.categories : [],
        tags: Array.isArray(entry.tags) ? entry.tags : [],
        date:
          entry.date ||
          new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        readTime: entry.readTime || '5 min read',
        author: {
          name: entry.authorName || 'Shuvam Raha',
          avatar: resolveImagePath(entry.authorAvatar),
          role: entry.authorRole || 'LCM Certified Music Instructor',
          bio:
            entry.authorBio ||
            'Professional guitarist, music producer, and educator.',
        },
      };
    }

    // Fallback to static lists
    return BLOG_POSTS.find((p) => p.slug === slug);
  } catch (error) {
    console.error(
      `Error fetching post by slug "${slug}" from Cockpit CMS, falling back to static data:`,
      error
    );
    return BLOG_POSTS.find((p) => p.slug === slug);
  }
}
