'use client';

import { useActionState, useEffect, useRef } from 'react';

import { type ContactFormState, submitContactForm } from '@/app/actions/form';

import {
  LuMail,
  LuMessageSquare,
  LuPhone,
  LuSend,
  LuShieldCheck,
  LuTag,
  LuTriangleAlert,
  LuUser,
} from 'react-icons/lu';

const initialState: ContactFormState = {
  success: undefined,
  message: '',
  errors: {},
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form when success is true
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
          <LuShieldCheck className="h-10 w-10 animate-bounce" />
        </div>
        <h3 className="font-heading text-xl font-black text-white sm:text-2xl">
          Message Sent!
        </h3>
        <p className="mt-3 max-w-md text-xs leading-relaxed text-gray-400 sm:text-sm">
          {state.message}
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className="group font-heading mt-8 flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95 sm:text-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="w-full space-y-5">
      <h3 className="font-heading text-lg font-extrabold text-white sm:text-xl">
        Send us a Message
      </h3>

      {state.message && !state.success && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/10 bg-red-500/[0.04] p-3.5 text-xs text-red-400">
          <LuTriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="leading-snug">{state.message}</p>
        </div>
      )}

      {/* Cockpit CMS Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_honeypot">Website</label>
        <input
          type="text"
          id="_honeypot"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name Input */}
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
        >
          Full Name <span className="text-cyan-400">*</span>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
            <LuUser className="h-4 w-4" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            placeholder="John Doe"
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
          />
        </div>
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-400">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Email & Phone grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
          >
            Email Address <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
              <LuMail className="h-4 w-4" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isPending}
              placeholder="john@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
            />
          </div>
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-400">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Phone Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
          >
            Phone Number <span className="text-gray-500">(Optional)</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
              <LuPhone className="h-4 w-4" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              disabled={isPending}
              placeholder="+91 98765 43210"
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Subject Select */}
      <div className="space-y-1.5">
        <label
          htmlFor="subject"
          className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
        >
          Inquiry Subject
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
            <LuTag className="h-4 w-4" />
          </div>
          <select
            id="subject"
            name="subject"
            disabled={isPending}
            className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pr-10 pl-10 text-sm text-white transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
          >
            <option
              value="Guitar Classes Enrollment"
              className="bg-[#05050A] text-gray-300"
            >
              Guitar Classes Enrollment
            </option>
            <option
              value="General Query"
              className="bg-[#05050A] text-gray-300"
            >
              General Inquiry
            </option>
            <option
              value="Live Gig / Booking"
              className="bg-[#05050A] text-gray-300"
            >
              Live Gig / Performance Booking
            </option>
            <option
              value="Collaborations / Projects"
              className="bg-[#05050A] text-gray-300"
            >
              Collaborations & Session Work
            </option>
            <option
              value="Billing / Payment Help"
              className="bg-[#05050A] text-gray-300"
            >
              Billing / Payment Support
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[9px] font-black tracking-widest text-gray-400 uppercase">
            ▼
          </div>
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
        >
          Your Message <span className="text-cyan-400">*</span>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute top-3.5 left-3.5 text-gray-500">
            <LuMessageSquare className="h-4 w-4" />
          </div>
          <textarea
            id="message"
            name="message"
            required
            disabled={isPending}
            rows={4}
            placeholder="Tell us about your requirements, learning goals, or event specifications..."
            className="min-h-[100px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.02] py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
          />
        </div>
        {state.errors?.message && (
          <p className="mt-1 text-xs text-red-400">{state.errors.message[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="font-heading flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95 disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
      >
        {isPending ? (
          <>
            <svg
              className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            Send Message
            <LuSend className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
