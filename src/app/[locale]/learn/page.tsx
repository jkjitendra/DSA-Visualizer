import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { BookOpen, FileText, Video } from "lucide-react";

interface LearnPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LearnContent />;
}

function LearnContent() {
  const t = useTranslations();

  const lessonCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      color: "from-blue-500 to-indigo-500",
      lessons: [
        { title: "Introduction to DSA", duration: "10 min" },
        { title: "Big O Notation", duration: "15 min" },
        { title: "Time & Space Complexity", duration: "12 min" },
      ],
    },
    {
      title: "Sorting Algorithms",
      icon: FileText,
      color: "from-purple-500 to-pink-500",
      lessons: [
        { title: "Bubble Sort Explained", duration: "8 min" },
        { title: "Quick Sort Deep Dive", duration: "18 min" },
        { title: "Merge Sort Tutorial", duration: "15 min" },
      ],
    },
    {
      title: "Graph Algorithms",
      icon: Video,
      color: "from-cyan-500 to-blue-500",
      lessons: [
        { title: "BFS vs DFS", duration: "20 min" },
        { title: "Shortest Path Algorithms", duration: "25 min" },
        { title: "Graph Representations", duration: "12 min" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {t("nav.learn")}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Comprehensive lessons with embedded visualizations to help you understand DSA concepts
        </p>
      </div>

      {/* Coming Soon Banner */}
      <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Interactive Lessons Coming Soon
            </h2>
            <p className="text-[var(--text-secondary)]">
              MDX-powered lessons with embedded visualizers are in development
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Categories Preview */}
      <div className="space-y-8">
        {lessonCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
            >
              {/* Category Header */}
              <div className="p-6 border-b border-[var(--border-primary)] flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  {category.title}
                </h2>
              </div>

              {/* Lessons List */}
              <div className="divide-y divide-[var(--border-primary)]">
                {category.lessons.map((lesson) => (
                  <div
                    key={lesson.title}
                    className="p-4 flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors cursor-not-allowed opacity-60"
                  >
                    <span className="text-[var(--text-primary)]">
                      {lesson.title}
                    </span>
                    <span className="text-sm text-[var(--text-tertiary)]">
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
