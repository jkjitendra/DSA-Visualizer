import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

/**
 * Bubble Sort algorithm info card data
 */
export const bubbleSortInfo: AlgorithmInfo = {
  id: "bubble-sort",
  name: "Bubble Sort",
  description:
    "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. Like bubbles rising in water, larger elements 'bubble up' to their correct positions.",
  howItWorks:
    "The algorithm makes multiple passes through the array. In each pass, it compares each pair of adjacent elements and swaps them if needed. After each pass, the largest unsorted element settles into its final position.",
  keyInsight:
    "After k passes, the k largest elements are guaranteed to be in their final sorted positions at the end of the array.",
  bestFor: [
    "Learning sorting concepts (beginner-friendly)",
    "Small arrays (< 50 elements)",
    "Nearly sorted data (with early termination)",
    "Memory-constrained environments (O(1) space)",
  ],
  avoidWhen: [
    "Dealing with large datasets (slow O(n²))",
    "Performance is critical",
    "Random or reverse-sorted data",
    "Real-time applications",
  ],
  funFact:
    "Bubble Sort gets its name because elements 'bubble up' to their correct positions, like air bubbles rising to the surface of water. Despite being inefficient, it's one of the most popular algorithms for teaching sorting concepts!",
  optimizationTips: [
    "Track if any swaps occurred in a pass - if not, array is sorted (early termination)",
    "After each pass, the last element is sorted - reduce the comparison range",
    "Use a flag to detect if the array becomes sorted before completing all passes",
  ],
  tags: ["Comparison Sort", "In-Place", "Stable", "O(n²)"],
};
