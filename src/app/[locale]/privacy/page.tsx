"use client";

import { useTranslations } from "next-intl";
import { Shield, Eye, Lock, UserCheck, Database, Bell, Trash2, Mail } from "lucide-react";

export default function PrivacyPage() {
  const t = useTranslations("pages.privacy");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex p-4 rounded-2xl bg-[var(--color-primary-500)]/10 mb-6">
            <Shield className="w-12 h-12 text-[var(--color-primary-500)]" />
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
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("infoCollect")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("infoCollectText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("infoCollectItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)]">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("howWeUse")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("howWeUseText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("howWeUseItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("dataSecurity")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("dataSecurityText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("dataSecurityItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("yourRights")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("yourRightsText")}</p>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw("yourRightsItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("cookies")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("cookiesText")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <Trash2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {t("dataRetention")}
              </h2>
            </div>
            <div className="text-[var(--text-secondary)] space-y-4 ml-11">
              <p>{t("dataRetentionText")}</p>
            </div>
          </section>

          <section className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]">
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
