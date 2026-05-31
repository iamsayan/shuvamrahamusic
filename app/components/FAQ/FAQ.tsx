"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";

const allFaqs = [
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

const categories = [
  "All",
  "Getting Started",
  "Classes & Learning Process",
  "Class Format & Scheduling",
  "Fees, Payments & Trial",
  "Equipment & Location",
  "International Students",
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs =
    activeCategory === "All"
      ? allFaqs
      : allFaqs.filter((f) => f.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-x-clip bg-[#05050A]"
      id="faq"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column: Sticky Sidebar */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24 flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">
                  FAQ
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
                Got{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-sm">
                  Questions?
                </span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Everything you need to know about the guitar classes,
                curriculum, and how to get started.
              </p>
            </div>

            {/* Filter Pills */}
            <div
              className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(0);
                  }}
                  className={`px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap text-left border flex items-center justify-between group ${
                    activeCategory === cat
                      ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                      : "bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/[0.05] hover:text-gray-200 hover:border-white/10"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Premium Contact Card */}
            <div className="hidden lg:flex flex-col gap-4 p-6 rounded-[2rem] bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-indigo-500/10 hover:border-indigo-500/20 transition-colors shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h4 className="text-white text-lg font-bold mb-1">
                  Still have questions?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Can't find the answer you're looking for? We're here to help.
                </p>
                <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors flex items-center gap-2 group-hover:gap-3">
                  Contact Support <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Accordion List */}
          <div className="w-full lg:w-2/3 flex flex-col gap-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "bg-white/[0.03] border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.05)]"
                      : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex items-center justify-between w-full p-4 sm:p-5 text-left focus:outline-none group"
                  >
                    <span
                      className={`text-sm sm:text-base font-bold transition-colors duration-300 pr-4 ${isOpen ? "text-indigo-300" : "text-gray-200 group-hover:text-white"}`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-500 ${isOpen ? "bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]" : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300"}`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-64 opacity-100 pb-4 sm:pb-5 px-4 sm:px-5"
                        : "max-h-0 opacity-0 px-4 sm:px-5"
                    }`}
                  >
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
