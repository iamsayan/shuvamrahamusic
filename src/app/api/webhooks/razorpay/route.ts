import { NextRequest, NextResponse } from 'next/server';

import cockpit from '@/lib/client';

import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not configured.');
      return NextResponse.json(
        { success: false, error: 'Webhook secret is not configured' },
        { status: 500 }
      );
    }

    if (!signature) {
      return NextResponse.json(
        { success: false, error: 'Signature header is missing' },
        { status: 400 }
      );
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.warn('Razorpay webhook signature verification failed.');
      return NextResponse.json(
        { success: false, error: 'Signature verification failed' },
        { status: 400 }
      );
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    console.log(`Received Razorpay webhook event: ${event}`);

    if (event === 'payment.captured') {
      const payment = payload.payload?.payment?.entity;
      if (!payment) {
        return NextResponse.json(
          { success: false, error: 'Missing payment entity' },
          { status: 400 }
        );
      }

      const notes = payment.notes || {};
      const amount = payment.amount ? payment.amount / 100 : 0;

      const enrollmentData = {
        payment_id: payment.id,
        order_id: payment.order_id,
        amount: amount,
        currency: payment.currency,
        method: payment.method,
        student_name: notes.name,
        email: notes.email || payment.email || '',
        phone: notes.phone || payment.contact || '',
        city: notes.city,
        address: notes.address,
        plan: {
          _id: notes.plan_id,
          model: 'pricingplans',
        },
        region: notes.region,
      };

      await cockpit.saveContentItem('enrollments', enrollmentData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling Razorpay webhook:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
