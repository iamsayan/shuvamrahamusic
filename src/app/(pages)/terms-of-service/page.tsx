import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service and enrollment agreements for Shuvam Raha Music coaching programs.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Terms of Service',
          description:
            'Terms of service and enrollment agreements for Shuvam Raha Music coaching programs.',
          url: 'https://www.shuvamrahamusic.com/terms-of-service',
        }}
      />
      <PageLayout
        title="Terms of Service"
        subtitle="Effective Date: June 1, 2026"
      >
        <div className="space-y-8 text-xs leading-relaxed sm:text-sm md:text-base">
          <p className="text-gray-300">
            Welcome to Shuvam Raha Music. By accessing or using this website,
            you agree to these Terms of Service.
          </p>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300">
              By using this website, you agree to comply with these Terms of
              Service and all applicable laws.
            </p>
            <p className="text-gray-300">
              If you do not agree, please do not use the website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              2. Services
            </h2>
            <p className="text-gray-300">
              This website provides information regarding:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-gray-300">
              <li>Guitar lessons</li>
              <li>Music education</li>
              <li>Performances</li>
              <li>Music content</li>
              <li>Educational resources</li>
            </ul>
            <p className="mt-2 text-gray-300">
              All services are subject to availability and may be modified
              without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              3. Intellectual Property
            </h2>
            <p className="text-gray-300">
              All content on this website, including:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-gray-300">
              <li>Text</li>
              <li>Images</li>
              <li>Videos</li>
              <li>Logos</li>
              <li>Graphics</li>
              <li>Music samples</li>
            </ul>
            <p className="mt-2 text-gray-300">
              is owned by or licensed to Shuvam Raha Music and protected by
              applicable copyright and intellectual property laws.
            </p>
            <p className="text-gray-300">
              You may not reproduce, distribute, or use content without prior
              written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              4. User Conduct
            </h2>
            <p className="text-gray-300">You agree not to:</p>
            <ul className="list-disc space-y-1 pl-5 text-gray-300">
              <li>Violate any laws</li>
              <li>Attempt unauthorized access to the website</li>
              <li>Interfere with website functionality</li>
              <li>Submit harmful or misleading information</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              5. Class Registration & Payments
            </h2>
            <p className="text-gray-300">
              For students enrolling in guitar lessons:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-gray-300">
              <li>
                Fees, schedules, and policies will be communicated separately.
              </li>
              <li>Missed classes may be subject to rescheduling policies.</li>
              <li>
                Payments once made may be non-refundable unless otherwise
                agreed.
              </li>
              <li>
                Specific course policies may override these general terms.
              </li>
            </ul>

            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/4 p-4 text-amber-200/90">
              <p className="text-xs font-bold sm:text-sm">Important Notice:</p>
              <p className="mt-1 text-xs leading-normal">
                Payments accepted through this website are only for guitar
                lessons, music education programs, and training services. This
                website does not sell event tickets or concert passes.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              6. Disclaimer
            </h2>
            <p className="text-gray-300">
              All information provided on this website is for informational
              purposes only.
            </p>
            <p className="text-gray-300">
              While we strive for accuracy, we make no warranties regarding
              completeness, reliability, or availability of information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-300">
              Shuvam Raha Music shall not be liable for any indirect,
              incidental, or consequential damages arising from use of the
              website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              8. Third-Party Services
            </h2>
            <p className="text-gray-300">
              The website may contain links to third-party websites or
              platforms.
            </p>
            <p className="text-gray-300">
              We are not responsible for the content or practices of third-party
              services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              9. Changes to Terms
            </h2>
            <p className="text-gray-300">
              We reserve the right to modify these Terms at any time.
            </p>
            <p className="text-gray-300">
              Updated terms will be posted on this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              10. Contact Information
            </h2>
            <p className="text-gray-300">
              Questions regarding these Terms may be directed to:
            </p>
            <div className="mt-2 space-y-2 rounded-xl border border-white/5 bg-white/2 p-4 text-left">
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
        </div>
      </PageLayout>
    </>
  );
}
