"use client";

import { Check, Info } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Pricing({ locale }: { locale: string }) {
  const t = useTranslations("pricing");

  return (
    <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" id="pricing">
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--color-primary-500)]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            One-time payment for lifetime access. No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8 flex flex-col hover:border-[var(--text-secondary)] transition-all duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Free Tier</h3>
              <p className="text-[var(--text-secondary)]">Perfect for getting started</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-[var(--text-primary)]">₹0</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Access to <strong className="text-[var(--text-primary)]">All Array Algorithms</strong></span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong className="text-[var(--text-primary)]">1 Free Algorithm</strong> per topic</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Basic visualizations</span>
              </li>
            </ul>

            <Link
              href={`/${locale}/visualize`}
              className="w-full py-3 rounded-xl border border-[var(--border-primary)] text-[var(--text-primary)] font-semibold text-center hover:bg-[var(--bg-tertiary)] transition-all"
            >
              Start Learning Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--color-primary-500)] p-8 flex flex-col relative shadow-xl shadow-[var(--color-primary-500)]/10 overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-[var(--color-primary-500)] text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Full Access</h3>
              <p className="text-[var(--text-secondary)]">Unlock the complete library</p>
            </div>
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[var(--text-primary)]">₹1500</span>
              <span className="text-[var(--text-secondary)]">/ one-time</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-[var(--text-primary)]">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Access to <strong className="text-[var(--color-primary-500)]">All Algorithms</strong></span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-primary)]">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Interactive Code Playground</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-primary)]">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Lifetime updates & new algorithms</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-primary)]">
                <div className="mt-1 p-0.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Priority Support</span>
              </li>
            </ul>

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white font-bold text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
              Get Lifetime Access
            </button>
            <p className="text-center text-xs text-[var(--text-secondary)] mt-4 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" />
              Secure checkhout via Stripe/Razorpay
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
