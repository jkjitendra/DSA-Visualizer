import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Trophy, Target, Flame, Clock } from "lucide-react";

interface PracticePageProps {
  params: Promise<{ locale: string }>;
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PracticeContent />;
}

function PracticeContent() {
  const t = useTranslations();

  const practiceFeatures = [
    {
      icon: Target,
      title: "Predict Next Step",
      description: "Test your understanding by predicting what happens next in an algorithm",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Flame,
      title: "Daily Challenges",
      description: "Complete daily algorithm challenges to build your streak",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Clock,
      title: "Timed Drills",
      description: "Race against the clock to solve algorithm problems quickly",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Earn badges and track your progress as you master each topic",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {t("nav.practice")}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Test your knowledge with interactive exercises and build a daily practice habit
        </p>
      </div>

      {/* Coming Soon Hero */}
      <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-[var(--color-primary-900)] via-[var(--color-primary-800)] to-[var(--color-secondary-900)] text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
          <Trophy className="w-10 h-10 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Practice Mode Coming Soon
        </h2>
        <p className="text-[var(--color-gray-300)] max-w-md mx-auto">
          Interactive quizzes and timed challenges are in development. Check back soon!
        </p>
      </div>

      {/* Feature Preview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {practiceFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-[var(--color-primary-500)] transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                {feature.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats Preview */}
      <div className="mt-12 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          Your Progress (Coming Soon)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Problems Solved", value: "—" },
            { label: "Current Streak", value: "—" },
            { label: "Total XP", value: "—" },
            { label: "Rank", value: "—" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-[var(--bg-card)] text-center"
            >
              <div className="text-2xl font-bold text-[var(--text-tertiary)] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
