'use client';

import { SubmitEvent, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { createRazorpayOrder } from '@/app/actions/razorpay';
import { usePricingPlans } from '@/app/providers';
import { useCountry } from '@/hooks/use-country';
import { useRegion } from '@/hooks/use-region';
import { loadRazorpay } from '@/lib/load-razorpay';
import { getCurrencySymbol } from '@/lib/utils';
import { PricingPlan } from '@/types';
import { sendGAEvent } from '@next/third-parties/google';

import { BiHome } from 'react-icons/bi';
import {
  LuCheck,
  LuGlobe,
  LuMail,
  LuMapPin,
  LuShieldCheck,
  LuTriangleAlert,
  LuUser,
} from 'react-icons/lu';
import PhoneInput, {
  type Country,
  isValidPhoneNumber,
} from 'react-phone-number-input';

interface SuccessModalProps {
  paymentId: string;
  amount: string;
  currency: string;
  planName: string;
  onReset: () => void;
}

const SuccessModal = ({
  paymentId,
  amount,
  currency,
  planName,
  onReset,
}: SuccessModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020205]/80 backdrop-blur-md transition-all duration-300">
      <div className="relative mx-4 w-full max-w-md transform overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A15]/95 p-8 text-center shadow-2xl backdrop-blur-3xl">
        {/* Glowing top accent */}
        <div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-emerald-500 to-teal-400" />

        <div className="flex flex-col items-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
            <LuShieldCheck className="size-10 animate-bounce" />
          </div>

          <h3 className="font-heading text-xl font-black text-white sm:text-2xl">
            Enrollment Successful!
          </h3>
          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            Thank you! You are now enrolled in the{' '}
            <strong className="text-white">{planName}</strong>.
          </p>

          {/* Slip details */}
          <div className="mt-6 w-full rounded-2xl border border-white/5 bg-white/1 p-5 text-left text-xs leading-relaxed text-gray-400">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                  Amount Paid
                </span>
                <span className="text-sm font-bold text-white">
                  {currency}
                  {amount}
                </span>
              </div>

              <div className="flex items-start justify-between pt-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                    Payment ID
                  </span>
                  <span className="font-mono text-[11px] font-semibold break-all text-gray-300 select-all">
                    {paymentId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ml-2 cursor-pointer rounded-lg border border-white/10 bg-[#070710] p-1.5 text-gray-400 transition-all hover:bg-white/5 hover:text-white active:scale-95"
                  title="Copy Transaction ID"
                >
                  {copied ? (
                    <span className="font-bold text-emerald-400">Copied!</span>
                  ) : (
                    <svg
                      className="size-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                  Status
                </span>
                <span className="flex items-center gap-1 font-bold text-emerald-400">
                  <LuShieldCheck className="size-4" /> Razorpay Verified
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="font-heading mt-8 w-full cursor-pointer rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-95 sm:text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const ErrorModal = ({
  error,
  onClose,
}: {
  error: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020205]/80 backdrop-blur-md transition-all duration-300">
    <div className="relative mx-4 w-full max-w-md transform overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A15]/95 p-8 text-center shadow-2xl backdrop-blur-3xl">
      {/* Glowing top accent */}
      <div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-rose-500 to-red-600" />

      <div className="flex flex-col items-center">
        <div className="mb-6 flex size-16 animate-pulse items-center justify-center rounded-full bg-rose-500/10 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
          <LuTriangleAlert className="size-10" />
        </div>

        <h3 className="font-heading text-xl font-black text-white sm:text-2xl">
          Checkout Error
        </h3>
        <p className="mt-2 text-xs text-gray-400 sm:text-sm">
          Something went wrong while processing your request.
        </p>

        <div className="mt-6 w-full rounded-2xl border border-rose-500/10 bg-rose-950/20 p-5 text-left text-xs leading-relaxed text-rose-300">
          <span className="mb-1.5 block text-[9px] font-bold tracking-widest text-gray-500 uppercase">
            Error Details
          </span>
          <p className="font-mono font-semibold break-all">{error}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="font-heading mt-8 w-full cursor-pointer rounded-xl bg-linear-to-r from-rose-500 to-red-600 py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] active:scale-95 sm:text-sm"
        >
          Close &amp; Try Again
        </button>
      </div>
    </div>
  </div>
);

const THEME_MAP: Record<string, Record<string, string>> = {
  emerald: {
    btn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500/30',
    text: 'text-emerald-400',
  },
  amber: {
    btn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] border-amber-500/30',
    text: 'text-amber-400',
  },
  blue: {
    btn: 'bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/30',
    text: 'text-cyan-400',
  },
  violet: {
    btn: 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] border-violet-500/30',
    text: 'text-violet-400',
  },
};

const getPlanThemeName = (planRegion: string, idx: number) => {
  const isIndia = planRegion === 'India';
  return isIndia
    ? idx === 0
      ? 'emerald'
      : 'amber'
    : idx === 0
      ? 'blue'
      : 'violet';
};

export default function SecurePayPortal() {
  const plans = usePricingPlans();
  const countryData = useCountry();
  const [region, setRegion] = useRegion();
  const searchParams = useSearchParams();

  const planParam = searchParams?.get('plan') || null;
  const matchedPlan = planParam
    ? plans?.find((p) => p._id === planParam)
    : null;
  const isPlanSelectionLocked = !!matchedPlan;

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    matchedPlan ? planParam : null
  );

  const [success, setSuccess] = useState<{
    paymentId: string;
    amount: string;
    currency: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: process.env.NEXT_PUBLIC_TEST_NAME || '',
    email: process.env.NEXT_PUBLIC_TEST_EMAIL || '',
    phone: process.env.NEXT_PUBLIC_TEST_PHONE || '',
    city: process.env.NEXT_PUBLIC_TEST_CITY || '',
    address: process.env.NEXT_PUBLIC_TEST_ADDRESS || '',
  });

  const currentPlans = (plans || []).filter((p) =>
    region === 'IN' ? p.region === 'India' : p.region === 'Outside India'
  );

  const activePlan =
    matchedPlan ||
    currentPlans.find((p) => p._id === selectedPlanId) ||
    currentPlans[0];
  const activePlanIdx = activePlan
    ? Math.max(0, currentPlans.indexOf(activePlan))
    : 0;
  const activePlanThemeName = activePlan
    ? getPlanThemeName(activePlan.region, activePlanIdx)
    : 'blue';

  const closeError = () => setError(null);
  const resetForm = () => window.location.reload();

  const handlePhoneChange = (val?: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: val || '',
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!activePlan) {
      setError('Please select a valid plan');
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded || !window.Razorpay) {
      setError('Failed to load Razorpay SDK');
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.address
    ) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      setError('Please enter a valid WhatsApp number with country code');
      return;
    }

    try {
      setProcessing(true);
      const priceInNumber = activePlan.amount;
      const amountInUnits = Math.round(priceInNumber * 100); // Razorpay amount is in subunits (paise/cents)
      const isINR = activePlan.region === 'India';
      const currency = isINR ? 'INR' : 'USD';

      // Call Server Action to securely instantiate the order on Razorpay
      const orderResponse = await createRazorpayOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: amountInUnits,
        currency: currency,
        city: formData.city,
        address: formData.address,
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.error ?? 'Error creating order');
      }

      // Track begin_checkout event
      if (process.env.NODE_ENV === 'production') {
        sendGAEvent('event', 'begin_checkout', {
          value: activePlan.amount,
          currency: currency,
          items: [
            {
              item_id: activePlan._id,
              item_name: activePlan.name,
              price: activePlan.amount,
              quantity: 1,
              item_category: 'Guitar Classes',
            },
          ],
        });
      }

      // Capture stored UTM parameters for marketing attribution
      const utmNotes: Record<string, string> = {};
      const utmKeys = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'gclid',
      ];
      utmKeys.forEach((key) => {
        if (typeof window !== 'undefined') {
          const val = sessionStorage.getItem(key);
          if (val) {
            utmNotes[key] = val;
          }
        }
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amountInUnits.toString(),
        currency: currency,
        name: 'Shuvam Raha Music',
        description: `Enrollment in ${activePlan.name} for ${formData.name}`,
        order_id: orderResponse.orderId,
        notes: {
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          plan_name: activePlan.name,
          plan_id: activePlan._id,
          region: activePlan.region === 'India' ? 'IN' : 'GLOBAL',
          city: formData.city,
          address: formData.address,
          ...utmNotes,
        },
        handler: function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          // Track purchase event
          if (process.env.NODE_ENV === 'production') {
            sendGAEvent('event', 'purchase', {
              transaction_id: response.razorpay_payment_id,
              value: activePlan.amount,
              currency: currency,
              items: [
                {
                  item_id: activePlan._id,
                  item_name: activePlan.name,
                  price: activePlan.amount,
                  quantity: 1,
                  item_category: 'Guitar Classes',
                },
              ],
            });
          }

          setSuccess({
            paymentId: response.razorpay_payment_id,
            amount: activePlan.amount.toString(),
            currency: getCurrencySymbol(activePlan.region),
          });
          setProcessing(false);
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color:
            activePlanThemeName === 'emerald'
              ? '#059669'
              : activePlanThemeName === 'amber'
                ? '#d97706'
                : activePlanThemeName === 'violet'
                  ? '#7c3aed'
                  : '#2563eb',
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.open();
    } catch (err) {
      setProcessing(false);
      console.error('Payment checkout exception:', err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const planTheme = THEME_MAP[activePlanThemeName] || THEME_MAP.blue;

  return (
    <div className="w-full">
      {success && (
        <SuccessModal
          paymentId={success.paymentId}
          amount={success.amount}
          currency={success.currency}
          planName={activePlan?.name || ''}
          onReset={resetForm}
        />
      )}
      {error && <ErrorModal error={error} onClose={closeError} />}

      {/* SSL Status */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
          <LuShieldCheck className="size-4 animate-pulse text-emerald-400" />
          256-BIT SSL SECURE CHECKOUT
        </div>
      </div>

      {/* Region Switcher */}
      {!isPlanSelectionLocked && (
        <div className="relative mb-8 flex w-full rounded-full border border-white/5 bg-white/3 p-1.5 shadow-2xl backdrop-blur-xl">
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full border border-white/10 bg-white/10 shadow-lg transition-transform duration-500 ease-out ${
              region === 'IN' ? 'translate-x-0' : 'translate-x-[100%]'
            }`}
          />
          <button
            disabled={isPlanSelectionLocked}
            onClick={() => {
              setRegion('IN');
              setSelectedPlanId(null);
            }}
            className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold transition-colors duration-300 sm:text-sm ${
              region === 'IN' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <LuMapPin className="size-4" />
            India (INR)
          </button>
          <button
            disabled={isPlanSelectionLocked}
            onClick={() => {
              setRegion('GLOBAL');
              setSelectedPlanId(null);
            }}
            className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold transition-colors duration-300 sm:text-sm ${
              region === 'GLOBAL'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LuGlobe className="size-4" />
            Global (USD)
          </button>
        </div>
      )}

      {/* Plan Selection Buttons */}
      <div className="flex w-full flex-col gap-3">
        {isPlanSelectionLocked && (
          <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
            Your Selected Plan
          </div>
        )}
        {(isPlanSelectionLocked && activePlan
          ? [activePlan]
          : currentPlans
        ).map((plan: PricingPlan, idx: number) => {
          const isActive = activePlan?._id === plan._id;
          const themeName = getPlanThemeName(plan.region, idx);
          const theme = THEME_MAP[themeName] || THEME_MAP.blue;
          const popular = plan.is_popular === true;
          const currency = getCurrencySymbol(plan.region);

          return (
            <button
              key={idx}
              disabled={isPlanSelectionLocked}
              onClick={() => setSelectedPlanId(plan._id)}
              className={`group/plan-btn relative flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                isPlanSelectionLocked
                  ? 'cursor-default border-cyan-500/20 bg-white/2'
                  : isActive
                    ? 'cursor-pointer border-cyan-500/40 bg-white/3 shadow-[0_10px_35px_rgba(6,182,212,0.06)]'
                    : 'cursor-pointer border-white/4 bg-white/0.5 hover:border-white/10 hover:bg-white/1'
              }`}
            >
              <div className="flex items-center gap-4">
                {isPlanSelectionLocked ? (
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                    <LuShieldCheck className="size-4" />
                  </div>
                ) : (
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600'
                    }`}
                  >
                    {isActive && (
                      <div className="size-2.5 rounded-full bg-cyan-400" />
                    )}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-bold text-white sm:text-base">
                      {plan.name}
                    </span>
                    {popular && (
                      <span className="rounded-full bg-linear-to-r from-amber-500 to-orange-400 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-1 max-w-[200px] text-xs text-gray-400 sm:max-w-none">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-heading text-base font-black transition-colors duration-300 sm:text-lg ${
                    isActive || isPlanSelectionLocked
                      ? theme.text
                      : 'text-gray-400'
                  }`}
                >
                  {currency}
                  {plan.amount}
                </span>
                <span className="mt-0.5 block text-[10px] text-gray-500 lowercase">
                  /{plan.duration || 'month'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Order Summary Panel */}
      {activePlan && (
        <div className="group/summary relative mt-8 overflow-hidden rounded-3xl border border-white/5 bg-white/1 p-6 shadow-xl backdrop-blur-md">
          <div
            className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${
              activePlanThemeName === 'emerald'
                ? 'from-emerald-500 to-teal-400'
                : activePlanThemeName === 'amber'
                  ? 'from-amber-500 to-orange-400'
                  : activePlanThemeName === 'violet'
                    ? 'from-violet-500 to-fuchsia-400'
                    : 'from-blue-500 to-cyan-400'
            } opacity-70`}
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="text-left">
                <span className="font-heading text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Selected Program
                </span>
                <h4 className="font-heading mt-0.5 text-sm font-black text-white sm:text-base">
                  {activePlan.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="font-heading text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Billing Period
                </span>
                <p className="font-heading mt-0.5 text-xs font-bold text-gray-300 capitalize sm:text-sm">
                  {activePlan.duration || 'month'}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <div className="font-heading mb-4 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                Features Included:
              </div>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {(activePlan.features || []).map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2 text-xs text-gray-300 sm:text-sm"
                  >
                    <LuCheck
                      className={`mt-0.5 shrink-0 stroke-[3] ${planTheme.text} size-4`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best For Tag */}
            <div className="mt-2 rounded-xl border border-white/5 bg-white/2 px-4 py-2.5 text-center">
              <span className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                Best suited for
              </span>
              <span className="text-xs font-bold text-gray-300">
                {activePlan.best_for}
              </span>
            </div>

            {/* Total Due Display */}
            <div className="mt-2 flex items-baseline justify-between border-t border-white/5 pt-4">
              <span className="font-heading text-xs font-bold text-white sm:text-sm">
                Amount Due Today:
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`font-heading text-2xl font-black sm:text-3xl ${planTheme.text}`}
                >
                  {getCurrencySymbol(activePlan.region)}
                  {activePlan.amount}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  /{activePlan.duration || 'month'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Form */}
      <form
        onSubmit={handlePayment}
        className="mt-8 space-y-5 rounded-3xl border border-white/5 bg-white/1 p-6 text-left shadow-xl"
      >
        <h4 className="font-heading text-sm font-extrabold text-white sm:text-base">
          Enter Your Contact Details
        </h4>

        {/* Name Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
          >
            Full Name <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
              <LuUser className="size-4" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={processing}
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-white/10 bg-[#080812]/50 py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/4 focus:ring-1 focus:ring-cyan-500/30"
            />
          </div>
        </div>

        {/* Email & Phone grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
            >
              Email Address <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
                <LuMail className="size-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={processing}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-white/10 bg-[#080812]/50 py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/4 focus:ring-1 focus:ring-cyan-500/30"
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="secure-pay-portal-phone space-y-1.5">
            <label
              htmlFor="phone"
              className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
            >
              WhatsApp Number <span className="text-cyan-400">*</span>
            </label>
            <PhoneInput
              international
              defaultCountry={(countryData?.country || 'IN') as Country}
              value={formData.phone}
              onChange={handlePhoneChange}
              disabled={processing}
              name="phone"
              placeholder="Enter WhatsApp number"
            />
          </div>
        </div>

        {/* City & Address grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* City Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="city"
              className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
            >
              City <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
                <LuMapPin className="size-4" />
              </div>
              <input
                type="text"
                id="city"
                name="city"
                required
                disabled={processing}
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g. Kolkata"
                className="w-full rounded-xl border border-white/10 bg-[#080812]/50 py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/4 focus:ring-1 focus:ring-cyan-500/30"
              />
            </div>
          </div>

          {/* Address Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="address"
              className="text-[10px] font-black tracking-widest text-gray-500 uppercase"
            >
              Full Address <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
                <BiHome className="size-4" />
              </div>
              <input
                type="text"
                id="address"
                name="address"
                required
                disabled={processing}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g. Flat 3B, 12 Park Street"
                className="w-full rounded-xl border border-white/10 bg-[#080812]/50 py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/4 focus:ring-1 focus:ring-cyan-500/30"
              />
            </div>
          </div>
        </div>

        {/* Proceed to Pay Button */}
        {activePlan && (
          <button
            type="submit"
            disabled={processing}
            className={`w-full rounded-2xl py-4 text-xs font-black tracking-wider transition-all duration-300 active:scale-[0.98] sm:text-sm ${planTheme.btn} font-heading mt-6 flex cursor-pointer items-center justify-center gap-2 text-center disabled:opacity-50`}
          >
            {processing ? (
              <>
                <svg
                  className="mr-2 -ml-1 size-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing Secure Payment...
              </>
            ) : (
              <>
                Proceed to Pay {getCurrencySymbol(activePlan.region)}
                {activePlan.amount}
              </>
            )}
          </button>
        )}
      </form>

      {/* Direct WhatsApp Support Helper link */}
      <div className="mt-4 text-center">
        <span className="text-[10px] leading-relaxed text-gray-500 sm:text-xs">
          Need help?{' '}
          <a
            href={`https://wa.me/918961369468?text=${encodeURIComponent(
              'Hi Shuvam, I need help with my classes payment.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cyan-400 underline transition-colors hover:text-cyan-300"
          >
            Chat on WhatsApp
          </a>
        </span>
      </div>

      {/* Trust & Safe Payment Deck */}
      <div className="mt-6 flex flex-col items-center gap-2 border-t border-white/5 pt-6 text-center">
        <div className="flex items-center justify-center gap-4 text-gray-500 opacity-60">
          <span className="text-[9px] font-bold tracking-widest uppercase sm:text-[10px]">
            Secured by Razorpay
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[10px] text-gray-400 sm:text-xs">
          <span className="flex items-center gap-1">
            <LuShieldCheck className="size-3.5 text-emerald-500" /> UPI / Net
            Banking
          </span>
          <span className="flex items-center gap-1">
            <LuShieldCheck className="size-3.5 text-emerald-500" /> Credit /
            Debit Cards
          </span>
          <span className="flex items-center gap-1">
            <LuShieldCheck className="size-3.5 text-emerald-500" /> Safe
            Processing
          </span>
        </div>
      </div>
    </div>
  );
}
