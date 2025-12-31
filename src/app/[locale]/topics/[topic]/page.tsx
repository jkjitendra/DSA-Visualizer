import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TopicPageProps {
  params: Promise<{ locale: string; topic: string }>;
}

const validTopics = ["arrays", "sorting", "graphs", "trees", "stacks"] as const;

export function generateStaticParams() {
  return validTopics.map((topic) => ({ topic }));
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { locale, topic } = await params;
  setRequestLocale(locale);

  if (!validTopics.includes(topic as typeof validTopics[number])) {
    notFound();
  }

  return <TopicContent locale={locale} topic={topic} />;
}

const arraysTiers = [
  {
    name: "Tier 1: Basic Operations",
    description: "Fundamental array operations with complexity analysis",
    algorithms: ["array-operations"],
  },
  {
    name: "Tier 2: Patterns & Techniques",
    description: "Common patterns for solving array problems efficiently",
    algorithms: ["two-pointers", "sliding-window", "prefix-sum"],
  },
];

const sortingTiers = [
  {
    name: "Tier 1: Fundamentals",
    description: "Simple O(n²) algorithms - great for learning",
    algorithms: ["bubble-sort", "selection-sort", "insertion-sort", "cocktail-shaker-sort"],
  },
  {
    name: "Tier 2: Improved Simple",
    description: "Optimized versions of simple sorts",
    algorithms: ["shell-sort", "cycle-sort"],
  },
  {
    name: "Tier 3: Divide & Conquer",
    description: "O(n log n) algorithms using recursion",
    algorithms: ["merge-sort", "quick-sort", "heap-sort"],
  },
  {
    name: "Tier 4: Hybrid",
    description: "Best of multiple algorithms combined",
    algorithms: ["tim-sort", "intro-sort"],
  },
  {
    name: "Tier 5: Non-Comparison",
    description: "Linear time for specific inputs",
    algorithms: ["counting-sort", "radix-sort", "bucket-sort", "pigeonhole-sort"],
  },
];

const algorithmNames: Record<string, string> = {
  // Arrays
  "array-operations": "Array Operations",
  "two-pointers": "Two Pointers",
  "sliding-window": "Sliding Window",
  "prefix-sum": "Prefix Sum",
  // Sorting
  "bubble-sort": "Bubble Sort",
  "selection-sort": "Selection Sort",
  "insertion-sort": "Insertion Sort",
  "cocktail-shaker-sort": "Cocktail Shaker",
  "shell-sort": "Shell Sort",
  "cycle-sort": "Cycle Sort",
  "merge-sort": "Merge Sort",
  "quick-sort": "Quick Sort",
  "heap-sort": "Heap Sort",
  "tim-sort": "Tim Sort",
  "intro-sort": "Intro Sort",
  "counting-sort": "Counting Sort",
  "radix-sort": "Radix Sort",
  "bucket-sort": "Bucket Sort",
  "pigeonhole-sort": "Pigeonhole Sort",
};

const algorithmDescriptions: Record<string, string> = {
  "array-operations": "Insert, Delete, Update, Search, Traverse",
  "two-pointers": "Find pair sum in sorted array",
  "sliding-window": "Max sum subarray of size k",
  "prefix-sum": "O(1) range sum queries",
};

function TopicContent({ locale, topic }: { locale: string; topic: string }) {
  const t = useTranslations();

  if (topic === "arrays") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">📦</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.arrays")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master fundamental array operations and common problem-solving patterns
          </p>
        </div>

        <div className="space-y-10">
          {arraysTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=arrays`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    {algorithmDescriptions[algo] && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        {algorithmDescriptions[algo]}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] mt-2">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topic === "sorting") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button - Top Left */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">📊</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.sorting")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore sorting algorithms organized by complexity
          </p>
        </div>

        <div className="space-y-10">
          {sortingTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=sorting`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Other topics - coming soon
  const topicIcons: Record<string, string> = { graphs: "🕸️", trees: "🌳", stacks: "📚" };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <span className="text-6xl mb-4 block">{topicIcons[topic]}</span>
      <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4 capitalize">{t(`topics.${topic}`)}</h1>
      <p className="text-[var(--text-secondary)]">Coming soon!</p>
      <div className="mt-8">
        <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline">
          ← Back to Topics
        </Link>
      </div>
    </div>
  );
}

