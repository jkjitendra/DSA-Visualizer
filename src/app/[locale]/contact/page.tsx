"use client";

import { useTranslations, useLocale } from "next-intl";
import { Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("pages.contact");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              {t("formTitle")}
            </h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    {t("firstName")}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    {t("lastName")}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                {t("sendButton")}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                {t("contactInfo")}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{t("emailLabel")}</h3>
                    <p className="text-[var(--text-secondary)]">hello@algoarcadelab.com</p>
                    <p className="text-[var(--text-secondary)]">support@algoarcadelab.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{t("locationLabel")}</h3>
                    <p className="text-[var(--text-secondary)]">{t("location")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{t("responseTime")}</h3>
                    <p className="text-[var(--text-secondary)]">{t("responseTimeText")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 rounded-2xl border border-[var(--border-primary)] p-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                {t("quickHelp")}
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                {t("quickHelpText")}
              </p>
              <a
                href={`/${locale}#faq`}
                className="inline-flex items-center gap-2 text-[var(--color-primary-500)] font-semibold hover:underline"
              >
                {t("visitFaq")} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
