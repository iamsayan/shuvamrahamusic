'use client';

import { useState } from 'react';

import { allFaqs, categories } from '@/lib/guitar-data';

import { LuChevronDown, LuCircleHelp, LuMessageCircle } from 'react-icons/lu';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs =
    activeCategory === 'All'
      ? allFaqs
      : allFaqs.filter((f) => f.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-20">
      {/* Sticky Left Column: Header, Categories, and Contact CTA */}
      <div className="flex w-full flex-col gap-8 lg:sticky lg:top-24 lg:w-1/3">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <LuCircleHelp className="size-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
              FAQ
            </span>
          </div>
          <h2 className="font-heading mb-4 text-3xl leading-tight font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Got{' '}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 sm:text-base lg:text-lg">
            Everything you need to know about the guitar classes, curriculum,
            and how to get started.
          </p>
        </div>

        {/* Categories / Filter Pills */}
        <div className="hide-scrollbar flex flex-row gap-2 overflow-x-auto pb-4 lg:flex-col lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`group flex items-center justify-between gap-3 rounded-2xl border px-5 py-3.5 text-left text-xs font-bold whitespace-nowrap transition-all duration-300 sm:text-sm md:text-base ${
                activeCategory === cat
                  ? 'border-indigo-500/40 bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                  : 'border-white/5 bg-white/2 text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="size-1.5 animate-pulse rounded-full bg-indigo-400" />
              )}
            </button>
          ))}
        </div>

        {/* Contact Card */}
        <div className="group relative hidden flex-col gap-4 overflow-hidden rounded-[2rem] border border-indigo-500/10 bg-linear-to-br from-indigo-900/10 to-purple-900/10 p-6 shadow-2xl transition-colors hover:border-indigo-500/20 lg:flex">
          <div className="absolute top-0 right-0 size-32 rounded-full bg-indigo-500/10 blur-[40px] transition-colors duration-500 group-hover:bg-indigo-500/20" />
          <div className="relative z-10">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <LuMessageCircle className="size-6 animate-pulse" />
            </div>
            <h4 className="font-heading mb-1 text-lg font-bold text-white">
              Still have questions?
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              Can&apos;t find the answer you&apos;re looking for? We&apos;re
              here to help.
            </p>
            <a
              href="mailto:contact@shuvamrahamusic.com"
              className="flex items-center gap-2 text-sm font-bold text-indigo-400 transition-colors group-hover:gap-3 hover:text-indigo-300"
            >
              Contact Support <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Accordion List */}
      <div className="flex w-full flex-col gap-3 lg:w-2/3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
                isOpen
                  ? 'border-indigo-500/30 bg-white/3 shadow-[0_0_20px_rgba(99,102,241,0.05)]'
                  : 'border-white/5 bg-white/1 hover:border-white/10 hover:bg-white/2'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="group flex w-full items-center justify-between p-3 text-left focus:outline-none sm:p-4"
              >
                <span
                  className={`pr-4 text-xs font-bold transition-colors duration-300 sm:text-sm md:text-base ${
                    isOpen
                      ? 'text-indigo-300'
                      : 'text-gray-200 group-hover:text-white'
                  }`}
                >
                  {faq.q}
                </span>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    isOpen
                      ? 'bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                      : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300'
                  }`}
                >
                  <LuChevronDown
                    className={`h-4 w-4 transition-transform duration-500 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isOpen
                    ? 'max-h-64 px-4 pb-4 opacity-100 sm:px-5 sm:pb-5'
                    : 'max-h-0 px-4 opacity-0 sm:px-5'
                }`}
              >
                <p className="border-t border-white/5 pt-4 text-xs leading-relaxed text-gray-400 sm:text-sm">
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
