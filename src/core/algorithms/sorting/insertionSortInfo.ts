import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const insertionSortInfo: AlgorithmInfo = {
  id: "insertion-sort",
  name: "Insertion Sort",
  description:
    "Insertion Sort builds the final sorted array one element at a time. It picks each element and inserts it into its correct position among the previously sorted elements.",
  howItWorks:
    "Start from the second element. Compare it with elements before it and shift larger elements right until finding the correct insertion position.",
  keyInsight:
    "Like sorting cards in your hand - you pick up each card and insert it in the right place among the cards you've already sorted.",
  bestFor: [
    "Small arrays (< 50 elements)",
    "Nearly sorted data (very fast, O(n))",
    "Online sorting (data arriving in stream)",
    "Stable sort requirement",
  ],
  avoidWhen: [
    "Large random datasets",
    "Reverse-sorted arrays (worst case)",
    "Performance-critical applications",
  ],
  funFact:
    "Insertion Sort is used in Tim Sort (Python, Java default) for small subarrays because its low overhead beats O(n log n) algorithms for tiny inputs!",
  optimizationTips: [
    "Use binary search to find insertion position (Binary Insertion Sort)",
    "Great as base case for recursive algorithms like Quick Sort",
    "Performs well with linked lists (no shifting needed)",
  ],
  tags: ["Comparison Sort", "In-Place", "Stable", "Adaptive"],
};
