"use client";

import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Is this a subscription?",
    answer: "No, we believe in simple pricing. You pay a one-time fee of ₹1500 to get lifetime access to all current and future algorithms on the platform."
  },
  {
    question: "What comes with the Free Tier?",
    answer: "You get full processing access to all Array algorithms, plus one free algorithm from every other topic (like Graphs, Sorting, etc.) so you can try before you buy."
  },
  {
    question: "Do I need to install anything?",
    answer: "No, everything runs directly in your browser. Our visualizations and code playground work on any modern web browser."
  },
  {
    question: "Is this suitable for beginners?",
    answer: "Yes! Visual learning is often the best way to understand complex concepts. We start with basics and gradually move to advanced topics."
  },
  {
    question: "Can I use this for interview prep?",
    answer: "Absolutely. We cover the most common algorithms asked in technical interviews at top tech companies, with a focus on understanding the 'how' and 'why'."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Everything you need to know about the platform and courses.
          </p>
        </div>

        <div className="space-y-4">
          {defaultFAQs.map((faq, index) => (
            <details
              key={index}
              className="group bg-[var(--bg-card)] rounded-xl border border-[var(--border-primary)] overflow-hidden transition-all duration-300 open:shadow-md"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-semibold text-lg text-[var(--text-primary)]">
                  {faq.question}
                </span>
                <span className="transition-transform duration-300 group-open:rotate-45">
                  <Plus className="w-5 h-5 text-[var(--color-primary-500)]" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed animate-slide-down">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
