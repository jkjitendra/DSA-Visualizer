import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const shellSortInfo: AlgorithmInfo = {
  id: "shell-sort",
  name: "Shell Sort",
  description:
    "Shell Sort is a generalized version of Insertion Sort that allows swapping of elements far apart. It starts by sorting elements far apart, then progressively reduces the gap.",
  howItWorks:
    "Start with a large gap, sort elements that are 'gap' positions apart using insertion sort. Reduce the gap and repeat until gap becomes 1 (final insertion sort pass).",
  keyInsight:
    "By moving elements that are far out of place early (with large gaps), the final insertion sort pass has very little work to do.",
  bestFor: [
    "Medium-sized arrays",
    "When Insertion Sort is too slow",
    "Embedded systems (low overhead)",
    "Arrays that are partially sorted",
  ],
  avoidWhen: [
    "Stability is required (unstable)",
    "Very large datasets",
    "Worst-case guarantees needed",
  ],
  funFact:
    "Shell Sort was invented by Donald Shell in 1959 and was one of the first algorithms to break the O(n²) barrier for sorting!",
  optimizationTips: [
    "Gap sequence matters! Hibbard, Sedgewick, or Ciura sequences perform better than n/2",
    "Best known gap sequence: 1, 4, 10, 23, 57, 132, 301... (Ciura)",
  ],
  tags: ["Comparison Sort", "In-Place", "Unstable", "Gap-Based"],
};
