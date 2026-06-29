'use server';

import cockpit from '@/lib/client';
import { Enrollment } from '@/types';

export async function fetchPaymentHistory(input: string): Promise<{
  success: boolean;
  data?: Enrollment[];
  error?: string;
}> {
  if (!input || input.trim() === '') {
    return {
      success: false,
      error: 'Please enter an email address.',
    };
  }

  const cleanInput = input.trim();

  try {
    const orConditions: Record<string, string>[] = [
      { email: cleanInput },
      { email: cleanInput.toLowerCase() },
    ];

    const enrollments = await cockpit.listContentItems<Enrollment[]>(
      'enrollments',
      {
        filter: {
          $or: orConditions,
        },
        populate: 1,
        sort: { _created: -1 },
      }
    );

    return {
      success: true,
      data: enrollments,
    };
  } catch (error) {
    console.error('Error in fetchPaymentHistory action:', error);
    return {
      success: false,
      error:
        'An error occurred while fetching payment history. Please try again.',
    };
  }
}
