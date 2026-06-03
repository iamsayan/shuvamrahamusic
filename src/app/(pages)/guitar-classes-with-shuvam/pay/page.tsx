import type { Metadata } from 'next';

import PageLayout from '@/components/page-layout';
import SecurePayPortal from '@/components/secure-pay-portal';
import JsonLd from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Secure Payment Portal | Guitar Classes with Shuvam',
  description:
    'Complete your enrollment securely. Choose from starter online classes, global coaching program, or Kolkata offline studio sessions.',
  alternates: {
    canonical: '/guitar-classes-with-shuvam/pay',
  },
};

export default function SecurePayPage() {
  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CheckoutPage',
          name: 'Secure Checkout | Shuvam Raha Music',
          description:
            'Complete your enrollment securely. Choose from starter online classes, global coaching program, or Kolkata offline studio sessions.',
          url: 'https://shuvamrahamusic.com/guitar-classes-with-shuvam/pay',
        }}
      />
      <PageLayout
        title="Secure Checkout"
        subtitle="Select your region and preferred coaching program below to complete checkout."
        maxWidth="5xl"
        textAlign="center"
      >
        <SecurePayPortal />
      </PageLayout>
    </>
  );
}
