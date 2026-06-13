'use server';

import cockpit from '@/lib/client';
import { Enrollment } from '@/types';

export async function fetchPaymentHistory(input: string): Promise<{
  success: boolean;
  data?: Enrollment[];
  error?: string;
}> {
  if (!input || input.trim() === '') {
    return { success: false, error: 'Please enter an email address or phone number.' };
  }

  const cleanInput = input.trim();

  try {
    let enrollments: Enrollment[] = [];

    if (cleanInput.includes('@')) {
      // Search by email (case-insensitive check by matching lowercased string)
      enrollments = await cockpit.listContentItems<Enrollment[]>('enrollments', {
        filter: { email: cleanInput },
        populate: 1,
        sort: { _created: -1 },
      });

      // Fallback search with lowercase just in case it was stored that way
      if (enrollments.length === 0 && cleanInput.toLowerCase() !== cleanInput) {
        enrollments = await cockpit.listContentItems<Enrollment[]>('enrollments', {
          filter: { email: cleanInput.toLowerCase() },
          populate: 1,
          sort: { _created: -1 },
        });
      }
    } else {
      // Search by phone number
      const cleanPhone = cleanInput.replace(/\D/g, '');
      const queries = [
        cockpit.listContentItems<Enrollment[]>('enrollments', {
          filter: { phone: cleanInput },
          populate: 1,
          sort: { _created: -1 },
        }),
      ];

      if (cleanPhone && cleanPhone !== cleanInput) {
        queries.push(
          cockpit.listContentItems<Enrollment[]>('enrollments', {
            filter: { phone: cleanPhone },
            populate: 1,
            sort: { _created: -1 },
          })
        );
      }

      const responses = await Promise.all(queries);
      const uniqueEnrollments = new Map<string, Enrollment>();
      responses.flat().forEach((item) => {
        if (item && item._id) {
          uniqueEnrollments.set(item._id, item);
        }
      });
      enrollments = Array.from(uniqueEnrollments.values());
    }

    // Sort descending by creation date
    enrollments.sort((a, b) => b._created - a._created);

    return {
      success: true,
      data: enrollments,
    };
  } catch (error) {
    console.error('Error in fetchPaymentHistory action:', error);
    return {
      success: false,
      error: 'An error occurred while fetching payment history. Please try again.',
    };
  }
}
