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

  try {
    const orConditions: Record<string, unknown>[] = [
      { email: cleanInput },
      { email: cleanInput.toLowerCase() },
    ];

    // Extract digits to support phone number search
    const digits = cleanInput.replace(/\D/g, '');
    if (digits.length >= 5) {
      // Create a regex to match digits allowing for any spacing/characters in between
      const regexPattern = digits.split('').join('\\D*');
      orConditions.push({ phone: { $regex: regexPattern, $options: 'i' } });

      // If search input includes a country code (or has 10+ digits), also try searching the last 10 digits
      if (digits.length >= 10) {
        const last10 = digits.slice(-10);
        const regexLast10 = last10.split('').join('\\D*');
        orConditions.push({ phone: { $regex: regexLast10, $options: 'i' } });
      }
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
