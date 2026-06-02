"use client";

import { useState } from "react";
import { LuChevronDown, LuCircleHelp, LuMessageCircle } from "react-icons/lu";
import { categories, allFaqs } from "@/lib/guitar-data";

export default function FaqAccordion() {
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
    <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
      {/* Sticky Left Column: Header, Categories, and Contact CTA */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 lg:sticky lg:top-24">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <LuCircleHelp className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight font-heading">
            Got{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Questions?
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Everything you need to know about the guitar classes,
            curriculum, and how to get started.
          </p>
        </div>

        {/* Categories / Filter Pills */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
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

        {/* Contact Card */}
        <div className="hidden lg:flex flex-col gap-4 p-6 rounded-[2rem] bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-indigo-500/10 hover:border-indigo-500/20 transition-colors shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-500" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <LuMessageCircle className="w-6 h-6 animate-pulse" />
            </div>
            <h4 className="text-white text-lg font-bold mb-1 font-heading">
              Still have questions?
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Can&apos;t find the answer you&apos;re looking for?
              We&apos;re here to help.
            </p>
            <a
              href="mailto:contact@shuvamrahamusic.com"
              className="text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors flex items-center gap-2 group-hover:gap-3"
            >
              Contact Support <span>→</span>
            </a>
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
                  className={`text-sm sm:text-base font-bold transition-colors duration-300 pr-4 ${
                    isOpen ? "text-indigo-300" : "text-gray-200 group-hover:text-white"
                  }`}
                >
                  {faq.q}
                </span>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-500 ${
                    isOpen
                      ? "bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300"
                  }`}
                >
                  <LuChevronDown
                    className={`w-4 h-4 transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
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
  );
}
