import type { Metadata } from 'next';

import PageLayout from '@/components/page-layout';
import JsonLd from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy and data protection practices for Shuvam Raha Music classes and programs.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy | Shuvam Raha Music',
          description:
            'Privacy policy and data protection practices for Shuvam Raha Music classes and programs.',
          url: 'https://www.shuvamrahamusic.com/privacy-policy',
        }}
      />
      <PageLayout
        title="Privacy Policy"
        subtitle="Effective Date: June 1, 2026"
      >
        <div className="space-y-8 text-xs leading-relaxed sm:text-sm md:text-base">
          <p className="text-gray-300">
            Welcome to Shuvam Raha Music (“we,” “our,” or “us”). This Privacy
            Policy explains how we collect, use, and protect your information
            when you visit Shuvam Raha Music.
          </p>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              1. Information We Collect
            </h2>
            <p className="text-gray-300">
              We may collect the following information:
            </p>

            <div className="mt-3 space-y-2 border-l border-white/10 pl-4">
              <h3 className="text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
                Personal Information
              </h3>
              <p className="text-gray-300">
                When you contact us, enroll in classes, or submit a form, we may
                collect:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-gray-300">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Message or inquiry details</li>
              </ul>
            </div>

            <div className="mt-4 space-y-2 border-l border-white/10 pl-4">
              <h3 className="text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
                Automatically Collected Information
              </h3>
              <p className="text-gray-300">
                When you visit our website, certain information may be collected
                automatically, including:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-gray-300">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited</li>
                <li>Date and time of visits</li>
              </ul>
              <p className="mt-1 text-xs text-gray-400 italic">
                This information helps us improve our website and services.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-300">We may use your information to:</p>
            <ul className="list-disc space-y-1.5 pl-5 text-gray-300">
              <li>Respond to inquiries</li>
              <li>Provide guitar lesson information</li>
              <li>Process class registrations</li>
              <li>Communicate regarding classes, schedules, or updates</li>
              <li>Improve website performance</li>
              <li>Prevent fraud or misuse</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              3. Cookies
            </h2>
            <p className="text-gray-300">
              Our website may use cookies and similar technologies to improve
              user experience and analyze website traffic.
            </p>
            <p className="text-gray-300">
              You can disable cookies through your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              4. Sharing of Information
            </h2>
            <p className="text-gray-300">
              We do not sell, rent, or trade your personal information.
            </p>
            <p className="text-gray-300">We may share information with:</p>
            <ul className="list-disc space-y-1.5 pl-5 text-gray-300">
              <li>Website hosting providers</li>
              <li>Analytics services</li>
              <li>Service providers assisting website operations</li>
            </ul>
            <p className="text-xs text-gray-400 italic">
              Only when necessary for business operations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              5. Data Security
            </h2>
            <p className="text-gray-300">
              We take reasonable measures to protect your personal information.
              However, no method of internet transmission is completely secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              6. Third-Party Links
            </h2>
            <p className="text-gray-300">
              Our website may contain links to third-party websites, including
              social media platforms, music streaming services, and external
              resources.
            </p>
            <p className="text-gray-300">
              We are not responsible for the privacy practices of those
              websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              7. Children’s Privacy
            </h2>
            <p className="text-gray-300">
              Our services may be used by students under 18 with parental
              supervision. Parents or guardians should contact us if they have
              concerns regarding a child’s information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              8. Your Rights
            </h2>
            <p className="text-gray-300">You may request:</p>
            <ul className="list-disc space-y-1.5 pl-5 text-gray-300">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
            </ul>
            <p className="mt-2 text-gray-300">
              For such requests, contact us using the details below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              9. Contact Information
            </h2>
            <p className="text-gray-300">
              For privacy-related questions, please contact:
            </p>
            <div className="mt-2 space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left">
              <p className="font-bold text-white">Shuvam Raha Music</p>
              <p className="text-sm text-gray-300">
                Email:{' '}
                <a
                  href="mailto:contact@shuvamrahamusic.com"
                  className="text-cyan-400 hover:underline"
                >
                  contact@shuvamrahamusic.com
                </a>
              </p>
              <p className="text-sm text-gray-300">
                Website:{' '}
                <a
                  href="https://www.shuvamrahamusic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  shuvamrahamusic.com
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              10. Changes to This Policy
            </h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated effective date.
            </p>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
