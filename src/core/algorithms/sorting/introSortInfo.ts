import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const introSortInfo: AlgorithmInfo = {
  id: "intro-sort",
  name: "Intro Sort",
  description:
    "Introspective Sort (Intro Sort) is a hybrid sorting algorithm that combines Quick Sort, Heap Sort, and Insertion Sort. It begins with Quick Sort but switches to Heap Sort when recursion depth exceeds a threshold.",
  howItWorks:
    "1. Start with Quick Sort. 2. If recursion depth exceeds 2×log₂(n), switch to Heap Sort. 3. Use Insertion Sort for small subarrays (< 16).",
  keyInsight:
    "Quick Sort is fast on average but O(n²) worst case. By switching to Heap Sort when partitioning degrades, Intro Sort guarantees O(n log n) worst case!",
  bestFor: [
    "General-purpose sorting (best of all worlds)",
    "When worst-case guarantee is needed",
    "C++ STL std::sort implementation",
  ],
  avoidWhen: [
    "Stability is required (unstable)",
    "Simplicity is required",
    "Memory predictability is important",
  ],
  funFact:
    "Intro Sort was invented by David Musser in 1997 and is the algorithm behind C++ STL's std::sort()!",
  optimizationTips: [
    "Median-of-three pivot selection",
    "Threshold of 16 for Insertion Sort",
    "Depth limit of 2×log₂(n)",
  ],
  tags: ["Hybrid", "Unstable", "In-Place", "O(n log n)"],
};
