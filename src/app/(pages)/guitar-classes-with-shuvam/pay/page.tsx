import { Suspense } from 'react';

import type { Metadata } from 'next';

import JsonLd from '@/components/json-ld';
import PageLayout from '@/components/page-layout';
import SecurePayPortal from '@/components/secure-pay-portal';
import cockpit from '@/lib/client';
import { PricingPlan } from '@/types';

export const metadata: Metadata = {
  title: 'Secure Payment Portal | Guitar Classes with Shuvam',
  description:
    'Complete your enrollment securely. Choose from starter online classes, global coaching program, or Kolkata offline studio sessions.',
  alternates: {
    canonical: '/guitar-classes-with-shuvam/pay',
  },
};

export default async function SecurePayPage() {
  let fetchedPlans: PricingPlan[] = [];
  try {
    const cockpitPlans =
      await cockpit.listContentItems<PricingPlan[]>('pricingplans');
    if (cockpitPlans && cockpitPlans.length > 0) {
      fetchedPlans = cockpitPlans;
    }
  } catch (error) {
    console.error('Error fetching plans in SecurePayPage:', error);
  }

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CheckoutPage',
          name: 'Secure Checkout',
          description:
            'Complete your enrollment securely. Choose from starter online classes, global coaching program, or Kolkata offline studio sessions.',
          url: 'https://www.shuvamrahamusic.com/guitar-classes-with-shuvam/pay',
        }}
      />
      <PageLayout
        title="Secure Checkout"
        subtitle="Select your region and preferred coaching program below to complete checkout."
        maxWidth="5xl"
        textAlign="center"
      >
        <Suspense
          fallback={
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-500" />
              <p className="text-sm text-gray-400">Loading secure portal...</p>
            </div>
          }
        >
          <SecurePayPortal plans={fetchedPlans} />
        </Suspense>
      </PageLayout>
    </>
  );
}
