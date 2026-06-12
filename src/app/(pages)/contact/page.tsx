import type { Metadata } from 'next';

import ContactForm from '@/components/contact-form';
import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import { SCHEMA } from '@/lib/schema';

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
        schema={[
          SCHEMA.breadcrumb('/contact'),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Us',
            description:
              'Get in touch with Shuvam Raha Music. Enroll in guitar coaching, ask questions, or request assistance.',
            url: `${SCHEMA.BASE_URL}/contact`,
            mainEntity: {
              ...SCHEMA.organization(),
              '@context': undefined,
            },
          },
        ]}
      />
      <PageLayout
        title="Contact Us"
        subtitle="Have questions about guitar classes or payments? Get in touch with us."
      >
        <div className="mt-4 grid w-full grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Contact Form Column */}
          <div className="w-full lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact Details Column */}
          <div className="w-full space-y-6 lg:col-span-5">
            {/* <h3 className="font-heading text-lg font-extrabold text-white sm:text-xl">
              Other Ways to Reach Us
            </h3> */}

            {/* Contact Method Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/918961369468?text=Hi%20Shuvam,%20I%27m%20interested%20in%20your%20guitar%20classes!"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/4 bg-white/1 p-5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/3 hover:shadow-[0_0_15px_rgba(16,185,129,0.06)]"
              >
                <div>
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                    <LuMessageSquare className="size-5" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-white sm:text-base">
                    WhatsApp Chat
                  </h4>
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
                className="group flex flex-col justify-between rounded-2xl border border-white/4 bg-white/1 p-5 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/3 hover:shadow-[0_0_15px_rgba(6,182,212,0.06)]"
              >
                <div>
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition-transform duration-300 group-hover:scale-110">
                    <LuMail className="size-5" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-white sm:text-base">
                    Email Us
                  </h4>
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
            <div className="space-y-4 rounded-2xl border border-white/4 bg-white/0.5 p-6">
              <h4 className="font-heading text-base font-bold text-white">
                General Information
              </h4>

              <div className="flex items-start gap-3.5">
                <LuPhone className="mt-0.5 size-4 shrink-0 text-gray-400" />
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
                <LuMapPin className="mt-0.5 size-4 shrink-0 text-gray-400" />
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
                <LuClock className="mt-0.5 size-4 shrink-0 text-gray-400" />
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
        </div>
      </PageLayout>
    </>
  );
}
