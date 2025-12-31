import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-900)] via-[var(--color-primary-800)] to-[var(--color-secondary-900)]" />

        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-primary-500)] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-secondary-500)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              {t("home.hero.title")}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--color-gray-300)] max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link
                href={`/${locale}/visualize`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] rounded-xl hover:from-[var(--color-primary-600)] hover:to-[var(--color-secondary-600)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {t("home.hero.cta")}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/topics`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {t("nav.topics")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("home.features.interactive.title")}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {t("home.features.interactive.description")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] hover:border-[var(--color-secondary-500)] transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-secondary-500)] to-[var(--color-secondary-600)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("home.features.customInput.title")}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {t("home.features.customInput.description")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] hover:border-[var(--color-accent-sorted)] transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-accent-sorted)] to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {t("home.features.multiLanguage.title")}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {t("home.features.multiLanguage.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12">
            {t("nav.topics")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "sorting", icon: "📊", color: "from-purple-500 to-pink-500" },
              { key: "graphs", icon: "🕸️", color: "from-blue-500 to-cyan-500" },
              { key: "trees", icon: "🌳", color: "from-green-500 to-emerald-500" },
              { key: "stacks", icon: "📚", color: "from-orange-500 to-amber-500" },
            ].map((topic) => (
              <Link
                key={topic.key}
                href={`/${locale}/topics/${topic.key}`}
                className="group relative p-6 rounded-2xl bg-gradient-to-br overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-90`} />
                <div className="relative text-center text-white">
                  <span className="text-4xl mb-3 block">{topic.icon}</span>
                  <span className="text-lg font-semibold">{t(`topics.${topic.key}`)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
