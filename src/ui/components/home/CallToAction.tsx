"use client";

import Link from "next/link";

export function CallToAction({ locale }: { locale: string }) {
  return (
    <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-500)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-secondary-500)]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
          Ready to Level Up Your Coding Skills?
        </h2>
        <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
          Join thousands of developers who are mastering algorithms and acing their technical interviews.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Explore All Courses
          </Link>
          <Link
            href={`/${locale}/playground`}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-tertiary)] transition-all duration-300"
          >
            Try Free Playground
          </Link>
        </div>

        <div className="p-8 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] shadow-xl max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Join our weekly newsletter
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Get algorithm tips, coding challenges, and exclusive discounts delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              required
            />
            <button
              type="submit"
              className="shrink-0 px-6 py-3 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold hover:bg-[var(--color-primary-500)] hover:text-white transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-[var(--text-secondary)] mt-4">
            We care about your data in our <Link href="#" className="underline hover:text-[var(--text-primary)]">privacy policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
