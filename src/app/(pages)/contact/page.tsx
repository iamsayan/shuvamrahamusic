import type { Metadata } from 'next';

import PageLayout from '@/components/page-layout';
import JsonLd from '@/components/json-ld';

import {
  LuClock,
  LuMail,
  LuMapPin,
  LuMessageSquare,
  LuPhone,
} from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Shuvam Raha Music. Enroll in guitar coaching, ask questions, or request assistance.',
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Us | Shuvam Raha Music',
          description:
            'Get in touch with Shuvam Raha Music. Enroll in guitar coaching, ask questions, or request assistance.',
          url: 'https://shuvamrahamusic.com/contact',
          mainEntity: {
            '@type': 'MusicInstructionBusiness',
            name: 'Shuvam Raha Music',
            telephone: '+918961369468',
            email: 'contact@shuvamrahamusic.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kolkata',
              addressRegion: 'West Bengal',
              addressCountry: 'IN',
            },
          },
        }}
      />
      <PageLayout
        title="Contact Us"
        subtitle="Have questions about guitar classes or payments? Get in touch with us."
      >
      <div className="mt-4 flex flex-col gap-6 text-left">
        {/* Contact Method Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/918961369468?text=Hi%20Shuvam,%20I%27m%20interested%20in%20your%20guitar%20classes!"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.03] hover:shadow-[0_0_15px_rgba(16,185,129,0.06)]"
          >
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                <LuMessageSquare className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-sm font-bold text-white sm:text-base">
                WhatsApp Chat
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                Quick queries & lesson scheduling.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-emerald-400 group-hover:underline">
              Chat on WhatsApp &rarr;
            </span>
          </a>

          {/* Email Card */}
          <a
            href="mailto:contact@shuvamrahamusic.com"
            className="group flex flex-col justify-between rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.03] hover:shadow-[0_0_15px_rgba(6,182,212,0.06)]"
          >
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition-transform duration-300 group-hover:scale-110">
                <LuMail className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-sm font-bold text-white sm:text-base">
                Email Us
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                For support, enrollment queries, and refunds.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-cyan-400 group-hover:underline">
              Send Email &rarr;
            </span>
          </a>
        </div>

        {/* Detailed Info Section */}
        <div className="space-y-4 rounded-2xl border border-white/[0.04] bg-white/[0.005] p-6">
          <h3 className="font-heading text-base font-bold text-white">
            General Information
          </h3>

          <div className="flex items-start gap-3.5">
            <LuPhone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Call / Support
              </p>
              <a
                href="tel:+918961369468"
                className="text-sm font-bold text-white transition-colors hover:text-cyan-400"
              >
                +91 8961369468
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t border-white/5 pt-3.5">
            <LuMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Location
              </p>
              <a
                href="https://maps.app.goo.gl/sYFmaYbfmikB9MRb7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white transition-colors hover:text-cyan-400"
              >
                South Dumdum, Kolkata, India
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t border-white/5 pt-3.5">
            <LuClock className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Working Hours
              </p>
              <p className="text-sm font-bold text-white">
                10:00 AM - 8:00 PM IST (Mon - Sat)
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
    </>
  );
}
