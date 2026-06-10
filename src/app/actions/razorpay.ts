'use server';

import { RazorpayFormData } from '@/types';

import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayOrder(formData: RazorpayFormData) {
  try {
    const amount = formData.amount;
    const email = formData.email;
    const name = formData.name;
    const phone = formData.phone;
    const currency = formData.currency;
    const city = formData.city;
    const address = formData.address;

    if (!amount || !email || !name || !phone || !currency || !city || !address) {
      return {
        success: false,
        error: 'Missing required fields',
      };
    }

    const order = await razorpay.orders.create({
      amount: amount,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        email,
        name,
        phone,
        city,
        address,
      },
    });

    return {
      success: true,
      orderId: order.id,
    };
  } catch (error) {
    console.error('Error creating order:', error);

    return {
      success: false,
      error: 'Error creating order',
    };
  }
}
