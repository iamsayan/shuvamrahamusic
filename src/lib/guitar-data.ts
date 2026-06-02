import {
  LuMic,
  LuClock,
  LuHeadphones,
  LuAward,
  LuUsers,
  LuMusic,
  LuBookOpen,
  LuCirclePlay,
  LuZap,
  LuBrain,
  LuCrown,
  LuShieldCheck,
  LuFileText,
  LuMessageCircle,
} from "react-icons/lu";

export type Region = "IN" | "GLOBAL";

export interface Plan {
  name: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  includes: string[];
  warning?: string | null;
  bestFor: string;
  buttonText: string;
  theme: string;
  popular?: boolean;
}

export const plans: Record<Region, Plan[]> = {
  IN: [
    {
      name: "Starter Online Plan",
      price: "1800",
      currency: "₹",
      period: "/month",
      description: "Simple, structured guitar coaching based on your goals.",
      includes: [
        "4 sessions/month (40 mins each)",
        "Fixed weekly schedule",
        "Beginner → Intermediate roadmap",
        "Limited WhatsApp / Email support",
      ],
      warning: null,
      bestFor: "Students in India (school/college)",
      buttonText: "Book Free Intro Call",
      theme: "emerald",
      popular: true,
    },
    {
      name: "Offline Coaching (Studio)",
      price: "1500",
      currency: "₹",
      period: "/month",
      description: "Physical presence, real-time correction & better progress.",
      includes: [
        "4 sessions/month",
        "Hands-on training (faster learning)",
        "Real-time correction",
        "Personal attention",
      ],
      bestFor: "Serious learners / kids / parents",
      buttonText: "Check Available Slots",
      theme: "amber",
    },
  ],
  GLOBAL: [
    {
      name: "Global Guitar Program",
      price: "45",
      currency: "$",
      period: "/month",
      description: "Song-based learning with flexible scheduling across time zones.",
      includes: [
        "4 sessions/month (flexible across time zones)",
        "Learn English songs",
        "Hindi/Bengali support",
        "Structured 30-day roadmap",
        "Priority WhatsApp support",
        "Flexible scheduling",
      ],
      warning: null,
      bestFor: "International students & working professionals",
      buttonText: "Join Global Program",
      theme: "blue",
      popular: true,
    },
    {
      name: "Pro Guitar Coaching",
      price: "99",
      currency: "$",
      period: "/month",
      description: "VIP fast-track progression with a fully customized learning path.",
      includes: [
        "8 sessions/month",
        "Fast-track progress plan",
        "Personal mentoring",
        "Performance & confidence training",
        "Weekly progress tracking",
        "Direct WhatsApp access",
      ],
      warning: null,
      bestFor: "Serious learners who want fast results",
      buttonText: "Apply for Pro Coaching",
      theme: "violet",
    },
  ],
};

