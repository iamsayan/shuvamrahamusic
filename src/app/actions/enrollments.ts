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
      error: 'Please enter an email address or phone number.',
    };
  }

  const cleanInput = input.trim();
  const cleanPhone = cleanInput.replace(/\D/g, '');

  try {
    const orConditions: Record<string, string>[] = [
      { email: cleanInput },
      { email: cleanInput.toLowerCase() },
      { phone: cleanInput },
    ];

    if (cleanPhone) {
      orConditions.push({ phone: cleanPhone });
    }

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
