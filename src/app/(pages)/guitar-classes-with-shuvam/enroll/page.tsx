import { Suspense } from 'react';

import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import SecurePayPortal from '@/components/secure-pay-portal';
import { SCHEMA } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Secure Payment Portal | Guitar Classes with Shuvam',
  description:
    'Complete your enrollment securely. Choose from starter online classes, global coaching program, or Kolkata offline studio sessions.',
  alternates: {
    canonical: '/guitar-classes-with-shuvam/enroll',
  },
};

export default async function SecurePayPage() {
  return (
    <>
      <JsonLd
        schema={[
          SCHEMA.breadcrumb('/guitar-classes-with-shuvam/enroll'),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Secure Checkout',
            description:
              'Complete your enrollment securely. Choose from starter online classes, global coaching program, or Kolkata offline studio sessions.',
            url: `${SCHEMA.BASE_URL}/guitar-classes-with-shuvam/enroll`,
          },
        ]}
      />
      <PageLayout
        title="Secure Checkout"
        subtitle="Select your region and preferred coaching program below to complete checkout."
        maxWidth="5xl"
        textAlign="center"
        showEndorsements={false}
      >
        <Suspense
          fallback={
            <div className="flex min-h-75 flex-col items-center justify-center gap-4">
              <div className="size-12 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-500" />
              <p className="text-sm text-gray-400">Loading secure portal...</p>
            </div>
          }
        >
          <SecurePayPortal />
        </Suspense>
      </PageLayout>
    </>
  );
}
