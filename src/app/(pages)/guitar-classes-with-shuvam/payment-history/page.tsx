import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import PaymentHistoryClient from '@/components/payment-history-client';
import { SCHEMA } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Payment History',
  description:
    'Track and verify your enrollment transaction details, plans, and billing history with Shuvam Raha Music.',
  alternates: {
    canonical: '/guitar-classes-with-shuvam/payment-history',
  },
};

export default function PaymentHistoryPage() {
  return (
    <>
      <JsonLd
        schema={[
          SCHEMA.breadcrumb('/guitar-classes-with-shuvam/payment-history'),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Payment History',
            description:
              'Verify past payment records and enrollment statuses securely using your registered email or phone.',
            url: `${SCHEMA.BASE_URL}/payment-history`,
          },
        ]}
      />
      <PageLayout
        title="Payment History"
        subtitle="Retrieve your past payment records and verify active class plans."
        showEndorsements={false}
        textAlign="center"
      >
        <PaymentHistoryClient />
      </PageLayout>
    </>
  );
}
