"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";

const allFaqs = [
  // General
  { category: "General", q: "Do I need any prior music experience?", a: "Not at all! The curriculum starts from absolute zero and builds up your skills step-by-step." },
  { category: "General", q: "What kind of guitar do I need?", a: "Any acoustic or electric guitar works perfectly. If you don't have one yet, an entry-level acoustic is a great start." },
  { category: "General", q: "Is this suitable for kids?", a: "The program is optimized for adults and teenagers (13+), though younger kids can learn with parent supervision." },
  { category: "General", q: "How is this different from YouTube?", a: "YouTube is unorganized and overwhelming. This is a step-by-step roadmap designed to prevent you from developing bad habits." },
  { category: "General", q: "Is there a refund policy?", a: "Yes, we offer a 7-day money-back guarantee if you feel the program isn't the right fit for you." },
  
  // Curriculum
  { category: "Curriculum", q: "How long until I can play my first song?", a: "Most students are able to play their first simple song within the first 7-10 days of consistent practice." },
  { category: "Curriculum", q: "Do you teach music theory?", a: "Yes, but in a highly practical way. You'll learn exactly what you need to play songs, without boring academics." },
  { category: "Curriculum", q: "Do I need to read sheet music?", a: "No! We focus on Tabs, chords, and playing by ear, which is much faster and more practical for modern guitar." },
  { category: "Curriculum", q: "What genres do you cover?", a: "We build a solid foundation that applies to Pop, Rock, Acoustic, Bollywood, and Singer-Songwriter styles." },
  { category: "Curriculum", q: "Will I learn fingerstyle or strumming?", a: "You will learn both! The curriculum covers essential strumming patterns as well as foundational fingerpicking." },

  // Logistics
  { category: "Logistics", q: "How much time do I need to practice?", a: "Just 15-20 minutes a day is enough to see consistent weekly progress." },
  { category: "Logistics", q: "Are these pre-recorded videos or live?", a: "The program consists of high-quality structured videos, combined with personalized feedback." },
  { category: "Logistics", q: "Can I learn at my own pace?", a: "Yes! You have lifetime access to the materials and can progress entirely at your own speed." },
  { category: "Logistics", q: "Can I access the course on my phone?", a: "Absolutely. The platform is fully mobile-responsive so you can learn from any device." },
  { category: "Logistics", q: "When does the next batch start?", a: "Right now! You get instant access the moment you enroll, so you can start learning today." },

  // Support
  { category: "Support", q: "What if I get stuck on a lesson?", a: "You can reach out for personalized feedback and guidance anytime you hit a roadblock." },
  { category: "Support", q: "How does the personalized feedback work?", a: "You can submit short videos of your playing, and you'll receive specific corrections on your posture and technique." },
  { category: "Support", q: "What if I'm left-handed?", a: "The concepts are identical! You just mirror the chord shapes for a left-handed guitar." },
  { category: "Support", q: "Do I have to buy expensive gear?", a: "No extra gear is required. Just your guitar, a pick, and a free tuning app on your phone." },
  { category: "Support", q: "Can I upgrade my plan later?", a: "Yes, you can upgrade from the standard plan to the premium coaching plan at any time." },
];

const categories = ["All", "General", "Curriculum", "Logistics", "Support"];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = activeCategory === "All" ? allFaqs : allFaqs.filter(f => f.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-16 md:py-24 overflow-x-clip bg-[#05050A]" id="faq">
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
                Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-sm">Questions?</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Everything you need to know about the guitar classes, curriculum, and how to get started.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(0); }}
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
                 <h4 className="text-white text-lg font-bold mb-1">Still have questions?</h4>
                 <p className="text-gray-400 text-sm leading-relaxed mb-4">Can't find the answer you're looking for? We're here to help.</p>
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
                      ? 'bg-white/[0.03] border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.05)]' 
                      : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <button 
                    onClick={() => toggleFaq(idx)} 
                    className="flex items-center justify-between w-full p-4 sm:p-5 text-left focus:outline-none group"
                  >
                    <span className={`text-sm sm:text-base font-bold transition-colors duration-300 pr-4 ${isOpen ? 'text-indigo-300' : 'text-gray-200 group-hover:text-white'}`}>
                      {faq.q}
                    </span>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-500 ${isOpen ? 'bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300'}`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  <div 
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-64 opacity-100 pb-4 sm:pb-5 px-4 sm:px-5' : 'max-h-0 opacity-0 px-4 sm:px-5'
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
