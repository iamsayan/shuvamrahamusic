import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import { SCHEMA } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    'Refund, return, cancellation, and class rescheduling policies for Shuvam Raha Music programs.',
};

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd
        schema={[
          SCHEMA.breadcrumb('/refund-policy'),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Refund Policy',
            description:
              'Refund, return, cancellation, and class rescheduling policies for Shuvam Raha Music programs.',
            url: 'https://www.shuvamrahamusic.com/refund-policy',
          },
        ]}
      />
      <PageLayout title="Refund Policy" subtitle="Effective Date: June 1, 2026">
        <div className="space-y-8 text-xs leading-relaxed sm:text-sm md:text-base">
          <p className="text-gray-300">
            This Refund Policy applies to all guitar lessons and music education
            services offered by Shuvam Raha Music.
          </p>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              1. Monthly Fee Policy
            </h2>
            <p className="text-gray-300">
              All course fees are payable in advance and reserve the student’s
              time slot for the month.
            </p>
            <p className="text-gray-300">
              Fees cover the scheduled classes for the month and are not based
              on attendance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              2. Refund Policy
            </h2>

            <div className="space-y-2 border-l border-white/10 pl-4">
              <h3 className="text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
                Monthly Class Fees
              </h3>
              <p className="text-gray-300">
                Fees paid for regular guitar classes are generally
                non-refundable.
              </p>
              <p className="text-gray-300">
                Refunds will not be provided for missed classes due to personal
                reasons, scheduling conflicts, travel, illness, or lack of
                attendance.
              </p>
            </div>

            <div className="mt-3 space-y-2 border-l border-white/10 pl-4">
              <h3 className="text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
                Duplicate or Incorrect Payments
              </h3>
              <p className="text-gray-300">
                If a student accidentally makes a duplicate payment or is
                charged incorrectly, please contact us within 7 days of payment.
                Verified duplicate payments will be refunded within a reasonable
                timeframe.
              </p>
            </div>

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
              3. Student Absence
            </h2>
            <p className="text-gray-300">
              If a student is unable to attend a scheduled class:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-gray-300">
              <li>Advance notice is appreciated.</li>
              <li>
                Missed classes without prior notice may not be eligible for
                rescheduling.
              </li>
              <li>Rescheduling is subject to instructor availability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              4. Instructor Absence
            </h2>
            <p className="text-gray-300">
              If a class is cancelled by the instructor due to illness,
              emergency, performance commitments, technical issues, or any other
              unavoidable circumstances:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-gray-300">
              <li>A replacement class will be arranged, or</li>
              <li>The missed class will be adjusted in a future schedule.</li>
            </ul>
            <p className="mt-2 font-bold text-emerald-400">
              Students will not lose a class due to instructor-initiated
              cancellations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              5. Rescheduling Policy
            </h2>

            <div className="space-y-2 border-l border-white/10 pl-4">
              <h3 className="text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
                Individual Classes
              </h3>
              <p className="text-gray-300">
                Students may request a reschedule when:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-gray-300">
                <li>Notice is provided as early as possible.</li>
                <li>An alternative slot is available.</li>
              </ul>
              <p className="mt-1 text-xs text-gray-400 italic">
                Rescheduling requests are accommodated on a best-effort basis
                and cannot be guaranteed.
              </p>
            </div>

            <div className="mt-3 space-y-2 border-l border-white/10 pl-4">
              <h3 className="text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
                Emergency Situations
              </h3>
              <p className="text-gray-300">
                In genuine emergencies, every reasonable effort will be made to
                arrange a makeup class whenever possible.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              6. Online Class Technical Issues
            </h2>
            <p className="text-gray-300">For online lessons:</p>
            <ul className="list-disc space-y-1.5 pl-5 text-gray-300">
              <li>
                Students are responsible for ensuring a stable internet
                connection and working audio/video equipment.
              </li>
              <li>
                If a class cannot continue due to technical issues on the
                instructor’s side, a replacement class will be provided.
              </li>
              <li>
                Technical issues on the student’s side may not qualify for a
                makeup class unless determined otherwise by the instructor.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              7. Long-Term Absence or Course Discontinuation
            </h2>
            <p className="text-gray-300">
              Students planning an extended break should inform the instructor
              in advance.
            </p>
            <p className="text-gray-300">
              Reserved time slots may not be held indefinitely during prolonged
              periods of absence.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              8. Policy Changes
            </h2>
            <p className="text-gray-300">
              Shuvam Raha Music reserves the right to update or modify this
              policy at any time. Any updates will be posted on the website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">
              9. Contact
            </h2>
            <p className="text-gray-300">
              For questions regarding refunds, attendance, or rescheduling:
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
