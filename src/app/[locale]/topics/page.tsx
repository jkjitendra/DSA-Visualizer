import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  BarChart3,
  Network,
  TreePine,
  Layers,
  Search,
  Link2,
  Triangle,
  Calculator
} from "lucide-react";

interface TopicsPageProps {
  params: Promise<{ locale: string }>;
}

const topics = [
  {
    key: "sorting",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    algorithms: ["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"],
  },
  {
    key: "searching",
    icon: Search,
    color: "from-blue-500 to-indigo-500",
    algorithms: ["Binary Search", "Linear Search", "Jump Search"],
  },
  {
    key: "graphs",
    icon: Network,
    color: "from-cyan-500 to-blue-500",
    algorithms: ["BFS", "DFS", "Dijkstra", "A* Search"],
  },
  {
    key: "trees",
    icon: TreePine,
    color: "from-green-500 to-emerald-500",
    algorithms: ["BST", "AVL Tree", "Tree Traversals", "Heap"],
  },
  {
    key: "stacks",
    icon: Layers,
    color: "from-orange-500 to-amber-500",
    algorithms: ["Stack Operations", "Queue Operations", "Deque"],
  },
  {
    key: "linkedLists",
    icon: Link2,
    color: "from-rose-500 to-red-500",
    algorithms: ["Singly Linked", "Doubly Linked", "Circular"],
  },
  {
    key: "heaps",
    icon: Triangle,
    color: "from-violet-500 to-purple-500",
    algorithms: ["Min Heap", "Max Heap", "Heapify"],
  },
  {
    key: "dynamicProgramming",
    icon: Calculator,
    color: "from-teal-500 to-cyan-500",
    algorithms: ["Fibonacci", "Knapsack", "LCS", "LIS"],
  },
];

export default async function TopicsPage({ params }: TopicsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TopicsContent locale={locale} />;
}

function TopicsContent({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {t("nav.topics")}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t("app.description")}
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link
              key={topic.key}
              href={`/${locale}/topics/${topic.key}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-transparent transition-all duration-300 hover:shadow-xl"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative p-6">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {t(`topics.${topic.key}`)}
                </h3>

                {/* Algorithm tags */}
                <div className="flex flex-wrap gap-1.5">
                  {topic.algorithms.slice(0, 3).map((algo) => (
                    <span
                      key={algo}
                      className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                    >
                      {algo}
                    </span>
                  ))}
                  {topic.algorithms.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]">
                      +{topic.algorithms.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-5 h-5 text-[var(--text-secondary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
