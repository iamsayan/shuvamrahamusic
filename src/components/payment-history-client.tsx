'use client';

import React, { useState } from 'react';

import { fetchPaymentHistory } from '@/app/actions/enrollments';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Enrollment } from '@/types';

import {
  LuCalendar,
  LuCheck,
  LuCircleCheck,
  LuCopy,
  LuCreditCard,
  LuGlobe,
  LuLoader,
  LuMail,
  LuMapPin,
  LuMessageSquare,
  LuPhone,
  LuPrinter,
  LuReceipt,
  LuSearch,
  LuTriangleAlert,
} from 'react-icons/lu';

export default function PaymentHistoryClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      setError('Please enter your email or phone number.');
      return;
    }

    setIsSearching(true);
    setError('');
    setHasSearched(false);

    try {
      const res = await fetchPaymentHistory(term);
      if (res.success && res.data) {
        setEnrollments(res.data);
      } else {
        setError(
          res.error || 'Failed to fetch payment records. Please try again.'
        );
      }
    } catch (err) {
      setError(
        'A network error occurred. Please check your connection and try again.'
      );
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePrint = (item: Enrollment, planName: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currencySymbol =
      item.region?.toUpperCase() === 'GLOBAL' ||
      item.region?.toUpperCase() === 'US'
        ? '$'
        : '₹';

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${item.payment_id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; padding: 40px; line-height: 1.6; }
            .invoice-box { max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); font-size: 14px; color: #555; }
            .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid #06b6d4; padding-bottom: 20px; margin-bottom: 20px; }
            .logo { font-size: 20px; font-weight: bold; color: #0891b2; }
            .title { font-size: 16px; font-weight: bold; color: #333; text-align: right; }
            .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .section-title { font-weight: bold; margin-bottom: 5px; color: #666; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .table th { background: #f9f9f9; text-align: left; padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; }
            .table td { padding: 10px; border-bottom: 1px solid #eee; }
            .total { text-align: right; font-size: 18px; font-weight: bold; color: #333; margin-top: 10px; }
            .footer { text-align: center; font-size: 11px; color: #999; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; }
            @media print {
              body { padding: 0; }
              .invoice-box { border: none; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="invoice-header">
              <div class="logo">Shuvam Raha Music</div>
              <div class="title">PAYMENT RECEIPT</div>
            </div>
            
            <div class="grid">
              <div>
                <div class="section-title">Billed To</div>
                <strong>${item.name}</strong><br>
                Email: ${item.email}<br>
                Phone: ${item.phone}<br>
                ${item.address ? `${item.address}, ` : ''}${item.city || ''}
              </div>
              <div style="text-align: right;">
                <div class="section-title">Receipt Details</div>
                Date: ${formatDate(item._created, 'en-IN')}<br>
                Payment ID: ${item.payment_id || 'N/A'}<br>
                Order ID: ${item.order_id || 'N/A'}<br>
                Method: ${item.method?.toUpperCase() || 'ONLINE'}
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Guitar coaching package - ${planName}</td>
                  <td style="text-align: right;">${currencySymbol}${item.amount}</td>
                </tr>
              </tbody>
            </table>

            <div class="total">
              Total Paid: ${currencySymbol}${item.amount}
            </div>

            <div class="footer">
              Thank you for learning with Shuvam Raha Music!<br>
              South Dumdum, Kolkata, India • contact@shuvamrahamusic.com
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Bar Container */}
      <div className="mx-auto max-w-xl">
        <form
          onSubmit={handleSearch}
          className="relative flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
              <LuSearch className="size-4.5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter email or phone number..."
              className="w-full rounded-2xl border border-white/10 bg-white/2 py-3.5 pr-4 pl-11 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/4 focus:ring-1 focus:ring-cyan-500/30"
              disabled={isSearching}
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="group font-heading flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <LuLoader className="size-4.5 animate-spin" />
                Searching...
              </>
            ) : (
              'Check History'
            )}
          </button>
        </form>
        <p className="mt-2.5 text-center text-xs text-gray-500">
          Search using the email address or phone number linked to your
          registration.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-auto flex max-w-xl items-start gap-2.5 rounded-2xl border border-red-500/10 bg-red-500/4 p-4 text-sm text-red-400">
          <LuTriangleAlert className="mt-0.5 size-5 shrink-0 text-red-500" />
          <p className="leading-snug">{error}</p>
        </div>
      )}

      {/* Results Section */}
      <div className="mt-10 space-y-6">
        {isSearching && (
          <div className="flex flex-col items-center justify-center py-20">
            <LuLoader className="size-10 animate-spin text-cyan-400" />
            <p className="mt-4 text-sm text-gray-400">
              Searching payment history...
            </p>
          </div>
        )}

        {!isSearching && hasSearched && enrollments.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/1 px-4 py-16 text-center">
            <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-white/2 text-gray-500">
              <LuReceipt className="size-7" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
              No Payment History Found
            </h3>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-gray-400 sm:text-sm">
              We couldn&apos;t find any enrollment records for &ldquo;
              <span className="font-semibold text-white">{searchTerm}</span>
              &rdquo;. Please double check the spelling or contact support if
              you need manual verification.
            </p>
            <a
              href="https://wa.me/918961369468?text=Hi%20Shuvam,%20I%27m%20having%20issues%20finding%20my%20payment%20history."
              target="_blank"
              rel="noopener noreferrer"
              className="group font-heading mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Support via WhatsApp &rarr;
            </a>
          </div>
        )}

        {!isSearching && enrollments.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-heading text-lg font-black text-white sm:text-xl">
                Found {enrollments.length} Payment{' '}
                {enrollments.length === 1 ? 'Record' : 'Records'}
              </h3>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                <LuCircleCheck className="size-4" />
                Verified
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {enrollments.map((item, idx) => {
                const planName =
                  item.plan &&
                  typeof item.plan === 'object' &&
                  'name' in item.plan
                    ? item.plan.name
                    : 'Guitar Learning Session';

                // Spans full width if it's the only item, or the last item in an odd list
                const isFullWidth =
                  enrollments.length === 1 ||
                  (idx === enrollments.length - 1 &&
                    enrollments.length % 2 !== 0);

                return (
                  <div
                    key={item._id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/1 p-5 text-left transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${
                      isFullWidth ? 'md:col-span-2' : ''
                    }`}
                  >
                    {/* Glass Glowing Accent */}
                    <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-cyan-500/5 blur-2xl transition-transform duration-500 group-hover:scale-150" />

                    <div className="space-y-4">
                      {/* Top Row: Plan Name & Amount */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                            Enrollment Plan
                          </span>
                          <h4 className="font-heading mt-0.5 text-base font-extrabold text-white sm:text-lg">
                            {planName}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                            Amount Paid
                          </span>
                          <p className="font-heading mt-0.5 text-lg leading-none font-black text-white sm:text-xl">
                            {formatCurrency(item.amount, item.region)}
                          </p>
                          <span className="mt-1 inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                            <span className="size-1 animate-pulse rounded-full bg-emerald-400" />
                            SUCCESS
                          </span>
                        </div>
                      </div>

                      {/* Detail Fields */}
                      <div
                        className={`grid gap-y-3.5 border-t border-white/5 pt-4 text-xs ${isFullWidth ? 'grid-cols-2 gap-x-4 sm:grid-cols-4' : 'grid-cols-2'}`}
                      >
                        {/* Transaction ID */}
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                            Payment ID
                          </span>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <p className="font-mono font-bold break-all text-gray-300 select-all">
                              {item.payment_id || 'N/A'}
                            </p>
                            {item.payment_id && (
                              <button
                                onClick={() =>
                                  handleCopy(item.payment_id, `${item._id}-pay`)
                                }
                                className="shrink-0 p-0.5 text-gray-500 transition-colors hover:text-cyan-400"
                                title="Copy Payment ID"
                              >
                                {copiedField === `${item._id}-pay` ? (
                                  <LuCheck className="size-3.5 text-emerald-400" />
                                ) : (
                                  <LuCopy className="size-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Order ID */}
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                            Order ID
                          </span>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <p className="font-mono font-bold break-all text-gray-300 select-all">
                              {item.order_id || 'N/A'}
                            </p>
                            {item.order_id && (
                              <button
                                onClick={() =>
                                  handleCopy(item.order_id, `${item._id}-ord`)
                                }
                                className="shrink-0 p-0.5 text-gray-500 transition-colors hover:text-cyan-400"
                                title="Copy Order ID"
                              >
                                {copiedField === `${item._id}-ord` ? (
                                  <LuCheck className="size-3.5 text-emerald-400" />
                                ) : (
                                  <LuCopy className="size-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Date */}
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                            Payment Date
                          </span>
                          <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-gray-300">
                            <LuCalendar className="size-3.5 text-cyan-400" />
                            {formatDate(item._created, 'en-IN')}
                          </p>
                        </div>

                        {/* Method */}
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                            Method
                          </span>
                          <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-gray-300 capitalize">
                            <LuCreditCard className="size-3.5 text-cyan-400" />
                            <span>{item.method || 'Online'}</span>
                          </p>
                        </div>

                        {/* Billing Region */}
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                            Region
                          </span>
                          <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-gray-300">
                            <LuGlobe className="size-3.5 text-cyan-400" />
                            <span>
                              {item.region?.toUpperCase() === 'GLOBAL'
                                ? 'International'
                                : 'Domestic (India)'}
                            </span>
                          </p>
                        </div>

                        {/* Secure Gateway */}
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                            Gateway
                          </span>
                          <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-gray-300">
                            <LuCircleCheck className="size-3.5 text-emerald-400" />
                            <span>Razorpay</span>
                          </p>
                        </div>

                        {/* Payer Details */}
                        <div
                          className={`col-span-2 border-t border-white/5 pt-3.5 ${isFullWidth ? 'sm:col-span-2' : ''}`}
                        >
                          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                            Student Details
                          </span>
                          <div className="mt-1.5 space-y-1.5 text-xs text-gray-400">
                            <p className="font-semibold text-gray-300">
                              {item.name}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <LuMail className="size-3.5 shrink-0 text-gray-500" />
                              {item.email}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <LuPhone className="size-3.5 shrink-0 text-gray-500" />
                              {item.phone}
                            </p>
                          </div>
                        </div>

                        {/* Address */}
                        {(item.city || item.address) && (
                          <div
                            className={`col-span-2 border-t border-white/5 pt-3.5 ${isFullWidth ? 'sm:col-span-2' : ''}`}
                          >
                            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                              Billing Address
                            </span>
                            <p className="mt-1 flex items-start gap-1.5 text-xs leading-relaxed text-gray-400">
                              <LuMapPin className="mt-0.5 size-3.5 shrink-0 text-gray-500" />
                              <span>
                                {item.address && `${item.address}, `}
                                {item.city}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Card Actions Footer */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
                        {/* Left: WhatsApp support */}
                        {item.payment_id && (
                          <a
                            href={`https://wa.me/918961369468?text=${encodeURIComponent(
                              `Hello Shuvam, I have a billing inquiry regarding my payment (ID: ${item.payment_id}) for the ${planName} course.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-1.5 text-xs font-bold text-cyan-400/80 transition-colors hover:text-cyan-300"
                          >
                            <LuMessageSquare className="size-3.5 transition-transform group-hover:scale-110" />
                            <span>Get Billing Help</span>
                          </a>
                        )}

                        {/* Right: Print Invoice */}
                        <button
                          onClick={() => handlePrint(item, planName)}
                          className="group flex items-center gap-1.5 text-xs font-bold text-gray-500 transition-colors hover:text-white"
                          title="Print Receipt"
                        >
                          <LuPrinter className="size-3.5 transition-transform group-hover:scale-110" />
                          <span>Print Invoice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
