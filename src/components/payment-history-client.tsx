'use client';

import React, { useState } from 'react';
import { fetchPaymentHistory } from '@/app/actions/enrollments';
import { Enrollment } from '@/types';
import {
  LuSearch,
  LuMail,
  LuPhone,
  LuCalendar,
  LuMapPin,
  LuCreditCard,
  LuTriangleAlert,
  LuLoader,
  LuReceipt,
  LuCircleCheck,
} from 'react-icons/lu';

export default function PaymentHistoryClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

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
        setError(res.error || 'Failed to fetch payment records. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, region?: string) => {
    const isUSD = region?.toUpperCase() === 'GLOBAL' || region?.toUpperCase() === 'US';
    if (isUSD) {
      return `$${amount}`;
    }
    return `₹${amount}`;
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Bar Container */}
      <div className="mx-auto max-w-xl">
        <form onSubmit={handleSearch} className="relative flex flex-col gap-3 sm:flex-row">
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
          Search using the email address or phone number linked to your registration.
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
            <p className="mt-4 text-sm text-gray-400">Querying Cockpit secure database...</p>
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
              We couldn&apos;t find any enrollment records for &ldquo;<span className="text-white font-semibold">{searchTerm}</span>&rdquo;. 
              Please double check the spelling or contact support if you need manual verification.
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
                Found {enrollments.length} Payment {enrollments.length === 1 ? 'Record' : 'Records'}
              </h3>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                <LuCircleCheck className="size-4" />
                Verified
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {enrollments.map((item) => {
                const planName =
                  item.plan && typeof item.plan === 'object' && 'name' in item.plan
                    ? item.plan.name
                    : 'Guitar Learning Session';

                return (
                  <div
                    key={item._id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/1 p-5 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                  >
                    {/* Glass Glowing Accent */}
                    <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-cyan-500/5 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    
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
                          <p className="font-heading mt-0.5 text-lg font-black text-white sm:text-xl">
                            {formatCurrency(item.amount, item.region)}
                          </p>
                        </div>
                      </div>

                      {/* Detail Fields */}
                      <div className="grid grid-cols-2 gap-y-3.5 border-t border-white/5 pt-4 text-xs">
                        {/* Transaction ID */}
                        <div className="col-span-2 sm:col-span-1">
                          <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                            Payment ID
                          </span>
                          <p className="font-mono mt-0.5 font-bold text-gray-300 break-all select-all">
                            {item.payment_id || 'N/A'}
                          </p>
                        </div>

                        {/* Order ID */}
                        <div className="col-span-2 sm:col-span-1">
                          <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                            Order ID
                          </span>
                          <p className="font-mono mt-0.5 font-bold text-gray-300 break-all select-all">
                            {item.order_id || 'N/A'}
                          </p>
                        </div>

                        {/* Date */}
                        <div>
                          <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                            Payment Date
                          </span>
                          <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-gray-300">
                            <LuCalendar className="size-3.5 text-cyan-400" />
                            {formatDate(item._created)}
                          </p>
                        </div>

                        {/* Method */}
                        <div>
                          <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                            Method
                          </span>
                          <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-gray-300 capitalize">
                            <LuCreditCard className="size-3.5 text-cyan-400" />
                            {item.method || 'Online'}
                          </p>
                        </div>

                        {/* Payer Details */}
                        <div className="col-span-2 border-t border-white/5 pt-3.5">
                          <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                            Student Details
                          </span>
                          <div className="mt-1.5 space-y-1.5 text-xs text-gray-400">
                            <p className="font-semibold text-gray-300">{item.name}</p>
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
                          <div className="col-span-2 border-t border-white/5 pt-3.5">
                            <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                              Billing Address
                            </span>
                            <p className="mt-1 flex items-start gap-1.5 text-xs text-gray-400 leading-relaxed">
                              <LuMapPin className="mt-0.5 size-3.5 shrink-0 text-gray-500" />
                              <span>
                                {item.address && `${item.address}, `}
                                {item.city}
                              </span>
                            </p>
                          </div>
                        )}
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