export const authorityPoints = [
  {
    title: "Professional Performer",
    desc: "Real stage experience—not just theory.",
    icon: LuMic,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    title: "11+ Years Experience",
    desc: "Over a decade of experience teaching students at all levels.",
    icon: LuClock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    title: "Music Producer",
    desc: "Deep understanding of sound, tone & modern music.",
    icon: LuHeadphones,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "LCM Certified",
    desc: "Strong academic + practical foundation.",
    icon: LuAward,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    title: "Glonbal Student Base",
    desc: "Students from India, USA, UK & Canada.",
    icon: LuUsers,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Multi-Genre Expertise",
    desc: "Bollywood, English, Pop, Rock, Fingerstyle, Acoustic & more.",
    icon: LuMusic,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

export const curriculum = [
  {
    title: "Core Foundations",
    subtitle: "(Start from Zero)",
    icon: LuBookOpen,
    colSpan: "lg:col-span-2",
    styles: {
      iconBg: "bg-emerald-500/10",
      iconBorder: "border-emerald-500/20",
      iconText: "text-emerald-400",
      iconShadow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
      hoverBorder: "hover:border-emerald-500/40",
      ambientGlow: "bg-emerald-500/10",
    },
    points: [
      "Guitar tuning & setup",
      "Finger exercises & strength building",
      "Basic chords & smooth transitions",
      "Strumming patterns used in real songs",
    ],
  },
  {
    title: "Song Playing & Rhythm",
    subtitle: "(Play along)",
    icon: LuCirclePlay,
    colSpan: "lg:col-span-2",
    styles: {
      iconBg: "bg-blue-500/10",
      iconBorder: "border-blue-500/20",
      iconText: "text-blue-400",
      iconShadow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
      hoverBorder: "hover:border-blue-500/40",
      ambientGlow: "bg-blue-500/10",
    },
    points: [
      "Play full songs step-by-step",
      "Rhythm playing & timing control",
      "Accompaniment techniques",
      "Confidence while playing",
    ],
  },
  {
    title: "Lead Guitar & Techniques",
    subtitle: "(Shred & Solo)",
    icon: LuZap,
    colSpan: "lg:col-span-2",
    styles: {
      iconBg: "bg-orange-500/10",
      iconBorder: "border-orange-500/20",
      iconText: "text-orange-400",
      iconShadow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]",
      hoverBorder: "hover:border-orange-500/40",
      ambientGlow: "bg-orange-500/10",
    },
    points: [
      "Lead playing (melodies & solos)",
      "Vibrato, slides, bends, hammer-ons, pull-offs",
      "Fingerstyle & picking techniques",
      "Classic guitar solos",
    ],
  },
  {
    title: "Music Theory",
    subtitle: "(Made Simple)",
    icon: LuBrain,
    colSpan: "lg:col-span-3",
    styles: {
      iconBg: "bg-violet-500/10",
      iconBorder: "border-violet-500/20",
      iconText: "text-violet-400",
      iconShadow: "shadow-[0_0_20px_rgba(139,92,246,0.2)]",
      hoverBorder: "hover:border-violet-500/40",
      ambientGlow: "bg-violet-500/10",
    },
    points: [
      "Scales & fingerboard knowledge",
      "Chord construction & voicings",
      "Time signature & key understanding",
      "Modes (explained practically, not confusing)",
    ],
  },
  {
    title: "Advanced Skills",
    subtitle: "(For Growth)",
    icon: LuCrown,
    colSpan: "lg:col-span-3",
    styles: {
      iconBg: "bg-rose-500/10",
      iconBorder: "border-rose-500/20",
      iconText: "text-rose-400",
      iconShadow: "shadow-[0_0_20px_rgba(244,63,94,0.2)]",
      hoverBorder: "hover:border-rose-500/40",
      ambientGlow: "bg-rose-500/10",
    },
    points: [
      "Improvisation & melody creation",
      "Performance skills & stage confidence",
      "Ear training (rhythm, pitch, harmony)",
      "Sight reading & staff notation",
    ],
  },
];

export const features = [
  {
    title: "Learning Support & Guidance",
    desc: "Everything you need to learn, practice, and improve—fully structured.",
    icon: LuShieldCheck,
    points: [
      {
        t: "Free Introductory Call",
        d: "Understand your level + get a personalized roadmap",
      },
      {
        t: "Structured Syllabus",
        d: "Beginner to Advanced. Always know your next step",
      },
      { t: "Practice Routine (PDF)", d: "Clear daily plan—no confusion" },
      {
        t: "Curated Song List",
        d: "Learn songs based on your taste & skill level",
      },
    ],
  },
  {
    title: "Study Materials & Resources",
    desc: "All materials are shared for easy access anytime via WhatsApp or Email.",
    icon: LuFileText,
    points: [
      { t: "Practice PDFs", d: "Detailed tabs, notes, and exercises" },
      { t: "Visual Guides", d: "High-quality lesson photos & diagrams" },
      { t: "Audio Tracks", d: "Backing tracks for rhythm & timing control" },
      {
        t: "Video Lessons",
        d: "Recorded video breakdowns for complex sections",
      },
    ],
  },
  {
    title: "Certification (Optional)",
    desc: "Ideal for students who want formal certification & structured growth.",
    icon: LuAward,
    points: [
      {
        t: "Global Recognition",
        d: "Appear for internationally recognized guitar grade exams",
      },
      {
        t: "Exam Preparation",
        d: "Aligned with reputed Western music boards (like LCM/Trinity/ABRSM)",
      },
      {
        t: "Focused Syllabus",
        d: "Structured specifically to pass your desired grade",
      },
    ],
  },
  {
    title: "Ongoing Support",
    desc: "Never feel stuck. Get help exactly when you need it.",
    icon: LuMessageCircle,
    points: [
      { t: "Direct WhatsApp Support", d: "Ask doubts anytime between classes" },
      {
        t: "Video Feedback",
        d: "Send short videos of your playing for posture & technique corrections",
      },
    ],
  },
];

export const categories = [
  "All",
  "Getting Started",
  "Classes & Learning Process",
  "Class Format & Scheduling",
  "Fees, Payments & Trial",
  "Equipment & Location",
  "International Students",
];

export const allFaqs = [
  {
    category: "Getting Started",
    q: "Do I need any prior music experience?",
    a: "Not at all! The program is designed for complete beginners and starts from absolute zero with step-by-step guidance.",
  },
  {
    category: "Getting Started",
    q: "Do I need a guitar before joining?",
    a: "Yes, but don’t worry. You’ll get complete guidance to choose the right beginner guitar within your budget.",
  },
  {
    category: "Getting Started",
    q: "Can kids join the classes?",
    a: "Yes! Students aged 6 years and above are welcome to join.",
  },
  {
    category: "Getting Started",
    q: "Are the classes beginner-friendly?",
    a: "Absolutely! The lessons are simple, structured, and easy to follow even if you’re starting from zero.",
  },
  {
    category: "Getting Started",
    q: "How do I enroll in the classes?",
    a: "Simply book a free introductory call, discuss your goals, choose a suitable plan, confirm your slot, and start learning.",
  },
  {
    category: "Classes & Learning Process",
    q: "How long will it take to learn guitar?",
    a: "Most students start playing basic songs within 30–60 days with regular practice, and build solid confidence within 3–6 months.",
  },
  {
    category: "Classes & Learning Process",
    q: "Will I get personal attention during classes?",
    a: "Yes! All sessions are 1-to-1, ensuring personalized guidance, direct feedback, and faster progress.",
  },
  {
    category: "Classes & Learning Process",
    q: "What kind of songs will I learn?",
    a: "You’ll learn songs based on your interests, including Hindi, English, and Bengali music.",
  },
  {
    category: "Classes & Learning Process",
    q: "What makes these guitar classes different?",
    a: "Unlike random tutorials, the program follows a structured roadmap with personal guidance and consistent progress tracking.",
  },
  {
    category: "Classes & Learning Process",
    q: "Will I get study materials and practice resources?",
    a: "Yes! You’ll receive PDFs, lesson notes, audio tracks, visual guides, and recorded lessons for practice anytime.",
  },
  {
    category: "Classes & Learning Process",
    q: "Are certification or grade exam options available?",
    a: "Yes! You can prepare for Western music grade exams with structured guidance aligned to reputed music boards.",
  },
  {
    category: "Class Format & Scheduling",
    q: "Are the classes online or offline?",
    a: "Both options are available — online classes worldwide and offline sessions at the studio in Kolkata.",
  },
  {
    category: "Class Format & Scheduling",
    q: "What happens if I miss a class?",
    a: "No problem! Missed classes can be rescheduled based on availability within the same month.",
  },
  {
    category: "Class Format & Scheduling",
    q: "What are the available class timings?",
    a: "Classes are available Monday–Wednesday from 10 AM to 9 PM IST, and Saturday–Sunday from 10 AM to 4 PM IST.",
  },
  {
    category: "International Students",
    q: "How are time zones managed for international students?",
    a: "Flexible scheduling is available for students worldwide, allowing you to choose convenient time slots in your local time zone.",
  },
  {
    category: "Fees, Payments & Trial",
    q: "How can I make payments?",
    a: "Payments can be made securely online via Razorpay using UPI, cards, or net banking. Offline students can also pay in cash.",
  },
  {
    category: "Fees, Payments & Trial",
    q: "Is there a trial class available?",
    a: "There’s no trial class, but you can book a free introductory call to discuss your goals and learning plan.",
  },
  {
    category: "Equipment & Location",
    q: "What guitar should I buy as a beginner?",
    a: "An acoustic guitar is recommended for beginners, and you’ll receive full guidance based on your budget and goals.",
  },
  {
    category: "Equipment & Location",
    q: "Where are the offline classes conducted?",
    a: "Offline classes are conducted at the studio in Kolkata. Exact directions are shared after booking your slot.",
  },
];



export const perfectFor = [
  "You're a beginner, intermediate, or advanced learner",
  "You're a student or working professional with limited time",
  "You're based in India or anywhere globally",
  "You want to play real songs, not just dry theory",
  "You want to learn theory in a simple, practical & fun way",
  "You feel stuck or confused learning from YouTube",
  "You want personal guidance & feedback (not random tutorials)",
];

export const notFor = [
  "You're not ready to commit to regular practice",
  "You prefer random tutorials over structured learning",
  "You're not serious about real progress",
  "You're looking for quick shortcuts instead of building real skills",
  "You're looking for instant results without effort",
];
