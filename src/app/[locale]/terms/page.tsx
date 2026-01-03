"use client";

import { useTranslations } from "next-intl";
import { FileText, Users, CreditCard, ShieldAlert, AlertTriangle, Scale, RefreshCw, Mail } from "lucide-react";

export default function TermsPage() {
  const t = useTranslations("pages.terms");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex p-4 rounded-2xl bg-[var(--color-secondary-500)]/10 mb-6">
            <FileText className="w-12 h-12 text-[var(--color-secondary-500)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            {t("lastUpdated")}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("acceptance")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("acceptanceText")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)]">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("account")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("accountText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("accountItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t("accountNote")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("license")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("licenseText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("licenseItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t("licenseNotText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("licenseNotItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("prohibited")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("prohibitedText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("prohibitedItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("disclaimer")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("disclaimerText")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("changes")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("changesText")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("contact")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("contactText")}</p>
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
