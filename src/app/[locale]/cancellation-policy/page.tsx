"use client";

import { useTranslations } from "next-intl";
import { Ban, AlertTriangle, Shield, UserX, Scale, Gavel, Mail } from "lucide-react";

export default function CancellationPolicyPage() {
  const t = useTranslations("pages.cancellation");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex p-4 rounded-2xl bg-red-500/10 mb-6">
            <Ban className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            {t("lastUpdated")}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span className="font-bold text-red-500">{t("importantNotice")}</span>
          </div>
          <p className="text-[var(--text-secondary)]">
            {t("importantNoticeText")}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <Ban className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("noRefunds")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-6 ml-11">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t("refundPolicy")}</h3>
                <p>{t("refundPolicyText")}</p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t("finalPayments")}</h3>
                <p>{t("finalPaymentsText")}</p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t("serviceShutdown")}</h3>
                <p>{t("serviceShutdownText")}</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {(t.raw("serviceShutdownItems") as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t("cancellationPolicy")}</h3>
                <p>{t("cancellationPolicyText")}</p>
              </div>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("liability")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("liabilityText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("liabilityItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t("liabilityNote")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("optOut")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("optOutText")}</p>
              <p>{t("optOutNote")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <UserX className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("accountMisuse")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-6 ml-11">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t("accountActivity")}</h3>
                <p>{t("accountActivityText")}</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {(t.raw("accountActivityItems") as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{t("protectionMeasure")}</h3>
                <p>{t("protectionMeasureText")}</p>
              </div>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("blacklist")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("blacklistText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("blacklistItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t("blacklistNote")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                <Gavel className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("legalAction")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("legalActionText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("legalActionItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t("legalActionNote")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)]">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("contactUs")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("contactUsText")}</p>
              <p className="font-medium text-[var(--text-primary)]">
                {t("contactEmail")}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
